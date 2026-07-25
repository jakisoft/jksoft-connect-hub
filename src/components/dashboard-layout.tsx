import type { ReactNode } from "react";
import { Link, useNavigate } from "@tanstack/react-router";
import { Bell, Home, LogOut, Menu, User } from "lucide-react";
import { toast } from "sonner";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { BrandIcon } from "@/components/brand-icon";
import { supabase } from "@/integrations/supabase/client";

const menu = ["Dashboard", "Template", "Percakapan", "Pengaturan"];

type Props = { children: ReactNode; email?: string; name?: string };

function SidebarContent() {
  return (
    <div className="flex h-full flex-col p-5">
      <Link to="/dashboard" className="flex items-center gap-3">
        <BrandIcon className="h-11 w-11 rounded-2xl" />
        <span><span className="block text-lg font-bold text-foreground">JKSoft</span><span className="text-xs text-muted-foreground">Personal Workspace</span></span>
      </Link>
      <nav className="mt-10 space-y-2">
        {menu.map((label) => <Link key={label} to="/dashboard" className="flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-medium text-muted-foreground transition-all hover:bg-primary-soft hover:text-primary" activeProps={{ className: "flex items-center gap-3 rounded-2xl bg-primary px-4 py-3 text-sm font-semibold text-primary-foreground shadow-[var(--shadow-soft)]" }}><BrandIcon className="h-6 w-6 rounded-lg shadow-none" />{label}</Link>)}
      </nav>
      <div className="mt-auto rounded-3xl border border-border bg-card/80 p-4 shadow-[var(--shadow-soft)]">
        <p className="text-sm font-semibold text-foreground">Status Gateway</p>
        <p className="mt-1 text-xs text-muted-foreground">Siap dihubungkan dengan nomor WhatsApp personal Anda.</p>
      </div>
    </div>
  );
}

export function DashboardLayout({ children, email, name }: Props) {
  const navigate = useNavigate();
  const displayName = name || email?.split("@")[0] || "User";
  async function logout() { const { error } = await supabase.auth.signOut(); if (error) return toast.error("Logout gagal", { description: error.message }); toast.success("Berhasil logout"); await navigate({ to: "/auth/sign-in", replace: true }); }
  return <div className="min-h-screen bg-background text-foreground"><aside className="fixed inset-y-0 left-0 z-40 hidden w-72 border-r border-border bg-background/95 backdrop-blur-xl lg:block"><SidebarContent /></aside><div className="lg:pl-72"><header className="sticky top-0 z-30 border-b border-border/60 bg-background/80 backdrop-blur-xl"><div className="flex h-20 items-center justify-between px-4 sm:px-6 lg:px-8"><div className="flex items-center gap-3"><Sheet><SheetTrigger asChild><Button variant="outline" size="icon" className="rounded-full lg:hidden"><Menu className="h-4 w-4" /></Button></SheetTrigger><SheetContent side="left" className="w-72 p-0"><SidebarContent /></SheetContent></Sheet><div><p className="text-xs uppercase tracking-[0.3em] text-primary">Dashboard</p><h1 className="text-xl font-semibold">Halo, {displayName}</h1></div></div><div className="flex items-center gap-3"><Button variant="outline" size="icon" className="rounded-full border-border bg-card/70"><Bell className="h-4 w-4" /></Button><DropdownMenu><DropdownMenuTrigger asChild><button type="button" className="flex items-center gap-3 rounded-full border border-border bg-card/70 p-1.5 pr-4 transition-all hover:border-primary/40"><Avatar><AvatarFallback className="bg-primary-soft text-primary">{displayName.slice(0, 2).toUpperCase()}</AvatarFallback></Avatar><span className="hidden text-sm font-medium sm:block">{displayName}</span></button></DropdownMenuTrigger><DropdownMenuContent align="end" className="w-64 rounded-3xl"><DropdownMenuLabel><span className="block">Profile</span><span className="text-xs font-normal text-muted-foreground">{email}</span></DropdownMenuLabel><DropdownMenuSeparator /><DropdownMenuItem><User className="h-4 w-4" />Profile Saya</DropdownMenuItem><DropdownMenuItem asChild><Link to="/"><Home className="h-4 w-4" />Kembali ke Website</Link></DropdownMenuItem><DropdownMenuSeparator /><DropdownMenuItem onClick={logout} className="text-destructive focus:text-destructive"><LogOut className="h-4 w-4" />Logout</DropdownMenuItem></DropdownMenuContent></DropdownMenu></div></div></header>{children}</div></div>;
}
