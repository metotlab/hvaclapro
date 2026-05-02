import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getAllSlugs, getPageBySlug } from "@/lib/content/registry";
import { ServicePage } from "@/components/page-types/ServicePage";
import { MDX } from "@/lib/content/mdx";
import { buildMetadata } from "@/lib/seo/generateMetadata";

type Params = { slug: string };

export function generateStaticParams() {
  return getAllSlugs("services").map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { slug } = await params;
  const page = getPageBySlug("services", slug);
  if (!page) return {};
  return buildMetadata(page.frontmatter, `/services/${slug}`);
}

export default async function Page({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const page = getPageBySlug("services", slug);
  if (!page) notFound();
  const urlPath = `/services/${slug}`;
  const crumbs = [
    { name: "Home", url: "/" },
    { name: "Services", url: "/services" },
    { name: page.frontmatter.breadcrumbLabel ?? page.frontmatter.h1, url: urlPath },
  ];
  return (
    <ServicePage frontmatter={page.frontmatter} crumbs={crumbs} urlPath={urlPath}>
      <MDX source={page.content} />
    </ServicePage>
  );
}
