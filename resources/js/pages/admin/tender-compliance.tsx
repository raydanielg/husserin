import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import { HugeiconsIcon } from "@hugeicons/react"
import { Loading03Icon, ShieldCheckIcon, Certificate01Icon, Alert01Icon, CheckmarkCircle01Icon, Cancel01Icon } from "@hugeicons/core-free-icons"
import { getStatusColor, formatDate } from "./helpers"

interface Enquiry {
  id: number
  reference_number: string
  type: string
  company_name: string
  status: string
  priority: string
  created_at: string
  metadata?: Record<string, string>
}

interface Pagination {
  data: Enquiry[]
  current_page: number
  last_page: number
  total: number
  from: number
  to: number
}

export default function TenderCompliance() {
  const [data, setData] = useState<Pagination | null>(null)
  const [loading, setLoading] = useState(true)
  const [page, setPage] = useState(1)

  useEffect(() => {
    setLoading(true)
    const params = new URLSearchParams()
    params.set("type", "TENDER")
    params.set("page", String(page))

    fetch(`/api/admin/enquiries?${params}`)
      .then((r) => r.json())
      .then((d) => { setData(d); setLoading(false) })
      .catch(() => setLoading(false))
  }, [page])

  const tenders = data?.data ?? []
  const complianceItems = tenders.map(t => {
    const meta = t.metadata || {}
    return {
      id: t.id,
      reference: t.reference_number,
      company: t.company_name,
      status: t.status,
      date: t.created_at,
      hasTaxCert: !!meta.tax_cert || !!meta.tin_number,
      hasBusinessLicense: !!meta.business_license || !!meta.license_number,
      hasInsurance: !!meta.insurance_proof || !!meta.insurance,
      hasComplianceCert: !!meta.compliance_cert || !!meta.iso_cert,
      hasBidBond: !!meta.bid_bond || !!meta.bid_security,
    }
  })

  const stats = [
    { label: "Total Tenders", value: tenders.length, icon: ShieldCheckIcon, color: "text-blue-600 bg-blue-500/10" },
    { label: "Fully Compliant", value: complianceItems.filter(c => c.hasTaxCert && c.hasBusinessLicense && c.hasInsurance).length, icon: CheckmarkCircle01Icon, color: "text-green-600 bg-green-500/10" },
    { label: "Partial Compliance", value: complianceItems.filter(c => (c.hasTaxCert || c.hasBusinessLicense || c.hasInsurance) && !(c.hasTaxCert && c.hasBusinessLicense && c.hasInsurance)).length, icon: Certificate01Icon, color: "text-amber-600 bg-amber-500/10" },
    { label: "Non-Compliant", value: complianceItems.filter(c => !c.hasTaxCert && !c.hasBusinessLicense && !c.hasInsurance).length, icon: Alert01Icon, color: "text-red-600 bg-red-500/10" },
  ]

  const checkItems = [
    { key: "hasTaxCert", label: "Tax Certificate" },
    { key: "hasBusinessLicense", label: "Business License" },
    { key: "hasInsurance", label: "Insurance Proof" },
    { key: "hasComplianceCert", label: "Compliance Cert" },
    { key: "hasBidBond", label: "Bid Bond" },
  ] as const

  return (
    <div className="flex flex-1 flex-col gap-6 p-4 pt-0 lg:p-6">
      <div className="flex flex-col gap-1">
        <h1 className="text-2xl font-bold tracking-tight">Compliance Tracking</h1>
        <p className="text-sm text-muted-foreground">Monitor compliance requirements for all tenders</p>
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
        {loading ? (
          <div className="flex items-center justify-center py-12">
            <HugeiconsIcon icon={Loading03Icon} strokeWidth={2} className="size-6 animate-spin text-muted-foreground" />
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full min-w-[900px]">
              <thead>
                <tr className="border-b border-border">
                  <th className="pb-3 text-left text-xs font-medium uppercase tracking-wide text-muted-foreground">Reference</th>
                  <th className="pb-3 text-left text-xs font-medium uppercase tracking-wide text-muted-foreground">Company</th>
                  <th className="pb-3 text-left text-xs font-medium uppercase tracking-wide text-muted-foreground">Status</th>
                  {checkItems.map(ci => (
                    <th key={ci.key} className="pb-3 text-center text-xs font-medium uppercase tracking-wide text-muted-foreground">{ci.label}</th>
                  ))}
                  <th className="pb-3 text-left text-xs font-medium uppercase tracking-wide text-muted-foreground">Date</th>
                </tr>
              </thead>
              <tbody>
                {complianceItems.length === 0 ? (
                  <tr><td colSpan={8} className="py-12 text-center text-sm text-muted-foreground">No compliance data available</td></tr>
                ) : complianceItems.map((c) => (
                  <tr key={c.id} className="border-b border-border/50 transition-colors hover:bg-muted/30">
                    <td className="py-3 text-sm font-medium text-primary">
                      <Link to={`/admin/enquiries/${c.id}`}>{c.reference}</Link>
                    </td>
                    <td className="py-3 text-sm font-medium">{c.company}</td>
                    <td className="py-3">
                      <span className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium ${getStatusColor(c.status)}`}>
                        {c.status}
                      </span>
                    </td>
                    {checkItems.map(ci => (
                      <td key={ci.key} className="py-3 text-center">
                        {c[ci.key] ? (
                          <HugeiconsIcon icon={CheckmarkCircle01Icon} strokeWidth={2} className="mx-auto size-4 text-green-600" />
                        ) : (
                          <HugeiconsIcon icon={Cancel01Icon} strokeWidth={2} className="mx-auto size-4 text-red-400" />
                        )}
                      </td>
                    ))}
                    <td className="py-3 text-sm text-muted-foreground">{formatDate(c.date)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

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
      </div>
    </div>
  )
}
