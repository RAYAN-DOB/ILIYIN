import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";

const COOKIE_NAME = "iliyin_admin";

function isAuthenticated(request: NextRequest): boolean {
  return request.cookies.get(COOKIE_NAME)?.value === "1";
}

/**
 * GET /api/admin/data — Retourne contacts, bénévoles, parrainages, dons (si authentifié).
 */
export async function GET(request: NextRequest) {
  if (!isAuthenticated(request)) {
    return NextResponse.json({ error: "Non autorisé" }, { status: 401 });
  }

  try {
    const [contacts, volunteers, sponsors, donations] = await Promise.all([
      prisma.contactMessage.findMany({ orderBy: { createdAt: "desc" } }),
      prisma.volunteerSignup.findMany({ orderBy: { createdAt: "desc" } }),
      prisma.sponsorshipRequest.findMany({ orderBy: { createdAt: "desc" } }),
      prisma.donation.findMany({ orderBy: { createdAt: "desc" } }),
    ]);

    return NextResponse.json({
      contacts,
      volunteers,
      sponsors,
      donations,
    });
  } catch (e) {
    console.error("Admin data error:", e);
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}
