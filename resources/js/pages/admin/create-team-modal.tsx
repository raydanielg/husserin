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

interface CreateTeamMemberModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onCreated?: () => void
}

export default function CreateTeamMemberModal({ open, onOpenChange, onCreated }: CreateTeamMemberModalProps) {
  const { success, error } = useToast()
  const [loading, setLoading] = useState(false)
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "STAFF",
  })

  const set = (key: string, value: string) => setForm((prev) => ({ ...prev, [key]: value }))

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    try {
      const res = await fetch("/api/admin/team", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-CSRF-TOKEN": (document.querySelector('meta[name="csrf-token"]') as HTMLMetaElement)?.content || "",
        },
        body: JSON.stringify(form),
      })
      const data = await res.json()
      if (res.ok) {
        success("Team member added", `${data.user.name} has been created`)
        onOpenChange(false)
        setForm({ name: "", email: "", password: "", role: "STAFF" })
        onCreated?.()
      } else {
        error("Failed", data.message || "Could not add team member")
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
      <SheetContent side="right" className="w-full sm:max-w-md overflow-y-auto p-0">
        <SheetHeader className="border-b border-border px-6 py-4">
          <SheetTitle className="text-lg font-semibold">Add Team Member</SheetTitle>
          <SheetDescription>Create a new admin account. Fields marked with * are required.</SheetDescription>
        </SheetHeader>

        <form onSubmit={handleSubmit} className="flex flex-1 flex-col gap-5 overflow-y-auto px-6 py-5">
          <div>
            <label className={labelClass}>Full Name *</label>
            <input value={form.name} onChange={(e) => set("name", e.target.value)} required className={inputClass} placeholder="John Doe" />
          </div>

          <div>
            <label className={labelClass}>Email *</label>
            <input type="email" value={form.email} onChange={(e) => set("email", e.target.value)} required className={inputClass} placeholder="john@husserin.com" />
          </div>

          <div>
            <label className={labelClass}>Password *</label>
            <input type="password" value={form.password} onChange={(e) => set("password", e.target.value)} required minLength={8} className={inputClass} placeholder="Minimum 8 characters" />
          </div>

          <div>
            <label className={labelClass}>Role *</label>
            <select value={form.role} onChange={(e) => set("role", e.target.value)} className={inputClass}>
              <option value="STAFF">Staff</option>
              <option value="SUPER_ADMIN">Super Admin</option>
            </select>
          </div>

          <SheetFooter className="flex-row justify-end gap-3 border-t border-border px-6 py-4">
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>Cancel</Button>
            <Button type="submit" disabled={loading}>
              {loading ? <HugeiconsIcon icon={Loading03Icon} strokeWidth={2} className="size-4 animate-spin" /> : null}
              Add Member
            </Button>
          </SheetFooter>
        </form>
      </SheetContent>
    </Sheet>
  )
}
