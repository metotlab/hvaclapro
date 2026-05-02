You are a senior Next.js architect specializing in US Local Service Business SEO websites.

Your task: build the complete technical foundation for hvaclapro.com — an HVAC lead-generation website targeting Los Angeles, California.

This is PHASE 1 only: technical scaffold + SEO foundation + 10 placeholder content pages.

Do NOT build in Phase 1:
- Contact form submission logic (placeholder UI only)
- Telegram webhook integration
- Analytics tracking
- Real review data or APIs
- Final SEO copywriting

═══════════════════════════════════════════════
STRATEGIC CONTEXT
═══════════════════════════════════════════════

Domain: hvaclapro.com
Market: Los Angeles, CA
Target: Homeowners with active HVAC problems
Primary goal: Generate phone calls
SEO target: Google (not Yandex)
Language: English only

Strategy: Long-tail problem-solution pages.
Not competing for broad keywords.
Targeting specific symptoms, branded problems,
and cost queries where competition is weak.

═══════════════════════════════════════════════
TECH STACK
═══════════════════════════════════════════════

- Next.js 14 (App Router)
- TypeScript (strict mode)
- Tailwind CSS
- MDX via next-mdx-remote/rsc (build-time only)
- lucide-react for icons
- gray-matter for frontmatter parsing
- zod for frontmatter validation
- Deployment target: Vercel

═══════════════════════════════════════════════
STEP 1 — INITIALIZE PROJECT
═══════════════════════════════════════════════

Run:
npx create-next-app@latest . --typescript
--tailwind --eslint --app --no-src-dir

Install dependencies:
npm install next-mdx-remote gray-matter zod
lucide-react reading-time

After install confirm:
- next.config.js exists
- tailwind.config.ts exists
- tsconfig.json has strict: true

═══════════════════════════════════════════════
STEP 2 — CRITICAL MDX RULES
═══════════════════════════════════════════════

Use next-mdx-remote/rsc for App Router
compatibility.

Rules:
- All MDX files are read at build time
  from the filesystem (/content directory)
- Never use client-side MDX rendering
- Never use runtime filesystem reads on Vercel
- All content pages must use generateStaticParams
- Implement notFound() for missing slugs
- Sitemap must be generated from same content
  registry used by generateStaticParams

═══════════════════════════════════════════════
STEP 3 — FRONTMATTER SCHEMA (ZOD)
═══════════════════════════════════════════════

Create lib/content/frontmatterSchema.ts

Define a Zod schema with these required fields:

const FrontmatterSchema = z.object({
  title: z.string().min(10).max(70),
  h1: z.string().min(10).max(100),
  description: z.string().min(120).max(160),
  pageType: z.enum([
    "problem", "brand", "cost",
    "service", "location", "blog"
  ]),
  primaryKeyword: z.string(),
  supportingKeywords: z.array(z.string()),
  category: z.enum([
    "AC", "Furnace", "Heat Pump",
    "Thermostat", "Ductwork", "General"
  ]),
  season: z.enum([
    "summer", "winter", "year-round", "spike"
  ]),
  lastUpdated: z.string(),
  brand: z.string().optional(),
  priceRange: z.object({
    min: z.number(),
    max: z.number(),
    unit: z.string()
  }).optional(),
  faq: z.array(z.object({
    question: z.string(),
    answer: z.string()
  })).optional(),
  relatedPages: z.array(z.string()).optional(),
  causes: z.array(z.string()).optional(),
  diagnosisSteps: z.array(z.string()).optional(),
  ctaVariant: z.enum([
    "call", "estimate", "emergency"
  ]).default("call"),
  noindex: z.boolean().default(false)
})

If frontmatter fails validation:
- Throw a build error with clear message
- Include the file path and which fields failed

═══════════════════════════════════════════════
STEP 4 — CONTENT REGISTRY
═══════════════════════════════════════════════

Create lib/content/registry.ts

This file exports:
- getAllSlugs(category: string): string[]
- getPageBySlug(category: string, slug: string)
- getAllPages(category: string)

getAllSlugs reads /content/[category]/ directory
and returns all .mdx filenames without extension.

getPageBySlug reads and parses one MDX file,
validates frontmatter with Zod schema,
and returns { frontmatter, content }.

This registry is the SINGLE SOURCE OF TRUTH
for both generateStaticParams and sitemap.ts.

═══════════════════════════════════════════════
STEP 5 — SITE STRUCTURE
═══════════════════════════════════════════════

/app
  /(content)
    /problems/[slug]/page.tsx
    /brands/[slug]/page.tsx
    /cost/[slug]/page.tsx
    /services/[slug]/page.tsx
    /locations/[slug]/page.tsx
    /blog/[slug]/page.tsx
  /about/page.tsx
  /contact/page.tsx
  /privacy/page.tsx
  /terms/page.tsx
  layout.tsx
  page.tsx
  sitemap.ts
  robots.ts
  not-found.tsx
  error.tsx

