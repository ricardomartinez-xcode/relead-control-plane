import { cn } from "@/lib/utils";
import type { Health } from "@/lib/mock-data";
import { StatusDot } from "./StatusPill";

const toneText: Record<Health, string> = {
  ok: "text-success",
  warn: "text-warning",
  error: "text-destructive",
  idle: "text-muted-foreground",
};

const toneStroke: Record<Health, string> = {
  ok: "stroke-success",
  warn: "stroke-warning",
  error: "stroke-destructive",
  idle: "stroke-muted-foreground",
};

function Spark({ data, tone }: { data: number[]; tone: Health }) {
  const max = Math.max(...data);
  const min = Math.min(...data);
  const span = max - min || 1;
  const pts = data
    .map((v, i) => `${(i / (data.length - 1)) * 100},${28 - ((v - min) / span) * 24 - 2}`)
    .join(" ");
  return (
    <svg viewBox="0 0 100 28" preserveAspectRatio="none" className="h-8 w-full" aria-hidden>
      <polyline
        points={pts}
        fill="none"
        strokeWidth={1.8}
        strokeLinecap="round"
        strokeLinejoin="round"
        className={cn("opacity-80", toneStroke[tone])}
        vectorEffect="non-scaling-stroke"
      />
    </svg>
  );
}

export function StatCard({
  label,
  value,
  delta,
  tone,
  spark,
}: {
  label: string;
  value: string;
  delta: string;
  tone: Health;
  spark: number[];
}) {
  return (
    <article className="panel-sheen relative overflow-hidden rounded-xl border border-border bg-card p-4">
      <div className="grid grid-cols-[minmax(0,1fr)_auto] items-start gap-3">
        <p className="min-w-0 text-xs font-medium uppercase tracking-[0.14em] text-muted-foreground">
          {label}
        </p>
        <StatusDot tone={tone} pulse={tone !== "ok"} />
      </div>
      <p className="mt-3 font-mono text-2xl font-semibold tabular-nums text-foreground">{value}</p>
      <p className={cn("mt-1 truncate text-xs", toneText[tone])}>{delta}</p>
      <div className="mt-2 -mb-1">
        <Spark data={spark} tone={tone} />
      </div>
    </article>
  );
}
