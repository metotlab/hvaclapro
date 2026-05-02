import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { StickyCallBar } from "@/components/layout/StickyCallBar";
import { JsonLd } from "@/components/JsonLd";
import { Analytics } from "@/components/Analytics";
import { localBusinessSchema } from "@/lib/seo/generateSchema";
import { SITE } from "@/lib/seo/constants";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter", display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: `${SITE.name} — HVAC Repair & Service in Los Angeles, CA`,
    template: `%s | ${SITE.name}`,
  },
  description: `Licensed C-20 HVAC contractor serving ${SITE.address.serviceArea}. Same-day AC repair, furnace service, and emergency HVAC.`,
  verification: {
    google: process.env.NEXT_PUBLIC_GSC_VERIFICATION,
  },
  openGraph: {
    siteName: SITE.name,
    locale: "en_US",
    images: [{ url: SITE.ogImage, width: 1200, height: 630, alt: SITE.name }],
  },
  twitter: {
    card: "summary_large_image",
    images: [SITE.ogImage],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} antialiased`}>
      <body className="min-h-screen flex flex-col">
        <a href="#main" className="skip-link">Skip to main content</a>
        <JsonLd data={localBusinessSchema()} />
        <Header />
        <main id="main" className="flex-1 pb-16 md:pb-0">{children}</main>
        <Footer />
        <StickyCallBar />
        <Analytics />
      </body>
    </html>
  );
}
