import type { Metadata } from "next";
import { SITE } from "@/lib/seo/constants";
import { CategoryIndex } from "@/components/page-types/CategoryIndex";

export const metadata: Metadata = {
  title: "HVAC Repair Cost Guides — Los Angeles",
  description: "Real local pricing for AC repair, refrigerant leak repair, fan motor and capacitor replacement in Los Angeles. C-20 licensed.",
  alternates: { canonical: `${SITE.url}/cost` },
};

export default function Page() {
  return (
    <CategoryIndex
      category="cost"
      label="Cost Guides"
      title="HVAC Repair Cost Guides — Los Angeles"
      intro="Honest, local pricing for the most common HVAC repairs in Los Angeles. No upsells, no fake review claims — just current LA market rates."
    />
  );
}
