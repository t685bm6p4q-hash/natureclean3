# Rapport de travail — Nature Clean (handoff pour Claude)

**Projet** : site `natureclean.fr` — repo local  
`/Users/diabira/Downloads/natureclean-12 septempbre 2026`  
**Source métier** : PDF bureau `Site natureclean.fr corrections globales et pages à réécrire.pdf` (questionnaire 16 nov. 2026, 9 pages)  
**Consigne direction** : appliquer les **règles globales** d’abord, puis textes / blog ; **ne pas push ni déployer** tant que la direction n’a pas validé.  
**Date du rapport** : 17 nov. 2026

---

## 1. Objectif global

Rendre le site **cohérent avec le questionnaire** : une seule « vérité » (adresse, horaires téléphone, SLA, zone, équipe, pratiques éco sans % marketing), supprimer les promesses invérifiables (ISO, ARS marketing, nacelle/CACES, 50 % éco, 2 h, 7j/7, etc.), réécrire les pages dont le PDF donne le texte intégral (Diogène, sols, graffitis), **compléter** les autres fiches services à partir des rubriques 1–2 + structure existante.

---

## 2. Source de vérité technique

Fichier central : **`src/app/utils/constants.ts`**

| Constante | Usage |
|-----------|--------|
| `OFFICE_ADDRESS_LINE` | 22 Traverse Pupat, 13008 Marseille |
| `PHONE_RECEPTION_HOURS` / `PHONE_RECEPTION_HOURS_LONG` | Lun–ven 9 h–18 h |
| `LEAD_RESPONSE_SLA` / `LEAD_RESPONSE_SLA_SHORT` | Prise en charge sous 4 h ouvrées |
| `QUOTE_PROCESS_LINE` | Devis à partir infos, photos, plans, surfaces |
| `MOBILIZATION_AFTER_QUOTE` | Mobilisation en général sous 48 h après validation devis |
| `INTERVENTION_SCHEDULE_NOTE` | Lun–sam + créneaux spécifiques |
| `TEAM_SIZE` | 7 |
| `RESPONSIBLE_PRACTICES_LINE` / `SHORT` | Remplace les % éco-labellisés |
| `FOUNDING_YEAR` | **Interne uniquement** — ne pas afficher (Kbis non validé) |

Référence checklist : `docs/Site-natureclean-corrections-globales-et-pages.md`  
Grille validation : `docs/VALIDATION-textes-services-questionnaire.md`

---

## 3. Corrections globales (phase 1 — ~35 fichiers touchés avant handoff)

- **JSON-LD** : `cleaning-service-jsonld.ts`, `index.html` — horaires lun–ven 9–18, pas de `foundingDate` public, description sans 50 % éco.
- **Footer / contact** : adresse Traverse Pupat, horaires alignés.
- **`public/llms.txt`**, **`public/ai-catalog.json`**, **`.well-known/ai-catalog.json`**.
- **Remplacements massifs** (scripts Python) : « réponse sous 2 h », lun–sam 8h, 7j/7, « depuis 2021 » affiché, % éco — **risque** : phrases cassées type « professionnels adaptés » en double (partiellement corrigées ensuite).
- **Zones** : Bouches-du-Rhône (retrait PACA / 06 / 83 sur pages géo listing ; `zone-data.ts` 9 villes).

---

## 4. Pages réécrites (texte PDF intégral — §3 à 5)

| Page | Fichier | Contenu |
|------|---------|---------|
| Diogène | `src/app/pages/services/NettoyageDiogenePage.tsx` | Process 6 étapes, qui mandate, nuisibles via partenaire, [à confirmer] visite/bordereau/voirie |
| Remise en état sols | `src/app/pages/services/RemiseEtatSolsPage.tsx` | Monobrosse, pas cristallisation prometteuse |
| Graffitis | `src/app/pages/services/NettoyageGraffitisPage.tsx` | Produits adaptés, pas aérogommage en promesse |

Métas : `src/app/config/seo-data.ts` (sections concernées).  
Header menu sols : « Décapage & monobrosse ».

---

## 5. Suite PDF p.9 — règles sur autres fiches (sans texte intégral PDF)

Modifications ciblées (avant sessions récentes) :

- **Fin de chantier** : certificat assureurs → contrôle + photos
- **Gros chantiers** : retrait 2021/24h/Garantie Caution/vapeur 150°C/cristallisation/témoignage fictif
- **Copro, bureaux, commerces, vitres** : perches, partenaire cordes, pas nacelle systématique
- **Médical** : clarifications DASRI / instruments
- **Industriel (géo)** : FAQ sans CACES/HACCP marketing
- **ServicesPage**, **ServiceCarousel**, **ZonesInterventionPage**, bloc graffitis accueil, etc.

---

## 6. Passes récentes (audit pré-déploiement + Éco/blog)

