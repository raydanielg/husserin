"use client"

import { Button } from "@/components/ui/button"
import { TextRotator } from "@/components/text-rotator"
import { NetworkBackground } from "@/components/network-background"
import { HugeiconsIcon } from "@hugeicons/react"
import { ArrowRight01Icon, PackageIcon } from "@hugeicons/core-free-icons"

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-background">
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/[0.03] via-transparent to-transparent" />
        <NetworkBackground />
      </div>

      <div className="relative z-10 mx-auto flex max-w-7xl flex-col items-center gap-12 px-4 py-20 text-center sm:px-6 lg:px-8 lg:py-28">
        <div className="flex flex-col gap-8 animate-[fade-in_0.8s_ease-out]">
          <div className="flex flex-col items-center gap-6">
            <span className="text-xs font-medium uppercase tracking-[0.2em] text-primary animate-[fade-in_0.6s_ease-out]">
              Global Trading · Procurement · Consolidation
            </span>
            <h1 className="max-w-3xl text-4xl font-semibold tracking-tight text-foreground text-balance sm:text-5xl lg:text-6xl animate-[fade-in_0.8s_ease-out_0.1s_both]">
              We Source. We Supply.{" "}
              <br className="hidden sm:block" />
              We <TextRotator />.
            </h1>
            <p className="max-w-xl text-lg text-muted-foreground text-pretty animate-[fade-in_0.8s_ease-out_0.2s_both]">
              We source, supply and consolidate goods for businesses,
              institutions and project requirements across global markets.
            </p>
          </div>

          <div className="flex flex-col items-center gap-3 sm:flex-row animate-[fade-in_0.8s_ease-out_0.3s_both]">
            <a href="/rfq">
              <Button
                size="lg"
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
                className="h-12 px-8 text-base font-semibold transition-all duration-300 hover:scale-[1.02] hover:shadow-lg"
              >
                <HugeiconsIcon icon={PackageIcon} strokeWidth={2} className="size-4" />
                Request Consolidation Quote
              </Button>
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
