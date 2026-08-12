import { useState, type FormEvent } from 'react'
import { Link, Navigate, useNavigate } from 'react-router-dom'
import { Boxes, LogIn, AlertCircle } from 'lucide-react'
import { useAuthStore } from '../store/authStore'
import Button from '../components/ui/Button'
import { Input } from '../components/ui/Input'

export default function Login() {
  const { currentUser, login } = useAuthStore()
  const navigate = useNavigate()
  const [email, setEmail] = useState('admin@migestion.com')
  const [password, setPassword] = useState('demo123')
  const [error, setError] = useState<string | null>(null)

  if (currentUser) return <Navigate to="/app/dashboard" replace />

  function handleSubmit(e: FormEvent) {
    e.preventDefault()
    const result = login(email, password)
    if (!result.ok) {
      setError(result.error ?? 'No se pudo iniciar sesión.')
      return
    }
    navigate('/app/dashboard')
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-50 px-4 dark:bg-slate-950">
      <div className="w-full max-w-sm">
        <Link
          to="/"
          className="mb-8 flex items-center justify-center gap-2 font-semibold text-slate-900 dark:text-slate-100"
        >
          <span className="flex size-9 items-center justify-center rounded-lg bg-brand-600 text-white">
            <Boxes size={20} />
          </span>
          <span className="text-lg">MiGestion</span>
        </Link>

        <div className="rounded-2xl border border-slate-200 bg-white p-7 shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <h1 className="text-xl font-semibold text-slate-900 dark:text-slate-100">Ingresar a la plataforma</h1>
          <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
            Demo con datos simulados, sin registro necesario.
          </p>

          <form onSubmit={handleSubmit} className="mt-6 flex flex-col gap-4">
            <Input
              label="Email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <Input
              label="Contraseña"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />

            {error && (
              <div className="flex items-center gap-2 rounded-lg bg-red-50 px-3 py-2 text-sm text-red-600 dark:bg-red-500/10 dark:text-red-400">
                <AlertCircle size={16} />
                {error}
              </div>
            )}

            <Button type="submit" variant="primary" className="mt-1 w-full py-2.5" icon={<LogIn size={16} />}>
              Iniciar sesión
            </Button>
          </form>
        </div>

        <div className="mt-4 rounded-xl border border-dashed border-slate-300 bg-white/60 p-4 text-xs text-slate-500 dark:border-slate-700 dark:bg-slate-900/60 dark:text-slate-400">
          <p className="mb-1 font-medium text-slate-600 dark:text-slate-300">Credenciales de demo</p>
          <p>admin@migestion.com · demo123 (rol admin)</p>
          <p>camila@migestion.com · demo123 (rol empleado)</p>
        </div>
      </div>
    </div>
  )
}
