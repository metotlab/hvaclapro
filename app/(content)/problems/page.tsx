import type { Metadata } from "next";
import { SITE } from "@/lib/seo/constants";
import { CategoryIndex } from "@/components/page-types/CategoryIndex";

export const metadata: Metadata = {
  title: "Common HVAC Problems We Fix — Los Angeles",
  description: "Diagnosis guides for the most common AC and HVAC problems in Los Angeles homes. Symptoms, causes, and what it costs to fix.",
  alternates: { canonical: `${SITE.url}/problems` },
};

export default function Page() {
  return (
    <CategoryIndex
      category="problems"
      label="Problems"
      title="Common HVAC Problems We Fix — Los Angeles"
      intro="Symptom-by-symptom guides for the AC and heating problems we see most often in Los Angeles. Diagnosis steps, common causes, and current local repair costs."
    />
  );
}
