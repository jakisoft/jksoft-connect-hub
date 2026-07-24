import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import {
  Mail,
  Lock,
  User,
  Phone,
  Eye,
  EyeOff,
  ArrowRight,
  MessageCircle,
  ShieldCheck,
  Zap,
  Sparkles,
} from "lucide-react";

const TITLE = "Masuk atau Daftar — JKSoft WhatsApp Gateway";
const DESCRIPTION =
  "Masuk atau buat akun JKSoft untuk mulai mengotomatisasi pengiriman pesan WhatsApp bisnis Anda.";

export const Route = createFileRoute("/auth")({
  component: AuthPage,
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESCRIPTION },
      { property: "og:url", content: "/auth" },
      { name: "robots", content: "noindex" },
    ],
    links: [{ rel: "canonical", href: "/auth" }],
  }),
});

type Mode = "login" | "register";

function AuthPage() {
  const [mode, setMode] = useState<Mode>("login");
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div
      className="relative min-h-screen overflow-hidden"
      style={{ background: "var(--gradient-hero)" }}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute -top-40 -right-40 h-[32rem] w-[32rem] rounded-full opacity-30 blur-3xl"
        style={{ background: "var(--gradient-primary)" }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -bottom-40 -left-40 h-[32rem] w-[32rem] rounded-full bg-primary-soft opacity-60 blur-3xl"
      />

      <div className="relative mx-auto grid min-h-screen max-w-7xl grid-cols-1 items-center gap-12 px-6 py-10 lg:grid-cols-2 lg:gap-16 lg:px-10">
        {/* Left side — branding */}
        <div
          className="hidden flex-col justify-between lg:flex"
          data-aos="fade-right"
        >
          <Link to="/" className="flex items-center gap-2">
            <span className="grid h-10 w-10 place-items-center rounded-xl bg-[image:var(--gradient-primary)] text-primary-foreground shadow-[var(--shadow-soft)]">
              <MessageCircle className="h-5 w-5" strokeWidth={2.5} />
            </span>
            <span className="text-xl font-bold tracking-tight text-foreground">
              JKSoft
            </span>
          </Link>

          <div>
            <h2 className="text-4xl font-bold leading-tight tracking-tight text-foreground lg:text-5xl">
              Otomatisasi pesan bisnis Anda,{" "}
              <span className="bg-[image:var(--gradient-primary)] bg-clip-text text-transparent">
                lebih mudah
              </span>
            </h2>
            <p className="mt-4 max-w-md text-base text-muted-foreground">
              Kirim notifikasi, OTP, dan kampanye promosi ke ribuan pelanggan
              melalui WhatsApp — cukup satu API.
            </p>

            <ul className="mt-8 space-y-4">
              {[
                { icon: Zap, text: "API cepat dengan uptime 99.9%" },
                { icon: ShieldCheck, text: "Enkripsi end-to-end yang aman" },
                { icon: Sparkles, text: "Dashboard modern & intuitif" },
              ].map(({ icon: Icon, text }, i) => (
                <li
                  key={text}
                  data-aos="fade-up"
                  data-aos-delay={i * 100}
                  className="flex items-center gap-3 text-sm text-foreground"
                >
                  <span className="grid h-9 w-9 place-items-center rounded-xl bg-primary-soft text-primary">
                    <Icon className="h-4 w-4" />
                  </span>
                  {text}
                </li>
              ))}
            </ul>
          </div>

          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} JKSoft. Semua hak dilindungi.
          </p>
        </div>

        {/* Right side — form (no card box) */}
        <div className="mx-auto w-full max-w-md" data-aos="fade-left">
          <div className="mb-8 flex items-center justify-between lg:hidden">
            <Link to="/" className="flex items-center gap-2">
              <span className="grid h-9 w-9 place-items-center rounded-xl bg-[image:var(--gradient-primary)] text-primary-foreground shadow-[var(--shadow-soft)]">
                <MessageCircle className="h-5 w-5" strokeWidth={2.5} />
              </span>
              <span className="text-lg font-bold tracking-tight text-foreground">
                JKSoft
              </span>
            </Link>
          </div>

          <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            {mode === "login" ? "Selamat datang kembali" : "Buat akun baru"}
          </h1>
          <p className="mt-2 text-sm text-muted-foreground">
            {mode === "login"
              ? "Masuk untuk melanjutkan mengelola gateway WhatsApp Anda."
              : "Daftar gratis dan mulai mengotomatisasi pesan bisnis Anda."}
          </p>

          {/* Segmented switcher */}
          <div className="mt-8 inline-flex rounded-full border border-border bg-background/60 p-1 backdrop-blur">
            {(["login", "register"] as const).map((m) => (
              <button
                key={m}
                type="button"
                onClick={() => setMode(m)}
                className={`relative rounded-full px-5 py-2 text-sm font-medium transition-all duration-500 ${
                  mode === m
                    ? "bg-primary text-primary-foreground shadow-[var(--shadow-soft)]"
                    : "text-muted-foreground hover:text-primary"
                }`}
              >
                {m === "login" ? "Masuk" : "Daftar"}
              </button>
            ))}
          </div>

          <form
            className="mt-8 space-y-5"
            onSubmit={(e) => e.preventDefault()}
          >
            {mode === "register" && (
              <IconField
                label="Nama Lengkap"
                icon={User}
                type="text"
                placeholder="Nama lengkap Anda"
              />
            )}

            <IconField
              label="Email"
              icon={Mail}
              type="email"
              placeholder="nama@perusahaan.com"
            />

            {mode === "register" && (
              <IconField
                label="Nomor WhatsApp"
                icon={Phone}
                type="tel"
                placeholder="+62 812 3456 7890"
              />
            )}

            <div className="space-y-1.5">
              <label className="text-sm font-medium text-foreground">
                Password
              </label>
              <div className="group relative">
                <Lock className="pointer-events-none absolute left-0 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground transition-colors duration-500 group-focus-within:text-primary" />
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Minimal 8 karakter"
                  className="w-full border-0 border-b border-border bg-transparent px-7 py-3 text-sm text-foreground placeholder:text-muted-foreground/70 outline-none transition-colors duration-500 focus:border-primary"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((v) => !v)}
                  aria-label={showPassword ? "Sembunyikan" : "Tampilkan"}
                  className="absolute right-0 top-1/2 -translate-y-1/2 text-muted-foreground transition-colors duration-500 hover:text-primary"
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </button>
              </div>
            </div>

            {mode === "login" && (
              <div className="flex items-center justify-between text-sm">
                <label className="flex items-center gap-2 text-muted-foreground">
                  <input
                    type="checkbox"
                    className="h-4 w-4 rounded border-border text-primary focus:ring-primary"
                  />
                  Ingat saya
                </label>
                <a
                  href="#"
                  className="font-medium text-primary transition-colors duration-500 hover:text-primary/80"
                >
                  Lupa password?
                </a>
              </div>
            )}

            <button
              type="submit"
              className="group flex w-full items-center justify-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground shadow-[var(--shadow-soft)] transition-all duration-500 hover:scale-[1.02] hover:shadow-[var(--shadow-glow)]"
            >
              {mode === "login" ? "Masuk ke Dashboard" : "Buat Akun Sekarang"}
              <ArrowRight className="h-4 w-4 transition-transform duration-500 group-hover:translate-x-1" />
            </button>
          </form>

          <div className="mt-6 flex items-center gap-4 text-xs text-muted-foreground">
            <span className="h-px flex-1 bg-border" />
            atau lanjut dengan
            <span className="h-px flex-1 bg-border" />
          </div>

          <div className="mt-6 grid grid-cols-2 gap-3">
            <SocialButton label="Google" />
            <SocialButton label="GitHub" />
          </div>

          <p className="mt-8 text-center text-sm text-muted-foreground">
            {mode === "login" ? "Belum punya akun? " : "Sudah punya akun? "}
            <button
              type="button"
              onClick={() => setMode(mode === "login" ? "register" : "login")}
              className="font-semibold text-primary transition-colors duration-500 hover:text-primary/80"
            >
              {mode === "login" ? "Daftar sekarang" : "Masuk di sini"}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}

function IconField({
  label,
  icon: Icon,
  type,
  placeholder,
}: {
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  type: string;
  placeholder: string;
}) {
  return (
    <div className="space-y-1.5">
      <label className="text-sm font-medium text-foreground">{label}</label>
      <div className="group relative">
        <Icon className="pointer-events-none absolute left-0 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground transition-colors duration-500 group-focus-within:text-primary" />
        <input
          type={type}
          placeholder={placeholder}
          className="w-full border-0 border-b border-border bg-transparent px-7 py-3 text-sm text-foreground placeholder:text-muted-foreground/70 outline-none transition-colors duration-500 focus:border-primary"
        />
      </div>
    </div>
  );
}

function SocialButton({ label }: { label: string }) {
  return (
    <button
      type="button"
      className="flex items-center justify-center gap-2 rounded-full border border-border bg-background/60 px-4 py-2.5 text-sm font-medium text-foreground backdrop-blur transition-all duration-500 hover:border-primary/40 hover:bg-background hover:text-primary"
    >
      {label}
    </button>
  );
}