import { Resend } from "resend";

const FROM_EMAIL = process.env.RESEND_FROM_EMAIL || "onboarding@resend.dev";
const TO_EMAIL = process.env.NOTIFICATION_EMAIL || "assoiliyin@gmail.com";

// Initialiser Resend de manière lazy (seulement quand nécessaire, pas au build)
// Utilise une clé factice pendant le build pour éviter les erreurs
let resendInstance: Resend | null = null;

function getResend(): Resend {
  if (!resendInstance) {
    const apiKey = process.env.RESEND_API_KEY || "re_dummy_key_for_build";
    resendInstance = new Resend(apiKey);
  }
  return resendInstance;
}

function isResendConfigured(): boolean {
  return !!process.env.RESEND_API_KEY && process.env.RESEND_API_KEY !== "re_dummy_key_for_build";
}

/**
 * Envoyer un email de notification à l'association (nouveau formulaire reçu)
 */
export async function sendNotificationEmail(params: {
  type: "contact" | "volunteer" | "sponsor" | "donation";
  data: Record<string, any>;
}) {
  const { type, data } = params;

  let subject = "";
  let content = "";

  switch (type) {
    case "contact":
      subject = `[ILIYIN] Nouveau message de contact - ${data.name}`;
      content = `
        <h2>Nouveau message de contact</h2>
        <p><strong>Nom :</strong> ${data.name}</p>
        <p><strong>Email :</strong> ${data.email || "Non fourni"}</p>
        <p><strong>Téléphone :</strong> ${data.phone}</p>
        <p><strong>Ville :</strong> ${data.city}</p>
        <p><strong>Message :</strong></p>
        <p>${data.message.replace(/\n/g, "<br>")}</p>
        <hr>
        <p style="font-size: 12px; color: #666;">Reçu via association-iliyin.fr</p>
      `;
      break;

    case "volunteer":
      subject = `[ILIYIN] Nouvelle inscription bénévole - ${data.name}`;
      content = `
        <h2>Nouvelle inscription bénévole</h2>
        <p><strong>Nom :</strong> ${data.name}</p>
        <p><strong>Email :</strong> ${data.email || "Non fourni"}</p>
        <p><strong>Téléphone :</strong> ${data.phone}</p>
        <p><strong>Ville :</strong> ${data.city}</p>
        <p><strong>Disponibilités :</strong> ${data.availability}</p>
        ${data.message ? `<p><strong>Message :</strong><br>${data.message.replace(/\n/g, "<br>")}</p>` : ""}
        <hr>
        <p style="font-size: 12px; color: #666;">Reçu via association-iliyin.fr</p>
      `;
      break;

    case "sponsor":
      subject = `[ILIYIN] Nouvelle demande de parrainage - ${data.fullName}`;
      content = `
        <h2>Nouvelle demande de parrainage</h2>
        <p><strong>Nom complet :</strong> ${data.fullName}</p>
        <p><strong>Téléphone :</strong> ${data.phone}</p>
        <p><strong>Ville :</strong> ${data.city}</p>
        <p><strong>Option choisie :</strong> Option ${data.option}</p>
        ${data.budget ? `<p><strong>Budget :</strong> ${data.budget}</p>` : ""}
        ${data.notes ? `<p><strong>Notes :</strong><br>${data.notes.replace(/\n/g, "<br>")}</p>` : ""}
        <hr>
        <p style="font-size: 12px; color: #666;">Reçu via association-iliyin.fr</p>
      `;
      break;

    case "donation":
      subject = `[ILIYIN] Intention de don - ${data.amount}€`;
      content = `
        <h2>Intention de don</h2>
        <p><strong>Montant :</strong> ${data.amount} ${data.currency}</p>
        <p><strong>Nom :</strong> ${data.name || "Anonyme"}</p>
        <p><strong>Email :</strong> ${data.email || "Non fourni"}</p>
        ${data.message ? `<p><strong>Message :</strong><br>${data.message.replace(/\n/g, "<br>")}</p>` : ""}
        <hr>
        <p style="font-size: 12px; color: #666;">Reçu via association-iliyin.fr - <strong>À finaliser sur PayAsso</strong></p>
      `;
      break;
  }

  // Si Resend n'est pas configuré, on log et on continue sans erreur
  if (!isResendConfigured()) {
    console.warn("[Email] Resend non configuré - email de notification non envoyé");
    return { success: false, error: "Resend not configured" };
  }

  try {
    const resend = getResend();
    const { data: result, error } = await resend.emails.send({
      from: FROM_EMAIL,
      to: TO_EMAIL,
      subject,
      html: content,
    });

    if (error) {
      console.error("[Email] Erreur notification:", error);
      return { success: false, error };
    }

    return { success: true, data: result };
  } catch (err) {
    console.error("[Email] Exception notification:", err);
    return { success: false, error: err };
  }
}

/**
 * Envoyer un email de confirmation automatique à l'utilisateur
 */
