import { Menu, LogOut } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { useAuthStore } from '../../store/authStore'

export default function Topbar({ onMenuClick, title }: { onMenuClick: () => void; title: string }) {
  const { currentUser, logout } = useAuthStore()
  const navigate = useNavigate()

  function handleLogout() {
    logout()
    navigate('/')
  }

  return (
    <header className="sticky top-0 z-30 flex items-center justify-between border-b border-slate-200 bg-white/80 px-4 py-3 backdrop-blur-md sm:px-6 dark:border-slate-800 dark:bg-slate-900/80">
      <div className="flex items-center gap-3">
        <button
          onClick={onMenuClick}
          className="rounded-lg p-1.5 text-slate-500 hover:bg-slate-100 lg:hidden dark:text-slate-400 dark:hover:bg-slate-800"
          aria-label="Abrir menú"
        >
          <Menu size={20} />
        </button>
        <h1 className="text-lg font-semibold text-slate-900 dark:text-slate-100">{title}</h1>
      </div>

      <div className="flex items-center gap-3">
        <div className="hidden text-right sm:block">
          <p className="text-sm font-medium text-slate-800 dark:text-slate-200">{currentUser?.name}</p>
          <p className="text-xs capitalize text-slate-400 dark:text-slate-500">{currentUser?.role}</p>
        </div>
        <span className="flex size-9 items-center justify-center rounded-full bg-brand-100 text-sm font-semibold text-brand-700 dark:bg-brand-500/15 dark:text-brand-300">
          {currentUser?.name.charAt(0)}
        </span>
        <button
          onClick={handleLogout}
          className="rounded-lg p-2 text-slate-400 hover:bg-slate-100 hover:text-slate-600 cursor-pointer dark:hover:bg-slate-800 dark:hover:text-slate-300"
          aria-label="Cerrar sesión"
          title="Cerrar sesión"
        >
          <LogOut size={18} />
        </button>
      </div>
    </header>
  )
}
