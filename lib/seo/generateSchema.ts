import { SITE, PRODUCT_RATING, PRODUCT_REVIEWS } from "./constants";
import type { Frontmatter } from "@/lib/content/frontmatterSchema";

type Crumb = { name: string; url: string };

export function localBusinessSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "HVACBusiness",
    "@id": `${SITE.url}/#business`,
    name: SITE.name,
    url: SITE.url,
    image: `${SITE.url}${SITE.ogImage}`,
    telephone: SITE.phone,
    email: SITE.email,
    priceRange: SITE.priceRange,
    address: {
      "@type": "PostalAddress",
      streetAddress: SITE.address.streetAddress,
      addressLocality: SITE.address.city,
      addressRegion: SITE.address.state,
      postalCode: SITE.address.postalCode,
      addressCountry: "US",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: SITE.address.geo.lat,
      longitude: SITE.address.geo.lng,
    },
    areaServed: { "@type": "City", name: SITE.address.serviceArea },
    openingHours: "Mo-Su 07:00-21:00",
    ...(SITE.sameAs.length > 0 ? { sameAs: SITE.sameAs } : {}),
    ...(SITE.reviews.enabled && SITE.reviews.rating && SITE.reviews.count
      ? {
          aggregateRating: {
            "@type": "AggregateRating",
            ratingValue: SITE.reviews.rating,
            reviewCount: SITE.reviews.count,
            bestRating: 5,
            worstRating: 1,
          },
        }
      : {}),
  };
}

export function breadcrumbSchema(crumbs: Crumb[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: crumbs.map((c, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: c.name,
      item: c.url.startsWith("http") ? c.url : `${SITE.url}${c.url}`,
    })),
  };
}

export function faqSchema(fm: Frontmatter) {
  if (!fm.faq || fm.faq.length < 2) return null;
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: fm.faq.map((q) => ({
      "@type": "Question",
      name: q.question,
      acceptedAnswer: { "@type": "Answer", text: q.answer },
    })),
  };
}

export function articleSchema(fm: Frontmatter, urlPath: string) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: fm.h1,
    description: fm.description,
    datePublished: fm.lastUpdated,
    dateModified: fm.lastUpdated,
    author: { "@type": "Organization", name: SITE.name, url: SITE.url },
    publisher: { "@type": "Organization", name: SITE.name, url: SITE.url },
    mainEntityOfPage: `${SITE.url}${urlPath}`,
  };
}

// Product schema with aggregateRating + Review[] — required pattern for
// Google review-stars in SERP. Use on service / brand / problem / cost / location pages.
export function productSchema(fm: Frontmatter, urlPath: string) {
  const productId = `${SITE.url}${urlPath}#product`;
  const offers =
    fm.priceRange && fm.priceRange.min > 0
      ? {
          "@type": "AggregateOffer",
          priceCurrency: "USD",
          lowPrice: String(fm.priceRange.min),
          highPrice: String(fm.priceRange.max),
          offerCount: String(PRODUCT_REVIEWS.length),
          availability: "https://schema.org/InStock",
        }
      : undefined;

  const product = {
    "@type": "Product",
    "@id": productId,
    name: fm.h1,
    description: fm.description,
    brand: { "@type": "Brand", name: SITE.name },
    image: `${SITE.url}${fm.heroImage ?? SITE.ogImage}`,
    url: `${SITE.url}${urlPath}`,
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: String(PRODUCT_RATING.ratingValue),
      reviewCount: String(PRODUCT_RATING.reviewCount),
      bestRating: String(PRODUCT_RATING.bestRating),
      worstRating: String(PRODUCT_RATING.worstRating),
    },
    ...(offers ? { offers } : {}),
  };

  const reviews = PRODUCT_REVIEWS.map((r, i) => ({
    "@type": "Review",
    "@id": `${productId}-review-${i}`,
    reviewBody: r.body,
    reviewRating: { "@type": "Rating", ratingValue: String(r.rating), bestRating: "5" },
    author: { "@type": "Person", name: r.author },
    datePublished: r.date,
    itemReviewed: { "@id": productId },
  }));

  return {
    "@context": "https://schema.org",
    "@graph": [product, ...reviews],
  };
}

export function serviceSchema(fm: Frontmatter, urlPath: string) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    serviceType: fm.h1,
    name: fm.h1,
    description: fm.description,
    provider: { "@id": `${SITE.url}/#business` },
    areaServed: { "@type": "City", name: SITE.address.serviceArea },
    hoursAvailable: {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
      opens: "00:00",
      closes: "23:59",
    },
    url: `${SITE.url}${urlPath}`,
  };
}
