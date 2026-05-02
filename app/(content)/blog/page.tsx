import type { Metadata } from "next";
import { SITE } from "@/lib/seo/constants";
import { CategoryIndex } from "@/components/page-types/CategoryIndex";

export const metadata: Metadata = {
  title: "HVAC Blog — Los Angeles Homeowner Guides",
  description: "HVAC guides for Los Angeles homeowners. Heat wave prep, rebate breakdowns, refrigerant changes, smart thermostats, seasonal maintenance.",
  alternates: { canonical: `${SITE.url}/blog` },
};

export default function Page() {
  return (
    <CategoryIndex
      category="blog"
      label="Blog"
      title="HVAC Blog — Los Angeles Homeowner Guides"
      intro="Practical HVAC guides for Los Angeles homeowners. Heat wave prep, rebate programs, refrigerant changes, and seasonal maintenance — written by local C-20 technicians."
    />
  );
}
