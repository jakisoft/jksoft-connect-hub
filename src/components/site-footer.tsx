import { Link } from "@tanstack/react-router";
import {
  Mail,
  Phone,
  MapPin,
} from "lucide-react";
import { BrandIcon } from "@/components/brand-icon";

const columns = [
  {
    title: "Produk",
    links: [
      { label: "Fitur", href: "#features" },
      { label: "Harga", href: "#pricing" },
      { label: "Integrasi API", href: "#api" },
      { label: "Dokumentasi", href: "#docs" },
    ],
  },
  {
    title: "Perusahaan",
    links: [
      { label: "Tentang JKSoft", href: "#about" },
      { label: "Blog", href: "#blog" },
      { label: "Karir", href: "#careers" },
      { label: "Mitra", href: "#partners" },
    ],
  },
  {
    title: "Bantuan",
    links: [
      { label: "Pusat Bantuan", href: "#help" },
      { label: "Kontak Kami", href: "#contact" },
      { label: "Status Layanan", href: "#status" },
      { label: "Kebijakan Privasi", href: "#privacy" },
    ],
  },
];

const socials = [
  { href: "#", label: "Twitter" },
  { href: "#", label: "Instagram" },
  { href: "#", label: "LinkedIn" },
  { href: "#", label: "GitHub" },
];

export function SiteFooter() {
  return (
    <footer id="contact" className="border-t border-border bg-secondary/40">
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <Link to="/" className="flex items-center gap-2">
              <BrandIcon className="h-9 w-9" />
              <span className="text-lg font-bold tracking-tight text-foreground">
                JKSoft
              </span>
            </Link>
            <p className="mt-4 max-w-sm text-sm text-muted-foreground">
              Platform WhatsApp Gateway profesional untuk membantu bisnis Anda
              berkomunikasi lebih cepat, aman, dan otomatis dengan pelanggan.
            </p>

            <ul className="mt-6 space-y-3 text-sm text-muted-foreground">
              <li className="flex items-center gap-3">
                <Mail className="h-4 w-4 shrink-0 text-primary" />
                <span>support@jksoft.id</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="h-4 w-4 shrink-0 text-primary" />
                <span>+62 811-1234-5678</span>
              </li>
              <li className="flex items-center gap-3">
                <MapPin className="h-4 w-4 shrink-0 text-primary" />
                <span>Jakarta, Indonesia</span>
              </li>
            </ul>
          </div>

          <div className="grid grid-cols-2 gap-8 sm:grid-cols-3 lg:col-span-7">
            {columns.map((col) => (
              <div key={col.title}>
                <h3 className="text-sm font-semibold text-foreground">
                  {col.title}
                </h3>
                <ul className="mt-4 space-y-3">
                  {col.links.map((l) => (
                    <li key={l.label}>
                      <a
                        href={l.href}
                        className="text-sm text-muted-foreground transition-colors hover:text-primary"
                      >
                        {l.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-12 flex flex-col items-start justify-between gap-4 border-t border-border pt-6 sm:flex-row sm:items-center">
          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} JKSoft. Semua hak dilindungi.
          </p>
          <div className="flex items-center gap-2">
            {socials.map(({ href, label }) => (
              <a
                key={label}
                href={href}
                aria-label={label}
                className="grid h-9 w-9 place-items-center rounded-full border border-border text-muted-foreground transition-colors hover:border-primary hover:text-primary"
              >
                <BrandIcon className="h-5 w-5 rounded-full shadow-none" />
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}