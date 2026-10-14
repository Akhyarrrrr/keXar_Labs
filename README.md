# keXar Labs

English-first website for a digital studio offering websites, web applications, and AI automation. Seven architectural chapters introduce the studio, services, process, demonstrations, delivery, and project brief. The headquarters is a conceptual digital environment, not a physical-office claim.

## Local development

Use Node.js 24 and npm.

```sh
npm ci
npm run dev
```

Open http://127.0.0.1:4321/en/.

```sh
npm run typecheck
npm run build
npm run preview
```

Worker preview runs at http://127.0.0.1:8787/. All website media is included; Blender and HyperFrames are not required to build or run the site.

## Project structure

- `src/`: Astro pages, React forms, content, styles, and the scroll-driven canvas player.
- `public/`: production frames, posters, opening images, demo images, branding, fonts, and license notices.
- `worker/`: redirects and the contact API.
- `scripts/check-release.mjs`: deployment configuration validation.
- `wrangler.jsonc`: Cloudflare Worker and static-asset configuration.

Marketing uses one English identity. / redirects to /en/; Indonesian marketing routes redirect to their English equivalents. The three fictional demonstration sites retain their English and Indonesian routes and separate styling. Demo pages are marked noindex.

The frame manifest is `src/lib/headquarters.ts`. Native scroll maps directly to frames with a bounded image cache. Posters cover loading failures. Navigation, text, demonstrations, and contact information remain available without JavaScript and with reduced motion.
