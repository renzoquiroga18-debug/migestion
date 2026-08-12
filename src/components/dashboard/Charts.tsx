import {
  AreaChart,
  Area,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  Legend,
} from 'recharts'
import Card from '../ui/Card'
import ChartToolbar from './ChartToolbar'
import type { Product, StockMovement } from '../../types'
import { stockStatus } from '../../store/inventoryStore'
import {
  useChartPrefsStore,
  type TrendStyle,
  type CategoryStyle,
  type StatusStyle,
} from '../../store/chartPrefsStore'
import {
  PALETTES,
  paletteOptions,
  STATUS_PALETTES,
  statusPaletteOptions,
  type PaletteKey,
  type StatusPaletteKey,
} from '../../lib/chartPalettes'

const tickStyle = { fontSize: 11, fill: 'var(--chart-tick)' }
const tooltipStyle = {
  borderRadius: 8,
  fontSize: 12,
  border: '1px solid var(--tooltip-border)',
  backgroundColor: 'var(--tooltip-bg)',
  color: 'var(--tooltip-text)',
}
const gridStroke = 'var(--chart-grid)'

const trendStyleOptions = [
  { value: 'area', label: 'Área' },
  { value: 'line', label: 'Línea' },
  { value: 'bar', label: 'Barras' },
]

export function StockTrendChart({ movements }: { movements: StockMovement[] }) {
  const style = useChartPrefsStore((s) => s.trendStyle)
  const setStyle = useChartPrefsStore((s) => s.setTrendStyle)
  const paletteKey = useChartPrefsStore((s) => s.trendPalette)
  const setPaletteKey = useChartPrefsStore((s) => s.setTrendPalette)
  const palette = PALETTES[paletteKey]

  const today = new Date()
  const days = Array.from({ length: 14 }, (_, i) => {
    const d = new Date(today)
    d.setDate(d.getDate() - (13 - i))
    return d.toISOString().slice(0, 10)
  })

  const data = days.map((date) => {
    const dayMovements = movements.filter((m) => m.date === date)
    const salidas = dayMovements.filter((m) => m.type === 'out').reduce((s, m) => s + m.quantity, 0)
    const entradas = dayMovements.filter((m) => m.type === 'in').reduce((s, m) => s + m.quantity, 0)
    return {
      date: date.slice(5),
      Salidas: salidas,
      Entradas: entradas,
    }
  })

  return (
    <Card className="p-5">
      <ChartToolbar
        title="Movimiento de stock (últimos 14 días)"
        styleOptions={trendStyleOptions}
        styleValue={style}
        onStyleChange={(v) => setStyle(v as TrendStyle)}
        colorOptions={paletteOptions}
        colorValue={paletteKey}
        onColorChange={(v) => setPaletteKey(v as PaletteKey)}
      />
      <ResponsiveContainer width="100%" height={260}>
        {style === 'line' ? (
          <LineChart data={data} margin={{ left: -20, right: 10 }}>
            <CartesianGrid strokeDasharray="3 3" stroke={gridStroke} />
            <XAxis dataKey="date" tick={tickStyle} axisLine={false} tickLine={false} />
            <YAxis tick={tickStyle} axisLine={false} tickLine={false} />
            <Tooltip contentStyle={tooltipStyle} />
            <Line type="monotone" dataKey="Salidas" stroke={palette.line1} strokeWidth={2.5} dot={false} />
            <Line type="monotone" dataKey="Entradas" stroke={palette.line2} strokeWidth={2.5} dot={false} />
          </LineChart>
        ) : style === 'bar' ? (
          <BarChart data={data} margin={{ left: -20, right: 10 }}>
            <CartesianGrid strokeDasharray="3 3" stroke={gridStroke} />
            <XAxis dataKey="date" tick={tickStyle} axisLine={false} tickLine={false} />
            <YAxis tick={tickStyle} axisLine={false} tickLine={false} />
            <Tooltip contentStyle={tooltipStyle} />
            <Bar dataKey="Salidas" fill={palette.line1} radius={[4, 4, 0, 0]} />
            <Bar dataKey="Entradas" fill={palette.line2} radius={[4, 4, 0, 0]} />
          </BarChart>
        ) : (
          <AreaChart data={data} margin={{ left: -20, right: 10 }}>
            <defs>
              <linearGradient id="salidas" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor={palette.line1} stopOpacity={0.35} />
                <stop offset="95%" stopColor={palette.line1} stopOpacity={0} />
              </linearGradient>
              <linearGradient id="entradas" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor={palette.line2} stopOpacity={0.3} />
                <stop offset="95%" stopColor={palette.line2} stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke={gridStroke} />
            <XAxis dataKey="date" tick={tickStyle} axisLine={false} tickLine={false} />
            <YAxis tick={tickStyle} axisLine={false} tickLine={false} />
            <Tooltip contentStyle={tooltipStyle} />
            <Area type="monotone" dataKey="Salidas" stroke={palette.line1} fill="url(#salidas)" strokeWidth={2} />
            <Area type="monotone" dataKey="Entradas" stroke={palette.line2} fill="url(#entradas)" strokeWidth={2} />
          </AreaChart>
        )}
      </ResponsiveContainer>
    </Card>
  )
}

