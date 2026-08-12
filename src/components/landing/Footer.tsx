import { Link } from 'react-router-dom'
import { Boxes } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-950">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-4 px-4 py-10 text-sm text-slate-500 sm:flex-row sm:justify-between sm:px-6 dark:text-slate-400">
        <Link to="/" className="flex items-center gap-2 font-semibold text-slate-700 dark:text-slate-200">
          <span className="flex size-7 items-center justify-center rounded-lg bg-brand-600 text-white">
            <Boxes size={16} />
          </span>
          MiGestion
        </Link>
        <p id="faq" className="text-center sm:text-right">
          Proyecto de muestra para portafolio — datos e IA simulados, sin backend real.
        </p>
      </div>
    </footer>
  )
}
