// Datos de ejemplo — prototipo visual, sin conexión a APIs reales.

export type Health = "ok" | "warn" | "error" | "idle";

export type OpsRow = {
  id: string;
  cells: Record<string, string>;
  status: Health;
  details: { label: string; value: string; mono?: boolean }[];
};

export const summaryStats = [
  {
    label: "Nodos RelNet en línea",
    value: "18 / 21",
    delta: "3 degradados",
    tone: "warn" as Health,
    spark: [12, 14, 16, 15, 18, 17, 18],
  },
  {
    label: "Éxito de despliegues (24h)",
    value: "97.4%",
    delta: "+1.8 pts vs ayer",
    tone: "ok" as Health,
    spark: [88, 91, 93, 92, 95, 96, 97],
  },
  {
    label: "Cola de aprobaciones",
    value: "4",
    delta: "1 vence en 12 min",
    tone: "warn" as Health,
    spark: [1, 2, 2, 3, 5, 4, 4],
  },
  {
    label: "Errores de sesión (1h)",
    value: "23",
    delta: "browser session required",
    tone: "error" as Health,
    spark: [2, 4, 9, 14, 18, 21, 23],
  },
];

export const runsColumns = [
  { key: "run", label: "Ejecución", priority: 1, mono: true, width: "w-[190px]" },
  { key: "operation", label: "Operación", priority: 1, width: "min-w-[190px]" },
  { key: "node", label: "Nodo", priority: 2, mono: true, width: "w-[150px]" },
  { key: "target", label: "Ruta destino", priority: 3, mono: true, width: "min-w-[300px]" },
  { key: "actor", label: "Actor", priority: 3, width: "min-w-[170px]" },
  { key: "duration", label: "Duración", priority: 2, mono: true, width: "w-[110px]" },
];

export const runsRows: OpsRow[] = [
  {
    id: "run_01HZX9Q4M7T2K",
    status: "error",
    cells: {
      run: "run_01HZX9Q4M7T2K8VB",
      operation: "relnet.terminal.attach",
      node: "mx-qro-edge-03",
      target: "/srv/relead/api/deploy/releases/2026-08-08T21-14-02Z/bundle.tar.zst",
      actor: "ops.marcela@relead.com.mx",
      duration: "00:00:04",
    },
    details: [
      { label: "Motivo", value: "node did not authorize interactive terminal access" },
      { label: "Traza", value: "trace_9f31c0a4e7b84d51ab77e2c9d0f4a812", mono: true },
      { label: "Capacidades solicitadas", value: "shell:bash, pty, signal:INT", mono: true },
      { label: "Origen", value: "203.0.113.44 · sesión admin sin verificación de navegador" },
    ],
  },
  {
    id: "run_01HZX8B2D9P0R",
    status: "ok",
    cells: {
      run: "run_01HZX8B2D9P0RQ4C",
      operation: "release.promote",
      node: "mx-cdmx-core-01",
      target: "/srv/relead/api/current -> releases/2026-08-08T20-02-51Z",
      actor: "ci-bot (pipeline #4821)",
      duration: "00:01:37",
    },
    details: [
      { label: "Checksum", value: "sha256:8b1c0f2a9d4e77b3c1568ae0d92f4471bb03cc9e1d5a6f8823ff41a0c7d95e12", mono: true },
      { label: "Migraciones", value: "3 aplicadas · 0 pendientes" },
      { label: "Ventana", value: "20:02:51 – 20:04:28 UTC" },
    ],
  },
  {
    id: "run_01HZX7Y1C4N8M",
    status: "warn",
    cells: {
      run: "run_01HZX7Y1C4N8MJ2D",
      operation: "backup.snapshot",
      node: "mx-mty-store-02",
      target: "s3://relead-backups/mx/2026/08/08/pg-full-20260808T1930Z.dump.gz",
      actor: "scheduler.cron@relead",
      duration: "00:12:08",
    },
    details: [
      { label: "Aviso", value: "Compresión más lenta que el umbral (p95 = 07:40)" },
      { label: "Tamaño", value: "41.7 GB (comprimido) · 132.4 GB en origen" },
      { label: "Retención", value: "30 días · réplica en mx-central" },
    ],
  },
  {
    id: "run_01HZX6R0A2L5Q",
    status: "idle",
    cells: {
      run: "run_01HZX6R0A2L5QW9F",
      operation: "config.reload",
      node: "mx-qro-edge-01",
      target: "/etc/relead/relnet/agent.d/10-capabilities.toml",
      actor: "ops.daniel@relead.com.mx",
      duration: "—",
    },
    details: [
      { label: "Estado", value: "En espera de autorización externa (Relead Guard)" },
      { label: "Diff", value: "+2 líneas / -1 línea en [capabilities.interactive]", mono: true },
    ],
  },
];

