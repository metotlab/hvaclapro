import Image from "next/image";
import Link from "next/link";
import { ChevronRight, Phone } from "lucide-react";
import type { Frontmatter } from "@/lib/content/frontmatterSchema";
import { PhoneButton } from "@/components/ui/PhoneButton";
import { SITE } from "@/lib/seo/constants";

const ACRONYMS = new Set(["ac", "hvac", "epa", "seer", "btu", "la", "r-22", "r-410a", "r-454b", "uv", "diy", "ahu"]);

function slugToTitle(slug: string): string {
  return slug
    .replace(/-/g, " ")
    .split(" ")
    .map((word) => ACRONYMS.has(word.toLowerCase()) ? word.toUpperCase() : word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

export function CauseList({ items, title }: { items: string[]; title: string }) {
  return (
    <section className="my-8">
      <h2 className="text-primary mb-4">{title}</h2>
      <div className="space-y-4">
        {items.map((c, i) => {
          const [head, ...rest] = c.split(" — ");
          return (
            <div key={c} className="flex gap-3">
              <span className="flex-shrink-0 w-7 h-7 rounded-full bg-accent text-white text-xs font-bold flex items-center justify-center mt-0.5">
                {i + 1}
              </span>
              <div>
                <h3 className="text-primary font-semibold mb-1 mt-0">{head}</h3>
                {rest.length > 0 && <p className="text-muted text-sm">{rest.join(" — ")}</p>}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}

export function StepList({ items, title }: { items: string[]; title: string }) {
  return (
    <section className="my-8">
      <h2 className="text-primary mb-4">{title}</h2>
      <ol className="space-y-4">
        {items.map((c, i) => {
          const [head, ...rest] = c.split(" — ");
          return (
            <li key={c} className="flex gap-3">
              <span className="flex-shrink-0 w-7 h-7 rounded-full bg-accent text-white text-sm font-bold flex items-center justify-center">{i + 1}</span>
              <div>
                <span className="text-primary font-semibold">{head}</span>
                {rest.length > 0 && <p className="text-muted text-sm mt-0.5">{rest.join(" — ")}</p>}
              </div>
            </li>
          );
        })}
      </ol>
    </section>
  );
}

export function PriceBox({ price }: { price: NonNullable<Frontmatter["priceRange"]> }) {
  return (
    <aside className="my-8 border-l-4 border-accent bg-primary text-white p-5 rounded">
      <div className="text-xs uppercase tracking-widest text-white/60 mb-1">Typical Cost in Los Angeles</div>
      <div className="text-3xl font-bold mt-1">
        ${price.min}–${price.max.toLocaleString('en-US')}
      </div>
      <div className="text-sm text-white/70 mt-0.5">{price.unit}</div>
      <div className="text-xs text-white/50 mt-3 border-t border-white/20 pt-3">
        Final price quoted before work begins
      </div>
    </aside>
  );
}

export function CalloutBox({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <aside className="my-8 border border-accent bg-orange-50/50 p-5 rounded-lg">
      <div className="font-semibold text-primary mb-2">{title}</div>
      <div className="text-primary">{children}</div>
    </aside>
  );
}

export function RelatedPages({ links }: { links?: string[] }) {
  if (!links || links.length === 0) return null;
  return (
    <section className="my-8">
      <h2 className="text-primary mb-3">Related Pages</h2>
      <ul className="grid md:grid-cols-3 gap-3">
        {links.slice(0, 3).map((href) => (
          <li key={href}>
            <Link
              href={href}
              className="flex items-center justify-between border border-border rounded-lg p-4 hover:border-accent hover:shadow-sm hover:-translate-y-px bg-white text-primary font-medium transition-all duration-200 group"
            >
              <span>{slugToTitle(href.split("/").pop() ?? "")}</span>
              <ChevronRight size={15} className="text-accent shrink-0 group-hover:translate-x-0.5 transition-transform" aria-hidden />
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}

export function HeroImage({ src, alt }: { src: string; alt: string }) {
  return (
    <div className="relative rounded-xl overflow-hidden my-6 aspect-[16/7] shadow-md">
      <Image
        src={src}
        alt={alt}
        fill
        className="object-cover"
        sizes="(max-width: 768px) 100vw, 700px"
      />
    </div>
  );
}

export function InlinePhoneCTA({ text = "Talk to a licensed technician now" }: { text?: string }) {
  return (
    <div className="my-8 flex flex-col sm:flex-row sm:items-center gap-4 bg-primary/5 border-l-4 border-primary rounded-lg p-5">
      <div className="flex-1 font-bold text-primary">{text}</div>
      <a
        href={`tel:${SITE.phoneRaw}`}
        aria-label={`Call ${SITE.name}`}
        className="inline-flex items-center gap-2 bg-accent hover:bg-accent-hover text-white font-semibold rounded-lg px-5 py-3 transition-colors whitespace-nowrap"
      >
        <Phone size={16} aria-hidden />
        {SITE.phone}
      </a>
    </div>
  );
}
