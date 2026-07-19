# Site ARDENT — cabinet de communication

Site vitrine en Next.js (App Router), CSS pur, sans Tailwind.

## Lancer le projet en local

```bash
npm install
npm run dev
```

Ouvre ensuite http://localhost:3000

Pour le mettre en ligne rapidement (gratuit) : pousse le dossier sur GitHub
puis connecte le repo sur https://vercel.com — déploiement automatique.

## Structure

```
app/
  layout.js          → layout racine minimal (juste html/body/polices)
  globals.css        → TOUS les tokens de design (couleurs, typo) sont ici
  (site)/            → groupe de routes du site public (header+footer+curseur)
    layout.js         → applique Header/Footer/CustomCursor à tout ce groupe
    page.js           → Accueil
    agence/page.js    → Positionnement + Équipe
    expertises/page.js → Tous les services, blocs numérotés
    realisations/page.js → Toutes les réalisations
    blog/page.js      → Tous les articles
    blog/[slug]/page.js → Page dédiée par article
    contact/page.js   → Formulaire de contact
  studio/            → interface d'admin Sanity, isolée, accessible sur /studio
components/
  Header.js        → nav multi-pages, transparent puis solide au scroll
  Hero.js          → titre + mots animés + halo souris + photo caméléon duotone
  Marquee.js       → bandeau de mots-clés défilant
  Stats.js         → chiffres-clés (chiffres à remplacer)
  ClientLogos.js   → bandeau logos clients (noms à remplacer)
  ExpertiseList.js → blocs de services numérotés (page Expertises)
  PageHeader.js    → en-tête réutilisable pour les pages internes
  CustomCursor.js  → curseur personnalisé (désactivé sur tactile)
  Reveal.js        → wrapper d'animation d'apparition au scroll
  Services.js      → connecté à Sanity, prop limit/showLink (fond sombre)
  Portfolio.js     → connecté à Sanity, prop limit/showLink (fond clair)
  Testimonials.js  → connecté à Sanity (fond sombre)
  Team.js          → connecté à Sanity (fond clair)
  Blog.js          → connecté à Sanity, prop limit/showLink, liens vers /blog/[slug] (fond sombre)
  Contact.js       → formulaire complet + réservation + coordonnées (fond clair)
  Footer.js        → colonnes nav/réseaux/contact + mini CTA (fond sombre)
sanity/
  schemaTypes/    → définition des 5 types de contenu éditables
sanity.config.js  → configuration du Studio (nom, plugins, schémas)
lib/sanity/
  client.js       → connexion à l'API Sanity
  queries.js      → requêtes GROQ pour chaque type de contenu
  image.js        → génération des URLs d'images optimisées
```

## Restructuration multi-pages (inspirée de la structure d'atmedia.fr)

Le site est passé d'une page unique à un vrai site multi-pages. **Le contenu
reste celui de Tiemogo** — seule la structure/organisation s'inspire du
site de référence, pas le contenu ni le design final.

### Pages créées

| URL | Contenu |
|---|---|
| `/` | Hero, ticker de mots-clés, aperçu Services (3), aperçu Réalisations (4), Témoignages, Stats, logos clients |
| `/agence` | Positionnement + Équipe complète |
| `/expertises` | Tous les services en détail, blocs numérotés (01, 02...) |
| `/realisations` | Toutes les réalisations (grille complète) |
| `/blog` | Tous les articles |
| `/blog/[slug]` | **Page dédiée par article**, contenu riche (le champ `body` du schéma `post`, resté inutilisé jusque-là, sert enfin à quelque chose) |
| `/contact` | Formulaire complet + réservation + coordonnées |

### Ce qui a changé techniquement

- **Header et Footer** sont passés dans `app/(site)/layout.js` — ils
  s'affichent automatiquement sur toutes les pages du site, plus besoin de
  les répéter
- **`/studio` reste totalement isolé** de ce layout (pas de header/footer/
  curseur personnalisé dessus) — c'est le rôle du groupe de routes `(site)`
  entre parenthèses, qui n'affecte pas les URLs mais permet d'avoir un
  layout différent pour le Studio
- **Nouveaux composants** : `Stats.js` (chiffres-clés, chiffres à
  remplacer), `ClientLogos.js` (bandeau clients, noms à remplacer),
  `ExpertiseList.js` (blocs numérotés), `PageHeader.js` (en-tête réutilisable
  pour les pages internes)
