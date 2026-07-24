import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { AlignEndHorizontal, MessageCircle, X } from "lucide-react";

type NavItem =
  | { label: string; type: "hash"; href: string }
  | { label: string; type: "route"; to: string };

const navLinks: NavItem[] = [
  { label: "Beranda", type: "route", to: "/" },
  { label: "Fitur", type: "hash", href: "/#features" },
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
        <Link to="/" className="flex items-center gap-2" data-aos="fade-right">
          <span className="grid h-9 w-9 place-items-center rounded-xl bg-[image:var(--gradient-primary)] text-primary-foreground shadow-[var(--shadow-soft)]">
            <MessageCircle className="h-5 w-5" strokeWidth={2.5} />
          </span>
          <span className="text-lg font-bold tracking-tight text-foreground">
            JKSoft
          </span>
        </Link>

        <nav className="hidden items-center gap-8 md:flex" data-aos="fade-down">
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

        <div className="hidden items-center gap-3 md:flex" data-aos="fade-left">
          <Link
            to="/auth"
            className="text-sm font-medium text-muted-foreground transition-colors duration-500 hover:text-primary"
          >
            Masuk
          </Link>
          <a
            href="#contact"
            className="inline-flex items-center rounded-full bg-primary px-5 py-2 text-sm font-semibold text-primary-foreground shadow-[var(--shadow-soft)] transition-all duration-500 hover:scale-[1.03] hover:shadow-[var(--shadow-glow)]"
          >
            Mulai Sekarang
          </a>
        </div>

        <button
          type="button"
          aria-label="Toggle menu"
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
          className="inline-flex items-center justify-center p-2 text-foreground transition-colors duration-500 hover:text-primary md:hidden"
        >
          {open ? <X className="h-6 w-6" /> : <AlignEndHorizontal className="h-6 w-6" />}
        </button>
      </div>

      <div
        className={`grid overflow-hidden border-border bg-background transition-[grid-template-rows,border] duration-700 ease-in-out md:hidden ${
          open ? "grid-rows-[1fr] border-t" : "grid-rows-[0fr]"
        }`}
      >
        <div className="min-h-0 overflow-hidden">
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
              to="/auth"
              onClick={() => setOpen(false)}
              className="mt-2 rounded-lg px-3 py-2 text-sm font-medium text-foreground transition-colors duration-500 hover:bg-accent"
            >
              Masuk
            </Link>
            <a
              href="#contact"
              onClick={() => setOpen(false)}
              className="mt-2 inline-flex items-center justify-center rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground shadow-[var(--shadow-soft)]"
            >
              Mulai Sekarang
            </a>
          </nav>
        </div>
      </div>
    </header>
  );
}