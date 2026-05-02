import Link from "next/link";

type Props = {
  href: string;
  children: React.ReactNode;
  variant?: "primary" | "outline";
  className?: string;
};

export function Button({ href, children, variant = "primary", className = "" }: Props) {
  const base = "inline-flex items-center justify-center font-semibold rounded-lg px-5 py-3 transition-colors";
  const styles =
    variant === "primary"
      ? "bg-primary hover:bg-primary-hover text-white"
      : "border border-primary text-primary hover:bg-primary hover:text-white";
  return (
    <Link href={href} className={`${base} ${styles} ${className}`}>
      {children}
    </Link>
  );
}
