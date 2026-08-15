# Déploiement

Le site est déployé sur **Cloudflare Workers** via [OpenNext](https://opennext.js.org/cloudflare).

## Prérequis

- `wrangler` doit être connecté à un compte Cloudflare : `npx wrangler login` (ouvre le navigateur).
- Variables d'environnement Sanity, à renseigner à deux endroits :
  - `.env.local` — utilisé par `next dev` / `next build` en local (déjà en place, gitignore).
  - `.dev.vars` — utilisé par `wrangler dev` / `npm run preview` en local (déjà en place, gitignore).
  - Dashboard Cloudflare (Worker → Settings → Variables) — nécessaire pour la prod. Ajouter :
    - `NEXT_PUBLIC_SANITY_PROJECT_ID`
    - `NEXT_PUBLIC_SANITY_DATASET`

## Commandes

```bash
npm run dev      # dev habituel (Next.js)
npm run preview  # build + preview local dans le runtime Workers (wrangler dev)
npm run deploy   # build + déploiement sur Cloudflare Workers (prod)
```

## Domaine personnalisé (DNS chez IONOS)

1. Déployer une première fois (`npm run deploy`) pour obtenir une URL `*.workers.dev` fonctionnelle.
2. Dans le dashboard Cloudflare : Worker → Settings → Domains & Routes → Add Custom Domain, avec le domaine acheté.
3. Cloudflare indique alors les enregistrements DNS à créer. Deux options :
   - **Nameservers Cloudflare** (recommandé) : dans IONOS, remplacer les serveurs de noms par ceux fournis par Cloudflare. Cloudflare gère alors tout le DNS et le SSL est automatique.
   - **Enregistrement CNAME/A seul** : si on garde les nameservers IONOS, ajouter l'enregistrement que Cloudflare indique (nécessite Cloudflare for SaaS ou équivalent selon le plan).
4. La propagation DNS peut prendre de quelques minutes à 24h.

## Notes

- Le projet est hébergé dans un dossier OneDrive. OneDrive peut remplacer des fichiers par des placeholders cloud ("Files On-Demand") qui cassent le build Next.js (`EINVAL: readlink`). Si ça se reproduit : clic droit sur le dossier du projet → **"Toujours conserver sur cet appareil"**, ou en ligne de commande :
  ```bash
  attrib +P -U "chemin\du\projet" /S /D
  ```
- Le site utilise l'ISR (`revalidate: 60`) sur `/blog/[slug]` et `/realisations/[slug]` — géré nativement par l'adaptateur OpenNext sur Workers.
