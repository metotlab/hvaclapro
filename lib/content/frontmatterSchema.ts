import { z } from "zod";

export const FrontmatterSchema = z.object({
  title: z.string().min(10).max(70),
  h1: z.string().min(10).max(100),
  breadcrumbLabel: z.string().min(2).max(50).optional(),
  description: z.string().min(120).max(160),
  pageType: z.enum(["problem", "brand", "cost", "service", "location", "blog"]),
  primaryKeyword: z.string(),
  supportingKeywords: z.array(z.string()),
  category: z.enum(["AC", "Furnace", "Heat Pump", "Thermostat", "Ductwork", "General"]),
  season: z.enum(["summer", "winter", "year-round", "spike"]),
  lastUpdated: z.string(),
  brand: z.string().optional(),
  heroImage: z.string().optional(),
  priceRange: z
    .object({ min: z.number(), max: z.number(), unit: z.string() })
    .optional(),
  faq: z
    .array(z.object({ question: z.string(), answer: z.string() }))
    .optional(),
  relatedPages: z.array(z.string()).optional(),
  causes: z.array(z.string()).optional(),
  diagnosisSteps: z.array(z.string()).optional(),
  ctaVariant: z.enum(["call", "estimate", "emergency"]).default("call"),
  noindex: z.boolean().default(false),
});

export type Frontmatter = z.infer<typeof FrontmatterSchema>;
export type ContentCategory = "problems" | "brands" | "cost" | "services" | "locations" | "blog";
