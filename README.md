# ReLead Control Plane

Crea un prototipo visual, NO lo publiques, para rediseñar el panel administrativo de ReLead (api.relead.com.mx/admin). Es un centro de operaciones técnico en tema oscuro, con sidebar fija, topbar, tarjetas de estado, tablas operativas y panel lateral de acciones. Problemas actuales a corregir: 1) las tablas con IDs/rutas/valores largos se comprimen y rompen texto carácter por carácter; deben conservar legibilidad con columnas prioritarias, scroll horizontal y detalle expandible; 2) el panel de acción debe mostrar claramente el ciclo Preparar → Confirmar → Autorizar externamente → Ejecutar → Resultado, con progreso y botón de reintento; 3) la terminal RelNet debe sentirse como terminal real, ocupar ancho suficiente, con selector de nodo, estado de capacidades, shell, reconexión/reanudar, Ctrl+C y cierre; 4) errores como “browser session required” y “node did not authorize interactive terminal access” deben mostrarse con explicación y acción sugerida, no solo JSON crudo. Mantén estética profesional tipo control plane: fondos navy casi negros, cian como acento, verde/ámbar/rojo para estados, tipografía clara, densidad media, accesibilidad, responsive. Usa TypeScript + Tailwind + shadcn/ui. Incluye pantallas/estados de ejemplo para Resumen, RelNet, Backups/Releases y aprobación pendiente. No conectes APIs reales ni despliegues; es solo referencia de diseño.

This project was built with [Lovable](https://lovable.dev).

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/02beb63a-c151-4ec2-a840-a864adb48804).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