- **Le ticker de mots-clés est de retour** (`Marquee.js`) — le site de
  référence en utilise un aussi, donc plus de raison de s'en priver
- **`Services`, `Portfolio` et `Blog`** acceptent maintenant une prop
  `limit` (aperçu sur l'accueil) et `showLink` (bouton vers la page complète)

## Intégration Sanity CMS (auto-édition pour Tiemogo)

Cinq types de contenu sont maintenant gérables depuis une interface d'admin,
sans toucher au code : **Services, Réalisations, Témoignages, Articles,
Équipe**.

### Comment ça marche concrètement

- Le Studio d'administration est **intégré directement dans le site**, à
  l'adresse `/studio` (ex: `tiemogo.com/studio` une fois en ligne, ou
  `localhost:3000/studio` en local)
- Chaque section du site va chercher son contenu dans Sanity à chaque visite
  (avec une mise à jour automatique toutes les 60 secondes maximum — pas
  besoin de redéployer)
- **Tant que le projet Sanity n'est pas configuré, ou tant qu'aucun contenu
  n'a été ajouté**, le site affiche automatiquement le contenu "placeholder"
  actuel — rien ne casse, rien ne s'affiche vide

### Mise en route (à faire une seule fois)

1. Crée un compte sur https://www.sanity.io (gratuit)
2. Crée un nouveau projet depuis https://sanity.io/manage → note son
   **Project ID**
3. Copie `.env.local.example` en `.env.local`, colle le Project ID dedans :
   ```
   NEXT_PUBLIC_SANITY_PROJECT_ID=xxxxxxxx
   NEXT_PUBLIC_SANITY_DATASET=production
   ```
4. `npm install` (les nouvelles dépendances Sanity doivent être installées)
5. `npm run dev`, puis va sur `localhost:3000/studio` — connecte-toi avec ton
   compte Sanity, tu arrives sur l'interface d'admin
6. Ajoute du contenu (Services, Réalisations, etc.) — il apparaît sur le site
   en moins d'une minute
7. **Pour donner l'accès à ton ami** : sur https://sanity.io/manage, page du
   projet → onglet "Members" → "Invite members" → son email → rôle
   "Editor" (pas besoin de lui donner le rôle Admin, Editor lui permet
   d'ajouter/modifier le contenu sans toucher à la configuration technique)

### Ce qui n'est pas encore fait

- [ ] Le déploiement final devra aussi avoir ces variables d'environnement
      configurées sur Vercel (Project Settings → Environment Variables)

## Cette itération : caméléon + alternance de couleurs + footer + curseur

- [x] **Photo caméléon intégrée dans le Hero** : traitement duotone noir/orange
      (`public/chameleon.jpg`), en grand à droite, fondue dans le fond sombre
      grâce à un masque en dégradé (`Hero.js` / `Hero.module.css`, classe
      `.visual`). Réduite et discrète sur mobile.
- [x] **Alternance de couleurs rétablie** : Services(sombre) → Portfolio(clair)
      → Témoignages(sombre) → Équipe(clair) → Actus(sombre) → Contact(clair)
      → Footer(sombre)
- [x] **Footer enrichi** : réseaux sociaux + mini CTA — **sans** nav secondaire
      cette fois (demande explicite)
- [x] **Curseur personnalisé corrigé** : reste orange fixe (plus de bleu sur
      fond clair), disparaît proprement dans les champs de saisie pour laisser
      place au curseur texte natif
- [x] **Ticker de mots-clés** : reste écarté, mis de côté pour l'instant

## Retours en arrière (jugés trop "brouillon")

- [x] **Retiré** : le bandeau de mots-clés défilant (`Marquee.js`)
- [x] **Retiré** : l'alternance de couleurs par section — retour aux couleurs
      d'origine (Services/Portfolio/Contact sombres, Témoignages/Équipe/Actus
      clairs)
- [x] **Retiré** : le footer enrichi (nav secondaire, réseaux, mini CTA) —
      retour au footer simple à deux lignes
- [x] **Conservé** : le formulaire fonctionnel (Formspree), le header qui se
      solidifie au scroll, le curseur personnalisé, les animations en cascade
      sur les cartes

## Corrections apportées avant ça (formulaire + rythme visuel + finitions)

