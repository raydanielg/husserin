import { useState, useEffect, useCallback } from "react"
import { HugeiconsIcon } from "@hugeicons/react"
import { Loading03Icon, Add01Icon, Mail01Icon, Copy01Icon, CheckmarkCircle02Icon } from "@hugeicons/core-free-icons"
import { useToast } from "@/hooks/use-toast"
import { formatDate } from "./helpers"
import CreateTeamMemberModal from "./create-team-modal"

interface User {
  id: number
  name: string
  email: string
  role: string
  is_active: boolean
  created_at: string
}

export default function SettingsTeam() {
  const { success, error } = useToast()
  const [users, setUsers] = useState<User[]>([])
  const [loading, setLoading] = useState(true)
  const [createOpen, setCreateOpen] = useState(false)
  const [accessDenied, setAccessDenied] = useState(false)
  const [resending, setResending] = useState<number | null>(null)
  const [copiedId, setCopiedId] = useState<number | null>(null)

  const fetchUsers = useCallback(() => {
    fetch("/api/admin/team")
      .then((r) => {
        if (r.status === 403) { setAccessDenied(true); setLoading(false); throw new Error("skip") }
        if (!r.ok) throw new Error("failed")
        return r.json()
      })
      .then((d) => { setUsers(Array.isArray(d) ? d : (d?.data ?? [])); setLoading(false) })
      .catch((e) => { if (e.message !== "skip") setLoading(false) })
  }, [])

  useEffect(() => { fetchUsers() }, [fetchUsers])

  const toggleActive = async (id: number, current: boolean) => {
    try {
      const res = await fetch(`/api/admin/team/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "X-CSRF-TOKEN": (document.querySelector('meta[name="csrf-token"]') as HTMLMetaElement)?.content || "",
        },
        body: JSON.stringify({ is_active: !current }),
      })
      if (res.ok) {
        setUsers(prev => prev.map(u => u.id === id ? { ...u, is_active: !current } : u))
        success("Updated", `User ${!current ? "activated" : "deactivated"}`)
      } else {
        error("Failed", "Could not update user")
      }
    } catch {
      error("Connection error", "Could not connect")
    }
  }

  const handleResend = async (id: number, name: string) => {
    setResending(id)
    try {
      const res = await fetch(`/api/admin/team/${id}/resend`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-CSRF-TOKEN": (document.querySelector('meta[name="csrf-token"]') as HTMLMetaElement)?.content || "",
        },
      })
      const data = await res.json()
      if (res.ok) {
        if (data.email_sent) {
          success("Invitation sent", data.message)
        } else {
          error("Email failed", data.message)
          if (data.setup_url) {
            window.open(data.setup_url, "_blank")
          }
        }
      } else {
        error("Failed", data.message || "Could not resend invitation")
      }
    } catch {
      error("Connection error", "Could not connect")
    }
    setResending(null)
  }

  const handleCopyLink = async (id: number, name: string) => {
    try {
      const res = await fetch(`/api/admin/team/${id}/resend`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-CSRF-TOKEN": (document.querySelector('meta[name="csrf-token"]') as HTMLMetaElement)?.content || "",
        },
      })
      const data = await res.json()
      if (res.ok && data.setup_url) {
        await navigator.clipboard.writeText(data.setup_url)
        setCopiedId(id)
        success("Link copied", "Setup link copied to clipboard")
        setTimeout(() => setCopiedId(null), 2000)
      } else if (res.ok && data.email_sent) {
        success("Invitation sent", "Email was sent successfully — no need to copy")
      } else {
        error("Failed", "Could not get setup link")
      }
    } catch {
      error("Connection error", "Could not connect")
    }
  }

  return (
    <div className="flex flex-1 flex-col gap-6 p-4 pt-0 lg:p-6">
      <div className="flex flex-col gap-1">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Team Management</h1>
            <p className="text-sm text-muted-foreground">Manage admin users and their access</p>
          </div>
          <button
            onClick={() => setCreateOpen(true)}
            className="flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90"
          >
            <HugeiconsIcon icon={Add01Icon} strokeWidth={2} className="size-4" />
            Add Member
          </button>
        </div>
      </div>

      <div className="flex flex-col gap-4 rounded-xl border border-border bg-background p-4 lg:p-6">
        {loading ? (
          <div className="flex items-center justify-center py-12">
            <HugeiconsIcon icon={Loading03Icon} strokeWidth={2} className="size-6 animate-spin text-muted-foreground" />
          </div>
        ) : accessDenied ? (
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <p className="text-sm font-medium text-muted-foreground">Super Admin access required</p>
            <p className="mt-1 text-xs text-muted-foreground">Only Super Admins can view and manage the team.</p>
          </div>
        ) : users.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <p className="text-sm font-medium text-muted-foreground">No team members yet</p>
            <p className="mt-1 text-xs text-muted-foreground">Click "Add Member" to invite someone.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full min-w-[700px]">
              <thead>
                <tr className="border-b border-border">
                  <th className="pb-3 text-left text-xs font-medium uppercase tracking-wide text-muted-foreground">Name</th>
                  <th className="pb-3 text-left text-xs font-medium uppercase tracking-wide text-muted-foreground">Email</th>
                  <th className="pb-3 text-left text-xs font-medium uppercase tracking-wide text-muted-foreground">Role</th>
                  <th className="pb-3 text-left text-xs font-medium uppercase tracking-wide text-muted-foreground">Status</th>
                  <th className="pb-3 text-left text-xs font-medium uppercase tracking-wide text-muted-foreground">Invitation</th>
                  <th className="pb-3 text-left text-xs font-medium uppercase tracking-wide text-muted-foreground">Actions</th>
                </tr>
              </thead>
              <tbody>
                {users.map((u) => (
                  <tr key={u.id} className="border-b border-border/50 transition-colors hover:bg-muted/30">
                    <td className="py-3 text-sm font-medium">{u.name}</td>
                    <td className="py-3 text-sm text-muted-foreground">{u.email}</td>
                    <td className="py-3">
                      <span className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium ${u.role === "SUPER_ADMIN" ? "bg-purple-500/10 text-purple-600 border-purple-500/20" : "bg-blue-500/10 text-blue-600 border-blue-500/20"}`}>
                        {u.role.replace(/_/g, " ")}
                      </span>
                    </td>
                    <td className="py-3">
                      <span className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium ${u.is_active ? "bg-green-500/10 text-green-600 border-green-500/20" : "bg-red-500/10 text-red-600 border-red-500/20"}`}>
                        {u.is_active ? "Active" : "Inactive"}
                      </span>
                    </td>
                    <td className="py-3">
                      <span className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium bg-amber-500/10 text-amber-600 border-amber-500/20`}>
                        Pending
                      </span>
                    </td>
                    <td className="py-3">
                      <div className="flex items-center gap-1.5">
                        <button
                          onClick={() => handleResend(u.id, u.name)}
                          disabled={resending === u.id}
                          title="Resend invitation email"
                          className="flex items-center gap-1 rounded-md bg-primary/10 px-2.5 py-1 text-xs font-medium text-primary hover:bg-primary/20 disabled:opacity-50"
                        >
                          {resending === u.id ? (
                            <HugeiconsIcon icon={Loading03Icon} strokeWidth={2} className="size-3 animate-spin" />
                          ) : (
                            <HugeiconsIcon icon={Mail01Icon} strokeWidth={2} className="size-3" />
                          )}
                          Resend
                        </button>
                        <button
                          onClick={() => handleCopyLink(u.id, u.name)}
                          title="Copy setup link"
                          className="flex items-center gap-1 rounded-md bg-muted px-2 py-1 text-xs font-medium text-muted-foreground hover:bg-muted/80"
                        >
                          {copiedId === u.id ? (
                            <HugeiconsIcon icon={CheckmarkCircle02Icon} strokeWidth={2} className="size-3 text-green-600" />
                          ) : (
                            <HugeiconsIcon icon={Copy01Icon} strokeWidth={2} className="size-3" />
                          )}
                        </button>
                        <button
                          onClick={() => toggleActive(u.id, u.is_active)}
                          className={`rounded-md px-2.5 py-1 text-xs font-medium ${u.is_active ? "bg-red-500/10 text-red-600 hover:bg-red-500/20" : "bg-green-500/10 text-green-600 hover:bg-green-500/20"}`}
                        >
                          {u.is_active ? "Deactivate" : "Activate"}
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      <CreateTeamMemberModal open={createOpen} onOpenChange={setCreateOpen} onCreated={fetchUsers} />
    </div>
  )
}
