import { Link } from 'react-router-dom'
import { Boxes } from 'lucide-react'
import Button from '../ui/Button'

export default function Navbar() {
  return (
    <header className="sticky top-0 z-40 border-b border-slate-200/70 bg-white/80 backdrop-blur-md dark:border-slate-800/70 dark:bg-slate-950/80">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 sm:px-6">
        <Link to="/" className="flex items-center gap-2 font-semibold text-slate-900 dark:text-slate-100">
          <span className="flex size-8 items-center justify-center rounded-lg bg-brand-600 text-white">
            <Boxes size={18} />
          </span>
          MiGestion
        </Link>
        <nav className="hidden items-center gap-6 text-sm font-medium text-slate-600 sm:flex dark:text-slate-400">
          <a href="#funcionalidades" className="hover:text-slate-900 dark:hover:text-slate-100">
            Funcionalidades
          </a>
          <a href="#faq" className="hover:text-slate-900 dark:hover:text-slate-100">
            Preguntas frecuentes
          </a>
        </nav>
        <Link to="/login">
          <Button variant="primary">Ver demo</Button>
        </Link>
      </div>
    </header>
  )
}
