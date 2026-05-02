import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getAllSlugs, getPageBySlug } from "@/lib/content/registry";
import { BrandPage } from "@/components/page-types/BrandPage";
import { MDX } from "@/lib/content/mdx";
import { buildMetadata } from "@/lib/seo/generateMetadata";

type Params = { slug: string };

export function generateStaticParams() {
  return getAllSlugs("brands").map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { slug } = await params;
  const page = getPageBySlug("brands", slug);
  if (!page) return {};
  return buildMetadata(page.frontmatter, `/brands/${slug}`);
}

export default async function Page({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const page = getPageBySlug("brands", slug);
  if (!page) notFound();
  const urlPath = `/brands/${slug}`;
  const crumbs = [
    { name: "Home", url: "/" },
    { name: "Brands", url: "/brands" },
    { name: page.frontmatter.breadcrumbLabel ?? page.frontmatter.h1, url: urlPath },
  ];
  return (
    <BrandPage frontmatter={page.frontmatter} crumbs={crumbs} urlPath={urlPath}>
      <MDX source={page.content} />
    </BrandPage>
  );
}
