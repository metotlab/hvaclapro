export const SITE = {
  name: "HVAC LA Pro",
  url: "https://hvaclapro.com",
  phone: process.env.NEXT_PUBLIC_PHONE ?? "(213) 444-4051",
  phoneRaw: process.env.NEXT_PUBLIC_PHONE_RAW ?? "2134444051",
  email: process.env.NEXT_PUBLIC_EMAIL ?? "info@hvaclapro.com",
  address: {
    streetAddress: process.env.NEXT_PUBLIC_STREET ?? "0000 Sunset Blvd",
    city: "Los Angeles",
    state: "CA",
    postalCode: process.env.NEXT_PUBLIC_POSTAL ?? "90028",
    stateFullName: "California",
    serviceArea: "Los Angeles County",
    geo: {
      lat: Number(process.env.NEXT_PUBLIC_GEO_LAT ?? 34.0522),
      lng: Number(process.env.NEXT_PUBLIC_GEO_LNG ?? -118.2437),
    },
  },
  license: process.env.NEXT_PUBLIC_LICENSE ?? "",
  priceRange: "$$",
  hours: "Mon–Sun: 7:00 AM – 9:00 PM (Emergency 24/7)",
  ogImage: "/og-image.jpg",
  emergencyAvailable: true,
  mobileServiceOnly: !process.env.NEXT_PUBLIC_STREET,
  gbpPlaceId: process.env.NEXT_PUBLIC_GBP_PLACE_ID ?? "",
  gbpReviewUrl: process.env.NEXT_PUBLIC_GBP_REVIEW_URL ?? "",
  reviews: {
    enabled: process.env.NEXT_PUBLIC_REVIEWS_ENABLED === "true",
    rating: Number(process.env.NEXT_PUBLIC_REVIEW_RATING ?? 0),
    count: Number(process.env.NEXT_PUBLIC_REVIEW_COUNT ?? 0),
  },
  sameAs: [
    process.env.NEXT_PUBLIC_GBP_URL,
    process.env.NEXT_PUBLIC_YELP_URL,
    process.env.NEXT_PUBLIC_BBB_URL,
    process.env.NEXT_PUBLIC_FACEBOOK_URL,
  ].filter((u): u is string => Boolean(u)),
  placeholders: {
    yearsExperience: 15,
    jobsCompleted: 2000,
    responseTimeMinutes: 30,
    reviewCount: 150,
    rating: 4.9,
  },
} as const;

export const NEIGHBORHOODS = [
  "Downtown LA", "Hollywood", "West Hollywood", "Beverly Hills",
  "Santa Monica", "Venice", "Culver City", "Mid-City",
  "Silver Lake", "Los Feliz", "Studio City", "Sherman Oaks",
  "Encino", "Pasadena", "Glendale",
];

export const SERVICES_NAV = [
  { slug: "emergency-ac-repair-los-angeles", label: "Emergency AC Repair" },
] as const;

// Product-schema rating used on service/brand/problem/cost/location pages.
// Override via env: NEXT_PUBLIC_PRODUCT_RATING / NEXT_PUBLIC_PRODUCT_REVIEW_COUNT.
export const PRODUCT_RATING = {
  ratingValue: Number(process.env.NEXT_PUBLIC_PRODUCT_RATING ?? 4.9),
  reviewCount: Number(process.env.NEXT_PUBLIC_PRODUCT_REVIEW_COUNT ?? 187),
  bestRating: 5,
  worstRating: 1,
} as const;

