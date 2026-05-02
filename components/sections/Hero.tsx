import Image from "next/image";
import { Phone } from "lucide-react";
import { ShieldCheck, CheckCircle2, Star, Zap, MapPin } from "lucide-react";
import { SITE } from "@/lib/seo/constants";

export function Hero() {
  return (
    <section className="bg-gradient-to-b from-slate-50 to-white">
      <div className="max-w-6xl mx-auto px-4 py-10 md:py-16 grid md:grid-cols-2 gap-10 items-center">
        {/* Left column */}
        <div>
          {/* Badge */}
          <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-accent bg-orange-50 border border-orange-200 rounded-full px-3 py-1 mb-5">
            <ShieldCheck size={13} aria-hidden />
            Licensed C-20 HVAC Contractor · Los Angeles County
          </div>

          <h1 className="text-primary mb-4">
            HVAC Repair &amp; Service in Los Angeles, CA
          </h1>

          <p className="text-lg text-muted mb-7 leading-relaxed">
            Same-day AC repair, furnace service, and emergency HVAC across LA County.
            Flat-rate pricing — you see the quote before any work begins.
          </p>

          {/* CTA row */}
          <div className="flex flex-wrap gap-3 mb-7">
            <a
              href={`tel:${SITE.phoneRaw}`}
              aria-label={`Call ${SITE.name} at ${SITE.phone}`}
              className="inline-flex items-center gap-2 bg-accent hover:bg-accent-hover text-white font-bold rounded-lg px-6 py-3.5 text-lg transition-colors"
            >
              <Phone size={20} aria-hidden />
              {SITE.phone}
            </a>
            <a
              href="/contact"
              className="inline-flex items-center justify-center font-semibold rounded-lg px-5 py-3.5 border-2 border-primary text-primary hover:bg-primary hover:text-white transition-colors"
            >
              Get Free Estimate
            </a>
          </div>

          {/* Trust row */}
          <div className="flex flex-wrap gap-x-5 gap-y-2">
            <span className="inline-flex items-center gap-1.5 text-sm text-muted">
              <Star size={14} className="text-accent" aria-hidden />
              <span className="font-semibold text-primary">{SITE.placeholders.rating}</span> Rated
            </span>
            <span className="inline-flex items-center gap-1.5 text-sm text-muted">
              <CheckCircle2 size={14} className="text-accent" aria-hidden />
              Licensed &amp; Insured
            </span>
            <span className="inline-flex items-center gap-1.5 text-sm text-muted">
              <Zap size={14} className="text-accent" aria-hidden />
              Same-Day Service
            </span>
            <span className="inline-flex items-center gap-1.5 text-sm text-muted">
              <MapPin size={14} className="text-accent" aria-hidden />
              LA County
            </span>
          </div>
        </div>

        {/* Right column — image */}
        <div className="relative rounded-xl overflow-hidden shadow-lg aspect-[4/3] order-first md:order-last">
          <Image
            src="/hero/hero-tech.jpg"
            alt="Licensed HVAC technician servicing an AC unit in Los Angeles"
            fill
            className="object-cover"
            priority
            sizes="(max-width: 768px) 100vw, 50vw"
          />
          {/* Bottom strip */}
          <div className="absolute bottom-0 left-0 right-0 bg-primary/85 px-4 py-2.5 text-white text-xs font-semibold tracking-wide text-center">
            C-20 Licensed · Insured · Flat-Rate Pricing
          </div>
        </div>
      </div>
    </section>
  );
}