### Page Éco
- **`NatureCleanEcoPage.tsx`** + section `about` dans **`seo-data.ts`**
- Retrait 50 %, objectif 2027, équipe 3, « à Marseille à Marseille », fondation affichée
- Alignement `RESPONSIBLE_PRACTICES_*`, équipe 7, adresse Pupat

### Blog (extraits)
| Article | Changements |
|---------|-------------|
| `NettoyageEcologiqueEntreprise.tsx` | Plus de 50 %, 2021, ISO 14001 ; engagement = pratiques responsables |
| `NettoyageGraffitisCarrefour.tsx` | Plus 2 h ; plus aérogommage en promesse |
| `ChecklistCoproSyndic.tsx` | Plus seuil 50 % |
| `NormesChantier2025.tsx` | nacelle → perches |
| `NettoyageApresSinistre.tsx` | ozone, 2 h arrivée |
| `NettoyageGalerieArtMarseille.tsx` | PACA/lustrage adoucis |
| `BudgetBureaux2026.tsx` | 4 h ouvrées |
| `Blog.tsx` | Extrait article éco (double « professionnels adaptés ») |

### Autres correctifs globaux
- **`SEO_Guardian.tsx`** : FAQ JSON-LD éco → `RESPONSIBLE_PRACTICES_LINE`
- **`geoData.ts`** page médical : retrait marketing ARS, périmètre locaux/surfaces
- **`NettoyageCabinetMedicalMarseillePage.tsx`** (passe suivante : voir §7)
- **Contact** : e-mail → 4 h ouvrées (plus « Réponse sous 24h »)
- **Chantiers** : tuile sans « devis 24 h » fixe
- **Vitres** : `MOBILIZATION_AFTER_QUOTE`
- **Gros chantiers** : paragraphe différenciation vs fin de chantier livraison
- **`scripts/google-business-profile-checklist.txt`** : ligne post « Prise en charge sous 4 h ouvrées, intervention en général sous 48 h »
- **`QuotePage.tsx`** : sols sans « Lustrage » ; entrée `medical` au wizard devis
- **`bureaux-aix-en-provence.ts`** : nacelle → perches / partenaire cordes
- Fix doublons « devis détaillé après étude après » dans `geoData.ts` / FAQ Aix

---

## 7. Passe « questionnaire + go » (17 nov. — local only)

### Compléments contenu
| Zone | Fichier | Action |
|------|---------|--------|
| Fin de chantier | `NettoyageChantiersPage.tsx` | Bloc **3 phases** (déblaiement → dépoussiérage → finitions/photos) ; lien vers gros chantiers |
| Copro | `NettoyageCoproprietesPage.tsx` | **« 5 immeubles pour 2 agences de syndic »** (formulation PDF §2) |
| Médical | `NettoyageCabinetMedicalMarseillePage.tsx` | FAQ bloc opératoire/stérile ; limites ARS/DASRI/stérile ; devis `?service=medical` |
| Industriel géo | `geoData.ts` | Retrait HSE/habilitation ; intro en français correct ; SLA devis après étude |
| Gros chantiers | `NettoyageGrosChantiersPage.tsx` | Lien fin de chantier ; retrait « caution » ; CTA devis |
| Bureaux | `EntretienBureauxPage.tsx` | Étape 4 = **fiche de passage** / compte-rendu |
| Commerces | `NettoyageCommercesPage.tsx` | Section **« Comment on démarre »** (4 étapes + suivi) |
| Vitres | `NettoyageVitrePage.tsx` | FAQ prix sans « devis gratuit » en dur |
| Zones / 404 | `ZonesInterventionPage.tsx`, `NotFoundPage.tsx` | Plus « devis sous 24 h » |
| CTA services | chantiers, copro, vitres, commerces | « Demander un devis » (sans « gratuit ») — en attente validation rubrique 6 PDF |

### Audit `rg` (recherche interdits)

Commande recommandée par la direction :
```bash
rg -n -i "cannes|alpes-maritimes|\bPACA\b|2021|15 ans|10 ans|500\+|ecover|suma nova|SE/011|k[aä]rcher|a[ée]rogomm|hydrogomm|cristallis|lustr|nacelle|cordiste|CACES|HACCP|ISO 9001|ISO 14001|qualipropre|certibiocide|X50-790|2016-288|ANSES|\bARS\b|ozone|n[ée]bulis|psycholog|7j/7|24/7|prado|vitrerie|50 ?%" src public
```

**Résultats encore attendus / légitimes** (non tous corrigés ou volontaires) :
- **Légitime** : quartier **Prado**, noms fichiers Cloudinary `cannes`/`paca` dans `images.ts`, `50 %` hygromètre (sinistre), psychologues comme type de client
- **Assets** : `public/NCM-*` listes de fichiers (cristallisation, cannes)
- **Admin** : `AdminPilotagePage.tsx` « Marseille & PACA »
- **Résiduels à trancher** : article `DevisNettoyageMarseille.tsx` (« devis 24 h »), **Home** CTA « devis gratuit », **ConversionBreak**, **SEO_Guardian** FAQ « devis gratuit », mots-clés seo « devis gratuit »
- **Réalisations** : pas de badge « Photo réelle » codé ; `Home.tsx` a une réalisation `Cassis` (événementiel)
- **Prerender** : `vite build` échoue en local sur Puppeteer (Chrome sandbox) — bundle TS OK

