import { createFileRoute } from "@tanstack/react-router";
import ogImage from "../../public/og-image.jpg.asset.json";
import { SiteHeader } from "@/components/site-header";
import { SiteHero } from "@/components/site-hero";
import { SiteFooter } from "@/components/site-footer";

const OG_URL = `https://id-preview--5e88fabe-7e0e-4c98-9677-b4ff9628d57c.lovable.app${ogImage.url}`;
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
      { property: "og:url", content: "/" },
      { property: "og:image", content: OG_URL },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: TITLE },
      { name: "twitter:description", content: DESCRIPTION },
      { name: "twitter:image", content: OG_URL },
    ],
    links: [{ rel: "canonical", href: "/" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@graph": [
            {
              "@type": "Organization",
              name: "JKSoft",
              url: "/",
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
              url: "/",
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
