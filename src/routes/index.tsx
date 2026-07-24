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
