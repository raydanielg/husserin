import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import { HugeiconsIcon } from "@hugeicons/react"
import { Loading03Icon, BuildingIcon, ToolsIcon, PlaneIcon, BoltIcon, ChartLineIcon, ArrowRight01Icon } from "@hugeicons/core-free-icons"

interface Stats {
  total_enquiries: number
  by_type: Record<string, number>
}

const industries = [
  { key: "government", name: "Government & Institutions", icon: BuildingIcon, color: "text-blue-600 bg-blue-500/10", desc: "Public sector procurement, ministry supplies, institutional contracts" },
  { key: "construction", name: "Construction", icon: ToolsIcon, color: "text-amber-600 bg-amber-500/10", desc: "Building materials, equipment, construction project supplies" },
  { key: "aviation", name: "Aviation", icon: PlaneIcon, color: "text-cyan-600 bg-cyan-500/10", desc: "Aviation parts, ground equipment, airport supplies" },
  { key: "energy", name: "Energy", icon: BoltIcon, color: "text-purple-600 bg-purple-500/10", desc: "Power sector equipment, oil & gas supplies, renewable energy" },
]

export default function IndustriesOverview() {
  const [stats, setStats] = useState<Stats | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch("/api/admin/analytics/overview")
      .then((r) => r.json())
      .then((d) => { setStats(d); setLoading(false) })
      .catch(() => setLoading(false))
  }, [])

  return (
    <div className="flex flex-1 flex-col gap-6 p-4 pt-0 lg:p-6">
      <div className="flex flex-col gap-1">
        <h1 className="text-2xl font-bold tracking-tight">Industries</h1>
        <p className="text-sm text-muted-foreground">Sector breakdown and industry-specific enquiries</p>
      </div>

      <div className="grid auto-rows-min gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <div className="flex items-center gap-4 rounded-xl border border-border bg-background p-5">
          <div className="flex size-11 items-center justify-center rounded-lg bg-primary/10 text-primary">
            <HugeiconsIcon icon={ChartLineIcon} strokeWidth={2} className="size-5" />
          </div>
          <div>
            <p className="text-2xl font-bold tabular-nums">{stats?.total_enquiries ?? 0}</p>
            <p className="text-xs text-muted-foreground">Total Enquiries</p>
          </div>
        </div>
        {stats?.by_type && Object.entries(stats.by_type).map(([type, count]) => (
          <div key={type} className="flex items-center gap-4 rounded-xl border border-border bg-background p-5">
            <div className="flex size-11 items-center justify-center rounded-lg bg-muted text-muted-foreground">
              <HugeiconsIcon icon={BuildingIcon} strokeWidth={2} className="size-5" />
            </div>
            <div>
              <p className="text-2xl font-bold tabular-nums">{count}</p>
              <p className="text-xs text-muted-foreground">{type}</p>
            </div>
          </div>
        ))}
      </div>

      {loading ? (
        <div className="flex items-center justify-center py-12">
          <HugeiconsIcon icon={Loading03Icon} strokeWidth={2} className="size-6 animate-spin text-muted-foreground" />
        </div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2">
          {industries.map((ind) => (
            <Link
              key={ind.key}
              to={`/admin/industries/${ind.key}`}
              className="group flex flex-col gap-3 rounded-xl border border-border bg-background p-6 transition-all hover:border-primary/20 hover:shadow-md"
            >
              <div className="flex items-center justify-between">
                <div className={`flex size-12 items-center justify-center rounded-lg ${ind.color}`}>
                  <HugeiconsIcon icon={ind.icon} strokeWidth={2} className="size-6" />
                </div>
                <HugeiconsIcon icon={ArrowRight01Icon} strokeWidth={2} className="size-5 text-muted-foreground transition-transform group-hover:translate-x-1" />
              </div>
              <h3 className="text-lg font-semibold">{ind.name}</h3>
              <p className="text-sm text-muted-foreground">{ind.desc}</p>
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}
