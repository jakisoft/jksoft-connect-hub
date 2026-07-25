import type { ComponentType, InputHTMLAttributes, ReactNode } from "react";
import { Link } from "@tanstack/react-router";
import { MessageCircle, ShieldCheck, Sparkles, Zap } from "lucide-react";

export function AuthShell({ title, description, children, footer }: { title: string; description: string; children: ReactNode; footer?: ReactNode }) {
  return (
    <div className="relative min-h-screen overflow-hidden" style={{ background: "var(--gradient-hero)" }}>
      <div aria-hidden className="pointer-events-none absolute -top-40 -right-40 h-[32rem] w-[32rem] rounded-full opacity-30 blur-3xl" style={{ background: "var(--gradient-primary)" }} />
      <div aria-hidden className="pointer-events-none absolute -bottom-40 -left-40 h-[32rem] w-[32rem] rounded-full bg-primary-soft opacity-60 blur-3xl" />
      <div className="relative mx-auto grid min-h-screen max-w-7xl grid-cols-1 items-center gap-12 px-6 py-10 lg:grid-cols-2 lg:gap-16 lg:px-10">
        <aside className="hidden h-full min-h-[40rem] flex-col justify-between lg:flex" data-aos="fade-right">
          <Link to="/" className="flex items-center gap-2"><span className="grid h-10 w-10 place-items-center rounded-xl bg-[image:var(--gradient-primary)] text-primary-foreground shadow-[var(--shadow-soft)]"><MessageCircle className="h-5 w-5" strokeWidth={2.5} /></span><span className="text-xl font-bold tracking-tight text-foreground">JKSoft</span></Link>
          <div><h2 className="max-w-xl text-4xl font-bold leading-tight tracking-tight text-foreground lg:text-5xl">Otomatisasi pesan bisnis Anda, <span className="bg-[image:var(--gradient-primary)] bg-clip-text text-transparent">lebih mudah</span></h2><p className="mt-4 max-w-md text-base text-muted-foreground">Kirim notifikasi, OTP, dan kampanye promosi melalui WhatsApp — cukup satu API.</p><ul className="mt-8 space-y-4">{[{ icon: Zap, text: "Template pesan siap pakai" }, { icon: ShieldCheck, text: "Reset password dan verifikasi email" }, { icon: Sparkles, text: "Dashboard pengiriman tersinkronisasi" }].map(({ icon: Icon, text }, i) => <li key={text} data-aos="fade-up" data-aos-delay={i * 100} className="flex items-center gap-3 text-sm text-foreground"><span className="grid h-9 w-9 place-items-center rounded-xl bg-primary-soft text-primary"><Icon className="h-4 w-4" /></span>{text}</li>)}</ul></div>
          <p className="text-xs text-muted-foreground">© {new Date().getFullYear()} JKSoft. Semua hak dilindungi.</p>
        </aside>
        <main className="mx-auto w-full max-w-md" data-aos="fade-left"><div className="mb-8 flex items-center justify-between lg:hidden"><Link to="/" className="flex items-center gap-2"><span className="grid h-9 w-9 place-items-center rounded-xl bg-[image:var(--gradient-primary)] text-primary-foreground shadow-[var(--shadow-soft)]"><MessageCircle className="h-5 w-5" strokeWidth={2.5} /></span><span className="text-lg font-bold tracking-tight text-foreground">JKSoft</span></Link></div><h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">{title}</h1><p className="mt-2 text-sm leading-relaxed text-muted-foreground">{description}</p><div className="mt-8">{children}</div>{footer ? <div className="mt-8 text-center text-sm text-muted-foreground">{footer}</div> : null}</main>
      </div>
    </div>
  );
}

export function AuthField({ label, icon: Icon, id, className, ...props }: InputHTMLAttributes<HTMLInputElement> & { label: string; icon: ComponentType<{ className?: string }> }) {
  const inputId = id ?? label.toLowerCase().replace(/\s+/g, "-");
  return <div className="space-y-1.5"><label htmlFor={inputId} className="text-sm font-medium text-foreground">{label}</label><div className="group relative"><Icon className="pointer-events-none absolute left-0 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground transition-colors duration-500 group-focus-within:text-primary" /><input id={inputId} className={`w-full border-0 border-b border-border bg-transparent px-7 py-3 text-sm text-foreground outline-none transition-colors duration-500 placeholder:text-muted-foreground/70 focus:border-primary ${className ?? ""}`} {...props} /></div></div>;
}