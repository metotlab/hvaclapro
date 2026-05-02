import type { Metadata } from "next";
import { SITE } from "@/lib/seo/constants";

export const metadata: Metadata = {
  title: "Terms of Service",
  description: `Terms of service for ${SITE.name}.`,
  robots: { index: false, follow: false },
  alternates: { canonical: `${SITE.url}/terms` },
};

export default function Terms() {
  const updated = "April 28, 2026";
  return (
    <div className="max-w-3xl mx-auto px-4 py-10">
      <h1 className="text-primary mb-2">Terms of Service</h1>
      <p className="text-sm text-muted mb-6">Last updated: {updated}</p>

      <div className="prose prose-slate max-w-none">
        <p className="font-semibold text-amber-700 bg-amber-50 border-l-4 border-amber-400 p-3 rounded">
          DRAFT — This page must be reviewed by counsel before launch. The text below is a starting point intended for review, not a final legal document.
        </p>

        <h2>Acceptance of Terms</h2>
        <p>
          By using {SITE.url} or contacting {SITE.name} for HVAC service, you agree to these Terms of Service. If you do
          not agree, please do not use this website.
        </p>

        <h2>Service Estimates and Quotes</h2>
        <p>
          Cost ranges and pricing information shown on this website reflect typical Los Angeles market rates and are
          provided for general reference. Actual pricing depends on specific equipment, labor required, parts
          availability, and site conditions, and is provided in writing as a flat-rate quote at the time of service.
          Estimates given over the phone or via email before on-site diagnosis are preliminary and subject to revision
          after on-site evaluation.
        </p>

        <h2>Service Delivery</h2>
        <ul>
          <li>We schedule appointments in good faith but cannot guarantee specific arrival times during heat waves, emergency events, or when prior service runs longer than expected. We communicate updated arrival windows via call or text.</li>
          <li>Same-day service is offered subject to dispatch capacity. Response times during heat events may be extended.</li>
          <li>Repairs are warranted per the labor and parts warranties communicated at time of service.</li>
        </ul>

        <h2>Payment</h2>
        <p>
          Payment is due upon completion of work unless other arrangements are made in writing in advance. We accept
          major credit cards, debit cards, checks, and approved financing. A diagnostic fee may apply and is typically
          credited toward repair cost on the same visit.
        </p>

        <h2>Cancellations and No-Shows</h2>
        <p>
          We ask for as much notice as possible if you need to cancel or reschedule. Repeated no-shows may result in a
          dispatch fee being charged on subsequent appointments.
        </p>

        <h2>Limitation of Liability</h2>
        <p>
          To the fullest extent permitted by California law, our liability for any service is limited to the amount
          paid for that service. We are not liable for indirect, incidental, or consequential damages. Nothing in
          these terms limits liability that cannot be limited under applicable law.
        </p>

        <h2>Website Content</h2>
        <p>
          Information on this website (including cost ranges, technical descriptions, and seasonal advice) is provided
          for general educational purposes. It does not constitute professional advice for your specific situation.
          Always rely on a licensed C-20 technician&apos;s on-site diagnosis before making major HVAC decisions.
        </p>

        <h2>Intellectual Property</h2>
        <p>
          Content on this website is the property of {SITE.name}. You may share links and excerpts with attribution.
          Wholesale copying or redistribution requires written permission.
        </p>

        <h2>Governing Law</h2>
        <p>
          These terms are governed by the laws of the State of California. Any disputes will be resolved in the courts
          of Los Angeles County, California.
        </p>

        <h2>Changes to These Terms</h2>
        <p>
          We may update these terms periodically. Continued use of the website after updates constitutes acceptance of
          the revised terms.
        </p>

        <h2>Contact</h2>
        <p>
          Questions: <a href={`mailto:${SITE.email}`}>{SITE.email}</a> or <a href={`tel:${SITE.phoneRaw}`}>{SITE.phone}</a>.
        </p>
      </div>
    </div>
  );
}
