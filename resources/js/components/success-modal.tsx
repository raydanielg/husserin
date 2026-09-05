"use client"

import { useEffect } from "react"
import { cn } from "cn"
import { Button } from "@/components/ui/button"
import { HugeiconsIcon } from "@hugeicons/react"
import {
  CheckmarkCircle01Icon,
  Copy01Icon,
  ArrowRight01Icon,
  Cancel01Icon,
} from "@hugeicons/core-free-icons"

export function SuccessModal({
  open,
  onClose,
  enquiryId,
  title,
  message,
  trackingHref = "/track",
}: {
  open: boolean
  onClose: () => void
  enquiryId: string
  title: string
  message: string
  trackingHref?: string
}) {
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden"
      return () => {
        document.body.style.overflow = ""
      }
    }
  }, [open])

  if (!open) return null

  const copyId = () => {
    navigator.clipboard.writeText(enquiryId)
  }

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm animate-[fade-in_0.2s_ease-out]"
        onClick={onClose}
      />

      <div className="relative z-10 w-full max-w-md animate-[fade-in_0.3s_ease-out]">
        <div className="flex flex-col items-center gap-5 rounded-2xl border border-border bg-background p-8 text-center shadow-2xl sm:p-10">
          <button
            onClick={onClose}
            className="absolute right-4 top-4 flex size-8 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
          >
            <HugeiconsIcon icon={Cancel01Icon} strokeWidth={2} className="size-4" />
          </button>

          <div className="flex size-16 items-center justify-center rounded-full bg-primary/10">
            <HugeiconsIcon
              icon={CheckmarkCircle01Icon}
              strokeWidth={2}
              className="size-8 text-primary"
            />
          </div>

          <h2 className="text-2xl font-bold tracking-tight">
            {title}
          </h2>

          <p className="max-w-sm text-base text-muted-foreground">
            {message}
          </p>

          <div className="flex w-full items-center gap-2 rounded-xl border border-border bg-muted/30 px-4 py-3">
            <div className="flex flex-1 flex-col items-start gap-0.5">
              <span className="text-xs font-medium uppercase tracking-wide text-muted-foreground/70">
                Reference ID
              </span>
              <span className="text-base font-bold text-primary">
                {enquiryId}
              </span>
            </div>
            <button
              onClick={copyId}
              className="flex size-9 items-center justify-center rounded-lg border border-border bg-background text-muted-foreground transition-all hover:border-primary/30 hover:text-primary"
              title="Copy reference"
            >
              <HugeiconsIcon icon={Copy01Icon} strokeWidth={2} className="size-4" />
            </button>
          </div>

          <div className="flex w-full flex-col gap-3 pt-1">
            <a href={trackingHref} className="w-full">
              <Button
                size="lg"
                className="h-12 w-full text-base font-semibold transition-all duration-300 hover:shadow-lg"
              >
                Track your enquiry
                <HugeiconsIcon icon={ArrowRight01Icon} strokeWidth={2} className="size-4" />
              </Button>
            </a>
            <Button
              size="lg"
              variant="outline"
              className="h-12 w-full text-base font-semibold"
              onClick={onClose}
            >
              Close
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
