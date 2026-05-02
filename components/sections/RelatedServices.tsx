import Link from "next/link";

const SERVICES = [
  { name: "AC Repair", href: "/services/ac-repair-los-angeles" },
  { name: "AC Installation", href: "/services/ac-installation-los-angeles" },
  { name: "Furnace Repair", href: "/services/furnace-repair-los-angeles" },
  { name: "Heat Pump Service", href: "/services/heat-pump-services-los-angeles" },
  { name: "AC Tune-Up", href: "/services/ac-tune-up-los-angeles" },
  { name: "Duct Repair", href: "/services/duct-repair-los-angeles" },
  { name: "Smart Thermostat", href: "/services/smart-thermostat-installation-los-angeles" },
  { name: "Emergency AC Repair", href: "/services/emergency-ac-repair-los-angeles" },
];

export function RelatedServices({ heading = "Services We Offer" }: { heading?: string }) {
  return (
    <section className="bg-slate-50 border-t border-border">
      <div className="max-w-3xl mx-auto px-4 py-10">
        <h2 className="text-primary mb-3">{heading}</h2>
        <ul className="grid sm:grid-cols-2 gap-2">
          {SERVICES.map((s) => (
            <li key={s.href}>
              <Link
                href={s.href}
                className="block border border-border rounded-md px-3 py-2 bg-white text-primary hover:border-accent hover:text-accent text-sm"
              >
                {s.name} →
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
