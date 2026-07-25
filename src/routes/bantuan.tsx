import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import {
  ChevronDown,
  HelpCircle,
  Rocket,
  KeyRound,
  Send,
  ShieldCheck,
  CreditCard,
  LifeBuoy,
  Mail,
  MessageCircle,
  Phone,
} from "lucide-react";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";

const TITLE = "Bantuan & FAQ — JKSoft WhatsApp Gateway";
const DESCRIPTION =
  "Panduan awal, integrasi API, harga, dan pertanyaan yang sering diajukan tentang JKSoft WhatsApp Gateway. Temukan jawaban cepat untuk mulai menggunakan layanan.";
const CANONICAL_URL = "https://jksoft-connect-hub.lovable.app/bantuan";

const faqs = [
  {
    icon: Rocket,
    q: "Bagaimana cara memulai menggunakan JKSoft WhatsApp Gateway?",
    a: "Daftar akun di halaman Masuk/Registrasi, verifikasi email, hubungkan nomor WhatsApp Anda melalui QR code, lalu dapatkan API key untuk mulai mengirim pesan.",
  },
  {
    icon: KeyRound,
    q: "Di mana saya bisa mendapatkan API key?",
    a: "Setelah login, buka menu Dashboard → Pengaturan → API Keys. Anda dapat membuat, menyalin, dan mencabut key kapan saja untuk keamanan aplikasi Anda.",
  },
  {
    icon: Send,
    q: "Berapa banyak pesan yang bisa dikirim per menit?",
    a: "Paket standar mendukung hingga 10.000 pesan per menit. Paket Enterprise dapat disesuaikan sesuai kebutuhan bisnis Anda.",
  },
  {
    icon: ShieldCheck,
    q: "Apakah pesan yang dikirim aman?",
    a: "Ya. Semua koneksi dienkripsi TLS end-to-end, dan kami tidak menyimpan isi pesan lebih lama dari yang diperlukan untuk pengiriman.",
  },
  {
    icon: CreditCard,
    q: "Metode pembayaran apa yang didukung?",
    a: "Kami mendukung transfer bank, virtual account, e-wallet (OVO, DANA, GoPay), dan kartu kredit/debit untuk semua paket berlangganan.",
  },
  {
    icon: LifeBuoy,
    q: "Bagaimana jika saya butuh bantuan teknis?",
    a: "Tim support kami tersedia 24/7 via email support@jksoft.id, live chat, dan WhatsApp. Pelanggan Enterprise mendapatkan dedicated account manager.",
  },
];

function FaqItem({
  faq,
  index,
}: {
  faq: (typeof faqs)[number];
  index: number;
}) {
  const [open, setOpen] = useState(false);
  const Icon = faq.icon;
  return (
    <div
      data-aos="fade-up"
      data-aos-delay={index * 80}
      className="overflow-hidden rounded-2xl border border-border bg-card transition-all duration-500 hover:border-primary/40 hover:shadow-[var(--shadow-soft)]"
    >
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        className="flex w-full items-center gap-4 px-5 py-5 text-left"
      >
        <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-primary-soft text-primary">
          <Icon className="h-5 w-5" />
        </span>
        <span className="flex-1 text-sm font-semibold text-foreground sm:text-base">
          {faq.q}
        </span>
        <ChevronDown
          className={`h-5 w-5 shrink-0 text-muted-foreground transition-transform duration-500 ${
            open ? "rotate-180 text-primary" : ""
          }`}
        />
      </button>
      <div
        className={`grid overflow-hidden transition-[grid-template-rows] duration-700 ease-in-out ${
          open ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
        }`}
      >
        <div className="min-h-0 overflow-hidden">
          <p className="px-5 pb-5 pl-[4.5rem] text-sm leading-relaxed text-muted-foreground">
            {faq.a}
          </p>
        </div>
      </div>
    </div>
  );
}

