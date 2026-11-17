# Validation locale — textes services & questionnaire PDF

**Source** : `~/Desktop/Site natureclean.fr corrections globales et pages à réécrire.pdf` (16 nov. 2026)  
**Consigne** : modifications **en local uniquement** — pas de push / déploiement tant que la direction n’a pas validé.

## Texte intégral PDF (déjà sur le site)

| Page | Fichier | Statut |
|------|---------|--------|
| Diogène | `src/app/pages/services/NettoyageDiogenePage.tsx` | Aligné PDF §3–4 + bordereau / voirie / discrétion (nov. 2026) |
| Remise en état sols | `src/app/pages/services/RemiseEtatSolsPage.tsx` | Aligné PDF §4–6 |
| Graffitis | `src/app/pages/services/NettoyageGraffitisPage.tsx` | Aligné PDF §5 |

## Pages complétées depuis le questionnaire (rubriques 1–2 + structure existante)

| Page | Fichier | Complément récent |
|------|---------|-------------------|
| Fin de chantier | `NettoyageChantiersPage.tsx` | Bloc **3 phases** (déblaiement → dépoussiérage → finitions / photos) |
| Gros chantiers | `NettoyageGrosChantiersPage.tsx` | Différenciation vs fin de chantier livraison |
| Copropriétés | `NettoyageCoproprietesPage.tsx` | Réf. **5 immeubles / 2 agences syndic** ; fiche de passage déjà au contrat |
| Médical | `NettoyageCabinetMedicalMarseillePage.tsx` | FAQ bloc opératoire/stérile ; limites ARS/DASRI ; lien devis `?service=medical` |
| Industriel (géo) | `geoData.ts` + FAQ | Retrait HSE/CACES marketing ; partenaire cordes ; pas hottes annoncées |
| Éco | `NatureCleanEcoPage.tsx` | Rubrique 1–2 (voir session précédente) |

## Pages déjà cohérentes — relecture visuelle recommandée

- `EntretienBureauxPage.tsx`, `NettoyageCommercesPage.tsx`, `NettoyageVitrePage.tsx` : horaires, perches, SLA — pas de réécriture longue dans ce lot.
- `Home.tsx`, `Footer.tsx`, `ZonesInterventionPage.tsx` : globales déjà passées.

## [à confirmer] — à trancher avant mise en ligne

1. ~~Devis gratuit et délai de remise écrit.~~ **Validé (nov. 2026)** : devis gratuit + sans engagement ; prise en charge 4 h ouvrées ; devis détaillé après étude (pas de délai écrit fixe type 24 h).
2. ~~Kbis / année.~~ **Validé** : pas d’année de création affichée sur le site (`FOUNDING_YEAR` réservé usage interne).
3. ~~Nombre d’avis Google exact.~~ **Validé** : note **4,8/5** affichée ; pas de compteur d’avis en dur (`GOOGLE_RATING_SITE_NOTE` dans `constants.ts`, pas de `aggregateRating` JSON-LD).
4. **Accords clients** — **non traité** (hors scope : floutage marques en post-prod par la direction). Textes orientés « grande surface » / logos floutés, sans accord écrit affiché.
5. ~~Diogène : bordereau, voirie, tenue/véhicule.~~ **Validé** dans `constants.ts` + fiche Diogène.
6. ~~RC Pro : activités vitres, graffitis, Diogène, sinistres.~~ **Validé** — `RC_PRO_FAQ_ANSWER` (accueil + hub services + FAQ Diogène).

## Ce que vous pouvez valider maintenant

1. Lancer le site en local : `npm run dev` — parcourir les URLs services ci-dessus.
2. Vérifier les phrases avec **5 immeubles / 2 syndics** et **3 phases chantier**.
3. Médical : bloc « Ce que nous ne faisons pas » + nouvelle FAQ opératoire.
4. Répondre sur les [à confirmer] pour la prochaine passe (devis gratuit oui/non, etc.).

## Lot « go » (dernière passe locale)

- **Bureaux** : étape 4 = fiche de passage / compte-rendu.
- **Commerces** : section « Comment on démarre » (4 étapes + suivi).
- **Fin / gros chantiers** : liens croisés + retrait promesse « caution » sur gros chantiers.
- **CTA** : « Demander un devis » (sans « gratuit ») sur les fiches services principales — en attente de votre confirmation rubrique 6 PDF.
- **Zones** / **404** : plus de « devis sous 24 h » en dur.

## Après validation

Prévisualisation Vercel uniquement sur votre demande — **aucun push automatique**.