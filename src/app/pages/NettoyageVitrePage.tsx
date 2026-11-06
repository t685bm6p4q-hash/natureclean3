import { SEO_Guardian } from '@/app/components/SEO_Guardian';
import { Button } from '@/app/components/ui/button';
import { Card, CardContent } from '@/app/components/ui/card';
import { BulletList } from '@/app/components/BulletList';
import { Square, Sparkles, Shield, ArrowRight, Wind, MapPin } from 'lucide-react';
import { Link } from 'react-router';
import { ImageWithFallback } from '@/app/components/figma/ImageWithFallback';
import { ServicePageHero } from '@/app/components/ServicePageHero';
import { IMAGES, getOptimizedCldUrl, cldSrcSet } from '@/app/utils/images';
import { FAQSection } from '@/app/components/FAQSection';
import type { FAQItem } from '@/app/components/FAQSection';
import { FOUNDING_YEAR } from '@/app/utils/constants';
import { NATURE_CLEAN_PROVIDER } from '@/app/utils/cleaning-service-jsonld';
import { ConversionBreak } from '@/app/components/ConversionBreak';
import { GoogleReviews } from '@/app/components/GoogleReviews';
import { BeforeAfterCompare } from '@/app/components/BeforeAfterCompare';

const FAQ_VITRE: FAQItem[] = [
  {
    question: 'Intervenez-vous avant l\'ouverture de mon commerce ?',
    answer:
      'Oui. C\'est un créneau fréquent à Marseille : avant l\'ouverture ou après la fermeture, selon vos contraintes. Le créneau se fixe au devis ou au contrat.',
  },
  {
    question: 'Laverez-vous aussi l\'intérieur des vitres ?',
    answer:
      'Oui, intérieur et extérieur, selon ce que vous souhaitez. Films solaires et vitres teintées : geste adapté, pas le même produit qu\'une vitrine brute.',
  },
  {
    question: 'Que se passe-t-il s\'il reste des traces après votre passage ?',
    answer:
      'On contrôle en fin d\'intervention sous plusieurs angles, depuis l\'intérieur et l\'extérieur. Si un défaut est constaté sur place, on reprend immédiatement.',
  },
  {
    question: 'Jusqu\'à quelle hauteur intervenez-vous ?',
    answer:
      'La base, c\'est la perche télescopique et l\'eau déminéralisée, pour les étages accessibles depuis le sol ou un balcon. Une nacelle, seulement si l\'accès et l\'autorisation de voirie le permettent. On ne promet pas le travail sur cordes.',
  },
  {
    question: 'Pouvez-vous enlever un tag ou un adhésif sur une vitre ?',
    answer:
      'Oui, selon le support et l\'ancienneté. On teste d\'abord sur une petite zone discrète avant traitement complet.',
  },
  {
    question: 'Combien coûte le nettoyage de vitres ?',
    answer:
      'Le prix dépend du nombre de vitres, de leur taille, de l\'accès et de la fréquence. Le devis est gratuit, détaillé et sans engagement — réponse sous 2 h.',
  },
  {
    question: 'À quelle fréquence faut-il nettoyer les vitres professionnelles ?',
    answer:
      'En rez-de-chaussée commerçant, le calcaire et les projections de rue appellent un passage plus souvent. Un bureau en étage tient plus longtemps. Une façade exposée au mistral et aux embruns, c\'est encore un autre rythme. On le fixe à la visite, pas sur une grille nationale.',
  },
  {
    question: 'Proposez-vous un contrat d\'entretien régulier pour les vitres ?',
    answer:
      'Oui. Fréquence écrite au devis, planning calé, pas besoin de rappeler à chaque fois. Réponse sous 2 h, devis sous 24 h.',
  },
];

const METHODE_VITRES = [
  {
    title: 'Repérage',
    text: 'État des vitres, cadres et joints, accès, et ce qu\'il faut protéger : enseigne, lettrage ou adhésifs sur la vitre, mobilier à proximité.',
  },
  {
    title: 'Lavage',
    text: 'La vitre est mouillée généreusement avec un produit adapté et de l\'eau déminéralisée, pour décoller poussière et dépôts sans rayer.',
  },
  {
    title: 'Raclette professionnelle',
    text: 'Passage régulier de la lame, lame tenue propre, pour retirer l\'eau d\'un seul geste et éviter les traces. C\'est le geste visible sur la photo ci-dessous.',
  },
  {
    title: 'Finitions',
    text: 'Bords, joints et cadres essuyés : c\'est là que l\'eau coule après coup.',
  },
  {
    title: 'Contrôle',
    text: 'Vérification sous plusieurs angles, depuis l\'intérieur et l\'extérieur. Reprise immédiate si un défaut est constaté sur place.',
  },
] as const;

