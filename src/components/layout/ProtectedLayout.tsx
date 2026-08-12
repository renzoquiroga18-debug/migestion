import { useState } from 'react'
import { Navigate, Outlet, useLocation } from 'react-router-dom'
import { useAuthStore } from '../../store/authStore'
import Sidebar from './Sidebar'
import Topbar from './Topbar'
import ChatWidget from '../chatbot/ChatWidget'

const titles: Record<string, string> = {
  '/app/dashboard': 'Dashboard',
  '/app/products': 'Productos',
  '/app/inventory': 'Inventario',
  '/app/alerts': 'Alertas',
  '/app/users': 'Usuarios',
}

export default function ProtectedLayout() {
  const currentUser = useAuthStore((s) => s.currentUser)
  const location = useLocation()
  const [sidebarOpen, setSidebarOpen] = useState(false)

  if (!currentUser) return <Navigate to="/login" replace />

  const title = titles[location.pathname] ?? 'MiGestion'

  return (
    <div className="flex min-h-screen bg-slate-50 dark:bg-slate-950">
      <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      <div className="flex min-h-screen flex-1 flex-col lg:pl-0">
        <Topbar onMenuClick={() => setSidebarOpen(true)} title={title} />
        <main className="flex-1 px-4 py-6 sm:px-6">
          <Outlet />
        </main>
      </div>
      <ChatWidget />
    </div>
  )
}
