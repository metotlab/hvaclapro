import { Phone } from "lucide-react";
import { SITE } from "@/lib/seo/constants";

type Props = {
  variant?: "primary" | "ghost" | "block";
  label?: string;
  className?: string;
};

export function PhoneButton({ variant = "primary", label, className = "" }: Props) {
  const text = label ?? `Call ${SITE.phone}`;
  const base = "inline-flex items-center justify-center gap-2 font-semibold rounded-lg transition-colors";
  const styles =
    variant === "primary"
      ? "bg-accent hover:bg-accent-hover text-white px-5 py-3 text-base"
      : variant === "block"
      ? "bg-accent hover:bg-accent-hover text-white w-full py-4 text-lg"
      : "text-primary hover:text-accent px-3 py-2";
  return (
    <a
      href={`tel:${SITE.phoneRaw}`}
      aria-label={`Call ${SITE.name} at ${SITE.phone}`}
      className={`${base} ${styles} ${className}`}
    >
      <Phone size={18} aria-hidden /> {text}
    </a>
  );
}
