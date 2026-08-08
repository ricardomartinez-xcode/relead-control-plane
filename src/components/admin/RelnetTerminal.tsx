import { useState } from "react";
import {
  CircleStop,
  Copy,
  Maximize2,
  Plug,
  Play,
  RefreshCw,
  X,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { capabilities, nodes, terminalLines, type Health } from "@/lib/mock-data";
import { StatusDot, StatusPill } from "./StatusPill";
import { ErrorCallout } from "./ErrorCallout";

const lineTone: Record<string, string> = {
  cmd: "text-primary",
  out: "text-terminal-foreground/85",
  warn: "text-warning",
  err: "text-destructive",
};

const capTone: Record<Health, string> = {
  ok: "text-success",
  warn: "text-warning",
  error: "text-destructive",
  idle: "text-muted-foreground",
};

export function RelnetTerminal() {
  const [node, setNode] = useState(nodes[0]!.id);
  const [expanded, setExpanded] = useState(false);
  const unauthorized = node === "mx-qro-edge-03";
  const disconnected = node === "mx-mty-store-02";

  return (
    <section
      className={cn(
        "overflow-hidden rounded-xl border border-border bg-card",
        expanded && "fixed inset-3 z-50 shadow-panel sm:inset-6",
      )}
    >
      <header className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-3 border-b border-border bg-surface/70 px-3 py-2.5 sm:flex sm:justify-between">
        <div className="flex min-w-0 items-center gap-3">
          <span className="hidden shrink-0 items-center gap-1.5 sm:flex" aria-hidden>
            <span className="size-2.5 rounded-full bg-destructive/70" />
            <span className="size-2.5 rounded-full bg-warning/70" />
            <span className="size-2.5 rounded-full bg-success/70" />
          </span>
          <h2 className="truncate text-sm font-semibold text-foreground">Terminal RelNet</h2>
          <Select value={node} onValueChange={setNode}>
            <SelectTrigger
              aria-label="Seleccionar nodo"
              className="h-8 w-[190px] shrink-0 border-border bg-surface-2 font-mono text-xs"
            >
              <span className="truncate">{node}</span>
            </SelectTrigger>
            <SelectContent className="border-border bg-popover">
              {nodes.map((n) => (
                <SelectItem key={n.id} value={n.id} textValue={n.id} className="font-mono text-xs">
                  <span className="flex items-center gap-2">
                    <StatusDot tone={n.health} />
                    {n.id}
                  </span>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="flex shrink-0 items-center gap-1.5">
          <StatusPill tone={unauthorized ? "error" : disconnected ? "warn" : "ok"}>
            {unauthorized ? "sin autorización" : disconnected ? "reconectando" : "conectado"}
          </StatusPill>
          <Button
            size="icon"
            variant="ghost"
            aria-label="Pantalla completa"
            className="size-8 text-muted-foreground"
            onClick={() => setExpanded((v) => !v)}
          >
            <Maximize2 className="size-4" />
          </Button>
          <Button
            size="icon"
            variant="ghost"
            aria-label="Cerrar sesión de terminal"
            className="size-8 text-muted-foreground hover:text-destructive"
          >
            <X className="size-4" />
          </Button>
        </div>
      </header>

      <div className="grid gap-0 lg:grid-cols-[minmax(0,1fr)_248px]">
        <div className="min-w-0">
          {/* Barra de shell */}
          <div className="flex flex-wrap items-center gap-2 border-b border-border px-3 py-2 text-xs">
            <span className="text-muted-foreground">shell</span>
            <span className="mono-id rounded border border-border bg-surface-2 px-1.5 py-0.5 text-foreground">
              /bin/bash
            </span>
            <span className="text-muted-foreground">pty</span>
            <span className="mono-id rounded border border-border bg-surface-2 px-1.5 py-0.5 text-foreground">
              xterm-256color · 120×34
            </span>
            <span className="ml-auto flex items-center gap-1.5">
              <Button size="sm" variant="ghost" className="h-7 gap-1.5 text-xs text-muted-foreground">
                <RefreshCw className="size-3.5" /> Reconectar
              </Button>
              <Button size="sm" variant="ghost" className="h-7 gap-1.5 text-xs text-muted-foreground">
                <Play className="size-3.5" /> Reanudar
              </Button>
              <Button size="sm" variant="ghost" className="h-7 gap-1.5 text-xs text-warning">
                <CircleStop className="size-3.5" /> Ctrl+C
              </Button>
              <Button size="icon" variant="ghost" aria-label="Copiar salida" className="size-7 text-muted-foreground">
                <Copy className="size-3.5" />
              </Button>
            </span>
          </div>

          {unauthorized ? (
            <div className="space-y-3 bg-terminal p-4">
              <ErrorCallout kind="terminal-not-authorized" />
              <p className="mono-id text-muted-foreground">
                relnet attach mx-qro-edge-03 --pty → exit 77
              </p>
            </div>
          ) : (
            <div
              className={cn(
                "scroll-ops overflow-auto bg-terminal p-4 font-mono text-[12.5px] leading-relaxed",
                expanded ? "h-[calc(100vh-15rem)]" : "h-[360px]",
              )}
              tabIndex={0}
              role="log"
              aria-label="Salida de la terminal RelNet"
            >
              {disconnected ? (
                <p className="mb-3 rounded-md border border-warning/40 bg-warning/8 px-2.5 py-1.5 text-xs text-warning">
                  Conexión interrumpida hace 14 s · reintentando (2/5). La sesión se puede reanudar
                  sin perder el búfer.
                </p>
              ) : null}
              {terminalLines.map((l, i) => (
                <p key={i} className={cn("break-all whitespace-pre-wrap", lineTone[l.kind])}>
                  {l.kind === "cmd" ? (
                    <>
                      <span className="text-success">relead@{node}</span>
                      <span className="text-muted-foreground">:~$ </span>
                    </>
                  ) : null}
                  {l.text}
                </p>
              ))}
              <p className="mt-1 flex items-center gap-1 text-terminal-foreground">
                <span className="text-success">relead@{node}</span>
                <span className="text-muted-foreground">:~$</span>
                <span className="cursor-blink inline-block h-4 w-2 bg-primary align-middle" />
              </p>
            </div>
          )}
        </div>

        {/* Estado de capacidades */}
        <aside className="border-t border-border bg-surface/50 p-3 lg:border-l lg:border-t-0">
          <h3 className="text-[11px] uppercase tracking-[0.14em] text-muted-foreground">
            Capacidades del nodo
          </h3>
          <ul className="mt-2 space-y-1.5">
            {capabilities.map((c) => {
              const state: Health = unauthorized && c.name !== "archivos" ? "error" : c.state;
              return (
                <li
                  key={c.name}
                  className="rounded-lg border border-border bg-card px-2.5 py-2"
                >
                  <p className="flex items-center gap-2 text-xs font-medium">
                    <StatusDot tone={state} />
                    <span className={cn("truncate", capTone[state])}>{c.name}</span>
                  </p>
                  <p className="mt-0.5 pl-4 text-[11px] text-muted-foreground">{c.note}</p>
                </li>
              );
            })}
          </ul>

          <h3 className="mt-4 text-[11px] uppercase tracking-[0.14em] text-muted-foreground">
            Sesión
          </h3>
          <dl className="mt-2 space-y-1 text-xs">
            {[
              ["nodo", node],
              ["agente", nodes.find((n) => n.id === node)?.agent ?? "—"],
              ["región", nodes.find((n) => n.id === node)?.region ?? "—"],
              ["latencia", disconnected ? "—" : "38 ms"],
            ].map(([k, v]) => (
              <div key={k} className="grid grid-cols-[70px_minmax(0,1fr)] gap-2">
                <dt className="text-muted-foreground">{k}</dt>
                <dd className="mono-id truncate text-foreground" title={v}>
                  {v}
                </dd>
              </div>
            ))}
          </dl>

          <Button size="sm" variant="outline" className="mt-3 h-8 w-full gap-1.5 border-border bg-surface-2 text-xs">
            <Plug className="size-3.5" /> Nueva sesión
          </Button>
        </aside>
      </div>
    </section>
  );
}
