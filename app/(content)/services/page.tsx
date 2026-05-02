import type { Metadata } from "next";
import { SITE } from "@/lib/seo/constants";
import { CategoryIndex } from "@/components/page-types/CategoryIndex";

export const metadata: Metadata = {
  title: "HVAC Services in Los Angeles",
  description: "AC repair, furnace service, emergency HVAC and tune-ups across Los Angeles County. C-20 licensed technicians, same-day service.",
  alternates: { canonical: `${SITE.url}/services` },
};

export default function Page() {
  return (
    <CategoryIndex
      category="services"
      label="Services"
      title="HVAC Services in Los Angeles"
      intro="Same-day AC repair, emergency HVAC, and full-system service across Los Angeles County. Licensed C-20 technicians, flat-rate pricing."
    />
  );
}
