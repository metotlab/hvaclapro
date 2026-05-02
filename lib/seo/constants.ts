export const SITE = {
  name: "HVAC LA Pro",
  url: "https://hvaclapro.com",
  phone: process.env.NEXT_PUBLIC_PHONE ?? "(323) 000-0000",
  phoneRaw: process.env.NEXT_PUBLIC_PHONE_RAW ?? "3230000000",
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
