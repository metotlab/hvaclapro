import type { Metadata } from "next";
import { SITE } from "@/lib/seo/constants";
import { CategoryIndex } from "@/components/page-types/CategoryIndex";

export const metadata: Metadata = {
  title: "HVAC Service Areas in Los Angeles County",
  description: "HVAC service across Los Angeles County. Sherman Oaks, Encino, Pasadena, Studio City, Beverly Hills, Santa Monica and surrounding neighborhoods.",
  alternates: { canonical: `${SITE.url}/locations` },
};

export default function Page() {
  return (
    <CategoryIndex
      category="locations"
      label="Service Areas"
      title="HVAC Service Areas — Los Angeles County"
      intro="Local HVAC technicians serving Los Angeles County. Each neighborhood has its own climate, housing stock, and typical HVAC issues — pages below cover the specifics for each area."
    />
  );
}
