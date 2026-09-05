import { useState, useEffect } from "react"
import { Link, useSearchParams } from "react-router-dom"
import { HugeiconsIcon } from "@hugeicons/react"
import { Loading03Icon, Search01Icon } from "@hugeicons/core-free-icons"
import { getStatusColor, getPriorityColor, formatDate } from "./helpers"

interface Enquiry {
  id: number
  reference_number: string
  type: string
  company_name: string
  contact_person: string
  email: string
  status: string
  priority: string
  created_at: string
  assignedTo?: { name: string } | null
}

interface Pagination {
  data: Enquiry[]
  current_page: number
  last_page: number
  total: number
  from: number
  to: number
}

export default function EnquiriesList({ fixedType }: { fixedType?: string }) {
  const [searchParams, setSearchParams] = useSearchParams()
  const [data, setData] = useState<Pagination | null>(null)
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState("")
  const [status, setStatus] = useState("")
  const [page, setPage] = useState(1)

  const type = fixedType || searchParams.get("type") || ""

  useEffect(() => {
    setLoading(true)
    const params = new URLSearchParams()
    if (type) params.set("type", type)
    if (status) params.set("status", status)
    if (search) params.set("search", search)
    params.set("page", String(page))

    fetch(`/api/admin/enquiries?${params}`)
      .then((r) => r.json())
      .then((d) => { setData(d); setLoading(false) })
      .catch(() => setLoading(false))
  }, [type, status, search, page])

  const title = fixedType === "VENDOR" ? "Vendor Registrations"
    : fixedType === "RFQ" ? "RFQ Submissions"
    : fixedType === "CONTACT" ? "Contact Messages"
    : "All Enquiries"

  return (
    <div className="flex flex-1 flex-col gap-6 p-4 pt-0 lg:p-6">
      <div className="flex flex-col gap-1">
        <h1 className="text-2xl font-bold tracking-tight">{title}</h1>
        <p className="text-sm text-muted-foreground">{data?.total ?? 0} total enquiries</p>
      </div>

      <div className="flex flex-col gap-4 rounded-xl border border-border bg-background p-4 lg:p-6">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
          <div className="relative flex-1">
            <HugeiconsIcon icon={Search01Icon} strokeWidth={2} className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search by reference, company, email, phone..."
              value={search}
              onChange={(e) => { setSearch(e.target.value); setPage(1) }}
              className="h-10 w-full rounded-lg border border-input bg-background pl-10 pr-4 text-sm placeholder:text-muted-foreground focus-visible:border-primary focus-visible:ring-primary/20"
            />
          </div>
          <select
            value={status}
            onChange={(e) => { setStatus(e.target.value); setPage(1) }}
            className="h-10 rounded-lg border border-input bg-background px-3 text-sm focus-visible:border-primary"
          >
            <option value="">All Statuses</option>
            <option value="NEW">New</option>
            <option value="PENDING">Pending</option>
            <option value="UNDER REVIEW">Under Review</option>
            <option value="SOURCING">Sourcing</option>
            <option value="QUOTED">Quoted</option>
            <option value="WON">Won</option>
            <option value="LOST">Lost</option>
            <option value="CLOSED">Closed</option>
          </select>
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-12">
            <HugeiconsIcon icon={Loading03Icon} strokeWidth={2} className="size-6 animate-spin text-muted-foreground" />
          </div>
        ) : (
          <>
            <div className="overflow-x-auto">
              <table className="w-full min-w-[700px]">
                <thead>
                  <tr className="border-b border-border">
                    <th className="pb-3 text-left text-xs font-medium uppercase tracking-wide text-muted-foreground">Reference</th>
                    <th className="pb-3 text-left text-xs font-medium uppercase tracking-wide text-muted-foreground">Type</th>
                    <th className="pb-3 text-left text-xs font-medium uppercase tracking-wide text-muted-foreground">Company</th>
                    <th className="pb-3 text-left text-xs font-medium uppercase tracking-wide text-muted-foreground">Contact</th>
                    <th className="pb-3 text-left text-xs font-medium uppercase tracking-wide text-muted-foreground">Status</th>
                    <th className="pb-3 text-left text-xs font-medium uppercase tracking-wide text-muted-foreground">Priority</th>
                    <th className="pb-3 text-left text-xs font-medium uppercase tracking-wide text-muted-foreground">Date</th>
                  </tr>
                </thead>
                <tbody>
                  {data?.data.length === 0 ? (
                    <tr><td colSpan={7} className="py-12 text-center text-sm text-muted-foreground">No enquiries found</td></tr>
                  ) : data?.data.map((e) => (
                    <tr key={e.id} className="border-b border-border/50 transition-colors hover:bg-muted/30">
                      <td className="py-3 text-sm font-medium text-primary">
                        <Link to={`/admin/enquiries/${e.id}`}>{e.reference_number}</Link>
                      </td>
                      <td className="py-3 text-sm text-muted-foreground">{e.type}</td>
                      <td className="py-3 text-sm font-medium">{e.company_name}</td>
                      <td className="py-3 text-sm text-muted-foreground">{e.contact_person}</td>
                      <td className="py-3">
                        <span className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium ${getStatusColor(e.status)}`}>
                          {e.status}
                        </span>
                      </td>
                      <td className="py-3">
                        <span className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium ${getPriorityColor(e.priority)}`}>
                          {e.priority}
                        </span>
                      </td>
                      <td className="py-3 text-sm text-muted-foreground">{formatDate(e.created_at)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {data && data.last_page > 1 && (
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">
                  Showing {data.from}–{data.to} of {data.total}
                </span>
                <div className="flex gap-2">
                  <button
                    onClick={() => setPage(p => Math.max(1, p - 1))}
                    disabled={data.current_page === 1}
                    className="rounded-lg border border-input px-3 py-1.5 text-sm font-medium disabled:opacity-50 hover:bg-muted"
                  >
                    Previous
                  </button>
                  <span className="flex items-center px-3 text-sm font-medium">{data.current_page} / {data.last_page}</span>
                  <button
                    onClick={() => setPage(p => Math.min(data.last_page, p + 1))}
                    disabled={data.current_page === data.last_page}
                    className="rounded-lg border border-input px-3 py-1.5 text-sm font-medium disabled:opacity-50 hover:bg-muted"
                  >
                    Next
                  </button>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  )
}
