"use client";

import {
  createContext,
  useContext,
  useCallback,
  useState,
  useEffect,
  type ReactNode,
} from "react";

type CyberModeContextType = {
  cyberMode: boolean;
  toggle: () => void;
};

const CyberModeContext = createContext<CyberModeContextType | null>(null);

/**
 * Easter egg : taper "1337" au clavier active le mode "cyber" (effets renforcés).
 */
export function CyberModeProvider({ children }: { children: ReactNode }) {
  const [cyberMode, setCyberMode] = useState(false);
  const [buffer, setBuffer] = useState("");

  const toggle = useCallback(() => setCyberMode((c) => !c), []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const key = e.key;
      if (typeof key === "string" && key.length === 1) {
        const next = (buffer + key).slice(-4);
        setBuffer(next);
        if (next === "1337") {
          setCyberMode((c) => !c);
          setBuffer("");
        }
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [buffer]);

  // Applique une classe au body pour le mode cyber (glow renforcé, etc.)
  useEffect(() => {
    if (cyberMode) {
      document.documentElement.classList.add("cyber-mode");
    } else {
      document.documentElement.classList.remove("cyber-mode");
    }
  }, [cyberMode]);

  return (
    <CyberModeContext.Provider value={{ cyberMode, toggle }}>
      {children}
    </CyberModeContext.Provider>
  );
}

export function useCyberMode() {
  const ctx = useContext(CyberModeContext);
  if (!ctx) return { cyberMode: false, toggle: () => {} };
  return ctx;
}
