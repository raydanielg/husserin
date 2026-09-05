"use client"

import { Button } from "@/components/ui/button"
import { RevealOnScroll } from "@/components/reveal-on-scroll"
import { HugeiconsIcon } from "@hugeicons/react"
import { ArrowRight01Icon, PackageIcon } from "@hugeicons/core-free-icons"

export function CTA() {
  return (
    <section className="relative overflow-hidden bg-primary py-20 lg:py-28">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-10"
      >
        <div className="absolute -left-20 top-0 size-96 rounded-full bg-white blur-3xl" />
        <div className="absolute -right-20 bottom-0 size-96 rounded-full bg-white blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <RevealOnScroll>
          <div className="flex flex-col items-center gap-8 text-center">
            <h2 className="max-w-2xl text-3xl font-semibold tracking-tight text-primary-foreground text-balance sm:text-4xl lg:text-5xl">
              Ready to source with a trusted partner?
            </h2>
            <p className="max-w-xl text-lg text-primary-foreground/70 text-pretty">
              Submit your requirement today. Our procurement team will source,
              quote and deliver against your specification.
            </p>
            <div className="flex flex-col gap-3 sm:flex-row">
              <a href="/rfq">
                <Button
                  size="lg"
                  variant="secondary"
                  className="h-12 px-8 text-base font-semibold transition-all duration-300 hover:scale-[1.02] hover:shadow-lg"
                >
                  Submit RFQ
                  <HugeiconsIcon icon={ArrowRight01Icon} strokeWidth={2} className="size-4" />
                </Button>
              </a>
              <a href="/consolidation">
                <Button
                  size="lg"
                  variant="outline"
                  className="h-12 border-white/30 px-8 text-base font-semibold text-white transition-all duration-300 hover:scale-[1.02] hover:border-white/60 hover:bg-white/10"
                >
                  <HugeiconsIcon icon={PackageIcon} strokeWidth={2} className="size-4" />
                  Request Consolidation Quote
                </Button>
              </a>
            </div>
          </div>
        </RevealOnScroll>
      </div>
    </section>
  )
}