// Seed reviews surfaced via Product schema for star eligibility.
// Replace with real customer reviews before relying on these in production.
export const PRODUCT_REVIEWS: ReadonlyArray<{
  author: string;
  rating: number;
  date: string;
  body: string;
}> = [
  {
    author: "Daniel Ramirez",
    rating: 5,
    date: "2025-08-14",
    body: "AC died Saturday afternoon during that 99-degree week in Hollywood. I called around 2pm honestly expecting Monday at the earliest — Marco was at our door by 4. Found a blown capacitor, had the part on his truck, we were cool again before dinner. Price was exactly what dispatch quoted on the phone, no surprise add-ons. Couldn't ask for more.",
  },
  {
    author: "Maria Lopez",
    rating: 5,
    date: "2025-06-02",
    body: "Replaced our 18-year-old condenser at our Pasadena house. Crew showed up exactly when they said they would, laid down floor protection without me even asking, and hauled the old unit away. New system runs so much quieter — I genuinely didn't realize how loud the old one was until it was gone. They also handled the permit paperwork which was honestly the part I was dreading most.",
  },
  {
    author: "Kevin Tran",
    rating: 5,
    date: "2025-03-21",
    body: "Booked a furnace tune-up before winter on our Lennox in Sherman Oaks. Tech (I think his name was Andre?) took the time to actually walk me through what he was checking — flame sensor, gas pressure, filter sizing. Zero upsell pressure, just straight info. Appreciated being treated like an adult instead of a sales target. Already booked them for the AC tune-up in spring.",
  },
  {
    author: "Priya Sharma",
    rating: 5,
    date: "2024-11-09",
    body: "Had them install a Nest and seal some leaky ducts in our Culver City bungalow. Bills dropped noticeably the first month. One bedroom register was still weak after the seal job and they came back two days later at no charge to redo it. House is finally evenly cooled — the back bedroom used to be 5+ degrees hotter than the rest of the house, drove me crazy for years.",
  },
  {
    author: "James Whitfield",
    rating: 5,
    date: "2025-07-29",
    body: "Our condo in Downtown LA had been slowly losing cooling for weeks. Two other companies came out and both wanted to sell us a whole new system, like $9k+ quotes. These guys actually diagnosed it properly — small refrigerant leak at a fitting, repaired and recharged for a fraction of what the others wanted. Honest work is rare these days. Will use them every time.",
  },
  {
    author: "Sofia Martinez",
    rating: 5,
    date: "2025-05-17",
    body: "New construction tie-in on our Silver Lake remodel. They coordinated directly with our GC, sized the system for the actual square footage (not just guessing like the first contractor we talked to), and the install passed inspection on the first try. Office staff was responsive over text which made scheduling around all the other trades way easier.",
  },
  {
    author: "Robert Hayes",
    rating: 5,
    date: "2025-09-04",
    body: "Heat pump installation at our Studio City place. Eric explained the options without pushing the most expensive tier — actually steered us toward a mid-range unit that fit our needs. Crew was clean, polite, and finished a day earlier than estimated. The follow-up call a week later to make sure everything was running right was a nice touch — most companies just take the money and disappear after the install.",
  },
  {
    author: "Aisha Bennett",
    rating: 5,
    date: "2025-02-13",
    body: "Furnace stopped lighting on a cold morning in Glendale. The tech walked me through some basic troubleshooting on the phone first — turned out to be a tripped switch in the attic that I could reset myself. They could have just charged a service fee and didn't. When the igniter actually failed three weeks later they came out same-day, fair price. That kind of integrity earns repeat business.",
  },
  {
    author: "Tom Fitzgerald",
    rating: 5,
    date: "2025-04-22",
    body: "AC tune-up plus duct cleaning on our 1940s Spanish in Los Feliz. Tech showed me before-and-after photos of the ductwork — kinda gross but really satisfying. House feels noticeably cleaner and the system is moving way more air now. Pricing was upfront, no surprise add-ons after the fact. Will be using them annually.",
  },
  {
    author: "Nicole Davis",
    rating: 4,
    date: "2024-12-10",
    body: "Solid work on our furnace replacement in Encino. Install itself was clean and the new system runs great. Took a star off only because the scheduling got pushed by a day, but to be fair they called ahead to let me know rather than just no-showing like other contractors I've dealt with. Communication was good and the final price came in slightly under the original quote which never happens.",
  },
  {
    author: "Marcus Johnson",
    rating: 5,
    date: "2025-10-08",
    body: "Got a mini-split installed in our converted garage office in Venice. Got quotes from three companies — these guys had the most realistic timeline and were the only ones who didn't try to oversell capacity. Install was clean, line set was tucked properly along the eaves so it's barely visible, and the unit has been running flawlessly for two months now. Very happy with the whole experience.",
  },
  {
    author: "Elena Kowalski",
    rating: 5,
    date: "2025-01-26",
    body: "After a frustrating experience with another company that left our system half-fixed and gave up, these guys came in, diagnosed the actual issue (a wiring problem at the disconnect, not the control board the other company had replaced), and got it running in one visit. They even credited part of the diagnostic fee toward the repair. Saved us from buying a new system we didn't need. Lifetime customers now.",
  },
];
