import { createBrowserRouter } from 'react-router';

// Layouts
import { RootLayout } from '@/app/layouts/RootLayout';

// Fallback component
function RouteFallback() {
  return null;
}

// Home is eagerly loaded — it's always the landing page, no lazy waterfall
import { Home } from '@/app/pages/Home';

// ProtectedRoute wrapper for admin pages
import { ProtectedRoute } from '@/app/components/ProtectedRoute';
import { createElement } from 'react';

export const router = createBrowserRouter([
  {
    path: '/',
    Component: RootLayout,
    HydrateFallback: RouteFallback,
    children: [
      { index: true, Component: Home },
      { path: 'services', lazy: () => import('@/app/pages/ServicesPage').then(m => ({ Component: m.ServicesPage })) },
      { path: 'services/entretien-bureaux', lazy: () => import('@/app/pages/services/EntretienBureauxPage').then(m => ({ Component: m.EntretienBureauxPage })) },
      { path: 'services/nettoyage-commerces', lazy: () => import('@/app/pages/services/NettoyageCommercesPage').then(m => ({ Component: m.NettoyageCommercesPage })) },
      { path: 'services/nettoyage-coproprietes', lazy: () => import('@/app/pages/services/NettoyageCoproprietesPage').then(m => ({ Component: m.NettoyageCoproprietesPage })) },
      { path: 'services/nettoyage-chantiers', lazy: () => import('@/app/pages/services/NettoyageChantiersPage').then(m => ({ Component: m.NettoyageChantiersPage })) },
      { path: 'services/nettoyage-evenementiel', lazy: () => import('@/app/pages/services/NettoyageEvenementielPage').then(m => ({ Component: m.NettoyageEvenementielPage })) },
      { path: 'services/remise-etat-sols', lazy: () => import('@/app/pages/services/RemiseEtatSolsPage').then(m => ({ Component: m.RemiseEtatSolsPage })) },
      { path: 'services/nettoyage-graffitis', lazy: () => import('@/app/pages/services/NettoyageGraffitisPage').then(m => ({ Component: m.NettoyageGraffitisPage })) },
      { path: 'services/nettoyage-vitre', lazy: () => import('@/app/pages/NettoyageVitrePage').then(m => ({ Component: m.NettoyageVitrePage })) },
      { path: 'services/nettoyage-diogene', lazy: () => import('@/app/pages/services/NettoyageDiogenePage').then(m => ({ Component: m.NettoyageDiogenePage })) },
      { path: 'services/nettoyage-gros-chantiers', lazy: () => import('@/app/pages/services/NettoyageGrosChantiersPage').then(m => ({ Component: m.NettoyageGrosChantiersPage })) },
      { path: 'nettoyage-particuliers', lazy: () => import('@/app/pages/NettoyageParticuliersPage').then(m => ({ Component: m.NettoyageParticuliersPage })) },
      { path: 'a-propos', lazy: () => import('@/app/pages/NatureCleanEcoPage').then(m => ({ Component: m.NatureCleanEcoPage })) },
      { path: 'realisations', lazy: () => import('@/app/pages/RealisationsPage').then(m => ({ Component: m.RealisationsPage })) },
      { path: 'actualites', lazy: () => import('@/app/pages/ActualitesPage').then(m => ({ Component: m.ActualitesPage })) },
      { path: 'devis', lazy: () => import('@/app/pages/QuotePage').then(m => ({ Component: m.QuotePage })) },
      { path: 'contact', lazy: () => import('@/app/pages/ContactPage').then(m => ({ Component: m.ContactPage })) },
      { path: 'zones-intervention', lazy: () => import('@/app/pages/ZonesInterventionPage').then(m => ({ Component: m.ZonesInterventionPage })) },
      { path: 'admin/login', lazy: () => import('@/app/pages/AdminLoginPage').then(m => ({ Component: m.AdminLoginPage })) },
      {
        path: 'admin/pilotage',
        lazy: () => import('@/app/pages/AdminPilotagePage').then(m => ({
          element: createElement(ProtectedRoute, null, createElement(m.AdminPilotagePage))
        }))
      },
      { path: 'blog', lazy: () => import('@/app/pages/Blog').then(m => ({ Component: m.Blog })) },
      { path: 'blog/etat-des-lieux-sortie-marseille', lazy: () => import('@/app/pages/blog/EtatLieuxSortie').then(m => ({ Component: m.EtatLieuxSortie })) },
      { path: 'blog/nettoyage-apres-sinistre', lazy: () => import('@/app/pages/blog/NettoyageApresSinistre').then(m => ({ Component: m.NettoyageApresSinistre })) },
      { path: 'blog/normes-nettoyage-chantier-2025', lazy: () => import('@/app/pages/blog/NormesChantier2025').then(m => ({ Component: m.NormesChantier2025 })) },
      { path: 'blog/checklist-nettoyage-copropriete-syndic', lazy: () => import('@/app/pages/blog/ChecklistCoproSyndic').then(m => ({ Component: m.ChecklistCoproSyndic })) },
      { path: 'blog/budget-nettoyage-bureaux-marseille-2026', lazy: () => import('@/app/pages/blog/BudgetBureaux2026').then(m => ({ Component: m.BudgetBureaux2026 })) },
      { path: 'blog/nettoyage-ecologique-produits-bio-entreprise', lazy: () => import('@/app/pages/blog/NettoyageEcologiqueEntreprise').then(m => ({ Component: m.NettoyageEcologiqueEntreprise })) },
      { path: 'blog/faq-nettoyage-terrasse-marseille', lazy: () => import('@/app/pages/blog/NettoyageTerrasseMarseille').then(m => ({ Component: m.NettoyageTerrasseMarseille })) },
      { path: 'blog/nettoyage-graffitis-carrefour-marseille', lazy: () => import('@/app/pages/blog/NettoyageGraffitisCarrefour').then(m => ({ Component: m.NettoyageGraffitisCarrefour })) },
      { path: 'blog/nettoyage-galerie-art-marseille', lazy: () => import('@/app/pages/blog/NettoyageGalerieArtMarseille').then(m => ({ Component: m.NettoyageGalerieArtMarseille })) },
      // Geo landing pages
      // ⚠️ MARSEILLE — mot-clé principal
      { path: 'nettoyage-bureaux-marseille', lazy: () => import('@/app/pages/geo/NettoyageBureauxMarseillePage').then(m => ({ Component: m.NettoyageBureauxMarseillePage })) },
      { path: 'nettoyage-industriel-marseille', lazy: () => import('@/app/pages/geo/NettoyageIndustrielMarseillePage').then(m => ({ Component: m.NettoyageIndustrielMarseillePage })) },
      { path: 'nettoyage-fin-chantier-marseille', lazy: () => import('@/app/pages/geo/NettoyageFinChantierMarseillePage').then(m => ({ Component: m.NettoyageFinChantierMarseillePage })) },
      { path: 'nettoyage-medical-marseille', lazy: () => import('@/app/pages/geo/NettoyageMedicalMarseillePage').then(m => ({ Component: m.NettoyageMedicalMarseillePage })) },
      { path: 'nettoyage-bureaux-aix-en-provence', lazy: () => import('@/app/pages/geo/NettoyageBureauxAixPage').then(m => ({ Component: m.NettoyageBureauxAixPage })) },
      { path: 'nettoyage-coproprietes-aubagne', lazy: () => import('@/app/pages/geo/NettoyageCoproprietesAubagnePage').then(m => ({ Component: m.NettoyageCoproprietesAubagnePage })) },
      { path: 'nettoyage-coproprietes-la-ciotat', lazy: () => import('@/app/pages/geo/NettoyageCoproprietesLaCiotatPage').then(m => ({ Component: m.NettoyageCoproprietesLaCiotatPage })) },
      { path: 'politique-de-confidentialite', lazy: () => import('@/app/pages/PolitiqueConfidentialitePage').then(m => ({ Component: m.PolitiqueConfidentialitePage })) },
      { path: 'admin/security-audit', lazy: () => import('@/app/pages/SecurityAuditPage').then(m => ({ Component: m.SecurityAuditPage })) },
      { path: 'admin/site-audit', lazy: () => import('@/app/pages/SiteAuditPage').then(m => ({ Component: m.SiteAuditPage })) },
      { path: '*', lazy: () => import('@/app/pages/NotFoundPage').then(m => ({ Component: m.NotFoundPage })) },
    ],
  },
]);
