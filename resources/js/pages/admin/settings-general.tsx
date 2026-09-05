import { useState } from "react"
import { useToast } from "@/hooks/use-toast"

export default function SettingsGeneral() {
  const { success } = useToast()
  const [form, setForm] = useState({
    company_name: "Husserin Investment Company Limited",
    email: "contact@husserin.com",
    phone: "+255 700 000 000",
    address: "Dar es Salaam, Tanzania",
    currency: "USD",
    timezone: "Africa/Dar_es_Salaam",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    success("Settings saved", "General settings updated successfully")
  }

  return (
    <div className="flex flex-1 flex-col gap-6 p-4 pt-0 lg:p-6">
      <div className="flex flex-col gap-1">
        <h1 className="text-2xl font-bold tracking-tight">General Settings</h1>
        <p className="text-sm text-muted-foreground">Company information and system preferences</p>
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4 rounded-xl border border-border bg-background p-4 lg:p-6">
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label className="text-sm font-medium">Company Name</label>
            <input value={form.company_name} onChange={(e) => setForm({ ...form, company_name: e.target.value })} className="mt-1 h-10 w-full rounded-lg border border-input bg-background px-3 text-sm focus-visible:border-primary" />
          </div>
          <div>
            <label className="text-sm font-medium">Email</label>
            <input value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className="mt-1 h-10 w-full rounded-lg border border-input bg-background px-3 text-sm focus-visible:border-primary" />
          </div>
          <div>
            <label className="text-sm font-medium">Phone</label>
            <input value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} className="mt-1 h-10 w-full rounded-lg border border-input bg-background px-3 text-sm focus-visible:border-primary" />
          </div>
          <div>
            <label className="text-sm font-medium">Address</label>
            <input value={form.address} onChange={(e) => setForm({ ...form, address: e.target.value })} className="mt-1 h-10 w-full rounded-lg border border-input bg-background px-3 text-sm focus-visible:border-primary" />
          </div>
          <div>
            <label className="text-sm font-medium">Currency</label>
            <select value={form.currency} onChange={(e) => setForm({ ...form, currency: e.target.value })} className="mt-1 h-10 w-full rounded-lg border border-input bg-background px-3 text-sm focus-visible:border-primary">
              <option value="USD">USD</option>
              <option value="TZS">TZS</option>
              <option value="EUR">EUR</option>
              <option value="GBP">GBP</option>
            </select>
          </div>
          <div>
            <label className="text-sm font-medium">Timezone</label>
            <select value={form.timezone} onChange={(e) => setForm({ ...form, timezone: e.target.value })} className="mt-1 h-10 w-full rounded-lg border border-input bg-background px-3 text-sm focus-visible:border-primary">
              <option value="Africa/Dar_es_Salaam">Africa/Dar_es_Salaam</option>
              <option value="Africa/Nairobi">Africa/Nairobi</option>
              <option value="UTC">UTC</option>
            </select>
          </div>
        </div>
        <button type="submit" className="self-start rounded-lg bg-primary px-6 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90">Save Changes</button>
      </form>
    </div>
  )
}
