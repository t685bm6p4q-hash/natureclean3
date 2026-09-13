import { Link } from 'react-router';
import { CheckCircle2, Eraser } from 'lucide-react';
import { Button } from '@/app/components/ui/button';
import { SEO_Guardian } from '@/app/components/SEO_Guardian';
import { ServicePageHero } from '@/app/components/ServicePageHero';
import { IMAGES, getOptimizedCldUrl, cldSrcSet } from '@/app/utils/images';

export function NettoyageGraffitisPage() {
  return (
    <>
      <SEO_Guardian currentSection="nettoyage-graffitis" />
      
      <div className="bg-slate-50 min-h-screen">
        <ServicePageHero
          title="Nettoyage et Enlèvement de Graffitis à Marseille"
          subtitle="Une intervention rapide et écologique pour effacer les tags de vos murs, rideaux métalliques et vitrines. Redonnez à votre façade son aspect d'origine sans l'abîmer."
          imageSrc={IMAGES.graffitiCarrefourAvant}
          imageAlt="Nettoyage graffitis façade Carrefour Marseille — Nature Clean"
          breadcrumbs={[
            { label: 'Accueil', to: '/' },
            { label: 'Services', to: '/services' },
            { label: 'Graffitis' },
          ]}
          devisLink="/devis?service=graffitis"
        />

        <section className="py-20 bg-white">
          <div className="container mx-auto px-4 max-w-5xl">
            <div className="grid md:grid-cols-2 gap-16 items-center">
              <div>
                <h2 className="text-3xl font-bold text-slate-900 mb-6">
                  Pourquoi agir vite face aux <span className="text-green-600">graffitis</span> ?
                </h2>
                <p className="text-lg text-slate-600 mb-8">
                  Le vrai problème, c'est la pénétration. En 48 à 72h, les pigments acryliques d'un tag pénètrent dans la porosité de la pierre calcaire — courante sur les façades marseillaises — et le dégraffitage chimique seul ne suffit plus. On doit passer à l'aérogommage. Agir vite, c'est éviter d'abîmer le support.
                </p>
                <ul className="space-y-4">
                  {[
                    'Intervention sous 24/48h — diagnostic offert',
                    'Traitement adapté à chaque support (pierre calcaire, brique, verre, métal)',
                    'Produits biodégradables conformes à la réglementation REACH',
                    'Application d\'une couche anti-graffiti sacrificielle (en option)'
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <div className="mt-1 bg-green-100 p-1 rounded-full">
                        <CheckCircle2 className="w-4 h-4 text-green-600" />
                      </div>
                      <span className="text-slate-700 font-medium">{item}</span>
                    </li>
                  ))}
                </ul>
                <div className="mt-10">
                  <Button asChild size="lg" className="bg-green-700 hover:bg-green-800 text-white rounded-xl shadow-lg">
                    <Link to="/devis?service=graffitis">
                      <Eraser className="w-5 h-5 mr-2" />
                      Demander un devis gratuit
                    </Link>
                  </Button>
                </div>
              </div>
              <div className="relative">
                <img
                  src={getOptimizedCldUrl(IMAGES.effacementTagVitrine, 900)}
                  srcSet={cldSrcSet(IMAGES.effacementTagVitrine, [400, 700, 900])}
                  sizes="(max-width: 768px) 100vw, 50vw"
                  alt="Façade Carrefour Marseille après effacement graffitis — Nature Clean"
                  width={900}
                  height={600}
                  loading="lazy"
                  decoding="async"
                  className="rounded-2xl shadow-2xl relative z-10 w-full object-cover"
                />
                <div className="absolute inset-0 bg-green-600 rounded-2xl rotate-3 scale-105 -z-10 opacity-20"></div>
              </div>
            </div>
          </div>
        </section>

        <section className="py-20 bg-slate-900 text-white">
          <div className="container mx-auto px-4 max-w-5xl text-center">
            <h2 className="text-3xl font-bold mb-10">Nos techniques d'intervention</h2>
            <div className="grid md:grid-cols-3 gap-8">
              {[
                { title: 'Aérogommage', desc: 'Projection de microparticules naturelles (calcite ou bicarbonate) à basse pression — entre 1 et 3 bar. Indispensable sur les pierres calcaires et briques poreuses du vieux Marseille. Aucun risque d\'arrachement du support.' },
                { title: 'Traitement chimique doux', desc: 'Agents décapants à pH neutre conformes à la directive REACH pour les vitrines et rideaux métalliques. On utilise des produits Kärcher RM 69 EC — temps de contact 5 à 15 min, rinçage haute pression, zéro résidu toxique.' },
                { title: 'Hydrogommage', desc: 'Projection eau + abrasif naturel (oxyde d\'aluminium ou sable de silice calibré) pour les surfaces béton et enduits résistants. Efficace sur les façades d\'entrepôts et parkings à Vitrolles et la zone industrielle de Marseille nord.' }
              ].map((tech, i) => (
                <div key={i} className="bg-slate-800 p-8 rounded-2xl border border-slate-700">
                  <h3 className="text-xl font-bold text-green-400 mb-4">{tech.title}</h3>
                  <p className="text-slate-300">{tech.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </>
  );
}