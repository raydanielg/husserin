import { useState, useEffect } from "react"
import { useParams, Link } from "react-router-dom"
import { HugeiconsIcon } from "@hugeicons/react"
import { Loading03Icon, ArrowLeft01Icon } from "@hugeicons/core-free-icons"
import { useToast } from "@/hooks/use-toast"
import { getStatusColor, getPriorityColor, formatDateTime } from "./helpers"

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
  assignedTo?: { name: string } | null
  notes?: { id: number; note: string; created_at: string; user: { name: string } }[]
  statusHistories?: { id: number; from_status: string; to_status: string; comment: string | null; created_at: string; user: { name: string } }[]
  tenderDetail?: { tender_reference: string | null; organization: string | null; scope: string | null; closing_date: string | null; outcome: string | null } | null
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

  useEffect(() => {
    fetch(`/api/admin/enquiries/${id}`)
      .then((r) => r.json())
      .then((d) => { setEnquiry(d); setNewStatus(d.status); setLoading(false) })
      .catch(() => setLoading(false))
  }, [id])

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
        success("Status updated", `Changed to ${newStatus}`)
      } else {
        error("Failed", data.message || "Could not update status")
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

  return (
    <div className="flex flex-1 flex-col gap-6 p-4 pt-0 lg:p-6">
      <Link to="/admin/enquiries" className="flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground">
        <HugeiconsIcon icon={ArrowLeft01Icon} strokeWidth={2} className="size-4" />
        Back to Enquiries
      </Link>

      <div className="flex flex-col gap-1">
        <div className="flex items-center gap-3">
          <h1 className="text-2xl font-bold tracking-tight">{enquiry.reference_number}</h1>
          <span className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium ${getStatusColor(enquiry.status)}`}>
            {enquiry.status}
          </span>
          <span className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium ${getPriorityColor(enquiry.priority)}`}>
            {enquiry.priority}
          </span>
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
            <h2 className="text-lg font-semibold">Update Status</h2>
            <select
              value={newStatus}
              onChange={(e) => setNewStatus(e.target.value)}
              className="h-10 rounded-lg border border-input bg-background px-3 text-sm focus-visible:border-primary"
            >
              {statusOptions.map((s) => <option key={s} value={s}>{s}</option>)}
            </select>
            <button
              onClick={updateStatus}
              disabled={actionLoading || newStatus === enquiry.status}
              className="rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground disabled:opacity-50 hover:bg-primary/90"
            >
              {actionLoading ? "Updating..." : "Update Status"}
            </button>
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
    </div>
  )
}
