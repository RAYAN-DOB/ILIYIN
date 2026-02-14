# Configuration des emails et notifications — ILIYIN

## 1. Envoi d'emails avec Resend

### Inscription sur Resend (gratuit)

1. Créer un compte sur https://resend.com
2. Plan gratuit : **3 000 emails/mois** (largement suffisant pour démarrer)
3. Dans **API Keys**, créer une nouvelle clé et la copier

### Variables d'environnement

Dans **Vercel → Settings → Environment Variables**, ajouter :

| Variable | Valeur | Description |
|----------|--------|-------------|
| `RESEND_API_KEY` | `re_xxxxx` | Clé API Resend (depuis le dashboard) |
| `RESEND_FROM_EMAIL` | `onboarding@resend.dev` | Email expéditeur (par défaut, ou ton domaine vérifié) |
| `NOTIFICATION_EMAIL` | `assoiliyin@gmail.com` | Email de l'asso qui reçoit les notifications |

**Important :** Pour utiliser ton propre domaine (ex. `contact@association-iliyin.fr`), tu dois le vérifier dans Resend (onglet **Domains**). Sinon, utilise `onboarding@resend.dev` (fourni par Resend, fonctionne tout de suite).

### Redéployer

Après avoir ajouté les variables :
1. **Vercel → Deployments** → Redeploy
2. Tester un formulaire (contact, bénévolat, etc.)
3. Vérifier la réception sur `assoiliyin@gmail.com`

---

## 2. Notifications WhatsApp (optionnel)

Resend ne gère que les emails. Pour WhatsApp, plusieurs options :

### Option A : WhatsApp Business API (officiel, payant)

- Nécessite un compte **Meta Business** et **WhatsApp Business API**
- Tarif par message (~0,01-0,05€/message selon le pays)
- Complexe à configurer (vérification, webhooks, etc.)
- Documentation : https://developers.facebook.com/docs/whatsapp

### Option B : Zapier ou Make (no-code, simple)

1. **Zapier** (https://zapier.com) ou **Make** (https://make.com)
2. Créer un webhook qui reçoit les données du formulaire
3. Envoyer un message WhatsApp via une intégration (ex. Twilio + WhatsApp, ou notification Telegram/SMS)
4. Modifier les routes API pour envoyer un POST vers le webhook Zapier/Make

### Option C : Twilio SMS (alternative simple)

Au lieu de WhatsApp, recevoir un **SMS** au 06 50 93 88 70 :
- Créer un compte **Twilio** (https://twilio.com)
- Acheter un numéro français (~1€/mois)
- Tarif SMS : ~0,08€ par SMS
- Intégration simple dans le code (bibliothèque Twilio Node.js)

### Option D : Email + notification mobile

Solution la plus simple :
- Les emails arrivent sur `assoiliyin@gmail.com`
- Active les **notifications push Gmail** sur ton téléphone
- Tu es notifié instantanément sur mobile (comme WhatsApp, mais par email)

**Recommandation :** commence par **Option D** (email + notif mobile), c'est gratuit, instantané et ça fonctionne déjà. Si besoin de WhatsApp plus tard, ajoute Zapier (Option B).

---

## 3. Fonctionnement actuel

Quand quelqu'un remplit un formulaire (contact, bénévolat, parrainage, don) :

### Ce qui se passe automatiquement

1. **Enregistrement en base de données** (PostgreSQL)
2. **Email de notification** envoyé à `assoiliyin@gmail.com` avec :
   - Type de formulaire (contact, bénévolat, etc.)
   - Toutes les informations saisies
   - Lien vers le site
3. **Email de confirmation** envoyé à l'utilisateur (si email fourni) :
   - Message personnalisé selon le formulaire
   - Confirmation de prise en compte
   - Délai de réponse (24-48h)
   - Coordonnées de l'asso

### Templates d'emails

Les emails sont au format HTML avec :
- En-tête aux couleurs ILIYIN (vert émeraude)
- Message personnalisé selon le type de formulaire
- Footer avec coordonnées (téléphone, email, site)

---

## 4. Vérifier que ça marche

### Test en local

```bash
# Ajouter les variables dans .env.local
RESEND_API_KEY=re_xxxxx
RESEND_FROM_EMAIL=onboarding@resend.dev
NOTIFICATION_EMAIL=assoiliyin@gmail.com
DATABASE_URL=postgresql://...

# Lancer le serveur
npm run dev

# Tester un formulaire sur http://localhost:3000
```

### Test en production

1. Aller sur https://association-iliyin.fr
2. Remplir le formulaire de contact (avec ton email)
3. Vérifier :
   - Notification reçue sur `assoiliyin@gmail.com`
   - Email de confirmation reçu sur ton email
   - Données visibles dans l'admin `/admin` (si configuré)

---

## 5. Que faire si ça ne marche pas

### Les emails ne partent pas

1. Vérifier que `RESEND_API_KEY` est bien définie dans Vercel
2. Vérifier les logs du déploiement : **Vercel → Deployments → Logs**
3. Regarder dans **Resend Dashboard → Logs** : tous les emails envoyés/échoués sont listés
4. Vérifier le dossier **Spam** de `assoiliyin@gmail.com`

### Les emails de confirmation ne partent pas

- Vérifier que l'utilisateur a bien saisi un email valide
- Vérifier dans Resend Logs

### Quota dépassé (3000 emails/mois)

- Passer au plan payant Resend (~1€/1000 emails)
- Ou ajouter une limite côté code (ex. max 10 formulaires/heure)

---

## 6. Améliorations futures

### Agent IA (OpenAI)

Pour répondre automatiquement aux demandes simples :
- Intégrer **OpenAI GPT** (API payante, ~0,01€/requête)
- Analyser le contenu du message de contact
- Générer une réponse personnalisée
- L'envoyer par email automatiquement

**Coût estimé :** ~10-20€/mois pour 500-1000 messages

### Tableau de bord admin amélioré

- Répondre aux messages directement depuis `/admin`
- Marquer les demandes comme traitées
- Statistiques (nombre de demandes/jour, type, etc.)

### SMS/WhatsApp

- Twilio pour SMS : ~8€/100 SMS
- WhatsApp Business API : compte Meta Business requis

---

**Besoin d'aide ?**  
Contacte le développeur ou consulte la doc Resend : https://resend.com/docs
