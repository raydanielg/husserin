import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import { HugeiconsIcon } from "@hugeicons/react"
import {
  Loading03Icon,
  TrendingUpIcon,
  TrendingDownIcon,
  Alert01Icon,
  ArrowRight01Icon,
  Mail01Icon,
  PackageIcon,
  TruckIcon,
  UserGroupIcon,
  ChartLineIcon,
  ClockIcon,
  Cancel01Icon,
  CheckmarkCircle01Icon,
} from "@hugeicons/core-free-icons"
import { getStatusColor } from "./helpers"

interface MonthlyPoint {
  month: string
  total: number
  rfq: number
  tender: number
  consolidation: number
  vendor: number
  won: number
  lost: number
}

interface TypePerformance {
  type: string
  total: number
  won: number
  success_rate: number
  pending: number
}

interface StatusBreakdownItem {
  status: string
  count: number
  percentage: number
}

interface PriorityBreakdownItem {
  priority: string
  count: number
  percentage: number
}

interface AlertItem {
  id: string
  title: string
  description: string
  severity: string
  time_ago: string
}

interface ActivityItem {
  id: number
  user: string
  action: string
  module: string | null
  time_ago: string
}

interface Analytics {
  total_enquiries: number
  new: number
  won: number
  lost: number
  closed: number
  pending: number
  conversion_rate: number
  loss_rate: number
  by_type: Record<string, number>
  type_percentages: Record<string, number>
  by_status: Record<string, number>
  status_breakdown: StatusBreakdownItem[]
  by_priority: Record<string, number>
  priority_breakdown: PriorityBreakdownItem[]
  monthly: MonthlyPoint[]
  vendor_stats: { total: number; pending: number; approved: number; rejected: number; approval_rate: number }
  type_performance: TypePerformance[]
  funnel: { new: number; under_review: number; sourcing: number; quoted: number; won: number; lost: number }
  recent_activity: ActivityItem[]
  alerts: AlertItem[]
}

function SummaryCard({
  label,
  value,
  change,
  positive,
  subtitle,
  icon,
}: {
  label: string
  value: string | number
  change?: string
  positive?: boolean
  subtitle?: string
  icon?: typeof ChartLineIcon
}) {
  return (
    <div className="rounded-lg border border-border bg-background p-4 transition-all hover:border-primary/20 hover:shadow-sm">
      <div className="flex items-center justify-between">
        <p className="text-xs text-muted-foreground">{label}</p>
        {icon && (
          <div className="flex size-7 items-center justify-center rounded-md bg-primary/10">
            <HugeiconsIcon icon={icon} strokeWidth={2} className="size-3.5 text-primary" />
          </div>
        )}
      </div>
      <p className="text-xl font-semibold tabular-nums mt-1.5">{value}</p>
      {change && (
        <div className="flex items-center gap-1 mt-1 text-xs">
          {positive !== undefined && (
            <HugeiconsIcon icon={positive ? TrendingUpIcon : TrendingDownIcon} className={`size-3 ${positive ? "text-emerald-600" : "text-red-600"}`} />
          )}
          <span className={positive === false ? "text-red-600" : "text-emerald-600"}>{change}</span>
        </div>
      )}
      {subtitle && <p className="text-xs text-muted-foreground mt-1">{subtitle}</p>}
    </div>
  )
}

const typeColors: Record<string, string> = {
  RFQ: "bg-blue-500",
  TENDER: "bg-purple-500",
  CONSOLIDATION: "bg-cyan-500",
  VENDOR: "bg-amber-500",
}

const typeColorsLight: Record<string, string> = {
  RFQ: "bg-blue-500/10 text-blue-600",
  TENDER: "bg-purple-500/10 text-purple-600",
  CONSOLIDATION: "bg-cyan-500/10 text-cyan-600",
  VENDOR: "bg-amber-500/10 text-amber-600",
}

const severityColors: Record<string, string> = {
  HIGH: "text-red-600 bg-red-50 dark:bg-red-950/50",
  MEDIUM: "text-amber-600 bg-amber-50 dark:bg-amber-950/50",
  LOW: "text-blue-600 bg-blue-50 dark:bg-blue-950/50",
}

const priorityDotColors: Record<string, string> = {
  URGENT: "bg-red-500",
  HIGH: "bg-orange-500",
  NORMAL: "bg-blue-500",
  LOW: "bg-gray-400",
}

const typeIcons: Record<string, typeof Mail01Icon> = {
  RFQ: Mail01Icon,
  TENDER: PackageIcon,
  CONSOLIDATION: TruckIcon,
  VENDOR: UserGroupIcon,
}

