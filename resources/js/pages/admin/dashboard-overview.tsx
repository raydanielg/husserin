import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import { HugeiconsIcon } from "@hugeicons/react"
import {
  Mail01Icon,
  PackageIcon,
  UserGroupIcon,
  TruckIcon,
  ArrowUp01Icon,
  ArrowDown01Icon,
  Loading03Icon,
  ClockIcon,
} from "@hugeicons/core-free-icons"

interface Stats {
  total_enquiries: number
  new_rfqs: number
  open_tenders: number
  consolidation: number
  vendors: number
  pending_vendors: number
  by_type: Record<string, number>
  by_status: Record<string, number>
}

interface Enquiry {
  id: number
  reference_number: string
  type: string
  company_name: string
  status: string
  priority: string
  created_at: string
  assignedTo?: { name: string } | null
}

const statusColors: Record<string, string> = {
  NEW: "bg-blue-500/10 text-blue-600 border-blue-500/20",
  PENDING: "bg-amber-500/10 text-amber-600 border-amber-500/20",
  "UNDER REVIEW": "bg-purple-500/10 text-purple-600 border-purple-500/20",
  SOURCING: "bg-cyan-500/10 text-cyan-600 border-cyan-500/20",
  QUOTED: "bg-indigo-500/10 text-indigo-600 border-indigo-500/20",
  WON: "bg-green-500/10 text-green-600 border-green-500/20",
  LOST: "bg-red-500/10 text-red-600 border-red-500/20",
  CLOSED: "bg-gray-500/10 text-gray-600 border-gray-500/20",
  APPROVED: "bg-green-500/10 text-green-600 border-green-500/20",
  REJECTED: "bg-red-500/10 text-red-600 border-red-500/20",
}

const priorityColors: Record<string, string> = {
  URGENT: "bg-red-500/10 text-red-600 border-red-500/20",
  HIGH: "bg-orange-500/10 text-orange-600 border-orange-500/20",
  NORMAL: "bg-blue-500/10 text-blue-600 border-blue-500/20",
  LOW: "bg-gray-500/10 text-gray-600 border-gray-500/20",
}