export const releaseColumns = [
  { key: "version", label: "Versión", priority: 1, mono: true, width: "w-[160px]" },
  { key: "artifact", label: "Artefacto", priority: 3, mono: true, width: "min-w-[330px]" },
  { key: "env", label: "Entorno", priority: 1, width: "w-[130px]" },
  { key: "created", label: "Creado", priority: 2, mono: true, width: "w-[160px]" },
  { key: "size", label: "Tamaño", priority: 2, mono: true, width: "w-[110px]" },
];

export const releaseRows: OpsRow[] = [
  {
    id: "rel-2026.08.08-3",
    status: "ok",
    cells: {
      version: "2026.08.08+3",
      artifact: "releases/2026-08-08T20-02-51Z/bundle.tar.zst",
      env: "producción",
      created: "2026-08-08 20:02",
      size: "88.2 MB",
    },
    details: [
      { label: "Activo en", value: "mx-cdmx-core-01, mx-qro-edge-01, mx-qro-edge-02" },
      { label: "Reversión a", value: "2026.08.07+5 (probada hace 2 h)" },
    ],
  },
  {
    id: "rel-2026.08.08-2",
    status: "warn",
    cells: {
      version: "2026.08.08+2",
      artifact: "releases/2026-08-08T17-41-09Z/bundle.tar.zst",
      env: "staging",
      created: "2026-08-08 17:41",
      size: "88.0 MB",
    },
    details: [
      { label: "Aviso", value: "2 pruebas de humo con reintento antes de pasar" },
      { label: "Notas", value: "Ajuste de límites en el proxy RelNet" },
    ],
  },
  {
    id: "bkp-20260808T1930Z",
    status: "ok",
    cells: {
      version: "pg-full-1930Z",
      artifact: "s3://relead-backups/mx/2026/08/08/pg-full-20260808T1930Z.dump.gz",
      env: "backup",
      created: "2026-08-08 19:30",
      size: "41.7 GB",
    },
    details: [
      { label: "Verificación", value: "restauración de prueba OK (14 min)" },
      { label: "Cifrado", value: "AES-256-GCM · llave kms/relead-backups-mx", mono: true },
    ],
  },
  {
    id: "bkp-20260807T1930Z",
    status: "error",
    cells: {
      version: "pg-full-1930Z",
      artifact: "s3://relead-backups/mx/2026/08/07/pg-full-20260807T1930Z.dump.gz",
      env: "backup",
      created: "2026-08-07 19:30",
      size: "0 B",
    },
    details: [
      { label: "Fallo", value: "browser session required — la carga se abortó al expirar la sesión" },
      { label: "Acción", value: "Reintentar con sesión verificada o programar desde el agente" },
    ],
  },
];

export const nodes = [
  { id: "mx-cdmx-core-01", region: "CDMX", health: "ok" as Health, load: "0.42", agent: "1.9.3" },
  { id: "mx-qro-edge-01", region: "Querétaro", health: "ok" as Health, load: "0.31", agent: "1.9.3" },
  { id: "mx-qro-edge-03", region: "Querétaro", health: "error" as Health, load: "0.88", agent: "1.8.7" },
  { id: "mx-mty-store-02", region: "Monterrey", health: "warn" as Health, load: "0.67", agent: "1.9.1" },
];

export const capabilities = [
  { name: "shell", state: "ok" as Health, note: "bash 5.2 · pty asignado" },
  { name: "señales", state: "ok" as Health, note: "INT, TERM permitidas" },
  { name: "archivos", state: "warn" as Health, note: "solo lectura en /srv" },
  { name: "terminal interactiva", state: "error" as Health, note: "no autorizada por el nodo" },
];

export const terminalLines = [
  { kind: "cmd", text: "relnet attach mx-qro-edge-01 --pty" },
  { kind: "out", text: "sesión relnet establecida · nodo mx-qro-edge-01 · agente 1.9.3" },
  { kind: "out", text: "capacidades: shell, señales, archivos(ro)" },
  { kind: "cmd", text: "systemctl status relead-api --no-pager" },
  { kind: "out", text: "● relead-api.service - ReLead API" },
  { kind: "out", text: "   Active: active (running) since Sat 2026-08-08 20:04:31 UTC; 2h 49min ago" },
  { kind: "out", text: "   Main PID: 20481 (relead-api)  Tasks: 42  Memory: 612.4M" },
  { kind: "cmd", text: "tail -n 3 /var/log/relead/api.log" },
  { kind: "warn", text: "20:58:11 WARN relnet.proxy retry=1 upstream=mx-qro-edge-03 reason=timeout" },
  { kind: "out", text: "21:01:44 INFO release.promote ok version=2026.08.08+3" },
  { kind: "err", text: "21:12:02 ERROR terminal.attach node=mx-qro-edge-03 reason=not_authorized" },
] as const;
