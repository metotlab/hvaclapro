import type { Frontmatter } from "@/lib/content/frontmatterSchema";
import { Breadcrumbs, type Crumb } from "@/components/ui/Breadcrumbs";
import { FAQ } from "@/components/sections/FAQ";
import { CTA } from "@/components/sections/CTA";
import { JsonLd } from "@/components/JsonLd";
import { breadcrumbSchema, faqSchema, articleSchema } from "@/lib/seo/generateSchema";
import { StepList, PriceBox, CalloutBox, RelatedPages, InlinePhoneCTA, HeroImage } from "./shared";

export function ProblemPage({
  frontmatter: fm,
  children,
  crumbs,
  urlPath,
}: {
  frontmatter: Frontmatter;
  children: React.ReactNode;
  crumbs: Crumb[];
  urlPath: string;
}) {
  return (
    <article>
      <JsonLd data={breadcrumbSchema(crumbs)} />
      <JsonLd data={articleSchema(fm, urlPath)} />
      <JsonLd data={faqSchema(fm)} />

      <div className="max-w-3xl mx-auto px-4 py-8">
        <Breadcrumbs items={crumbs} />
        <h1 className="text-primary mt-3 mb-4">{fm.h1}</h1>
        <p className="text-lg text-muted">{fm.description}</p>

        <HeroImage
          src={fm.heroImage ?? "/hero/hero-tech.jpg"}
          alt={`${fm.h1} — HVAC diagnosis Los Angeles`}
        />
        {fm.diagnosisSteps && <StepList title="Quick Diagnostic Checklist" items={fm.diagnosisSteps} />}

        <InlinePhoneCTA text="Not sure what's wrong? We'll diagnose it today." />

        <CalloutBox title="When to Shut the System Off">
          Turn the system off at the thermostat immediately if: you hear grinding or squealing from
          the outdoor unit, you smell burning or electrical odor from any vent or unit, the circuit
          breaker trips more than once after resetting, or you see ice on the refrigerant lines.
          Running a damaged system can turn a $300 capacitor repair into a $2,000+ compressor
          replacement.
        </CalloutBox>

        <section className="my-8">
          <h2 className="text-primary mb-3">What We Do</h2>
          <p className="text-primary">
            A licensed technician arrives in a marked vehicle, performs a full system diagnosis,
            and gives you a flat-rate quote before any work starts. No surprise charges. Most
            repairs are completed same day.
          </p>
        </section>

        {fm.priceRange && <PriceBox price={fm.priceRange} />}

        <div className="prose prose-slate max-w-none my-8">{children}</div>

        <InlinePhoneCTA text="Not sure if it's safe to run? Call a technician now — we'll walk you through it." />

        {fm.faq && fm.faq.length >= 2 && <FAQ items={fm.faq} />}

        <RelatedPages links={fm.relatedPages} />
      </div>
      <CTA />
    </article>
  );
}
