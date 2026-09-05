"use client"

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

export function Industries() {
  return (
    <section id="industries" className="bg-muted/30 py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <RevealOnScroll>
          <div className="mb-16 max-w-2xl">
            <span className="text-xs font-medium uppercase tracking-[0.2em] text-primary">
              Industries We Supply
            </span>
            <h2 className="mt-6 text-3xl font-semibold tracking-tight text-balance sm:text-4xl lg:text-5xl">
              Sectors we serve
            </h2>
          </div>
        </RevealOnScroll>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-2">
          {industries.map((ind, idx) => (
            <RevealOnScroll key={ind.title} delay={idx * 60} className="h-full">
              <a
                href="/industries"
                className="group flex h-full items-start gap-4 rounded-xl border border-border bg-background p-6 transition-all duration-300 hover:-translate-y-1 hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5"
              >
                <div className="flex size-11 shrink-0 items-center justify-center rounded-lg bg-primary/10 transition-transform duration-300 group-hover:scale-110">
                  <HugeiconsIcon icon={ind.icon} strokeWidth={2} className="size-5 text-primary" />
                </div>
                <div className="flex flex-col gap-1.5">
                  <h3 className="text-base font-semibold">{ind.title}</h3>
                  <p className="text-sm text-muted-foreground">{ind.desc}</p>
                </div>
              </a>
            </RevealOnScroll>
          ))}
        </div>
      </div>
    </section>
  )
}
