import type { MetadataRoute } from "next";
import { SITE } from "@/lib/seo/constants";
import { ALL_CATEGORIES, getAllPages } from "@/lib/content/registry";
import type { ContentCategory } from "@/lib/content/frontmatterSchema";

const PRIORITY: Record<ContentCategory, number> = {
  services: 0.9,
  brands: 0.8,
  problems: 0.8,
  cost: 0.8,
  locations: 0.8,
  blog: 0.7,
};

const STATIC_LASTMOD = "2026-04-28";

export default function sitemap(): MetadataRoute.Sitemap {
  const lm = new Date(STATIC_LASTMOD);
  const entries: MetadataRoute.Sitemap = [
    { url: `${SITE.url}/`, lastModified: lm, changeFrequency: "weekly", priority: 1.0 },
    { url: `${SITE.url}/about`, lastModified: lm, changeFrequency: "yearly", priority: 0.5 },
    { url: `${SITE.url}/contact`, lastModified: lm, changeFrequency: "yearly", priority: 0.5 },
    { url: `${SITE.url}/services`, lastModified: lm, changeFrequency: "monthly", priority: 0.7 },
    { url: `${SITE.url}/brands`, lastModified: lm, changeFrequency: "monthly", priority: 0.7 },
    { url: `${SITE.url}/problems`, lastModified: lm, changeFrequency: "monthly", priority: 0.7 },
    { url: `${SITE.url}/cost`, lastModified: lm, changeFrequency: "monthly", priority: 0.7 },
    { url: `${SITE.url}/locations`, lastModified: lm, changeFrequency: "monthly", priority: 0.7 },
    { url: `${SITE.url}/blog`, lastModified: lm, changeFrequency: "weekly", priority: 0.6 },
  ];

  for (const cat of ALL_CATEGORIES) {
    for (const page of getAllPages(cat)) {
      if (page.frontmatter.noindex) continue;
      entries.push({
        url: `${SITE.url}/${cat}/${page.slug}`,
        lastModified: new Date(page.frontmatter.lastUpdated),
        changeFrequency: cat === "blog" ? "monthly" : "monthly",
        priority: PRIORITY[cat],
      });
    }
  }
  return entries;
}
