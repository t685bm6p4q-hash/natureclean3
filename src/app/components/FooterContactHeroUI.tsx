import { Link, useNavigate } from 'react-router';
import {
  HeroUIProvider,
  Card,
  CardHeader,
  CardBody,
  Button as HeroButton,
  Divider,
} from '@heroui/react';
import { Button } from '@/app/components/ui/button';
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  FileText,
} from 'lucide-react';
import {
  PHONE_DISPLAY,
  PHONE_HREF,
  EMAIL,
  EMAIL_HREF,
  ARIA_PHONE,
} from '@/app/utils/constants';

const ZONE_LINKS = [
  { label: "Zones d'intervention", href: '/zones-intervention' },
  { label: 'Bureaux Marseille', href: '/nettoyage-bureaux-marseille' },
  { label: 'Bureaux Aix', href: '/nettoyage-bureaux-aix-en-provence' },
  { label: 'Copropriétés Aubagne', href: '/nettoyage-coproprietes-aubagne' },
  { label: 'Copropriétés La Ciotat', href: '/nettoyage-coproprietes-la-ciotat' },
  { label: 'Fin de chantier', href: '/services/nettoyage-chantiers' },
] as const;

const SOCIAL_LINKS = [
  {
    href: 'https://www.instagram.com/natureclean13/',
    label: 'Instagram @natureclean13 — Nature Clean Marseille',
    text: '@natureclean13',
    className: 'text-pink-400 hover:text-pink-300',
    icon: (
      <svg className="h-4 w-4 shrink-0 text-pink-400" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
      </svg>
    ),
  },
  {
    href: 'https://www.linkedin.com/in/nature-clean-612261285/',
    label: 'LinkedIn — Nature Clean Marseille',
    text: 'LinkedIn',
    className: 'text-blue-400 hover:text-blue-300',
    icon: (
      <svg className="h-4 w-4 shrink-0 text-blue-400" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    ),
  },
  {
    href: 'https://www.pagesjaunes.fr/pros/61828182',
    label: 'Pages Jaunes — Nature Clean Marseille',
    text: 'Pages Jaunes',
    className: 'text-yellow-400 hover:text-yellow-300',
    icon: (
      <svg className="h-4 w-4 shrink-0 text-yellow-400" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path d="M19 2H6C4.897 2 4 2.897 4 4v16c0 1.103.897 2 2 2h13c.553 0 1-.447 1-1V3c0-.553-.447-1-1-1zm-1 18H6V4h12v16zM8 7h8v2H8V7zm0 4h8v2H8v-2zm0 4h5v2H8v-2z" />
      </svg>
    ),
  },
  {
    href: 'https://share.google/LGuTIovk5ovTXGzuc',
    label: 'Google — avis Nature Clean Marseille',
    text: 'Google',
    className: 'text-blue-400 hover:text-blue-300',
    icon: (
      <svg className="h-4 w-4 shrink-0" viewBox="0 0 24 24" aria-hidden="true">
        <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
        <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
        <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05" />
        <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
      </svg>
    ),
  },
] as const;

const FOOTER_CARD_BASE =
  'relative overflow-hidden border border-default-200/40 border-t-[3px] border-t-green-500 bg-gray-800';

