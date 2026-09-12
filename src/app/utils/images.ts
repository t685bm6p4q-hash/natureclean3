/**
 * images.ts — Registre central des images Nature Clean Marseille
 * ==============================================================
 * Ce fichier ne contient QUE les données (paths Cloudinary).
 * Toute la logique d'optimisation est dans cloudinaryHelper.ts.
 *
 * ─── CONVENTION ───────────────────────────────────────────────────────────
 *
 * Constantes internes  → path brut Cloudinary  : "v1773.../image.jpg"
 * Export IMAGES        → URL optimisée 1 200 px : getOptimizedCldUrl(path)
 *
 * Pour une largeur différente dans un composant :
 *   getOptimizedCldUrl(IMAGES.hallMarbreAscenseurs, 200)   ← thumbnail
 *   getResponsiveSrcSet(IMAGES.heroHome, [400, 800, 1200]) ← srcSet hero
 *   cldImgAttrs(IMAGES.finChantierMaison, 'content')       ← props complets
 *
 * ─── IMPORTS DANS LES COMPOSANTS ──────────────────────────────────────────
 *
 *   import { IMAGES } from '@/app/utils/images';
 *   import { getOptimizedCldUrl, getResponsiveSrcSet, cldImgAttrs } from '@/app/utils/cloudinaryHelper';
 */

import { getOptimizedCldUrl } from '@/app/utils/cloudinaryHelper';

// Re-exports complets — les composants n'importent QUE depuis ces deux fichiers
export {
  getOptimizedCldUrl,
  getResponsiveSrcSet,
  cldImgAttrs,
  cldResize,
  cldSrcSet,
  CLD_PRESETS,
} from '@/app/utils/cloudinaryHelper';
export type { CldPreset, CldImgAttrs } from '@/app/utils/cloudinaryHelper';

// ─────────────────────────────────────────────────────────────
// PATHS BRUTS (privés) — jamais utilisés directement
// Format : "v{version}/{public_id}.{ext}"
// ─────────────────────────────────────────────────────────────

// ── LOGO ──
const P_logoNatureClean         = 'v1773953029/Capture_d_e%CC%81cran_2026-03-19_a%CC%80_21.43.35_zqhtvo.png';

// ── HERO ──
const P_heroHome                = 'v1773950694/nettoyage-vitres-marseille-cannes-allentours_-_01_qifmli.jpg';

// ── AMBIANCE ──
const P_vueMarseilleBasin       = 'v1773950699/nettoyage-sols-marseille-eco-responsable-nature_-_01_lnw8go.jpg';

// ── BUREAUX & OPEN SPACE ──
const P_openSpaceBureaux        = 'v1773950698/nettoyage-pro-marseille-entrepris-nature-ecolo-eco-cannes-nice_-_01_fnoiv2.jpg';
const P_grandOpenSpaceModerne   = 'v1773950696/nettoyage-bureaux-marseille-cannes-martigue-cassi-paca_-_01_apxy08.jpg';
const P_openSpaceIndustrielNuit = 'v1773950694/menage-nettoyage-bureaux-marseille-nice_-_01_dxwggu.jpg';

// ── COPROPRIETES ──
const P_hallMarbreAscenseurs    = 'v1773950698/nettoyage-sols-marseille-marbre-cassis-nice-cannes_-_01_ibvbr3.jpg';
const P_cageEscalier            = 'v1773950697/nettoyage-immeuble-marseille-nice-cannes-menage_-_01_dk5r8b.jpg';
const P_hallLuxeMarbre          = 'v1773950699/nettoyage-sols-marseille-natureclean-nice_-_01_tk7tqo.jpg';
const P_residenceModerne        = 'v1773950699/nettoyage-villa-cannes-maison_-_01_ueqfqb.jpg';
const P_hallCoproBoites         = 'v1773950695/nettoyage-copropriete-cannes-imeuble-entretient_-_01_wdumpe.jpg';
const P_hallClassiqueAscenseurs = 'v1773950696/nettoyage-immeuble-menage-imeuble-copro-nature-eco-responsablemarseille_-_01_simboh.jpg';
const P_parkingSouterrain       = 'v1773950698/nettoyage-sols-marseille-menage-copropriete_-_01_ik24eq.jpg';

