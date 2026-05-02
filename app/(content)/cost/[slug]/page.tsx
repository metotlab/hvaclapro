import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getAllSlugs, getPageBySlug } from "@/lib/content/registry";
import { CostPage } from "@/components/page-types/CostPage";
import { MDX } from "@/lib/content/mdx";
import { buildMetadata } from "@/lib/seo/generateMetadata";

type Params = { slug: string };

export function generateStaticParams() {
  return getAllSlugs("cost").map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { slug } = await params;
  const page = getPageBySlug("cost", slug);
  if (!page) return {};
  return buildMetadata(page.frontmatter, `/cost/${slug}`);
}

export default async function Page({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const page = getPageBySlug("cost", slug);
  if (!page) notFound();
  const urlPath = `/cost/${slug}`;
  const crumbs = [
    { name: "Home", url: "/" },
    { name: "Cost Guides", url: "/cost" },
    { name: page.frontmatter.breadcrumbLabel ?? page.frontmatter.h1, url: urlPath },
  ];
  return (
    <CostPage frontmatter={page.frontmatter} crumbs={crumbs} urlPath={urlPath}>
      <MDX source={page.content} />
    </CostPage>
  );
}
