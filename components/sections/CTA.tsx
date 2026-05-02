import { Phone } from "lucide-react";
import { SITE } from "@/lib/seo/constants";

export function CTA({
  title = "Get a Free Estimate Today",
  subtitle = "Talk to a licensed C-20 technician — no pressure, honest answers.",
}: {
  title?: string;
  subtitle?: string;
}) {
  return (
    <section className="bg-primary text-white">
      <div className="max-w-4xl mx-auto px-4 py-12 text-center">
        <h2 className="mb-3 text-white">{title}</h2>
        <p className="text-white/70 mb-8 text-lg">{subtitle}</p>
        <div className="flex flex-col sm:flex-row justify-center gap-3">
          <a
            href={`tel:${SITE.phoneRaw}`}
            aria-label={`Call ${SITE.name} at ${SITE.phone}`}
            className="inline-flex items-center justify-center gap-2 bg-accent hover:bg-accent-hover text-white font-bold rounded-lg px-7 py-3.5 text-lg transition-colors"
          >
            <Phone size={20} aria-hidden />
            Call Now — {SITE.phone}
          </a>
          <a
            href="/contact"
            className="inline-flex items-center justify-center font-semibold rounded-lg px-6 py-3.5 border-2 border-white/50 text-white hover:border-white hover:bg-white/10 transition-colors"
          >
            Send a Message
          </a>
        </div>
      </div>
    </section>
  );
}
