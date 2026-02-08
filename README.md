# ILIYIN — Solidarité & Dignité

Site Next.js de l’association ILIYIN : direction artistique orientale (noir, vert, dorures), logo détouré. Remplacer `public/logo-holographic.png` par un PNG à fond transparent pour un détourage parfait.

## Stack

- **Next.js 15** (App Router) + TypeScript
- **Tailwind CSS** + Framer Motion + GSAP
- **Three.js** (arrière-plan particules)
- **Prisma** + PostgreSQL

## Installation

```bash
# Cloner / ouvrir le projet
cd ILIYIN

# Dépendances
npm install

# Variables d'environnement (copier et remplir)
cp .env.example .env.local
# Éditer .env.local : DATABASE_URL, optionnellement ADMIN_PASSWORD, NEXT_PUBLIC_SITE_URL

# Générer le client Prisma et appliquer les migrations
npx prisma generate
npx prisma migrate deploy   # ou npx prisma db push en dev
```

## Scripts

| Commande | Description |
|----------|-------------|
| `npm run dev` | Serveur de développement (Turbopack) |
| `npm run build` | Build production (Prisma generate + Next build) |
| `npm run start` | Démarrer le serveur production |
| `npm run lint` | Linter |
| `npm run prisma:generate` | Générer le client Prisma |
| `npm run prisma:migrate` | Appliquer les migrations en production |
| `npm run prisma:studio` | Ouvrir Prisma Studio |
| `npm run prisma:push` | Pousser le schéma en dev (sans migration) |

## Déploiement sur Vercel

1. **Importer le repo** sur [Vercel](https://vercel.com).
2. **Variables d’environnement** (Settings → Environment Variables) :
   - `DATABASE_URL` : URL PostgreSQL (Vercel Postgres, Neon, Supabase…)
   - `ADMIN_PASSWORD` : mot de passe pour la page `/admin`
   - (optionnel) `NEXT_PUBLIC_SITE_URL`
3. **Build** : la commande par défaut `npm run build` exécute déjà `prisma generate && next build`.
4. **Migrations** : après le premier déploiement, exécuter une fois (avec la même `DATABASE_URL`) :
   ```bash
   npx prisma migrate deploy
   ```
   Ou ajouter dans la Build Command Vercel :  
   `prisma generate && prisma migrate deploy && next build`  
   (en s’assurant que `DATABASE_URL` est disponible au build).

Détails : voir **VERCEL.md**.

## Structure

- `src/app/` — Pages et routes API
- `src/components/cosmic/` — Effets (particules, Matrix rain, motifs)
- `src/components/ui/` — Boutons, NavBar, GlassPanel, etc.
- `src/components/sections/` — Hero, Actions, Don, Bénévoles, Parrainage, À propos, Contact
- `src/app/admin/` — Dashboard admin (mot de passe, export CSV)
- `prisma/` — Schéma et migrations

## API

- `POST /api/contact` — Message de contact
- `POST /api/volunteer` — Inscription bénévole
- `POST /api/sponsor` — Demande de parrainage
- `POST /api/donation` — Enregistrement d’un don
- `GET /api/health` — Santé + connexion base
- `POST /api/admin/auth` — Connexion admin (cookie)
- `GET /api/admin/data` — Données admin (protégé)

## Admin

- URL : **/admin**
- Authentification : mot de passe défini dans `ADMIN_PASSWORD`.
- Contenu : listes des messages contact, bénévoles, parrainages, dons, avec **Export CSV** pour chaque tableau.

## PWA

- `public/manifest.json` — Nom, couleurs, icônes.
- Ajouter des icônes dans `public/icons/` (ex. `icon-192.png`, `icon-512.png`) pour une installation complète.

## Licence

Privé — Association ILIYIN.
