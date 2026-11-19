# Checklist relecture finale — natureclean.fr (questionnaire nov. 2026)

**Objectif** : valider contenu, crédibilité et parcours avant preview prod / mise en ligne.  
**Référence** : `docs/VALIDATION-textes-services-questionnaire.md`, PDF bureau 16 nov. 2026.

---

## Avant de commencer

```bash
cd "/Users/diabira/Downloads/natureclean-12 septempbre 2026"
npm run dev
# → http://localhost:5173 (ou port affiché)
npx tsc --noEmit
```

| État technique (17 nov.) | |
|--------------------------|---|
| `tsc --noEmit` | OK |
| Dernier push `main` | `07b713b` — alignement questionnaire + devis gratuit |
| **Non poussé** (local) | `BeforeAfterCompare`, `Header`, `ServiceCarousel`, `theme.css` |

---

## 1. Vérifications globales (toutes les pages)

Cocher après une passe rapide sur **Accueil + Devis + Footer** :

- [ ] **Adresse** : 22 Traverse Pupat, 13008 — nulle part « 24 avenue du Prado » (siège).
- [ ] **Téléphone** : 04 84 89 68 75 — cliquable, cohérent header/footer (`constants.ts`).
- [ ] **Horaires accueil** : lun–ven 9 h–18 h (pas lun–sam 8–18 en accroche principale).
- [ ] **SLA** : « prise en charge sous 4 h ouvrées » + « devis détaillé après étude » (pas « devis sous 24 h » systématique).
- [ ] **Devis** : CTA « Devis gratuit » / « Demander un devis gratuit » cohérents ; page `/devis` alignée.
- [ ] **Effectif** : aucun nombre de salariés affiché sur le site.
- [ ] **Note Google** : 4,8/5 sans compteur d’avis figé sur le site (lien fiche OK).
- [ ] **Année création** : aucune année Kbis affichée au public.
- [ ] **RC Pro** : pas de « décennale » ; FAQ assurance = périmètre vitres / graffitis / Diogène / sinistres (accueil + `/services`).
- [ ] **Éco** : pas de % éco-labellisé marketing ; `RESPONSIBLE_PRACTICES` uniquement.
- [ ] **JSON-LD** : pas d’`aggregateRating` / faux avis (voir `cleaning-service-jsonld.ts`).

**Recherche résidus** (optionnel) :

```bash
rg -i "devis sous 24|devis en 2|15 ans|500\\+|décennale|ISO 9" src public index.html
# Légitime : « 24 h » **urgence livraison chantier** uniquement (fiche fin de chantier).
# Légitime : quartier **Prado**, pas l’ancienne adresse Prado.
```

---

## 2. Parcours prioritaire (URLs)

### Accueil & conversion

| URL | À vérifier |
|-----|------------|
| `/` | Hero lisible, stats (4 h / devis gratuit / RC Pro), **carrousel 9 spécialités** (photos 4:3), comparateur avant/après **sans clic d’activation**, bloc Diogène, CTA devis |
| `/devis` | Wizard 3 étapes, Turnstile si activé, libellés « devis gratuit » |
| `/merci` | Message 4 h ouvrées, pas « rappel sous 24 h » |
| `/contact` | Horaires, message confirmation formulaire |

### Hub & zone

| URL | À vérifier |
|-----|------------|
| `/services` | 10 fiches listées, FAQ assurance, liens géo |
| `/zones-intervention` | 9 villes, bloc SEO long, process 4 h / devis après étude |
| `/nature-clean-eco` | Pas de % éco, bloc SEO, coordonnées Pupat |

### Fiches services (PDF intégral ou rubriques 1–2)

| URL | Points sensibles |
|-----|------------------|
| `/services/nettoyage-diogene` | Mandat occupant, bordereau/voirie/tenue, pas de sur-promesse médicale |
| `/services/remise-etat-sols` | Tommettes, 3 phases si documentées, sans machines inventées |
| `/services/nettoyage-graffitis` | Cas grande surface, logos / accords non sur-vendus |
| `/services/nettoyage-chantiers` | 3 phases, photos pas « certificat », 24 h = urgence livraison seulement |
| `/services/nettoyage-gros-chantiers` | Différence vs fin chantier, pas « caution » |
| `/services/nettoyage-coproprietes` | **5 immeubles / 2 syndics**, fiche de passage |
| `/services/entretien-bureaux` | Fiche de passage étape 4, zones Prado/Joliette liens |
| `/services/nettoyage-commerces` | Section démarrage 4 étapes |
| `/services/nettoyage-vitre` | Perche, calcaire, pas vitrier cordiste annoncé |
| `/services/nettoyage-cabinet-medical-marseille` | Limites opératoire/DASRI, `?service=medical` |
| `/services/nettoyage-evenementiel` | Préavis, planning |
| `/nettoyage-vitre` | Route alias si utilisée dans menu |

### Blog & preuves (échantillon)

| URL | À vérifier |
|-----|------------|
| `/blog/devis-nettoyage-marseille-guide` | Devis gratuit + 4 h, pas promesse 24 h écrite |
| `/blog/nettoyage-graffitis-grande-surface-marseille` | Enseigne anonymisée / floutage prévu |
| `/realisations` | Pas de noms clients non autorisés |

### Pages légales

| URL | À vérifier |
|-----|------------|
| `/mentions-legales` | Pupat, SIRET 89020726900022 |
| `/politique-de-confidentialite` | RGPD OK |

---

## 3. Desktop & mobile (30 min)

Pour chaque **template** (hero service, footer, menu mobile) :

- [ ] **Header** : slogan complet visible (lg+), bouton Devis gratuit lisible.
- [ ] **Menu mobile** : tous les services accessibles, téléphone + devis.
- [ ] **CTA verts** : texte **blanc** sur fond green-500 (hero services, accueil).
- [ ] **Carrousel services** : &lt; lg = scroll horizontal ; lg+ = 2 cartes, xl = 3.
- [ ] **Contrastes** : hero sombre + texte, pas de texte illisible sur photo.

Breakpoints à tester : ~390px, 768px, 1024px, 1440px.

---

## 4. SEO & hors site

- [ ] **Onglet / titre** : pas « Devis 24h » sur l’accueil (`index.html` + `SEO_Guardian`).
- [ ] **Meta description** accueil : RC Pro, devis après étude.
- [ ] `public/llms.txt` et `public/ai-catalog.json` : Pupat, 4 h, devis.
- [ ] **Google Business Profile** : adresse = site (checklist `scripts/google-business-profile-checklist.txt`).

---

## 5. Hors périmètre / à faire côté direction

- [ ] **Floutage marques** sur photos (Carrefour, enseignes) — contenu texte déjà adouci.
- [ ] **Rubrique 9 PDF** : accords clients écrits — non publiés volontairement.
- [ ] **Nombre d’avis Google** : ne pas afficher en dur sur le site ; tenir 4,8/5 à jour si la fiche bouge.

---

## 6. Build & déploiement

- [ ] `npx tsc --noEmit`
- [ ] `npx vite build` (ignorer échec Puppeteer prerender en sandbox local si bundle OK)
- [ ] Preview Vercel sur branche ou `main` après commit des 4 fichiers locaux restants
- [ ] Smoke test prod : `/`, `/devis`, une fiche service, formulaire test

---

## 7. Sign-off

| Rôle | Nom | Date | OK |
|------|-----|------|-----|
| Direction contenu | | | [ ] |
| SEO / tracking | | | [ ] |
| Mise en ligne | | | [ ] |

**Commentaires** :

```
(espace libre)
```