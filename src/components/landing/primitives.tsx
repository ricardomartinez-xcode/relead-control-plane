import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export function PreviewTag({ className }: { className?: string }) {
  return (
    <span
      className={cn(
        "inline-flex shrink-0 items-center rounded-full border border-warning/40 bg-warning/10 px-2 py-0.5 font-mono text-[10px] uppercase tracking-[0.14em] text-warning",
        className,
      )}
    >
      Preview
    </span>
  );
}

export function Eyebrow({ children }: { children: ReactNode }) {
  return (
    <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-primary">{children}</p>
  );
}

export function Section({
  id,
  eyebrow,
  title,
  lead,
  children,
  className,
  as: As = "section",
}: {
  id?: string;
  eyebrow?: string;
  title?: string;
  lead?: string;
  children?: ReactNode;
  className?: string;
  as?: "section" | "div";
}) {
  return (
    <As id={id} className={cn("border-t border-border/70 px-4 py-16 lg:px-8 lg:py-20", className)}>
      <div className="mx-auto max-w-6xl">
        {eyebrow ? <Eyebrow>{eyebrow}</Eyebrow> : null}
        {title ? (
          <h2 className="mt-3 max-w-3xl text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
            {title}
          </h2>
        ) : null}
        {lead ? <p className="mt-3 max-w-2xl text-sm text-muted-foreground sm:text-base">{lead}</p> : null}
        {children ? <div className="mt-8">{children}</div> : null}
      </div>
    </As>
  );
}

export function Card({ className, children }: { className?: string; children: ReactNode }) {
  return (
    <div
      className={cn(
        "panel-sheen rounded-xl border border-border bg-card p-5 transition-colors hover:border-border-strong",
        className,
      )}
    >
      {children}
    </div>
  );
}
