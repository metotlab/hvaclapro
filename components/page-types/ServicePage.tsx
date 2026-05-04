import type { Frontmatter } from "@/lib/content/frontmatterSchema";
import { Breadcrumbs, type Crumb } from "@/components/ui/Breadcrumbs";
import { FAQ } from "@/components/sections/FAQ";
import { CTA } from "@/components/sections/CTA";
import { JsonLd } from "@/components/JsonLd";
import { breadcrumbSchema, faqSchema, serviceSchema, productSchema } from "@/lib/seo/generateSchema";
import { ServiceAreasLinks } from "@/components/sections/ServiceAreasLinks";
import { RelatedPages, HeroImage, InlinePhoneCTA } from "./shared";

export function ServicePage({
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
      <JsonLd data={serviceSchema(fm, urlPath)} />
      <JsonLd data={productSchema(fm, urlPath)} />
      <JsonLd data={faqSchema(fm)} />

      <div className="max-w-3xl mx-auto px-4 py-8">
        <Breadcrumbs items={crumbs} />
        <h1 className="text-primary mt-3 mb-4">{fm.h1}</h1>
        <p className="text-lg text-muted">{fm.description}</p>

        <HeroImage
          src={fm.heroImage ?? "/hero/hero-tech.jpg"}
          alt={`${fm.h1} — licensed HVAC technician Los Angeles`}
        />

        <section className="my-8">
          <h2 className="text-primary mb-3">What Our Technicians Check First</h2>
          <ol className="list-decimal list-inside space-y-2 text-primary">
            <li><strong>Air filter condition</strong> — clogged filters cause the most common LA cooling failures</li>
            <li><strong>Thermostat settings and calibration</strong> — rules out 10–15% of no-cooling calls before touching anything</li>
            <li><strong>Circuit breakers and disconnect switches</strong> — tripped breakers on outdoor units are common after LA power fluctuations</li>
            <li><strong>Refrigerant pressure (high and low side)</strong> — indicates charge level and compressor health</li>
            <li><strong>Condenser coil condition</strong> — LA smog and dust clog condenser fins within one season</li>
            <li><strong>Capacitor voltage</strong> — most common single-point electrical failure in LA summer heat; tests in 60 seconds</li>
          </ol>
        </section>

        <section className="my-8">
          <h2 className="text-primary mb-3">Why Choose Us</h2>
          <ul className="list-disc list-inside space-y-1 text-primary">
            <li>C-20 licensed and insured</li>
            <li>Local technicians with Los Angeles experience</li>
            <li>Flat-rate pricing — no surprise charges</li>
            <li>Same-day service across LA County</li>
          </ul>
        </section>

        <section className="my-8">
          <h2 className="text-primary mb-3">Our Process</h2>
          <ol className="list-decimal list-inside space-y-1 text-primary">
            <li>You call — we answer 24/7</li>
            <li>Tech dispatched, ETA confirmed by text</li>
            <li>Full diagnosis and flat-rate quote</li>
            <li>Repair completed same day where possible</li>
            <li>Follow-up to confirm system is running well</li>
          </ol>
        </section>

        <div className="prose prose-slate max-w-none my-8">{children}</div>

        <InlinePhoneCTA text="Ready to book a service call? Talk to a licensed technician now." />

        {fm.faq && fm.faq.length >= 2 && <FAQ items={fm.faq} />}

        <RelatedPages links={fm.relatedPages} />
      </div>
      <ServiceAreasLinks />
      <CTA />
    </article>
  );
}
