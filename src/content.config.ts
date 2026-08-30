import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
// Imported directly rather than re-exported from `astro:content`, which marks
// its `z` as deprecated. Astro 7 uses Zod v4 internally; this is the same package.
import { z } from 'zod';

const langs = z.enum(['pt', 'en']);
const pairs = z.enum(['en-pt', 'pt-en', 'pt-es', 'es-pt']);

const services = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/services' }),
  schema: z.object({
    lang: langs,
    /** Stable id shared across locales. The language switcher matches on this. */
    key: z.string(),
    /** URL segment for this locale, e.g. 'simultanea-portatil' / 'portable-simultaneous'. */
    slug: z.string(),
    title: z.string(),
    order: z.number(),
    summary: z.string().max(180),
    /** false => partner equipment or partner team. Rendered without apology. */
    inHouse: z.boolean(),
    maxListeners: z.number().optional(),
    pairs: z.array(pairs),
    platforms: z.array(z.string()).optional(),
    requiresEquipment: z.boolean(),
    heroImage: z.string().optional(),
    seo: z.object({
      title: z.string().max(60),
      description: z.string().max(155),
      primaryKeyword: z.string(),
    }),
  }),
});

const events = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/events' }),
  schema: z
    .object({
      client: z.string().optional(),
      /** Gate: the client name renders only if this is true. */
      clientPublic: z.boolean().default(false),
      /** Always safe to show. Carries the entry when the name is not cleared. */
      sector: z.string(),
      city: z.string(),
      state: z.string().default('PE'),
      year: z.number(),
      format: z.enum(['portable', 'booth', 'remote', 'consecutive', 'escort']),
      pair: pairs,
      listeners: z.number().optional(),
      interpreters: z.array(z.enum(['gustavo', 'lorena'])).nonempty(),
      photo: z.string().optional(),
      /** Gate: the photo renders only if this is true. */
      photoConsent: z.boolean().default(false),
    })
    .refine((d) => !d.photo || d.photoConsent, {
      message: 'Photo present without recorded consent — clear it or remove the file.',
    }),
});

const faq = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/faq' }),
  schema: z.object({
    lang: langs,
    question: z.string(),
    order: z.number(),
    page: z.enum(['booth-or-portable', 'quote', 'home']),
  }),
});

export const collections = { services, events, faq };
