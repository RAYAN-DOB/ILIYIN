import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";

/**
 * POST /api/sponsor — Demande de parrainage (SponsorshipRequest).
 * option: 1 ou 2 (type de parrainage).
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { fullName, phone, city, option, budget, notes } = body;

    if (!fullName || !phone || !city || option === undefined) {
      return NextResponse.json(
        { error: "fullName, phone, city et option (1 ou 2) sont requis" },
        { status: 400 }
      );
    }

    const opt = Number(option);
    if (opt !== 1 && opt !== 2) {
      return NextResponse.json(
        { error: "option doit être 1 ou 2" },
        { status: 400 }
      );
    }

    const sponsor = await prisma.sponsorshipRequest.create({
      data: {
        fullName: String(fullName).slice(0, 200),
        phone: String(phone).slice(0, 50),
        city: String(city).slice(0, 200),
        option: opt,
        budget: budget ? String(budget).slice(0, 100) : null,
        notes: notes ? String(notes).slice(0, 2000) : null,
      },
    });

    return NextResponse.json({
      success: true,
      id: sponsor.id,
    });
  } catch (e) {
    console.error("Sponsor API error:", e);
    return NextResponse.json(
      { error: "Erreur serveur" },
      { status: 500 }
    );
  }
}
