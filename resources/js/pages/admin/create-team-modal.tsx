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
import { Loading03Icon, AlertCircleIcon, Copy01Icon } from "@hugeicons/core-free-icons"

interface CreateTeamMemberModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onCreated?: () => void
}

export default function CreateTeamMemberModal({ open, onOpenChange, onCreated }: CreateTeamMemberModalProps) {
  const { success, error } = useToast()
  const [loading, setLoading] = useState(false)
  const [setupUrl, setSetupUrl] = useState<string | null>(null)
  const [form, setForm] = useState({
    name: "",
    email: "",
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
        if (data.email_sent === false && data.setup_url) {
          setSetupUrl(data.setup_url)
          error("Email not sent", data.message || "Email could not be sent. Share the link below manually.")
        } else {
          success("Invitation sent", data.message || `${data.user.name} has been invited`)
          onOpenChange(false)
          setForm({ name: "", email: "", role: "STAFF" })
          onCreated?.()
        }
      } else {
        error("Failed", data.message || "Could not add team member")
      }
    } catch {
      error("Connection error", "Could not connect to server")
    }
    setLoading(false)
  }

  const handleCopyLink = async () => {
    if (!setupUrl) return
    await navigator.clipboard.writeText(setupUrl)
    success("Link copied", "Setup link copied to clipboard")
  }

  const handleClose = (open: boolean) => {
    if (!open) {
      setSetupUrl(null)
      setForm({ name: "", email: "", role: "STAFF" })
    }
    onOpenChange(open)
  }

  const inputClass = "h-10 w-full rounded-lg border border-input bg-background px-3 text-sm placeholder:text-muted-foreground focus-visible:border-primary focus-visible:ring-primary/20 focus-visible:outline-none"
  const labelClass = "mb-1.5 block text-xs font-medium text-muted-foreground"

  return (
    <Sheet open={open} onOpenChange={handleClose}>
      <SheetContent side="right" className="w-full sm:max-w-md overflow-y-auto p-0">
        <SheetHeader className="border-b border-border px-6 py-4">
          <SheetTitle className="text-lg font-semibold">Add Team Member</SheetTitle>
          <SheetDescription>Add a new admin account. An invitation email with a password setup link will be sent automatically.</SheetDescription>
        </SheetHeader>

        {setupUrl ? (
          <div className="flex flex-col gap-4 px-6 py-5">
            <div className="flex items-start gap-3 rounded-lg border border-amber-500/30 bg-amber-500/10 p-4">
              <HugeiconsIcon icon={AlertCircleIcon} strokeWidth={2} className="size-5 shrink-0 text-amber-600" />
              <div>
                <p className="text-sm font-medium text-amber-600">Email could not be sent</p>
                <p className="mt-1 text-xs text-muted-foreground">The user was created but the invitation email failed. Copy the setup link below and share it with them manually. The link expires in 48 hours.</p>
              </div>
            </div>
            <div>
              <label className="mb-1.5 block text-xs font-medium text-muted-foreground">Setup Link</label>
              <div className="flex items-center gap-2">
                <input
                  readOnly
                  value={setupUrl}
                  className="h-10 flex-1 rounded-lg border border-input bg-muted/30 px-3 text-xs text-muted-foreground"
                  onClick={(e) => (e.target as HTMLInputElement).select()}
                />
                <Button type="button" size="sm" onClick={handleCopyLink}>
                  <HugeiconsIcon icon={Copy01Icon} strokeWidth={2} className="size-4" />
                  Copy
                </Button>
              </div>
            </div>
            <div className="flex justify-end gap-3 border-t border-border pt-4">
              <Button type="button" variant="outline" onClick={() => { handleClose(false); onCreated?.() }}>
                Done
              </Button>
            </div>
          </div>
        ) : (
        <form onSubmit={handleSubmit} className="flex flex-1 flex-col gap-5 overflow-y-auto px-6 py-5">
          <div>
            <label className={labelClass}>Full Name *</label>
            <input value={form.name} onChange={(e) => set("name", e.target.value)} required className={inputClass} placeholder="John Doe" />
          </div>

          <div>
            <label className={labelClass}>Email *</label>
            <input type="email" value={form.email} onChange={(e) => set("email", e.target.value)} required className={inputClass} placeholder="john@husserin.com" />
          </div>

          <div className="rounded-lg border border-border bg-muted/30 p-4">
            <p className="text-sm text-muted-foreground">
              An email invitation will be sent to this address with a link to set their password. The link expires in 48 hours.
            </p>
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
              Add Member & Send Invite
            </Button>
          </SheetFooter>
        </form>
        )}
      </SheetContent>
    </Sheet>
  )
}
