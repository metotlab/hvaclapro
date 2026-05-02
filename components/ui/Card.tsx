import Link from "next/link";

export function Card({
  href,
  title,
  description,
  icon,
}: {
  href?: string;
  title: string;
  description?: string;
  icon?: React.ReactNode;
}) {
  const inner = (
    <div className="border border-border rounded-lg p-5 hover:border-accent hover:shadow-md transition-all h-full bg-white">
      {icon && <div className="text-accent mb-3">{icon}</div>}
      <h3 className="font-semibold text-primary mb-1 text-lg">{title}</h3>
      {description && <p className="text-muted text-sm">{description}</p>}
    </div>
  );
  return href ? <Link href={href}>{inner}</Link> : inner;
}
