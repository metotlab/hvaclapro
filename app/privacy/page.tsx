import type { Metadata } from "next";
import { SITE } from "@/lib/seo/constants";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: `Privacy policy for ${SITE.name}.`,
  robots: { index: false, follow: false },
  alternates: { canonical: `${SITE.url}/privacy` },
};

export default function Privacy() {
  const updated = "April 28, 2026";
  return (
    <div className="max-w-3xl mx-auto px-4 py-10">
      <h1 className="text-primary mb-2">Privacy Policy</h1>
      <p className="text-sm text-muted mb-6">Last updated: {updated}</p>

      <div className="prose prose-slate max-w-none">
        <p className="font-semibold text-amber-700 bg-amber-50 border-l-4 border-amber-400 p-3 rounded">
          DRAFT — This page must be reviewed by counsel before launch. The text below is a starting point intended for review, not a final legal document.
        </p>

        <h2>Who We Are</h2>
        <p>
          {SITE.name} (&ldquo;we&rdquo;, &ldquo;us&rdquo;) operates this website at {SITE.url}. We are a California-licensed HVAC contractor (License: {SITE.license}) serving {SITE.address.serviceArea}.
        </p>

        <h2>What Information We Collect</h2>
        <ul>
          <li>
            <strong>Information you provide:</strong> when you submit our contact form or call us, we collect the
            name, phone number, email address (if provided), service type, and message you submit. When we dispatch a
            technician, we also collect your service address.
          </li>
          <li>
            <strong>Automatically collected:</strong> like most websites, we collect basic technical information
            including IP address, browser type, pages visited, and referring URL. This is collected via Google
            Analytics 4 (when active) and standard server logs.
          </li>
          <li>
            <strong>Cookies:</strong> we use minimal cookies — primarily for analytics. We do not currently use
            advertising cookies or tracking across other websites.
          </li>
        </ul>

        <h2>How We Use Your Information</h2>
        <ul>
          <li>To respond to service requests and schedule appointments</li>
          <li>To dispatch technicians and complete requested HVAC service</li>
          <li>To communicate with you about your service request, scheduling, and follow-up</li>
          <li>To improve our website and services through aggregated analytics</li>
          <li>To comply with legal obligations</li>
        </ul>
        <p>
          We do not sell your personal information. We do not share your information with third parties for their
          marketing purposes.
        </p>

        <h2>Who We Share Information With</h2>
        <ul>
          <li>
            <strong>Service providers:</strong> we share information with vendors who help us operate the business —
            scheduling software, payment processors, analytics services. These providers are contractually limited to
            using information only to perform services for us.
          </li>
          <li>
            <strong>Legal requirements:</strong> we may disclose information when required by law, court order, or to
            protect our rights, property, or safety, or that of our customers or others.
          </li>
        </ul>

        <h2>Your California Privacy Rights (CCPA / CPRA)</h2>
        <p>
          California residents have specific rights under the California Consumer Privacy Act (CCPA) and California
          Privacy Rights Act (CPRA), including:
        </p>
        <ul>
          <li>The right to know what personal information we collect, use, and disclose</li>
          <li>The right to delete personal information we have collected</li>
          <li>The right to correct inaccurate personal information</li>
          <li>The right to opt out of the sale or sharing of personal information (we do not sell or share)</li>
          <li>The right to limit use and disclosure of sensitive personal information</li>
          <li>The right to non-discrimination for exercising these rights</li>
        </ul>
        <p>
          To exercise any of these rights, contact us at <a href={`mailto:${SITE.email}`}>{SITE.email}</a> or call{" "}
          <a href={`tel:${SITE.phoneRaw}`}>{SITE.phone}</a>. We will respond within the timeframes required by
          California law (typically 45 days).
        </p>

        <h2>Data Retention</h2>
        <p>
          We retain personal information only as long as reasonably necessary for the purposes described above, or as
          required by law. Service records are typically retained for 7 years for tax and warranty purposes. Form
          submissions that do not result in service are retained for up to 12 months.
        </p>

        <h2>Security</h2>
        <p>
          We use reasonable technical and organizational measures to protect your information. No system is perfectly
          secure; we cannot guarantee absolute security of information transmitted to or stored by us.
        </p>

        <h2>Children&apos;s Privacy</h2>
        <p>
          Our services are not directed to children under 13, and we do not knowingly collect information from
          children under 13.
        </p>

        <h2>Changes to This Policy</h2>
        <p>
          We may update this policy periodically. The &ldquo;Last updated&rdquo; date at the top of this page reflects
          the most recent revision.
        </p>

        <h2>Contact Us</h2>
        <p>
          Questions about this policy: <a href={`mailto:${SITE.email}`}>{SITE.email}</a> or{" "}
          <a href={`tel:${SITE.phoneRaw}`}>{SITE.phone}</a>.
        </p>
      </div>
    </div>
  );
}
