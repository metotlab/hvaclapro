import Image from "next/image";
import type { Frontmatter } from "@/lib/content/frontmatterSchema";
import { Breadcrumbs, type Crumb } from "@/components/ui/Breadcrumbs";
import { FAQ } from "@/components/sections/FAQ";
import { CTA } from "@/components/sections/CTA";
import { JsonLd } from "@/components/JsonLd";
import { breadcrumbSchema, faqSchema, articleSchema } from "@/lib/seo/generateSchema";
import { PriceBox, RelatedPages, InlinePhoneCTA } from "./shared";

export function BrandPage({
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
  const brand = fm.brand ?? "this brand";
  return (
    <article>
      <JsonLd data={breadcrumbSchema(crumbs)} />
      <JsonLd data={articleSchema(fm, urlPath)} />
      <JsonLd data={faqSchema(fm)} />

      <div className="max-w-3xl mx-auto px-4 py-8">
        <Breadcrumbs items={crumbs} />
        <h1 className="text-primary mt-3 mb-4">{fm.h1}</h1>
        <p className="text-lg text-muted">{fm.description}</p>

        {fm.heroImage && (
          <div className="relative rounded-xl overflow-hidden my-6 aspect-[3/2]">
            <Image
              src={fm.heroImage}
              alt={`${brand} AC unit — Los Angeles HVAC service`}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 700px"
            />
          </div>
        )}

        <section className="my-8">
          <p className="text-primary">
            {`${brand} equipment is installed across thousands of Los Angeles homes. Performance and longevity depend on installation quality, annual maintenance, and how well the system was sized for the home's actual heat load. Below are the specific issues we see most often on ${brand} service calls in Los Angeles.`}
          </p>
        </section>

        <InlinePhoneCTA text={`Need ${brand} service today?`} />

        {fm.priceRange && <PriceBox price={fm.priceRange} />}

        <InlinePhoneCTA text={`Questions about your ${brand} system? Call a licensed technician.`} />

        <div className="prose prose-slate max-w-none my-8">{children}</div>

        {fm.faq && fm.faq.length >= 2 && <FAQ items={fm.faq} />}

        <RelatedPages links={fm.relatedPages} />
      </div>
      <CTA />
    </article>
  );
}