/content
  /problems/
  /brands/
  /cost/
  /services/
  /locations/
  /blog/

/components
  /layout
    Header.tsx
    Footer.tsx
    MobileNav.tsx
    StickyCallBar.tsx
  /sections
    Hero.tsx
    TrustBar.tsx
    ServicesGrid.tsx
    ProblemsGrid.tsx
    ServiceAreas.tsx
    FAQ.tsx
    CTA.tsx
    ReviewsBlock.tsx
  /page-types
    ProblemPage.tsx
    BrandPage.tsx
    CostPage.tsx
    ServicePage.tsx
  /ui
    Button.tsx
    PhoneButton.tsx
    Card.tsx
    Accordion.tsx
    Breadcrumbs.tsx

/lib
  /seo
    generateMetadata.ts
    generateSchema.ts
    constants.ts
  /content
    registry.ts
    frontmatterSchema.ts

═══════════════════════════════════════════════
STEP 6 — CONSTANTS (centralized)
═══════════════════════════════════════════════

lib/seo/constants.ts — ALL site data here.
Nothing hardcoded in components.

export const SITE = {
  name: "HVAC LA Pro",
  url: "https://hvaclapro.com",
  phone: process.env.NEXT_PUBLIC_PHONE
    ?? "(323) 000-0000",
  phoneRaw: process.env.NEXT_PUBLIC_PHONE_RAW
    ?? "3230000000",
  email: process.env.NEXT_PUBLIC_EMAIL
    ?? "info@hvaclapro.com",
  address: {
    city: "Los Angeles",
    state: "CA",
    stateFullName: "California",
    serviceArea: "Los Angeles County"
  },
  license: process.env.NEXT_PUBLIC_LICENSE
    ?? "C-20 #XXXXXX",
  // PLACEHOLDER VALUES — replace before launch
  // Do not use in structured data schema
  placeholders: {
    yearsExperience: 15,
    jobsCompleted: 2000,
    responseTimeMinutes: 30,
    // NOTE: reviewCount and rating are
    // display placeholders only.
    // Do not add to AggregateRating schema
    // until real Google reviews exist.
    reviewCount: 150,
    rating: 4.9
  }
}

═══════════════════════════════════════════════
STEP 7 — SCHEMA MARKUP RULES
═══════════════════════════════════════════════

lib/seo/generateSchema.ts

RULES:
1. Homepage: LocalBusiness (HVACBusiness type)
   - Include address, phone, openingHours
   - Do NOT include AggregateRating
     (no real reviews exist yet)
   - Do NOT include fake review count

2. All pages: BreadcrumbList

3. Pages with FAQ section: FAQPage
   (only when frontmatter.faq exists and
   has at least 2 items)

4. Service pages: Service schema

5. Blog/Cost/Problem/Brand pages: Article schema
   with author as Organization

6. NO fake review schema anywhere
   NO AggregateRating until real data

7. All schemas rendered as JSON-LD in
   <script type="application/ld+json">

═══════════════════════════════════════════════
STEP 8 — DESIGN SYSTEM
═══════════════════════════════════════════════

Colors (tailwind.config.ts extend):
- primary: #1E3A5F (trust blue)
- accent: #F97316 (urgent orange)
- accent-hover: #EA6C00
- muted: #64748B
- border: #E2E8F0
- bg: #FFFFFF

Typography:
- Font: Inter via next/font/google
- H1: 36px desktop / 28px mobile
- H2: 28px desktop / 22px mobile
- Body: 16px / line-height 1.6