export async function sendConfirmationEmail(params: {
  to: string;
  name: string;
  type: "contact" | "volunteer" | "sponsor" | "donation";
}) {
  const { to, name, type } = params;

  if (!to || !to.includes("@")) {
    return { success: false, error: "Email invalide" };
  }

  let subject = "";
  let content = "";

  const baseMessage = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <div style="background: linear-gradient(135deg, #2dd4a0 0%, #1a9d6f 100%); padding: 30px; text-align: center;">
        <h1 style="color: white; margin: 0;">ILIYIN</h1>
        <p style="color: white; margin: 5px 0 0 0; font-size: 14px; letter-spacing: 2px;">SOLIDARITÉ & DIGNITÉ</p>
      </div>
      <div style="padding: 30px; background: #f8fafc;">
  `;

  const footer = `
      </div>
      <div style="padding: 20px; text-align: center; background: #062010; color: #2dd4a0; font-size: 12px;">
        <p style="margin: 0;">Association ILIYIN - Île-de-France</p>
        <p style="margin: 5px 0 0 0;">06 50 93 88 70 | assoiliyin@gmail.com</p>
        <p style="margin: 5px 0 0 0;"><a href="https://association-iliyin.fr" style="color: #2dd4a0;">association-iliyin.fr</a></p>
      </div>
    </div>
  `;

  switch (type) {
    case "contact":
      subject = "ILIYIN - Votre message a bien été reçu";
      content = `
        ${baseMessage}
        <h2 style="color: #062010;">Bonjour ${name},</h2>
        <p style="color: #333; line-height: 1.6;">
          Nous avons bien reçu votre message et nous vous en remercions.
        </p>
        <p style="color: #333; line-height: 1.6;">
          Notre équipe reviendra vers vous <strong>dans les plus brefs délais</strong>, généralement sous 24 à 48 heures.
        </p>
        <p style="color: #333; line-height: 1.6;">
          Pour toute urgence, vous pouvez nous contacter directement par WhatsApp ou SMS au <strong>06 50 93 88 70</strong>.
        </p>
        <p style="color: #333; line-height: 1.6; margin-top: 30px;">
          Solidairement,<br>
          <strong>L'équipe ILIYIN</strong>
        </p>
        ${footer}
      `;
      break;

    case "volunteer":
      subject = "ILIYIN - Votre inscription bénévole a bien été reçue";
      content = `
        ${baseMessage}
        <h2 style="color: #062010;">Bonjour ${name},</h2>
        <p style="color: #333; line-height: 1.6;">
          Merci pour votre intérêt à devenir bénévole au sein d'ILIYIN !
        </p>
        <p style="color: #333; line-height: 1.6;">
          Votre inscription a bien été enregistrée. Nous allons l'étudier et <strong>vous recontacterons très prochainement</strong> pour échanger sur les actions qui correspondent à vos disponibilités.
        </p>
        <p style="color: #333; line-height: 1.6;">
          Votre engagement est précieux et contribue à nos actions de solidarité.
        </p>
        <p style="color: #333; line-height: 1.6; margin-top: 30px;">
          À très bientôt,<br>
          <strong>L'équipe ILIYIN</strong>
        </p>
        ${footer}
      `;
      break;

    case "sponsor":
      subject = "ILIYIN - Votre demande de parrainage a bien été reçue";
      content = `
        ${baseMessage}
        <h2 style="color: #062010;">Bonjour ${name},</h2>
        <p style="color: #333; line-height: 1.6;">
          Nous avons bien reçu votre demande de parrainage et nous vous remercions de votre confiance.
        </p>
        <p style="color: #333; line-height: 1.6;">
          Notre équipe va étudier votre demande avec attention et <strong>vous contactera dans les prochains jours</strong> pour en discuter et définir ensemble l'accompagnement le plus adapté.
        </p>
        <p style="color: #333; line-height: 1.6;">
          ILIYIN œuvre pour la dignité de chacun, dans le respect et la discrétion.
        </p>
        <p style="color: #333; line-height: 1.6; margin-top: 30px;">
          Solidairement,<br>
          <strong>L'équipe ILIYIN</strong>
        </p>
        ${footer}
      `;
      break;

    case "donation":
      subject = "ILIYIN - Merci pour votre générosité";
      content = `
        ${baseMessage}
        <h2 style="color: #062010;">Bonjour ${name},</h2>
        <p style="color: #333; line-height: 1.6;">
          Nous vous remercions chaleureusement pour votre intention de don.
        </p>
        <p style="color: #333; line-height: 1.6;">
          Pour finaliser votre don de manière sécurisée, rendez-vous sur notre page PayAsso :<br>
          <a href="https://www.payasso.fr/iliyin/paiements" style="color: #2dd4a0; font-weight: bold;">www.payasso.fr/iliyin/paiements</a>
        </p>
        <p style="color: #333; line-height: 1.6;">
          Votre soutien nous permet de continuer nos actions concrètes : aide alimentaire, parrainage de familles, soutien d'urgence.
        </p>
        <p style="color: #333; line-height: 1.6; margin-top: 30px;">
          Avec toute notre gratitude,<br>
          <strong>L'équipe ILIYIN</strong>
        </p>
        ${footer}
      `;
      break;
  }

  // Si Resend n'est pas configuré, on log et on continue sans erreur
  if (!isResendConfigured()) {
    console.warn("[Email] Resend non configuré - email de confirmation non envoyé");
    return { success: false, error: "Resend not configured" };
  }

  try {
    const resend = getResend();
    const { data: result, error } = await resend.emails.send({
      from: FROM_EMAIL,
      to,
      subject,
      html: content,
    });

    if (error) {
      console.error("[Email] Erreur confirmation:", error);
      return { success: false, error };
    }

    return { success: true, data: result };
  } catch (err) {
    console.error("[Email] Exception confirmation:", err);
    return { success: false, error: err };
  }
}
