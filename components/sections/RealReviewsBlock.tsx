import { Star } from "lucide-react";
import { SITE } from "@/lib/seo/constants";
import { JsonLd } from "@/components/JsonLd";

/**
 * RealReviewsBlock — renders only when:
 *   NEXT_PUBLIC_REVIEWS_ENABLED=true
 *   NEXT_PUBLIC_REVIEW_RATING=4.X
 *   NEXT_PUBLIC_REVIEW_COUNT=10+ (real number from GBP)
 *   NEXT_PUBLIC_GBP_REVIEW_URL=https://g.page/...
 *
 * Until those env vars are set with REAL data from a verified GBP,
 * the component renders nothing — keeping the homepage clean instead
 * of showing fake testimonials.
 *
 * AggregateRating schema is emitted ONLY when reviews are enabled.
 */
export function RealReviewsBlock() {
  const { enabled, rating, count } = SITE.reviews;
  if (!enabled || !rating || !count) return null;

  const aggregateRating = {
    "@context": "https://schema.org",
    "@type": "AggregateRating",
    itemReviewed: { "@id": `${SITE.url}/#business` },
    ratingValue: rating,
    reviewCount: count,
    bestRating: 5,
    worstRating: 1,
  };

  return (
    <section className="bg-slate-50 border-y border-border">
      <JsonLd data={aggregateRating} />
      <div className="max-w-6xl mx-auto px-4 py-10 text-center">
        <div className="flex items-center justify-center gap-1 text-accent mb-2" aria-hidden>
          {Array.from({ length: 5 }).map((_, i) => (
            <Star key={i} size={22} fill={i < Math.round(rating) ? "currentColor" : "none"} />
          ))}
        </div>
        <div className="text-2xl font-bold text-primary">
          {rating.toFixed(1)} from {count} Google reviews
        </div>
        <p className="text-muted text-sm mt-1">
          Reviews from verified Google Business Profile customers.
        </p>
        {SITE.gbpReviewUrl && (
          <a
            href={SITE.gbpReviewUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block mt-4 text-accent hover:text-accent-hover font-semibold underline underline-offset-2"
          >
            Read all reviews on Google →
          </a>
        )}
      </div>
    </section>
  );
}
