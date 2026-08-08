import { createFileRoute } from "@tanstack/react-router";
import { AdminShell } from "@/components/admin/AdminShell";
import { StatCard } from "@/components/admin/StatCard";
import { OpsTable } from "@/components/admin/OpsTable";
import { ActionPanel } from "@/components/admin/ActionPanel";
import { ErrorCallout } from "@/components/admin/ErrorCallout";
import { runsColumns, runsRows, summaryStats } from "@/lib/mock-data";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "ReLead Admin — Centro de operaciones" },
      {
        name: "description",
        content:
          "Prototipo visual del panel administrativo de ReLead: estado de nodos, ejecuciones operativas y ciclo de autorización.",
      },
      { property: "og:title", content: "ReLead Admin — Centro de operaciones" },
      {
        property: "og:description",
        content:
          "Rediseño en tema oscuro del control plane de ReLead: tablas legibles, ciclo de acción y terminal RelNet.",
      },
    ],
  }),
  component: Resumen,
});

function Resumen() {
  return (
    <AdminShell
      title="Resumen operativo"
      subtitle="Estado del plano de control: nodos RelNet, despliegues, respaldos y acciones que requieren intervención humana."
    >
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {summaryStats.map((s) => (
          <StatCard key={s.label} {...s} />
        ))}
      </div>

      <div className="mt-4 grid gap-4 xl:grid-cols-[minmax(0,1fr)_360px]">
        <div className="min-w-0 space-y-4">
          <ErrorCallout kind="browser-session-required" />
          <OpsTable
            title="Ejecuciones recientes"
            description="IDs largos y rutas completas legibles: columnas prioritarias, scroll horizontal y detalle expandible."
            columns={runsColumns}
            rows={runsRows}
          />
        </div>
        <ActionPanel />
      </div>
    </AdminShell>
  );
}
