import { useState } from "react";
import {
  Check,
  CircleDashed,
  ExternalLink,
  Loader2,
  RotateCcw,
  ShieldCheck,
  TriangleAlert,
  X,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";
import { ErrorCallout } from "./ErrorCallout";

type StepState = "done" | "active" | "pending" | "failed";

const STEPS = [
  { key: "prepare", label: "Preparar", hint: "Validar plan y artefacto" },
  { key: "confirm", label: "Confirmar", hint: "Revisión del operador" },
  { key: "authorize", label: "Autorizar externamente", hint: "Relead Guard · 2 aprobadores" },
  { key: "execute", label: "Ejecutar", hint: "Aplicar en el nodo" },
  { key: "result", label: "Resultado", hint: "Verificación y bitácora" },
] as const;

const stateStyles: Record<StepState, string> = {
  done: "border-success/40 bg-success/10 text-success",
  active: "border-primary/50 bg-primary/10 text-primary",
  pending: "border-border bg-surface-2 text-muted-foreground",
  failed: "border-destructive/50 bg-destructive/10 text-destructive",
};

function StepIcon({ state }: { state: StepState }) {
  if (state === "done") return <Check className="size-3.5" />;
  if (state === "active") return <Loader2 className="size-3.5 animate-spin" />;
  if (state === "failed") return <X className="size-3.5" />;
  return <CircleDashed className="size-3.5" />;
}

export function ActionPanel({
  variant = "authorizing",
}: {
  /** authorizing = esperando aprobación externa · failed = ejecución fallida */
  variant?: "authorizing" | "failed";
}) {
  const [failed, setFailed] = useState(variant === "failed");
  const currentIndex = failed ? 3 : 2;
  const progress = failed ? 68 : 52;

  const stateOf = (i: number): StepState => {
    if (i < currentIndex) return "done";
    if (i === currentIndex) return failed ? "failed" : "active";
    return "pending";
  };

  return (
    <aside className="flex h-full flex-col overflow-hidden rounded-xl border border-border bg-card">
      <header className="border-b border-border px-4 py-3">
        <div className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-3">
          <div className="min-w-0">
            <p className="text-[11px] uppercase tracking-[0.14em] text-muted-foreground">
              Panel de acción
            </p>
            <h2 className="truncate text-sm font-semibold text-foreground">
              release.promote · 2026.08.08+3
            </h2>
          </div>
          <span className="mono-id shrink-0 rounded-md border border-border bg-surface-2 px-2 py-1 text-muted-foreground">
            {failed ? "fallida" : "pendiente"}
          </span>
        </div>
        <p className="mt-2 mono-id break-all whitespace-normal text-muted-foreground">
          mx-qro-edge-03 · /srv/relead/api/current
        </p>
      </header>

      <div className="border-b border-border px-4 py-3">
        <div className="mb-2 flex items-baseline justify-between text-xs">
          <span className="text-muted-foreground">Progreso del ciclo</span>
          <span className="font-mono tabular-nums text-foreground">{progress}%</span>
        </div>
        <Progress value={progress} className="h-1.5 bg-surface-2" />
      </div>

      <ol className="scroll-ops flex-1 space-y-1 overflow-y-auto px-3 py-3">
        {STEPS.map((s, i) => {
          const state = stateOf(i);
          return (
            <li key={s.key} className="relative pl-9">
              {i < STEPS.length - 1 ? (
                <span
                  aria-hidden
                  className={cn(
                    "absolute left-[15px] top-8 h-[calc(100%-1rem)] w-px",
                    state === "done" ? "bg-success/40" : "bg-border",
                  )}
                />
              ) : null}
              <span
                className={cn(
                  "absolute left-0 top-2 grid size-8 place-items-center rounded-lg border",
                  stateStyles[state],
                )}
              >
                <StepIcon state={state} />
              </span>
              <div className="rounded-lg px-1 py-2">
                <div className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-2">
                  <p
                    className={cn(
                      "truncate text-sm font-medium",
                      state === "pending" ? "text-muted-foreground" : "text-foreground",
                    )}
                  >
                    {i + 1}. {s.label}
                  </p>
                  {state === "active" ? (
                    <span className="shrink-0 text-[11px] font-medium text-primary">en curso</span>
                  ) : null}
                  {state === "failed" ? (
                    <span className="shrink-0 text-[11px] font-medium text-destructive">error</span>
                  ) : null}
                </div>
                <p className="mt-0.5 text-xs text-muted-foreground">{s.hint}</p>

                {state === "active" && s.key === "authorize" ? (
                  <div className="mt-2 rounded-lg border border-primary/30 bg-primary/8 p-3">
                    <p className="flex items-center gap-2 text-xs font-medium text-primary">
                      <ShieldCheck className="size-3.5 shrink-0" />
                      1 de 2 aprobaciones recibidas
                    </p>
                    <p className="mt-1 text-xs text-muted-foreground">
                      Aprobó ops.marcela · falta un segundo aprobador. Expira en 11:42.
                    </p>
                    <Button size="sm" className="mt-2 h-8 w-full gap-1.5 text-xs">
                      Abrir Relead Guard
                      <ExternalLink className="size-3.5" />
                    </Button>
                  </div>
                ) : null}

                {state === "failed" ? (
                  <div className="mt-2 space-y-2">
                    <ErrorCallout kind="terminal-not-authorized" compact />
                    <Button
                      size="sm"
                      variant="outline"
                      className="h-8 w-full gap-1.5 border-primary/40 bg-primary/10 text-xs text-primary hover:bg-primary/15"
                      onClick={() => setFailed(false)}
                    >
                      <RotateCcw className="size-3.5" />
                      Reintentar desde “Ejecutar”
                    </Button>
                  </div>
                ) : null}
              </div>
            </li>
          );
        })}
      </ol>

      <footer className="space-y-2 border-t border-border bg-surface/60 px-4 py-3">
        {!failed ? (
          <p className="flex items-start gap-2 text-xs text-muted-foreground">
            <TriangleAlert className="mt-0.5 size-3.5 shrink-0 text-warning" />
            La ejecución inicia automáticamente al completar la autorización externa.
          </p>
        ) : null}
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            className="h-9 flex-1 border-border bg-surface-2 text-xs"
            onClick={() => setFailed((f) => !f)}
          >
            {failed ? "Ver ciclo en curso" : "Simular fallo"}
          </Button>
          <Button variant="ghost" size="sm" className="h-9 text-xs text-muted-foreground">
            Cancelar
          </Button>
        </div>
      </footer>
    </aside>
  );
}
