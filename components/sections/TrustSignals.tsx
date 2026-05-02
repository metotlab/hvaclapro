import { ShieldCheck, BadgeCheck, Wrench, MapPin } from "lucide-react";
import { SITE } from "@/lib/seo/constants";

const SIGNALS = [
  {
    icon: <BadgeCheck size={32} />,
    title: "C-20 Licensed & Insured",
    body: "California C-20 licensed HVAC contractor. Full liability and workers' compensation coverage on every job.",
  },
  {
    icon: <ShieldCheck size={32} />,
    title: "Flat-Rate Pricing",
    body: "You see the price before any work begins. No hidden fees, no surprise charges, no high-pressure upsells.",
  },
  {
    icon: <Wrench size={32} />,
    title: "Stocked Service Vans",
    body: "Capacitors, motors, contactors, common refrigerants on every truck. Most repairs completed on the first visit.",
  },
  {
    icon: <MapPin size={32} />,
    title: `Local to ${SITE.address.serviceArea}`,
    body: "Local technicians who know LA's climate zones, housing stock, and the failure patterns that come with them.",
  },
];

export function TrustSignals() {
  return (
    <section className="bg-slate-50">
      <div className="max-w-6xl mx-auto px-4 py-12">
        <h2 className="text-primary mb-6">Why LA Homeowners Call Us First</h2>
        <div className="grid md:grid-cols-2 gap-4">
          {SIGNALS.map((s) => (
            <div
              key={s.title}
              className="bg-white border border-border border-l-[3px] border-l-accent rounded-lg p-5 flex gap-4"
            >
              <div className="text-accent shrink-0">{s.icon}</div>
              <div>
                <h3 className="font-bold text-primary mb-1 text-base">{s.title}</h3>
                <p className="text-muted text-sm leading-relaxed">{s.body}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
