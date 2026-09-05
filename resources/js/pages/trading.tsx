"use client"

import { Header } from "@/components/landing/header"
import { Footer } from "@/components/landing/footer"
import { PageHero } from "@/components/landing/page-hero"
import { RevealOnScroll } from "@/components/reveal-on-scroll"
import { Button } from "@/components/ui/button"
import { HugeiconsIcon } from "@hugeicons/react"
import {
  Globe02Icon,
  PackageIcon,
  TruckIcon,
  ShieldCheckIcon,
  ArrowRight01Icon,
} from "@hugeicons/core-free-icons"

const features = [
  {
    icon: Globe02Icon,
    title: "Multi-Category Sourcing",
    desc: "We source across industrial, electrical, construction, ICT, safety, hospitality and more.",
  },
  {
    icon: PackageIcon,
    title: "Specification Matching",
    desc: "We match exact specifications, brands and quality standards as required by the buyer.",
  },
  {
    icon: TruckIcon,
    title: "Delivery Coordination",
    desc: "We coordinate freight, documentation and delivery to your nominated destination.",
  },
  {
    icon: ShieldCheckIcon,
    title: "Quality Assurance",
    desc: "We verify supplier credentials, certifications and compliance before order execution.",
  },
]

export default function TradingPage() {
  return (
    <div className="flex min-h-svh flex-col">
      <Header />
      <main className="flex-1">
        <PageHero
          label="Trading & Supply"
          title="General trading and supply for businesses"
          description="We source and supply goods across multiple categories for companies, institutions, contractors and project buyers. Send us your requirement and we will source, quote and deliver."
        />

        <section className="bg-background py-20 lg:py-28">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <RevealOnScroll>
              <div className="mb-16 max-w-2xl">
                <h2 className="text-3xl font-semibold tracking-tight text-balance sm:text-4xl">
                  What we trade
                </h2>
                <p className="mt-6 text-lg text-muted-foreground">
                  Our trading activity covers a wide range of product
                  categories. We work with manufacturers, distributors and
                  authorised suppliers to source what you need.
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
            <div className="grid gap-12 lg:grid-cols-2">
              <RevealOnScroll>
                <div className="flex flex-col gap-6">
                  <h2 className="text-3xl font-semibold tracking-tight text-balance">
                    How trading works
                  </h2>
                  <div className="flex flex-col gap-4">
                    {[
                      { step: "01", title: "Submit requirement", desc: "Send us your product list, specification or BOQ." },
                      { step: "02", title: "Sourcing & quotation", desc: "We identify suppliers and prepare a commercial offer." },
                      { step: "03", title: "Order execution", desc: "On approval, we procure, coordinate and follow up." },
                      { step: "04", title: "Delivery", desc: "We arrange freight and deliver to your destination." },
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
                <div className="flex h-full flex-col items-center justify-center gap-6 rounded-xl border border-border bg-background p-10 text-center">
                  <h3 className="text-2xl font-semibold tracking-tight">
                    Ready to source?
                  </h3>
                  <p className="text-lg text-muted-foreground">
                    Submit your requirement today and our procurement team will
                    source and quote against your specification.
                  </p>
                  <a href="/rfq">
                    <Button size="lg" className="h-12 px-8 text-base font-semibold transition-all duration-300 hover:scale-[1.02] hover:shadow-lg">
                      Submit RFQ
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
