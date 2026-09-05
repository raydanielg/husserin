"use client"

import { useState } from "react"
import { cn } from "cn"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { HugeiconsIcon } from "@hugeicons/react"
import {
  Search01Icon,
  CheckmarkCircle01Icon,
  Alert02Icon,
  Loading03Icon,
} from "@hugeicons/core-free-icons"

type TrackResult = {
  success: boolean
  type?: string
  enquiry_id?: string
  status?: string
  submitted_at?: string
  details?: Record<string, string>
  message?: string
}

export function TrackingForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const [enquiryId, setEnquiryId] = useState("")
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState<TrackResult | null>(null)
  const [error, setError] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!enquiryId.trim()) {
      setError("Please enter a reference ID")
      return
    }
    setError("")
    setLoading(true)
    setResult(null)

    try {
      const res = await fetch("/api/track", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-CSRF-TOKEN": (document.querySelector('meta[name="csrf-token"]') as HTMLMetaElement)?.content || "",
        },
        body: JSON.stringify({ enquiry_id: enquiryId.trim() }),
      })

      const data = await res.json()
      setResult(data)
    } catch {
      setError("Network error. Please try again.")
    }
    setLoading(false)
  }

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <form onSubmit={handleSubmit}>
        <div className="flex flex-col gap-3 sm:flex-row">
          <div className="relative flex-1">
            <HugeiconsIcon
              icon={Search01Icon}
              strokeWidth={2}
              className="absolute left-3.5 top-1/2 size-5 -translate-y-1/2 text-muted-foreground"
            />
            <Input
              placeholder="e.g. VND-ABCD1234, RFQ-XYZ98765, MSG-QWERTY12"
              className="h-12 pl-11 pr-4 text-base rounded-xl bg-background/50 backdrop-blur-sm transition-all hover:border-primary/30 focus-visible:border-primary focus-visible:ring-primary/20 placeholder:text-muted-foreground/70"
              value={enquiryId}
              onChange={(e) => setEnquiryId(e.target.value)}
            />
          </div>
          <Button
            type="submit"
            size="lg"
            className="h-12 px-8 text-base font-semibold shadow-sm transition-all duration-300 hover:shadow-lg hover:shadow-primary/25 active:scale-[0.98] disabled:pointer-events-none disabled:opacity-70"
            disabled={loading}
          >
            {loading ? (
              <span className="flex items-center gap-2">
                <HugeiconsIcon icon={Loading03Icon} strokeWidth={2} className="size-4 animate-spin" />
                Tracking...
              </span>
            ) : (
              "Track Enquiry"
            )}
          </Button>
        </div>
        {error && (
          <p className="mt-2 text-sm text-red-500">{error}</p>
        )}
      </form>

      {result && (
        <div className="animate-[fade-in_0.3s_ease-out]">
          {result.success ? (
            <div className="flex flex-col gap-5 rounded-xl border border-border bg-muted/20 p-6 sm:p-8">
              <div className="flex items-center gap-3">
                <div className="flex size-10 items-center justify-center rounded-full bg-primary/10">
                  <HugeiconsIcon icon={CheckmarkCircle01Icon} strokeWidth={2} className="size-5 text-primary" />
                </div>
                <div className="flex flex-col">
                  <span className="text-sm font-medium text-muted-foreground">Enquiry Found</span>
                  <span className="text-lg font-bold text-primary">{result.enquiry_id}</span>
                </div>
              </div>

              <div className="flex flex-wrap gap-3">
                <span className="rounded-lg border border-border bg-background px-3 py-1.5 text-sm font-medium">
                  Type: {result.type}
                </span>
                <span className="rounded-lg border border-border bg-background px-3 py-1.5 text-sm font-medium">
                  Status: <span className="text-primary">{result.status}</span>
                </span>
                <span className="rounded-lg border border-border bg-background px-3 py-1.5 text-sm font-medium">
                  Submitted: {result.submitted_at}
                </span>
              </div>

              {result.details && Object.keys(result.details).length > 0 && (
                <div className="flex flex-col gap-3">
                  <h3 className="text-sm font-semibold uppercase tracking-wide text-muted-foreground/70">
                    Details
                  </h3>
                  <div className="grid gap-2 sm:grid-cols-2">
                    {Object.entries(result.details).map(([key, value]) => (
                      <div key={key} className="flex flex-col gap-0.5 rounded-lg border border-border/60 bg-background px-4 py-2.5">
                        <span className="text-xs font-medium uppercase tracking-wide text-muted-foreground/60">
                          {key}
                        </span>
                        <span className="text-sm font-medium text-foreground break-words">
                          {value}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="flex items-center gap-3 rounded-xl border border-red-500/30 bg-red-500/5 p-6">
              <div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-red-500/10">
                <HugeiconsIcon icon={Alert02Icon} strokeWidth={2} className="size-5 text-red-500" />
              </div>
              <p className="text-base text-red-500">
                {result.message || "No enquiry found with that reference ID."}
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
