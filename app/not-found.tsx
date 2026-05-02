import Link from "next/link";
import { PhoneButton } from "@/components/ui/PhoneButton";

const POPULAR_SERVICES = [
  { name: "AC Repair", href: "/services/ac-repair-los-angeles" },
  { name: "Emergency AC Repair", href: "/services/emergency-ac-repair-los-angeles" },
  { name: "AC Installation", href: "/services/ac-installation-los-angeles" },
  { name: "Furnace Repair", href: "/services/furnace-repair-los-angeles" },
  { name: "Heat Pump Service", href: "/services/heat-pump-services-los-angeles" },
  { name: "AC Tune-Up", href: "/services/ac-tune-up-los-angeles" },
];

const POPULAR_AREAS = [
  { name: "Sherman Oaks", href: "/locations/hvac-sherman-oaks" },
  { name: "Pasadena", href: "/locations/hvac-pasadena" },
  { name: "Hollywood", href: "/locations/hvac-hollywood" },
  { name: "Beverly Hills", href: "/locations/hvac-beverly-hills" },
  { name: "Santa Monica", href: "/locations/hvac-santa-monica" },
  { name: "Downtown LA", href: "/locations/hvac-downtown-la" },
];

export default function NotFound() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-16">
      <div className="text-center mb-10">
        <h1 className="text-primary mb-3">Page not found</h1>
        <p className="text-muted mb-6">
          The page you&apos;re looking for doesn&apos;t exist. If you need HVAC service today, give us a call.
        </p>
        <div className="flex justify-center gap-3">
          <PhoneButton />
          <Link
            href="/"
            className="inline-flex items-center justify-center font-semibold rounded-lg px-5 py-3 border border-primary text-primary hover:bg-primary hover:text-white"
          >
            Go home
          </Link>
        </div>
      </div>

      <div className="grid sm:grid-cols-2 gap-8">
        <div>
          <h2 className="text-primary mb-3">Popular Services</h2>
          <ul className="space-y-1">
            {POPULAR_SERVICES.map((s) => (
              <li key={s.href}>
                <Link href={s.href} className="text-primary hover:text-accent">
                  → {s.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h2 className="text-primary mb-3">Service Areas</h2>
          <ul className="space-y-1">
            {POPULAR_AREAS.map((a) => (
              <li key={a.href}>
                <Link href={a.href} className="text-primary hover:text-accent">
                  → HVAC in {a.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
