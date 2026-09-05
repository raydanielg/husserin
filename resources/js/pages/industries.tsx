"use client"

import { Header } from "@/components/landing/header"
import { Footer } from "@/components/landing/footer"
import { PageHero } from "@/components/landing/page-hero"
import { RevealOnScroll } from "@/components/reveal-on-scroll"
import { HugeiconsIcon } from "@hugeicons/react"
import {
  BuildingIcon,
  ToolsIcon,
  PlaneIcon,
  BoltIcon,
  CpuIcon,
  HotelIcon,
  HealthIcon,
  CarIcon,
  Plant02Icon,
  BriefcaseIcon,
} from "@hugeicons/core-free-icons"

const industries = [
  { icon: BuildingIcon, title: "Government & Institutions", desc: "Framework supply, tender response and compliant procurement for public sector entities." },
  { icon: ToolsIcon, title: "Construction", desc: "Building materials, tools, equipment and project supply for contractors and developers." },
  { icon: PlaneIcon, title: "Aviation", desc: "Ground support equipment, spare parts and specialised supplies for aviation operations." },
  { icon: BoltIcon, title: "Energy", desc: "Electrical, power and energy sector supplies including equipment and safety gear." },
  { icon: CpuIcon, title: "ICT", desc: "Information and communications technology hardware, networking and infrastructure." },
  { icon: HotelIcon, title: "Hospitality", desc: "Hotel, restaurant and hospitality supplies including FF&E and operating equipment." },
  { icon: HealthIcon, title: "Healthcare", desc: "Medical supplies, equipment and healthcare facility procurement." },
  { icon: CarIcon, title: "Automotive", desc: "Vehicles, spare parts, tyres and automotive supplies for fleets and distributors." },
  { icon: Plant02Icon, title: "Agriculture", desc: "Agricultural inputs, equipment and supplies for farming and agribusiness." },
  { icon: BriefcaseIcon, title: "Corporate & Office", desc: "Office supplies, furniture, stationery and corporate procurement for businesses." },
]

export default function IndustriesPage() {
  return (
    <div className="flex min-h-svh flex-col">
      <Header />
      <main className="flex-1">
        <PageHero
          label="Industries"
          title="Sectors we supply"
          description="We source and supply across a wide range of industries. Our procurement team understands sector-specific requirements, standards and compliance needs."
        />

        <section className="bg-background py-20 lg:py-28">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {industries.map((ind, idx) => (
                <RevealOnScroll key={ind.title} delay={idx * 60}>
                  <div className="group flex h-full flex-col gap-4 rounded-xl border border-border p-8 transition-all duration-300 hover:-translate-y-1 hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5">
                    <div className="flex size-12 items-center justify-center rounded-lg bg-primary/10 transition-transform duration-300 group-hover:scale-110">
                      <HugeiconsIcon icon={ind.icon} strokeWidth={2} className="size-6 text-primary" />
                    </div>
                    <h3 className="text-xl font-semibold">{ind.title}</h3>
                    <p className="text-sm text-muted-foreground">{ind.desc}</p>
                  </div>
                </RevealOnScroll>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-muted/30 py-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <RevealOnScroll>
              <div className="flex flex-col items-center gap-6 rounded-xl border border-border bg-background p-10 text-center">
                <h3 className="text-2xl font-semibold tracking-tight">
                  Don&apos;t see your industry?
                </h3>
                <p className="max-w-xl text-lg text-muted-foreground">
                  We source across many more categories. Send us your
                  requirement and we will find the right suppliers.
                </p>
                <a href="/rfq" className="inline-flex items-center gap-2 rounded-full border border-primary/40 bg-primary/10 px-6 py-3 text-sm font-medium text-foreground transition-all duration-300 hover:bg-primary/20 hover:border-primary/60">
                  Submit RFQ
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
