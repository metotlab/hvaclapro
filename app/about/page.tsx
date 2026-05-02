import type { Metadata } from "next";
import Link from "next/link";
import { BadgeCheck, ShieldCheck, Wrench, Award } from "lucide-react";
import { SITE } from "@/lib/seo/constants";
import { CTA } from "@/components/sections/CTA";
import { TeamSection } from "@/components/sections/TeamSection";
import { PhoneButton } from "@/components/ui/PhoneButton";
import { JsonLd } from "@/components/JsonLd";
import { breadcrumbSchema } from "@/lib/seo/generateSchema";

export const metadata: Metadata = {
  title: "About HVAC LA Pro",
  description: `About ${SITE.name}: licensed C-20 HVAC contractor serving ${SITE.address.serviceArea}. Local technicians, flat-rate pricing, same-day service.`,
  alternates: { canonical: `${SITE.url}/about` },
};

const CREDENTIALS = [
  { icon: <BadgeCheck size={20} />, label: SITE.license ? `California C-20 HVAC License: ${SITE.license}` : "California C-20 Licensed HVAC Contractor" },
  { icon: <ShieldCheck size={20} />, label: "Bonded & Insured (general liability + workers' comp)" },
  { icon: <Award size={20} />, label: "EPA 608 Certified Technicians" },
  { icon: <Wrench size={20} />, label: `${SITE.placeholders.yearsExperience}+ years serving Los Angeles County` },
];

const PROMISES = [
  {
    title: "Flat-rate pricing — no surprises",
    body: "You see the full price after diagnosis and before any work begins. No hourly billing, no add-on charges discovered halfway through the job.",
  },
  {
    title: "Honest repair-or-replace advice",
    body: "We give you both numbers — repair cost and replacement cost — without pressure. The right answer depends on system age, condition, and your situation, not on what's most profitable for us.",
  },
  {
    title: "Same-day service across LA County",
    body: "Standard same-day response across most of Los Angeles County. Emergency service available 24/7 for situations that genuinely cannot wait.",
  },
  {
    title: "Manufacturer warranty pass-through",
    body: "Repairs done by our technicians do not void manufacturer warranties on Carrier, Goodman, Trane, Lennox, or any other major brand.",
  },
];

