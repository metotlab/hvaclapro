import Link from "next/link";

const PRIORITY_AREAS = [
  { name: "Sherman Oaks", href: "/locations/hvac-sherman-oaks" },
  { name: "Encino", href: "/locations/hvac-encino" },
  { name: "Pasadena", href: "/locations/hvac-pasadena" },
  { name: "Studio City", href: "/locations/hvac-studio-city" },
  { name: "Beverly Hills", href: "/locations/hvac-beverly-hills" },
  { name: "Santa Monica", href: "/locations/hvac-santa-monica" },
  { name: "Hollywood", href: "/locations/hvac-hollywood" },
  { name: "West Hollywood", href: "/locations/hvac-west-hollywood" },
  { name: "Downtown LA", href: "/locations/hvac-downtown-la" },
  { name: "Venice", href: "/locations/hvac-venice" },
  { name: "Culver City", href: "/locations/hvac-culver-city" },
  { name: "Mid-City", href: "/locations/hvac-mid-city" },
  { name: "Silver Lake", href: "/locations/hvac-silver-lake" },
  { name: "Los Feliz", href: "/locations/hvac-los-feliz" },
  { name: "Glendale", href: "/locations/hvac-glendale" },
];

export function ServiceAreasLinks({ heading = "Service Areas" }: { heading?: string }) {
  return (
    <section className="bg-slate-50 border-t border-border">
      <div className="max-w-3xl mx-auto px-4 py-10">
        <h2 className="text-primary mb-3">{heading}</h2>
        <p className="text-muted mb-4">
          We service all of Los Angeles County, with dedicated coverage for these neighborhoods:
        </p>
        <ul className="grid sm:grid-cols-2 md:grid-cols-3 gap-2">
          {PRIORITY_AREAS.map((a) => (
            <li key={a.href}>
              <Link
                href={a.href}
                className="block border border-border rounded-md px-3 py-2 bg-white text-primary hover:border-accent hover:text-accent text-sm"
              >
                HVAC in {a.name} →
              </Link>
            </li>
          ))}
        </ul>
        <p className="text-sm text-muted mt-3">
          <Link href="/locations" className="hover:text-accent underline underline-offset-2">
            See all service areas →
          </Link>
        </p>
      </div>
    </section>
  );
}
