import Image from "next/image";
import { User } from "lucide-react";
import { TEAM } from "@/lib/team";

export function TeamSection({ heading = "Our Team" }: { heading?: string }) {
  if (TEAM.length === 0) return null;
  return (
    <section className="my-10">
      <h2 className="text-primary mb-4">{heading}</h2>
      <ul className="grid sm:grid-cols-2 gap-4">
        {TEAM.map((m) => (
          <li
            key={m.name}
            className="bg-white border border-border rounded-lg p-5 flex gap-4"
          >
            <div className="shrink-0">
              {m.photo ? (
                <Image
                  src={m.photo}
                  alt={`${m.name}, ${m.role}`}
                  width={80}
                  height={80}
                  className="rounded-full object-cover w-20 h-20"
                />
              ) : (
                <div className="w-20 h-20 rounded-full bg-slate-100 flex items-center justify-center text-muted">
                  <User size={32} aria-hidden />
                </div>
              )}
            </div>
            <div className="min-w-0">
              <div className="font-semibold text-primary">{m.name}</div>
              <div className="text-sm text-muted mb-1">{m.role}</div>
              {m.yearsExperience && (
                <div className="text-xs text-muted">
                  {m.yearsExperience}+ years experience
                </div>
              )}
              {m.certifications && m.certifications.length > 0 && (
                <div className="text-xs text-muted">{m.certifications.join(" · ")}</div>
              )}
              {m.bio && <p className="text-sm text-primary mt-2">{m.bio}</p>}
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}
