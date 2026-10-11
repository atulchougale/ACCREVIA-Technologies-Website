# ACCREVIA Technologies Website

Corporate website for **ACCREVIA Technologies**, built with React, Vite and TypeScript and deployed as a static site on Netlify.

> **ACCRETE. EVOLVE. CREATE.**
> Building Software, SaaS & Intelligent Digital Solutions

## Company overview

ACCREVIA Technologies is an emerging software company based in Kolhapur, Maharashtra, India. It builds software products, SaaS platforms, APIs, AI-enabled automation and cloud solutions. The name combines _accretion_ and _evolution_: bringing technology, ideas, data and capabilities together and continuously evolving them into useful digital products.

Primary product: **FarmStay**, a multi-tenant SaaS platform for modern farmhouse management.

## Tech stack

- React 19, React Router 7 (client-side routing, lazy-loaded pages)
- Vite 8 and TypeScript (strict)
- Plain, hand-written CSS with design tokens (no UI framework); canvas hero animation (no animation library)
- `lucide-react` icons (tree-shaken) and self-hosted Sora / Inter fonts via `@fontsource-variable`
- oxlint (lint) and Prettier (format)

Pages: Home, About, Services, Products (FarmStay), Technologies, Contact, Privacy Policy, Terms & Conditions, plus a 404 page.

## Local development

Requirements: Node.js 20.19+ (22 recommended) and npm.

```bash
npm install            # install dependencies
npm run dev            # dev server at http://localhost:5173
npm run lint           # lint
npm run format         # format with Prettier
npm run build          # type-check and create the production build in dist/
npm run preview        # Vite preview (SPA fallback: every URL returns 200)
npm run preview:netlify  # serves dist/ with Netlify-style routing so real HTTP 404s can be tested
```

## Deploying to Netlify

`netlify.toml` contains the build settings:

| Setting           | Value           |
| ----------------- | --------------- |
| Build command     | `npm run build` |
| Publish directory | `dist`          |
| Node version      | 22              |

1. In Netlify choose **Add new site -> Import an existing project** and select this GitHub repository.
2. Keep the detected build settings and click **Deploy**. The production domain is `https://accreviatechnologies.online`.

### Routing and real HTTP 404s

This is a single-page app, but it does **not** use a catch-all `/* -> /index.html 200` rewrite (that would turn every nonexistent URL into a "soft 404" with HTTP 200). Instead the build (`vite.config.ts`, plugin `accrevia-seo`) writes:

- one static HTML file per route (`about.html`, `services/cloud-and-devops.html`, ...) with its own title, description, canonical, Open Graph tags and JSON-LD, so direct visits, refreshes and crawlers all work;
- `_redirects`: clean URL -> its HTML file (HTTP 200), trailing-slash and legacy URLs (`/privacy-policy`, `/terms-and-conditions`) -> 301;
- `404.html`: the app shell, which Netlify serves with a **real HTTP 404** for every unknown URL. The React `NotFound` page then renders the branded 404 with the normal header and footer.

Run `npm run build && npm run preview:netlify` to check status codes locally (`curl -I http://localhost:4180/nope` -> 404).

### Canonical URLs, sitemap and robots

Canonical URLs use `https://accreviatechnologies.online` with **no trailing slash** (except the home page). `sitemap.xml` and `robots.txt` are generated from the route inventory in `src/config/pages.ts` on every build. Only indexable routes are in the sitemap: `/thank-you` and the 404 are `noindex` and excluded. Set `VITE_SITE_URL` to override the domain (for example for staging).

## Environment variables

Copy `.env.example` to `.env.local` for local use. In Netlify set them under **Site configuration -> Environment variables**.

| Variable                 | Purpose                                                                                                     |
| ------------------------ | ----------------------------------------------------------------------------------------------------------- |
| `VITE_FARMSTAY_URL`      | Public FarmStay URL. When empty, the site links only to the on-site FarmStay page.                          |
| `VITE_SITE_URL`          | Public site URL without a trailing slash. Defaults to `https://accreviatechnologies.online`.                |
| `VITE_GA_MEASUREMENT_ID` | Google Analytics 4 ID (`G-XXXXXXXXXX`). Empty = analytics, consent banner and Google script fully disabled. |

Anything prefixed `VITE_` is embedded in the public JavaScript bundle. **Never store secrets, API keys or tokens in these variables.**

## Project structure

```
src/
  assets/branding/   Official logo exports (WebP) and asset map
  components/        Reusable UI: Container, Section, Breadcrumbs, FaqList, ProcessList, forms, Logo, AccretionCanvas, ...
  config/            company.ts (company info), site.ts (env-aware), navigation.ts,
                     pages.ts (route inventory + SEO metadata), structuredData.ts (JSON-LD), forms.ts (form fields/options)
  data/              serviceCatalog.ts (service pages), services.ts (icons), technologies, FarmStay, FAQ, process content
  hooks/             useSeo, useInView
  layouts/           SiteLayout, Header, Footer
  pages/             One file per route
  sections/          Home page sections
  styles/            tokens.css (layout + colour tokens), base.css, components.css, sections.css
  utils/             analytics (GA4 + consent), submitForm (Netlify Forms), validation
  App.tsx            Route table
  main.tsx           Entry point
scripts/             preview-netlify.mjs (local Netlify-style routing preview)
public/              favicon, app icons, og-image.jpg, web manifest
netlify.toml         Netlify build and headers (routing comes from the generated _redirects)
```

### Layout system

Pages are stacks of **full-width sections** (`Section` component / `.section` class): each section's background spans the viewport and its content sits in the shared `Container` (`.container`). Width, side padding and vertical spacing come from tokens in `src/styles/tokens.css` (`--container` 1240px, `--gutter` 20-48px, `--section-space` 48-112px) so they are changed in one place. Tones: `base`, `raised`, `grid` (technical grid + warm glow) and `ambient`.

