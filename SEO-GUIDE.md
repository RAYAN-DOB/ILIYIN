# Guide SEO - Google Search Console

## ✅ Ce qui a été fait

### 1. Fichiers techniques SEO
- **sitemap.xml** : liste de toutes les pages pour Google
- **robots.txt** : indique à Google quoi indexer
- **Canonical URL** : évite les doublons

### 2. Métadonnées optimisées
- **Title** : `Association ILIYIN | Solidarité & Parrainage (94) - Île-de-France`
- **Description** : 160 caractères avec mots-clés "Association ILIYIN (94)", "parrainage", "aide alimentaire"
- **Keywords** : Association ILIYIN, 94, Fontenay-sous-Bois, parrainage, etc.
- **Open Graph** : pour Facebook, WhatsApp, etc.

### 3. Contenu SEO stratégique
- **Bloc texte visible** sous le hero avec "Association ILIYIN" répété
- Mots-clés : Val-de-Marne (94), Île-de-France, parrainage, aide alimentaire
- Structure H1/H2 optimisée

---

## 📋 À faire maintenant (dans l'ordre)

### 1. Déployer sur Vercel

```bash
git add .
git commit -m "SEO: sitemap, robots, metadata optimisées pour Google"
git push origin main
```

Puis **Vercel** → **Redeploy**

---

### 2. Vérifier que ça fonctionne

Une fois déployé, ouvre dans ton navigateur :

✅ **https://association-iliyin.fr/sitemap.xml**  
→ Tu devrais voir un XML avec la liste des pages

✅ **https://association-iliyin.fr/robots.txt**  
→ Tu devrais voir les règles pour Google

---

### 3. Ajouter le site dans Google Search Console

#### A) Ajouter la propriété

1. Va sur **https://search.google.com/search-console**
2. Clique **Ajouter une propriété**
3. Choisis **Domaine** (ou **Préfixe d'URL**)
4. Entre : `https://association-iliyin.fr`

#### B) Vérifier le domaine

**Méthode recommandée : Balise HTML**

1. Search Console va te donner une balise HTML à ajouter
2. Dis-moi quel code ils te donnent (ex: `<meta name="google-site-verification" content="xxxxx">`)
3. Je l'ajoute dans le site
4. Redéploie
5. Clique **Vérifier** dans Search Console

---

### 4. Soumettre le sitemap

Une fois le domaine vérifié :

1. **Search Console** → **Sitemaps** (menu gauche)
2. Entre : `sitemap.xml`
3. Clique **Envoyer**

Google va indexer tes pages en 24-48h.

---

### 5. Demander l'indexation rapide

Pour aller plus vite :

1. **Search Console** → **Inspection de l'URL**
2. Colle : `https://association-iliyin.fr/`
3. Clique **Demander l'indexation**

Fais pareil pour `/contact` si tu veux.

---

### 6. Google Business Profile (TRÈS IMPORTANT)

C'est **LE truc** qui fait apparaître ton asso en 1er sur "Association ILIYIN" :

1. Va sur **https://business.google.com**
2. Crée un profil pour "Association ILIYIN"
3. Adresse : Fontenay-sous-Bois (94)
4. Catégorie : Association à but non lucratif / Association humanitaire
5. Site web : **https://association-iliyin.fr**
6. Téléphone : 06 50 93 88 70

Google va te demander de **vérifier** (carte postale ou téléphone). Une fois fait, tu seras visible sur **Google Maps** et en haut des recherches "Association ILIYIN".

---

### 7. Backlinks (liens externes)

Plus d'autres sites pointent vers le tien, plus Google te met en haut.

**À faire :**
- ✅ Lien dans la bio Instagram (déjà fait)
- ✅ Lien dans PayAsso (si possible)
- Demander à 2-3 partenaires de mettre un lien
- Créer une page **Facebook** avec le lien du site

---

## 🕐 Délais attendus

- **Sitemap** : indexé en 2-7 jours
- **"Association ILIYIN"** : apparaît en 3-14 jours (avec Google Business : 1-3 jours)
- **Autres mots-clés** (parrainage 94, etc.) : 2-4 semaines

---

## 📊 Surveiller les résultats

Après 7 jours :

1. **Search Console** → **Performances**
2. Regarde les **requêtes** (mots-clés tapés sur Google)
3. Vérifie si "association iliyin" apparaît

Si tu vois peu de clics, ajoute encore plus "Association ILIYIN" dans le contenu de la page.

---

## 🆘 Si le sitemap ne marche pas

Après le déploiement, si https://association-iliyin.fr/sitemap.xml renvoie 404 :

1. Dis-moi
2. Je vérifie la config Next.js

---

**Commence par déployer, puis vérifier sitemap.xml et robots.txt !**
