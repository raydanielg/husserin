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
import {
  Loading03Icon,
  LockKeyholeIcon,
  EyeIcon,
  EyeOffIcon,
  CheckmarkCircle02Icon,
} from "@hugeicons/core-free-icons"

interface ChangePasswordDrawerProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export default function ChangePasswordDrawer({ open, onOpenChange }: ChangePasswordDrawerProps) {
  const { success, error } = useToast()
  const [loading, setLoading] = useState(false)
  const [done, setDone] = useState(false)
  const [showCurrent, setShowCurrent] = useState(false)
  const [showNew, setShowNew] = useState(false)
  const [showConfirm, setShowConfirm] = useState(false)
  const [form, setForm] = useState({
    current_password: "",
    new_password: "",
    new_password_confirmation: "",
  })

  const set = (key: string, value: string) => setForm((prev) => ({ ...prev, [key]: value }))

  const passwordsMatch = form.new_password === form.new_password_confirmation
  const isValid =
    form.current_password &&
    form.new_password.length >= 8 &&
    passwordsMatch &&
    form.new_password !== form.current_password

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!isValid) return
    setLoading(true)
    try {
      const res = await fetch("/api/admin/change-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-CSRF-TOKEN": (document.querySelector('meta[name="csrf-token"]') as HTMLMetaElement)?.content || "",
        },
        body: JSON.stringify(form),
      })
      const data = await res.json()
      if (res.ok) {
        setDone(true)
        success("Password changed", data.message || "Your password has been updated.")
      } else {
        error("Failed", data.message || data.errors?.current_password?.[0] || "Could not change password.")
      }
    } catch {
      error("Connection error", "Could not connect to the server.")
    }
    setLoading(false)
  }

  const handleClose = (open: boolean) => {
    if (!open) {
      setForm({ current_password: "", new_password: "", new_password_confirmation: "" })
      setDone(false)
      setShowCurrent(false)
      setShowNew(false)
      setShowConfirm(false)
    }
    onOpenChange(open)
  }

  const inputClass = "h-10 w-full rounded-lg border border-input bg-background pl-10 pr-10 text-sm placeholder:text-muted-foreground focus-visible:border-primary focus-visible:ring-primary/20 focus-visible:outline-none"
  const labelClass = "mb-1.5 block text-xs font-medium text-muted-foreground"

  return (
    <Sheet open={open} onOpenChange={handleClose}>
      <SheetContent side="right" className="w-full sm:max-w-md overflow-y-auto p-0">
        <SheetHeader className="border-b border-border px-6 py-4">
          <SheetTitle className="text-lg font-semibold">Change Password</SheetTitle>
          <SheetDescription>Update your account password. Make sure your new password is strong and unique.</SheetDescription>
        </SheetHeader>

        {done ? (
          <div className="flex flex-col items-center justify-center gap-4 px-6 py-16">
            <div className="flex size-14 items-center justify-center rounded-full bg-green-500/10">
              <HugeiconsIcon icon={CheckmarkCircle02Icon} strokeWidth={2} className="size-7 text-green-600" />
            </div>
            <div className="text-center">
              <h3 className="text-lg font-semibold">Password Changed!</h3>
              <p className="mt-1 text-sm text-muted-foreground">Your password has been updated successfully.</p>
            </div>
            <Button onClick={() => handleClose(false)} className="mt-2 w-full">
              Done
            </Button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-1 flex-col gap-5 overflow-y-auto px-6 py-5">
            <div>
              <label className={labelClass}>Current Password *</label>
              <div className="relative">
                <HugeiconsIcon icon={LockKeyholeIcon} strokeWidth={2} className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
                <input
                  type={showCurrent ? "text" : "password"}
                  value={form.current_password}
                  onChange={(e) => set("current_password", e.target.value)}
                  required
                  className={inputClass}
                  placeholder="Enter current password"
                  autoFocus
                />
                <button type="button" onClick={() => setShowCurrent(!showCurrent)} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground">
                  <HugeiconsIcon icon={showCurrent ? EyeOffIcon : EyeIcon} strokeWidth={2} className="size-4" />
                </button>
              </div>
            </div>

            <div>
              <label className={labelClass}>New Password *</label>
              <div className="relative">
                <HugeiconsIcon icon={LockKeyholeIcon} strokeWidth={2} className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
                <input
                  type={showNew ? "text" : "password"}
                  value={form.new_password}
                  onChange={(e) => set("new_password", e.target.value)}
                  required
                  minLength={8}
                  className={inputClass}
                  placeholder="Minimum 8 characters"
                />
                <button type="button" onClick={() => setShowNew(!showNew)} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground">
                  <HugeiconsIcon icon={showNew ? EyeOffIcon : EyeIcon} strokeWidth={2} className="size-4" />
                </button>
              </div>
              {form.new_password && form.new_password.length < 8 && (
                <p className="mt-1 text-xs text-red-500">Password must be at least 8 characters</p>
              )}
            </div>

            <div>
              <label className={labelClass}>Confirm New Password *</label>
              <div className="relative">
                <HugeiconsIcon icon={LockKeyholeIcon} strokeWidth={2} className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
                <input
                  type={showConfirm ? "text" : "password"}
                  value={form.new_password_confirmation}
                  onChange={(e) => set("new_password_confirmation", e.target.value)}
                  required
                  minLength={8}
                  className={`${inputClass} ${form.new_password_confirmation && !passwordsMatch ? "border-red-500" : ""}`}
                  placeholder="Re-enter new password"
                />
                <button type="button" onClick={() => setShowConfirm(!showConfirm)} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground">
                  <HugeiconsIcon icon={showConfirm ? EyeOffIcon : EyeIcon} strokeWidth={2} className="size-4" />
                </button>
              </div>
              {form.new_password_confirmation && !passwordsMatch && (
                <p className="mt-1 text-xs text-red-500">Passwords do not match</p>
              )}
            </div>

            <div className="rounded-lg border border-border bg-muted/30 p-4">
              <p className="text-xs text-muted-foreground">
                Choose a strong password with at least 8 characters. Use a mix of letters, numbers, and symbols for better security.
              </p>
            </div>

            <SheetFooter className="flex-row justify-end gap-3 border-t border-border px-6 py-4">
              <Button type="button" variant="outline" onClick={() => handleClose(false)}>Cancel</Button>
              <Button type="submit" disabled={loading || !isValid}>
                {loading ? <HugeiconsIcon icon={Loading03Icon} strokeWidth={2} className="size-4 animate-spin" /> : null}
                Change Password
              </Button>
            </SheetFooter>
          </form>
        )}
      </SheetContent>
    </Sheet>
  )
}
