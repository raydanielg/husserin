export const statusColors: Record<string, string> = {
  NEW: "bg-blue-500/10 text-blue-600 border-blue-500/20",
  PENDING: "bg-amber-500/10 text-amber-600 border-amber-500/20",
  "UNDER REVIEW": "bg-purple-500/10 text-purple-600 border-purple-500/20",
  SOURCING: "bg-cyan-500/10 text-cyan-600 border-cyan-500/20",
  "QUOTATION PREPARATION": "bg-indigo-500/10 text-indigo-600 border-indigo-500/20",
  QUOTED: "bg-indigo-500/10 text-indigo-600 border-indigo-500/20",
  NEGOTIATION: "bg-orange-500/10 text-orange-600 border-orange-500/20",
  WON: "bg-green-500/10 text-green-600 border-green-500/20",
  LOST: "bg-red-500/10 text-red-600 border-red-500/20",
  CLOSED: "bg-gray-500/10 text-gray-600 border-gray-500/20",
  EXPIRED: "bg-red-500/10 text-red-600 border-red-500/20",
  SUBMITTED: "bg-blue-500/10 text-blue-600 border-blue-500/20",
  EVALUATION: "bg-purple-500/10 text-purple-600 border-purple-500/20",
  APPROVED: "bg-green-500/10 text-green-600 border-green-500/20",
  REJECTED: "bg-red-500/10 text-red-600 border-red-500/20",
  SUSPENDED: "bg-red-500/10 text-red-600 border-red-500/20",
  "QUOTE REQUESTED": "bg-amber-500/10 text-amber-600 border-amber-500/20",
  CONFIRMED: "bg-green-500/10 text-green-600 border-green-500/20",
  "CARGO RECEIVING": "bg-cyan-500/10 text-cyan-600 border-cyan-500/20",
  CONSOLIDATING: "bg-purple-500/10 text-purple-600 border-purple-500/20",
  DOCUMENTATION: "bg-indigo-500/10 text-indigo-600 border-indigo-500/20",
  "IN TRANSIT": "bg-blue-500/10 text-blue-600 border-blue-500/20",
  COMPLETED: "bg-green-500/10 text-green-600 border-green-500/20",
  CANCELLED: "bg-red-500/10 text-red-600 border-red-500/20",
}

export const priorityColors: Record<string, string> = {
  URGENT: "bg-red-500/10 text-red-600 border-red-500/20",
  HIGH: "bg-orange-500/10 text-orange-600 border-orange-500/20",
  NORMAL: "bg-blue-500/10 text-blue-600 border-blue-500/20",
  LOW: "bg-gray-500/10 text-gray-600 border-gray-500/20",
}

export const vendorStatusColors: Record<string, string> = {
  pending: "bg-amber-500/10 text-amber-600 border-amber-500/20",
  under_review: "bg-purple-500/10 text-purple-600 border-purple-500/20",
  approved: "bg-green-500/10 text-green-600 border-green-500/20",
  rejected: "bg-red-500/10 text-red-600 border-red-500/20",
  suspended: "bg-red-500/10 text-red-600 border-red-500/20",
}

export function getStatusColor(status: string): string {
  return statusColors[status] || "bg-muted text-muted-foreground border-border"
}

export function getPriorityColor(priority: string): string {
  return priorityColors[priority] || priorityColors.NORMAL
}

export function getVendorStatusColor(status: string): string {
  return vendorStatusColors[status] || "bg-muted text-muted-foreground border-border"
}

export function formatDate(date: string | null | undefined): string {
  if (!date) return "—"
  return new Date(date).toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  })
}

export function formatDateTime(date: string | null | undefined): string {
  if (!date) return "—"
  return new Date(date).toLocaleString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  })
}