---

## 8. Ce qui n’a PAS été fait

- **Git push / déploiement Vercel** (consigne explicite)
- **Investigation Vercel HTTP 402**
- **Harmonisation totale** « devis gratuit » (home, blog, JSON-LD, composants partagés)
- **Rubrique 9 PDF** : accords clients Carrefour, enseignes, cas medical (vide)
- **Réécriture longue** mot-à-mot bureaux/commerces/vitres/accueil (PDF sans copy intégral)
- **Note Google** : nombre d’avis exact avant affichage
- **Kbis / année création** : toujours masquée côté public
- **Textes Diogène** : bordereau, voirie, tenue véhicule — [à confirmer]

---

## 9. [à confirmer] — bloquant contenu

1. Devis **gratuit** oui/non + délai de remise écrit  
2. Année création (Kbis)  
3. Nombre d’avis Google  
4. Accords écrits clients (rubrique 9)  
5. Diogène : bordereau, autorisation voirie, délai, discrétion véhicule/tenue  
6. RC Pro : activités vitres, graffitis, Diogène, sinistres déclarées  

---

## 10. Fichiers clés à connaître

```
src/app/utils/constants.ts          # SLA, horaires, éco, équipe
src/app/config/seo-data.ts          # titles/descriptions par section
src/app/components/SEO_Guardian.tsx # JSON-LD + FAQ globales
src/app/utils/cleaning-service-jsonld.ts
src/app/utils/geoData.ts            # landings géo (médical, industriel, bureaux quartiers…)
src/app/config/zone-data.ts         # 9 villes, 14 quartiers Marseille
docs/Site-natureclean-corrections-globales-et-pages.md
docs/VALIDATION-textes-services-questionnaire.md
```

---

## 11. Vérification locale

```bash
cd "/Users/diabira/Downloads/natureclean-12 septempbre 2026"
npm run dev
# Pages prioritaires :
# /a-propos /blog /services/* /zones-intervention /nettoyage-industriel-marseille
npx tsc --noEmit   # OK au 17/11
npx vite build     # bundle OK ; prerender Puppeteer peut échouer en sandbox
```

---

## 11 bis. Passe SEO contenu long (17 nov. — suites « go »)

**Passe A** (fiches tertiaire / chantier / vitres / médical) : voir ci-dessous.

**Passe B** (17 nov. soir) :
- **Home** : bloc éditorial SEO, CTA « Demander un devis », Diogène step sans « gratuit ».
- **/services** (hub) : bloc long, FAQ copro/communes 13, correction fin chantier (photos vs certificat), process sans « devis 24 h ».
- **Diogène, Sols, Graffitis** : `ServiceSeoContentSection` + 1 FAQ SEO chacun.
- Métas **home** et **services** enrichies dans `seo-data.ts`.

- Nouveau composant **`ServiceSeoContentSection`** : blocs H2/H3 éditoriaux.
- **Métas enrichies** : `seo-data.ts` (bureaux, copro, chantiers, gros chantiers, vitres, commerces, médical).
- **Sections longues ajoutées** sur : `EntretienBureauxPage`, `NettoyageCoproprietesPage`, `NettoyageChantiersPage`, `NettoyageCommercesPage`, `NettoyageVitrePage`, `NettoyageGrosChantiersPage`, `NettoyageCabinetMedicalMarseillePage` — mots-clés naturels, maillage interne, sans promesses PDF interdites.

---

## 12. Prochaines actions recommandées (pour Claude)

1. Relire visuellement les fiches listées en §7 + recherche `rg` sur résiduels §7 audit.  
2. Si direction confirme **devis gratuit** : réharmoniser CTAs + `DevisNettoyageMarseille.tsx` + Home.  
3. Si direction valide le lot : **preview Vercel** sans push `main` ; traiter **402** si bloquant.  
4. Optionnel : rédaction longue bureaux/commerces/vitres depuis questionnaire étendu (hors PDF actuel).  
5. **Ne pas** réintroduire remplacements automatiques aveugles sur « éco » / délais (risque phrases cassées).

---

## 13. Historique conversation

Transcript Cursor :  
`agent-transcripts/eac14ce2-023d-4594-a14c-d8453a36037b/eac14ce2-023d-4594-a14c-d8453a36037b.jsonl`

Ordre validé direction : **globales → Diogène/Sols/Graffitis → suite p.9 → Éco/blog → compléments services → [à confirmer] → preview**.

---

*Rapport généré pour handoff agent (Claude). Aucun commit ni push associé à cette documentation.*