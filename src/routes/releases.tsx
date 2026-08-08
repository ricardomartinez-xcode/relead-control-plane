import { createFileRoute } from "@tanstack/react-router";
import { Archive, Download, RotateCcw, ShieldCheck } from "lucide-react";
import { AdminShell } from "@/components/admin/AdminShell";
import { OpsTable } from "@/components/admin/OpsTable";
import { ErrorCallout } from "@/components/admin/ErrorCallout";
import { Button } from "@/components/ui/button";
import { releaseColumns, releaseRows } from "@/lib/mock-data";

export const Route = createFileRoute("/releases")({
  head: () => ({
    meta: [
      { title: "Backups y Releases | ReLead Admin" },
      {
        name: "description",
        content:
          "Inventario de releases y respaldos de ReLead con artefactos completos, verificación y reversión.",
      },
      { property: "og:title", content: "Backups y Releases | ReLead Admin" },
      {
        property: "og:description",
        content: "Artefactos, checksums y reversiones legibles en el control plane de ReLead.",
      },
    ],
  }),
  component: Releases,
});

const actions = [
  { icon: Download, label: "Crear respaldo manual", note: "pg-full · ~12 min" },
  { icon: RotateCcw, label: "Revertir a 2026.08.07+5", note: "requiere autorización externa" },
  { icon: ShieldCheck, label: "Verificar restauración", note: "última verificación hace 4 h" },
];

function Releases() {
  return (
    <AdminShell
      title="Backups y Releases"
      subtitle="Artefactos, rutas S3 y checksums completos sin truncar el contexto: prioriza versión y entorno, el resto vive en el detalle."
    >
      <div className="grid gap-4 xl:grid-cols-[minmax(0,1fr)_320px]">
        <div className="min-w-0 space-y-4">
          <OpsTable
            title="Inventario"
            description="Releases y respaldos de las últimas 48 horas."
            columns={releaseColumns}
            rows={releaseRows}
          />
          <ErrorCallout kind="browser-session-required" />
        </div>

        <aside className="space-y-3">
          <section className="rounded-xl border border-border bg-card p-4">
            <h2 className="flex items-center gap-2 text-sm font-semibold text-foreground">
              <Archive className="size-4 text-primary" />
              Acciones
            </h2>
            <ul className="mt-3 space-y-2">
              {actions.map((a) => (
                <li key={a.label}>
                  <Button
                    variant="outline"
                    className="grid h-auto w-full grid-cols-[auto_minmax(0,1fr)] items-start gap-2.5 border-border bg-surface-2 px-3 py-2.5 text-left"
                  >
                    <a.icon className="mt-0.5 size-4 shrink-0 text-primary" />
                    <span className="min-w-0">
                      <span className="block truncate text-xs font-medium text-foreground">
                        {a.label}
                      </span>
                      <span className="block truncate text-[11px] text-muted-foreground">
                        {a.note}
                      </span>
                    </span>
                  </Button>
                </li>
              ))}
            </ul>
          </section>

          <section className="rounded-xl border border-border bg-card p-4">
            <h2 className="text-sm font-semibold text-foreground">Retención</h2>
            <dl className="mt-3 space-y-2 text-xs">
              {[
                ["diarios", "30 días"],
                ["semanales", "12 semanas"],
                ["mensuales", "24 meses"],
                ["réplica", "mx-central + us-east"],
              ].map(([k, v]) => (
                <div key={k} className="grid grid-cols-[90px_minmax(0,1fr)] gap-2">
                  <dt className="text-muted-foreground">{k}</dt>
                  <dd className="truncate font-mono text-foreground">{v}</dd>
                </div>
              ))}
            </dl>
          </section>
        </aside>
      </div>
    </AdminShell>
  );
}
