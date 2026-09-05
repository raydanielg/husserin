import { useState } from "react"
import { HugeiconsIcon } from "@hugeicons/react"
import { CreditCardIcon, ReceiptIcon, Download04Icon, CheckmarkCircle01Icon } from "@hugeicons/core-free-icons"
import { useToast } from "@/hooks/use-toast"
import { formatDate } from "./helpers"

interface Invoice {
  id: string
  date: string
  amount: string
  status: "paid" | "pending" | "overdue"
  description: string
}

const mockInvoices: Invoice[] = [
  { id: "INV-2026-001", date: "2026-09-01", amount: "$299.00", status: "paid", description: "Enterprise Plan — Monthly" },
  { id: "INV-2026-002", date: "2026-08-01", amount: "$299.00", status: "paid", description: "Enterprise Plan — Monthly" },
  { id: "INV-2026-003", date: "2026-07-01", amount: "$299.00", status: "paid", description: "Enterprise Plan — Monthly" },
]

export default function SettingsBilling() {
  const { success } = useToast()
  const [invoices] = useState<Invoice[]>(mockInvoices)

  const statusColors: Record<string, string> = {
    paid: "bg-green-500/10 text-green-600 border-green-500/20",
    pending: "bg-amber-500/10 text-amber-600 border-amber-500/20",
    overdue: "bg-red-500/10 text-red-600 border-red-500/20",
  }

  return (
    <div className="flex flex-1 flex-col gap-6 p-4 pt-0 lg:p-6">
      <div className="flex flex-col gap-1">
        <h1 className="text-2xl font-bold tracking-tight">Billing & Subscription</h1>
        <p className="text-sm text-muted-foreground">Manage your subscription and view invoices</p>
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        <div className="flex flex-col gap-3 rounded-xl border border-border bg-background p-5">
          <div className="flex items-center gap-3">
            <div className="flex size-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
              <HugeiconsIcon icon={CreditCardIcon} strokeWidth={2} className="size-5" />
            </div>
            <div>
              <p className="text-sm font-medium">Current Plan</p>
              <p className="text-lg font-bold">Enterprise</p>
            </div>
          </div>
          <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
            <HugeiconsIcon icon={CheckmarkCircle01Icon} strokeWidth={2} className="size-3.5 text-green-600" />
            <span>Unlimited users, full access</span>
          </div>
        </div>

        <div className="flex flex-col gap-3 rounded-xl border border-border bg-background p-5">
          <div className="flex items-center gap-3">
            <div className="flex size-10 items-center justify-center rounded-lg bg-blue-500/10 text-blue-600">
              <HugeiconsIcon icon={ReceiptIcon} strokeWidth={2} className="size-5" />
            </div>
            <div>
              <p className="text-sm font-medium">Next Billing Date</p>
              <p className="text-lg font-bold">Oct 1, 2026</p>
            </div>
          </div>
          <p className="text-xs text-muted-foreground">$299.00/month · Auto-renew enabled</p>
        </div>

        <div className="flex flex-col gap-3 rounded-xl border border-border bg-background p-5">
          <div className="flex items-center gap-3">
            <div className="flex size-10 items-center justify-center rounded-lg bg-green-500/10 text-green-600">
              <HugeiconsIcon icon={CheckmarkCircle01Icon} strokeWidth={2} className="size-5" />
            </div>
            <div>
              <p className="text-sm font-medium">Payment Method</p>
              <p className="text-lg font-bold">•••• 4242</p>
            </div>
          </div>
          <p className="text-xs text-muted-foreground">Visa ending in 4242 · Expires 12/2028</p>
        </div>
      </div>

      <div className="flex flex-col gap-4 rounded-xl border border-border bg-background p-4 lg:p-6">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold">Invoice History</h2>
          <button
            onClick={() => success("Export started", "Your invoices are being downloaded")}
            className="flex items-center gap-2 rounded-lg border border-input px-3 py-1.5 text-sm font-medium hover:bg-muted"
          >
            <HugeiconsIcon icon={Download04Icon} strokeWidth={2} className="size-4" />
            Export
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full min-w-[600px]">
            <thead>
              <tr className="border-b border-border">
                <th className="pb-3 text-left text-xs font-medium uppercase tracking-wide text-muted-foreground">Invoice</th>
                <th className="pb-3 text-left text-xs font-medium uppercase tracking-wide text-muted-foreground">Date</th>
                <th className="pb-3 text-left text-xs font-medium uppercase tracking-wide text-muted-foreground">Description</th>
                <th className="pb-3 text-left text-xs font-medium uppercase tracking-wide text-muted-foreground">Amount</th>
                <th className="pb-3 text-left text-xs font-medium uppercase tracking-wide text-muted-foreground">Status</th>
                <th className="pb-3 text-right text-xs font-medium uppercase tracking-wide text-muted-foreground">Actions</th>
              </tr>
            </thead>
            <tbody>
              {invoices.map((inv) => (
                <tr key={inv.id} className="border-b border-border/50 transition-colors hover:bg-muted/30">
                  <td className="py-3 text-sm font-medium">{inv.id}</td>
                  <td className="py-3 text-sm text-muted-foreground">{formatDate(inv.date)}</td>
                  <td className="py-3 text-sm text-muted-foreground">{inv.description}</td>
                  <td className="py-3 text-sm font-medium">{inv.amount}</td>
                  <td className="py-3">
                    <span className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium capitalize ${statusColors[inv.status]}`}>
                      {inv.status}
                    </span>
                  </td>
                  <td className="py-3 text-right">
                    <button
                      onClick={() => success("Download started", `Downloading ${inv.id}`)}
                      className="text-sm font-medium text-primary hover:underline"
                    >
                      Download
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
