import type { Metadata } from "next";
import { SITE } from "./constants";
import type { Frontmatter } from "@/lib/content/frontmatterSchema";

export function buildMetadata(fm: Frontmatter, urlPath: string): Metadata {
  const url = `${SITE.url}${urlPath}`;
  const ogType: "article" | "website" =
    fm.pageType === "service" || fm.pageType === "location" ? "website" : "article";
  return {
    title: fm.title,
    description: fm.description,
    alternates: { canonical: url },
    openGraph: {
      title: fm.title,
      description: fm.description,
      url,
      siteName: SITE.name,
      type: ogType,
      images: [{ url: SITE.ogImage, width: 1200, height: 630, alt: fm.h1 }],
    },
    twitter: {
      card: "summary_large_image",
      title: fm.title,
      description: fm.description,
      images: [SITE.ogImage],
    },
    robots: fm.noindex ? { index: false, follow: false } : { index: true, follow: true },
  };
}
