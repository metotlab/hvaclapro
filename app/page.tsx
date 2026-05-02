import type { Metadata } from "next";
import { SITE } from "@/lib/seo/constants";
import { Hero } from "@/components/sections/Hero";
import { TrustBar } from "@/components/sections/TrustBar";
import { ServicesGrid } from "@/components/sections/ServicesGrid";
import { ProblemsGrid } from "@/components/sections/ProblemsGrid";
import { ServiceAreas } from "@/components/sections/ServiceAreas";
import { TrustSignals } from "@/components/sections/TrustSignals";
import { RealReviewsBlock } from "@/components/sections/RealReviewsBlock";
import { FAQ } from "@/components/sections/FAQ";
import { CTA } from "@/components/sections/CTA";
import { JsonLd } from "@/components/JsonLd";

const HOME_FAQ = [
  { question: "How quickly can you respond?", answer: "Our target response time in Los Angeles is 30–60 minutes for emergency calls, and same-day for standard repairs." },
  { question: "Do you offer same-day service?", answer: "Yes, same-day service is available for most repairs across LA County, subject to dispatch capacity during heat waves." },
  { question: "Are you licensed and insured?", answer: "Yes. We are a California C-20 HVAC contractor with full liability insurance and workers' compensation coverage." },
  { question: "What areas do you serve?", answer: "All of Los Angeles County, including downtown LA, the Westside, San Fernando Valley, San Gabriel Valley, and the South Bay." },
];

const HOME_DESC =
  "Licensed C-20 HVAC contractor serving Los Angeles County. Same-day AC repair, furnace service & emergency response. Call for a free estimate.";

export const metadata: Metadata = {
  title: { absolute: `HVAC Repair & Service in Los Angeles, CA | ${SITE.name}` },
  description: HOME_DESC,
  alternates: { canonical: SITE.url },
  openGraph: {
    title: `HVAC Repair & Service in Los Angeles, CA | ${SITE.name}`,
    description: HOME_DESC,
    url: SITE.url,
    siteName: SITE.name,
    type: "website",
    images: [{ url: SITE.ogImage, width: 1200, height: 630, alt: SITE.name }],
  },
};

export default function Home() {
  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: HOME_FAQ.map((q) => ({
            "@type": "Question",
            name: q.question,
            acceptedAnswer: { "@type": "Answer", text: q.answer },
          })),
        }}
      />
      <Hero />
      <TrustBar />
      <ServicesGrid />
      <ProblemsGrid />
      <ServiceAreas />
      <TrustSignals />
      <RealReviewsBlock />
      <FAQ items={HOME_FAQ} />
      <CTA />
    </>
  );
}