// ── FIN DE CHANTIER ──
const P_nettoyageFinChantier    = 'v1777394476/nettoyage-fin-de-chantier_mqdngl.jpg';
const P_finChantierAppartement  = 'v1777394479/nettoyage-fin-de-chantier-appartement_upfmyt.jpg';
const P_finChantierMaison       = 'v1777394479/nettoyage-fin-de-chantier-maison_zlarzz.jpg';
const P_finChantierEquipe       = 'v1777394478/nettoyage-fin-de-chantier-nature-clean_ac8riy.jpg';
const P_finChantierMarseille    = 'v1777394477/nettoyage-fin-de-chantier-Marseille_vqesnl.jpg';
const P_finChantierMarseille13  = 'v1777394477/nettoyage-fin-de-chantier-marseille-13_t4nltq.jpg';
const P_finChantierCassis       = 'v1777394477/nettoyage-fin-de-chantier-cassie_s52bhb.jpg';
const P_solsFinChantierBDR      = 'v1779356948/nettoyage-sols-fin-de-chantier-bouches-du-rhone_klne1a.jpg';
const P_cuisineLivraisonValentine = 'v1779357057/nettoyage-cuisine-apres-travaux-marseille-livraison-Valentine_bnwohv.jpg';
const P_remiseEtatCuisine       = 'v1779356948/remise-en-etat-apres-travaux-cuisine-marseille_ll3rfa.jpg';
const P_salleBainDesinfection   = 'v1779356948/nettoyage-desinfection-salle-de-bain-marseille_zspo7m.jpg';
const P_appartAvantChantier     = 'v1779356948/nettoyage-fin-de-chantier-appartement-marseille-avant_hrpwim.jpg';
const P_cuisineApresTravaux     = 'v1779356948/nettoyage-cuisine-apres-travaux-marseille-livraison_mzec6t.jpg';
const P_remiseEtatAppartMarseille = 'v1779383832/nettoyage-remise-en-etat-appartement-marseille_r4jo7o.jpg';

// ── COMMERCES ──
const P_entretienMagasin        = 'v1777394245/entretien-magasin-marseille-centre-propre_ctv9gu.jpg';
const P_vitrineBoutiqueLuxe     = 'v1773950699/nettoyage-commerces-cassis-marseille-nice-industriel_-_01_ughxnv.jpg';
const P_boutiqueVide            = 'v1773950696/nettoyage-commerce-marseille-cannes-menage-pro_-_01_gv5wml.jpg';
const P_nettoyageTerrassePro    = 'v1777394246/nettoyage-terrasse-professionnel-marseille-nature-clean_vgosk1.jpg';
const P_nettoyageMarseilleEco   = 'v1779380746/nettoyage-marseille-eco-nature-clean-marseille_t2xbhh.jpg';
const P_whatsappImage20260429   = 'v1779387123/nettoyage-sol-menage-marseille_mnq6rk.jpg';
const P_magasinBoutiquePACA     = 'v1779380746/nettoyage-magasin-boutique-marseille-paca_eviyct.jpg';
const P_jdSportMarseilleFloor   = 'v1779962471/nettoyage-sol-magasin-marseille.jpg_m3lnyq.jpg';

// ── BUREAUX SPÉCIALISÉS ──
const P_cabinetMedical          = 'v1779962468/nettoyage-cabinet-medical-marseille.jpg_b9gt6a.jpg';
const P_entrepriseNettoyage13008 = 'v1777394245/entreprise-nettoyage-marseille-13008_ytpdye.jpg';
const P_hygieneLocauxSante      = 'v1777394245/hygiene-locaux-sante-nature-clean_pf4x5b.jpg';
const P_entrepriseBureauxMarseille = 'v1779357403/entreprise-nettoyage-bureaux-locaux-marseille_nwrpcd.jpg';

// ── ÉVÉNEMENTIEL ──
const P_salleEvenementielle     = 'v1777394245/nettoyage-evenementiel_-nature-clean-marseille_ocbeao.jpg';

// ── SOLS ──
const P_decapageSolEco          = 'v1777394244/decapage-sol-ecologique-commerce-marseille.-nature-clean_pgmuzc.jpg';
const P_solsBureauxPro          = 'v1779387123/nettoyage-sol-magasin-paca_lofuw8.jpg';

