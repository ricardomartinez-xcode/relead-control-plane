import { BookOpen, MonitorSmartphone, ShieldAlert, Terminal } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type Kind = "browser-session-required" | "terminal-not-authorized";

const CATALOG: Record<
  Kind,
  {
    code: string;
    title: string;
    plain: string;
    why: string;
    action: string;
    cta: string;
    secondary: string;
    icon: typeof ShieldAlert;
    tone: "warning" | "destructive";
    raw: string;
  }
> = {
  "browser-session-required": {
    code: "browser_session_required",
    title: "Se requiere una sesión de navegador verificada",
    plain:
      "La operación necesita una sesión iniciada desde el navegador, no un token de API.",
    why: "Tu sesión expiró o la petición llegó desde un cliente sin verificación de dispositivo.",
    action:
      "Vuelve a iniciar sesión en el panel desde este navegador y reintenta. Si es una tarea automatizada, prográmala desde el agente con credenciales de servicio.",
    cta: "Verificar sesión",
    secondary: "Ver requisitos de sesión",
    icon: MonitorSmartphone,
    tone: "warning",
    raw: '{"error":"browser_session_required","status":401,"trace":"trace_9f31c0a4e7b8"}',
  },
  "terminal-not-authorized": {
    code: "node_did_not_authorize_interactive_terminal_access",
    title: "El nodo no autorizó el acceso a terminal interactiva",
    plain:
      "El agente del nodo rechazó abrir una terminal interactiva para esta sesión.",
    why: "En mx-qro-edge-03 la capacidad “terminal interactiva” está deshabilitada y el agente 1.8.7 no la soporta.",
    action:
      "Habilita la capacidad en agent.d/10-capabilities.toml (requiere aprobación) o actualiza el agente a 1.9.x. Mientras tanto, usa comandos no interactivos.",
    cta: "Solicitar capacidad",
    secondary: "Ejecutar sin terminal",
    icon: Terminal,
    tone: "destructive",
    raw: '{"error":"node_did_not_authorize_interactive_terminal_access","node":"mx-qro-edge-03","agent":"1.8.7"}',
  },
};

export function ErrorCallout({
  kind,
  compact = false,
}: {
  kind: Kind;
  compact?: boolean;
}) {
  const e = CATALOG[kind];
  const Icon = e.icon;
  const toneBorder = e.tone === "warning" ? "border-warning/40" : "border-destructive/40";
  const toneBg = e.tone === "warning" ? "bg-warning/8" : "bg-destructive/8";
  const toneText = e.tone === "warning" ? "text-warning" : "text-destructive";

  return (
    <div className={cn("rounded-lg border p-3", toneBorder, toneBg)}>
      <div className="grid grid-cols-[auto_minmax(0,1fr)] gap-2.5">
        <Icon className={cn("mt-0.5 size-4 shrink-0", toneText)} />
        <div className="min-w-0">
          <p className={cn("text-sm font-semibold", toneText)}>{e.title}</p>
          <p className="mt-1 text-xs text-foreground/85">{e.plain}</p>
          {!compact ? (
            <dl className="mt-2 space-y-1.5 text-xs">
              <div>
                <dt className="inline text-muted-foreground">Por qué ocurre: </dt>
                <dd className="inline text-foreground/85">{e.why}</dd>
              </div>
              <div>
                <dt className="inline text-muted-foreground">Acción sugerida: </dt>
                <dd className="inline text-foreground/85">{e.action}</dd>
              </div>
            </dl>
          ) : (
            <p className="mt-1 text-xs text-muted-foreground">{e.action}</p>
          )}

          <div className="mt-2.5 flex flex-wrap items-center gap-2">
            <Button size="sm" className="h-8 text-xs">
              {e.cta}
            </Button>
            <Button
              size="sm"
              variant="outline"
              className="h-8 border-border bg-surface-2 text-xs"
            >
              {e.secondary}
            </Button>
            {!compact ? (
              <Button size="sm" variant="ghost" className="h-8 gap-1.5 text-xs text-muted-foreground">
                <BookOpen className="size-3.5" />
                Documentación
              </Button>
            ) : null}
          </div>

          {!compact ? (
            <details className="mt-2.5 rounded-md border border-border bg-terminal/70">
              <summary className="cursor-pointer px-2.5 py-1.5 text-xs text-muted-foreground">
                Detalle técnico (JSON)
              </summary>
              <pre className="scroll-ops overflow-x-auto px-2.5 pb-2.5 font-mono text-[11px] text-terminal-foreground">
                {e.raw}
              </pre>
            </details>
          ) : (
            <p className="mt-2 mono-id break-all whitespace-normal text-muted-foreground">{e.code}</p>
          )}
        </div>
      </div>
    </div>
  );
}
