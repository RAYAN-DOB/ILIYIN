import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { sendNotificationEmail, sendConfirmationEmail } from "@/lib/email";

/**
 * POST /api/volunteer — Inscription bénévole (VolunteerSignup).
 * Envoie un email de notification à l'asso + email de confirmation à l'utilisateur.
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, phone, city, availability, message } = body;

    if (!name || !phone || !city || !availability) {
      return NextResponse.json(
        { error: "name, phone, city et availability sont requis" },
        { status: 400 }
      );
    }

    const volunteer = await prisma.volunteerSignup.create({
      data: {
        name: String(name).slice(0, 200),
        email: email ? String(email).slice(0, 200) : null,
        phone: String(phone).slice(0, 50),
        city: String(city).slice(0, 200),
        availability: String(availability).slice(0, 500),
        message: message ? String(message).slice(0, 2000) : null,
      },
    });

    // Envoi email de notification à l'asso
    sendNotificationEmail({
      type: "volunteer",
      data: { name, email, phone, city, availability, message },
    }).catch((err) => console.error("[Volunteer] Erreur notification email:", err));

    // Envoi email de confirmation à l'utilisateur (si email fourni)
    if (email) {
      sendConfirmationEmail({
        to: email,
        name,
        type: "volunteer",
      }).catch((err) => console.error("[Volunteer] Erreur confirmation email:", err));
    }

    return NextResponse.json({
      success: true,
      id: volunteer.id,
    });
  } catch (e) {
    console.error("Volunteer API error:", e);
    return NextResponse.json(
      { error: "Erreur serveur" },
      { status: 500 }
    );
  }
}
