import { Phone } from "lucide-react";
import { SITE } from "@/lib/seo/constants";

export function StickyCallBar() {
  return (
    <div
      className="md:hidden fixed bottom-0 inset-x-0 z-50 bg-primary px-3 pt-2 pb-[calc(0.5rem+env(safe-area-inset-bottom))]"
      style={{ paddingBottom: "calc(0.5rem + env(safe-area-inset-bottom))" }}
    >
      <a
        href={`tel:${SITE.phoneRaw}`}
        aria-label={`Call ${SITE.name} at ${SITE.phone}`}
        className="flex items-center justify-center gap-2 w-full bg-accent hover:bg-accent-hover text-white font-bold py-3 rounded-lg text-base transition-colors"
      >
        <Phone size={18} aria-hidden />
        <span>Call Now —</span>
        <span>{SITE.phone}</span>
      </a>
    </div>
  );
}