export default function DashboardOverview() {
  const [stats, setStats] = useState<Stats | null>(null)
  const [recent, setRecent] = useState<Enquiry[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    Promise.all([
      fetch("/api/admin/dashboard/stats").then((r) => r.json()),
      fetch("/api/admin/dashboard/recent").then((r) => r.json()),
    ]).then(([s, r]) => {
      setStats(s)
      setRecent(Array.isArray(r) ? r : (r?.data ?? []))
      setLoading(false)
    }).catch(() => setLoading(false))
  }, [])

  if (loading) {
    return (
      <div className="flex flex-1 items-center justify-center p-8">
        <HugeiconsIcon icon={Loading03Icon} strokeWidth={2} className="size-8 animate-spin text-muted-foreground" />
      </div>
    )
  }

  const cards = [
    { label: "Total Enquiries", value: stats?.total_enquiries ?? 0, icon: Mail01Icon, change: "+12.5%", trend: "up" },
    { label: "New RFQs", value: stats?.new_rfqs ?? 0, icon: PackageIcon, change: "+8.2%", trend: "up" },
    { label: "Open Tenders", value: stats?.open_tenders ?? 0, icon: ClockIcon, change: "+3.1%", trend: "up" },
    { label: "Consolidation", value: stats?.consolidation ?? 0, icon: TruckIcon, change: "-2.4%", trend: "down" },
    { label: "Total Vendors", value: stats?.vendors ?? 0, icon: UserGroupIcon, change: "+5.7%", trend: "up" },
    { label: "Pending Vendors", value: stats?.pending_vendors ?? 0, icon: UserGroupIcon, change: "-1.2%", trend: "down" },
  ]

  return (
    <div className="flex flex-1 flex-col gap-6 p-4 pt-0 lg:p-6">
      <div className="flex flex-col gap-1">
        <h1 className="text-2xl font-bold tracking-tight">Welcome back, Admin</h1>
        <p className="text-sm text-muted-foreground">Here's what's happening across your operations today.</p>
      </div>

      <div className="grid auto-rows-min gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
        {cards.map((card) => (
          <div key={card.label} className="flex flex-col gap-3 rounded-xl border border-border bg-background p-5 transition-all hover:border-primary/20 hover:shadow-md">
            <div className="flex items-center justify-between">
              <div className="flex size-10 items-center justify-center rounded-lg bg-primary/10">
                <HugeiconsIcon icon={card.icon} strokeWidth={2} className="size-5 text-primary" />
              </div>
              <span className={`flex items-center gap-0.5 text-xs font-medium ${card.trend === "up" ? "text-green-600" : "text-red-500"}`}>
                <HugeiconsIcon icon={card.trend === "up" ? ArrowUp01Icon : ArrowDown01Icon} strokeWidth={2} className="size-3" />
                {card.change}
              </span>
            </div>
            <div className="flex flex-col gap-0.5">
              <span className="text-2xl font-bold tracking-tight">{card.value}</span>
              <span className="text-xs text-muted-foreground">{card.label}</span>
            </div>
          </div>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="flex flex-col gap-4 rounded-xl border border-border bg-background p-4 lg:p-6 lg:col-span-2">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold">Recent Enquiries</h2>
            <Link to="/admin/enquiries" className="text-sm font-medium text-primary hover:underline">View all</Link>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[600px]">
              <thead>
                <tr className="border-b border-border">
                  <th className="pb-3 text-left text-xs font-medium uppercase tracking-wide text-muted-foreground">Reference</th>
                  <th className="pb-3 text-left text-xs font-medium uppercase tracking-wide text-muted-foreground">Type</th>
                  <th className="pb-3 text-left text-xs font-medium uppercase tracking-wide text-muted-foreground">Company</th>
                  <th className="pb-3 text-left text-xs font-medium uppercase tracking-wide text-muted-foreground">Status</th>
                  <th className="pb-3 text-left text-xs font-medium uppercase tracking-wide text-muted-foreground">Priority</th>
                </tr>
              </thead>
              <tbody>
                {recent.length === 0 ? (
                  <tr><td colSpan={5} className="py-8 text-center text-sm text-muted-foreground">No enquiries yet</td></tr>
                ) : recent.map((e) => (
                  <tr key={e.id} className="border-b border-border/50 transition-colors hover:bg-muted/30">
                    <td className="py-3 text-sm font-medium text-primary">
                      <Link to={`/admin/enquiries/${e.id}`}>{e.reference_number}</Link>
                    </td>
                    <td className="py-3 text-sm text-muted-foreground">{e.type}</td>
                    <td className="py-3 text-sm font-medium">{e.company_name}</td>
                    <td className="py-3">
                      <span className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium ${statusColors[e.status] || "bg-muted text-muted-foreground border-border"}`}>
                        {e.status}
                      </span>
                    </td>
                    <td className="py-3">
                      <span className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium ${priorityColors[e.priority] || priorityColors.NORMAL}`}>
                        {e.priority}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="flex flex-col gap-4 rounded-xl border border-border bg-background p-4 lg:p-6">
          <h2 className="text-lg font-semibold">Enquiries by Type</h2>
          <div className="flex flex-col gap-3">
            {Object.entries(stats?.by_type || {}).map(([type, count]) => {
              const total = stats?.total_enquiries || 1
              const pct = Math.round((count / total) * 100)
              return (
                <div key={type} className="flex flex-col gap-1.5">
                  <div className="flex items-center justify-between text-sm">
                    <span className="font-medium">{type}</span>
                    <span className="text-muted-foreground">{count} ({pct}%)</span>
                  </div>
                  <div className="h-2 overflow-hidden rounded-full bg-muted">
                    <div className="h-full rounded-full bg-primary transition-all" style={{ width: `${pct}%` }} />
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}
