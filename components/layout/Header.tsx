import Link from "next/link";
import { Wind } from "lucide-react";
import { SITE } from "@/lib/seo/constants";
import { PhoneButton } from "@/components/ui/PhoneButton";
import { MobileNav } from "./MobileNav";

export function Header() {
  return (
    <header className="relative bg-white border-b border-border sticky top-0 z-30">
      <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between gap-4">
        <Link href="/" className="flex items-center gap-2 text-primary font-bold">
          <Wind className="text-accent" size={24} aria-hidden />
          <span className="text-lg">{SITE.name}</span>
        </Link>
        <nav aria-label="Primary" className="hidden md:flex items-center gap-6 text-sm font-medium text-primary">
          <Link href="/services" className="hover:text-accent">Services</Link>
          <Link href="/locations" className="hover:text-accent">Areas</Link>
          <Link href="/about" className="hover:text-accent">About</Link>
          <Link href="/contact" className="hover:text-accent">Contact</Link>
        </nav>
        <div className="hidden md:flex items-center gap-3">
          <a
            href={`tel:${SITE.phoneRaw}`}
            className="text-primary font-semibold hover:text-accent"
            aria-label={`Call ${SITE.phone}`}
          >
            {SITE.phone}
          </a>
          <PhoneButton label="Free Estimate" />
        </div>
        <div className="flex md:hidden items-center gap-1">
          <a
            href={`tel:${SITE.phoneRaw}`}
            aria-label={`Call ${SITE.phone}`}
            className="p-2 text-accent font-bold"
          >
            📞
          </a>
          <MobileNav />
        </div>
      </div>
    </header>
  );
}
