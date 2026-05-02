import Link from "next/link";
import { SITE } from "@/lib/seo/constants";

export function Footer() {
  return (
    <footer className="bg-primary text-white mt-16">
      <div className="max-w-6xl mx-auto px-4 py-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-4 text-sm">
        <div>
          <div className="font-bold text-lg mb-2">{SITE.name}</div>
          <p className="text-white/70">
            Licensed C-20 HVAC contractor serving {SITE.address.serviceArea}.
          </p>
          <p className="text-white/70 mt-2">License: {SITE.license}</p>
          <div className="mt-4 space-y-1 text-white/80">
            <div><a href={`tel:${SITE.phoneRaw}`} className="hover:text-accent">{SITE.phone}</a></div>
            <div><a href={`mailto:${SITE.email}`} className="hover:text-accent">{SITE.email}</a></div>
            <div>{SITE.hours}</div>
          </div>
        </div>
        <div>
          <div className="font-semibold mb-2">Services</div>
          <ul className="space-y-1 text-white/80">
            <li><Link href="/services/ac-repair-los-angeles" className="hover:text-accent">AC Repair</Link></li>
            <li><Link href="/services/emergency-ac-repair-los-angeles" className="hover:text-accent">Emergency AC Repair</Link></li>
            <li><Link href="/services/ac-installation-los-angeles" className="hover:text-accent">AC Installation</Link></li>
            <li><Link href="/services/ac-tune-up-los-angeles" className="hover:text-accent">AC Tune-Up</Link></li>
            <li><Link href="/services/furnace-repair-los-angeles" className="hover:text-accent">Furnace Repair</Link></li>
            <li><Link href="/services/heat-pump-services-los-angeles" className="hover:text-accent">Heat Pump Services</Link></li>
            <li><Link href="/services/duct-repair-los-angeles" className="hover:text-accent">Duct Repair</Link></li>
            <li><Link href="/services" className="hover:text-accent text-white/60">All Services →</Link></li>
          </ul>
        </div>
        <div>
          <div className="font-semibold mb-2">Service Areas</div>
          <ul className="space-y-1 text-white/80">
            <li><Link href="/locations/hvac-beverly-hills" className="hover:text-accent">Beverly Hills</Link></li>
            <li><Link href="/locations/hvac-santa-monica" className="hover:text-accent">Santa Monica</Link></li>
            <li><Link href="/locations/hvac-hollywood" className="hover:text-accent">Hollywood</Link></li>
            <li><Link href="/locations/hvac-pasadena" className="hover:text-accent">Pasadena</Link></li>
            <li><Link href="/locations/hvac-glendale" className="hover:text-accent">Glendale</Link></li>
            <li><Link href="/locations/hvac-sherman-oaks" className="hover:text-accent">Sherman Oaks</Link></li>
            <li><Link href="/locations/hvac-west-hollywood" className="hover:text-accent">West Hollywood</Link></li>
            <li><Link href="/locations" className="hover:text-accent text-white/60">All Areas →</Link></li>
          </ul>
        </div>
        <div>
          <div className="font-semibold mb-2">By Brand & Problem</div>
          <ul className="space-y-1 text-white/80">
            <li><Link href="/brands/goodman-ac-not-cooling-los-angeles" className="hover:text-accent">Goodman AC Repair</Link></li>
            <li><Link href="/brands/carrier-ac-not-cooling-los-angeles" className="hover:text-accent">Carrier AC Repair</Link></li>
            <li><Link href="/problems/ac-not-cooling-during-day-los-angeles" className="hover:text-accent">AC Not Cooling</Link></li>
            <li><Link href="/problems/ac-wont-cool-below-80-los-angeles" className="hover:text-accent">AC Won&apos;t Cool Below 80°</Link></li>
            <li><Link href="/cost/refrigerant-leak-repair-cost-los-angeles" className="hover:text-accent">Refrigerant Leak Cost</Link></li>
            <li><Link href="/cost/ac-capacitor-replacement-cost-los-angeles" className="hover:text-accent">Capacitor Replacement Cost</Link></li>
          </ul>
          <div className="font-semibold mb-2 mt-4">Company</div>
          <ul className="space-y-1 text-white/80">
            <li><Link href="/about" className="hover:text-accent">About</Link></li>
            <li><Link href="/contact" className="hover:text-accent">Contact</Link></li>
            <li><Link href="/blog" className="hover:text-accent">Blog</Link></li>
            <li><Link href="/privacy" className="hover:text-accent">Privacy</Link></li>
          </ul>
        </div>
      </div>
      <div className="border-t border-white/10 py-4 text-center text-xs text-white/60">
        © {new Date().getFullYear()} {SITE.name}. All rights reserved.
      </div>
    </footer>
  );
}
