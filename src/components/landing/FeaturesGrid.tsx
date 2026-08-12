import {
  LayoutDashboard,
  BarChart3,
  ShieldCheck,
  Package,
  Boxes,
  BellRing,
  Users,
  Smartphone,
  BrainCircuit,
  MessageCircle,
} from 'lucide-react'

const features = [
  {
    icon: LayoutDashboard,
    title: 'Dashboard en tiempo real',
    description: 'KPIs de stock, ventas e insights a simple vista al iniciar sesión.',
  },
  {
    icon: BarChart3,
    title: 'Gráficos e indicadores',
    description: 'Tendencias de stock, distribución por categoría y estado del inventario.',
  },
  {
    icon: ShieldCheck,
    title: 'Login y roles',
    description: 'Acceso protegido con roles de administrador y empleado.',
  },
  {
    icon: Package,
    title: 'Gestión de productos',
    description: 'Alta, edición y baja de productos con categorías, precios y costos.',
  },
  {
    icon: Boxes,
    title: 'Control de inventario',
    description: 'Ajustá entradas y salidas de stock y seguí cada movimiento.',
  },
  {
    icon: BellRing,
    title: 'Alertas automáticas',
    description: 'Notificaciones de stock bajo, crítico o agotado en tiempo real.',
  },
  {
    icon: Users,
    title: 'Gestión de usuarios',
    description: 'Administrá tu equipo y sus permisos de acceso a la plataforma.',
  },
  {
    icon: Smartphone,
    title: '100% responsive',
    description: 'Usable desde el celular, la tablet o la computadora del local.',
  },
  {
    icon: BrainCircuit,
    title: 'IA para cálculos',
    description: 'Predicción de quiebre de stock y sugerencias de reposición automáticas.',
  },
  {
    icon: MessageCircle,
    title: 'Chatbot de ayuda',
    description: 'Asistente virtual que responde dudas y consulta tu inventario al instante.',
  },
]

export default function FeaturesGrid() {
  return (
    <section id="funcionalidades" className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
      <div className="mx-auto max-w-2xl text-center">
        <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl dark:text-slate-100">
          Todo lo que tu comercio necesita
        </h2>
        <p className="mt-3 text-slate-600 dark:text-slate-400">
          Una plataforma completa para dejar de perder tiempo (y plata) por falta de control
          de stock.
        </p>
      </div>
      <div className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {features.map((f) => (
          <div
            key={f.title}
            className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm shadow-slate-200/50 transition-transform hover:-translate-y-0.5 hover:shadow-md dark:border-slate-800 dark:bg-slate-900 dark:shadow-none"
          >
            <span className="mb-4 flex size-10 items-center justify-center rounded-lg bg-brand-50 text-brand-600 dark:bg-brand-500/10 dark:text-brand-300">
              <f.icon size={20} />
            </span>
            <h3 className="font-semibold text-slate-900 dark:text-slate-100">{f.title}</h3>
            <p className="mt-1.5 text-sm text-slate-600 dark:text-slate-400">{f.description}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
