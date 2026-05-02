import { SITE } from "@/lib/seo/constants";

export function TrustBar() {
  const p = SITE.placeholders;
  const stats = [
    { v: `${p.yearsExperience}+`, l: "Years Experience" },
    { v: `${p.jobsCompleted.toLocaleString('en-US')}+`, l: "Jobs Completed" },
    { v: `${p.responseTimeMinutes}-Min`, l: "Avg. Response" },
    { v: "100%", l: "Satisfaction Guarantee" },
  ];
  return (
    <section className="bg-white border-y border-border">
      <div className="max-w-6xl mx-auto px-4 py-5 grid grid-cols-2 md:grid-cols-4 divide-x divide-border">
        {stats.map((s) => (
          <div key={s.l} className="text-center px-4">
            <div className="text-2xl md:text-3xl font-bold text-primary tracking-tight">{s.v}</div>
            <div className="text-xs uppercase tracking-wider text-muted mt-1">{s.l}</div>
          </div>
        ))}
      </div>
    </section>
  );
}
