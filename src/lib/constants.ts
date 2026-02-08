export const SITE_CONFIG = {
  name: "ILIYIN",
  title: "ILIYIN - Solidarité & Dignité",
  description:
    "Association humanitaire œuvrant pour l'entraide et la dignité de chacun, sans aucune distinction.",
  url: "https://iliyin.org",
  email: "iliyin@outlook.fr",
  phone: "+33650938870",
  phoneDisplay: "06 50 93 88 70",
  address: "Fontenay-sous-Bois, Île-de-France",
  social: {
    instagram: "https://www.instagram.com/assoiliyin",
    whatsapp: "https://wa.me/33650938870",
  },
  donateUrl: "https://www.payasso.fr/iliyin/paiements",
};

/** Infos officielles pour la page Contact & Infos */
export const CONTACT_CONFIG = {
  associationName: "Association ILIYIN",
  zone: "Île-de-France et interventions nationales",
  contactNotice: "Pour une réponse rapide, contactez-nous par SMS ou WhatsApp",
  phone: "06 50 93 88 70",
  phoneRaw: "0650938870",
  whatsappUrl: "https://wa.me/33650938870",
  instagramUrl: "https://www.instagram.com/assoiliyin",
  donateUrl: SITE_CONFIG.donateUrl,
  copyValue: "06 50 93 88 70",
  page: {
    title: "Contact & Informations",
    subtitle: "Nous répondons rapidement par WhatsApp ou SMS",
    inclusivity:
      "Notre action s'adresse à toute personne dans le besoin, sans aucune distinction.",
    donatePhrase:
      "Votre don finance des actions concrètes : aide alimentaire, soutien d'urgence, accompagnement.",
    availabilityTitle: "Disponibilités",
    availabilityText:
      "Nos équipes sont mobilisées selon les besoins terrain. Réponse sous 24h.",
    badgeSmsWhatsapp: "Contact privilégié : SMS / WhatsApp",
  },
};

export const NAV_ITEMS = [
  { label: "Accueil", href: "/" },
  { label: "Nos actions", href: "/#actions" },
  { label: "Faire un don", href: SITE_CONFIG.donateUrl },
  { label: "Devenir bénévole", href: "/#volunteer" },
  { label: "Parrainage", href: "/#sponsor" },
  { label: "À propos", href: "/#about" },
  { label: "Contact", href: "/contact" },
];
