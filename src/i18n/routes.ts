import type { Lang } from '@/data/site';

/**
 * The canonical route table. Every URL in the site is declared here once.
 *
 * This is the single source of truth for the nav, the language switcher, the
 * hreflang block, the breadcrumbs, and the sitemap alternates. Because both
 * locales are keyed by the same `RouteKey`, the switcher can always resolve the
 * *equivalent* page rather than falling back to the homepage.
 */
export const routes = {
  home:         { pt: '/',                             en: '/en/' },
  services:     { pt: '/servicos',                     en: '/en/services' },
  portable:     { pt: '/servicos/simultanea-portatil', en: '/en/services/portable-simultaneous' },
  remote:       { pt: '/servicos/remota',              en: '/en/services/remote' },
  consecutive:  { pt: '/servicos/consecutiva',         en: '/en/services/consecutive' },
  conferences:  { pt: '/servicos/congressos',          en: '/en/services/conferences' },
  explainer:    { pt: '/preciso-de-cabine',            en: '/en/booth-or-portable' },
  interpreters: { pt: '/interpretes',                  en: '/en/interpreters' },
  events:       { pt: '/eventos',                      en: '/en/events' },
  quote:        { pt: '/orcamento',                    en: '/en/quote' },
  contact:      { pt: '/contato',                      en: '/en/contact' },
  privacy:      { pt: '/privacidade',                  en: '/en/privacy' },
} as const satisfies Record<string, Record<Lang, string>>;

export type RouteKey = keyof typeof routes;

/** The four service pages, in delivery-control order (§5). */
export const serviceKeys = ['portable', 'remote', 'consecutive', 'conferences'] as const;
export type ServiceKey = (typeof serviceKeys)[number];

export function path(key: RouteKey, lang: Lang): string {
  return routes[key][lang];
}

/** The opposite locale's URL for the same page. Never the homepage. */
export function alternate(key: RouteKey, current: Lang): { lang: Lang; href: string } {
  const other: Lang = current === 'pt' ? 'en' : 'pt';
  return { lang: other, href: routes[key][other] };
}

/** Primary nav, in order. Service children hang off `services`. */
export const navOrder: RouteKey[] = [
  'services',
  'explainer',
  'interpreters',
  'events',
  'contact',
];
