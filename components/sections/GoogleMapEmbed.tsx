import { SITE } from "@/lib/seo/constants";

/**
 * GoogleMapEmbed — renders a Google Maps embed of the GBP location.
 *
 * Activated by NEXT_PUBLIC_GBP_EMBED_URL — paste the embed URL from
 * Google Maps "Share → Embed a map" for the GBP location.
 *
 * Until set, renders a graceful placeholder.
 */
export function GoogleMapEmbed({
  title = "Service Area Map",
  className = "",
}: {
  title?: string;
  className?: string;
}) {
  const embedUrl = process.env.NEXT_PUBLIC_GBP_EMBED_URL;

  if (!embedUrl) {
    return (
      <div
        className={`aspect-video bg-slate-100 border border-border rounded-lg flex items-center justify-center text-muted text-sm ${className}`}
      >
        Map of {SITE.address.serviceArea} — coming soon
      </div>
    );
  }

  return (
    <div className={`aspect-video rounded-lg overflow-hidden border border-border ${className}`}>
      <iframe
        src={embedUrl}
        title={title}
        width="100%"
        height="100%"
        style={{ border: 0 }}
        allowFullScreen
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
      />
    </div>
  );
}
