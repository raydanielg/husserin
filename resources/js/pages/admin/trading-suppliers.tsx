import { useState, useEffect } from "react"
import { HugeiconsIcon } from "@hugeicons/react"
import { Loading03Icon, Search01Icon, UserGroupIcon, CheckmarkCircle01Icon, Cancel01Icon, ClockIcon } from "@hugeicons/core-free-icons"
import { getVendorStatusColor, formatDate } from "./helpers"

interface Vendor {
  id: number
  enquiry_id: string
  company_name: string
  country: string
  contact_person: string
  email: string
  phone: string
  category: string
  brands: string | null
  certifications: string | null
  status: string
  created_at: string
}

interface Pagination {
  data: Vendor[]
  current_page: number
  last_page: number
  total: number
  from: number
  to: number
}

export default function TradingSuppliers() {
  const [data, setData] = useState<Pagination | null>(null)
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState("")
  const [page, setPage] = useState(1)

  useEffect(() => {
    setLoading(true)
    const params = new URLSearchParams()
    if (search) params.set("search", search)
    params.set("page", String(page))

    fetch(`/api/admin/vendors?${params}`)
      .then((r) => r.json())
      .then((d) => { setData(d); setLoading(false) })
      .catch(() => setLoading(false))
  }, [search, page])

  const stats = [
    { label: "Total Suppliers", value: data?.total ?? 0, icon: UserGroupIcon, color: "text-blue-600 bg-blue-500/10" },
    { label: "Approved", value: data?.data?.filter(v => v.status === "approved").length ?? 0, icon: CheckmarkCircle01Icon, color: "text-green-600 bg-green-500/10" },
    { label: "Pending", value: data?.data?.filter(v => v.status === "pending").length ?? 0, icon: ClockIcon, color: "text-amber-600 bg-amber-500/10" },
    { label: "Rejected", value: data?.data?.filter(v => v.status === "rejected").length ?? 0, icon: Cancel01Icon, color: "text-red-600 bg-red-500/10" },
  ]

  return (
    <div className="flex flex-1 flex-col gap-6 p-4 pt-0 lg:p-6">
      <div className="flex flex-col gap-1">
        <h1 className="text-2xl font-bold tracking-tight">Suppliers</h1>
        <p className="text-sm text-muted-foreground">Manage supplier relationships and vendor directory</p>
      </div>

      <div className="grid auto-rows-min gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((s) => (
          <div key={s.label} className="flex items-center gap-4 rounded-xl border border-border bg-background p-5">
            <div className={`flex size-11 items-center justify-center rounded-lg ${s.color}`}>
              <HugeiconsIcon icon={s.icon} strokeWidth={2} className="size-5" />
            </div>
            <div>
              <p className="text-2xl font-bold tabular-nums">{s.value}</p>
              <p className="text-xs text-muted-foreground">{s.label}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="flex flex-col gap-4 rounded-xl border border-border bg-background p-4 lg:p-6">
        <div className="relative">
          <HugeiconsIcon icon={Search01Icon} strokeWidth={2} className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search by company, contact, email, category..."
            value={search}
            onChange={(e) => { setSearch(e.target.value); setPage(1) }}
            className="h-10 w-full rounded-lg border border-input bg-background pl-10 pr-4 text-sm placeholder:text-muted-foreground focus-visible:border-primary focus-visible:ring-primary/20"
          />
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-12">
            <HugeiconsIcon icon={Loading03Icon} strokeWidth={2} className="size-6 animate-spin text-muted-foreground" />
          </div>
        ) : (
          <>
            <div className="overflow-x-auto">
              <table className="w-full min-w-[900px]">
                <thead>
                  <tr className="border-b border-border">
                    <th className="pb-3 text-left text-xs font-medium uppercase tracking-wide text-muted-foreground">Company</th>
                    <th className="pb-3 text-left text-xs font-medium uppercase tracking-wide text-muted-foreground">Country</th>
                    <th className="pb-3 text-left text-xs font-medium uppercase tracking-wide text-muted-foreground">Category</th>
                    <th className="pb-3 text-left text-xs font-medium uppercase tracking-wide text-muted-foreground">Contact</th>
                    <th className="pb-3 text-left text-xs font-medium uppercase tracking-wide text-muted-foreground">Brands</th>
                    <th className="pb-3 text-left text-xs font-medium uppercase tracking-wide text-muted-foreground">Status</th>
                    <th className="pb-3 text-left text-xs font-medium uppercase tracking-wide text-muted-foreground">Registered</th>
                  </tr>
                </thead>
                <tbody>
                  {(data?.data?.length ?? 0) === 0 ? (
                    <tr><td colSpan={7} className="py-12 text-center text-sm text-muted-foreground">No suppliers found</td></tr>
                  ) : data?.data?.map((v) => (
                    <tr key={v.id} className="border-b border-border/50 transition-colors hover:bg-muted/30">
                      <td className="py-3 text-sm font-medium">{v.company_name}</td>
                      <td className="py-3 text-sm text-muted-foreground">{v.country}</td>
                      <td className="py-3 text-sm text-muted-foreground">{v.category}</td>
                      <td className="py-3 text-sm">
                        <div className="font-medium">{v.contact_person}</div>
                        <div className="text-xs text-muted-foreground">{v.email}</div>
                      </td>
                      <td className="py-3 text-sm text-muted-foreground max-w-[200px] truncate">{v.brands ?? "—"}</td>
                      <td className="py-3">
                        <span className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium ${getVendorStatusColor(v.status)}`}>
                          {v.status.replace(/_/g, " ")}
                        </span>
                      </td>
                      <td className="py-3 text-sm text-muted-foreground">{formatDate(v.created_at)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {data && data.last_page > 1 && (
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Showing {data.from}–{data.to} of {data.total}</span>
                <div className="flex gap-2">
                  <button onClick={() => setPage(p => Math.max(1, p - 1))} disabled={data.current_page === 1} className="rounded-lg border border-input px-3 py-1.5 text-sm font-medium disabled:opacity-50 hover:bg-muted">Previous</button>
                  <span className="flex items-center px-3 text-sm font-medium">{data.current_page} / {data.last_page}</span>
                  <button onClick={() => setPage(p => Math.min(data.last_page, p + 1))} disabled={data.current_page === data.last_page} className="rounded-lg border border-input px-3 py-1.5 text-sm font-medium disabled:opacity-50 hover:bg-muted">Next</button>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  )
}
