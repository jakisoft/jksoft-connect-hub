import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { AlignEndHorizontal } from "lucide-react";
import { BrandIcon } from "@/components/brand-icon";

type NavItem =
  | { label: string; type: "hash"; href: string }
  | { label: string; type: "route"; to: string };

const navLinks: NavItem[] = [
  { label: "Beranda", type: "route", to: "/" },
  { label: "Fitur", type: "hash", href: "/#features" },
  { label: "Dashboard", type: "route", to: "/dashboard" },
  { label: "Bantuan", type: "route", to: "/bantuan" },
  { label: "Kontak", type: "hash", href: "/#contact" },
];

// Prevent layout shift: keep font-weight constant on active,
// use an underline indicator instead of a bold swap.
const navBase =
  "relative text-sm font-medium text-muted-foreground transition-colors duration-500 hover:text-primary after:pointer-events-none after:absolute after:left-0 after:-bottom-1 after:h-[2px] after:w-full after:origin-left after:scale-x-0 after:bg-primary after:transition-transform after:duration-500 hover:after:scale-x-100";
const navActive =
  "text-primary after:scale-x-100";

export function SiteHeader() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/60 bg-background/80 backdrop-blur-lg">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link to="/" className="flex items-center gap-2">
          <BrandIcon className="h-9 w-9" />
          <span className="text-lg font-bold tracking-tight text-foreground">
            JKSoft
          </span>
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          {navLinks.map((l) =>
            l.type === "route" ? (
              <Link
                key={l.label}
                to={l.to}
                activeOptions={{ exact: l.to === "/" }}
                className={navBase}
                activeProps={{ className: `${navBase} ${navActive}` }}
              >
                {l.label}
              </Link>
            ) : (
              <a key={l.label} href={l.href} className={navBase}>
                {l.label}
              </a>
            ),
          )}
        </nav>

        <div className="hidden items-center gap-3 md:flex">
          <Link
            to="/auth/sign-in"
            className="text-sm font-medium text-muted-foreground transition-colors duration-500 hover:text-primary"
          >
            Masuk
          </Link>
          <Link
            to="/auth/sign-up"
            className="inline-flex items-center rounded-full bg-primary px-5 py-2 text-sm font-semibold text-primary-foreground shadow-[var(--shadow-soft)] transition-all duration-500 hover:scale-[1.03] hover:shadow-[var(--shadow-glow)]"
          >
            Mulai Sekarang
          </Link>
        </div>

        <button
          type="button"
          aria-label="Toggle menu"
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
          className="inline-flex items-center justify-center p-0 text-foreground transition-colors duration-500 hover:text-primary md:hidden"
        >
          <AlignEndHorizontal className={`h-7 w-7 transition-transform duration-500 ${open ? "rotate-180 text-primary" : ""}`} />
        </button>
      </div>

      <div
        className={`absolute left-0 right-0 top-full border-t border-border bg-background/95 shadow-[var(--shadow-soft)] backdrop-blur-xl transition-all duration-700 ease-in-out md:hidden ${
          open
            ? "pointer-events-auto translate-y-0 opacity-100"
            : "pointer-events-none -translate-y-3 opacity-0"
        }`}
      >
        <div>
          <nav className="mx-auto flex max-w-7xl flex-col gap-1 px-4 py-4">
            {navLinks.map((l) =>
              l.type === "route" ? (
                <Link
                  key={l.label}
                  to={l.to}
                  activeOptions={{ exact: l.to === "/" }}
                  onClick={() => setOpen(false)}
                  className="rounded-lg px-3 py-2 text-sm font-medium text-muted-foreground transition-colors duration-500 hover:bg-accent hover:text-primary"
                  activeProps={{
                    className:
                      "rounded-lg px-3 py-2 text-sm font-medium text-primary bg-accent transition-colors duration-500",
                  }}
                >
                  {l.label}
                </Link>
              ) : (
                <a
                  key={l.label}
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="rounded-lg px-3 py-2 text-sm font-medium text-muted-foreground transition-colors duration-500 hover:bg-accent hover:text-primary"
                >
                  {l.label}
                </a>
              ),
            )}
            <Link
              to="/auth/sign-in"
              onClick={() => setOpen(false)}
              className="mt-2 rounded-lg px-3 py-2 text-sm font-medium text-foreground transition-colors duration-500 hover:bg-accent"
            >
              Masuk
            </Link>
            <Link
              to="/auth/sign-up"
              onClick={() => setOpen(false)}
              className="mt-2 inline-flex items-center justify-center rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground shadow-[var(--shadow-soft)]"
            >
              Mulai Sekarang
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
}