# Héberger ILIYIN gratuitement

Guide pour mettre le site en ligne **sans frais** (Vercel + base de données gratuite).

---

## Étape 1 — Mettre le code sur GitHub

1. Crée un compte sur [github.com](https://github.com) si tu n’en as pas.
2. Crée un **nouveau dépôt** (New repository), par ex. `iliyin-site`.
3. Dans le dossier du projet, ouvre un terminal et exécute :

```bash
git init
git add .
git commit -m "Site ILIYIN prêt pour déploiement"
git branch -M main
git remote add origin https://github.com/TON-PSEUDO/iliyin-site.git
git push -u origin main
```

(Remplace `TON-PSEUDO` et `iliyin-site` par ton pseudo GitHub et le nom du repo.)

---

## Étape 2 — Créer une base de données gratuite

Le site a besoin d’une base **PostgreSQL** pour les formulaires (contact, dons, bénévoles, parrainage) et l’admin.

### Option A : Vercel Postgres (le plus simple)

1. Plus tard, quand tu auras créé le projet sur Vercel (étape 3), va dans ton projet → **Storage** → **Create Database** → **Postgres**.
2. Lie la base au projet : `DATABASE_URL` sera ajoutée automatiquement.

### Option B : Neon (gratuit, sans carte bancaire)

1. Va sur [neon.tech](https://neon.tech) et crée un compte.
2. Crée un projet (région Europe si possible).
3. Dans le tableau de bord, récupère l’**Connection string** (ex. `postgresql://user:pass@ep-xxx.region.aws.neon.tech/neondb?sslmode=require`).
4. Tu utiliseras cette URL comme `DATABASE_URL` sur Vercel à l’étape 4.

---

## Étape 3 — Déployer sur Vercel

1. Va sur [vercel.com](https://vercel.com) et connecte-toi (avec GitHub si possible).
2. Clique sur **Add New** → **Project**.
3. **Import** le dépôt GitHub du site (ex. `iliyin-site`).
4. Vercel détecte Next.js ; ne change rien au **Build Command** (le projet utilise déjà `npm run vercel-build` dans `vercel.json`).
5. Clique sur **Deploy**. Un premier déploiement peut passer **sans** base : le site s’affiche, mais les formulaires et l’admin ne marcheront qu’après avoir ajouté la base.

---

## Étape 4 — Ajouter les variables d’environnement

1. Dans ton projet Vercel : **Settings** → **Environment Variables**.
2. Ajoute :

| Nom | Valeur | Environnement |
|-----|--------|----------------|
| `DATABASE_URL` | L’URL PostgreSQL (Neon ou Vercel Postgres) | Production, Preview |
| `ADMIN_PASSWORD` | Un mot de passe fort pour accéder à `/admin` | Production |
| `NEXT_PUBLIC_SITE_URL` | `https://ton-projet.vercel.app` (remplace par l’URL réelle) | Production (optionnel) |

3. Sauvegarde, puis va dans **Deployments** → sur le dernier déploiement, clique sur **⋯** → **Redeploy** pour que le build refasse un déploiement avec la base (migrations appliquées automatiquement).

---

## Étape 5 — Vérifier

- Ouvre l’URL du site (ex. `https://iliyin-xxx.vercel.app`).
- Teste un formulaire (contact ou don) pour vérifier que la base répond.
- Va sur `https://ton-site.vercel.app/api/health` : tu dois voir `{ "status": "ok", "database": "connected" }` si tout est bon.
- Pour l’admin : `https://ton-site.vercel.app/admin` (avec le mot de passe défini dans `ADMIN_PASSWORD`).

---

## Récap — Ce qui est gratuit

- **Vercel** : hébergement Next.js gratuit (limites généreuses pour un site associatif).
- **Vercel Postgres** ou **Neon** : base PostgreSQL gratuite (suffisant pour contact, dons, bénévoles, parrainage).
- **Domaine** : tu peux garder le sous-domaine Vercel (`xxx.vercel.app`) ou ajouter plus tard un nom de domaine (ex. `iliyin.org`) dans **Settings → Domains**.

Une fois ces étapes faites, le site est en ligne et les données des formulaires sont enregistrées en base.
