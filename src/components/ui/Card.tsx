import type { HTMLAttributes } from 'react'

export default function Card({ className = '', children, ...rest }: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={`rounded-2xl border border-slate-200 bg-white shadow-sm shadow-slate-200/50 dark:border-slate-800 dark:bg-slate-900 dark:shadow-none ${className}`}
      {...rest}
    >
      {children}
    </div>
  )
}
