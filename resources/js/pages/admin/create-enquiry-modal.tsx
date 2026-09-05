import { useState } from "react"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetFooter,
} from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"
import { useToast } from "@/hooks/use-toast"
import { HugeiconsIcon } from "@hugeicons/react"
import { Loading03Icon } from "@hugeicons/core-free-icons"

interface CreateEnquiryModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  fixedType?: string
  onCreated?: () => void
}

const typeLabels: Record<string, string> = {
  RFQ: "RFQ Submission",
  TENDER: "Tender",
  CONSOLIDATION: "Consolidation",
  VENDOR: "Vendor Registration",
}

export default function CreateEnquiryModal({ open, onOpenChange, fixedType, onCreated }: CreateEnquiryModalProps) {
  const { success, error } = useToast()
  const [loading, setLoading] = useState(false)
  const [form, setForm] = useState({
    type: fixedType || "RFQ",
    company_name: "",
    contact_person: "",
    email: "",
    phone: "",
    country: "",
    priority: "NORMAL",
    description: "",
    tender_reference: "",
    tender_organization: "",
    tender_scope: "",
    tender_closing_date: "",
    tender_category: "",
    tender_destination: "",
    cargo_details: "",
    supplier_info: "",
    origin: "",
    destination: "",
  })

  const set = (key: string, value: string) => setForm((prev) => ({ ...prev, [key]: value }))

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    try {
      const res = await fetch("/api/admin/enquiries", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-CSRF-TOKEN": (document.querySelector('meta[name="csrf-token"]') as HTMLMetaElement)?.content || "",
        },
        body: JSON.stringify(form),
      })
      const data = await res.json()
      if (res.ok) {
        success("Enquiry created", `${data.enquiry.reference_number} has been created`)
        onOpenChange(false)
        setForm({
          type: fixedType || "RFQ", company_name: "", contact_person: "", email: "", phone: "", country: "",
          priority: "NORMAL", description: "", tender_reference: "", tender_organization: "", tender_scope: "",
          tender_closing_date: "", tender_category: "", tender_destination: "", cargo_details: "",
          supplier_info: "", origin: "", destination: "",
        })
        onCreated?.()
      } else {
        error("Failed", data.message || "Could not create enquiry")
      }
    } catch {
      error("Connection error", "Could not connect to server")
    }
    setLoading(false)
  }

  const inputClass = "h-10 w-full rounded-lg border border-input bg-background px-3 text-sm placeholder:text-muted-foreground focus-visible:border-primary focus-visible:ring-primary/20 focus-visible:outline-none"
  const labelClass = "mb-1.5 block text-xs font-medium text-muted-foreground"
  const sectionClass = "flex flex-col gap-3 rounded-xl border border-border bg-muted/20 p-4"

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="right" className="w-full sm:max-w-lg overflow-y-auto p-0">
        <SheetHeader className="border-b border-border px-6 py-4">
          <SheetTitle className="text-lg font-semibold">Create {typeLabels[form.type] || "Enquiry"}</SheetTitle>
          <SheetDescription>Add a new entry to the system. Fields marked with * are required.</SheetDescription>
        </SheetHeader>

        <form onSubmit={handleSubmit} className="flex flex-1 flex-col gap-5 overflow-y-auto px-6 py-5">
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className={labelClass}>Type *</label>
              <select value={form.type} onChange={(e) => set("type", e.target.value)} disabled={!!fixedType} className={inputClass}>
                <option value="RFQ">RFQ</option>
                <option value="TENDER">Tender</option>
                <option value="CONSOLIDATION">Consolidation</option>
                <option value="VENDOR">Vendor</option>
              </select>
            </div>
            <div>
              <label className={labelClass}>Priority</label>
              <select value={form.priority} onChange={(e) => set("priority", e.target.value)} className={inputClass}>
                <option value="LOW">Low</option>
                <option value="NORMAL">Normal</option>
                <option value="HIGH">High</option>
                <option value="URGENT">Urgent</option>
              </select>
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className={labelClass}>Company Name *</label>
              <input value={form.company_name} onChange={(e) => set("company_name", e.target.value)} required className={inputClass} placeholder="ABC Corp Ltd" />
            </div>
            <div>
              <label className={labelClass}>Contact Person *</label>
              <input value={form.contact_person} onChange={(e) => set("contact_person", e.target.value)} required className={inputClass} placeholder="John Doe" />
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className={labelClass}>Email *</label>
              <input type="email" value={form.email} onChange={(e) => set("email", e.target.value)} required className={inputClass} placeholder="john@abccorp.com" />
            </div>
            <div>
              <label className={labelClass}>Phone</label>
              <input value={form.phone} onChange={(e) => set("phone", e.target.value)} className={inputClass} placeholder="+255 700 000 000" />
            </div>
          </div>

          <div>
            <label className={labelClass}>Country</label>
            <input value={form.country} onChange={(e) => set("country", e.target.value)} className={inputClass} placeholder="Tanzania" />
          </div>

          <div>
            <label className={labelClass}>Description</label>
            <textarea value={form.description} onChange={(e) => set("description", e.target.value)} rows={3} className="w-full rounded-lg border border-input bg-background p-3 text-sm placeholder:text-muted-foreground focus-visible:border-primary focus-visible:ring-primary/20" placeholder="Brief description of the enquiry..." />
          </div>

          {form.type === "TENDER" && (
            <div className={sectionClass}>
              <h4 className="text-sm font-semibold text-foreground">Tender Details</h4>
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className={labelClass}>Tender Reference</label>
                  <input value={form.tender_reference} onChange={(e) => set("tender_reference", e.target.value)} className={inputClass} placeholder="PPRA/2026/001" />
                </div>
                <div>
                  <label className={labelClass}>Organization</label>
                  <input value={form.tender_organization} onChange={(e) => set("tender_organization", e.target.value)} className={inputClass} placeholder="TANESCO" />
                </div>
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className={labelClass}>Category</label>
                  <input value={form.tender_category} onChange={(e) => set("tender_category", e.target.value)} className={inputClass} placeholder="Supplies" />
                </div>
                <div>
                  <label className={labelClass}>Closing Date</label>
                  <input type="date" value={form.tender_closing_date} onChange={(e) => set("tender_closing_date", e.target.value)} className={inputClass} />
                </div>
              </div>
              <div>
                <label className={labelClass}>Scope</label>
                <textarea value={form.tender_scope} onChange={(e) => set("tender_scope", e.target.value)} rows={2} className="w-full rounded-lg border border-input bg-background p-3 text-sm focus-visible:border-primary" placeholder="Scope of work..." />
              </div>
            </div>
          )}

          {form.type === "CONSOLIDATION" && (
            <div className={sectionClass}>
              <h4 className="text-sm font-semibold text-foreground">Consolidation Details</h4>
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className={labelClass}>Origin</label>
                  <input value={form.origin} onChange={(e) => set("origin", e.target.value)} className={inputClass} placeholder="Guangzhou, China" />
                </div>
                <div>
                  <label className={labelClass}>Destination</label>
                  <input value={form.destination} onChange={(e) => set("destination", e.target.value)} className={inputClass} placeholder="Dar es Salaam, Tanzania" />
                </div>
              </div>
              <div>
                <label className={labelClass}>Cargo Details</label>
                <textarea value={form.cargo_details} onChange={(e) => set("cargo_details", e.target.value)} rows={2} className="w-full rounded-lg border border-input bg-background p-3 text-sm focus-visible:border-primary" placeholder="Description of cargo..." />
              </div>
              <div>
                <label className={labelClass}>Supplier Info</label>
                <textarea value={form.supplier_info} onChange={(e) => set("supplier_info", e.target.value)} rows={2} className="w-full rounded-lg border border-input bg-background p-3 text-sm focus-visible:border-primary" placeholder="Supplier details..." />
              </div>
            </div>
          )}

          <SheetFooter className="flex-row justify-end gap-3 border-t border-border px-6 py-4">
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>Cancel</Button>
            <Button type="submit" disabled={loading}>
              {loading ? <HugeiconsIcon icon={Loading03Icon} strokeWidth={2} className="size-4 animate-spin" /> : null}
              Create Enquiry
            </Button>
          </SheetFooter>
        </form>
      </SheetContent>
    </Sheet>
  )
}
