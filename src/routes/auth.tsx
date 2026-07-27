import { createFileRoute, Outlet, redirect } from "@tanstack/react-router";

const TITLE = "Auth — JKSoft WhatsApp Gateway";
const DESCRIPTION =
  "Akses halaman masuk, daftar, verifikasi OTP, dan reset password JKSoft WhatsApp Gateway.";

export const Route = createFileRoute("/auth")({
  beforeLoad: ({ location }) => {
    if (location.pathname === "/auth") {
      throw redirect({ to: "/auth/sign-in" });
    }
  },
  component: AuthLayout,
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESCRIPTION },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "https://jksoft-connect-hub.lovable.app/auth" },
      { property: "og:image", content: "https://jksoft-connect-hub.lovable.app/og-auth.png" }, { property: "og:image:secure_url", content: "https://jksoft-connect-hub.lovable.app/og-auth.png" }, { property: "og:image:type", content: "image/png" }, { property: "og:image:width", content: "1200" }, { property: "og:image:height", content: "630" }, { property: "og:image:alt", content: "JKSoft Auth secure workspace preview" },
      { name: "twitter:card", content: "summary_large_image" }, { name: "twitter:image", content: "https://jksoft-connect-hub.lovable.app/og-auth.png" }, { name: "twitter:image:alt", content: "JKSoft Auth secure workspace preview" },
      { name: "robots", content: "noindex" },
    ],
    links: [{ rel: "canonical", href: "https://jksoft-connect-hub.lovable.app/auth" }],
  }),
});

function AuthLayout() {
  return <Outlet />;
}