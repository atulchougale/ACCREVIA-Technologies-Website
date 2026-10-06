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
- Plain, hand-written CSS with design tokens (no UI framework)
- `lucide-react` icons (tree-shaken) and self-hosted Sora / Inter fonts via `@fontsource-variable`
- oxlint (lint) and Prettier (format)

Pages: Home, About, Services, Products (FarmStay), Technologies, Contact, Privacy Policy, Terms & Conditions, plus a 404 page.

## Local development

Requirements: Node.js 20.19+ (22 recommended) and npm.

```bash
npm install        # install dependencies
npm run dev        # start the dev server at http://localhost:5173
npm run lint       # lint
npm run format     # format with Prettier
npm run build      # type-check and create the production build in dist/
npm run preview    # serve the production build locally
```

## Deploying to Netlify

`netlify.toml` already contains everything required:

| Setting           | Value           |
| ----------------- | --------------- |
| Build command     | `npm run build` |
| Publish directory | `dist`          |
| Node version      | 22              |

1. In Netlify choose **Add new site -> Import an existing project** and select this GitHub repository.
2. Leave the detected build settings (they come from `netlify.toml`) and click **Deploy**.
3. The site is live on a `*.netlify.app` subdomain. No custom domain is required.

Notes:

- **SPA fallback**: a `/* -> /index.html` rewrite is configured, so deep links such as `/services` work on refresh. The build also writes a static HTML file per route (with its own title, description and canonical tag) which Netlify serves first, so crawlers see correct metadata without JavaScript.
- **Site URL for SEO**: Netlify provides a built-in `URL` variable during builds. The build uses it (or `VITE_SITE_URL` if you set it) to generate absolute canonical / Open Graph URLs, `sitemap.xml` and the `Sitemap:` line in `robots.txt`. If no URL is known (for example a local build) these absolute URLs are simply omitted and a warning is printed. No URL is ever invented.
- **Custom domain later**: add the domain in Netlify, then set `VITE_SITE_URL=https://your-domain` in the Netlify environment variables and redeploy.

## Environment variables

Copy `.env.example` to `.env.local` for local use. In Netlify set them under **Site configuration -> Environment variables**.

| Variable            | Purpose                                                                                      |
| ------------------- | -------------------------------------------------------------------------------------------- |
| `VITE_FARMSTAY_URL` | Public FarmStay URL. When empty, the site links to the on-site product page only.            |
| `VITE_SITE_URL`     | Public site URL without a trailing slash. Overrides Netlify's `URL` for canonical / sitemap. |

Anything prefixed `VITE_` is embedded in the public JavaScript bundle. **Never store secrets, API keys or tokens in these variables.** Future server-side integrations should use Netlify Functions with private environment variables.

## Project structure

```
src/
  assets/branding/   Logo mark (replaceable) and branding notes
  components/        Reusable UI: Logo, Button, Reveal, AccretionCanvas, forms, ...
  config/            site.ts (company info), navigation.ts, pages.ts (SEO metadata)
  data/              Services, technologies, FarmStay and process content
  hooks/             useSeo, useInView
  layouts/           SiteLayout, Header, Footer
  pages/             One file per route
  sections/          Home page sections
  styles/            tokens.css, base.css, components.css, sections.css
  utils/             Small helpers
  App.tsx            Route table
  main.tsx           Entry point
public/              favicon, app icons, og-image.png, web manifest
netlify.toml         Netlify build, redirects and headers
```

## How to update company information

All company details live in **`src/config/site.ts`**: name, tagline, email, phone numbers, WhatsApp number, address, LinkedIn and GitHub links. Update that file and every page, the footer and the WhatsApp link change together. The structured data (JSON-LD) in `index.html` also contains the contact details, so update it as well.

Content lives in `src/data/` (services, technologies, FarmStay capabilities, process steps, differentiators). Page titles and descriptions live in `src/config/pages.ts`. Legal text lives in `src/pages/PrivacyPolicy.tsx` and `src/pages/Terms.tsx`.

## How to replace the logo

The current logo is a clean placeholder (singularity with an accretion disk). To use the final artwork:

1. Replace `src/assets/branding/logo-mark.svg` with the final logo, keeping the file name. The navbar, footer and mobile menu use `src/components/Logo.tsx` and update automatically.
2. Replace the files in `public/` so browser and social previews match: `favicon.svg`, `apple-touch-icon.png` (180x180), `icon-192.png`, `icon-512.png` and `og-image.png` (1200x630).

## How to update the FarmStay URL

Set `VITE_FARMSTAY_URL` (for example `https://farmstay.example.com`) in `.env.local` or in Netlify and redeploy. An **Open FarmStay** button then appears next to **Explore FarmStay** on the Home page and the Products page, and the "not available yet" note disappears. Until the variable is set, no FarmStay URL is shown.

## Contact form

The form on the Contact page is **frontend-only**. It does not send data to any server: submitting opens the visitor's email app with a prepared message. To connect a real backend later, replace `handleSubmit` in `src/components/ContactForm.tsx` with a Netlify Forms submission or an API call, and update the Privacy Policy accordingly.

## Adding pages

1. Create the page in `src/pages/` (call `useSeo` with its metadata).
2. Add a `<Route>` in `src/App.tsx`.
3. Add its metadata in `src/config/pages.ts` (this also adds it to the sitemap and generates its static HTML).
4. Add a link in `src/config/navigation.ts`.

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
