import { ArrowRight, PlayCircle, Zap, ShieldCheck, BarChart3 } from "lucide-react";
import heroIllustration from "@/assets/hero-illustration.png";

export function SiteHero() {
  return (
    <section
      id="home"
      className="relative overflow-hidden"
      style={{ background: "var(--gradient-hero)" }}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute -top-32 -right-32 h-96 w-96 rounded-full opacity-40 blur-3xl"
        style={{ background: "var(--gradient-primary)" }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -bottom-40 -left-20 h-96 w-96 rounded-full bg-primary-soft opacity-60 blur-3xl"
      />

      <div className="relative mx-auto grid max-w-7xl grid-cols-1 items-center gap-12 px-4 py-16 sm:px-6 lg:grid-cols-2 lg:gap-8 lg:px-8 lg:py-24">
        <div className="flex flex-col items-start">
          <span
            className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary-soft px-3 py-1 text-xs font-semibold text-accent-foreground"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-primary" />
            WhatsApp Gateway by JKSoft
          </span>

          <h1
            className="mt-5 text-4xl font-bold leading-[1.1] tracking-tight text-foreground sm:text-5xl lg:text-6xl"
          >
            Otomatiskan Pesan Bisnis Anda dengan{" "}
            <span className="bg-[image:var(--gradient-primary)] bg-clip-text text-transparent">
              WhatsApp Gateway
            </span>
          </h1>

          <p
            className="mt-5 max-w-xl text-base text-muted-foreground sm:text-lg"
          >
            Kirim notifikasi, OTP, dan kampanye promosi ke ribuan pelanggan
            secara instan. API yang mudah diintegrasikan, dashboard yang intuitif,
            dan pengiriman pesan yang andal—semuanya dalam satu platform.
          </p>

          <div
            className="mt-8 flex flex-col gap-3 sm:flex-row"
          >
            <a
              href="#contact"
              className="group inline-flex items-center justify-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground shadow-[var(--shadow-soft)] transition-all duration-500 hover:scale-[1.03] hover:shadow-[var(--shadow-glow)]"
            >
              Coba Gratis Sekarang
              <ArrowRight className="h-4 w-4 transition-transform duration-500 group-hover:translate-x-1" />
            </a>
            <a
              href="/bantuan"
              className="inline-flex items-center justify-center gap-2 rounded-full border border-border bg-background/80 px-6 py-3 text-sm font-semibold text-foreground backdrop-blur transition-colors duration-500 hover:bg-accent"
            >
              <PlayCircle className="h-4 w-4" />
              Lihat Demo
            </a>
          </div>

          <dl
            className="mt-10 grid grid-cols-3 gap-6 border-t border-border pt-6 sm:gap-10"
          >
            {[
              { icon: Zap, label: "Kecepatan", value: "99.9%" },
              { icon: ShieldCheck, label: "Aman", value: "End-to-end" },
              { icon: BarChart3, label: "Skalabel", value: "10rb+/mnt" },
            ].map(({ icon: Icon, label, value }) => (
              <div key={label} className="flex items-start gap-2">
                <Icon className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                <div className="min-w-0">
                  <dt className="truncate text-xs text-muted-foreground">{label}</dt>
                  <dd className="text-sm font-semibold text-foreground">{value}</dd>
                </div>
              </div>
            ))}
          </dl>
        </div>

        <div className="relative">
          <div
            aria-hidden
            className="absolute inset-8 rounded-[2.5rem] bg-[image:var(--gradient-primary)] opacity-20 blur-2xl"
          />
          <img
            src={heroIllustration}
            alt="Ilustrasi WhatsApp Gateway JKSoft mengotomatisasi pengiriman pesan"
            width={1024}
            height={1024}
            className="relative mx-auto w-full max-w-lg drop-shadow-2xl"
          />
        </div>
      </div>
    </section>
  );
}