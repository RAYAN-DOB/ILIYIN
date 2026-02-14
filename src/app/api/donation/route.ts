import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { sendNotificationEmail, sendConfirmationEmail } from "@/lib/email";

/**
 * POST /api/donation — Enregistre un don (Donation). status = "pending" par défaut.
 * Envoie un email de notification à l'asso + email de confirmation à l'utilisateur.
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

    // Envoi email de notification à l'asso
    sendNotificationEmail({
      type: "donation",
      data: { amount: numAmount, currency: currency || "EUR", email, name, message },
    }).catch((err) => console.error("[Donation] Erreur notification email:", err));

    // Envoi email de confirmation à l'utilisateur (si email fourni)
    if (email) {
      sendConfirmationEmail({
        to: email,
        name: name || "Donateur",
        type: "donation",
      }).catch((err) => console.error("[Donation] Erreur confirmation email:", err));
    }

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
