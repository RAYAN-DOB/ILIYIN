# Le build Vercel a échoué — quoi faire

## 1. Vérifier les variables d'environnement

**Settings → Environment Variables** : la variable **`DATABASE_URL`** doit être définie pour **Production** (et **Preview** si tu veux que les previews marchent).

- Si tu utilises **Vercel Postgres** : **Storage** → ta base → **Connect** / **.env** et copie la variable dans le projet (ou lie la base au projet pour qu’elle soit ajoutée auto).
- Si tu utilises **Neon** : récupère l’URL dans le dashboard Neon et colle-la dans `DATABASE_URL`.

## 2. Vérifier l’URL

Elle doit ressembler à :

```
postgresql://USER:PASSWORD@HOST:5432/DATABASE?sslmode=require
```

Souvent `?sslmode=require` est requis pour Vercel Postgres et Neon. Pas d’espace, pas de saut de ligne dans la valeur.

## 3. Relancer un déploiement

Après avoir ajouté ou corrigé `DATABASE_URL` :

**Deployments** → **…** (trois points) sur le dernier déploiement → **Redeploy**.

## 4. Lire l’erreur exacte dans les logs

Dans **Deployments**, ouvre le déploiement qui a échoué et regarde les logs (étape « Running "vercel build" »).

- **Erreur pendant `prisma migrate deploy`** : base absente, URL fausse, ou problème réseau. Vérifie `DATABASE_URL` et que la base existe.
- **Erreur pendant `next build`** : erreur TypeScript ou dans le code. Copie le message (fichier + ligne) pour corriger.

## 5. Changement dans le projet

Le script **vercel-build** a été modifié : si `prisma migrate deploy` échoue (ex. pas de `DATABASE_URL`), le build continue quand même et le site se déploie. Les pages qui utilisent la base renverront une erreur tant que `DATABASE_URL` n’est pas correctement configurée.

Après avoir poussé ce changement sur `main`, redéploie ; si l’échec venait uniquement des migrations, le build devrait passer.
