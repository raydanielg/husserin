import { useState, useEffect } from "react"
import { useParams, Link } from "react-router-dom"
import { HugeiconsIcon } from "@hugeicons/react"
import { Loading03Icon, ArrowLeft01Icon, PencilEdit02Icon, AssignmentsIcon, Flag02Icon, Cancel01Icon } from "@hugeicons/core-free-icons"
import { useToast } from "@/hooks/use-toast"
import { getStatusColor, getPriorityColor, formatDateTime } from "./helpers"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetFooter,
} from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"

interface Enquiry {
  id: number
  reference_number: string
  type: string
  company_name: string
  contact_person: string
  email: string
  phone: string | null
  country: string | null
  status: string
  priority: string
  description: string | null
  metadata: Record<string, any> | null
  closed_at: string | null
  created_at: string
  updated_at: string
  assignedTo?: { id: number; name: string } | null
  notes?: { id: number; note: string; created_at: string; user: { name: string } }[]
  statusHistories?: { id: number; from_status: string; to_status: string; comment: string | null; created_at: string; user: { name: string } }[]
  tenderDetail?: { tender_reference: string | null; organization: string | null; scope: string | null; category: string | null; destination: string | null; closing_date: string | null; outcome: string | null } | null
  consolidationDetail?: { cargo_details: string | null; supplier_info: string | null; origin: string | null; destination: string | null; shipment_status: string | null } | null
}

