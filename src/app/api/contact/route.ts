import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { sendNotificationEmail, sendConfirmationEmail } from "@/lib/email";

/**
 * POST /api/contact — Enregistre un message de contact (ContactMessage).
 * Envoie un email de notification à l'asso + email de confirmation à l'utilisateur.
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, phone, city, message } = body;

    if (!name || !phone || !city || !message) {
      return NextResponse.json(
        { error: "name, phone, city et message sont requis" },
        { status: 400 }
      );
    }

    const contact = await prisma.contactMessage.create({
      data: {
        name: String(name).slice(0, 200),
        email: email ? String(email).slice(0, 200) : null,
        phone: String(phone).slice(0, 50),
        city: String(city).slice(0, 200),
        message: String(message).slice(0, 5000),
      },
    });

    // Envoi email de notification à l'asso (en arrière-plan, n'attend pas)
    sendNotificationEmail({
      type: "contact",
      data: { name, email, phone, city, message },
    }).catch((err) => console.error("[Contact] Erreur notification email:", err));

    // Envoi email de confirmation à l'utilisateur (si email fourni)
    if (email) {
      sendConfirmationEmail({
        to: email,
        name,
        type: "contact",
      }).catch((err) => console.error("[Contact] Erreur confirmation email:", err));
    }

    return NextResponse.json({
      success: true,
      id: contact.id,
    });
  } catch (e) {
    console.error("Contact API error:", e);
    return NextResponse.json(
      { error: "Erreur serveur" },
      { status: 500 }
    );
  }
}
