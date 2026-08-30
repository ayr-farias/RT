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

/**
 * Every route in this table is root-absolute. When the site is served from a
 * subpath — the GitHub Pages demo lives at /RT/ — Astro sets BASE_URL and each
 * link has to be rewritten, or the whole site 404s. Both accessors below go
 * through `withBase`, so nothing needs to know about the base except this file.
 */
function withBase(p: string): string {
  const base = import.meta.env.BASE_URL || '/';
  if (base === '/') return p;
  const trimmed = base.endsWith('/') ? base.slice(0, -1) : base;
  return p === '/' ? `${trimmed}/` : `${trimmed}${p}`;
}

export function path(key: RouteKey, lang: Lang): string {
  return withBase(routes[key][lang]);
}

/** Base-aware URL for a file in public/, e.g. asset('fonts/x.woff2'). */
export function asset(relative: string): string {
  return withBase(`/${relative.replace(/^\//, '')}`);
}

/** The opposite locale's URL for the same page. Never the homepage. */
export function alternate(key: RouteKey, current: Lang): { lang: Lang; href: string } {
  const other: Lang = current === 'pt' ? 'en' : 'pt';
  return { lang: other, href: withBase(routes[key][other]) };
}

/** Primary nav, in order. Service children hang off `services`. */
export const navOrder: RouteKey[] = [
  'services',
  'explainer',
  'interpreters',
  'events',
  'contact',
];
