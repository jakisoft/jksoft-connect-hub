import { useState, type ReactNode } from "react";
import { Link, useNavigate } from "@tanstack/react-router";
import {
  Activity, Bell, ChevronsLeft, CreditCard, Home, LayoutDashboard, LifeBuoy, LogOut,
  MessageSquareText, Search, Settings, Sparkles, TextAlignStart, User, WalletCards,
} from "lucide-react";
import { toast } from "sonner";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { BrandIcon } from "@/components/brand-icon";
import { supabase } from "@/integrations/supabase/client";
import { cn } from "@/lib/utils";

type Item = { label: string; icon: typeof LayoutDashboard; badge?: string };

const groups: { title: string; items: Item[] }[] = [
  {
    title: "Workspace",
    items: [
      { label: "Overview", icon: LayoutDashboard },
      { label: "Template Pesan", icon: WalletCards, badge: "24" },
      { label: "Percakapan", icon: MessageSquareText, badge: "8" },
      { label: "Aktivitas", icon: Activity },
    ],
  },
  {
    title: "Akun",
    items: [
      { label: "Billing", icon: CreditCard },
      { label: "Pengaturan", icon: Settings },
      { label: "Bantuan", icon: LifeBuoy },
    ],
  },
];

type Props = { children: ReactNode; email?: string; name?: string };

