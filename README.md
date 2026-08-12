# MiGestion

Plataforma de gestión de inventario para pequeños comercios — proyecto de muestra de portafolio.

Landing pública, login, dashboard con gráficos e insights de IA, gestión de productos e inventario, alertas automáticas, gestión de usuarios, chatbot de ayuda y soporte de modo oscuro.

## Stack

React + TypeScript + Vite + Tailwind CSS + React Router + Zustand + Recharts.

Todos los datos son simulados: se cargan desde `src/data/seed.ts` y se persisten en el `localStorage` del navegador. No hay backend ni llamadas a APIs externas — los cálculos de "IA" (predicción de stock, sugerencia de reposición) son fórmulas determinísticas, y el chatbot responde por reglas y consultas al estado local del inventario.

## Uso

```bash
npm install
npm run dev
```

Credenciales de demo (ver también en la pantalla de login):

- `admin@migestion.com` / `demo123` (rol admin)
- `camila@migestion.com` / `demo123` (rol empleado)

## Build de producción

```bash
npm run build
npm run preview
```

## Seguridad y deploy

- No hay backend ni secretos: es una SPA 100% estática, no requiere variables de entorno.
- Headers de seguridad (CSP, `X-Frame-Options`, etc.) ya configurados para los dos proveedores más comunes: `public/_headers` (Netlify / Cloudflare Pages) y `vercel.json` (Vercel). Si desplegás en otro proveedor, replicá esos mismos headers en su mecanismo de configuración.
- Las contraseñas de los usuarios de muestra están en texto plano en `src/data/seed.ts` y se guardan así en `localStorage` — es aceptable porque es un demo sin backend real (no hay nada que proteger), pero **no reutilizar este patrón en un proyecto con datos reales**.
