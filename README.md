# Recife Translators

Static Astro site for a two-person simultaneous interpretation business in
Recife, Pernambuco. Portuguese at the root, English under `/en/`, 24 routes.

```bash
npm install
npm run dev      # http://localhost:4321
npm run build    # astro check && astro build → dist/
npm run preview
```

## Before this goes live

Everything unresolved lives in **`src/data/site.ts`**, marked `TODO(open-item-N)`
against §16 of the build brief. Nothing else needs editing to fill them in.

| # | Item | Where |
|---|---|---|
| 1 | Domain | `site.origin` — drives canonicals, hreflang, JSON-LD `@id` |
| 2 | Transmitter count | `site.equipment.transmitters` — see note below |
| 3 | Travel radius | `site.areaServed` — visible copy **and** JSON-LD |
| 4 | Event list | `src/content/events/*.md` — currently sample data |
| 5 | Media inventory | `public/media/` — currently empty, see below |
| 6 | WhatsApp number | `site.contact.whatsappE164` |
| 7 | Address | `site.address.street` — `null` publishes Recife-level only |
| 8 | Spanish locale | Not built. Spanish is listed as Lorena's capability. |
| 9 | Response time | `site.contact.responseTimeHours` — used in copy *and* the form confirmation |

Also placeholder: `razaoSocial` and `cnpj` in `site.legal`, and the review date
in `src/components/pages/Privacy.astro`.

**Transmitter count (open item 2)** is wired as a guard, not just a number.
`canRunTwoChannels` in `site.ts` is `false` while `transmitters` is `null`, so
no copy can claim English and Spanish running simultaneously in one room until
that figure is known.

## The confidentiality gate

`src/content.config.ts` makes a leak a build failure, not a review item:

- An event with `photo` but without `photoConsent: true` **fails the build**
  with "Photo present without recorded consent". Verified.
- A `client` name renders only when `clientPublic: true`. Otherwise the entry
  renders as sector, city, year — which still carries weight.

Apply the same discipline to hero footage: where permission is unclear, use
footage in which nothing identifiable is audible or legible.

## Media

`public/media/` is empty. The site is built to degrade cleanly without it —
portraits render as labelled placeholder blocks and the hero runs without video.
To add real media:

- **Hero video** — pass `video={{ mp4, webm, poster }}` to `<Hero>` in
  `src/components/pages/Home.astro`. ≤6s, silent, ≤2.5 MB total, poster set.
- **Portraits** — `/media/gustavo.jpg`, `/media/lorena.jpg` (paths already in
  `src/data/interpreters.ts`); swap the `.placeholder` divs for `<Image>`.
- **Longer reel** — `<VideoFacade>` is built and unused; nothing loads from
  YouTube until the click.

## Deploy

Two targets, one codebase. `site` and `base` are build-time environment
variables, so neither build needs a code change.

### Production — Cloudflare Pages (recifetranslators.com.br)

Build command `npm run build`, output directory `dist`, no env overrides.
`functions/api/quote.ts` is picked up automatically as a Pages Function at
`/api/quote`.

Set these in Pages → Settings → Environment variables (see `.env.example`):
`RESEND_API_KEY`, `QUOTE_TO`, `QUOTE_FROM`.

The form posts JSON when JS is available and falls back to a native POST that
returns a real HTML confirmation page when it is not. Spam handling is a
honeypot plus a submission-time trap — no CAPTCHA on a lead form.

### Demonstration — GitHub Pages (ayr-farias.github.io/RT)

`.github/workflows/deploy-pages.yml` builds and deploys on every push to
`main`. **One manual step:** in the repo, Settings → Pages → Build and
deployment → Source → **GitHub Actions**. Without it the workflow runs but
nothing publishes.

The workflow sets three variables:

| variable | value | effect |
|---|---|---|
| `PUBLIC_SITE_URL` | `https://ayr-farias.github.io` | canonicals and JSON-LD |
| `PUBLIC_BASE_PATH` | `/RT` | every link, asset and font URL |
| `PUBLIC_DEMO` | `true` | the quote form says it does not send |

GitHub Pages is static-only and cannot run the Pages Function, so on the demo
the quote form validates but does not submit, and says so. WhatsApp and email
still work. Everything else — both locales, the language switcher, the consent
gates, the FAQ schema — behaves exactly as in production.

Links are root-absolute in `src/i18n/routes.ts` and pass through `withBase()`,
so the base path is handled in one place. If you add a hardcoded `/...` href or
asset reference elsewhere, it will 404 on the demo; use `path()` or `asset()`.

## Deviations from the brief

- **`i18n.fallback` removed.** §7 specifies `fallback: { en: 'pt' }`. With full
  English coverage that emitted 11 redirect stubs (`/en/contato/`,
  `/en/servicos/…`) which landed in the sitemap carrying hreflang alternates —
  duplicate English URLs competing with the real ones. Re-enable only if a
  locale goes partial again.
- **Palette: the live site's blues, the brief's gold.** The blue family is taken
  from the existing recifetranslators.com.br — `#345895` (its dominant indigo),
  `#282C33` (its slate panels, reused as body ink) and `#ABB2BF` (its blue-grey)
  — then darkened a shade to `#284576` to put more weight behind the accent. The
  accent is the brief's gold `#C68A12`, not the live site's magenta `#C778DD`.

  Gold on indigo reaches only 3.20, which is large-text AA but not small-text,
  and no single accent value clears 4.5:1 on both the page and the indigo. AA
  (§12) is therefore enforced per background: `--channel` at full strength is
  for fills, rules and large text, while `--channel-on-dark`,
  `--channel-on-light`, `--mute-on-dark` and `--mute-on-light` carry small text.
  All 24 pages audited against the rendered DOM: zero contrast failures.

- **Astro 7, not 5.** `src/content.config.ts` is unchanged in shape, but Zod is
  v4 — `z` is imported from `zod` directly rather than from `astro:content`,
  whose re-export is deprecated.

## Structure

```
src/
  content.config.ts     Zod schemas; the consent gate lives here
  data/site.ts          all open items, one file
  data/interpreters.ts  the two interpreters, pairs stated per person
  i18n/routes.ts        canonical route table — nav, switcher, hreflang, breadcrumbs
  i18n/{pt,en}.ts       UI strings; en.ts must satisfy pt.ts's type
  components/pages/     one body per page, takes `lang`
  pages/                24 thin route files
functions/api/quote.ts  Cloudflare Pages Function
```

Three islands only: mobile nav, quote form, video facade. Everything else is
static HTML — 253 bytes of JS on most pages, 1.6 KB on the quote page.