const CONTRAINTES_VITRES = [
  {
    icon: Wind,
    title: 'Vent et soleil direct',
    text: 'Ils font sécher le produit trop vite et laissent des traces : on adapte le rythme de travail et l\'ordre de passage. Un jour de mistral fort, on décale plutôt que de livrer un résultat médiocre.',
  },
  {
    icon: MapPin,
    title: 'Dépôts urbains et bord de mer',
    text: 'Poussière, pollution, parfois sel sur les façades côté mer : il faut un lavage adapté, pas seulement un coup de raclette.',
  },
  {
    icon: Shield,
    title: 'Lettrage et adhésifs',
    text: 'On travaille autour du marquage, sans l\'abîmer. Produits et gestes adaptés au support.',
  },
  {
    icon: Square,
    title: 'Accès et hauteur',
    text: 'Trottoir, devanture ou étage déterminent le matériel : raclette à main, perche télescopique, ou nacelle si la voirie le permet. Pas de travail sur cordes.',
  },
  {
    icon: Sparkles,
    title: 'Horaires',
    text: 'Interventions possibles avant l\'ouverture ou après la fermeture pour ne pas gêner votre activité — créneau calé au contrat.',
  },
] as const;

export function NettoyageVitrePage() {
  return (
    <>
      <SEO_Guardian currentSection="nettoyage-vitre" faqItems={FAQ_VITRE} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Service',
            name: 'Nettoyage de vitres professionnel à Marseille',
            description:
              'Nettoyage de vitres à Marseille depuis 2021 : vitrines, bureaux, façades vitrées. Perche, eau déminéralisée, RC Pro. Réponse sous 2 h, devis sous 24 h.',
            provider: NATURE_CLEAN_PROVIDER,
            areaServed: { '@type': 'City', name: 'Marseille' },
            serviceType: 'Nettoyage de vitres',
            url: 'https://natureclean.fr/services/nettoyage-vitre',
          }),
        }}
      />

      <ServicePageHero
        title="Nettoyage de vitres professionnel à Marseille"
        subtitle="Vitrines, bureaux, façades — perche, eau déminéralisée, depuis 2021"
        badge="Lavage de vitres"
        badgeIcon={<Square className="w-4 h-4" />}
        imageSrc={IMAGES.facadeVitreeImmeuble}
        imageAlt="Vue sur les toits de Marseille depuis une baie vitrée"
        breadcrumbs={[
          { label: 'Accueil', to: '/' },
          { label: 'Services', to: '/services' },
          { label: 'Nettoyage de vitres' },
        ]}
        devisLink="/devis?service=vitres"
      />

      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto space-y-6 text-gray-700 leading-relaxed">
            <p className="text-lg">
              La vitrine est la première chose que voit un client. Nature Clean lave les vitres à
              Marseille depuis {FOUNDING_YEAR} : commerces, bureaux, copropriétés. Zone : Marseille
              et Bouches-du-Rhône.
            </p>
            <p>
              Cette page est celle du <strong>nettoyage de vitres</strong>. Les fiches bureaux et
              commerces en parlent en passant ; le détail (hauteur, voirie, calcaire) est ici.
            </p>
            <p className="font-semibold text-green-700">
              Réponse sous 2 h, devis sous 24 h — 50 % de produits éco-labellisés
            </p>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="max-w-3xl mx-auto text-center mb-14">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Notre savoir-faire en vitres
              </h2>
              <p className="text-xl font-semibold text-gray-800 mb-4">
                Une vitrine propre se voit avant même que le client entre
              </p>
              <p className="text-gray-700 leading-relaxed mb-4">
                La vitre est la première surface qu&apos;un client regarde en arrivant devant un
                commerce, un cabinet ou un hall d&apos;immeuble. Des traces, des gouttes séchées ou
                un voile de poussière se remarquent tout de suite, surtout à contre-jour ou quand le
                soleil frappe la façade.
              </p>
              <p className="text-gray-700 leading-relaxed">
                Chez Nature Clean, laver une vitre est un geste de métier : le bon matériel, le bon
                ordre de passage et un contrôle à la fin. Voici comment nous travaillons, et ce que
                montrent nos interventions.
              </p>
            </div>

            <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-8 text-center">
              Notre méthode, étape par étape
            </h3>
            <ol className="max-w-3xl mx-auto space-y-4 mb-16">
              {METHODE_VITRES.map((step, i) => (
                <li key={step.title} className="flex gap-4">
                  <span
                    className="flex-shrink-0 w-9 h-9 rounded-full bg-green-600 text-white font-bold flex items-center justify-center text-sm"
                    aria-hidden="true"
                  >
                    {i + 1}
                  </span>
                  <div>
                    <h4 className="font-bold text-gray-900 mb-1">{step.title}</h4>
                    <p className="text-sm text-gray-700 leading-relaxed">{step.text}</p>
                  </div>
                </li>
              ))}
            </ol>

            <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4 text-center">
              Ce que montrent nos interventions
            </h3>
            <p className="text-gray-600 text-center mb-10 max-w-2xl mx-auto">
              Photos de chantiers à Marseille et environs. Logos recadrés ou génériques lorsque
              l&apos;accord écrit de l&apos;enseigne n&apos;est pas affiché.
            </p>

            <div className="space-y-16">
              <div className="grid lg:grid-cols-2 gap-10 items-center">
                <div className="rounded-2xl overflow-hidden shadow-xl">
                  <ImageWithFallback
                    src={getOptimizedCldUrl(IMAGES.lavageVitrineBoutiqueRaclette, 800)}
                    srcSet={cldSrcSet(IMAGES.lavageVitrineBoutiqueRaclette, [400, 700, 1000])}
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    alt="Agent Nature Clean lavant une vitrine de boutique à la raclette, gant bleu et lame inox"
                    className="w-full h-[320px] lg:h-[400px] object-cover"
                    width={800}
                    height={400}
                    loading="lazy"
                    decoding="async"
                  />
                </div>
                <div>
                  <h4 className="text-xl font-bold text-gray-900 mb-3">
                    Vitrine de boutique lavée à la raclette
                  </h4>
                  <p className="text-gray-700 leading-relaxed text-sm">
                    Un agent Nature Clean, gant bleu et raclette inox, en plein passage sur une
                    grande vitrine. On voit la partie déjà égouttée et la partie encore mouillée :
                    c&apos;est la méthode en train de se faire.
                  </p>
                </div>
              </div>

              <div className="grid lg:grid-cols-2 gap-10 items-center">
                <div className="order-2 lg:order-1">
                  <h4 className="text-xl font-bold text-gray-900 mb-3">
                    Baie vitrée retrouvée propre après un tag
                  </h4>
                  <p className="text-gray-700 leading-relaxed text-sm mb-4">
                    Avant/après sur une grande baie recouverte d&apos;un tag blanc, puis la même
                    vitre propre et transparente. Le résultat se juge au reflet : plus aucune trace
                    visible. Technique adaptée au verre, test préalable sur une zone discrète.
                  </p>
                  <Button asChild variant="outline" className="border-green-600 text-green-700">
                    <Link to="/services/nettoyage-graffitis">Effacement tags et graffitis</Link>
                  </Button>
                </div>
                <div className="order-1 lg:order-2 rounded-2xl overflow-hidden shadow-xl">
                  <BeforeAfterCompare
                    beforeSrc={getOptimizedCldUrl(IMAGES.tagVitrineAvantMarseille, 700)}
                    beforeSrcSet={cldSrcSet(IMAGES.tagVitrineAvantMarseille, [400, 700, 900])}
                    afterSrc={getOptimizedCldUrl(IMAGES.tagVitrineApresMarseille, 700)}
                    afterSrcSet={cldSrcSet(IMAGES.tagVitrineApresMarseille, [400, 700, 900])}
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    beforeAlt="Vitrine d'une grande surface recouverte d'un grand tag blanc, avant intervention"
                    afterAlt="La même vitrine propre après effacement du tag"
                    className="min-h-[280px] lg:min-h-[360px] rounded-2xl"
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-8">
                <div className="relative rounded-2xl overflow-hidden shadow-xl">
                  <ImageWithFallback
                    src={getOptimizedCldUrl(IMAGES.vitrinesBoutiqueCentreCommercialMarseille, 800)}
                    srcSet={cldSrcSet(IMAGES.vitrinesBoutiqueCentreCommercialMarseille, [400, 700, 1000])}
                    sizes="(max-width: 768px) 100vw, 50vw"
                    alt="Vitrine et entrée d'une boutique de sport en centre commercial, vitres propres"
                    className="w-full h-[280px] object-cover"
                    width={800}
                    height={280}
                    loading="lazy"
                    decoding="async"
                  />
                  <div className="absolute bottom-0 inset-x-0 p-4 bg-gradient-to-t from-black/80 to-transparent text-white">
                    <p className="font-bold text-sm">Vitrines — commerce</p>
                    <p className="text-xs text-white/85 mt-1">
                      Grand format, entrées et devantures — Marseille et 13.
                    </p>
                  </div>
                </div>
                <div className="relative rounded-2xl overflow-hidden shadow-xl">
                  <ImageWithFallback
                    src={getOptimizedCldUrl(IMAGES.grandOpenSpaceModerne, 800)}
                    srcSet={cldSrcSet(IMAGES.grandOpenSpaceModerne, [400, 700, 1000])}
                    sizes="(max-width: 768px) 100vw, 50vw"
                    alt="Baies vitrées et open space de bureaux professionnels à Marseille"
                    className="w-full h-[280px] object-cover"
                    width={800}
                    height={280}
                    loading="lazy"
                    decoding="async"
                  />
                  <div className="absolute bottom-0 inset-x-0 p-4 bg-gradient-to-t from-black/80 to-transparent text-white">
                    <p className="font-bold text-sm">Bureaux — baies vitrées</p>
                    <p className="text-xs text-white/85 mt-1">
                      Plateaux, cloisons vitrées, salle de réunion : intérieur et face extérieure.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-20">
              <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4 text-center">
                Les contraintes de terrain que nous gérons
              </h3>
              <p className="text-gray-500 text-center mb-10 max-w-2xl mx-auto">
                Calcaire, mistral, voirie : le métier à Marseille.
              </p>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {CONTRAINTES_VITRES.map((item) => {
                  const Icon = item.icon;
                  return (
                    <div
                      key={item.title}
                      className="bg-white p-5 rounded-xl border border-gray-100 shadow-sm h-full"
                    >
                      <Icon className="w-7 h-7 text-green-600 mb-3" aria-hidden="true" />
                      <h4 className="font-bold text-gray-900 mb-2">{item.title}</h4>
                      <p className="text-sm text-gray-600 leading-relaxed">{item.text}</p>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="mt-16 grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              <div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">Ce que nous nettoyons</h3>
                <BulletList
                  lines={[
                    'Vitrines de commerces',
                    'Baies vitrées de bureaux',
                    'Vitrages d\'entrée et façades vitrées',
                    'Verrières et vérandas',
                    'Intérieur et extérieur',
                  ]}
                />
              </div>
              <div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">Quelle fréquence prévoir ?</h3>
                <p className="text-sm text-gray-700 leading-relaxed">
                  Elle dépend de l&apos;exposition (rue passante, bord de mer, proximité d&apos;un
                  chantier), de l&apos;image que vous voulez donner et de l&apos;accès. Une vitrine
                  en rez-de-chaussée sur une rue fréquentée demande plus de passages qu&apos;un
                  vitrage de bureau en étage. On la définit avec vous au devis, en contrat régulier
                  ou en passage ponctuel.
                </p>
              </div>
              <div className="bg-green-50 p-6 rounded-xl border border-green-100">
                <h3 className="text-lg font-bold text-gray-900 mb-2">Devis et délais</h3>
                <p className="text-sm text-gray-700 leading-relaxed mb-4">
                  Réponse sous 2 h en horaires d&apos;ouverture, devis gratuit et sans engagement,
                  intervention sous 24 à 48 h selon la demande. Pas de tarif fixe affiché : le prix
                  dépend du nombre de vitres, de leur taille, de l&apos;accès et de la fréquence.
                </p>
                <Button asChild size="sm" className="bg-green-600 hover:bg-green-700">
                  <Link to="/devis?service=vitres">Demander un devis</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-12 text-center">
              Intérieur, extérieur, hauteur accessible
            </h2>

            <div className="grid md:grid-cols-3 gap-8">
              <Card className="hover:shadow-xl transition-shadow border-green-100">
                <CardContent className="p-6">
                  <Square className="w-12 h-12 text-green-600 mb-4" />
                  <h3 className="text-xl font-bold text-gray-900 mb-3">Vitres intérieures</h3>
                  <p className="text-gray-600 text-sm mb-4">
                    Bureaux, salles de réunion, halls. Horaires décalés si vos équipes sont sur place.
                  </p>
                  <BulletList
                    lines={[
                      'Bureaux et locaux professionnels',
                      'Copropriétés (parties communes)',
                      'Double vitrage, films, teintes : geste adapté',
                    ]}
                  />
                </CardContent>
              </Card>

              <Card className="hover:shadow-xl transition-shadow border-green-100">
                <CardContent className="p-6">
                  <Sparkles className="w-12 h-12 text-green-600 mb-4" />
                  <h3 className="text-xl font-bold text-gray-900 mb-3">Vitres extérieures</h3>
                  <p className="text-gray-600 text-sm mb-4">
                    Vitrines et façades. Eau déminéralisée contre le calcaire marseillais.
                  </p>
                  <BulletList
                    lines={[
                      'Vitrines de commerces',
                      'Baies vitrées, verrières, vérandas',
                      'Cadres et joints',
                    ]}
                  />
                </CardContent>
              </Card>

              <Card className="hover:shadow-xl transition-shadow border-green-100">
                <CardContent className="p-6">
                  <Shield className="w-12 h-12 text-green-600 mb-4" />
                  <h3 className="text-xl font-bold text-gray-900 mb-3">Hauteur accessible</h3>
                  <p className="text-gray-600 text-sm mb-4">
                    Perche depuis le sol ou un balcon. Nacelle seulement si l&apos;accès et la voirie
                    le permettent.
                  </p>
                  <BulletList
                    lines={[
                      'Perche télescopique, formation et EPI',
                      'Autorisation de voirie si nacelle sur trottoir',
                      'Pas de travail sur cordes',
                    ]}
                  />
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      <ConversionBreak
        image={IMAGES.lavageVitrineBoutiqueRaclette}
        imageAlt="Agent Nature Clean lavant une vitrine de boutique à la raclette, gant bleu et lame inox"
        title="Un passage calé sur vos horaires et la voirie"
        subtitle="Réponse sous 2 h, devis sous 24 h — retouches si un défaut est constaté à la fin"
        devisLink="/devis?service=vitres"
      />

      <GoogleReviews />

      <FAQSection
        items={FAQ_VITRE}
        title="Questions fréquentes — Nettoyage de vitres"
        subtitle="Créneaux, intérieur/extérieur, hauteur, tags et tarifs"
      />

      <section className="py-16 bg-gray-900 relative overflow-hidden">
        <div className="container mx-auto px-4 text-center relative z-10">
          <h2 className="text-3xl md:text-4xl font-black text-white mb-4">
            Nettoyage de vitres à Marseille
          </h2>
          <p className="text-gray-300 mb-8">
            Marseille et Bouches-du-Rhône — réponse sous 2 h, devis sous 24 h
          </p>
          <Button asChild size="lg" className="bg-green-500 hover:bg-green-400 text-gray-900 font-black">
            <Link to="/devis?service=vitres">
              Demander un devis gratuit
              <ArrowRight className="w-5 h-5 ml-2" />
            </Link>
          </Button>
        </div>
      </section>

      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">Consultez également :</h2>
          <div className="flex flex-wrap justify-center gap-4">
            <Button asChild variant="outline" className="border-green-600 text-green-700 hover:bg-green-50">
              <Link to="/services/entretien-bureaux">Entretien de bureaux</Link>
            </Button>
            <Button asChild variant="outline" className="border-green-600 text-green-700 hover:bg-green-50">
              <Link to="/services/nettoyage-commerces">Nettoyage de commerces</Link>
            </Button>
            <Button asChild variant="outline" className="border-green-600 text-green-700 hover:bg-green-50">
              <Link to="/services/nettoyage-coproprietes">Nettoyage de copropriétés</Link>
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
