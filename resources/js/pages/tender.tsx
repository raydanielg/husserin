"use client"

import { Header } from "@/components/landing/header"
import { Footer } from "@/components/landing/footer"
import { PageHero } from "@/components/landing/page-hero"
import { RevealOnScroll } from "@/components/reveal-on-scroll"
import { Button } from "@/components/ui/button"
import { HugeiconsIcon } from "@hugeicons/react"
import {
  DocumentValidationIcon,
  GlobalSearchIcon,
  ClipboardCheckIcon,
  Certificate01Icon,
  ArrowRight01Icon,
} from "@hugeicons/core-free-icons"

const capabilities = [
  {
    icon: DocumentValidationIcon,
    title: "Tender Response",
    desc: "We respond to RFQs, tenders, framework supply requirements and project-based procurement with full compliance documentation.",
  },
  {
    icon: GlobalSearchIcon,
    title: "Vendor Sourcing",
    desc: "We identify and qualify manufacturers, distributors and authorised suppliers that meet tender specifications.",
  },
  {
    icon: ClipboardCheckIcon,
    title: "Specification Compliance",
    desc: "We ensure all quoted items match the required specifications, standards and quality documents.",
  },
  {
    icon: Certificate01Icon,
    title: "Documentation Support",
    desc: "We provide COO, COC, material certificates, datasheets and all required compliance documents.",
  },
]

export default function TenderPage() {
  return (
    <div className="flex min-h-svh flex-col">
      <Header />
      <main className="flex-1">
        <PageHero
          label="Tender & Procurement"
          title="Tender supply and procurement services"
          description="We respond to tenders, RFQs and framework supply requirements. Our procurement team sources compliant products, prepares commercial offers and manages order execution."
        />

        <section className="bg-background py-20 lg:py-28">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <RevealOnScroll>
              <div className="mb-16 max-w-2xl">
                <h2 className="text-3xl font-semibold tracking-tight text-balance sm:text-4xl">
                  Procurement capabilities
                </h2>
                <p className="mt-6 text-lg text-muted-foreground">
                  From tender response to order execution, we manage the full
                  procurement cycle with compliance and traceability.
                </p>
              </div>
            </RevealOnScroll>

            <div className="grid gap-6 sm:grid-cols-2">
              {capabilities.map((cap, idx) => (
                <RevealOnScroll key={cap.title} delay={idx * 80}>
                  <div className="group flex h-full flex-col gap-4 rounded-xl border border-border p-8 transition-all duration-300 hover:-translate-y-1 hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5">
                    <div className="flex size-12 items-center justify-center rounded-lg bg-primary/10 transition-transform duration-300 group-hover:scale-110">
                      <HugeiconsIcon icon={cap.icon} strokeWidth={2} className="size-6 text-primary" />
                    </div>
                    <h3 className="text-xl font-semibold">{cap.title}</h3>
                    <p className="text-base text-muted-foreground">{cap.desc}</p>
                  </div>
                </RevealOnScroll>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-muted/30 py-20 lg:py-28">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <RevealOnScroll>
              <div className="mb-16 max-w-2xl">
                <h2 className="text-3xl font-semibold tracking-tight text-balance sm:text-4xl">
                  Procurement process
                </h2>
              </div>
            </RevealOnScroll>

            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-5">
              {[
                { num: "01", title: "Requirement", desc: "Receive tender, RFQ, BOQ or specification." },
                { num: "02", title: "Sourcing", desc: "Identify compliant suppliers and manufacturers." },
                { num: "03", title: "Commercial Offer", desc: "Prepare formal quotation aligned to scope." },
                { num: "04", title: "Procurement", desc: "Purchase, coordinate and follow up orders." },
                { num: "05", title: "Delivery", desc: "Freight, documentation and destination coordination." },
              ].map((step, idx) => (
                <RevealOnScroll key={step.num} delay={idx * 80}>
                  <div className="group flex flex-col gap-3">
                    <span className="text-2xl font-bold text-primary transition-transform duration-300 group-hover:scale-110">
                      {step.num}
                    </span>
                    <h3 className="text-base font-semibold">{step.title}</h3>
                    <p className="text-sm text-muted-foreground">{step.desc}</p>
                  </div>
                </RevealOnScroll>
              ))}
            </div>

            <RevealOnScroll>
              <div className="mt-12 flex flex-col items-center gap-6 rounded-xl border border-border bg-background p-10 text-center">
                <h3 className="text-2xl font-semibold tracking-tight">
                  Have a tender or RFQ?
                </h3>
                <p className="max-w-xl text-lg text-muted-foreground">
                  Send us your tender documents, BOQ or specification. We will
                  review and respond with a compliant commercial offer.
                </p>
                <a href="/rfq">
                  <Button size="lg" className="h-12 px-8 text-base font-semibold transition-all duration-300 hover:scale-[1.02] hover:shadow-lg">
                    Submit Tender Enquiry
                    <HugeiconsIcon icon={ArrowRight01Icon} strokeWidth={2} className="size-4" />
                  </Button>
                </a>
              </div>
            </RevealOnScroll>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
