import Link from "next/link";
import { NEIGHBORHOODS, SITE } from "@/lib/seo/constants";

const LOCATION_PAGES: Record<string, string> = {
  "Sherman Oaks": "/locations/hvac-sherman-oaks",
  "Encino": "/locations/hvac-encino",
  "Pasadena": "/locations/hvac-pasadena",
  "Studio City": "/locations/hvac-studio-city",
  "Beverly Hills": "/locations/hvac-beverly-hills",
  "Santa Monica": "/locations/hvac-santa-monica",
  "Downtown LA": "/locations/hvac-downtown-la",
  "Hollywood": "/locations/hvac-hollywood",
  "West Hollywood": "/locations/hvac-west-hollywood",
  "Venice": "/locations/hvac-venice",
  "Culver City": "/locations/hvac-culver-city",
  "Mid-City": "/locations/hvac-mid-city",
  "Silver Lake": "/locations/hvac-silver-lake",
  "Los Feliz": "/locations/hvac-los-feliz",
  "Glendale": "/locations/hvac-glendale",
};

export function ServiceAreas() {
  return (
    <section id="areas" className="max-w-6xl mx-auto px-4 py-12">
      <div className="mb-7">
        <h2 className="text-primary mb-2">Serving These Los Angeles Neighborhoods</h2>
        <p className="text-muted">
          C-20 licensed HVAC service across {SITE.address.serviceArea} — from the Westside to the Valley.
        </p>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2 mb-5">
        {NEIGHBORHOODS.map((n) => {
          const href = LOCATION_PAGES[n];
          return (
            <div key={n}>
              {href ? (
                <Link
                  href={href}
                  className="block border border-border rounded-md px-3 py-2 text-sm text-primary font-medium text-center hover:border-accent hover:text-accent transition-colors bg-white"
                >
                  {n}
                </Link>
              ) : (
                <span className="block border border-border rounded-md px-3 py-2 text-sm text-primary font-medium text-center bg-white">
                  {n}
                </span>
              )}
            </div>
          );
        })}
      </div>
      <p className="text-sm text-muted">
        Can&apos;t find your neighborhood? Call — we cover all of LA County.{" "}
        <Link href="/locations" className="text-accent hover:underline underline-offset-2">
          View all service areas →
        </Link>
      </p>
    </section>
  );
}
