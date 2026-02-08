"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import GlassPanel from "@/components/ui/GlassPanel";
import CyberButton from "@/components/ui/CyberButton";
import { Lock, Download, LogOut, MessageSquare, Users, Heart, Coins } from "lucide-react";

type AdminData = {
  contacts: { id: string; name: string; email: string | null; phone: string; city: string; message: string; createdAt: string }[];
  volunteers: { id: string; name: string; email: string | null; phone: string; city: string; availability: string; message: string | null; createdAt: string }[];
  sponsors: { id: string; fullName: string; phone: string; city: string; option: number; budget: string | null; notes: string | null; createdAt: string }[];
  donations: { id: string; amount: number; currency: string; email: string | null; name: string | null; message: string | null; status: string; createdAt: string }[];
};

function toCSV(rows: Record<string, unknown>[], headers: string[]): string {
  const line = (row: Record<string, unknown>) =>
    headers.map((h) => {
      const v = row[h];
      const s = v == null ? "" : String(v);
      return s.includes(",") || s.includes('"') ? `"${s.replace(/"/g, '""')}"` : s;
    }).join(",");
  return [headers.join(","), ...rows.map(line)].join("\r\n");
}

function downloadCSV(filename: string, csv: string) {
  const blob = new Blob(["\ufeff" + csv], { type: "text/csv;charset=utf-8" });
  const a = document.createElement("a");
  a.href = URL.createObjectURL(blob);
  a.download = filename;
  a.click();
  URL.revokeObjectURL(a.href);
}

export default function AdminPage() {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [authError, setAuthError] = useState("");
  const [loading, setLoading] = useState(false);
  const [authenticated, setAuthenticated] = useState(false);
  const [data, setData] = useState<AdminData | null>(null);
  const [dataError, setDataError] = useState("");

  const checkAuth = async () => {
    const res = await fetch("/api/admin/data", { credentials: "include" });
    if (res.ok) {
      setAuthenticated(true);
      setDataError("");
      const json = await res.json();
      setData(json);
    } else if (res.status === 401) {
      setAuthenticated(false);
    } else {
      setDataError("Impossible de charger les données.");
    }
  };

  useEffect(() => {
    checkAuth();
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError("");
    setLoading(true);
    try {
      const res = await fetch("/api/admin/auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });
      const json = await res.json();
      if (res.ok) {
        setAuthenticated(true);
        await checkAuth();
      } else {
        setAuthError(json.error || "Erreur");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    document.cookie = "iliyin_admin=; path=/; max-age=0";
    setAuthenticated(false);
    setData(null);
    router.push("/");
  };

  if (!authenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4 bg-iliyin-green-dark">
        <GlassPanel className="max-w-md w-full">
          <div className="flex items-center gap-2 text-iliyin-gold mb-6">
            <Lock className="w-6 h-6" />
            <h1 className="font-orbitron text-xl">Admin ILIYIN</h1>
          </div>
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block font-exo text-iliyin-white/80 mb-1 text-sm">Mot de passe</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-iliyin-green-darker/50 border border-iliyin-beige/40 rounded-lg px-4 py-3 font-exo text-iliyin-white focus:outline-none focus:ring-2 focus:ring-iliyin-gold/50"
                placeholder="Mot de passe admin"
                autoFocus
              />
            </div>
            {authError && <p className="text-red-400 text-sm">{authError}</p>}
            <CyberButton type="submit" className="w-full" disabled={loading}>
              {loading ? "Connexion..." : "Accéder au dashboard"}
            </CyberButton>
          </form>
        </GlassPanel>
      </div>
    );
  }

  if (authenticated && data === null && !dataError) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4 bg-iliyin-green-dark">
        <p className="font-exo text-iliyin-white/70">Chargement des données...</p>
      </div>
    );
  }

  if (dataError && authenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4 bg-iliyin-green-dark">
        <GlassPanel className="max-w-md">
          <p className="text-red-400">{dataError}</p>
          <CyberButton onClick={() => checkAuth()} className="mt-4">Réessayer</CyberButton>
        </GlassPanel>
      </div>
    );
  }

  const tables = [
    {
      title: "Messages de contact",
      icon: MessageSquare,
      rows: data?.contacts ?? [],
      headers: ["name", "email", "phone", "city", "message", "createdAt"],
      filename: "iliyin-contacts.csv",
    },
    {
      title: "Bénévoles",
      icon: Users,
      rows: data?.volunteers ?? [],
      headers: ["name", "email", "phone", "city", "availability", "message", "createdAt"],
      filename: "iliyin-benevoles.csv",
    },
    {
      title: "Demandes de parrainage",
      icon: Heart,
      rows: data?.sponsors ?? [],
      headers: ["fullName", "phone", "city", "option", "budget", "notes", "createdAt"],
      filename: "iliyin-parrainages.csv",
    },
    {
      title: "Dons",
      icon: Coins,
      rows: data?.donations ?? [],
      headers: ["amount", "currency", "name", "email", "message", "status", "createdAt"],
      filename: "iliyin-dons.csv",
    },
  ];

  return (
    <div className="min-h-screen bg-iliyin-green-dark pt-24 pb-12 px-4">
      <div className="max-w-5xl mx-auto">
        <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
          <h1 className="font-orbitron text-2xl md:text-3xl text-iliyin-white">Dashboard Admin</h1>
          <CyberButton variant="secondary" onClick={handleLogout} className="gap-2">
            <LogOut className="w-5 h-5" />
            Déconnexion
          </CyberButton>
        </div>

        {tables.map(({ title, icon: Icon, rows, headers, filename }) => (
          <GlassPanel key={title} className="mb-8 overflow-hidden">
            <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
              <h2 className="font-orbitron text-lg text-iliyin-gold flex items-center gap-2">
                <Icon className="w-5 h-5" />
                {title}
              </h2>
              <button
                type="button"
                onClick={() => downloadCSV(filename, toCSV(rows as Record<string, unknown>[], headers))}
                className="font-exo text-sm text-iliyin-beige-light hover:underline flex items-center gap-1"
              >
                <Download className="w-4 h-4" />
                Export CSV
              </button>
            </div>
            <div className="overflow-x-auto -mx-2">
              <table className="w-full font-exo text-sm text-iliyin-white/90">
                <thead>
                  <tr className="border-b border-iliyin-beige/40">
                    {headers.map((h) => (
                      <th key={h} className="text-left py-2 px-2 font-orbitron text-iliyin-gold/80">
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {rows.length === 0 ? (
                    <tr>
                      <td colSpan={headers.length} className="py-4 px-2 text-iliyin-white/50">
                        Aucune donnée
                      </td>
                    </tr>
                  ) : (
                    rows.map((row: Record<string, unknown>) => (
                      <tr key={String(row.id)} className="border-b border-iliyin-beige/20">
                        {headers.map((h) => (
                          <td key={h} className="py-2 px-2 max-w-[200px] truncate" title={String(row[h] ?? "")}>
                            {row[h] != null ? String(row[h]) : "—"}
                          </td>
                        ))}
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </GlassPanel>
        ))}
      </div>
    </div>
  );
}
