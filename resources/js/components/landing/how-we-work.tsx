"use client"

import { RevealOnScroll } from "@/components/reveal-on-scroll"

const steps = [
  { number: "01", title: "Requirement", desc: "Client submits tender, RFQ, BOQ, specification or scope of work." },
  { number: "02", title: "Sourcing", desc: "Procurement team identifies compliant manufacturers and distributors." },
  { number: "03", title: "Commercial Offer", desc: "Formal commercial offer aligned to required scope and budget." },
  { number: "04", title: "Procurement", desc: "Purchase, supplier coordination and order follow-up execution." },
  { number: "05", title: "Consolidation / Inspection", desc: "Multiple vendor orders grouped, checked and prepared for shipment." },
  { number: "06", title: "Delivery Coordination", desc: "Freight, documentation and destination coordination as contracted." },
]

export function HowWeWork() {
  return (
    <section id="how-we-work" className="bg-background py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <RevealOnScroll>
          <div className="mb-16 max-w-2xl">
            <span className="text-xs font-medium uppercase tracking-[0.2em] text-primary">
              How We Work
            </span>
            <h2 className="mt-6 text-3xl font-semibold tracking-tight text-balance sm:text-4xl lg:text-5xl">
              From requirement to delivery
            </h2>
          </div>
        </RevealOnScroll>

        <div className="grid gap-6 lg:grid-cols-2">
          {steps.map((step, idx) => (
            <RevealOnScroll key={step.number} delay={idx * 60} className="h-full">
              <div className="group relative flex h-full items-start gap-5 overflow-hidden rounded-2xl border border-border p-7 transition-all duration-300 hover:-translate-y-1 hover:border-primary/30 hover:shadow-xl hover:shadow-primary/5 lg:p-8">
                <div className="pointer-events-none absolute -left-8 -bottom-8 size-28 rounded-full bg-primary/5 blur-2xl transition-opacity duration-300 group-hover:bg-primary/10" />
                <div className="relative flex size-12 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-lg font-bold text-primary transition-transform duration-300 group-hover:scale-110">
                  {step.number}
                </div>
                <div className="relative flex flex-col gap-2">
                  <h3 className="text-lg font-semibold tracking-tight">{step.title}</h3>
                  <p className="text-base text-muted-foreground leading-relaxed">{step.desc}</p>
                </div>
              </div>
            </RevealOnScroll>
          ))}
        </div>
      </div>
    </section>
  )
}
