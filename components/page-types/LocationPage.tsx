import Link from "next/link";
import type { Frontmatter } from "@/lib/content/frontmatterSchema";
import { Breadcrumbs, type Crumb } from "@/components/ui/Breadcrumbs";
import { FAQ } from "@/components/sections/FAQ";
import { CTA } from "@/components/sections/CTA";
import { JsonLd } from "@/components/JsonLd";
import { breadcrumbSchema, faqSchema, articleSchema, productSchema } from "@/lib/seo/generateSchema";
import { RelatedServices } from "@/components/sections/RelatedServices";
import { RelatedPages, InlinePhoneCTA, HeroImage } from "./shared";

const AREA_SERVICES = [
  { href: "/services/ac-repair-los-angeles", label: "AC Repair" },
  { href: "/services/emergency-ac-repair-los-angeles", label: "Emergency AC Repair" },
  { href: "/services/ac-installation-los-angeles", label: "AC Installation" },
  { href: "/services/ac-tune-up-los-angeles", label: "AC Tune-Up" },
  { href: "/services/furnace-repair-los-angeles", label: "Furnace Repair" },
  { href: "/services/heat-pump-services-los-angeles", label: "Heat Pump Services" },
  { href: "/services/duct-repair-los-angeles", label: "Duct Repair" },
  { href: "/services/smart-thermostat-installation-los-angeles", label: "Smart Thermostat" },
];

export function LocationPage({
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
      <JsonLd data={productSchema(fm, urlPath)} />
      <JsonLd data={faqSchema(fm)} />

      <div className="max-w-3xl mx-auto px-4 py-8">
        <Breadcrumbs items={crumbs} />
        <h1 className="text-primary mt-3 mb-4">{fm.h1}</h1>
        <p className="text-lg text-muted">{fm.description}</p>

        <HeroImage
          src={fm.heroImage ?? "/hero/hero-tech.jpg"}
          alt={`${fm.h1} — licensed HVAC technician`}
        />

        <InlinePhoneCTA text="Need HVAC service in this area today?" />

        <div className="prose prose-slate max-w-none my-8">{children}</div>

        <section className="my-8">
          <h2 className="text-primary mb-3">Services Available in This Area</h2>
          <ul className="grid sm:grid-cols-2 md:grid-cols-4 gap-3">
            {AREA_SERVICES.map(({ href, label }) => (
              <li key={href}>
                <Link
                  href={href}
                  className="block border border-border rounded-lg p-3 text-center hover:border-accent hover:shadow-sm bg-white text-primary text-sm font-medium"
                >
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </section>

        {fm.faq && fm.faq.length >= 2 && <FAQ items={fm.faq} />}

        <RelatedPages links={fm.relatedPages} />
      </div>
      <RelatedServices />
      <CTA />
    </article>
  );
}
