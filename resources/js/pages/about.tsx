"use client"

import { Header } from "@/components/landing/header"
import { Footer } from "@/components/landing/footer"
import { PageHero } from "@/components/landing/page-hero"
import { RevealOnScroll } from "@/components/reveal-on-scroll"
import { Button } from "@/components/ui/button"
import { HugeiconsIcon } from "@hugeicons/react"
import {
  Globe02Icon,
  ShieldCheckIcon,
  TargetIcon,
  HandshakeIcon,
  ArrowRight01Icon,
} from "@hugeicons/core-free-icons"

const values = [
  {
    icon: ShieldCheckIcon,
    title: "Integrity",
    desc: "We operate with full compliance, transparency and accountability in every transaction.",
  },
  {
    icon: TargetIcon,
    title: "Precision",
    desc: "We source exactly what is specified — no substitutions without approval.",
  },
  {
    icon: HandshakeIcon,
    title: "Partnership",
    desc: "We build long-term relationships with clients and suppliers based on trust and delivery.",
  },
  {
    icon: Globe02Icon,
    title: "Global Reach",
    desc: "Our sourcing network spans manufacturers and distributors across multiple continents.",
  },
]

export default function AboutPage() {
  return (
    <div className="flex min-h-svh flex-col">
      <Header />
      <main className="flex-1">
        <PageHero
          label="About Us"
          title="A trusted trading and procurement partner"
          description="Husserin Investment Company Limited is a general trading, procurement and cargo consolidation company serving businesses, institutions and project requirements across global markets."
        />

        <section className="bg-background py-20 lg:py-28">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
              <RevealOnScroll>
                <div className="flex flex-col gap-6">
                  <h2 className="text-3xl font-semibold tracking-tight text-balance">
                    Who we are
                  </h2>
                  <p className="text-lg text-muted-foreground leading-relaxed">
                    Established in 2022, Husserin Investment Company Limited
                    operates as a general trading and procurement company. We
                    source, supply and consolidate goods for businesses,
                    institutions, contractors and project buyers across
                    multiple industries.
                  </p>
                  <p className="text-lg text-muted-foreground leading-relaxed">
                    Our core activities cover general trading, tender and
                    contract supply, procurement and global sourcing, and
                    cargo consolidation. We work as an enquiry-led commercial
                    engine — receiving specifications, BOQs and tender
                    requirements, then sourcing and delivering against them.
                  </p>
                  <p className="text-lg text-muted-foreground leading-relaxed">
                    We are not a consumer retail store or a courier service.
                    We exist to serve organisations that need a reliable
                    procurement and supply partner.
                  </p>
                  <div className="pt-2">
                    <a href="/rfq">
                      <Button size="lg" className="h-12 px-8 text-base font-semibold transition-all duration-300 hover:scale-[1.02] hover:shadow-lg">
                        Work with us
                        <HugeiconsIcon icon={ArrowRight01Icon} strokeWidth={2} className="size-4" />
                      </Button>
                    </a>
                  </div>
                </div>
              </RevealOnScroll>

              <RevealOnScroll delay={100}>
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex flex-col gap-2 rounded-xl border border-border bg-muted/20 p-8">
                    <span className="text-4xl font-bold text-primary">2022</span>
                    <span className="text-sm text-muted-foreground">Established</span>
                  </div>
                  <div className="flex flex-col gap-2 rounded-xl border border-border bg-muted/20 p-8">
                    <span className="text-4xl font-bold text-primary">4</span>
                    <span className="text-sm text-muted-foreground">Core Activities</span>
                  </div>
                  <div className="flex flex-col gap-2 rounded-xl border border-border bg-muted/20 p-8">
                    <span className="text-4xl font-bold text-primary">10+</span>
                    <span className="text-sm text-muted-foreground">Industries Served</span>
                  </div>
                  <div className="flex flex-col gap-2 rounded-xl border border-border bg-muted/20 p-8">
                    <span className="text-4xl font-bold text-primary">100%</span>
                    <span className="text-sm text-muted-foreground">Enquiry-Led</span>
                  </div>
                </div>
              </RevealOnScroll>
            </div>
          </div>
        </section>

        <section className="bg-muted/30 py-20 lg:py-28">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <RevealOnScroll>
              <div className="mb-16 max-w-2xl">
                <span className="text-xs font-medium uppercase tracking-[0.2em] text-primary">
                  Our Values
                </span>
                <h2 className="mt-6 text-3xl font-semibold tracking-tight text-balance sm:text-4xl lg:text-5xl">
                  What we stand for
                </h2>
              </div>
            </RevealOnScroll>

            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {values.map((val, idx) => (
                <RevealOnScroll key={val.title} delay={idx * 80}>
                  <div className="group flex h-full flex-col gap-4 rounded-xl border border-border bg-background p-6 transition-all duration-300 hover:-translate-y-1 hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5">
                    <div className="flex size-11 items-center justify-center rounded-lg bg-primary/10 transition-transform duration-300 group-hover:scale-110">
                      <HugeiconsIcon icon={val.icon} strokeWidth={2} className="size-5 text-primary" />
                    </div>
                    <h3 className="text-lg font-semibold">{val.title}</h3>
                    <p className="text-sm text-muted-foreground">{val.desc}</p>
                  </div>
                </RevealOnScroll>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
