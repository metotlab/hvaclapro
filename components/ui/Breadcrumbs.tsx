import Link from "next/link";
import { ChevronRight } from "lucide-react";

export type Crumb = { name: string; url: string };

export function Breadcrumbs({ items }: { items: Crumb[] }) {
  return (
    <nav aria-label="Breadcrumb" className="text-sm text-muted">
      <ol className="flex flex-wrap items-center gap-1">
        {items.map((c, i) => {
          const last = i === items.length - 1;
          return (
            <li key={i} className="flex items-center gap-1">
              {last ? (
                <span aria-current="page" className="text-primary">{c.name}</span>
              ) : (
                <Link href={c.url} className="hover:text-accent">{c.name}</Link>
              )}
              {!last && <ChevronRight size={14} aria-hidden />}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
