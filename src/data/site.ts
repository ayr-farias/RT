/**
 * Central site configuration.
 *
 * Every value marked TODO(open-item-N) corresponds to a numbered open item in
 * §16 of the build brief. They are collected here — and nowhere else — so the
 * whole set can be resolved in one pass without hunting through templates.
 *
 * Anything read from here is used for canonicals, JSON-LD, hreflang, the
 * WhatsApp deep link, and the copy that states service area and capacity.
 */

export const site = {
  /** TODO(open-item-1): registered domain. Drives `site` in astro.config,
   *  canonicals, JSON-LD @id, and hreflang. Placeholder until confirmed. */
  origin: 'https://recifetranslators.com.br',

  brand: 'Recife Translators',

  /** Legal identity. Shown to the institutional audience, which filters on it. */
  legal: {
    razaoSocial: 'Recife Translators Serviços de Tradução Ltda.', // TODO: confirm exact razão social
    cnpj: '00.000.000/0001-00', // TODO: real CNPJ
    issuesNotaFiscal: true,
  },

  contact: {
    /** TODO(open-item-6): E.164, digits only, for the wa.me deep link. */
    whatsappE164: '5581900000000',
    whatsappDisplay: '+55 81 90000-0000',
    email: 'contato@recifetranslators.com.br',
    /** TODO(open-item-9): a number you will actually hit. Used verbatim in the
     *  form confirmation state and on /contato. */
    responseTimeHours: 4,
  },

  /** TODO(open-item-7): Recife-level only by default. The brief flags that some
   *  buyers want a street address and some interpreters do not want a home
   *  address indexed. Set `street` only if that is resolved in favour of publishing. */
  address: {
    street: null as string | null,
    locality: 'Recife',
    region: 'PE',
    postalCode: '',
    country: 'BR',
  },

  /** Owned inventory. The structural fact the whole site is bounded by. */
  equipment: {
    receivers: 30,
    /** TODO(open-item-2): transmitter count = channel capacity. While this is
     *  null the site must NOT claim two simultaneous language channels in one
     *  room. `canRunTwoChannels` gates that copy. */
    transmitters: null as number | null,
  },

  /** TODO(open-item-3): the literal city list. Used as visible text (agencies
   *  filter on geography before reading anything else) and as JSON-LD areaServed. */
  areaServed: [
    'Recife',
    'Olinda',
    'Jaboatão dos Guararapes',
    'Cabo de Santo Agostinho',
    'Suape',
    'Ipojuca',
    'Porto de Galinhas',
    'Caruaru',
    'Petrolina',
    'Fortaleza',
    'Natal',
    'João Pessoa',
    'Maceió',
    'Salvador',
  ],

  rsiPlatforms: ['Zoom', 'KUDO', 'Interprefy', 'Interactio'],

  social: {
    linkedin: '', // TODO: LinkedIn company URL for sameAs
    googleBusiness: '', // TODO: GBP listing URL for sameAs
  },
} as const;

/** Channel-capacity guard. Until the transmitter count is known, copy that
 *  implies EN and ES running at once stays off the site. */
export const canRunTwoChannels = (site.equipment.transmitters ?? 0) >= 2;

export type Lang = 'pt' | 'en';

/** wa.me deep link with prefilled text naming the page it came from. */
export function whatsappLink(context: string): string {
  const text =
    context === 'en'
      ? `Hello! I found you via the website and would like to check availability.`
      : `Olá! Vim pelo site e gostaria de verificar disponibilidade.`;
  return `https://wa.me/${site.contact.whatsappE164}?text=${encodeURIComponent(text)}`;
}