export const Route = createFileRoute("/bantuan")({
  component: BantuanPage,
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESCRIPTION },
      { property: "og:type", content: "website" },
      { property: "og:url", content: CANONICAL_URL }, { property: "og:image", content: "https://jksoft-connect-hub.lovable.app/og-home.svg" },
      { name: "twitter:card", content: "summary_large_image" }, { name: "twitter:image", content: "https://jksoft-connect-hub.lovable.app/og-home.svg" },
      { name: "twitter:title", content: TITLE },
      { name: "twitter:description", content: DESCRIPTION },
    ],
    links: [{ rel: "canonical", href: CANONICAL_URL }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: faqs.map((f) => ({
            "@type": "Question",
            name: f.q,
            acceptedAnswer: { "@type": "Answer", text: f.a },
          })),
        }),
      },
    ],
  }),
});

function BantuanPage() {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <SiteHeader />
      <main className="flex-1">
        <section
          className="relative overflow-hidden"
          style={{ background: "var(--gradient-hero)" }}
        >
          <div
            aria-hidden
            className="pointer-events-none absolute -top-32 right-0 h-96 w-96 rounded-full opacity-30 blur-3xl"
            style={{ background: "var(--gradient-primary)" }}
          />
          <div className="relative mx-auto max-w-4xl px-4 py-16 text-center sm:px-6 lg:py-24">
            <span
              data-aos="fade-down"
              className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary-soft px-3 py-1 text-xs font-semibold text-accent-foreground"
            >
              <HelpCircle className="h-3.5 w-3.5" />
              Pusat Bantuan
            </span>
            <h1
              data-aos="fade-up"
              data-aos-delay="100"
              className="mt-5 text-4xl font-bold tracking-tight text-foreground sm:text-5xl"
            >
              Butuh bantuan? Kami{" "}
              <span className="bg-[image:var(--gradient-primary)] bg-clip-text text-transparent">
                siap membantu
              </span>
            </h1>
            <p
              data-aos="fade-up"
              data-aos-delay="200"
              className="mx-auto mt-5 max-w-2xl text-base text-muted-foreground sm:text-lg"
            >
              Temukan panduan awal, integrasi API, dan jawaban atas pertanyaan
              yang paling sering diajukan tentang JKSoft WhatsApp Gateway.
            </p>
          </div>
        </section>

        <section className="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:py-20">
          <div className="flex flex-col gap-4">
            {faqs.map((faq, i) => (
              <FaqItem key={faq.q} faq={faq} index={i} />
            ))}
          </div>

          <div
            data-aos="fade-up"
            className="mt-16 rounded-3xl border border-border bg-secondary/40 p-8 text-center sm:p-12"
          >
            <h2 className="text-2xl font-bold text-foreground sm:text-3xl">
              Masih ada pertanyaan?
            </h2>
            <p className="mx-auto mt-3 max-w-xl text-sm text-muted-foreground sm:text-base">
              Tim support JKSoft siap membantu Anda kapan saja melalui berbagai
              saluran berikut.
            </p>
            <div className="mt-8 grid gap-4 sm:grid-cols-3">
              {[
                { icon: Mail, label: "Email", value: "support@jksoft.id" },
                { icon: MessageCircle, label: "Live Chat", value: "Chat sekarang" },
                { icon: Phone, label: "Telepon", value: "+62 811-1234-5678" },
              ].map(({ icon: Icon, label, value }) => (
                <div
                  key={label}
                  className="rounded-2xl border border-border bg-background p-5 text-left transition-all duration-500 hover:border-primary/40 hover:shadow-[var(--shadow-soft)]"
                >
                  <span className="grid h-10 w-10 place-items-center rounded-xl bg-primary-soft text-primary">
                    <Icon className="h-5 w-5" />
                  </span>
                  <p className="mt-3 text-xs font-medium text-muted-foreground">
                    {label}
                  </p>
                  <p className="text-sm font-semibold text-foreground">{value}</p>
                </div>
              ))}
            </div>
            <Link
              to="/"
              className="mt-8 inline-flex items-center justify-center rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground shadow-[var(--shadow-soft)] transition-all duration-500 hover:scale-[1.03]"
            >
              Kembali ke Beranda
            </Link>
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}