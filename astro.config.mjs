// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import { site } from './src/data/site.ts';

/**
 * Two deploy targets from one codebase:
 *
 *   Production — Cloudflare Pages at recifetranslators.com.br, served at the
 *   root. Defaults below; /api/quote runs as a Pages Function.
 *
 *   Demonstration — GitHub Pages at ayr-farias.github.io/RT, served under a
 *   subpath. The workflow sets PUBLIC_SITE_URL and PUBLIC_BASE_PATH, and
 *   PUBLIC_DEMO so the quote form states plainly that it does not send
 *   (GitHub Pages is static-only and cannot run the Function).
 */
const siteUrl = process.env.PUBLIC_SITE_URL ?? site.origin;
const basePath = process.env.PUBLIC_BASE_PATH || undefined;

export default defineConfig({
  site: siteUrl,
  base: basePath,
  output: 'static',
  trailingSlash: 'ignore',

  i18n: {
    defaultLocale: 'pt',
    locales: ['pt', 'en'],
    routing: {
      // Portuguese sits at the root: it carries the local SEO weight and must
      // not be pushed behind a prefix.
      prefixDefaultLocale: false,
      redirectToDefaultLocale: false,
    },
    // NOTE: §7 of the brief specifies `fallback: { en: 'pt' }`. That is correct
    // while English is incomplete, but every page now has a real English
    // equivalent under its own slug. With fallback on, Astro also emitted 11
    // redirect stubs (/en/contato/, /en/servicos/…) which landed in the sitemap
    // carrying hreflang alternates — duplicate English URLs competing with the
    // real ones. Re-enable only if a locale goes partial again.
  },

  integrations: [
    sitemap({
      i18n: {
        defaultLocale: 'pt',
        locales: { pt: 'pt-BR', en: 'en' },
      },
    }),
  ],

  image: {
    // AVIF/WebP handled per-<Image>; sharp is the default pipeline.
    responsiveStyles: true,
  },

  build: {
    inlineStylesheets: 'auto',
  },

  vite: {
    build: {
      cssMinify: 'lightningcss',
    },
  },
});
