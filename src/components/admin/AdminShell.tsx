import { useState, type ReactNode } from "react";
import { Link, useRouterState } from "@tanstack/react-router";
import {
  Activity,
  Archive,
  Bell,
  ChevronsLeft,
  ChevronsRight,
  Command,
  LayoutDashboard,
  Search,
  ShieldCheck,
  TerminalSquare,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { StatusDot } from "./StatusPill";

const NAV = [
  { to: "/", label: "Resumen", icon: LayoutDashboard },
  { to: "/relnet", label: "RelNet", icon: TerminalSquare },
  { to: "/releases", label: "Backups / Releases", icon: Archive },
  { to: "/approvals", label: "Aprobaciones", icon: ShieldCheck, badge: "4" },
];

export function AdminShell({
  title,
  subtitle,
  children,
}: {
  title: string;
  subtitle: string;
  children: ReactNode;
}) {
  const [collapsed, setCollapsed] = useState(false);
  const pathname = useRouterState({ select: (r) => r.location.pathname });

  return (
    <div className="grid-backdrop min-h-screen bg-background">
      {/* Sidebar fija */}
      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-40 hidden flex-col border-r border-sidebar-border bg-sidebar md:flex",
          collapsed ? "w-[68px]" : "w-[236px]",
        )}
      >
        <div className="flex h-14 items-center gap-2.5 border-b border-sidebar-border px-3">
          <span className="grid size-8 shrink-0 place-items-center rounded-lg border border-primary/40 bg-primary/12">
            <Activity className="size-4 text-primary" />
          </span>
          {!collapsed ? (
            <div className="min-w-0">
              <p className="truncate text-sm font-semibold tracking-tight text-sidebar-foreground">
                ReLead
              </p>
              <p className="mono-id truncate text-[10px] text-muted-foreground">control plane</p>
            </div>
          ) : null}
        </div>

        <nav className="flex-1 space-y-1 p-2" aria-label="Navegación principal">
          {NAV.map((item) => {
            const active = pathname === item.to;
            return (
              <Link
                key={item.to}
                to={item.to}
                title={item.label}
                className={cn(
                  "group grid grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-2.5 rounded-lg px-2.5 py-2 text-sm transition-colors",
                  active
                    ? "bg-sidebar-accent text-sidebar-accent-foreground shadow-[inset_2px_0_0_0_var(--sidebar-primary)]"
                    : "text-muted-foreground hover:bg-sidebar-accent/60 hover:text-sidebar-foreground",
                )}
              >
                <item.icon className={cn("size-4 shrink-0", active && "text-primary")} />
                {!collapsed ? <span className="truncate">{item.label}</span> : null}
                {!collapsed && item.badge ? (
                  <span className="shrink-0 rounded-full border border-warning/40 bg-warning/12 px-1.5 text-[10px] font-medium text-warning">
                    {item.badge}
                  </span>
                ) : null}
              </Link>
            );
          })}
        </nav>

        <div className="space-y-2 border-t border-sidebar-border p-2">
          {!collapsed ? (
            <div className="rounded-lg border border-border bg-surface/70 px-2.5 py-2">
              <p className="flex items-center gap-2 text-xs text-foreground">
                <StatusDot tone="warn" pulse />
                18/21 nodos
              </p>
              <p className="mt-0.5 mono-id text-[10px] text-muted-foreground">región mx-central</p>
            </div>
          ) : null}
          <Button
            variant="ghost"
            size="sm"
            aria-label={collapsed ? "Expandir barra lateral" : "Colapsar barra lateral"}
            className="h-8 w-full justify-center text-muted-foreground"
            onClick={() => setCollapsed((c) => !c)}
          >
            {collapsed ? <ChevronsRight className="size-4" /> : <ChevronsLeft className="size-4" />}
          </Button>
        </div>
      </aside>

      <div className={cn("min-w-0", collapsed ? "md:pl-[68px]" : "md:pl-[236px]")}>
        {/* Topbar */}
        <header className="sticky top-0 z-30 border-b border-border bg-background/85 backdrop-blur">
          <div className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-3 px-4 py-2.5 lg:px-6">
            <div className="min-w-0">
              <p className="mono-id truncate text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
                api.relead.com.mx / admin
              </p>
              <h1 className="truncate text-base font-semibold tracking-tight text-foreground sm:text-lg">
                {title}
              </h1>
            </div>
            <div className="flex shrink-0 items-center gap-2">
              <div className="relative hidden md:block">
                <Search className="pointer-events-none absolute left-2.5 top-1/2 size-3.5 -translate-y-1/2 text-muted-foreground" />
                <Input
                  placeholder="Buscar nodo, run o release"
                  aria-label="Buscar"
                  className="h-9 w-64 bg-surface pl-8 text-xs"
                />
                <kbd className="pointer-events-none absolute right-2 top-1/2 flex -translate-y-1/2 items-center gap-0.5 rounded border border-border bg-surface-2 px-1 font-mono text-[10px] text-muted-foreground">
                  <Command className="size-2.5" />K
                </kbd>
              </div>
              <Button
                size="icon"
                variant="outline"
                aria-label="Notificaciones (2 nuevas)"
                className="relative size-9 border-border bg-surface"
              >
                <Bell className="size-4" />
                <span className="absolute right-1.5 top-1.5 size-1.5 rounded-full bg-warning" />
              </Button>
              <span className="grid size-9 shrink-0 place-items-center rounded-lg border border-border bg-surface font-mono text-xs text-primary">
                MG
              </span>
            </div>
          </div>
          <nav className="scroll-ops flex gap-1 overflow-x-auto border-t border-border px-2 py-1.5 md:hidden">
            {NAV.map((item) => {
              const active = pathname === item.to;
              return (
                <Link
                  key={item.to}
                  to={item.to}
                  className={cn(
                    "shrink-0 rounded-lg px-3 py-1.5 text-xs",
                    active ? "bg-surface-2 text-primary" : "text-muted-foreground",
                  )}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>
        </header>

        <main className="px-4 py-5 lg:px-6">
          <p className="mb-4 max-w-2xl text-sm text-muted-foreground">{subtitle}</p>
          {children}
        </main>
      </div>
    </div>
  );
}
