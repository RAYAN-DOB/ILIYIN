# Déploiement sur Vercel — ILIYIN

## 1. Prérequis

- Compte [Vercel](https://vercel.com)
- Base PostgreSQL (recommandé : [Vercel Postgres](https://vercel.com/storage/postgres) ou [Neon](https://neon.tech))

## 2. Déployer le projet

1. **Importer le repo** sur Vercel (GitHub / GitLab / Bitbucket).
2. **Framework Preset** : Next.js (détecté automatiquement).
3. **Build Command** : `npm run vercel-build` (déjà dans vercel.json : prisma generate + migrate deploy + next build).
4. **Output Directory** : laisser par défaut.

## 3. Variables d’environnement (Vercel)

Dans **Project → Settings → Environment Variables**, ajouter :

| Nom               | Valeur                    | Environnement   |
|-------------------|---------------------------|-----------------|
| `DATABASE_URL`    | `postgresql://...` (URL de ta base) | Production, Preview |
| `NEXT_PUBLIC_SITE_URL` | `https://ton-domaine.vercel.app` | Optionnel |
| `ADMIN_PASSWORD` | Mot de passe pour /admin | Production |

Pour **Vercel Postgres** : créer une base dans l’onglet Storage, puis lier le projet ; `DATABASE_URL` est ajoutée automatiquement.

## 4. Appliquer les migrations en production

Après le premier déploiement (ou après changement du schéma Prisma) :

- **Option A** : Dans Vercel, onglet **Settings → General**, ajouter une **Build Command** qui exécute aussi les migrations :
  ```bash
  prisma generate && prisma migrate deploy && next build
  ```
  (et s’assurer que `DATABASE_URL` est définie au moment du build).

- **Option B** : Exécuter en local (avec la même `DATABASE_URL` que la prod) :
  ```bash
  npx prisma migrate deploy
  ```

## 5. Vérifier le déploiement

- Page d’accueil : `https://ton-projet.vercel.app`
- Santé + base : `https://ton-projet.vercel.app/api/health`  
  Réponse attendue : `{ "status": "ok", "database": "connected" }`.

## 6. Build sans base (preview sans DB)

Si `DATABASE_URL` n’est pas définie, le build Next.js passe quand même (`prisma generate` ne nécessite pas de connexion).  
Les routes qui utilisent Prisma (contact, health) renverront une erreur 503 ou 500 tant qu’aucune base n’est configurée.
