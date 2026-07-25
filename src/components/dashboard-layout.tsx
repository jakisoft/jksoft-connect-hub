import type { ReactNode } from "react";
import { Link, useNavigate } from "@tanstack/react-router";
import { Bell, CreditCard, Home, LayoutDashboard, LogOut, MessageSquareText, Settings, TextAlignStart, User, WalletCards } from "lucide-react";
import { toast } from "sonner";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { BrandIcon } from "@/components/brand-icon";
import { supabase } from "@/integrations/supabase/client";

const primaryMenu = [
  { label: "Overview", to: "/dashboard", icon: LayoutDashboard },
  { label: "Template Pesan", to: "/dashboard", icon: WalletCards },
  { label: "Percakapan", to: "/dashboard", icon: MessageSquareText },
  { label: "Billing", to: "/dashboard", icon: CreditCard },
  { label: "Pengaturan", to: "/dashboard", icon: Settings },
];

type Props = { children: ReactNode; email?: string; name?: string };

function SidebarContent() {
  return (
    <div className="flex h-full flex-col bg-background">
      <div className="border-b border-border px-5 py-5">
        <Link to="/dashboard" className="flex items-center gap-3">
          <BrandIcon className="h-11 w-11 rounded-2xl" />
          <span>
            <span className="block text-lg font-bold text-foreground">JKSoft</span>
            <span className="text-xs font-medium text-muted-foreground">WhatsApp Workspace</span>
          </span>
        </Link>
      </div>

      <div className="flex-1 overflow-y-auto px-3 py-5">
        <p className="px-3 text-[11px] font-bold uppercase tracking-[0.18em] text-muted-foreground">Menu Utama</p>
        <nav className="mt-3 space-y-1">
          {primaryMenu.map(({ label, to, icon: Icon }) => (
            <Link
              key={label}
              to={to}
              className="group flex items-center gap-3 rounded-2xl px-3 py-3 text-sm font-semibold text-muted-foreground transition-all hover:bg-primary-soft hover:text-primary"
              activeProps={{ className: "group flex items-center gap-3 rounded-2xl bg-primary px-3 py-3 text-sm font-semibold text-primary-foreground shadow-[var(--shadow-soft)]" }}
            >
              <span className="grid h-9 w-9 place-items-center rounded-xl bg-muted text-muted-foreground transition-colors group-hover:bg-background group-hover:text-primary group-[.active]:bg-primary-foreground/15 group-[.active]:text-primary-foreground">
                <Icon className="h-4 w-4" />
              </span>
              <span>{label}</span>
            </Link>
          ))}
        </nav>
      </div>

      <div className="m-4 rounded-3xl border border-primary/15 bg-primary-soft p-4">
        <p className="text-sm font-bold text-foreground">Gateway Aktif</p>
        <p className="mt-1 text-xs leading-5 text-muted-foreground">Hubungkan nomor WhatsApp dan pantau status pengiriman secara real-time.</p>
        <button type="button" className="mt-4 w-full rounded-full bg-primary px-4 py-2 text-xs font-bold text-primary-foreground shadow-[var(--shadow-soft)]">Kelola Gateway</button>
      </div>
    </div>
  );
}

export function DashboardLayout({ children, email, name }: Props) {
  const navigate = useNavigate();
  const displayName = name || email?.split("@")[0] || "User";
  async function logout() { const { error } = await supabase.auth.signOut(); if (error) return toast.error("Logout gagal", { description: error.message }); toast.success("Berhasil logout"); await navigate({ to: "/auth/sign-in", replace: true }); }
  return <div className="min-h-screen bg-background text-foreground"><aside className="fixed inset-y-0 left-0 z-40 hidden w-72 border-r border-border bg-background lg:block"><SidebarContent /></aside><div className="lg:pl-72"><header className="sticky top-0 z-30 border-b border-border/60 bg-background/85 backdrop-blur-xl"><div className="flex h-20 items-center justify-between px-4 sm:px-6 lg:px-8"><div className="flex items-center gap-3"><Sheet><SheetTrigger asChild><Button variant="outline" size="icon" className="rounded-full lg:hidden"><TextAlignStart className="h-5 w-5" /></Button></SheetTrigger><SheetContent side="left" className="w-72 p-0"><SidebarContent /></SheetContent></Sheet><div><p className="text-xs font-bold uppercase tracking-[0.3em] text-primary">Dashboard</p><h1 className="text-xl font-semibold">Halo, {displayName}</h1></div></div><div className="flex items-center gap-3"><Button variant="outline" size="icon" className="rounded-full border-border bg-card/70"><Bell className="h-4 w-4" /></Button><DropdownMenu><DropdownMenuTrigger asChild><button type="button" className="flex items-center gap-3 rounded-full border border-border bg-card/70 p-1.5 pr-4 transition-all hover:border-primary/40"><Avatar><AvatarFallback className="bg-primary-soft text-primary">{displayName.slice(0, 2).toUpperCase()}</AvatarFallback></Avatar><span className="hidden text-sm font-medium sm:block">{displayName}</span></button></DropdownMenuTrigger><DropdownMenuContent align="end" className="w-64 rounded-3xl"><DropdownMenuLabel><span className="block">Profile</span><span className="text-xs font-normal text-muted-foreground">{email}</span></DropdownMenuLabel><DropdownMenuSeparator /><DropdownMenuItem><User className="h-4 w-4" />Profile Saya</DropdownMenuItem><DropdownMenuItem asChild><Link to="/"><Home className="h-4 w-4" />Kembali ke Website</Link></DropdownMenuItem><DropdownMenuSeparator /><DropdownMenuItem onClick={logout} className="text-destructive focus:text-destructive"><LogOut className="h-4 w-4" />Logout</DropdownMenuItem></DropdownMenuContent></DropdownMenu></div></div></header>{children}</div></div>;
}
