"use client"

import { RevealOnScroll } from "@/components/reveal-on-scroll"
import { HugeiconsIcon } from "@hugeicons/react"
import {
  Globe02Icon,
  DocumentValidationIcon,
  GlobalSearchIcon,
  PackageIcon,
} from "@hugeicons/core-free-icons"

const capabilities = [
  {
    number: "01",
    icon: Globe02Icon,
    title: "General Trading",
    desc: "Source and supply goods across multiple categories for companies, institutions, contractors and project buyers.",
    href: "/trading",
  },
  {
    number: "02",
    icon: DocumentValidationIcon,
    title: "Tender & Contract Supply",
    desc: "Respond to RFQs, tenders, framework supply requirements and project-based procurement with full compliance.",
    href: "/tender",
  },
  {
    number: "03",
    icon: GlobalSearchIcon,
    title: "Procurement & Global Sourcing",
    desc: "Identify suppliers, compare quotations, coordinate specifications, quality documents and order execution.",
    href: "/tender",
  },
  {
    number: "04",
    icon: PackageIcon,
    title: "Cargo Consolidation",
    desc: "Combine multiple shipments and suppliers into coordinated consolidated cargo under our licensed consolidation activity.",
    href: "/consolidation",
  },
]

export function Capabilities() {
  return (
    <section id="capabilities" className="bg-background py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <RevealOnScroll>
          <div className="mb-16 max-w-2xl">
            <span className="text-xs font-medium uppercase tracking-[0.2em] text-primary">
              Core Capabilities
            </span>
            <h2 className="mt-6 text-3xl font-semibold tracking-tight text-balance sm:text-4xl lg:text-5xl">
              What we do
            </h2>
          </div>
        </RevealOnScroll>

        <div className="grid gap-6 lg:grid-cols-2">
          {capabilities.map((cap, idx) => (
            <RevealOnScroll key={cap.number} delay={idx * 80} className="h-full">
              <div className="group relative flex h-full flex-col gap-5 overflow-hidden rounded-2xl border border-border p-8 transition-all duration-300 hover:-translate-y-1 hover:border-primary/30 hover:shadow-xl hover:shadow-primary/5 lg:p-10">
                <div className="pointer-events-none absolute -right-12 -top-12 size-32 rounded-full bg-primary/5 blur-2xl transition-opacity duration-300 group-hover:bg-primary/10" />
                <div className="relative flex items-center justify-between">
                  <div className="flex size-14 items-center justify-center rounded-xl bg-primary/10 transition-transform duration-300 group-hover:scale-110">
                    <HugeiconsIcon icon={cap.icon} strokeWidth={2} className="size-7 text-primary" />
                  </div>
                  <span className="text-4xl font-bold text-muted-foreground/15 transition-colors duration-300 group-hover:text-primary/20">
                    {cap.number}
                  </span>
                </div>
                <div className="relative flex flex-col gap-3">
                  <h3 className="text-xl font-semibold tracking-tight lg:text-2xl">{cap.title}</h3>
                  <p className="text-base text-muted-foreground leading-relaxed">
                    {cap.desc}
                  </p>
                </div>
                <div className="relative mt-auto pt-2">
                  <a
                    href={cap.href}
                    className="inline-flex items-center gap-1.5 text-sm font-medium text-primary transition-all duration-200 hover:gap-2.5"
                  >
                    Learn more
                    <span aria-hidden="true">→</span>
                  </a>
                </div>
              </div>
            </RevealOnScroll>
          ))}
        </div>
      </div>
    </section>
  )
}
