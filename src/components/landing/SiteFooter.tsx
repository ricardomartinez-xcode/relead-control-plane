import { Link } from "@tanstack/react-router";
import { Network } from "lucide-react";
import { content } from "@/content";

export function SiteFooter() {
  return (
    <footer className="border-t border-border/70 px-4 py-10 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <div className="flex flex-wrap items-center gap-x-6 gap-y-4">
          <span className="flex items-center gap-2 text-sm font-semibold text-foreground">
            <Network className="size-4 text-primary" aria-hidden="true" />
            {content.brand.name}
          </span>
          <nav aria-label="Footer" className="flex flex-wrap gap-x-5 gap-y-2">
            {content.footer.links.map((item) =>
              "to" in item ? (
                <Link
                  key={item.label}
                  to={item.to}
                  className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                >
                  {item.label}
                </Link>
              ) : (
                <a
                  key={item.label}
                  href={item.href}
                  className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                >
                  {item.label}
                </a>
              ),
            )}
          </nav>
        </div>
        <p className="mt-6 max-w-2xl text-xs text-muted-foreground">{content.footer.note}</p>
      </div>
    </footer>
  );
}