export default function EnquiryDetail() {
  const { id } = useParams()
  const { success, error } = useToast()
  const [enquiry, setEnquiry] = useState<Enquiry | null>(null)
  const [loading, setLoading] = useState(true)
  const [newNote, setNewNote] = useState("")
  const [newStatus, setNewStatus] = useState("")
  const [actionLoading, setActionLoading] = useState(false)
  const [editOpen, setEditOpen] = useState(false)
  const [assignOpen, setAssignOpen] = useState(false)
  const [priorityOpen, setPriorityOpen] = useState(false)
  const [statusOpen, setStatusOpen] = useState(false)
  const [teamUsers, setTeamUsers] = useState<{ id: number; name: string }[]>([])
  const [assignTo, setAssignTo] = useState("")
  const [newPriority, setNewPriority] = useState("")
  const [editForm, setEditForm] = useState({
    company_name: "", contact_person: "", email: "", phone: "", country: "", description: "",
    tender_reference: "", tender_organization: "", tender_scope: "", tender_closing_date: "",
    tender_category: "", tender_destination: "",
    cargo_details: "", supplier_info: "", origin: "", destination: "",
  })

  useEffect(() => {
    fetch(`/api/admin/enquiries/${id}`)
      .then((r) => {
        if (!r.ok) throw new Error("Not found")
        return r.json()
      })
      .then((d) => {
        setEnquiry(d); setNewStatus(d.status); setNewPriority(d.priority); setAssignTo(d.assignedTo?.id?.toString() || "")
        setEditForm({
          company_name: d.company_name || "", contact_person: d.contact_person || "", email: d.email || "",
          phone: d.phone || "", country: d.country || "", description: d.description || "",
          tender_reference: d.tenderDetail?.tender_reference || "", tender_organization: d.tenderDetail?.organization || "",
          tender_scope: d.tenderDetail?.scope || "", tender_closing_date: d.tenderDetail?.closing_date || "",
          tender_category: d.tenderDetail?.category || "", tender_destination: d.tenderDetail?.destination || "",
          cargo_details: d.consolidationDetail?.cargo_details || "", supplier_info: d.consolidationDetail?.supplier_info || "",
          origin: d.consolidationDetail?.origin || "", destination: d.consolidationDetail?.destination || "",
        })
        setLoading(false)
      })
      .catch(() => { setEnquiry(null); setLoading(false) })
  }, [id])

  useEffect(() => {
    fetch("/api/admin/team")
      .then((r) => r.json())
      .then((d) => { setTeamUsers(Array.isArray(d) ? d.map((u: any) => ({ id: u.id, name: u.name })) : []) })
      .catch(() => {})
  }, [])

  const updateStatus = async () => {
    if (!enquiry || newStatus === enquiry.status) return
    setActionLoading(true)
    try {
      const res = await fetch(`/api/admin/enquiries/${enquiry.id}/status`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "X-CSRF-TOKEN": (document.querySelector('meta[name="csrf-token"]') as HTMLMetaElement)?.content || "",
        },
        body: JSON.stringify({ status: newStatus }),
      })
      const data = await res.json()
      if (res.ok) {
        setEnquiry(data.enquiry)
        setStatusOpen(false)
        success("Status updated", `Changed to ${newStatus}`)
      } else {
        error("Failed", data.message || "Could not update status")
      }
    } catch {
      error("Connection error", "Could not connect to server")
    }
    setActionLoading(false)
  }

  const assignEnquiry = async () => {
    if (!enquiry || !assignTo) return
    setActionLoading(true)
    try {
      const res = await fetch(`/api/admin/enquiries/${enquiry.id}/assign`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "X-CSRF-TOKEN": (document.querySelector('meta[name="csrf-token"]') as HTMLMetaElement)?.content || "",
        },
        body: JSON.stringify({ assigned_to: Number(assignTo) }),
      })
      const data = await res.json()
      if (res.ok) {
        setEnquiry(data.enquiry)
        setAssignOpen(false)
        success("Assigned", `Enquiry assigned to ${teamUsers.find(u => u.id === Number(assignTo))?.name}`)
      } else {
        error("Failed", data.message || "Could not assign")
      }
    } catch {
      error("Connection error", "Could not connect to server")
    }
    setActionLoading(false)
  }

  const updatePriority = async () => {
    if (!enquiry || newPriority === enquiry.priority) return
    setActionLoading(true)
    try {
      const res = await fetch(`/api/admin/enquiries/${enquiry.id}/priority`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "X-CSRF-TOKEN": (document.querySelector('meta[name="csrf-token"]') as HTMLMetaElement)?.content || "",
        },
        body: JSON.stringify({ priority: newPriority }),
      })
      const data = await res.json()
      if (res.ok) {
        setEnquiry(data.enquiry)
        setPriorityOpen(false)
        success("Priority updated", `Changed to ${newPriority}`)
      } else {
        error("Failed", data.message || "Could not update priority")
      }
    } catch {
      error("Connection error", "Could not connect to server")
    }
    setActionLoading(false)
  }

  const saveEdit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!enquiry) return
    setActionLoading(true)
    try {
      const res = await fetch(`/api/admin/enquiries/${enquiry.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "X-CSRF-TOKEN": (document.querySelector('meta[name="csrf-token"]') as HTMLMetaElement)?.content || "",
        },
        body: JSON.stringify(editForm),
      })
      const data = await res.json()
      if (res.ok) {
        setEnquiry(data.enquiry)
        setEditOpen(false)
        success("Updated", "Enquiry details saved")
      } else {
        error("Failed", data.message || "Could not update")
      }
    } catch {
      error("Connection error", "Could not connect to server")
    }
    setActionLoading(false)
  }

  const addNote = async () => {
    if (!enquiry || !newNote.trim()) return
    setActionLoading(true)
    try {
      const res = await fetch(`/api/admin/enquiries/${enquiry.id}/notes`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-CSRF-TOKEN": (document.querySelector('meta[name="csrf-token"]') as HTMLMetaElement)?.content || "",
        },
        body: JSON.stringify({ note: newNote }),
      })
      const data = await res.json()
      if (res.ok) {
        setEnquiry({ ...enquiry, notes: [...(enquiry.notes || []), data.note] })
        setNewNote("")
        success("Note added", "Internal note saved")
      } else {
        error("Failed", data.message || "Could not add note")
      }
    } catch {
      error("Connection error", "Could not connect to server")
    }
    setActionLoading(false)
  }

  if (loading) {
    return (
      <div className="flex flex-1 items-center justify-center p-8">
        <HugeiconsIcon icon={Loading03Icon} strokeWidth={2} className="size-8 animate-spin text-muted-foreground" />
      </div>
    )
  }

  if (!enquiry) {
    return <div className="p-8 text-center text-muted-foreground">Enquiry not found</div>
  }

  const statusOptions = enquiry.type === "TENDER"
    ? ["NEW", "UNDER REVIEW", "EVALUATION", "SOURCING", "QUOTATION", "SUBMITTED", "WON", "LOST", "EXPIRED", "CLOSED"]
    : enquiry.type === "CONSOLIDATION"
    ? ["NEW", "QUOTE REQUESTED", "QUOTED", "CONFIRMED", "CARGO RECEIVING", "CONSOLIDATING", "DOCUMENTATION", "IN TRANSIT", "COMPLETED", "CANCELLED"]
    : enquiry.type === "VENDOR"
    ? ["NEW", "PENDING", "UNDER REVIEW", "APPROVED", "REJECTED"]
    : ["NEW", "UNDER REVIEW", "SOURCING", "QUOTATION PREPARATION", "QUOTED", "NEGOTIATION", "WON", "LOST", "CLOSED"]

  const inputClass = "h-10 w-full rounded-lg border border-input bg-background px-3 text-sm placeholder:text-muted-foreground focus-visible:border-primary focus-visible:ring-primary/20 focus-visible:outline-none"
  const labelClass = "mb-1.5 block text-xs font-medium text-muted-foreground"
  const sectionClass = "flex flex-col gap-3 rounded-xl border border-border bg-muted/20 p-4"
  const actionBtnClass = "flex items-center gap-2 rounded-lg border border-input bg-background px-3 py-2 text-sm font-medium text-foreground transition-colors hover:bg-muted disabled:opacity-50"

  return (
    <div className="flex flex-1 flex-col gap-6 p-4 pt-0 lg:p-6">
      <Link to="/admin/enquiries" className="flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground">
        <HugeiconsIcon icon={ArrowLeft01Icon} strokeWidth={2} className="size-4" />
        Back to Enquiries
      </Link>

      <div className="flex flex-col gap-1">
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <h1 className="text-2xl font-bold tracking-tight">{enquiry.reference_number}</h1>
            <span className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium ${getStatusColor(enquiry.status)}`}>
              {enquiry.status}
            </span>
            <span className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium ${getPriorityColor(enquiry.priority)}`}>
              {enquiry.priority}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <button onClick={() => setEditOpen(true)} className={actionBtnClass}>
              <HugeiconsIcon icon={PencilEdit02Icon} strokeWidth={2} className="size-4" />
              <span className="hidden sm:inline">Edit</span>
            </button>
            <button onClick={() => setStatusOpen(true)} className={actionBtnClass}>
              <HugeiconsIcon icon={Cancel01Icon} strokeWidth={2} className="size-4" />
              <span className="hidden sm:inline">Status</span>
            </button>
            <button onClick={() => setAssignOpen(true)} className={actionBtnClass}>
              <HugeiconsIcon icon={AssignmentsIcon} strokeWidth={2} className="size-4" />
              <span className="hidden sm:inline">Assign</span>
            </button>
            <button onClick={() => setPriorityOpen(true)} className={actionBtnClass}>
              <HugeiconsIcon icon={Flag02Icon} strokeWidth={2} className="size-4" />
              <span className="hidden sm:inline">Priority</span>
            </button>
          </div>
        </div>
        <p className="text-sm text-muted-foreground">{enquiry.type} · Created {formatDateTime(enquiry.created_at)}</p>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="flex flex-col gap-6 lg:col-span-2">
          <div className="flex flex-col gap-4 rounded-xl border border-border bg-background p-4 lg:p-6">
            <h2 className="text-lg font-semibold">Enquiry Details</h2>
            <div className="grid gap-4 sm:grid-cols-2">
              <div><span className="text-xs text-muted-foreground">Company</span><p className="text-sm font-medium">{enquiry.company_name}</p></div>
              <div><span className="text-xs text-muted-foreground">Contact Person</span><p className="text-sm font-medium">{enquiry.contact_person}</p></div>
              <div><span className="text-xs text-muted-foreground">Email</span><p className="text-sm font-medium">{enquiry.email}</p></div>
              <div><span className="text-xs text-muted-foreground">Phone</span><p className="text-sm font-medium">{enquiry.phone || "—"}</p></div>
              <div><span className="text-xs text-muted-foreground">Country</span><p className="text-sm font-medium">{enquiry.country || "—"}</p></div>
              <div><span className="text-xs text-muted-foreground">Assigned To</span><p className="text-sm font-medium">{enquiry.assignedTo?.name || "Unassigned"}</p></div>
            </div>
            {enquiry.description && (
              <div>
                <span className="text-xs text-muted-foreground">Description</span>
                <p className="mt-1 text-sm">{enquiry.description}</p>
              </div>
            )}
          </div>

          {enquiry.tenderDetail && (
            <div className="flex flex-col gap-4 rounded-xl border border-border bg-background p-4 lg:p-6">
              <h2 className="text-lg font-semibold">Tender Details</h2>
              <div className="grid gap-4 sm:grid-cols-2">
                <div><span className="text-xs text-muted-foreground">Tender Reference</span><p className="text-sm font-medium">{enquiry.tenderDetail.tender_reference || "—"}</p></div>
                <div><span className="text-xs text-muted-foreground">Organization</span><p className="text-sm font-medium">{enquiry.tenderDetail.organization || "—"}</p></div>
                <div><span className="text-xs text-muted-foreground">Category</span><p className="text-sm font-medium">{enquiry.tenderDetail.category || "—"}</p></div>
                <div><span className="text-xs text-muted-foreground">Destination</span><p className="text-sm font-medium">{enquiry.tenderDetail.destination || "—"}</p></div>
                <div><span className="text-xs text-muted-foreground">Closing Date</span><p className="text-sm font-medium">{enquiry.tenderDetail.closing_date || "—"}</p></div>
                <div><span className="text-xs text-muted-foreground">Outcome</span><p className="text-sm font-medium">{enquiry.tenderDetail.outcome || "—"}</p></div>
                {enquiry.tenderDetail.scope && <div className="sm:col-span-2"><span className="text-xs text-muted-foreground">Scope</span><p className="mt-1 text-sm">{enquiry.tenderDetail.scope}</p></div>}
              </div>
            </div>
          )}

          {enquiry.consolidationDetail && (
            <div className="flex flex-col gap-4 rounded-xl border border-border bg-background p-4 lg:p-6">
              <h2 className="text-lg font-semibold">Consolidation Details</h2>
              <div className="grid gap-4 sm:grid-cols-2">
                <div><span className="text-xs text-muted-foreground">Origin</span><p className="text-sm font-medium">{enquiry.consolidationDetail.origin || "—"}</p></div>
                <div><span className="text-xs text-muted-foreground">Destination</span><p className="text-sm font-medium">{enquiry.consolidationDetail.destination || "—"}</p></div>
                <div><span className="text-xs text-muted-foreground">Shipment Status</span><p className="text-sm font-medium">{enquiry.consolidationDetail.shipment_status || "—"}</p></div>
                {enquiry.consolidationDetail.cargo_details && <div className="sm:col-span-2"><span className="text-xs text-muted-foreground">Cargo Details</span><p className="mt-1 text-sm">{enquiry.consolidationDetail.cargo_details}</p></div>}
                {enquiry.consolidationDetail.supplier_info && <div className="sm:col-span-2"><span className="text-xs text-muted-foreground">Supplier Info</span><p className="mt-1 text-sm">{enquiry.consolidationDetail.supplier_info}</p></div>}
              </div>
            </div>
          )}

          {enquiry.metadata && Object.keys(enquiry.metadata).length > 0 && (
            <div className="flex flex-col gap-4 rounded-xl border border-border bg-background p-4 lg:p-6">
              <h2 className="text-lg font-semibold">Additional Information</h2>
              <div className="grid gap-4 sm:grid-cols-2">
                {Object.entries(enquiry.metadata).filter(([k]) => !["company_name", "company", "contact_person", "email", "phone", "country", "message", "subject"].includes(k)).map(([key, val]) => (
                  <div key={key}>
                    <span className="text-xs text-muted-foreground capitalize">{key.replace(/_/g, " ")}</span>
                    <p className="text-sm font-medium">{String(val) || "—"}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="flex flex-col gap-4 rounded-xl border border-border bg-background p-4 lg:p-6">
            <h2 className="text-lg font-semibold">Internal Notes</h2>
            <div className="flex gap-2">
              <textarea
                value={newNote}
                onChange={(e) => setNewNote(e.target.value)}
                placeholder="Add an internal note..."
                rows={3}
                className="flex-1 rounded-lg border border-input bg-background p-3 text-sm placeholder:text-muted-foreground focus-visible:border-primary focus-visible:ring-primary/20"
              />
              <button
                onClick={addNote}
                disabled={actionLoading || !newNote.trim()}
                className="self-end rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground disabled:opacity-50 hover:bg-primary/90"
              >
                Add Note
              </button>
            </div>
            <div className="flex flex-col gap-3">
              {enquiry.notes?.length === 0 && <p className="text-sm text-muted-foreground py-4 text-center">No notes yet</p>}
              {enquiry.notes?.map((note) => (
                <div key={note.id} className="rounded-lg border border-border/50 bg-muted/20 p-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-medium">{note.user.name}</span>
                    <span className="text-xs text-muted-foreground">{formatDateTime(note.created_at)}</span>
                  </div>
                  <p className="mt-1.5 text-sm">{note.note}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-6">
          <div className="flex flex-col gap-4 rounded-xl border border-border bg-background p-4 lg:p-6">
            <h2 className="text-lg font-semibold">Quick Actions</h2>
            <div className="flex flex-col gap-2">
              <button onClick={() => setEditOpen(true)} className="flex items-center gap-3 rounded-lg border border-input bg-background px-4 py-3 text-sm font-medium transition-colors hover:bg-muted">
                <HugeiconsIcon icon={PencilEdit02Icon} strokeWidth={2} className="size-4 text-primary" />
                Edit Details
              </button>
              <button onClick={() => setStatusOpen(true)} className="flex items-center gap-3 rounded-lg border border-input bg-background px-4 py-3 text-sm font-medium transition-colors hover:bg-muted">
                <HugeiconsIcon icon={Cancel01Icon} strokeWidth={2} className="size-4 text-blue-600" />
                Change Status
                <span className="ml-auto text-xs text-muted-foreground">{enquiry.status}</span>
              </button>
              <button onClick={() => setAssignOpen(true)} className="flex items-center gap-3 rounded-lg border border-input bg-background px-4 py-3 text-sm font-medium transition-colors hover:bg-muted">
                <HugeiconsIcon icon={AssignmentsIcon} strokeWidth={2} className="size-4 text-purple-600" />
                Assign To
                <span className="ml-auto text-xs text-muted-foreground">{enquiry.assignedTo?.name || "Unassigned"}</span>
              </button>
              <button onClick={() => setPriorityOpen(true)} className="flex items-center gap-3 rounded-lg border border-input bg-background px-4 py-3 text-sm font-medium transition-colors hover:bg-muted">
                <HugeiconsIcon icon={Flag02Icon} strokeWidth={2} className="size-4 text-orange-600" />
                Change Priority
                <span className="ml-auto text-xs text-muted-foreground">{enquiry.priority}</span>
              </button>
            </div>
          </div>

          <div className="flex flex-col gap-4 rounded-xl border border-border bg-background p-4 lg:p-6">
            <h2 className="text-lg font-semibold">Status History</h2>
            <div className="flex flex-col gap-3">
              {enquiry.statusHistories?.length === 0 && <p className="text-sm text-muted-foreground py-4 text-center">No history yet</p>}
              {enquiry.statusHistories?.map((h) => (
                <div key={h.id} className="flex flex-col gap-1 border-l-2 border-primary/30 pl-3">
                  <div className="flex items-center gap-2 text-sm">
                    <span className="font-medium">{h.from_status}</span>
                    <span className="text-muted-foreground">→</span>
                    <span className="font-medium">{h.to_status}</span>
                  </div>
                  <span className="text-xs text-muted-foreground">{h.user.name} · {formatDateTime(h.created_at)}</span>
                  {h.comment && <p className="text-xs text-muted-foreground">{h.comment}</p>}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Edit Drawer */}
      <Sheet open={editOpen} onOpenChange={setEditOpen}>
        <SheetContent side="right" className="w-full sm:max-w-lg overflow-y-auto p-0">
          <SheetHeader className="border-b border-border px-6 py-4">
            <SheetTitle className="text-lg font-semibold">Edit Enquiry</SheetTitle>
            <SheetDescription>Update enquiry details. Changes are tracked in audit logs.</SheetDescription>
          </SheetHeader>
          <form onSubmit={saveEdit} className="flex flex-1 flex-col gap-5 overflow-y-auto px-6 py-5">
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label className={labelClass}>Company Name</label>
                <input value={editForm.company_name} onChange={(e) => setEditForm({ ...editForm, company_name: e.target.value })} className={inputClass} />
              </div>
              <div>
                <label className={labelClass}>Contact Person</label>
                <input value={editForm.contact_person} onChange={(e) => setEditForm({ ...editForm, contact_person: e.target.value })} className={inputClass} />
              </div>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label className={labelClass}>Email</label>
                <input type="email" value={editForm.email} onChange={(e) => setEditForm({ ...editForm, email: e.target.value })} className={inputClass} />
              </div>
              <div>
                <label className={labelClass}>Phone</label>
                <input value={editForm.phone} onChange={(e) => setEditForm({ ...editForm, phone: e.target.value })} className={inputClass} />
              </div>
            </div>
            <div>
              <label className={labelClass}>Country</label>
              <input value={editForm.country} onChange={(e) => setEditForm({ ...editForm, country: e.target.value })} className={inputClass} />
            </div>
            <div>
              <label className={labelClass}>Description</label>
              <textarea value={editForm.description} onChange={(e) => setEditForm({ ...editForm, description: e.target.value })} rows={3} className="w-full rounded-lg border border-input bg-background p-3 text-sm focus-visible:border-primary focus-visible:outline-none" />
            </div>
            {enquiry.type === "TENDER" && (
              <div className={sectionClass}>
                <h4 className="text-sm font-semibold text-foreground">Tender Details</h4>
                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label className={labelClass}>Reference</label>
                    <input value={editForm.tender_reference} onChange={(e) => setEditForm({ ...editForm, tender_reference: e.target.value })} className={inputClass} />
                  </div>
                  <div>
                    <label className={labelClass}>Organization</label>
                    <input value={editForm.tender_organization} onChange={(e) => setEditForm({ ...editForm, tender_organization: e.target.value })} className={inputClass} />
                  </div>
                </div>
                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label className={labelClass}>Category</label>
                    <input value={editForm.tender_category} onChange={(e) => setEditForm({ ...editForm, tender_category: e.target.value })} className={inputClass} />
                  </div>
                  <div>
                    <label className={labelClass}>Closing Date</label>
                    <input type="date" value={editForm.tender_closing_date} onChange={(e) => setEditForm({ ...editForm, tender_closing_date: e.target.value })} className={inputClass} />
                  </div>
                </div>
                <div>
                  <label className={labelClass}>Scope</label>
                  <textarea value={editForm.tender_scope} onChange={(e) => setEditForm({ ...editForm, tender_scope: e.target.value })} rows={2} className="w-full rounded-lg border border-input bg-background p-3 text-sm focus-visible:border-primary focus-visible:outline-none" />
                </div>
              </div>
            )}
            {enquiry.type === "CONSOLIDATION" && (
              <div className={sectionClass}>
                <h4 className="text-sm font-semibold text-foreground">Consolidation Details</h4>
                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label className={labelClass}>Origin</label>
                    <input value={editForm.origin} onChange={(e) => setEditForm({ ...editForm, origin: e.target.value })} className={inputClass} />
                  </div>
                  <div>
                    <label className={labelClass}>Destination</label>
                    <input value={editForm.destination} onChange={(e) => setEditForm({ ...editForm, destination: e.target.value })} className={inputClass} />
                  </div>
                </div>
                <div>
                  <label className={labelClass}>Cargo Details</label>
                  <textarea value={editForm.cargo_details} onChange={(e) => setEditForm({ ...editForm, cargo_details: e.target.value })} rows={2} className="w-full rounded-lg border border-input bg-background p-3 text-sm focus-visible:border-primary focus-visible:outline-none" />
                </div>
              </div>
            )}
            <SheetFooter className="flex-row justify-end gap-3 border-t border-border px-6 py-4">
              <Button type="button" variant="outline" onClick={() => setEditOpen(false)}>Cancel</Button>
              <Button type="submit" disabled={actionLoading}>
                {actionLoading ? <HugeiconsIcon icon={Loading03Icon} strokeWidth={2} className="size-4 animate-spin" /> : null}
                Save Changes
              </Button>
            </SheetFooter>
          </form>
        </SheetContent>
      </Sheet>

      {/* Status Drawer */}
      <Sheet open={statusOpen} onOpenChange={setStatusOpen}>
        <SheetContent side="right" className="w-full sm:max-w-sm p-0">
          <SheetHeader className="border-b border-border px-6 py-4">
            <SheetTitle className="text-lg font-semibold">Change Status</SheetTitle>
            <SheetDescription>Select a new status for this enquiry.</SheetDescription>
          </SheetHeader>
          <div className="flex flex-1 flex-col gap-4 px-6 py-5">
            <div className="flex flex-col gap-2">
              {statusOptions.map((s) => (
                <button
                  key={s}
                  onClick={() => setNewStatus(s)}
                  className={`flex items-center justify-between rounded-lg border px-4 py-3 text-sm font-medium transition-colors ${newStatus === s ? "border-primary bg-primary/5 text-primary" : "border-input hover:bg-muted"}`}
                >
                  {s}
                  {newStatus === s && <HugeiconsIcon icon={Cancel01Icon} strokeWidth={2} className="size-4" />}
                </button>
              ))}
            </div>
            <SheetFooter className="flex-row justify-end gap-3 border-t border-border px-6 py-4">
              <Button type="button" variant="outline" onClick={() => setStatusOpen(false)}>Cancel</Button>
              <Button onClick={updateStatus} disabled={actionLoading || newStatus === enquiry.status}>
                {actionLoading ? <HugeiconsIcon icon={Loading03Icon} strokeWidth={2} className="size-4 animate-spin" /> : null}
                Update Status
              </Button>
            </SheetFooter>
          </div>
        </SheetContent>
      </Sheet>

      {/* Assign Drawer */}
      <Sheet open={assignOpen} onOpenChange={setAssignOpen}>
        <SheetContent side="right" className="w-full sm:max-w-sm p-0">
          <SheetHeader className="border-b border-border px-6 py-4">
            <SheetTitle className="text-lg font-semibold">Assign To</SheetTitle>
            <SheetDescription>Select a team member to assign this enquiry.</SheetDescription>
          </SheetHeader>
          <div className="flex flex-1 flex-col gap-4 px-6 py-5">
            <div className="flex flex-col gap-2">
              <button
                onClick={() => setAssignTo("")}
                className={`flex items-center justify-between rounded-lg border px-4 py-3 text-sm font-medium transition-colors ${!assignTo ? "border-primary bg-primary/5 text-primary" : "border-input hover:bg-muted"}`}
              >
                Unassigned
              </button>
              {teamUsers.map((u) => (
                <button
                  key={u.id}
                  onClick={() => setAssignTo(u.id.toString())}
                  className={`flex items-center justify-between rounded-lg border px-4 py-3 text-sm font-medium transition-colors ${assignTo === u.id.toString() ? "border-primary bg-primary/5 text-primary" : "border-input hover:bg-muted"}`}
                >
                  {u.name}
                </button>
              ))}
            </div>
            <SheetFooter className="flex-row justify-end gap-3 border-t border-border px-6 py-4">
              <Button type="button" variant="outline" onClick={() => setAssignOpen(false)}>Cancel</Button>
              <Button onClick={assignEnquiry} disabled={actionLoading}>
                {actionLoading ? <HugeiconsIcon icon={Loading03Icon} strokeWidth={2} className="size-4 animate-spin" /> : null}
                Assign
              </Button>
            </SheetFooter>
          </div>
        </SheetContent>
      </Sheet>

      {/* Priority Drawer */}
      <Sheet open={priorityOpen} onOpenChange={setPriorityOpen}>
        <SheetContent side="right" className="w-full sm:max-w-sm p-0">
          <SheetHeader className="border-b border-border px-6 py-4">
            <SheetTitle className="text-lg font-semibold">Change Priority</SheetTitle>
            <SheetDescription>Select a new priority level.</SheetDescription>
          </SheetHeader>
          <div className="flex flex-1 flex-col gap-4 px-6 py-5">
            <div className="flex flex-col gap-2">
              {["LOW", "NORMAL", "HIGH", "URGENT"].map((p) => (
                <button
                  key={p}
                  onClick={() => setNewPriority(p)}
                  className={`flex items-center justify-between rounded-lg border px-4 py-3 text-sm font-medium transition-colors ${newPriority === p ? "border-primary bg-primary/5 text-primary" : "border-input hover:bg-muted"}`}
                >
                  <span className="flex items-center gap-2">
                    <span className={`inline-flex items-center rounded-full border px-2 py-0.5 text-xs ${getPriorityColor(p)}`}>{p}</span>
                  </span>
                </button>
              ))}
            </div>
            <SheetFooter className="flex-row justify-end gap-3 border-t border-border px-6 py-4">
              <Button type="button" variant="outline" onClick={() => setPriorityOpen(false)}>Cancel</Button>
              <Button onClick={updatePriority} disabled={actionLoading || newPriority === enquiry.priority}>
                {actionLoading ? <HugeiconsIcon icon={Loading03Icon} strokeWidth={2} className="size-4 animate-spin" /> : null}
                Update Priority
              </Button>
            </SheetFooter>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  )
}
