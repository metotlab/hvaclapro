import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getAllSlugs, getPageBySlug } from "@/lib/content/registry";
import { LocationPage } from "@/components/page-types/LocationPage";
import { MDX } from "@/lib/content/mdx";
import { buildMetadata } from "@/lib/seo/generateMetadata";

type Params = { slug: string };

export function generateStaticParams() {
  return getAllSlugs("locations").map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { slug } = await params;
  const page = getPageBySlug("locations", slug);
  if (!page) return {};
  return buildMetadata(page.frontmatter, `/locations/${slug}`);
}

export default async function Page({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const page = getPageBySlug("locations", slug);
  if (!page) notFound();
  const urlPath = `/locations/${slug}`;
  const crumbs = [
    { name: "Home", url: "/" },
    { name: "Service Areas", url: "/locations" },
    { name: page.frontmatter.breadcrumbLabel ?? page.frontmatter.h1, url: urlPath },
  ];
  return (
    <LocationPage frontmatter={page.frontmatter} crumbs={crumbs} urlPath={urlPath}>
      <MDX source={page.content} />
    </LocationPage>
  );
}
