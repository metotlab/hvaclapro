import Link from "next/link";
import { Phone, Mail, Clock, MapPin, CheckCircle2 } from "lucide-react";
import { SITE } from "@/lib/seo/constants";
import { ContactForm } from "@/components/forms/ContactForm";
import { GoogleMapEmbed } from "@/components/sections/GoogleMapEmbed";

export const metadata = {
  title: "Contact HVAC LA Pro",
  description: `Contact ${SITE.name} for AC repair and HVAC service across ${SITE.address.serviceArea}. Call or send a message — we respond same day.`,
};

const SERVICE_AREAS = [
  "Beverly Hills", "Santa Monica", "Hollywood", "West Hollywood",
  "Sherman Oaks", "Encino", "Studio City", "Pasadena",
  "Glendale", "Downtown LA", "Venice", "Culver City",
  "Silver Lake", "Los Feliz", "Mid-City",
];

const PROCESS = [
  "Call or send a message",
  "Technician dispatched with ETA confirmed",
  "Full diagnosis — flat-rate quote before work",
  "Repair completed and system tested",
];

export default function Contact() {
  return (
    <div className="max-w-5xl mx-auto px-4 py-12">

      {/* Page header */}
      <div className="mb-10">
        <h1 className="text-primary mb-3">Contact {SITE.name}</h1>
        <p className="text-lg text-muted max-w-2xl">
          Mobile HVAC service across {SITE.address.serviceArea}. Our technicians come to you —
          no office visits. Call for fastest response.
        </p>
      </div>

      {/* Top grid: contact info + service area */}
      <div className="grid md:grid-cols-2 gap-6 mb-10">

        {/* Contact info card */}
        <div className="bg-primary text-white rounded-xl p-8 flex flex-col gap-6">
          <div>
            <div className="text-xs uppercase tracking-widest text-white/50 mb-2">Phone</div>
            <a
              href={`tel:${SITE.phoneRaw}`}
              aria-label={`Call ${SITE.phone}`}
              className="text-3xl md:text-4xl font-bold text-accent hover:text-accent-hover transition-colors block"
            >
              {SITE.phone}
            </a>
          </div>

          <div className="grid grid-cols-1 gap-4 text-sm">
            <div className="flex items-start gap-3">
              <Clock size={16} className="text-white/50 shrink-0 mt-0.5" aria-hidden />
              <div>
                <div className="text-white/60 text-xs uppercase tracking-wide mb-0.5">Hours</div>
                <div className="text-white">{SITE.hours}</div>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Mail size={16} className="text-white/50 shrink-0 mt-0.5" aria-hidden />
              <div>
                <div className="text-white/60 text-xs uppercase tracking-wide mb-0.5">Email</div>
                <a
                  href={`mailto:${SITE.email}`}
                  className="text-white hover:text-accent transition-colors"
                >
                  {SITE.email}
                </a>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <MapPin size={16} className="text-white/50 shrink-0 mt-0.5" aria-hidden />
              <div>
                <div className="text-white/60 text-xs uppercase tracking-wide mb-0.5">Service</div>
                <div className="text-white">Mobile service — we come to you<br />across {SITE.address.serviceArea}</div>
              </div>
            </div>
          </div>

          {/* Process steps */}
          <div className="border-t border-white/10 pt-5">
            <div className="text-xs uppercase tracking-widest text-white/50 mb-3">How it works</div>
            <ol className="space-y-2">
              {PROCESS.map((step, i) => (
                <li key={step} className="flex items-start gap-2.5 text-sm text-white/80">
                  <span className="flex-shrink-0 w-5 h-5 rounded-full bg-accent/20 text-accent text-xs font-bold flex items-center justify-center mt-0.5">
                    {i + 1}
                  </span>
                  {step}
                </li>
              ))}
            </ol>
          </div>
        </div>

        {/* Service area panel */}
        <div className="bg-slate-50 border border-border rounded-xl p-8">
          <div className="flex items-center gap-2 text-primary font-bold mb-1">
            <MapPin size={18} className="text-accent" aria-hidden />
            Service Coverage
          </div>
          <p className="text-sm text-muted mb-5">
            We cover all of {SITE.address.serviceArea}. No office visit required — your technician comes to you.
          </p>

          {process.env.NEXT_PUBLIC_GBP_EMBED_URL ? (
            <GoogleMapEmbed className="mb-5 rounded-lg overflow-hidden" />
          ) : (
            <ul className="grid grid-cols-2 sm:grid-cols-3 gap-x-3 gap-y-2 mb-5">
              {SERVICE_AREAS.map((area) => (
                <li key={area} className="flex items-center gap-1.5 text-sm text-primary">
                  <CheckCircle2 size={13} className="text-accent shrink-0" aria-hidden />
                  {area}
                </li>
              ))}
            </ul>
          )}

          <div className="border-t border-border pt-4">
            <p className="text-xs text-muted mb-3">
              Plus all surrounding communities throughout LA County.
            </p>
            <Link
              href="/locations"
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-accent hover:underline underline-offset-2"
            >
              View all service areas →
            </Link>
          </div>
        </div>
      </div>

      {/* Contact form */}
      <div className="max-w-2xl">
        <h2 className="text-primary mb-2">Send a Message</h2>
        <p className="text-muted text-sm mb-6">
          Describe what&apos;s going on. We respond same day during business hours. For faster service, call directly.
        </p>
        <ContactForm />
      </div>

    </div>
  );
}