// ── VITRERIE ──
const P_nettoyageVitresPro      = 'v1777419398/nettoyege-vitres-marseille-nature-clean_o9zclc.jpg';
const P_vitrineCommercePro      = 'v1778546887/nettoyage-vitres-professionnel-marseille_gvljrn.jpg';
const P_facadeVitreeImmeuble    = 'v1773950694/nettoyage-vitres-marseille-cannes-allentours_-_01_qifmli.jpg';

// ── BLOG ──
const P_carnetBlog              = 'v1773950694/nettoyage-vitres-prope-marseille_-_01_jznc7i.jpg';
const P_degatDesEaux            = 'v1773950693/menage-appartement-marseille-nice-cannes_-_01_x1nuoi.jpg';
const P_appartClesComplete      = 'v1773950694/menage-immeuble-marseille_-_01_d9e5ch.jpg';
const P_normesChantier2025      = 'v1773950699/nettoyage-sols-marseille-eco-responsable-nature_-_01_lnw8go.jpg';

// ── GRAFFITIS ──
const P_nettoyageGraffitis          = 'v1775499955/nature-clean-nettoyage-professionnel-anti-graffiti_g8rivw.png';
const P_graffitiCarrefourAvant      = 'v1787685670/nettoyage-graffiti-carrefour-marseille-avant-nature-clean.jpg_lmuckm.jpg';
const P_effacementTagVitrine        = 'v1787685670/effacement-tag-vitrine-marseille-apres-nature-clean.jpg_meeuhi.jpg';

// ── GALERIE D'ART ──
const P_galerieArtMarseille         = 'v1789145831/nature-clean-nettoyage-galerie-art-marseille-4e_yrpcwp.jpg';
const P_espaceCulturelMarseille     = 'v1789145831/entretien-proprete-espace-culturel-marseille-nature-clean._xhzh4j.jpg';

// ═══════════════════════════════════════════════════════════════════
// REGISTRE CENTRAL — URLs optimisées via getOptimizedCldUrl()
//
// Chaque entrée = getOptimizedCldUrl(path, 1200) par défaut.
// f_auto,q_auto,w_1200,c_limit est automatiquement appliqué.
//
// Pour des tailles différentes dans un composant :
//   getOptimizedCldUrl(IMAGES.xxx, 200)      → vignette 200 px
//   getOptimizedCldUrl(IMAGES.xxx, 600)      → carte 600 px
//   getResponsiveSrcSet(IMAGES.xxx)          → srcSet 600w + 1200w
//   cldImgAttrs(IMAGES.xxx, 'content')       → src + srcSet + sizes
// ═══════════════════════════════════════════════════════════════════

const O = (path: string, w = 1200) => getOptimizedCldUrl(path, w);

