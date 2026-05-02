import Link from "next/link";
import type { ContentCategory } from "@/lib/content/frontmatterSchema";
import { getAllPages } from "@/lib/content/registry";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { CTA } from "@/components/sections/CTA";
import { JsonLd } from "@/components/JsonLd";
import { breadcrumbSchema } from "@/lib/seo/generateSchema";

export function CategoryIndex({
  category,
  title,
  intro,
  label,
}: {
  category: ContentCategory;
  title: string;
  intro: string;
  label: string;
}) {
  const pages = getAllPages(category).filter((p) => !p.frontmatter.noindex);
  const crumbs = [
    { name: "Home", url: "/" },
    { name: label, url: `/${category}` },
  ];
  return (
    <>
      <JsonLd data={breadcrumbSchema(crumbs)} />
      <div className="max-w-3xl mx-auto px-4 py-8">
        <Breadcrumbs items={crumbs} />
        <h1 className="text-primary mt-3 mb-4">{title}</h1>
        <p className="text-muted mb-6">{intro}</p>
        <ul className="grid gap-3">
          {pages.map((p) => (
            <li key={p.slug}>
              <Link
                href={`/${category}/${p.slug}`}
                className="block border border-border rounded-lg p-4 hover:border-accent hover:shadow-sm bg-white"
              >
                <div className="font-semibold text-primary">{p.frontmatter.h1}</div>
                <div className="text-sm text-muted mt-1">{p.frontmatter.description}</div>
              </Link>
            </li>
          ))}
        </ul>
      </div>
      <CTA />
    </>
  );
}
