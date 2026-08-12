import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowRight, Sparkles } from 'lucide-react'
import Button from '../ui/Button'

export default function Hero() {
  return (
    <section className="relative overflow-hidden">
      <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top,var(--color-brand-100),transparent_60%)] dark:bg-[radial-gradient(circle_at_top,rgba(49,112,245,0.15),transparent_60%)]" />
      <div className="mx-auto flex max-w-4xl flex-col items-center px-4 py-20 text-center sm:px-6 sm:py-28">
        <motion.span
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-6 inline-flex items-center gap-1.5 rounded-full bg-brand-50 px-3 py-1 text-xs font-medium text-brand-700 ring-1 ring-brand-200 dark:bg-brand-500/10 dark:text-brand-300 dark:ring-brand-500/30"
        >
          <Sparkles size={14} />
          Con cálculos e insights asistidos por IA
        </motion.span>
        <motion.h1
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.05 }}
          className="text-4xl font-bold tracking-tight text-slate-900 sm:text-6xl dark:text-slate-100"
        >
          Tu negocio.
          <br />
          <span className="text-brand-600">Tu stock.</span>
          <br />
          Bajo control.
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mt-6 max-w-xl text-lg text-slate-600 dark:text-slate-400"
        >
          MiGestion es una plataforma de gestión de inventario pensada para pequeños
          comercios: controlá stock, productos, usuarios y alertas desde un solo lugar.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="mt-8 flex flex-col gap-3 sm:flex-row"
        >
          <Link to="/login">
            <Button variant="primary" className="px-6 py-3 text-base" icon={<ArrowRight size={18} />}>
              Probar la demo
            </Button>
          </Link>
          <a href="#funcionalidades">
            <Button variant="secondary" className="px-6 py-3 text-base">
              Ver funcionalidades
            </Button>
          </a>
        </motion.div>
        <p className="mt-4 text-xs text-slate-400 dark:text-slate-500">
          Proyecto de muestra de portafolio · datos simulados, sin necesidad de registro.
        </p>
      </div>
    </section>
  )
}
