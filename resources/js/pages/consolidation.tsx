"use client"

import { Header } from "@/components/landing/header"
import { Footer } from "@/components/landing/footer"
import { PageHero } from "@/components/landing/page-hero"
import { RevealOnScroll } from "@/components/reveal-on-scroll"
import { Button } from "@/components/ui/button"
import { HugeiconsIcon } from "@hugeicons/react"
import {
  PackageIcon,
  Globe02Icon,
  ClipboardCheckIcon,
  TruckIcon,
  ArrowRight01Icon,
} from "@hugeicons/core-free-icons"

const features = [
  {
    icon: PackageIcon,
    title: "Multi-Vendor Consolidation",
    desc: "Combine orders from multiple suppliers into a single coordinated shipment.",
  },
  {
    icon: Globe02Icon,
    title: "Origin Coordination",
    desc: "We coordinate collection, inspection and packing at origin before consolidation.",
  },
  {
    icon: ClipboardCheckIcon,
    title: "Quality Inspection",
    desc: "Goods are checked against specifications and purchase orders before shipment.",
  },
  {
    icon: TruckIcon,
    title: "Freight Management",
    desc: "We arrange consolidated freight — sea, air or land — to your destination.",
  },
]

export default function ConsolidationPage() {
  return (
    <div className="flex min-h-svh flex-col">
      <Header />
      <main className="flex-1">
        <PageHero
          label="Cargo Consolidation"
          title="Consolidate multiple suppliers into one shipment"
          description="We combine orders from multiple vendors and suppliers into coordinated consolidated cargo. This reduces freight costs, simplifies documentation and ensures consistent delivery."
        />

        <section className="bg-background py-20 lg:py-28">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <RevealOnScroll>
              <div className="mb-16 max-w-2xl">
                <h2 className="text-3xl font-semibold tracking-tight text-balance sm:text-4xl">
                  Consolidation benefits
                </h2>
                <p className="mt-6 text-lg text-muted-foreground">
                  When you source from multiple suppliers, consolidation
                  simplifies logistics and reduces costs.
                </p>
              </div>
            </RevealOnScroll>

            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {features.map((feat, idx) => (
                <RevealOnScroll key={feat.title} delay={idx * 80}>
                  <div className="group flex h-full flex-col gap-4 rounded-xl border border-border p-6 transition-all duration-300 hover:-translate-y-1 hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5">
                    <div className="flex size-11 items-center justify-center rounded-lg bg-primary/10 transition-transform duration-300 group-hover:scale-110">
                      <HugeiconsIcon icon={feat.icon} strokeWidth={2} className="size-5 text-primary" />
                    </div>
                    <h3 className="text-lg font-semibold">{feat.title}</h3>
                    <p className="text-sm text-muted-foreground">{feat.desc}</p>
                  </div>
                </RevealOnScroll>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-muted/30 py-20 lg:py-28">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
              <RevealOnScroll>
                <div className="flex flex-col gap-6">
                  <h2 className="text-3xl font-semibold tracking-tight text-balance">
                    How consolidation works
                  </h2>
                  <div className="flex flex-col gap-4">
                    {[
                      { step: "01", title: "Multiple purchase orders", desc: "We place orders with different suppliers on your behalf." },
                      { step: "02", title: "Collection at origin", desc: "Goods are collected at our consolidation facility." },
                      { step: "03", title: "Inspection & packing", desc: "Each item is checked against specifications and packed securely." },
                      { step: "04", title: "Consolidated shipment", desc: "All goods are combined into one shipment with unified documentation." },
                      { step: "05", title: "Destination delivery", desc: "Coordinated delivery to your nominated destination." },
                    ].map((s) => (
                      <div key={s.step} className="flex gap-4 rounded-xl border border-border bg-background p-5">
                        <span className="text-2xl font-bold text-primary">{s.step}</span>
                        <div className="flex flex-col gap-1">
                          <h3 className="text-base font-semibold">{s.title}</h3>
                          <p className="text-sm text-muted-foreground">{s.desc}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </RevealOnScroll>

              <RevealOnScroll delay={100}>
                <div className="flex h-full flex-col items-center justify-center gap-6 rounded-xl border border-primary/20 bg-primary/5 p-10 text-center">
                  <div className="flex size-16 items-center justify-center rounded-full bg-primary/10">
                    <HugeiconsIcon icon={PackageIcon} strokeWidth={2} className="size-8 text-primary" />
                  </div>
                  <h3 className="text-2xl font-semibold tracking-tight">
                    Request a consolidation quote
                  </h3>
                  <p className="max-w-md text-lg text-muted-foreground">
                    Tell us about your multi-supplier sourcing requirement and
                    we will prepare a consolidation quote.
                  </p>
                  <a href="/rfq">
                    <Button size="lg" className="h-12 px-8 text-base font-semibold transition-all duration-300 hover:scale-[1.02] hover:shadow-lg">
                      Request Consolidation Quote
                      <HugeiconsIcon icon={ArrowRight01Icon} strokeWidth={2} className="size-4" />
                    </Button>
                  </a>
                </div>
              </RevealOnScroll>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