Phone CTA color: always accent (#F97316)
Primary buttons: rounded-lg, semibold

PERFORMANCE RULES:
- Target LCP < 1.5s
- Avoid heavy client components
- Use Server Components by default
- Client components only when required
  (mobile nav toggle, accordion)
- Use next/image for all images
- Use next/font for Inter

CONTENT RULES:
- Never use "best", "#1", "top-rated",
  "highest-rated" without verifiable evidence
- Use "trusted", "experienced", "licensed" instead
- Avoid unsupported superlatives

═══════════════════════════════════════════════
STEP 9 — ACCESSIBILITY
═══════════════════════════════════════════════

Required for all components:
- Semantic HTML (nav, main, section, article)
- All buttons have descriptive aria-label
- Mobile nav: aria-expanded, aria-controls
- Accordion: aria-expanded on trigger buttons
- Skip to main content link in layout
- Focus visible outlines (not removed)
- StickyCallBar: fixed position but must NOT
  cover page content — add pb-16 to main on mobile
- All interactive elements keyboard accessible

═══════════════════════════════════════════════
STEP 10 — PHONE-FIRST DESIGN
═══════════════════════════════════════════════

In US HVAC, customers call. Not fill forms.

HEADER (Desktop):
- Logo + "HVAC LA Pro" (left)
- Nav: Services | Areas | About | Contact
- Phone: (323) 000-0000 (center-right)
- Button: "Free Estimate" (orange, right)

HEADER (Mobile):
- Logo (left)
- Phone icon click-to-call (right)
- Hamburger menu (right)

STICKY CALL BAR (Mobile only, fixed bottom):
- Full-width orange button
- Text: "📞 Call Now — (323) 000-0000"
- tel: link for click-to-call
- Add pb-16 to <main> to prevent content overlap
- z-index: 50

PHONE CTAs in content:
- After major decision points in content
- NOT after every short paragraph
- At minimum: after hero, after diagnosis section,
  after pricing section, at page bottom

═══════════════════════════════════════════════
STEP 11 — HOMEPAGE
═══════════════════════════════════════════════

H1: HVAC Repair & Service in Los Angeles, CA
(no superlatives, no "best")

Subheadline:
AC not cooling? Furnace won't turn on?
Licensed C-20 technicians serving all of
Los Angeles. Same-day service available.

Hero sections (2-column desktop):
Left: H1 + subheadline + orange phone CTA button
Right: Trust badges
  - ⭐ 4.9 rating (placeholder — no schema)
  - ✅ C-20 Licensed & Insured
  - ⚡ Same-Day Service Available
  - 📍 Serving Los Angeles County

Below hero, in order:
1. TrustBar — 4 stat boxes:
   15+ years | 2,000+ jobs | 30-min response |
   100% satisfaction guarantee
   (all placeholder values from SITE.placeholders)

2. ServicesGrid — 8 cards:
   AC Repair | AC Installation | Furnace Repair |
   Heat Pump | Emergency Service | AC Tune-Up |
   Duct Repair | Smart Thermostat
   Each links to /services/[slug]

3. ProblemsGrid — "Common Problems We Fix":
   6 cards linking to /problems/ pages

4. ServiceAreas — "Neighborhoods We Serve":
   List of 15 LA neighborhoods (inline list)

5. ReviewsBlock — 3 hardcoded placeholder
   review cards (clearly commented as placeholder
   in code — not real schema reviews)

6. FAQ — 4 questions with FAQPage schema:
   - How quickly can you respond?
   - Do you offer same-day service?
   - Are you licensed and insured?
   - What areas do you serve?

7. CTA block — "Get a Free Estimate Today"
   with phone CTA

═══════════════════════════════════════════════
STEP 12 — PAGE TEMPLATES
═══════════════════════════════════════════════

Build 4 reusable Server Component templates.

TEMPLATE 1: ProblemPage.tsx
Accepts: frontmatter + compiled MDX content
Renders:
- Breadcrumbs (BreadcrumbList schema)
- H1 from frontmatter.h1
- Intro paragraph (placeholder)
- If frontmatter.causes: "What Causes This"
  H2 + ul list
- If frontmatter.diagnosisSteps: "How to Diagnose"
  H2 + ol list
- Phone CTA (contextual, after diagnosis)
- "When to Call a Pro" callout box
- "What We Do" section
- If frontmatter.priceRange: Cost estimate box
- MDX body content (compiled)
- If frontmatter.faq: FAQ accordion + FAQPage schema
- Related pages (3 cards from relatedPages)
- Bottom phone CTA

TEMPLATE 2: BrandPage.tsx
Accepts: frontmatter + compiled MDX content
Renders:
- Breadcrumbs
- H1 (Brand + problem + Los Angeles)
- Brand model overview (2 sentences placeholder)
- "Common [Brand] Problems in Los Angeles" H2
- If frontmatter.causes: symptom list
- "Why [Brand] Units Fail in LA Heat" H2
  (LA-specific angle — always include)
- If frontmatter.priceRange: Cost section
- MDX body
- If frontmatter.faq: FAQ + schema
- Related brands (3 links)
- Phone CTA

TEMPLATE 3: CostPage.tsx
Accepts: frontmatter + compiled MDX content
Renders:
- Breadcrumbs
- H1 (Cost + repair + Los Angeles)
- Price range summary box:
  If priceRange: show min-max
  Else: "Call for a free estimate"
- "What Affects the Cost" H2 + list
- "What's Included" H2
- "Red Flags: Quote Too High" H2
- "Red Flags: Quote Too Low" H2
- MDX body
- If faq: FAQ + schema
- Related cost pages (3 links)
- CTA: "Get an honest quote — call us"

TEMPLATE 4: ServicePage.tsx
Accepts: frontmatter + compiled MDX content
Renders:
- Breadcrumbs
- H1
- Service overview paragraph
- "Why Choose Us" section
- Process steps (numbered)
- Service areas
- MDX body
- If faq: FAQ + schema
- Phone CTA

═══════════════════════════════════════════════
STEP 13 — BATCH 1 MDX FILES
═══════════════════════════════════════════════

Create these 10 MDX files with FULL frontmatter
and structured placeholder body text.

The placeholder body must exercise every template
section so Sonnet can see the complete structure.

Use SITE constants for all phone/business data.

--- BRANDS ---

content/brands/goodman-ac-not-cooling-los-angeles.mdx
---
title: "Goodman AC Not Cooling in Los Angeles — Causes & Fixes"
h1: "My Goodman AC Is Not Cooling in Los Angeles"
description: "Goodman AC not cooling in Los Angeles? Learn the 6 most common causes and when to call a C-20 licensed technician. Same-day service available."
pageType: "brand"
primaryKeyword: "goodman ac not cooling los angeles"
supportingKeywords: ["goodman ac fan not working los angeles", "goodman air conditioner not cooling"]
category: "AC"
brand: "Goodman"
season: "summer"
lastUpdated: "2026-04-28"
causes:
  - "Dirty or clogged air filter restricting airflow"
  - "Low refrigerant due to a leak"
  - "Faulty capacitor preventing compressor start"
  - "Dirty condenser coil from LA smog and dust"
  - "Thermostat misconfigured or faulty"
  - "Compressor failure (most expensive repair)"
faq:
  - question: "Why is my Goodman AC running but not cooling?"
    answer: "The most common causes are a dirty air filter, low refrigerant, or a failed capacitor. In Los Angeles heat, a dirty condenser coil is also very common."
  - question: "How much does Goodman AC repair cost in Los Angeles?"
    answer: "Typical repairs range from $150 for a capacitor replacement to $1,500+ for refrigerant leak repair. Call us for a same-day diagnosis."
  - question: "Is Goodman a reliable AC brand?"
    answer: "Goodman units are reliable when installed correctly. Most problems we see in Los Angeles come from improper installation, not the unit itself."
  - question: "Can I run my Goodman AC if it is not cooling?"
    answer: "We recommend turning it off if it is not cooling. Running a system with a refrigerant leak or failed compressor can cause additional damage."
relatedPages:
  - "/brands/carrier-ac-not-cooling-los-angeles"
  - "/cost/ac-capacitor-replacement-cost-los-angeles"
  - "/problems/ac-not-cooling-during-day-los-angeles"
ctaVariant: "call"
noindex: false
priceRange:
  min: 150
  max: 1500
  unit: "repair"
---

[Placeholder body — content will be replaced with expert copy]

This page targets homeowners with Goodman AC units that are not cooling in Los Angeles.

content/brands/carrier-ac-not-cooling-los-angeles.mdx
---
title: "Carrier AC Not Cooling in Los Angeles — What to Check"
h1: "My Carrier AC Is Not Cooling in Los Angeles"
description: "Carrier AC not cooling in Los Angeles? These are the most common causes and fixes from C-20 licensed local technicians. Call for same-day service."
pageType: "brand"
primaryKeyword: "carrier ac not cooling los angeles"
supportingKeywords: ["carrier ac blowing warm air los angeles", "carrier ac repair los angeles"]
category: "AC"
brand: "Carrier"
season: "summer"
lastUpdated: "2026-04-28"
causes:
  - "Dirty condenser coil — common in LA air quality"
  - "Low refrigerant charge"
  - "Failed run capacitor"
  - "Thermostat or control board issue"
  - "Refrigerant leak at coil or line set"
faq:
  - question: "Why is my Carrier AC running but not cooling the house?"
    answer: "The most common causes in Los Angeles are a dirty condenser coil from smog and dust, low refrigerant, or a failed capacitor."
  - question: "Does Carrier AC repair void my warranty?"
    answer: "Repairs by a licensed C-20 technician do not void your Carrier warranty. DIY refrigerant work does void coverage."
  - question: "How long do Carrier AC units last in Los Angeles?"
    answer: "Carrier units typically last 12-18 years with annual maintenance. LA heat accelerates wear on compressors and capacitors."
relatedPages:
  - "/brands/goodman-ac-not-cooling-los-angeles"
  - "/brands/trane-ac-not-turning-on-los-angeles"
  - "/cost/ac-capacitor-replacement-cost-los-angeles"
ctaVariant: "call"
noindex: false
priceRange:
  min: 150
  max: 1800
  unit: "repair"
---

[Placeholder body — content will be replaced with expert copy]

--- COST PAGES ---

content/cost/ac-capacitor-replacement-cost-los-angeles.mdx
---
title: "AC Capacitor Replacement Cost in Los Angeles (2026 Guide)"
h1: "AC Capacitor Replacement Cost in Los Angeles"
description: "How much does AC capacitor replacement cost in Los Angeles? Get real local pricing by capacitor type, unit size, and brand. C-20 licensed technicians."
pageType: "cost"
primaryKeyword: "ac capacitor replacement cost los angeles"
supportingKeywords: ["how to tell if ac capacitor is bad", "ac capacitor replacement los angeles"]
category: "AC"
season: "year-round"
lastUpdated: "2026-04-28"
priceRange:
  min: 175
  max: 450
  unit: "including labor"
faq:
  - question: "How much does AC capacitor replacement cost in Los Angeles?"
    answer: "In Los Angeles, AC capacitor replacement typically costs $175-$450 including labor. The capacitor part costs $20-$80. Labor accounts for the rest."
  - question: "How do I know if my AC capacitor is bad?"
    answer: "Signs include the AC humming but not starting, the outdoor unit not spinning, or the system shutting off shortly after starting."
  - question: "Can I replace the AC capacitor myself?"
    answer: "Capacitors store a lethal electrical charge even when unplugged. We strongly recommend professional replacement."
  - question: "How long do AC capacitors last in Los Angeles?"
    answer: "Typically 5-10 years, but LA summer heat accelerates wear significantly. Units running in the San Fernando Valley often need replacement more frequently."
relatedPages:
  - "/cost/ac-fan-motor-replacement-cost-los-angeles"
  - "/cost/ac-repair-cost-los-angeles"
  - "/brands/goodman-ac-not-cooling-los-angeles"
ctaVariant: "estimate"
noindex: false
---

[Placeholder body — content will be replaced with expert copy]

content/cost/ac-fan-motor-replacement-cost-los-angeles.mdx
---
title: "AC Fan Motor Replacement Cost in Los Angeles (2026)"
h1: "AC Fan Motor Replacement Cost in Los Angeles"
description: "What does AC fan motor replacement cost in Los Angeles? Real pricing for indoor blower and outdoor condenser fan motors from licensed C-20 technicians."
pageType: "cost"
primaryKeyword: "ac fan motor replacement cost los angeles"
supportingKeywords: ["ac outdoor fan not spinning los angeles", "ac blower motor replacement cost"]
category: "AC"
season: "year-round"
lastUpdated: "2026-04-28"
priceRange:
  min: 350
  max: 900
  unit: "including labor"
faq:
  - question: "How much does AC fan motor replacement cost in Los Angeles?"
    answer: "In Los Angeles, AC fan motor replacement typically costs $350-$900 depending on whether it is the indoor blower motor or outdoor condenser fan motor."
  - question: "How do I know if my AC fan motor is bad?"
    answer: "The outdoor fan is not spinning, the indoor air handler is not blowing air, or you hear grinding or humming from the unit."
  - question: "Is it worth replacing an AC fan motor on an older unit?"
    answer: "If the unit is under 10 years old, replacement usually makes sense. For older units, we recommend a full system assessment first."
relatedPages:
  - "/cost/ac-capacitor-replacement-cost-los-angeles"
  - "/cost/ac-compressor-replacement-cost-los-angeles"
  - "/problems/ac-not-cooling-during-day-los-angeles"
ctaVariant: "estimate"
noindex: false
---

[Placeholder body — content will be replaced with expert copy]

content/cost/refrigerant-leak-repair-cost-los-angeles.mdx
---
title: "AC Refrigerant Leak Repair Cost in Los Angeles (R-22 vs R-410A)"
h1: "Refrigerant Leak Repair Cost in Los Angeles"
description: "How much does refrigerant leak repair cost in Los Angeles? R-22 vs R-410A pricing breakdown. Honest advice on whether to repair or replace. C-20 licensed."
pageType: "cost"
primaryKeyword: "refrigerant leak repair cost los angeles"
supportingKeywords: ["low refrigerant ac symptoms los angeles", "r22 refrigerant cost los angeles", "ac refrigerant leak los angeles"]
category: "AC"
season: "summer"
lastUpdated: "2026-04-28"
priceRange:
  min: 400
  max: 2500
  unit: "including labor and refrigerant"
faq:
  - question: "How much does refrigerant leak repair cost in Los Angeles?"
    answer: "Refrigerant leak repair in Los Angeles costs $400-$2,500 depending on refrigerant type, leak location, and how much refrigerant needs to be added."
  - question: "Is R-22 refrigerant still available in Los Angeles?"
    answer: "R-22 was phased out under EPA regulations. It is still available but costs $100-$175 per pound. A typical top-off costs $500-$1,500 just for the refrigerant."
  - question: "Should I repair my R-22 system or replace it?"
    answer: "If your system uses R-22 and needs more than a minor top-off, replacement usually makes more financial sense. We provide honest assessments."
  - question: "How long does a refrigerant repair last?"
    answer: "If the leak is properly found and repaired, not just topped off, the system should hold refrigerant indefinitely."
relatedPages:
  - "/cost/ac-capacitor-replacement-cost-los-angeles"
  - "/cost/ac-replacement-cost-los-angeles"
  - "/problems/ac-not-cooling-during-day-los-angeles"
ctaVariant: "estimate"
noindex: false
---

[Placeholder body — content will be replaced with expert copy]

--- PROBLEM PAGES ---

content/problems/ac-not-cooling-during-day-los-angeles.mdx
---
title: "AC Works at Night But Not During the Day in Los Angeles"
h1: "Why My AC Works at Night But Not During the Day in Los Angeles"
description: "AC cooling fine at night but not during the day in Los Angeles? This is a specific LA problem. Learn the causes and when to call a C-20 technician."
pageType: "problem"
primaryKeyword: "ac not cooling during day los angeles"
supportingKeywords: ["ac works at night but not during day los angeles", "ac wont cool below 80 los angeles"]
category: "AC"
season: "summer"
lastUpdated: "2026-04-28"
causes:
  - "Undersized AC unit for LA summer peak loads"
  - "Low refrigerant reducing capacity in peak heat"
  - "Dirty condenser coil overheating in afternoon sun"
  - "Condenser unit placed in direct afternoon sunlight"
  - "High return air temperature from poor insulation"
diagnosisSteps:
  - "Check if the outdoor condenser fan is spinning"
  - "Check the air filter — replace if gray or clogged"
  - "Check that all vents are open and unblocked"
  - "Note the outdoor temperature when cooling fails"
  - "Call a technician to check refrigerant charge"
faq:
  - question: "Why does my AC cool at night but not during the day in Los Angeles?"
    answer: "LA daytime temperatures regularly exceed 95-105°F in inland areas. If your AC is undersized, low on refrigerant, or has a dirty condenser coil, it cannot overcome the heat load during peak afternoon hours."
  - question: "Is this a normal AC problem in Los Angeles?"
    answer: "This is one of the most common AC complaints we receive in Los Angeles summers, particularly in the San Fernando Valley and San Gabriel Valley where afternoon temps are extreme."
  - question: "What temperature should my AC keep the house at in an LA heat wave?"
    answer: "A properly sized and working AC in Los Angeles should maintain indoor temps 20-25 degrees below outdoor temperature. If outdoor temps hit 105, expect 80-85 inside."
relatedPages:
  - "/problems/ac-wont-cool-below-80-los-angeles"
  - "/problems/one-room-not-getting-cold-air-los-angeles"
  - "/cost/refrigerant-leak-repair-cost-los-angeles"
ctaVariant: "call"
noindex: false
---

[Placeholder body — content will be replaced with expert copy]

content/problems/ac-wont-cool-below-80-los-angeles.mdx
---
title: "AC Won't Cool Below 80 Degrees in Los Angeles — What's Wrong"
h1: "AC Won't Cool Below 80 Degrees in Los Angeles"
description: "AC running but won't cool below 80 in Los Angeles? Three specific causes affect LA homes differently. Diagnosis guide from C-20 licensed technicians."
pageType: "problem"
primaryKeyword: "ac not cooling below 80 degrees los angeles"
supportingKeywords: ["ac wont cool below 80 los angeles", "ac not keeping up with heat los angeles"]
category: "AC"
season: "spike"
lastUpdated: "2026-04-28"
causes:
  - "Undersized unit for Los Angeles peak loads"
  - "Low refrigerant reducing cooling capacity"
  - "Dirty condenser coil from LA smog and dust"
diagnosisSteps:
  - "Check outdoor temperature — above 95 is extreme load"
  - "Check the air filter condition"
  - "Check that the condenser unit has clearance and airflow"
  - "Call a technician to check refrigerant and coil condition"
faq:
  - question: "Is 80 degrees normal when it is 100+ outside in Los Angeles?"
    answer: "A well-functioning AC should maintain 20-25 degrees below outdoor temperature. If it is 100 outside and you cannot get below 80, that is a system issue worth diagnosing."
  - question: "How do I know if my AC is undersized for Los Angeles?"
    answer: "If the system runs continuously without ever reaching your set temperature during afternoon heat, it may be undersized. A load calculation can confirm."
relatedPages:
  - "/problems/ac-not-cooling-during-day-los-angeles"
  - "/problems/ac-not-cooling-los-angeles"
  - "/cost/refrigerant-leak-repair-cost-los-angeles"
ctaVariant: "call"
noindex: false
---

[Placeholder body — content will be replaced with expert copy]

content/problems/one-room-not-getting-cold-air-los-angeles.mdx
---
title: "One Room Not Getting Cold Air in Los Angeles — Duct or AC Problem?"
h1: "One Room Not Getting Cold Air in Los Angeles"
description: "One room always hot in Los Angeles? This is usually a duct problem, not an AC problem. Diagnosis guide and cost breakdown from C-20 licensed technicians."
pageType: "problem"
primaryKeyword: "one room not getting cold air los angeles"
supportingKeywords: ["one room always hot los angeles", "uneven cooling los angeles home"]
category: "Ductwork"
season: "summer"
lastUpdated: "2026-04-28"
causes:
  - "Undersized or crushed duct run to that room"
  - "Leaking duct joint reducing airflow"
  - "Closed or blocked supply vent"
  - "Inadequate return air for that zone"
  - "Original duct design not balanced properly"
diagnosisSteps:
  - "Check that the room vent is fully open"
  - "Hold your hand at the vent — is there any airflow?"
  - "Check visible ducts in the attic for obvious damage"
  - "Call a technician for duct pressure testing"
faq:
  - question: "Why is one room always hot in my Los Angeles home?"
    answer: "In LA, this is almost always a duct problem in older homes. Craftsman bungalows and 1950s-1970s construction often have undersized or damaged duct runs to secondary rooms."
  - question: "How much does duct repair cost in Los Angeles?"
    answer: "Simple duct repairs cost $200-$600. Duct balancing or adding a new duct run costs $500-$2,000 depending on the home layout."
  - question: "Can I fix a hot room without replacing my whole AC system?"
    answer: "In most cases yes. Adding a duct damper, sealing duct leaks, or adding a mini split to that room are all options that do not require replacing the main system."
relatedPages:
  - "/problems/ac-not-cooling-during-day-los-angeles"
  - "/services/duct-leak-repair-los-angeles"
  - "/cost/ac-repair-cost-los-angeles"
ctaVariant: "call"
noindex: false
---

[Placeholder body — content will be replaced with expert copy]

content/problems/ac-smells-like-burning-los-angeles.mdx
---
title: "AC Smells Like Burning in Los Angeles — Is It Dangerous?"
h1: "AC Smells Like Burning in Los Angeles — What It Means"
description: "AC smelling like burning in Los Angeles? Learn which burning smells are dangerous and need immediate attention vs. which are harmless. C-20 licensed response."
pageType: "problem"
primaryKeyword: "ac smells like burning los angeles"
supportingKeywords: ["burning smell from ac vents los angeles", "ac smells like smoke los angeles"]
category: "AC"
season: "year-round"
lastUpdated: "2026-04-28"
causes:
  - "Dust burning off coils on first use of season"
  - "Electrical component burning — capacitor or motor"
  - "Overheating compressor"
  - "Debris in the ductwork"
  - "Wiring issue — most dangerous cause"
diagnosisSteps:
  - "Turn off the AC immediately if smell is strong or acrid"
  - "Check if this is the first time the AC has run this season"
  - "Smell at the vents vs. at the outdoor unit"
  - "Do not ignore a persistent or worsening burning smell"
faq:
  - question: "Is a burning smell from my AC dangerous in Los Angeles?"
    answer: "A brief dusty smell on first startup of the season is normal. A persistent acrid or electrical burning smell means you should turn off the unit and call a technician immediately."
  - question: "What does it mean when my AC smells like burning plastic?"
    answer: "Burning plastic often means an electrical component is overheating — a capacitor, control board, or wiring. Turn off the system and call us."
  - question: "Can I run my AC if it smells like burning?"
    answer: "We recommend turning it off until diagnosed. Electrical burning smells can indicate a fire hazard."
relatedPages:
  - "/problems/hvac-smells-like-gas-los-angeles"
  - "/services/emergency-ac-repair-los-angeles"
  - "/problems/ac-not-cooling-los-angeles"
ctaVariant: "emergency"
noindex: false
---

[Placeholder body — content will be replaced with expert copy]

--- SERVICE PAGES ---

content/services/emergency-ac-repair-los-angeles.mdx
---
title: "24/7 Emergency AC Repair in Los Angeles — Same Day Service"
h1: "Emergency AC Repair in Los Angeles — Available 24/7"
description: "Emergency AC repair in Los Angeles. Same-day service from C-20 licensed technicians. We answer every call. Serving all of Los Angeles County."
pageType: "service"
primaryKeyword: "emergency ac repair los angeles"
supportingKeywords: ["same day ac repair los angeles", "24 hour hvac repair los angeles", "ac repair los angeles open now"]
category: "AC"
season: "spike"
lastUpdated: "2026-04-28"
faq:
  - question: "Do you offer 24/7 emergency AC repair in Los Angeles?"
    answer: "Yes. We offer emergency service around the clock for Los Angeles County. Heat waves do not wait for business hours."
  - question: "How quickly can you respond to an emergency AC call in Los Angeles?"
    answer: "Our target response time is 30-60 minutes for emergency calls within Los Angeles. Response may be longer during peak heat wave periods."
  - question: "Does emergency AC repair cost more after hours in Los Angeles?"
    answer: "After-hours and weekend calls may have a higher diagnostic fee. We are transparent about pricing before dispatching a technician."
  - question: "What qualifies as an AC emergency?"
    answer: "Any situation where occupants are in danger from heat — especially for elderly, infants, or medically vulnerable — qualifies as an emergency."
relatedPages:
  - "/brands/goodman-ac-not-cooling-los-angeles"
  - "/problems/ac-stopped-working-heat-wave-los-angeles"
  - "/cost/ac-repair-cost-los-angeles"
ctaVariant: "emergency"
noindex: false
---

[Placeholder body — content will be replaced with expert copy]

═══════════════════════════════════════════════
STEP 14 — CONTACT PAGE (PHASE 1 PLACEHOLDER)
═══════════════════════════════════════════════

Build contact page with:
- H1: "Contact HVAC LA Pro"
- Large phone number with click-to-call
- Business hours
- Service area statement
- Simple static HTML form (no submission logic)
- Form fields: Name, Phone, Email, Service type,
  Message
- Submit button disabled with comment:
  "// TODO Phase 2: connect to webhook"

Do NOT implement form submission in Phase 1.

═══════════════════════════════════════════════
STEP 15 — ENV VARIABLES
═══════════════════════════════════════════════

.env.local.example:

NEXT_PUBLIC_PHONE=(323) 000-0000
NEXT_PUBLIC_PHONE_RAW=3230000000
NEXT_PUBLIC_EMAIL=info@hvaclapro.com
NEXT_PUBLIC_LICENSE=C-20 #XXXXXX
NEXT_PUBLIC_GA4_ID=
WEBHOOK_URL=
TELEGRAM_BOT_TOKEN=
TELEGRAM_CHAT_ID=
DOMAIN=hvaclapro.com

═══════════════════════════════════════════════
STEP 16 — ROBOTS AND SITEMAP
═══════════════════════════════════════════════

robots.ts:
User-agent: *
Allow: /
Disallow: /api/
Disallow: /admin/
Sitemap: https://hvaclapro.com/sitemap.xml

sitemap.ts — auto-generate from content registry.
Include:
- / (homepage): priority 1.0, weekly
- /services/*: priority 0.9, monthly
- /brands/* and /problems/* and /cost/*: 0.8
- /blog/*: priority 0.7
- /about, /contact: priority 0.5
- Exclude: /privacy, /terms, pages with noindex

═══════════════════════════════════════════════
STEP 17 — FINAL VERIFICATION
═══════════════════════════════════════════════

Run in order:
1. npm run lint (fix all warnings)
2. npm run build (must pass with zero errors)
3. npm run dev

Verify these URLs render correctly:
- http://localhost:3000
- http://localhost:3000/brands/goodman-ac-not-cooling-los-angeles
- http://localhost:3000/brands/carrier-ac-not-cooling-los-angeles
- http://localhost:3000/cost/ac-capacitor-replacement-cost-los-angeles
- http://localhost:3000/cost/ac-fan-motor-replacement-cost-los-angeles
- http://localhost:3000/cost/refrigerant-leak-repair-cost-los-angeles
- http://localhost:3000/problems/ac-not-cooling-during-day-los-angeles
- http://localhost:3000/problems/ac-wont-cool-below-80-los-angeles
- http://localhost:3000/problems/one-room-not-getting-cold-air-los-angeles
- http://localhost:3000/problems/ac-smells-like-burning-los-angeles
- http://localhost:3000/services/emergency-ac-repair-los-angeles
- http://localhost:3000/sitemap.xml

For each URL confirm:
- Page renders without error
- H1 is correct
- Phone number is visible
- Breadcrumbs are present
- Mobile sticky call bar visible (resize browser)
- Schema markup present in page source

═══════════════════════════════════════════════
FINAL DELIVERABLE
═══════════════════════════════════════════════

Provide final report:

✅ Built successfully:
   [list everything that works]

⚠️ Placeholder content:
   [list all 10 MDX files that need real copy]

📋 Phase 2 checklist:
   [ ] Contact form submission (Telegram webhook)
   [ ] Google Analytics GA4
   [ ] Google Search Console verification
   [ ] Real review data
   [ ] AggregateRating schema (after real reviews)

Write README.md covering:
- How to run locally
- How to add a new MDX page
- How to update phone/license in constants.ts
- How to deploy to Vercel
- Phase 2 items list

═══════════════════════════════════════════════
NON-NEGOTIABLE RULES
═══════════════════════════════════════════════

1. Static generation is mandatory for all
   content pages (generateStaticParams required)

2. MDX must use next-mdx-remote/rsc
   (build-time, not client-side)

3. Frontmatter must be validated with Zod
   (build fails on invalid frontmatter)

4. No AggregateRating schema anywhere
   (no real reviews exist yet)

5. No fake trust claims in structured data

6. No superlatives: best, #1, top-rated

7. Phone CTA at decision points only
   (not after every paragraph)

8. Mobile sticky call bar must not cover content
   (add padding-bottom to main element)

9. npm run build must pass with zero errors
   before reporting completion

10. All placeholder text in English

Start with Step 1. Confirm each step
before proceeding to the next.
```
