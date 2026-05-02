import Link from "next/link";
import { Snowflake, Wrench, Flame, Thermometer, Zap, Settings, Wind, Cpu, ChevronRight } from "lucide-react";

const SERVICES = [
  { icon: <Wrench size={22} />, title: "AC Repair", href: "/services/ac-repair-los-angeles", desc: "Same-day diagnosis and repair." },
  { icon: <Snowflake size={22} />, title: "AC Installation", href: "/services/ac-installation-los-angeles", desc: "New system installs and replacements." },
  { icon: <Flame size={22} />, title: "Furnace Repair", href: "/services/furnace-repair-los-angeles", desc: "Heating diagnosis and repair." },
  { icon: <Thermometer size={22} />, title: "Heat Pump", href: "/services/heat-pump-services-los-angeles", desc: "Heat pump service and install." },
  { icon: <Zap size={22} />, title: "Emergency Service", href: "/services/emergency-ac-repair-los-angeles", desc: "24/7 urgent HVAC response." },
  { icon: <Settings size={22} />, title: "AC Tune-Up", href: "/services/ac-tune-up-los-angeles", desc: "Annual maintenance to prevent breakdowns." },
  { icon: <Wind size={22} />, title: "Duct Repair", href: "/services/duct-repair-los-angeles", desc: "Leak repair and balancing." },
  { icon: <Cpu size={22} />, title: "Smart Thermostat", href: "/services/smart-thermostat-installation-los-angeles", desc: "Nest, Ecobee, Honeywell setup." },
];

export function ServicesGrid() {
  return (
    <section className="max-w-6xl mx-auto px-4 py-14">
      <div className="mb-8">
        <h2 className="text-primary mb-2">HVAC Services in Los Angeles</h2>
        <p className="text-muted">Same-day service across LA County — licensed, flat-rate, no surprises.</p>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {SERVICES.map((s) => (
          <Link
            key={s.title}
            href={s.href}
            className="group relative bg-white border border-border rounded-lg overflow-hidden hover:border-accent hover:shadow-md transition-all duration-200 flex flex-col"
          >
            {/* Orange left accent bar */}
            <div className="absolute left-0 top-0 bottom-0 w-1 bg-accent" aria-hidden />
            <div className="pl-5 pr-4 pt-4 pb-4 flex flex-col flex-1">
              <div className="text-accent mb-3">{s.icon}</div>
              <div className="font-semibold text-primary text-sm mb-1 leading-snug">{s.title}</div>
              <p className="text-muted text-xs flex-1">{s.desc}</p>
              <div className="mt-3 flex items-center justify-end">
                <ChevronRight size={14} className="text-accent group-hover:translate-x-0.5 transition-transform" aria-hidden />
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
