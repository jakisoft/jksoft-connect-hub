import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { FormEvent, useState } from "react";
import { ArrowRight, Eye, EyeOff, Lock, Mail } from "lucide-react";
import { toast } from "sonner";
import { z } from "zod";
import { AuthField, AuthShell } from "@/components/auth-shell";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { supabase } from "@/integrations/supabase/client";
import { lovable } from "@/integrations/lovable/index";

const TITLE = "Masuk — JKSoft WhatsApp Gateway";
const DESCRIPTION = "Masuk ke dashboard JKSoft untuk mengelola template, pengiriman, dan percakapan WhatsApp.";
const CANONICAL_URL = "https://jksoft-connect-hub.lovable.app/auth/sign-in";
const schema = z.object({ email: z.string().trim().email("Email tidak valid").max(255), password: z.string().min(8, "Password minimal 8 karakter").max(128) });

export const Route = createFileRoute("/auth/sign-in")({ component: SignInPage, head: () => ({ meta: [{ title: TITLE }, { name: "description", content: DESCRIPTION }, { property: "og:title", content: TITLE }, { property: "og:description", content: DESCRIPTION }, { property: "og:type", content: "website" }, { property: "og:url", content: CANONICAL_URL }, { name: "twitter:card", content: "summary" }, { name: "robots", content: "noindex" }], links: [{ rel: "canonical", href: CANONICAL_URL }] }) });

function SignInPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  async function submit(event: FormEvent<HTMLFormElement>) { event.preventDefault(); const parsed = schema.safeParse({ email, password }); if (!parsed.success) return toast.error(parsed.error.issues[0]?.message ?? "Periksa data masuk"); setLoading(true); const { error } = await supabase.auth.signInWithPassword(parsed.data); setLoading(false); if (error) return toast.error("Gagal masuk", { description: error.message }); toast.success("Berhasil masuk"); await navigate({ to: "/dashboard", replace: true }); }
  async function google() { setLoading(true); const result = await lovable.auth.signInWithOAuth("google", { redirect_uri: window.location.origin }); setLoading(false); if (result.error) return toast.error("Google Sign-In gagal", { description: result.error.message }); if (result.redirected) return; toast.success("Berhasil masuk dengan Google"); await navigate({ to: "/dashboard", replace: true }); }
  return <AuthShell title="Selamat datang kembali" description="Masuk untuk melanjutkan mengelola gateway WhatsApp, template pesan, dan status pengiriman Anda." footer={<>Belum punya akun? <Link to="/auth/sign-up" className="font-semibold text-primary hover:text-primary/80">Daftar sekarang</Link></>}><form className="space-y-5" onSubmit={submit}><AuthField label="Email" icon={Mail} type="email" inputMode="email" autoComplete="email" placeholder="nama@perusahaan.com" value={email} onChange={(e) => setEmail(e.target.value)} /><div className="space-y-1.5"><label htmlFor="password" className="text-sm font-medium text-foreground">Password</label><div className="group relative"><Lock className="pointer-events-none absolute left-0 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground group-focus-within:text-primary" /><input id="password" type={showPassword ? "text" : "password"} autoComplete="current-password" placeholder="Minimal 8 karakter" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full border-0 border-b border-border bg-transparent px-7 py-3 pr-10 text-sm text-foreground outline-none placeholder:text-muted-foreground/70 focus:border-primary" /><button type="button" onClick={() => setShowPassword((v) => !v)} className="absolute right-0 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-primary" aria-label="Toggle password">{showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}</button></div></div><div className="flex items-center justify-between gap-4 text-sm"><label className="flex cursor-pointer items-center gap-2 text-muted-foreground"><Checkbox checked={remember} onCheckedChange={(v) => setRemember(v === true)} />Ingat saya</label><Link to="/auth/forgot-password" className="font-medium text-primary hover:text-primary/80">Lupa password?</Link></div><Button disabled={loading} type="submit" className="group h-12 w-full rounded-full shadow-[var(--shadow-soft)]">Masuk ke Dashboard<ArrowRight className="transition-transform duration-500 group-hover:translate-x-1" /></Button></form><div className="mt-6 flex items-center gap-4 text-xs text-muted-foreground"><span className="h-px flex-1 bg-border" />atau lanjut dengan<span className="h-px flex-1 bg-border" /></div><Button type="button" variant="outline" disabled={loading} onClick={google} className="mt-6 h-11 w-full rounded-full bg-background/60 backdrop-blur hover:border-primary/40 hover:text-primary">Google</Button></AuthShell>;
}