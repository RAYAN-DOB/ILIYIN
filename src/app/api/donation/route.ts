import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";

/**
 * POST /api/donation — Enregistre un don (Donation). status = "pending" par défaut.
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { amount, currency, email, name, message } = body;

    const numAmount = Number(amount);
    if (!Number.isFinite(numAmount) || numAmount <= 0) {
      return NextResponse.json(
        { error: "amount doit être un nombre positif" },
        { status: 400 }
      );
    }

    const donation = await prisma.donation.create({
      data: {
        amount: numAmount,
        currency: String(currency || "EUR").slice(0, 10),
        email: email ? String(email).slice(0, 200) : null,
        name: name ? String(name).slice(0, 200) : null,
        message: message ? String(message).slice(0, 1000) : null,
        status: "pending",
      },
    });

    return NextResponse.json({
      success: true,
      id: donation.id,
    });
  } catch (e) {
    console.error("Donation API error:", e);
    return NextResponse.json(
      { error: "Erreur serveur" },
      { status: 500 }
    );
  }
}
