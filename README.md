
# Autopilot Opportunity Engine (AOE) — Starter

A minimal, free-to-host stack that auto-pulls grant/contest opportunities from RSS feeds, builds SEO pages with Eleventy (11ty), and can be deployed on GitHub Pages. Pair it with Gumroad for products and beehiiv for email.

## Quick start

```bash
# 1) Clone and install
npm i

# 2) Add 5–10 real RSS feeds to feeds.yml
# (see the comments inside for how to find them)

# 3) Pull items once and build locally
npm run fetch
npm run build
npm run start   # dev server (http://localhost:8080)

# 4) Push to GitHub and enable Pages
# (Settings → Pages → Source: GitHub Actions)
```

## What it does
- `scripts/fetch_rss.mjs` pulls items from `feeds.yml`, dedupes by URL, and writes Markdown files to `src/opps/…` with front matter.
- Eleventy turns those into pages + an index.
- `.github/workflows/daily.yml` runs the fetch + build every morning (CET) and commits new items.

## Optional integrations
- **Tally** form for user-submitted opportunities (manual review weekly).
- **Gumroad** products (Pro Access + Kits) with Affiliates on.
- **beehiiv** form embed for email capture.

## Notes
- This repo ships with placeholder feeds. Replace with real ones you verify.
- OG/Pinterest image generation is left out for simplicity. You can add Puppeteer later.