const categoryStyleOptions = [
  { value: 'vertical', label: 'Barras verticales' },
  { value: 'horizontal', label: 'Barras horizontales' },
]

export function CategoryBarChart({ products }: { products: Product[] }) {
  const style = useChartPrefsStore((s) => s.categoryStyle)
  const setStyle = useChartPrefsStore((s) => s.setCategoryStyle)
  const paletteKey = useChartPrefsStore((s) => s.categoryPalette)
  const setPaletteKey = useChartPrefsStore((s) => s.setCategoryPalette)
  const palette = PALETTES[paletteKey]

  const byCategory = new Map<string, number>()
  for (const p of products) {
    byCategory.set(p.category, (byCategory.get(p.category) ?? 0) + p.stock)
  }
  const data = Array.from(byCategory, ([category, stock]) => ({ category, stock }))

  return (
    <Card className="p-5">
      <ChartToolbar
        title="Stock por categoría"
        styleOptions={categoryStyleOptions}
        styleValue={style}
        onStyleChange={(v) => setStyle(v as CategoryStyle)}
        colorOptions={paletteOptions}
        colorValue={paletteKey}
        onColorChange={(v) => setPaletteKey(v as PaletteKey)}
      />
      <ResponsiveContainer width="100%" height={260}>
        {style === 'horizontal' ? (
          <BarChart data={data} layout="vertical" margin={{ left: 10, right: 10 }}>
            <CartesianGrid strokeDasharray="3 3" stroke={gridStroke} />
            <XAxis type="number" tick={tickStyle} axisLine={false} tickLine={false} />
            <YAxis
              type="category"
              dataKey="category"
              tick={{ fontSize: 11, fill: 'var(--chart-tick)' }}
              axisLine={false}
              tickLine={false}
              width={80}
            />
            <Tooltip contentStyle={tooltipStyle} />
            <Bar dataKey="stock" radius={[0, 6, 6, 0]}>
              {data.map((entry, i) => (
                <Cell key={entry.category} fill={palette.categoryColors[i % palette.categoryColors.length]} />
              ))}
            </Bar>
          </BarChart>
        ) : (
          <BarChart data={data} margin={{ left: -20, right: 10 }}>
            <CartesianGrid strokeDasharray="3 3" stroke={gridStroke} />
            <XAxis
              dataKey="category"
              tick={{ fontSize: 10, fill: 'var(--chart-tick)' }}
              axisLine={false}
              tickLine={false}
              interval={0}
              angle={-25}
              textAnchor="end"
              height={50}
            />
            <YAxis tick={tickStyle} axisLine={false} tickLine={false} />
            <Tooltip contentStyle={tooltipStyle} />
            <Bar dataKey="stock" radius={[6, 6, 0, 0]}>
              {data.map((entry, i) => (
                <Cell key={entry.category} fill={palette.categoryColors[i % palette.categoryColors.length]} />
              ))}
            </Bar>
          </BarChart>
        )}
      </ResponsiveContainer>
    </Card>
  )
}

const statusStyleOptions = [
  { value: 'donut', label: 'Anillo' },
  { value: 'pie', label: 'Torta' },
]

export function StatusDonutChart({ products }: { products: Product[] }) {
  const style = useChartPrefsStore((s) => s.statusStyle)
  const setStyle = useChartPrefsStore((s) => s.setStatusStyle)
  const paletteKey = useChartPrefsStore((s) => s.statusPalette)
  const setPaletteKey = useChartPrefsStore((s) => s.setStatusPalette)
  const palette = STATUS_PALETTES[paletteKey]
  const statusColors: Record<string, string> = {
    ok: palette.ok,
    bajo: palette.bajo,
    critico: palette.critico,
    agotado: palette.agotado,
  }

  const counts: Record<string, number> = { ok: 0, bajo: 0, critico: 0, agotado: 0 }
  for (const p of products) counts[stockStatus(p)]++
  const data = Object.entries(counts)
    .filter(([, v]) => v > 0)
    .map(([status, value]) => ({ status, value }))

  return (
    <Card className="p-5">
      <ChartToolbar
        title="Estado del inventario"
        styleOptions={statusStyleOptions}
        styleValue={style}
        onStyleChange={(v) => setStyle(v as StatusStyle)}
        colorOptions={statusPaletteOptions}
        colorValue={paletteKey}
        onColorChange={(v) => setPaletteKey(v as StatusPaletteKey)}
      />
      <ResponsiveContainer width="100%" height={260}>
        <PieChart>
          <Pie
            data={data}
            dataKey="value"
            nameKey="status"
            innerRadius={style === 'donut' ? 55 : 0}
            outerRadius={85}
            paddingAngle={3}
          >
            {data.map((entry) => (
              <Cell key={entry.status} fill={statusColors[entry.status]} />
            ))}
          </Pie>
          <Legend
            formatter={(value) => (
              <span className="text-xs capitalize text-slate-600 dark:text-slate-400">{value}</span>
            )}
          />
          <Tooltip contentStyle={tooltipStyle} />
        </PieChart>
      </ResponsiveContainer>
    </Card>
  )
}
