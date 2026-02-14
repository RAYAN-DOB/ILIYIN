# Configuration rapide des emails — 5 minutes

## Étape 1 : Créer un compte Resend (gratuit)

1. Va sur https://resend.com et crée un compte
2. **Plan gratuit** : 3 000 emails/mois (largement suffisant)

---

## Étape 2 : Obtenir la clé API

1. Une fois connecté, va dans **API Keys** (menu de gauche)
2. Clique sur **Create API Key**
3. **Copie la clé** (elle commence par `re_...`)

---

## Étape 3 : Ajouter les variables sur Vercel

1. Va sur **Vercel** → ton projet **iliyin**
2. **Settings** → **Environment Variables**
3. Ajoute ces **3 variables** (clique sur "Add" pour chacune) :

| Name | Value | Environments |
|------|-------|--------------|
| `RESEND_API_KEY` | `re_xxxxx` (la clé copiée à l'étape 2) | Production, Preview |
| `RESEND_FROM_EMAIL` | `onboarding@resend.dev` | Production, Preview |
| `NOTIFICATION_EMAIL` | `assoiliyin@gmail.com` | Production, Preview |

4. Clique sur **Save** pour chaque variable

---

## Étape 4 : Redéployer le site

1. **Vercel** → **Deployments**
2. Sur le dernier déploiement, clique sur les **…** (trois points)
3. Clique sur **Redeploy**
4. Attends la fin du build (~2 minutes)

---

## Étape 5 : Tester

1. Va sur **https://association-iliyin.fr**
2. Remplis le **formulaire de contact** (avec ton email)
3. Envoie
4. Vérifie :
   - ✅ Email reçu sur `assoiliyin@gmail.com` (notification)
   - ✅ Email de confirmation reçu sur ton email

**Si tu ne reçois pas les emails :**
- Vérifie le dossier **Spam** de Gmail
- Vérifie que les variables sont bien ajoutées dans Vercel
- Vérifie les **logs** : Vercel → Deployments → ton dernier déploiement → **Logs**
- Vérifie dans **Resend Dashboard → Logs** : tous les emails envoyés apparaissent ici

---

## Bonus : Utiliser ton propre domaine

Si tu veux envoyer les emails depuis `contact@association-iliyin.fr` au lieu de `onboarding@resend.dev` :

1. Dans **Resend** → **Domains**
2. Ajoute ton domaine `association-iliyin.fr`
3. Suis les instructions pour vérifier le domaine (ajouter des enregistrements DNS)
4. Une fois vérifié, change `RESEND_FROM_EMAIL` dans Vercel :  
   `RESEND_FROM_EMAIL=contact@association-iliyin.fr`
5. Redéploie

---

**C'est tout !** 🎉

Les formulaires envoient maintenant :
- Un **email de notification** à `assoiliyin@gmail.com` avec toutes les infos
- Un **email de confirmation** à l'utilisateur (s'il a fourni son email)
