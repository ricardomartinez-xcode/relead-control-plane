import { createFileRoute } from "@tanstack/react-router";
import { Clock, FileDiff, User } from "lucide-react";
import { AdminShell } from "@/components/admin/AdminShell";
import { ActionPanel } from "@/components/admin/ActionPanel";
import { ErrorCallout } from "@/components/admin/ErrorCallout";
import { StatusPill } from "@/components/admin/StatusPill";

export const Route = createFileRoute("/approvals")({
  head: () => ({
    meta: [
      { title: "Aprobación pendiente | ReLead Admin" },
      {
        name: "description",
        content:
          "Ciclo Preparar → Confirmar → Autorizar externamente → Ejecutar → Resultado con progreso y reintento.",
      },
      { property: "og:title", content: "Aprobación pendiente | ReLead Admin" },
      {
        property: "og:description",
        content: "Estado de autorización externa y reintento de ejecución en el control plane de ReLead.",
      },
    ],
  }),
  component: Approvals,
});

const requests = [
  {
    id: "apr_01HZXA5F8T2N",
    op: "relnet.capability.enable",
    target: "mx-qro-edge-03 · [capabilities.interactive]",
    who: "ops.daniel@relead.com.mx",
    age: "hace 6 min",
    expires: "expira en 11:42",
    tone: "warn" as const,
  },
  {
    id: "apr_01HZXA2C1Q7B",
    op: "release.promote",
    target: "2026.08.08+3 → producción",
    who: "ci-bot (pipeline #4821)",
    age: "hace 18 min",
    expires: "expira en 41:10",
    tone: "idle" as const,
  },
  {
    id: "apr_01HZX9Z0M4K5",
    op: "backup.restore",
    target: "s3://relead-backups/mx/2026/08/07/pg-full-20260807T1930Z.dump.gz",
    who: "ops.marcela@relead.com.mx",
    age: "hace 32 min",
    expires: "bloqueada",
    tone: "error" as const,
  },
];

function Approvals() {
  return (
    <AdminShell
      title="Aprobación pendiente"
      subtitle="Cada operación sensible pasa por el mismo ciclo visible. Nada se ejecuta sin autorización externa registrada."
    >
      <div className="grid gap-4 xl:grid-cols-[minmax(0,1fr)_360px]">
        <div className="min-w-0 space-y-4">
          <section className="space-y-3">
            {requests.map((r) => (
              <article key={r.id} className="rounded-xl border border-border bg-card p-4">
                <div className="grid grid-cols-[minmax(0,1fr)_auto] items-start gap-3">
                  <div className="min-w-0">
                    <p className="truncate text-sm font-semibold text-foreground">{r.op}</p>
                    <p className="mt-1 mono-id break-all whitespace-normal text-muted-foreground">
                      {r.target}
                    </p>
                  </div>
                  <StatusPill tone={r.tone}>
                    {r.tone === "error" ? "bloqueada" : r.tone === "warn" ? "urgente" : "en cola"}
                  </StatusPill>
                </div>
                <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-1.5 text-xs text-muted-foreground">
                  <span className="flex items-center gap-1.5">
                    <User className="size-3.5 shrink-0" />
                    <span className="truncate">{r.who}</span>
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Clock className="size-3.5 shrink-0" /> {r.age} · {r.expires}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <FileDiff className="size-3.5 shrink-0" /> {r.id}
                  </span>
                </div>
                {r.tone === "error" ? (
                  <div className="mt-3">
                    <ErrorCallout kind="browser-session-required" compact />
                  </div>
                ) : null}
              </article>
            ))}
          </section>
        </div>
        <ActionPanel variant="failed" />
      </div>
    </AdminShell>
  );
}
