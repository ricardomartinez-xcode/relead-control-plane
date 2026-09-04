import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { Menu, Network, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { content } from "@/content";

export function SiteHeader() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-border/70 bg-background/85 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center gap-4 px-4 py-3 lg:px-8">
        <Link to="/" className="flex items-center gap-2.5" aria-label="RelNets home">
          <span className="grid size-8 place-items-center rounded-lg border border-primary/40 bg-primary/12">
            <Network className="size-4 text-primary" aria-hidden="true" />
          </span>
          <span className="leading-tight">
            <span className="block text-sm font-semibold tracking-tight text-foreground">
              {content.brand.name}
            </span>
            <span className="block font-mono text-[10px] text-muted-foreground">
              {content.brand.category}
            </span>
          </span>
        </Link>

        <nav aria-label="Main" className="ml-4 hidden items-center gap-1 md:flex">
          {content.nav.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              className="rounded-md px-3 py-2 text-sm text-muted-foreground transition-colors hover:bg-surface hover:text-foreground"
              activeProps={{ className: "text-foreground" }}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="ml-auto flex items-center gap-2">
          <a
            href={content.cta.signIn.href}
            className="hidden rounded-md px-3 py-2 text-sm text-muted-foreground transition-colors hover:text-foreground sm:block"
          >
            {content.cta.signIn.label}
          </a>
          <Button asChild size="sm" className="hidden sm:inline-flex">
            <a href={content.cta.startFree.href}>{content.cta.startFree.label}</a>
          </Button>
          <Button
            variant="outline"
            size="icon"
            className="md:hidden"
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X className="size-4" /> : <Menu className="size-4" />}
          </Button>
        </div>
      </div>

      {open ? (
        <nav
          id="mobile-nav"
          aria-label="Main mobile"
          className="border-t border-border/70 px-4 py-3 md:hidden"
        >
          <ul className="space-y-1">
            {content.nav.map((item) => (
              <li key={item.to}>
                <Link
                  to={item.to}
                  onClick={() => setOpen(false)}
                  className="block rounded-md px-3 py-2 text-sm text-muted-foreground hover:bg-surface hover:text-foreground"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
          <div className="mt-3 grid gap-2">
            <Button asChild variant="outline" size="sm">
              <a href={content.cta.signIn.href}>{content.cta.signIn.label}</a>
            </Button>
            <Button asChild size="sm">
              <a href={content.cta.startFree.href}>{content.cta.startFree.label}</a>
            </Button>
          </div>
        </nav>
      ) : null}
    </header>
  );
}
