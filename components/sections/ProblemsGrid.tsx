import Link from "next/link";
import { AlertTriangle, ChevronRight } from "lucide-react";

const PROBLEMS = [
  { title: "AC Not Cooling During the Day", href: "/problems/ac-not-cooling-during-day-los-angeles", desc: "Cools at night but not in afternoon heat." },
  { title: "AC Won't Cool Below 80°", href: "/problems/ac-wont-cool-below-80-los-angeles", desc: "System runs but can't keep up with LA heat." },
  { title: "One Room Always Hot", href: "/problems/one-room-not-getting-cold-air-los-angeles", desc: "Uneven cooling — usually a duct issue." },
  { title: "Burning Smell from AC", href: "/problems/ac-smells-like-burning-los-angeles", desc: "When it's harmless and when it's dangerous." },
  { title: "Goodman AC Not Cooling", href: "/brands/goodman-ac-not-cooling-los-angeles", desc: "Brand-specific failure modes." },
  { title: "Carrier AC Not Cooling", href: "/brands/carrier-ac-not-cooling-los-angeles", desc: "Common Carrier issues in LA." },
];

export function ProblemsGrid() {
  return (
    <section className="bg-slate-50">
      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="mb-8">
          <h2 className="text-primary mb-2">Common Problems We Fix</h2>
          <p className="text-muted">Specific to LA homes — aging systems, Valley heat, coastal corrosion, apartment constraints.</p>
        </div>
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-3">
          {PROBLEMS.map((p) => (
            <Link
              key={p.title}
              href={p.href}
              className="group relative bg-white border border-border border-l-4 border-l-accent rounded-lg overflow-hidden hover:border-accent hover:shadow-md transition-all duration-200 flex items-start gap-3 p-5"
            >
              <AlertTriangle size={18} className="text-accent shrink-0 mt-0.5" aria-hidden />
              <div className="flex-1 min-w-0">
                <div className="font-semibold text-primary text-sm mb-1 leading-snug">{p.title}</div>
                <p className="text-muted text-xs">{p.desc}</p>
              </div>
              <ChevronRight size={14} className="text-accent shrink-0 self-center group-hover:translate-x-0.5 transition-transform" aria-hidden />
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
