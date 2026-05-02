import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { FrontmatterSchema, type Frontmatter, type ContentCategory } from "./frontmatterSchema";

const CONTENT_DIR = path.join(process.cwd(), "content");

function categoryDir(category: ContentCategory) {
  return path.join(CONTENT_DIR, category);
}

export function getAllSlugs(category: ContentCategory): string[] {
  const dir = categoryDir(category);
  if (!fs.existsSync(dir)) return [];
  return fs
    .readdirSync(dir)
    .filter((f) => f.endsWith(".mdx"))
    .map((f) => f.replace(/\.mdx$/, ""));
}

export function getPageBySlug(
  category: ContentCategory,
  slug: string,
): { frontmatter: Frontmatter; content: string } | null {
  const filePath = path.join(categoryDir(category), `${slug}.mdx`);
  if (!fs.existsSync(filePath)) return null;
  const raw = fs.readFileSync(filePath, "utf8");
  const { data, content } = matter(raw);
  const result = FrontmatterSchema.safeParse(data);
  if (!result.success) {
    throw new Error(
      `Invalid frontmatter in ${filePath}:\n${JSON.stringify(result.error.issues, null, 2)}`,
    );
  }
  return { frontmatter: result.data, content };
}

export function getAllPages(category: ContentCategory) {
  return getAllSlugs(category)
    .map((slug) => {
      const page = getPageBySlug(category, slug);
      return page ? { slug, ...page } : null;
    })
    .filter((x): x is { slug: string; frontmatter: Frontmatter; content: string } => x !== null);
}

export const ALL_CATEGORIES: ContentCategory[] = [
  "problems", "brands", "cost", "services", "locations", "blog",
];