export default function About() {
  const crumbs = [
    { name: "Home", url: "/" },
    { name: "About", url: "/about" },
  ];
  return (
    <>
      <JsonLd data={breadcrumbSchema(crumbs)} />
      <div className="max-w-3xl mx-auto px-4 py-10">
        <h1 className="text-primary mb-4">About {SITE.name}</h1>
        <p className="text-lg text-muted mb-6">
          {SITE.name} is a California C-20 licensed HVAC contractor serving homeowners across {SITE.address.serviceArea}.
          Our local technicians specialize in same-day AC repair, furnace service, and emergency HVAC across LA&apos;s diverse climate zones.
        </p>

        <section className="my-10">
          <h2 className="text-primary mb-4">Our Credentials</h2>
          <ul className="grid sm:grid-cols-2 gap-3">
            {CREDENTIALS.map((c) => (
              <li
                key={c.label}
                className="flex items-start gap-3 bg-white border border-border rounded-lg p-4"
              >
                <span className="text-accent shrink-0 mt-0.5">{c.icon}</span>
                <span className="text-primary text-sm">{c.label}</span>
              </li>
            ))}
          </ul>
        </section>

        <TeamSection />

        <section className="my-10">
          <h2 className="text-primary mb-4">Our Service Promise</h2>
          <ul className="grid gap-4">
            {PROMISES.map((p) => (
              <li key={p.title} className="border-l-4 border-accent bg-orange-50/40 p-4 rounded">
                <div className="font-semibold text-primary mb-1">{p.title}</div>
                <p className="text-primary text-sm">{p.body}</p>
              </li>
            ))}
          </ul>
        </section>

        <section className="my-10">
          <h2 className="text-primary mb-4">Service Coverage</h2>
          <p className="text-primary mb-3">
            We serve all of {SITE.address.serviceArea}, with dedicated coverage for these neighborhoods:
          </p>
          <p className="text-muted">
            <Link href="/locations/hvac-sherman-oaks" className="hover:text-accent">Sherman Oaks</Link>,{" "}
            <Link href="/locations/hvac-encino" className="hover:text-accent">Encino</Link>,{" "}
            <Link href="/locations/hvac-pasadena" className="hover:text-accent">Pasadena</Link>,{" "}
            <Link href="/locations/hvac-studio-city" className="hover:text-accent">Studio City</Link>,{" "}
            <Link href="/locations/hvac-beverly-hills" className="hover:text-accent">Beverly Hills</Link>,{" "}
            <Link href="/locations/hvac-santa-monica" className="hover:text-accent">Santa Monica</Link>,{" "}
            <Link href="/locations/hvac-hollywood" className="hover:text-accent">Hollywood</Link>,{" "}
            <Link href="/locations/hvac-west-hollywood" className="hover:text-accent">West Hollywood</Link>,{" "}
            <Link href="/locations/hvac-downtown-la" className="hover:text-accent">Downtown LA</Link>,{" "}
            <Link href="/locations/hvac-venice" className="hover:text-accent">Venice</Link>,{" "}
            <Link href="/locations/hvac-culver-city" className="hover:text-accent">Culver City</Link>,{" "}
            <Link href="/locations/hvac-mid-city" className="hover:text-accent">Mid-City</Link>,{" "}
            <Link href="/locations/hvac-silver-lake" className="hover:text-accent">Silver Lake</Link>,{" "}
            <Link href="/locations/hvac-los-feliz" className="hover:text-accent">Los Feliz</Link>, and{" "}
            <Link href="/locations/hvac-glendale" className="hover:text-accent">Glendale</Link> —
            plus surrounding communities throughout LA County.
          </p>
        </section>

        <section className="my-10">
          <h2 className="text-primary mb-4">How We Work</h2>
          <ol className="grid sm:grid-cols-2 gap-4">
            {[
              { step: 1, title: "Diagnose", body: "Full system evaluation with measurements — not a guess. We check electrical, refrigerant, airflow, and controls before forming an opinion." },
              { step: 2, title: "Explain", body: "Walk you through what we found and what the options are. You understand the problem before we talk about solutions." },
              { step: 3, title: "Quote", body: "Flat-rate price before any work begins — no surprise charges, no scope that expands mid-job." },
              { step: 4, title: "Repair and Test", body: "Work completed, system tested, you see the result before we leave. Temperature split measured, operation confirmed at setpoint." },
            ].map(({ step, title, body }) => (
              <li key={step} className="flex gap-4 border border-border rounded-lg p-4 bg-white">
                <span className="flex-shrink-0 w-8 h-8 rounded-full bg-accent text-white font-bold flex items-center justify-center text-sm">{step}</span>
                <div>
                  <div className="font-semibold text-primary mb-1">{title}</div>
                  <p className="text-primary text-sm">{body}</p>
                </div>
              </li>
            ))}
          </ol>
        </section>

        {!SITE.address.streetAddress && (
          <aside className="my-8 border-l-4 border-accent bg-orange-50 p-5 rounded">
            <p className="text-primary">
              We are a mobile HVAC service — our licensed technicians come to you across Los Angeles County. We do not have a walk-in office or showroom.
            </p>
          </aside>
        )}

        <section className="my-10">
          <h2 className="text-primary mb-4">Questions We Get Asked</h2>
          <dl className="space-y-6">
            {[
              {
                q: "Are you licensed and insured?",
                a: "Yes. We hold a California C-20 HVAC contractor license and carry full general liability and workers’ compensation insurance on every job.",
              },
              {
                q: "Do you have a physical office I can visit?",
                a: "We are a mobile service — our technicians come to you. All service is performed at your home or property across Los Angeles County.",
              },
              {
                q: "What warranty comes with a repair?",
                a: "Ask about warranty options when you book — coverage varies by repair type and part used. We stand behind our work.",
              },
            ].map(({ q, a }) => (
              <div key={q}>
                <dt className="font-semibold text-primary mb-1">{q}</dt>
                <dd className="text-primary text-sm">{a}</dd>
              </div>
            ))}
          </dl>
        </section>

        <section className="my-10 bg-slate-50 border border-border rounded-lg p-6">
          <h2 className="text-primary mb-3">Have a Problem? Call.</h2>
          <p className="text-muted mb-4">
            For fastest service in Los Angeles, call us directly. We answer 24/7 for emergencies.
          </p>
          <PhoneButton />
        </section>
      </div>
      <CTA />
    </>
  );
}
