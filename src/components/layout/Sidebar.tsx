import { NavLink } from 'react-router-dom'
import {
  Boxes,
  LayoutDashboard,
  Package,
  Warehouse,
  BellRing,
  Users,
  X,
} from 'lucide-react'
import { useInventoryStore, stockStatus } from '../../store/inventoryStore'

const links = [
  { to: '/app/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { to: '/app/products', label: 'Productos', icon: Package },
  { to: '/app/inventory', label: 'Inventario', icon: Warehouse },
  { to: '/app/alerts', label: 'Alertas', icon: BellRing },
  { to: '/app/users', label: 'Usuarios', icon: Users },
]

export default function Sidebar({
  open,
  onClose,
}: {
  open: boolean
  onClose: () => void
}) {
  const products = useInventoryStore((s) => s.products)
  const alertCount = products.filter((p) => stockStatus(p) !== 'ok').length

  return (
    <>
      {open && (
        <div className="fixed inset-0 z-40 bg-slate-900/40 lg:hidden dark:bg-black/60" onClick={onClose} />
      )}
      <aside
        className={`fixed inset-y-0 left-0 z-50 w-64 shrink-0 border-r border-slate-200 bg-white transition-transform lg:static lg:translate-x-0 dark:border-slate-800 dark:bg-slate-900 ${
          open ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex items-center justify-between px-5 py-4">
          <div className="flex items-center gap-2 font-semibold text-slate-900 dark:text-slate-100">
            <span className="flex size-8 items-center justify-center rounded-lg bg-brand-600 text-white">
              <Boxes size={18} />
            </span>
            MiGestion
          </div>
          <button
            onClick={onClose}
            className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-100 lg:hidden dark:hover:bg-slate-800"
            aria-label="Cerrar menú"
          >
            <X size={18} />
          </button>
        </div>

        <nav className="flex flex-col gap-1 px-3 py-2">
          {links.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              onClick={onClose}
              className={({ isActive }) =>
                `flex items-center justify-between rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ${
                  isActive
                    ? 'bg-brand-50 text-brand-700 dark:bg-brand-500/10 dark:text-brand-300'
                    : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-slate-100'
                }`
              }
            >
              <span className="flex items-center gap-3">
                <link.icon size={18} />
                {link.label}
              </span>
              {link.to === '/app/alerts' && alertCount > 0 && (
                <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-red-500 px-1 text-xs font-semibold text-white">
                  {alertCount}
                </span>
              )}
            </NavLink>
          ))}
        </nav>
      </aside>
    </>
  )
}