export const IMAGES = {
  // ── LOGO (144 px — 2× retina) ──
  logoNatureClean:        O(P_logoNatureClean, 144),

  // ── HERO ──
  heroHome:               O(P_heroHome),

  // ── AMBIANCE ──
  vueMarseilleBasin:      O(P_vueMarseilleBasin),

  // ── BUREAUX & OPEN SPACE ──
  openSpaceBureaux:       O(P_openSpaceBureaux),
  grandOpenSpaceModerne:  O(P_grandOpenSpaceModerne),
  openSpaceIndustrielNuit: O(P_openSpaceIndustrielNuit),

  // ── COPROPRIETES ──
  hallMarbreAscenseurs:   O(P_hallMarbreAscenseurs),
  cageEscalier:           O(P_cageEscalier),
  residenceModerne:       O(P_residenceModerne),
  hallCoproBoites:        O(P_hallCoproBoites),
  hallClassiqueAscenseurs: O(P_hallClassiqueAscenseurs),
  parkingSouterrain:      O(P_parkingSouterrain),

  // ── FIN DE CHANTIER ──
  nettoyageFinChantier:   O(P_nettoyageFinChantier),
  finChantierAppartement: O(P_finChantierAppartement),
  finChantierMaison:      O(P_finChantierMaison),
  finChantierEquipe:      O(P_finChantierEquipe),
  finChantierMarseille:   O(P_finChantierMarseille),
  finChantierMarseille13: O(P_finChantierMarseille13),
  finChantierCassis:      O(P_finChantierCassis),
  solsFinChantierBDR:     O(P_solsFinChantierBDR),
  cuisineLivraisonValentine: O(P_cuisineLivraisonValentine),
  remiseEtatCuisine:      O(P_remiseEtatCuisine),
  salleBainDesinfection:  O(P_salleBainDesinfection),
  appartAvantChantier:    O(P_appartAvantChantier),
  cuisineApresTravaux:    O(P_cuisineApresTravaux),
  remiseEtatAppartMarseille: O(P_remiseEtatAppartMarseille),

  // ── COMMERCES ──
  entretienMagasin:       O(P_entretienMagasin),
  vitrineBoutiqueLuxe:    O(P_vitrineBoutiqueLuxe),
  boutiqueVide:           O(P_boutiqueVide),
  nettoyageTerrassePro:   O(P_nettoyageTerrassePro),
  nettoyageMarseilleEco:  O(P_nettoyageMarseilleEco),
  whatsappCommerce:       O(P_whatsappImage20260429),
  magasinBoutiquePACA:    O(P_magasinBoutiquePACA),
  jdSportMarseilleFloor:  O(P_jdSportMarseilleFloor),

  // ── BUREAUX SPÉCIALISÉS ──
  cabinetMedical:         O(P_cabinetMedical),
  entrepriseNettoyage13008: O(P_entrepriseNettoyage13008),
  hygieneLocauxSante:     O(P_hygieneLocauxSante),
  entrepriseBureauxMarseille: O(P_entrepriseBureauxMarseille),

  // ── ÉQUIPE & DIRIGEANT (alias vers images existantes) ──
  equipeCamionnette:      O(P_openSpaceBureaux),
  equipe4Personnes:       O(P_hygieneLocauxSante),

  // ── ÉVÉNEMENTIEL ──
  salleEvenementielle:    O(P_salleEvenementielle),
  salleConference:        O(P_salleEvenementielle),
  clientEventWide:        O(P_salleEvenementielle),
  clientEventAngle:       O(P_salleEvenementielle),

  // ── SOLS ──
  decapageSolEco:         O(P_decapageSolEco),
  monobrosseAction:       O(P_parkingSouterrain),
  solMarbrePoli:          O(P_hallMarbreAscenseurs),
  hallMarbreSale:         O(P_hallLuxeMarbre),
  solsBureauxPro:         O(P_solsBureauxPro),

  // ── VITRERIE ──
  nettoyageVitresPro:     O(P_nettoyageVitresPro),
  facadeVitreeImmeuble:   O(P_facadeVitreeImmeuble),
  lavageVitrine:          O(P_vitrineCommercePro),
  laveurNacelle:          O(P_facadeVitreeImmeuble),

  // ── ECO / PRODUITS (alias) ──
  produitsEcoHero:        O(P_vueMarseilleBasin),
  produitsEcoBrosses:     O(P_boutiqueVide),
  sprayMicrofibre:        O(P_boutiqueVide),

  // ── FIN DE CHANTIER (alias ex-Unsplash) ──
  chantierBrut:           O(P_degatDesEaux),
  appartVidePropre:       O(P_appartClesComplete),
  appartCarrelageBlanc:   O(P_hallLuxeMarbre),
  appartVideLumineux:     O(P_residenceModerne),

  // ── BLOG ──
  carnetBlog:             O(P_carnetBlog),
  degatDesEaux:           O(P_degatDesEaux),
  appartClesComplete:     O(P_appartClesComplete),
  normesChantier2025:     O(P_normesChantier2025),

  // ── GRAFFITIS ──
  nettoyageGraffitis:     O(P_nettoyageGraffitis),
  graffitiCarrefourAvant: O(P_graffitiCarrefourAvant),
  effacementTagVitrine:   O(P_effacementTagVitrine),

  // ── GALERIE D'ART ──
  galerieArtMarseille:    O(P_galerieArtMarseille),
  espaceCulturelMarseille: O(P_espaceCulturelMarseille),

  // ── DÉVIS / CONTACT (alias) ──
  poigneeMainDevis:       O(P_hygieneLocauxSante),
} as const;

export type ImageKey = keyof typeof IMAGES;