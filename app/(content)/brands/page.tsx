import type { Metadata } from "next";
import { SITE } from "@/lib/seo/constants";
import { CategoryIndex } from "@/components/page-types/CategoryIndex";

export const metadata: Metadata = {
  title: "HVAC Brand Service Guides — Los Angeles",
  description: "Brand-specific AC repair guides for Los Angeles homeowners. Goodman, Carrier, and other major brands. C-20 licensed local technicians.",
  alternates: { canonical: `${SITE.url}/brands` },
};

export default function Page() {
  return (
    <CategoryIndex
      category="brands"
      label="Brands"
      title="HVAC Brand Service Guides — Los Angeles"
      intro="Brand-specific failure modes, repair costs, and warranty notes for the AC systems most commonly installed in Los Angeles homes."
    />
  );
}