function FooterContactHeroUIInner() {
  return (
    <div className="dark flex flex-col gap-4">
      <Card
        shadow="sm"
        classNames={{
          base: FOOTER_CARD_BASE,
          header: 'pb-0 pt-4 px-4',
          body: 'px-4 pb-4 pt-2 gap-3',
        }}
      >
        <CardHeader>
          <h4 className="text-sm font-bold uppercase tracking-wider text-foreground">
            Contact
          </h4>
        </CardHeader>
        <CardBody>
          <div className="flex flex-col gap-2 sm:flex-row">
            <Button
              asChild
              variant="shine"
              size="lg"
              className="min-h-11 w-full flex-1 rounded-xl"
            >
              <Link to="/devis">
                <FileText className="h-4 w-4 shrink-0" aria-hidden="true" />
                Devis gratuit
              </Link>
            </Button>
            <HeroButton
              as="a"
              href={PHONE_HREF}
              variant="bordered"
              color="primary"
              radius="lg"
              className="min-h-11 w-full flex-1 font-bold"
              aria-label={ARIA_PHONE}
              startContent={<Phone className="h-4 w-4 shrink-0" aria-hidden="true" />}
            >
              Appeler
            </HeroButton>
          </div>
          <Divider className="bg-default-200/30" />
          <ul className="space-y-1 list-none m-0 p-0">
            <li>
              <HeroButton
                as="a"
                href={PHONE_HREF}
                variant="light"
                radius="lg"
                className="min-h-11 w-full justify-start gap-3 px-2 font-medium text-default-300 data-[hover=true]:text-primary"
                startContent={<Phone className="h-4 w-4 shrink-0 text-primary" aria-hidden="true" />}
              >
                {PHONE_DISPLAY}
              </HeroButton>
            </li>
            <li>
              <HeroButton
                as="a"
                href={EMAIL_HREF}
                variant="light"
                radius="lg"
                className="min-h-11 w-full justify-start gap-3 px-2 font-normal text-default-300 data-[hover=true]:text-primary h-auto min-h-11 py-2"
                startContent={<Mail className="h-4 w-4 shrink-0 text-primary mt-0.5 self-start" aria-hidden="true" />}
              >
                <span className="break-all text-left">{EMAIL}</span>
              </HeroButton>
            </li>
            <li className="flex items-start gap-3 px-2 py-2 text-sm text-default-400">
              <MapPin className="h-4 w-4 shrink-0 text-primary mt-0.5" aria-hidden="true" />
              <address className="not-italic leading-relaxed">
                22 Traverse Pupat
                <br />
                13008 Marseille
              </address>
            </li>
            <li className="flex items-center gap-3 px-2 py-1 text-sm text-default-400">
              <Clock className="h-4 w-4 shrink-0 text-primary" aria-hidden="true" />
              <span>Lun-Sam : 8h-18h</span>
            </li>
          </ul>
          <Divider className="bg-default-200/30" />
          <ul className="space-y-1 list-none m-0 p-0">
            {SOCIAL_LINKS.map((item) => (
              <li key={item.href}>
                <HeroButton
                  as="a"
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  variant="light"
                  radius="lg"
                  aria-label={item.label}
                  className={`min-h-11 w-full justify-start gap-3 px-2 font-medium text-default-300 ${item.className}`}
                  startContent={item.icon}
                >
                  {item.text}
                </HeroButton>
              </li>
            ))}
          </ul>
        </CardBody>
      </Card>

      <Card
        shadow="sm"
        classNames={{
          base: FOOTER_CARD_BASE,
          header: 'pb-2 pt-4 px-4',
          body: 'px-4 pb-4 pt-0',
        }}
      >
        <CardHeader className="flex gap-2">
          <MapPin className="h-4 w-4 shrink-0 text-primary" aria-hidden="true" />
          <h5 className="text-xs font-bold text-foreground">Zone d&apos;intervention</h5>
        </CardHeader>
        <CardBody>
          <p className="text-xs text-default-400 leading-relaxed mb-3">
            <strong className="font-semibold text-default-300">Marseille</strong> (13001 à 13016),{' '}
            Aix-en-Provence, Aubagne, La Ciotat, Marignane, Vitrolles, Istres, Martigues et Salon-de-Provence — Bouches-du-Rhône (13).
          </p>
          <ul className="flex flex-wrap gap-2 list-none m-0 p-0" role="list">
            {ZONE_LINKS.map((link) => (
              <li key={link.href}>
                <HeroButton
                  as={Link}
                  to={link.href}
                  size="sm"
                  variant="flat"
                  color="default"
                  radius="md"
                  className="min-h-9 text-default-400 data-[hover=true]:text-primary"
                >
                  {link.label}
                </HeroButton>
              </li>
            ))}
          </ul>
        </CardBody>
      </Card>
    </div>
  );
}

export function FooterContactHeroUI() {
  const navigate = useNavigate();

  return (
    <HeroUIProvider
      locale="fr-FR"
      navigate={(to) => navigate(typeof to === 'string' ? to : String(to))}
      skipFramerMotionAnimations
      reducedMotion="always"
    >
      <FooterContactHeroUIInner />
    </HeroUIProvider>
  );
}
