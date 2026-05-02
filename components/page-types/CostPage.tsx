import type { Frontmatter } from "@/lib/content/frontmatterSchema";
import { Breadcrumbs, type Crumb } from "@/components/ui/Breadcrumbs";
import { FAQ } from "@/components/sections/FAQ";
import { CTA } from "@/components/sections/CTA";
import { JsonLd } from "@/components/JsonLd";
import { breadcrumbSchema, faqSchema, articleSchema } from "@/lib/seo/generateSchema";
import { PriceBox, RelatedPages, HeroImage, InlinePhoneCTA } from "./shared";

export function CostPage({
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
        <h1 className="text-primary mt-3 mb-2">{fm.h1}</h1>
        {fm.lastUpdated && (
          <p className="text-sm text-muted mb-3">
            Updated {new Date(fm.lastUpdated).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}
          </p>
        )}
        <p className="text-lg text-muted">{fm.description}</p>

        <HeroImage
          src={fm.heroImage ?? "/hero/hero-tech.jpg"}
          alt={`${fm.h1} — HVAC repair cost Los Angeles`}
        />

        {fm.priceRange ? (
          <PriceBox price={fm.priceRange} />
        ) : (
          <aside className="my-8 border-l-4 border-accent bg-orange-50 p-5 rounded">
            <div className="text-primary font-semibold">Call for a free estimate</div>
          </aside>
        )}

        <section className="my-8">
          <h2 className="text-primary mb-3">What Affects the Cost</h2>
          <ul className="list-disc list-inside space-y-1 text-primary">
            <li>System age, brand, and refrigerant type</li>
            <li>Part availability and labor time required</li>
            <li>Accessibility of the unit (rooftop, attic, side yard)</li>
            <li>Whether additional repairs are needed</li>
          </ul>
        </section>

        <section className="my-8">
          <h2 className="text-primary mb-3">What&apos;s Included</h2>
          <ul className="list-disc list-inside space-y-1 text-primary">
            <li>Full diagnosis with measurements</li>
            <li>Flat-rate quote before any work begins</li>
            <li>Labor warranty on completed repairs</li>
            <li>Manufacturer warranty pass-through on new parts</li>
          </ul>
        </section>

        <section className="my-8">
          <h3 className="text-primary mb-3">Red Flags: Quote Too High</h3>
          <p className="text-primary">
            Watch out for techs pushing full system replacement for a single failed component, or
            charging well above the LA market rate without a written breakdown.
          </p>
        </section>

        <section className="my-8">
          <h3 className="text-primary mb-3">Red Flags: Quote Too Low</h3>
          <p className="text-primary">
            Suspiciously cheap refrigerant top-offs without a leak search almost always come back
            within months. Used parts and uncertified techs are also common with very low quotes.
          </p>
        </section>

        <div className="prose prose-slate max-w-none my-8">{children}</div>

        <InlinePhoneCTA text="Get a flat-rate quote before any work begins — call us now." />

        {fm.faq && fm.faq.length >= 2 && <FAQ items={fm.faq} />}

        <RelatedPages links={fm.relatedPages} />
      </div>
      <CTA title="Get an honest quote — call us" subtitle="Flat-rate pricing, no surprise charges." />
    </article>
  );
}