- [x] **Formulaire de contact fonctionnel** via Formspree (gratuit, sans
      backend). ⚠️ **Action requise avant mise en ligne** :
      1. Crée un compte sur https://formspree.io (gratuit)
      2. Crée un formulaire, récupère son ID
      3. Remplace `FORMSPREE_ENDPOINT` en haut de `Contact.js`
      Sans ça, le formulaire affichera une erreur à l'envoi.
- [x] **Rythme visuel corrigé** : alternance sombre/clair section par section
      (Services sombre → Portfolio clair → Témoignages sombre → Équipe clair
      → Actus sombre → Contact clair → Footer sombre)
- [x] **Animations en cascade** : les cartes de Services, Portfolio et
      Témoignages apparaissent maintenant une par une avec un léger décalage
- [x] **Header transparent** au-dessus du Hero, qui se solidifie au scroll
- [x] **Footer enrichi** : nav secondaire, réseaux sociaux (liens à
      compléter), mini CTA
- [x] **Curseur personnalisé** (petit rond orange en mode "difference", se
      désactive automatiquement sur mobile/tactile)

## Déjà fait avant ça (infos Facebook + formulaire de besoins)

- [x] **Nom** : Tiemogo Communication
- [x] **Logo réel** : intégré dans `public/logo.png` et affiché dans `Header.js`
- [x] **Couleur de marque** : orange exact du logo (`#f94b02`) dans `globals.css`
- [x] **Tagline / positionnement** : "communication sur mesure", thème du
      caméléon repris dans le Hero ET dans une section dédiée (`Philosophy.js`)
- [x] **CTA principal harmonisé** : "Parlons de votre projet" (header + hero)
- [x] **Parcours réorganisé** : Hero → Philosophie → Services → Réalisations
      → Témoignages → Équipe → Actus → Contact (suit le parcours décrit dans
      le formulaire de besoins)
- [x] **Section Témoignages** ajoutée (`Testimonials.js`)
- [x] **Formulaire de contact étoffé** : Prénom, Nom, Entreprise, Téléphone,
      Budget, Date de réalisation souhaitée, Description du projet
- [x] **Retiré** : la référence littérale au caméléon ("Comme le caméléon...")
      et l'icône `ChameleonMark` — jugées redondantes avec le Hero
- [x] **Site rendu plus premium** : bandeau de mots-clés défilant (`Marquee.js`)
      entre le Hero et les Services, halo lumineux qui suit la souris dans le
      Hero, animations d'apparition au scroll sur toutes les sections
      (`Reveal.js`), survols enrichis sur les cartes (élévation + liseré orange)

## Checklist : ce qu'il reste à faire

- [ ] **Créer le compte Formspree et remplacer `FORMSPREE_ENDPOINT`** dans
      `Contact.js` — sans ça le formulaire ne fonctionnera pas

- [ ] **Lien Calendly/Cal.com réel** : remplacer `BOOKING_URL` dans
      `Contact.js` (placeholder actuel : calendly.com/tiemogo-communication/echange)
- [ ] **Confirmer l'email de contact réel** (`Contact.js`)
- [ ] **Services réels** : tableau `SERVICES` dans `Services.js`
- [ ] **Équipe réelle** : tableau `TEAM` dans `Team.js` — ajoute les photos en
      renseignant le champ `photo`
- [ ] **Projets/portfolio réels** : tableau `PROJECTS` dans `Portfolio.js`
- [ ] **Témoignages réels** : tableau `TESTIMONIALS` dans `Testimonials.js`
- [ ] **Articles réels** : tableau `POSTS` dans `Blog.js`
- [ ] **Téléphone et adresse** dans `Contact.js`
- [ ] **Multilingue** : reporté après les 2 jours, à prévoir en phase 2
- [ ] **Téléchargement de brochure/documents** : demandé dans le formulaire,
      pas encore intégré — à voir une fois le PDF de plaquette disponible

## Couleurs (à ajuster si besoin)

Tout est centralisé dans `app/globals.css`, en haut du fichier (`:root`) :
- `--orange` : orange signal, couleur de marque principale
- `--ink` : noir de fond
- `--paper` : blanc cassé utilisé pour les sections claires (Équipe, Actus)

Si ton ami a un orange précis (code hex du logo), remplace juste
`--orange` et `--orange-deep` par ses valeurs — tout le site suivra.