export default function DashboardAnalytics() {
  const [data, setData] = useState<Analytics | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch("/api/admin/analytics/overview")
      .then((r) => r.json())
      .then((d) => { setData(d); setLoading(false) })
      .catch(() => setLoading(false))
  }, [])

  if (loading) {
    return (
      <div className="flex flex-1 items-center justify-center p-8">
        <HugeiconsIcon icon={Loading03Icon} strokeWidth={2} className="size-8 animate-spin text-muted-foreground" />
      </div>
    )
  }

  const d = data
  const maxMonthly = Math.max(...(d?.monthly.map((m) => m.total) || [1]), 1)

  // Donut chart calculations
  const totalEnquiries = d?.total_enquiries ?? 0
  const donutSegments = d ? Object.entries(d.by_type).map(([type, count]) => ({
    type,
    count,
    percentage: totalEnquiries > 0 ? (count / totalEnquiries) * 100 : 0,
  })) : []

  // SVG donut
  const radius = 60
  const circumference = 2 * Math.PI * radius
  let offsetAccumulated = 0
  const donutColors: Record<string, string> = {
    RFQ: "#3b82f6",
    TENDER: "#a855f7",
    CONSOLIDATION: "#06b6d4",
    VENDOR: "#f59e0b",
  }

  return (
    <div className="flex flex-col gap-6 p-4 pt-0 lg:p-6">
      {/* Header */}
      <div className="flex flex-col gap-1">
        <h1 className="text-2xl font-bold tracking-tight">Analytics</h1>
        <p className="text-sm text-muted-foreground">Performance insights and enquiry trends</p>
      </div>

      {/* 1. Top Summary - 5 compact KPI cards */}
      <div className="grid grid-cols-2 gap-3 lg:grid-cols-3 xl:grid-cols-5">
        <SummaryCard
          label="Total Enquiries"
          value={d?.total_enquiries ?? 0}
          change="+12.4%"
          positive={true}
          icon={Mail01Icon}
        />
        <SummaryCard
          label="Won"
          value={d?.won ?? 0}
          subtitle={`${d?.conversion_rate ?? 0}% conversion rate`}
          icon={CheckmarkCircle01Icon}
        />
        <SummaryCard
          label="Lost"
          value={d?.lost ?? 0}
          subtitle={`${d?.loss_rate ?? 0}% loss rate`}
          icon={Cancel01Icon}
        />
        <SummaryCard
          label="Pending"
          value={d?.pending ?? 0}
          subtitle="Awaiting action"
          icon={ClockIcon}
        />
        <SummaryCard
          label="Vendors"
          value={d?.vendor_stats.total ?? 0}
          change={`${d?.vendor_stats.approval_rate ?? 0}% approved`}
          positive={true}
          icon={UserGroupIcon}
        />
      </div>

      {/* 2. Monthly Performance - stacked bar chart */}
      <div className="rounded-xl border border-border bg-background p-5">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-sm font-semibold">Enquiry Performance — {new Date().getFullYear()}</h3>
          <div className="flex items-center gap-3 text-xs">
            {Object.entries(typeColors).map(([type, color]) => (
              <div key={type} className="flex items-center gap-1.5">
                <span className={`size-2.5 rounded-sm ${color}`} />
                <span className="text-muted-foreground">{type}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="flex h-56 items-end gap-1.5">
          {d?.monthly.map((m, i) => (
            <div key={i} className="flex flex-1 flex-col items-center gap-1.5 group">
              <div className="relative flex w-full flex-1 flex-col justify-end gap-px">
                {/* Tooltip */}
                <div className="pointer-events-none absolute -top-16 left-1/2 z-10 -translate-x-1/2 rounded-lg border border-border bg-popover px-3 py-2 text-xs opacity-0 shadow-md transition-opacity group-hover:opacity-100">
                  <p className="font-medium">{m.month}: {m.total} total</p>
                  <p className="text-blue-600">RFQ: {m.rfq}</p>
                  <p className="text-purple-600">Tender: {m.tender}</p>
                  <p className="text-cyan-600">Consolidation: {m.consolidation}</p>
                  <p className="text-amber-600">Vendor: {m.vendor}</p>
                </div>
                {/* Stacked bars */}
                <div className="flex w-full flex-col justify-end" style={{ height: `${(m.total / maxMonthly) * 100}%`, minHeight: m.total > 0 ? "2px" : "0" }}>
                  {m.vendor > 0 && <div className="w-full bg-amber-500 transition-all" style={{ height: `${(m.vendor / m.total) * 100}%` }} />}
                  {m.consolidation > 0 && <div className="w-full bg-cyan-500 transition-all" style={{ height: `${(m.consolidation / m.total) * 100}%` }} />}
                  {m.tender > 0 && <div className="w-full bg-purple-500 transition-all" style={{ height: `${(m.tender / m.total) * 100}%` }} />}
                  {m.rfq > 0 && <div className="w-full rounded-t-md bg-blue-500 transition-all" style={{ height: `${(m.rfq / m.total) * 100}%` }} />}
                </div>
              </div>
              <span className="text-xs text-muted-foreground">{m.month}</span>
            </div>
          ))}
        </div>
      </div>

      {/* 3. Enquiry Types Donut + Type Performance */}
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        {/* Donut Chart */}
        <div className="rounded-xl border border-border bg-background p-5">
          <h3 className="text-sm font-semibold mb-4">Enquiry Distribution</h3>
          <div className="flex items-center gap-6">
            <div className="relative flex-shrink-0">
              <svg width="160" height="160" viewBox="0 0 160 160" className="-rotate-90">
                <circle cx="80" cy="80" r={radius} fill="none" stroke="currentColor" strokeWidth="16" className="text-muted/30" />
                {donutSegments.map((seg) => {
                  const dash = (seg.percentage / 100) * circumference
                  const offset = offsetAccumulated
                  offsetAccumulated += dash
                  return (
                    <circle
                      key={seg.type}
                      cx="80"
                      cy="80"
                      r={radius}
                      fill="none"
                      stroke={donutColors[seg.type]}
                      strokeWidth="16"
                      strokeDasharray={`${dash} ${circumference - dash}`}
                      strokeDashoffset={-offset}
                    />
                  )
                })}
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-2xl font-bold tabular-nums">{totalEnquiries}</span>
                <span className="text-xs text-muted-foreground">Total</span>
              </div>
            </div>
            <div className="flex flex-1 flex-col gap-3">
              {donutSegments.map((seg) => (
                <div key={seg.type} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="size-2.5 rounded-full" style={{ backgroundColor: donutColors[seg.type] }} />
                    <span className="text-sm font-medium">{seg.type}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-semibold tabular-nums">{seg.count}</span>
                    <span className="text-xs text-muted-foreground">{seg.percentage.toFixed(1)}%</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Type Performance */}
        <div className="rounded-xl border border-border bg-background p-5">
          <h3 className="text-sm font-semibold mb-4">Type Performance</h3>
          <div className="space-y-4">
            {d?.type_performance.map((tp) => {
              const Icon = typeIcons[tp.type] || Mail01Icon
              return (
                <div key={tp.type} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className={`flex size-9 items-center justify-center rounded-lg ${typeColorsLight[tp.type]}`}>
                      <HugeiconsIcon icon={Icon} className="size-4" />
                    </div>
                    <div>
                      <p className="text-sm font-medium">{tp.type}</p>
                      <p className="text-xs text-muted-foreground">{tp.total} total · {tp.pending} pending</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className={`text-sm font-medium tabular-nums ${tp.success_rate >= 50 ? "text-emerald-600" : tp.success_rate >= 20 ? "text-amber-600" : "text-red-600"}`}>
                      {tp.success_rate}%
                    </span>
                    <Link to={`/admin/enquiries${tp.type === 'VENDOR' ? '/vendors' : tp.type === 'RFQ' ? '/rfqs' : ''}`}>
                      <button className="text-xs text-muted-foreground hover:text-foreground">
                        <HugeiconsIcon icon={ArrowRight01Icon} className="size-3" />
                      </button>
                    </Link>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>

      {/* 4. Conversion Funnel + Status Breakdown + Priority */}
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        {/* Conversion Funnel */}
        <div className="rounded-xl border border-border bg-background p-5">
          <h3 className="text-sm font-semibold mb-4">Conversion Funnel</h3>
          <div className="space-y-2">
            {[
              { label: "New", value: d?.funnel.new ?? 0, color: "bg-blue-500" },
              { label: "Under Review", value: d?.funnel.under_review ?? 0, color: "bg-purple-500" },
              { label: "Sourcing", value: d?.funnel.sourcing ?? 0, color: "bg-cyan-500" },
              { label: "Quoted", value: d?.funnel.quoted ?? 0, color: "bg-indigo-500" },
              { label: "Won", value: d?.funnel.won ?? 0, color: "bg-emerald-500" },
              { label: "Lost", value: d?.funnel.lost ?? 0, color: "bg-red-500" },
            ].map((stage) => {
              const max = Math.max(d?.funnel.new ?? 1, 1)
              const pct = Math.round(((stage.value || 0) / max) * 100)
              return (
                <div key={stage.label} className="flex flex-col gap-1">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">{stage.label}</span>
                    <span className="font-medium tabular-nums">{stage.value}</span>
                  </div>
                  <div className="h-2 overflow-hidden rounded-full bg-muted">
                    <div className={`h-full rounded-full ${stage.color} transition-all`} style={{ width: `${pct}%` }} />
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* Status Breakdown */}
        <div className="rounded-xl border border-border bg-background p-5">
          <h3 className="text-sm font-semibold mb-4">Status Breakdown</h3>
          <div className="space-y-3">
            {d?.status_breakdown.map((s) => (
              <Link
                key={s.status}
                to={`/admin/enquiries?status=${s.status}`}
                className="flex items-center justify-between rounded-md px-2 py-1 -mx-2 transition-colors hover:bg-muted/30"
              >
                <div className="flex items-center gap-2">
                  <span className={`inline-flex items-center rounded-full border px-2 py-0.5 text-xs font-medium ${getStatusColor(s.status)}`}>
                    {s.status}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium tabular-nums">{s.count}</span>
                  <span className="text-xs text-muted-foreground">{s.percentage}%</span>
                </div>
              </Link>
            ))}
            {(!d?.status_breakdown || d.status_breakdown.length === 0) && (
              <p className="text-sm text-muted-foreground text-center py-4">No data available</p>
            )}
          </div>
        </div>

        {/* Priority Breakdown */}
        <div className="rounded-xl border border-border bg-background p-5">
          <h3 className="text-sm font-semibold mb-4">Priority Distribution</h3>
          <div className="space-y-3">
            {d?.priority_breakdown.map((p) => (
              <div key={p.priority} className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className={`size-2.5 rounded-full ${priorityDotColors[p.priority] || "bg-gray-400"}`} />
                  <span className="text-sm text-muted-foreground">{p.priority.charAt(0) + p.priority.slice(1).toLowerCase()}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium tabular-nums">{p.count}</span>
                  <span className="text-xs text-muted-foreground">{p.percentage}%</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 5. Vendor Stats + Operational Alerts + Recent Activity */}
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        {/* Vendor Stats */}
        <div className="rounded-xl border border-border bg-background p-5">
          <h3 className="text-sm font-semibold mb-4">Vendor Overview</h3>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <p className="text-xs text-muted-foreground">Total Vendors</p>
              <p className="text-lg font-semibold tabular-nums">{d?.vendor_stats.total ?? 0}</p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Pending</p>
              <p className="text-lg font-semibold tabular-nums text-amber-600">{d?.vendor_stats.pending ?? 0}</p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Approved</p>
              <p className="text-lg font-semibold tabular-nums text-emerald-600">{d?.vendor_stats.approved ?? 0}</p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Rejected</p>
              <p className="text-lg font-semibold tabular-nums text-red-600">{d?.vendor_stats.rejected ?? 0}</p>
            </div>
          </div>
          <div className="mt-3 border-t pt-3">
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Approval Rate</span>
              <span className="text-sm font-semibold tabular-nums text-emerald-600">{d?.vendor_stats.approval_rate ?? 0}%</span>
            </div>
          </div>
          <Link to="/admin/vendors" className="block mt-4">
            <button className="w-full rounded-lg border border-input py-2 text-sm font-medium hover:bg-muted">View All Vendors</button>
          </Link>
        </div>

        {/* Operational Alerts */}
        <div className="rounded-xl border border-border bg-background p-5">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-semibold">Operational Alerts</h3>
            {(d?.alerts.length ?? 0) > 0 && (
              <span className="rounded-md bg-red-50 px-2 py-0.5 text-xs font-medium text-red-600 dark:bg-red-950/50">{d?.alerts.length}</span>
            )}
          </div>
          <div className="space-y-3">
            {d?.alerts.map((alert) => (
              <div key={alert.id} className="flex items-start justify-between gap-3 border-b pb-3 last:border-0 last:pb-0">
                <div className="flex items-start gap-2">
                  <div className={`mt-0.5 flex size-6 items-center justify-center rounded ${severityColors[alert.severity]}`}>
                    <HugeiconsIcon icon={Alert01Icon} className="size-3.5" />
                  </div>
                  <div>
                    <p className="text-sm font-medium">{alert.title}</p>
                    <p className="text-xs text-muted-foreground">{alert.description}</p>
                    <p className="text-xs text-muted-foreground mt-0.5">{alert.time_ago}</p>
                  </div>
                </div>
              </div>
            ))}
            {(d?.alerts.length ?? 0) === 0 && (
              <p className="text-sm text-muted-foreground text-center py-4">No active alerts</p>
            )}
          </div>
        </div>

        {/* Recent Activity */}
        <div className="rounded-xl border border-border bg-background p-5">
          <h3 className="text-sm font-semibold mb-4">Recent Activity</h3>
          <div className="space-y-3">
            {d?.recent_activity.length === 0 && (
              <p className="text-sm text-muted-foreground text-center py-4">No recent activity</p>
            )}
            {d?.recent_activity.map((a) => (
              <div key={a.id} className="flex items-start gap-3">
                <div className="mt-1 size-1.5 rounded-full bg-muted-foreground/40" />
                <div className="flex-1">
                  <p className="text-sm">
                    <span className="font-medium">{a.user}</span>{" "}
                    <span className="text-muted-foreground">{a.action}</span>
                  </p>
                  <p className="text-xs text-muted-foreground">{a.time_ago}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
