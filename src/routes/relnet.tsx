import { createFileRoute } from "@tanstack/react-router";
import { AdminShell } from "@/components/admin/AdminShell";
import { RelnetTerminal } from "@/components/admin/RelnetTerminal";
import { OpsTable } from "@/components/admin/OpsTable";
import { StatusPill } from "@/components/admin/StatusPill";
import { nodes, runsColumns, runsRows } from "@/lib/mock-data";

export const Route = createFileRoute("/relnet")({
  head: () => ({
    meta: [
      { title: "RelNet — Terminal de nodos | ReLead Admin" },
      {
        name: "description",
        content:
          "Terminal RelNet con selector de nodo, estado de capacidades, reconexión, reanudar sesión y Ctrl+C.",
      },
      { property: "og:title", content: "RelNet — Terminal de nodos | ReLead Admin" },
      {
        property: "og:description",
        content: "Terminal real de operaciones sobre nodos RelNet con estados de error explicados.",
      },
    ],
  }),
  component: RelNet,
});

function RelNet() {
  return (
    <AdminShell
      title="RelNet"
      subtitle="Acceso operativo a los nodos. Selecciona un nodo para ver capacidades, abrir shell o revisar por qué la terminal interactiva fue rechazada."
    >
      <div className="mb-4 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
        {nodes.map((n) => (
          <article key={n.id} className="rounded-xl border border-border bg-card p-3">
            <div className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-2">
              <p className="mono-id truncate text-foreground" title={n.id}>
                {n.id}
              </p>
              <StatusPill tone={n.health} />
            </div>
            <dl className="mt-2 grid grid-cols-3 gap-2 text-xs">
              {[
                ["región", n.region],
                ["carga", n.load],
                ["agente", n.agent],
              ].map(([k, v]) => (
                <div key={k} className="min-w-0">
                  <dt className="text-[10px] uppercase tracking-[0.1em] text-muted-foreground">{k}</dt>
                  <dd className="truncate font-mono text-foreground">{v}</dd>
                </div>
              ))}
            </dl>
          </article>
        ))}
      </div>

      <RelnetTerminal />

      <div className="mt-4">
        <OpsTable
          title="Actividad de sesiones RelNet"
          description="Selecciona mx-qro-edge-03 en la terminal para ver el estado sin autorización."
          columns={runsColumns}
          rows={runsRows}
        />
      </div>
    </AdminShell>
  );
}
