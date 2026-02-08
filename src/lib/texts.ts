/**
 * Textes centralisés du site — ton sobre, universel et neutre.
 */
export const TEXTS = {
  hero: {
    title: "ILIYIN",
    subtitle: "SOLIDARITÉ & DIGNITÉ",
    description:
      "Nous venons en aide aux personnes en situation de précarité, avec une approche respectueuse et discrète.",
    actions:
      "Parrainage de familles • Aide alimentaire • Soutien d'urgence • Actions de terrain",
    trust:
      "Des actions concrètes menées avec respect, transparence et bienveillance",
  },

  actions: {
    title: "Nos actions concrètes",
    description:
      "Sur le terrain, nous intervenons directement auprès des personnes qui en ont le plus besoin.",
    items: [
      {
        title: "Parrainage de familles",
        description:
          "Accompagnement personnalisé pour aider des familles à retrouver autonomie et stabilité.",
      },
      {
        title: "Aide alimentaire",
        description:
          "Distribution de colis alimentaires et produits de première nécessité aux personnes démunies.",
      },
      {
        title: "Soutien au logement",
        description:
          "Aide ponctuelle pour prévenir les situations de rupture et maintenir le logement.",
      },
      {
        title: "Actions de terrain",
        description:
          "Maraudes et présence régulière pour écouter, orienter et apporter un soutien immédiat.",
      },
    ],
    conclusion:
      "Du terrain à l'impact : des actions directes, concrètes et utiles.",
  },

  donation: {
    title: "Soutenez nos actions",
    description:
      "Votre soutien financier permet de financer directement nos interventions sur le terrain.",
    security: "DON SÉCURISÉ - ASSOCIATION RECONNUE",
    impact:
      "Chaque don, quel que soit son montant, participe concrètement à :",
    impacts: [
      "L'achat de denrées alimentaires et produits d'hygiène",
      "Le soutien aux familles en situation précaire",
      "L'organisation des maraudes et distributions",
      "Les frais logistiques des actions terrain",
    ],
    transparency:
      "Transparence : Nous privilégions l'aide directe et communiquons régulièrement sur l'utilisation des fonds.",
  },

  volunteer: {
    title: "Rejoignez notre équipe",
    description:
      "Votre engagement bénévole permet d'amplifier notre impact et d'étendre nos actions.",
    successTitle: "Merci pour votre engagement",
    successText:
      "Nous étudierons votre candidature et vous recontacterons dans les plus brefs délais.",
  },

  sponsor: {
    title: "Parrainez une famille",
    description:
      "Un accompagnement personnalisé pour aider des familles à retrouver autonomie et sérénité.",
    option1Title: "Don financier direct",
    option1Text:
      "Vous définissez un budget que nous utilisons pour les courses et besoins essentiels de la famille.",
    option1Tag: "Simple, rapide, efficace.",
    option2Title: "Course solidaire",
    option2Text:
      "Nous vous transmettons une liste de besoins adaptée. Vous réalisez les courses, nous assurons la livraison.",
    option2Tag: "Concret, transparent, humain.",
    whatsappBanner:
      "Besoin d'aide pour choisir ? Écrivez-nous sur WhatsApp, nous vous guiderons.",
    whatsappCta: "Contacter sur WhatsApp",
  },

  about: {
    title: "Notre engagement",
    description:
      "Une approche humaine et discrète pour agir efficacement là où les besoins sont les plus pressants.",
    intro:
      "Fondée sur des valeurs humanistes universelles, l'association ILIYIN agit avec discrétion et respect pour venir en aide aux personnes en situation de précarité.",
    visionTitle: "Notre vision",
    visionText:
      "Une société où chaque personne, quelle que soit sa situation, peut vivre dans la dignité et bénéficier d'un soutien solidaire.",
    principlesTitle: "Nos principes",
    principlesList: [
      "Discrétion et respect de l'intimité",
      "Action directe et concrète",
      "Transparence dans nos actions",
    ],
    quote:
      "Agir sans faire de bruit, aider sans attendre de retour, être présent là où les besoins sont les plus grands.",
  },

  contact: {
    title: "Contactez-nous",
    description:
      "Pour une réponse rapide, privilégiez le contact par SMS ou WhatsApp.",
    phoneLabel: "Téléphone",
    phoneNote: "SMS ou WhatsApp",
    emailLabel: "Email",
    emailNote: "Pour les demandes détaillées",
    zoneLabel: "Zone d'action",
    zoneValue: "Île-de-France",
    zoneNote: "Interventions nationales possibles",
  },

  footer: {
    tagline: "SOLIDARITÉ • DIGNITÉ • DISCRÉTION",
    missionTitle: "Notre mission",
    missionText:
      "Agir avec discrétion et efficacité pour soutenir les personnes en situation de précarité, dans le respect absolu de leur dignité et de leur intimité.",
    contactTitle: "Contact rapide",
    transparencyTitle: "Transparence",
    transparencyText:
      "Association à but non lucratif déclarée. La totalité des dons est destinée aux actions de terrain.",
    copyright: "Association ILIYIN - Tous droits réservés.",
    legal: "Association humanitaire",
  },
};

/** Points forts et statistiques pour les sections impact */
export const FEATURES = {
  uniqueSellingPoints: [
    {
      title: "Discrétion absolue",
      description: "Nous intervenons dans le respect total de la confidentialité",
      icon: "👁️",
    },
    {
      title: "Aide directe",
      description: "100% des dons vont aux actions de terrain",
      icon: "🎯",
    },
    {
      title: "Réponse rapide",
      description: "Contact WhatsApp sous 24h maximum",
      icon: "⚡",
    },
  ],
  stats: [
    { label: "Familles aidées", value: "50+", suffix: "" },
    { label: "Colis distribués", value: "500", suffix: "+" },
    { label: "Bénévoles actifs", value: "30", suffix: "+" },
    { label: "Taux de satisfaction", value: "98", suffix: "%" },
  ],
};
