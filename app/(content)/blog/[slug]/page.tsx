import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getAllSlugs, getPageBySlug } from "@/lib/content/registry";
import { BlogPage } from "@/components/page-types/BlogPage";
import { MDX } from "@/lib/content/mdx";
import { buildMetadata } from "@/lib/seo/generateMetadata";

type Params = { slug: string };

export function generateStaticParams() {
  return getAllSlugs("blog").map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { slug } = await params;
  const page = getPageBySlug("blog", slug);
  if (!page) return {};
  return buildMetadata(page.frontmatter, `/blog/${slug}`);
}

export default async function Page({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const page = getPageBySlug("blog", slug);
  if (!page) notFound();
  const urlPath = `/blog/${slug}`;
  const crumbs = [
    { name: "Home", url: "/" },
    { name: "Blog", url: "/blog" },
    { name: page.frontmatter.breadcrumbLabel ?? page.frontmatter.h1, url: urlPath },
  ];
  return (
    <BlogPage frontmatter={page.frontmatter} crumbs={crumbs} urlPath={urlPath}>
      <MDX source={page.content} />
    </BlogPage>
  );
}
