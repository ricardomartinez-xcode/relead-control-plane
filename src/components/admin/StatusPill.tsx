import { cn } from "@/lib/utils";
import type { Health } from "@/lib/mock-data";

const toneMap: Record<Health, { dot: string; text: string; ring: string; label: string }> = {
  ok: { dot: "bg-success", text: "text-success", ring: "ring-success/30", label: "Operativo" },
  warn: { dot: "bg-warning", text: "text-warning", ring: "ring-warning/30", label: "Degradado" },
  error: { dot: "bg-destructive", text: "text-destructive", ring: "ring-destructive/30", label: "Falla" },
  idle: { dot: "bg-muted-foreground", text: "text-muted-foreground", ring: "ring-border", label: "En espera" },
};

export function StatusDot({ tone, pulse }: { tone: Health; pulse?: boolean }) {
  return (
    <span
      aria-hidden
      className={cn(
        "inline-block size-2 shrink-0 rounded-full ring-3",
        toneMap[tone].dot,
        toneMap[tone].ring,
        pulse && "pulse-dot",
      )}
    />
  );
}

export function StatusPill({
  tone,
  children,
  className,
}: {
  tone: Health;
  children?: React.ReactNode;
  className?: string;
}) {
  const t = toneMap[tone];
  return (
    <span
      className={cn(
        "inline-flex shrink-0 items-center gap-2 rounded-full border border-border bg-surface-2/70 px-2.5 py-0.5 text-xs font-medium",
        t.text,
        className,
      )}
    >
      <StatusDot tone={tone} />
      {children ?? t.label}
    </span>
  );
}
