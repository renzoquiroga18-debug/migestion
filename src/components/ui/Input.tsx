import type { InputHTMLAttributes, SelectHTMLAttributes, ReactNode } from 'react'

interface FieldWrapProps {
  label?: string
  children: ReactNode
}

export function FieldWrap({ label, children }: FieldWrapProps) {
  return (
    <label className="flex flex-col gap-1 text-sm">
      {label && <span className="font-medium text-slate-700 dark:text-slate-300">{label}</span>}
      {children}
    </label>
  )
}

export function Input({
  label,
  className = '',
  ...rest
}: InputHTMLAttributes<HTMLInputElement> & { label?: string }) {
  return (
    <FieldWrap label={label}>
      <input
        className={`rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-800 outline-none focus:border-brand-400 focus:ring-2 focus:ring-brand-100 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100 dark:focus:border-brand-500 dark:focus:ring-brand-500/20 ${className}`}
        {...rest}
      />
    </FieldWrap>
  )
}

export function Select({
  label,
  className = '',
  children,
  ...rest
}: SelectHTMLAttributes<HTMLSelectElement> & { label?: string }) {
  return (
    <FieldWrap label={label}>
      <select
        className={`rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-800 outline-none focus:border-brand-400 focus:ring-2 focus:ring-brand-100 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100 dark:focus:border-brand-500 dark:focus:ring-brand-500/20 ${className}`}
        {...rest}
      >
        {children}
      </select>
    </FieldWrap>
  )
}
