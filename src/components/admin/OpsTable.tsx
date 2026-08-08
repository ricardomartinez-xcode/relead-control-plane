import { Fragment, useState } from "react";
import { ChevronRight, Columns3, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import type { OpsRow } from "@/lib/mock-data";
import { StatusPill } from "./StatusPill";

export type OpsColumn = {
  key: string;
  label: string;
  /** 1 = siempre visible, 2 = desde md, 3 = solo con scroll / detalle */
  priority: 1 | 2 | 3 | number;
  mono?: boolean;
  width?: string;
};

export function OpsTable({
  title,
  description,
  columns,
  rows,
  onSelect,
  selectedId,
}: {
  title: string;
  description?: string;
  columns: OpsColumn[];
  rows: OpsRow[];
  onSelect?: (row: OpsRow) => void;
  selectedId?: string;
}) {
  const [expanded, setExpanded] = useState<string | null>(rows[0]?.id ?? null);
  const [dense, setDense] = useState(false);
  const [query, setQuery] = useState("");

  const visible = rows.filter((r) =>
    query.trim() === ""
      ? true
      : Object.values(r.cells).join(" ").toLowerCase().includes(query.toLowerCase()),
  );

  return (
    <section className="overflow-hidden rounded-xl border border-border bg-card">
      <header className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-3 border-b border-border px-4 py-3 sm:flex sm:justify-between">
        <div className="min-w-0">
          <h2 className="truncate text-sm font-semibold text-foreground">{title}</h2>
          {description ? (
            <p className="mt-0.5 truncate text-xs text-muted-foreground">{description}</p>
          ) : null}
        </div>
        <div className="flex shrink-0 items-center gap-2">
          <div className="relative hidden sm:block">
            <Search className="pointer-events-none absolute left-2.5 top-1/2 size-3.5 -translate-y-1/2 text-muted-foreground" />
            <Input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Filtrar…"
              aria-label={`Filtrar ${title}`}
              className="h-8 w-40 bg-surface-2 pl-8 font-mono text-xs"
            />
          </div>
          <Button
            variant="outline"
            size="sm"
            className="h-8 gap-1.5 border-border bg-surface-2 text-xs"
            aria-pressed={dense}
            onClick={() => setDense((d) => !d)}
          >
            <Columns3 className="size-3.5" />
            {dense ? "Prioritarias" : "Todas"}
          </Button>
        </div>
      </header>

      {/* Scroll horizontal: los IDs y rutas largas nunca se parten carácter a carácter */}
      <div className="scroll-ops overflow-x-auto">
        <table className="w-full min-w-[860px] border-collapse text-left">
          <thead>
            <tr className="bg-surface-2/60 text-[11px] uppercase tracking-[0.12em] text-muted-foreground">
              <th scope="col" className="w-10 px-3 py-2" />
              <th scope="col" className="w-[112px] px-3 py-2 font-medium">
                Estado
              </th>
              {columns.map((c) => (
                <th
                  key={c.key}
                  scope="col"
                  className={cn(
                    "px-3 py-2 font-medium whitespace-nowrap",
                    c.width,
                    dense && c.priority > 2 && "hidden",
                  )}
                >
                  {c.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {visible.map((row) => {
              const open = expanded === row.id;
              return (
                <Fragment key={row.id}>
                  <tr
                    onClick={() => {
                      setExpanded(open ? null : row.id);
                      onSelect?.(row);
                    }}
                    className={cn(
                      "cursor-pointer border-t border-border/70 transition-colors hover:bg-surface-2/60",
                      selectedId === row.id && "bg-primary/8",
                      open && "bg-surface-2/40",
                    )}
                  >
                    <td className="px-3 py-2.5 align-middle">
                      <button
                        type="button"
                        aria-expanded={open}
                        aria-label={`Detalle de ${row.id}`}
                        className="grid size-6 place-items-center rounded-md border border-border bg-surface text-muted-foreground transition-colors hover:text-primary focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none"
                        onClick={(e) => {
                          e.stopPropagation();
                          setExpanded(open ? null : row.id);
                        }}
                      >
                        <ChevronRight className={cn("size-3.5 transition-transform", open && "rotate-90")} />
                      </button>
                    </td>
                    <td className="px-3 py-2.5 align-middle">
                      <StatusPill tone={row.status} />
                    </td>
                    {columns.map((c) => (
                      <td
                        key={c.key}
                        className={cn(
                          "px-3 py-2.5 align-middle text-sm text-foreground/90",
                          dense && c.priority > 2 && "hidden",
                        )}
                      >
                        <span
                          className={cn(
                            "block max-w-[42ch] overflow-hidden text-ellipsis whitespace-nowrap",
                            c.mono && "mono-id text-foreground",
                          )}
                          title={row.cells[c.key]}
                        >
                          {row.cells[c.key]}
                        </span>
                      </td>
                    ))}
                  </tr>
                  {open ? (
                    <tr className="border-t border-border/70 bg-surface/60">
                      <td colSpan={columns.length + 2} className="px-4 py-4">
                        <dl className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
                          {row.details.map((d) => (
                            <div key={d.label} className="min-w-0 rounded-lg border border-border bg-card p-3">
                              <dt className="text-[11px] uppercase tracking-[0.12em] text-muted-foreground">
                                {d.label}
                              </dt>
                              <dd
                                className={cn(
                                  "mt-1 text-sm break-words text-foreground/90",
                                  d.mono && "font-mono text-xs break-all",
                                )}
                              >
                                {d.value}
                              </dd>
                            </div>
                          ))}
                        </dl>
                      </td>
                    </tr>
                  ) : null}
                </Fragment>
              );
            })}
            {visible.length === 0 ? (
              <tr>
                <td colSpan={columns.length + 2} className="px-4 py-10 text-center text-sm text-muted-foreground">
                  Sin coincidencias para “{query}”.
                </td>
              </tr>
            ) : null}
          </tbody>
        </table>
      </div>
      <footer className="flex items-center justify-between border-t border-border px-4 py-2 text-xs text-muted-foreground">
        <span>
          {visible.length} de {rows.length} registros · clic en una fila para ver el detalle
        </span>
        <span className="hidden font-mono sm:inline">desliza → para columnas largas</span>
      </footer>
    </section>
  );
}
