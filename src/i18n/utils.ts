import type { Lang } from '@/data/site';
import { pt, type Strings } from './pt';
import { en } from './en';

const dictionaries = { pt, en } as const;

/** Typed string lookup. `t(lang)` returns the whole dictionary for that locale. */
export function t(lang: Lang): Strings {
  return dictionaries[lang];
}

/** Derives the locale from a URL pathname. Portuguese is the unprefixed root. */
export function langFromPath(pathname: string): Lang {
  return pathname === '/en' || pathname.startsWith('/en/') ? 'en' : 'pt';
}

export const htmlLang: Record<Lang, string> = { pt: 'pt-BR', en: 'en' };

/** Locale-aware date formatting, used by the events grid and the privacy page. */
export function formatYear(year: number): string {
  return String(year);
}

export function formatList(items: readonly string[], lang: Lang): string {
  const fmt = new Intl.ListFormat(lang === 'pt' ? 'pt-BR' : 'en', {
    style: 'long',
    type: 'conjunction',
  });
  return fmt.format(items as string[]);
}

/** Human-readable language-pair labels. */
export const pairLabels: Record<Lang, Record<string, string>> = {
  pt: {
    'en-pt': 'Inglês → Português',
    'pt-en': 'Português → Inglês',
    'pt-es': 'Português → Espanhol',
    'es-pt': 'Espanhol → Português',
  },
  en: {
    'en-pt': 'English → Portuguese',
    'pt-en': 'Portuguese → English',
    'pt-es': 'Portuguese → Spanish',
    'es-pt': 'Spanish → Portuguese',
  },
};
