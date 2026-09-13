import { PHONE_DISPLAY, PHONE_HREF, ARIA_PHONE } from '@/app/utils/constants';
import { Button } from '@/app/components/ui/button';
import { Link } from 'react-router';
import { Phone, ArrowLeft, Clock, HelpCircle } from 'lucide-react';
import { useArticleJsonLd } from '@/app/hooks/useArticleJsonLd';
import { SEO_Guardian } from '@/app/components/SEO_Guardian';

export function NettoyageTerrasseMarseille() {
  const imageUrl = "https://res.cloudinary.com/dc9xmxpvv/image/upload/v1777394246/nettoyage-terrasse-professionnel-marseille-nature-clean_vgosk1.jpg";

  useArticleJsonLd({
    headline: 'FAQ : Tout savoir sur le nettoyage de votre terrasse à Marseille avant l\'été',
    description: 'Découvrez nos réponses aux questions les plus fréquentes sur le nettoyage de terrasse à Marseille, Aix-en-Provence et Aubagne. Conseils d\'experts.',
    image: imageUrl,
    datePublished: '2026-05-05',
    dateModified: '2026-05-05',
    slug: 'faq-nettoyage-terrasse-marseille',
    keywords: 'nettoyage terrasse marseille, entretien terrasse bois, nettoyage extérieur PACA, nettoyage haute pression terrasse',
    articleSection: 'Conseils pratiques',
    wordCount: 600,
  });

  return (
    <>
      <SEO_Guardian 
        title="FAQ : Tout savoir sur le nettoyage de votre terrasse à Marseille | Nature Clean"
        description="Découvrez nos conseils et réponses d'experts pour le nettoyage et l'entretien de votre terrasse à Marseille avant l'été : techniques, écologie, professionnels."
        keywords="nettoyage terrasse marseille, entretien terrasse, nettoyage extérieur PACA, Nature Clean"
        currentSection="blog"

      />

      {/* Hero Article */}
      <article className="bg-white">
        <div className="relative h-96 overflow-hidden">
          <img
            src={imageUrl}
            alt="Nettoyage professionnel de terrasse à Marseille"
            width="1920"
            height="1080"
            // @ts-ignore — fetchpriority: attribut HTML valide, non typé en minuscules dans React 18
            fetchpriority="high"
            decoding="async"
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
          
          <div className="absolute bottom-0 left-0 right-0 p-8">
            <div className="container mx-auto">
              <Link to="/blog" className="inline-flex items-center gap-2 text-white hover:text-green-300 mb-4 transition-colors">
                <ArrowLeft className="w-4 h-4" />
                Retour au blog
              </Link>
              <div className="flex items-center gap-2 text-green-300 mb-2">
                <Clock className="w-4 h-4" />
                <span className="text-sm">4 min de lecture • 5 mai 2026</span>
              </div>
              <h1 className="text-4xl md:text-5xl font-bold text-white max-w-4xl">
                FAQ : Tout savoir sur le nettoyage de votre terrasse à Marseille avant l'été
              </h1>
            </div>
          </div>
        </div>

        {/* Contenu Article */}
        <div className="container mx-auto px-4 py-12">
          <div className="max-w-4xl mx-auto">
            
            {/* Introduction */}
            <div className="prose prose-lg max-w-none mb-12">
              <p className="text-xl text-gray-700 leading-relaxed">
                Avec le retour des beaux jours en région PACA, les terrasses de restaurants, de bureaux ou de copropriétés reprennent vie. Mais après l'hiver, elles ont souvent besoin d'un bon rafraîchissement ! Chez <strong>Nature Clean</strong>, nous recevons de nombreuses interrogations sur la meilleure façon d'entretenir ces espaces extérieurs.
              </p>
              <p className="text-gray-700 leading-relaxed">
                Voici nos réponses à vos questions les plus fréquentes sur le nettoyage de terrasse.
              </p>
            </div>

            {/* Questions / Réponses */}
            <section className="space-y-8 mb-12">
              
              {/* Question 1 */}
              <div className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
                <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-start gap-3">
                  <HelpCircle className="w-6 h-6 text-green-600 mt-1 shrink-0" />
                  Question 1 : Faut-il toujours utiliser un nettoyeur haute pression sur une terrasse ?
                </h3>
                <div className="bg-green-50 rounded-lg p-5">
                  <p className="text-gray-700 leading-relaxed">
                    <strong>Réponse de l'expert :</strong> Non, c'est même une erreur très fréquente ! Utiliser la haute pression à pleine puissance sur n'importe quelle surface peut faire des dégâts irréversibles : creuser le bois, détruire les joints d'un carrelage ou rendre la pierre poreuse. Chez Nature Clean, nous commençons par un diagnostic. Pour le bois, nous privilégions un brossage mécanique doux. Pour les dalles ou le béton, nous ajustons la pression au millimètre près pour désincruster la mousse sans altérer le matériau.
                  </p>
                </div>
              </div>

              {/* Question 2 */}
              <div className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
                <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-start gap-3">
                  <HelpCircle className="w-6 h-6 text-green-600 mt-1 shrink-0" />
                  Question 2 : Est-il possible de nettoyer sa terrasse de manière vraiment écologique ?
                </h3>
                <div className="bg-green-50 rounded-lg p-5">
                  <p className="text-gray-700 leading-relaxed">
                    <strong>Réponse de l'expert :</strong> Absolument, et c'est un enjeu crucial à Marseille où les eaux de ruissellement finissent souvent dans la mer Méditerranée. Fidèles à notre engagement, nous limitons drastiquement la chimie agressive. Nous privilégions l'action mécanique (brosses professionnelles, température de l'eau adaptée) et nous intégrons progressivement des solutions nettoyantes labellisées et biodégradables pour protéger notre littoral.
                  </p>
                </div>
              </div>

              {/* Question 3 */}
              <div className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
                <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-start gap-3">
                  <HelpCircle className="w-6 h-6 text-green-600 mt-1 shrink-0" />
                  Question 3 : Pourquoi faire appel à une entreprise de nettoyage pour ma terrasse professionnelle ?
                </h3>
                <div className="bg-green-50 rounded-lg p-5">
                  <p className="text-gray-700 leading-relaxed">
                    <strong>Réponse de l'expert :</strong> Confier cette tâche à un professionnel vous garantit trois choses : un gain de temps, la sécurité, et un résultat durable. En tant que gérant de restaurant, syndic ou chef d'entreprise en PACA, vous devez vous concentrer sur votre cœur de métier. Nature Clean intervient avec le matériel adéquat (même pour les terrasses d'immeubles difficiles d'accès) pour un nettoyage en profondeur qui retarde l'apparition de nouvelles salissures.
                  </p>
                </div>
              </div>

              {/* Question 4 */}
              <div className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
                <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-start gap-3">
                  <HelpCircle className="w-6 h-6 text-green-600 mt-1 shrink-0" />
                  Question 4 : Dans quelles zones de la région PACA intervenez-vous pour les extérieurs ?
                </h3>
                <div className="bg-green-50 rounded-lg p-5">
                  <p className="text-gray-700 leading-relaxed">
                    <strong>Réponse de l'expert :</strong> Nos équipes se déplacent rapidement pour remettre vos terrasses en état sur les secteurs de Marseille, Aix-en-Provence et Aubagne. Nous nous adaptons à vos contraintes d'horaires pour ne pas perturber votre activité.
                  </p>
                </div>
              </div>

            </section>

            {/* CTA */}
            <section className="mb-12">
              <div className="bg-gradient-to-r from-green-600 to-green-700 text-white rounded-xl p-8 text-center shadow-lg">
                <h3 className="text-2xl font-bold mb-4">
                  Besoin de faire nettoyer votre terrasse pour l'été ?
                </h3>
                <p className="text-lg mb-6 opacity-90">
                  Devis gratuit sous 24h sur Marseille, Aix-en-Provence et Aubagne.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button asChild size="lg" className="bg-white text-green-700 hover:bg-gray-100">
                    <Link to="/devis">Demander un devis gratuit</Link>
                  </Button>
                  <Button asChild size="lg" variant="outline" className="!bg-transparent border-2 border-white !text-white hover:!bg-white/10 [&>*]:!text-white">
                    <a href={PHONE_HREF} className="flex items-center gap-2" aria-label={ARIA_PHONE}>
                      <Phone className="w-5 h-5" />
                      {PHONE_DISPLAY}
                    </a>
                  </Button>
                </div>
              </div>
            </section>

            {/* Articles connexes */}
            <section className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Articles connexes</h2>
              <div className="grid md:grid-cols-2 gap-6">
                <Link to="/blog/nettoyage-ecologique-produits-bio-entreprise" className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow">
                  <h3 className="text-lg font-semibold text-green-700 mb-2">
                    Nettoyage écologique en entreprise →
                  </h3>
                  <p className="text-gray-600">
                    Pourquoi passer aux produits bio ? Avantages santé, labels fiables...
                  </p>
                </Link>
                <Link to="/blog/checklist-nettoyage-copropriete-syndic" className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow">
                  <h3 className="text-lg font-semibold text-green-700 mb-2">
                    Checklist nettoyage copropriété →
                  </h3>
                  <p className="text-gray-600">
                    Le guide complet pour les syndics et la gestion des parties communes.
                  </p>
                </Link>
              </div>
            </section>

          </div>
        </div>
      </article>
    </>
  );
}