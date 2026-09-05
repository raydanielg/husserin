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

interface CreateVendorModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onCreated?: () => void
}

export default function CreateVendorModal({ open, onOpenChange, onCreated }: CreateVendorModalProps) {
  const { success, error } = useToast()
  const [loading, setLoading] = useState(false)
  const [form, setForm] = useState({
    company_name: "",
    country: "",
    contact_person: "",
    email: "",
    phone: "",
    website: "",
    address: "",
    category: "",
    brands: "",
    certifications: "",
    message: "",
  })

  const set = (key: string, value: string) => setForm((prev) => ({ ...prev, [key]: value }))

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    try {
      const res = await fetch("/api/admin/vendors", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-CSRF-TOKEN": (document.querySelector('meta[name="csrf-token"]') as HTMLMetaElement)?.content || "",
        },
        body: JSON.stringify(form),
      })
      const data = await res.json()
      if (res.ok) {
        success("Vendor created", `${data.vendor.company_name} has been added`)
        onOpenChange(false)
        setForm({ company_name: "", country: "", contact_person: "", email: "", phone: "", website: "", address: "", category: "", brands: "", certifications: "", message: "" })
        onCreated?.()
      } else {
        error("Failed", data.message || "Could not create vendor")
      }
    } catch {
      error("Connection error", "Could not connect to server")
    }
    setLoading(false)
  }

  const inputClass = "h-10 w-full rounded-lg border border-input bg-background px-3 text-sm placeholder:text-muted-foreground focus-visible:border-primary focus-visible:ring-primary/20 focus-visible:outline-none"
  const labelClass = "mb-1.5 block text-xs font-medium text-muted-foreground"

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="right" className="w-full sm:max-w-lg overflow-y-auto p-0">
        <SheetHeader className="border-b border-border px-6 py-4">
          <SheetTitle className="text-lg font-semibold">Add New Vendor</SheetTitle>
          <SheetDescription>Register a new vendor/supplier in the system. Fields marked with * are required.</SheetDescription>
        </SheetHeader>

        <form onSubmit={handleSubmit} className="flex flex-1 flex-col gap-5 overflow-y-auto px-6 py-5">
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className={labelClass}>Company Name *</label>
              <input value={form.company_name} onChange={(e) => set("company_name", e.target.value)} required className={inputClass} placeholder="ABC Supplies Ltd" />
            </div>
            <div>
              <label className={labelClass}>Country *</label>
              <input value={form.country} onChange={(e) => set("country", e.target.value)} required className={inputClass} placeholder="Tanzania" />
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className={labelClass}>Contact Person *</label>
              <input value={form.contact_person} onChange={(e) => set("contact_person", e.target.value)} required className={inputClass} placeholder="John Doe" />
            </div>
            <div>
              <label className={labelClass}>Email *</label>
              <input type="email" value={form.email} onChange={(e) => set("email", e.target.value)} required className={inputClass} placeholder="john@abcsupplies.com" />
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className={labelClass}>Phone</label>
              <input value={form.phone} onChange={(e) => set("phone", e.target.value)} className={inputClass} placeholder="+255 700 000 000" />
            </div>
            <div>
              <label className={labelClass}>Website</label>
              <input value={form.website} onChange={(e) => set("website", e.target.value)} className={inputClass} placeholder="https://abcsupplies.com" />
            </div>
          </div>

          <div>
            <label className={labelClass}>Category *</label>
            <input value={form.category} onChange={(e) => set("category", e.target.value)} required className={inputClass} placeholder="Construction Materials" />
          </div>

          <div>
            <label className={labelClass}>Address</label>
            <input value={form.address} onChange={(e) => set("address", e.target.value)} className={inputClass} placeholder="Plot 123, Industrial Area, Dar es Salaam" />
          </div>

          <div>
            <label className={labelClass}>Brands</label>
            <textarea value={form.brands} onChange={(e) => set("brands", e.target.value)} rows={2} className="w-full rounded-lg border border-input bg-background p-3 text-sm focus-visible:border-primary" placeholder="Brand names carried..." />
          </div>

          <div>
            <label className={labelClass}>Certifications</label>
            <textarea value={form.certifications} onChange={(e) => set("certifications", e.target.value)} rows={2} className="w-full rounded-lg border border-input bg-background p-3 text-sm focus-visible:border-primary" placeholder="ISO 9001, TBS Certified, etc..." />
          </div>

          <SheetFooter className="flex-row justify-end gap-3 border-t border-border px-6 py-4">
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>Cancel</Button>
            <Button type="submit" disabled={loading}>
              {loading ? <HugeiconsIcon icon={Loading03Icon} strokeWidth={2} className="size-4 animate-spin" /> : null}
              Add Vendor
            </Button>
          </SheetFooter>
        </form>
      </SheetContent>
    </Sheet>
  )
}