function SidebarBody({
  collapsed = false,
  active,
  onSelect,
  displayName,
  email,
}: {
  collapsed?: boolean;
  active: string;
  onSelect: (label: string) => void;
  displayName: string;
  email?: string;
}) {
  return (
    <div className="flex h-full flex-col bg-[linear-gradient(180deg,var(--color-card)_0%,color-mix(in_oklab,var(--color-primary)_6%,var(--color-card))_100%)]">
      <div className={cn("flex items-center gap-3 px-5 py-6", collapsed && "justify-center px-0")}>
        <BrandIcon className="h-11 w-11 shrink-0 rounded-2xl" />
        {!collapsed && (
          <span className="min-w-0">
            <span className="block truncate text-base font-bold tracking-tight text-foreground">JKSoft</span>
            <span className="block truncate text-[11px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">Workspace</span>
          </span>
        )}
      </div>

      {!collapsed && (
        <div className="px-4 pb-4">
          <div className="flex items-center gap-2 rounded-2xl border border-border/70 bg-background/70 px-3 py-2.5 text-muted-foreground transition-colors focus-within:border-primary/40">
            <Search className="h-4 w-4" />
            <input placeholder="Cari menu…" className="w-full bg-transparent text-sm outline-none placeholder:text-muted-foreground" />
          </div>
        </div>
      )}

      <nav className="flex-1 space-y-6 overflow-y-auto px-3 pb-4">
        {groups.map((group) => (
          <div key={group.title}>
            {!collapsed && (
              <p className="px-3 pb-2 text-[10px] font-bold uppercase tracking-[0.22em] text-muted-foreground/80">{group.title}</p>
            )}
            <ul className="space-y-1">
              {group.items.map(({ label, icon: Icon, badge }) => {
                const isActive = active === label;
                const button = (
                  <button
                    type="button"
                    onClick={() => onSelect(label)}
                    className={cn(
                      "group relative flex w-full items-center gap-3 rounded-2xl px-3 py-2.5 text-sm font-semibold transition-all duration-300",
                      collapsed && "justify-center px-0",
                      isActive
                        ? "bg-[image:var(--gradient-primary)] text-primary-foreground shadow-[var(--shadow-soft)]"
                        : "text-muted-foreground hover:bg-primary-soft hover:text-primary",
                    )}
                  >
                    <Icon className={cn("h-[18px] w-[18px] shrink-0 transition-transform duration-300", !isActive && "group-hover:scale-110")} />
                    {!collapsed && <span className="truncate">{label}</span>}
                    {!collapsed && badge && (
                      <span className={cn(
                        "ml-auto rounded-full px-2 py-0.5 text-[10px] font-bold",
                        isActive ? "bg-primary-foreground/20 text-primary-foreground" : "bg-muted text-muted-foreground",
                      )}>{badge}</span>
                    )}
                  </button>
                );
                return (
                  <li key={label}>
                    {collapsed ? (
                      <Tooltip>
                        <TooltipTrigger asChild>{button}</TooltipTrigger>
                        <TooltipContent side="right">{label}</TooltipContent>
                      </Tooltip>
                    ) : (
                      button
                    )}
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </nav>

      {!collapsed && (
        <div className="mx-4 mb-4 rounded-3xl border border-primary/15 bg-[linear-gradient(140deg,color-mix(in_oklab,var(--color-primary)_14%,transparent),transparent)] p-4">
          <span className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-2.5 py-1 text-[10px] font-bold uppercase tracking-widest text-primary">
            <Sparkles className="h-3 w-3" /> Pro
          </span>
          <p className="mt-3 text-sm font-bold text-foreground">Gateway Aktif</p>
          <p className="mt-1 text-xs leading-5 text-muted-foreground">Hubungkan nomor WhatsApp dan pantau pengiriman real-time.</p>
          <button type="button" className="mt-4 w-full rounded-full bg-primary px-4 py-2 text-xs font-bold text-primary-foreground shadow-[var(--shadow-soft)] transition-transform hover:scale-[1.02]">
            Kelola Gateway
          </button>
        </div>
      )}

      <div className={cn("flex items-center gap-3 border-t border-border/60 px-4 py-4", collapsed && "justify-center px-0")}>
        <Avatar className="h-9 w-9">
          <AvatarFallback className="bg-primary-soft text-xs font-bold text-primary">{displayName.slice(0, 2).toUpperCase()}</AvatarFallback>
        </Avatar>
        {!collapsed && (
          <span className="min-w-0">
            <span className="block truncate text-sm font-semibold text-foreground">{displayName}</span>
            <span className="block truncate text-xs text-muted-foreground">{email}</span>
          </span>
        )}
      </div>
    </div>
  );
}

export function DashboardLayout({ children, email, name }: Props) {
  const navigate = useNavigate();
  const [collapsed, setCollapsed] = useState(false);
  const [active, setActive] = useState("Overview");
  const displayName = name || email?.split("@")[0] || "User";

  async function logout() {
    const { error } = await supabase.auth.signOut();
    if (error) return toast.error("Logout gagal", { description: error.message });
    toast.success("Berhasil logout");
    await navigate({ to: "/auth/sign-in", replace: true });
  }

  return (
    <TooltipProvider delayDuration={120}>
      <div className="min-h-screen bg-[radial-gradient(1200px_600px_at_110%_-10%,color-mix(in_oklab,var(--color-primary)_10%,transparent),transparent)] text-foreground">
        <aside
          className={cn(
            "fixed inset-y-0 left-0 z-40 hidden border-r border-border/70 backdrop-blur-xl transition-[width] duration-500 ease-out lg:block",
            collapsed ? "w-[5.5rem]" : "w-72",
          )}
        >
          <SidebarBody collapsed={collapsed} active={active} onSelect={setActive} displayName={displayName} email={email} />
          <button
            type="button"
            onClick={() => setCollapsed((v) => !v)}
            aria-label={collapsed ? "Perluas sidebar" : "Perkecil sidebar"}
            className="absolute -right-3.5 top-24 grid h-7 w-7 place-items-center rounded-full border border-border bg-card text-muted-foreground shadow-sm transition-colors hover:text-primary"
          >
            <ChevronsLeft className={cn("h-4 w-4 transition-transform duration-500", collapsed && "rotate-180")} />
          </button>
        </aside>

        <div className={cn("transition-[padding] duration-500 ease-out", collapsed ? "lg:pl-[5.5rem]" : "lg:pl-72")}>
          <header className="sticky top-0 z-30 border-b border-border/60 bg-background/80 backdrop-blur-xl">
            <div className="flex h-20 items-center justify-between gap-3 px-4 sm:px-6 lg:px-8">
              <div className="flex min-w-0 items-center gap-3">
                <Sheet>
                  <SheetTrigger asChild>
                    <Button variant="ghost" size="icon" className="rounded-full lg:hidden">
                      <TextAlignStart className="h-5 w-5" />
                    </Button>
                  </SheetTrigger>
                  <SheetContent side="left" className="w-72 p-0">
                    <SidebarBody active={active} onSelect={setActive} displayName={displayName} email={email} />
                  </SheetContent>
                </Sheet>
                <div className="min-w-0">
                  <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-primary">{active}</p>
                  <h1 className="truncate text-lg font-semibold sm:text-xl">Halo, {displayName}</h1>
                </div>
              </div>
              <div className="flex items-center gap-2 sm:gap-3">
                <Button variant="outline" size="icon" className="relative rounded-full border-border bg-card/70">
                  <Bell className="h-4 w-4" />
                  <span className="absolute right-2.5 top-2.5 h-2 w-2 rounded-full bg-primary" />
                </Button>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <button type="button" className="flex items-center gap-3 rounded-full border border-border bg-card/70 p-1.5 pr-2 transition-all hover:border-primary/40 sm:pr-4">
                      <Avatar className="h-8 w-8">
                        <AvatarFallback className="bg-primary-soft text-xs font-bold text-primary">{displayName.slice(0, 2).toUpperCase()}</AvatarFallback>
                      </Avatar>
                      <span className="hidden text-sm font-medium sm:block">{displayName}</span>
                    </button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-64 rounded-3xl">
                    <DropdownMenuLabel>
                      <span className="block">Profile</span>
                      <span className="text-xs font-normal text-muted-foreground">{email}</span>
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem><User className="h-4 w-4" />Profile Saya</DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link to="/"><Home className="h-4 w-4" />Kembali ke Website</Link>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={logout} className="text-destructive focus:text-destructive">
                      <LogOut className="h-4 w-4" />Logout
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
          </header>
          {children}
        </div>
      </div>
    </TooltipProvider>
  );
}