## How to update company information

All company details live in **`src/config/company.ts`**: name, tagline, email, phone numbers, WhatsApp number, address, LinkedIn and GitHub links. Update that file and every page, the footer and the WhatsApp link change together. The Organization structured data (JSON-LD) in `index.html` repeats the contact details, so update it as well.

Content lives in `src/data/` (services, technologies, FarmStay capabilities, process steps, differentiators). Page titles and descriptions live in `src/config/pages.ts`. Legal text lives in `src/pages/PrivacyPolicy.tsx` and `src/pages/Terms.tsx`.

## Brand assets and the logo

The official ACCREVIA logo artwork is the master brand source and must never be redrawn, recoloured or cropped in code. Web-ready exports live in `src/assets/branding/` (see the README there) and are consumed through `src/assets/branding/index.ts`:

- Header and footer use the horizontal lockup (`logo-horizontal.webp`) via `src/components/Logo.tsx`.
- The hero uses the full logo on dark (`logo-full-dark-720.webp` / `-1440.webp`, responsive `srcset`).
- `public/` holds the favicon, Apple touch icon, 192/512 app icons and the 1200x630 Open Graph image (`og-image.jpg`), all made from the official artwork.

To update a logo, export the new artwork to the same file name (dark background) and rebuild. The large master PNGs are intentionally not committed.

The brand palette (black, charcoal, burnt orange `#c94a00`, orange `#ff6a00`, gold `#ffb000`, warm highlight `#ffd27a`) is defined in `src/styles/tokens.css`.

The hero environment (`src/components/AccretionCanvas.tsx`) draws a slow, warm particle disk around the logo. It scales particle count by viewport, pauses off-screen and in hidden tabs, and shows a single static frame under `prefers-reduced-motion`.

## How to update the FarmStay URL

Set `VITE_FARMSTAY_URL` (for example `https://farmstay.example.com`) in `.env.local` or in Netlify and redeploy. An **Open FarmStay** button then appears next to **Explore FarmStay** on the Home page and the Products page, and the "not available yet" note disappears. Until the variable is set, no FarmStay URL is shown.

## Forms, spam protection and thank-you page

The **Start Your Project** (`/start-project`) and **Contact** forms submit to **Netlify Forms**:

- The build adds hidden static copies of both forms to every HTML page so Netlify can detect them (`src/config/forms.ts` is the single list of field names).
- The React form POSTs url-encoded data to `/` with the matching `form-name`; on success the visitor is redirected to `/thank-you` (noindex, not in the sitemap).
- Spam protection: a hidden **honeypot** field (`bot-field`) plus Netlify's built-in spam filtering. Rate limiting is whatever Netlify provides; nothing else is claimed. Client-side validation (required fields, email format, consent) is for usability only and is **not** a security control.
- If a submission fails (for example Forms is not enabled yet) the visitor is offered a pre-filled email instead and keeps what they typed.
- No secrets or API keys are used in the browser.

**Manual steps after the first deploy:** in Netlify open **Forms**, confirm `start-project` and `contact` appear, and add an email notification to the business address (**Forms -> Form notifications**). Locally, submissions cannot be received (the dev server has no Netlify Forms backend).

## Analytics and consent (Google Analytics 4)

Disabled by default. Set `VITE_GA_MEASUREMENT_ID` to enable it. When enabled:

- a consent banner appears and **nothing is loaded or sent to Google until the visitor accepts**; the choice is stored in `localStorage` (no cookies are set by the site) and can be changed from the footer ("Analytics preferences");
- page views are sent on route changes only after consent; advertising signals stay denied;
- a `generate_lead` event is sent on `/thank-you` immediately after a real form submission (not on direct visits or refreshes).

The Privacy Policy text adapts to whether analytics is configured. It is general information and should be reviewed against the legal requirements that apply to the business.

## Adding pages

1. Create the page in `src/pages/` and call `useSeo(getPageMeta("/your-path"))`.
2. Add a `<Route>` in `src/App.tsx`.
3. Add its metadata (title, description, breadcrumb, `indexable`) in `src/config/pages.ts`. This also adds it to the sitemap, generates its static HTML and its Netlify redirect.
4. Add a link in `src/config/navigation.ts` (and link to it from related pages).

Service pages (`/services/<slug>`) are generated from `src/data/serviceCatalog.ts`: add an entry there and the page, route metadata, sitemap entry and footer link follow automatically.

## Future extension points

- **Careers, Blog, Case Studies, Portfolio**: new pages as described above (a CMS can feed `src/data`).
- **FarmStay Login, Customer Portal, Admin Portal**: add routes (optionally a separate layout in `src/layouts`) and an authentication provider.
- **Contact backend**: Netlify Forms, Netlify Functions or the ACCREVIA API.
- **Analytics**: add a privacy-friendly tool and update the Privacy Policy first.
- **Prerendering**: static per-route HTML is already generated; move to a full prerendering framework if the content grows.

## Accessibility and performance

Semantic landmarks and a single `h1` per page, skip link, visible focus states, keyboard-operable mobile menu (Escape closes it), 48px touch targets, `prefers-reduced-motion` support (animations and the hero canvas animation are disabled), self-hosted fonts, lazy-loaded route chunks, and a hero canvas that pauses when off-screen or in a background tab.

## Security and privacy

No secrets, tokens, bank, tax or identity numbers are stored in this repository. `.env` files are git-ignored (only `.env.example` is committed). External links use `target="_blank"` with `rel="noopener noreferrer"`.

## License

Copyright ACCREVIA Technologies. All rights reserved.
