import type { Frontmatter } from "@/lib/content/frontmatterSchema";
import { Breadcrumbs, type Crumb } from "@/components/ui/Breadcrumbs";
import { FAQ } from "@/components/sections/FAQ";
import { CTA } from "@/components/sections/CTA";
import { JsonLd } from "@/components/JsonLd";
import { breadcrumbSchema, faqSchema, articleSchema } from "@/lib/seo/generateSchema";
import { RelatedPages, InlinePhoneCTA, HeroImage, CalloutBox } from "./shared";
import { SITE } from "@/lib/seo/constants";

function formatDate(dateStr: string): string {
  const d = new Date(dateStr);
  return d.toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" });
}

export function BlogPage({
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

        {/* Visible blog metadata */}
        <div className="flex flex-wrap items-center gap-3 text-sm text-muted mb-4 border-b border-border pb-4">
          <span>By <strong className="text-primary">{SITE.name} Team</strong></span>
          <span>·</span>
          <time dateTime={fm.lastUpdated}>
            Updated {formatDate(fm.lastUpdated)}
          </time>
        </div>

        <p className="text-lg text-muted mb-6">{fm.description}</p>

        <HeroImage
          src={fm.heroImage ?? "/hero/hero-tech.jpg"}
          alt={`${fm.h1} — HVAC LA Pro`}
        />

        <InlinePhoneCTA text="Have an HVAC question? Call us directly." />

        <div className="prose prose-slate max-w-none my-8">{children}</div>

        <CalloutBox title="When to Call a Technician">
          Some HVAC problems are safe to diagnose at home, but refrigerant issues, electrical
          faults, compressor problems, and any burning smell require a licensed C-20 technician.
          If your system still is not cooling after basic checks, call before the problem gets more
          expensive.
        </CalloutBox>

        {fm.faq && fm.faq.length >= 2 && <FAQ items={fm.faq} />}

        <RelatedPages links={fm.relatedPages} />
      </div>
      <CTA />
    </article>
  );
}
