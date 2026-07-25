import { createFileRoute } from "@tanstack/react-router";
import { SiteHeader } from "@/components/site-header";
import { SiteHero } from "@/components/site-hero";
import { SiteFooter } from "@/components/site-footer";

const SITE_URL = "https://jksoft-connect-hub.lovable.app";
const OG_URL = `${SITE_URL}/og-home.svg`;
const TITLE = "JKSoft — WhatsApp Gateway untuk Otomatisasi Pesan Bisnis";
const DESCRIPTION =
  "JKSoft WhatsApp Gateway membantu bisnis mengirim notifikasi, OTP, dan kampanye promosi otomatis melalui WhatsApp dengan API yang andal dan mudah diintegrasikan.";

export const Route = createFileRoute("/")({
  component: Index,
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESCRIPTION },
      { property: "og:type", content: "website" },
      { property: "og:url", content: SITE_URL },
      { property: "og:image", content: OG_URL },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: TITLE },
      { name: "twitter:description", content: DESCRIPTION },
      { name: "twitter:image", content: OG_URL },
    ],
    links: [{ rel: "canonical", href: SITE_URL }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@graph": [
            {
              "@type": "Organization",
              name: "JKSoft",
              url: SITE_URL,
              logo: OG_URL,
              sameAs: [],
              contactPoint: {
                "@type": "ContactPoint",
                telephone: "+62-811-1234-5678",
                contactType: "customer support",
                email: "support@jksoft.id",
                areaServed: "ID",
                availableLanguage: ["Indonesian", "English"],
              },
            },
            {
              "@type": "WebSite",
              name: "JKSoft WhatsApp Gateway",
              url: SITE_URL,
              inLanguage: "id-ID",
            },
            {
              "@type": "SoftwareApplication",
              name: "JKSoft WhatsApp Gateway",
              applicationCategory: "BusinessApplication",
              operatingSystem: "Web",
              description: DESCRIPTION,
              offers: { "@type": "Offer", price: "0", priceCurrency: "IDR" },
            },
          ],
        }),
      },
    ],
  }),
});

function Index() {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <SiteHeader />
      <main className="flex-1">
        <SiteHero />
      </main>
      <SiteFooter />
    </div>
  );
}
