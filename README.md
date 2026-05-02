# hvaclapro.com — Phase 1

HVAC lead-generation site for Los Angeles. Next.js 16 (App Router) + Tailwind v4 + MDX content.

## Run locally

```bash
cp .env.local.example .env.local
npm install
npm run dev
npm run build
```

## Add a new MDX page

1. Create `content/<category>/<slug>.mdx` (category: `problems`, `brands`, `cost`, `services`, `locations`, `blog`).
2. Required frontmatter — see `lib/content/frontmatterSchema.ts`. Build fails on invalid frontmatter.
3. Routes auto-generated via `generateStaticParams`; sitemap auto-updated on next build.

## Update site info

All site-wide data lives in `lib/seo/constants.ts`. Override with env vars (see `.env.local.example`).

## Deploy to Vercel

```bash
vercel link
vercel env add NEXT_PUBLIC_PHONE production
vercel --prod
```

## Phase 2 checklist

- [ ] Contact form submission (Telegram webhook) — see TODO in `app/contact/page.tsx`
- [ ] Google Analytics GA4
- [ ] Google Search Console verification
- [ ] Real review data
- [ ] AggregateRating schema (only after real Google reviews exist)
- [ ] Replace placeholder MDX bodies with expert copy
- [ ] Replace placeholder reviews in `components/sections/ReviewsBlock.tsx`
