"use client"

const items = [
  "General Trading",
  "Tender & Contract Supply",
  "Global Procurement",
  "Cargo Consolidation",
  "Vendor Management",
  "Global Sourcing",
  "Specification Compliance",
  "Freight Coordination",
]

export function TrustStrip() {
  return (
    <section className="overflow-hidden border-b border-border/40 bg-background py-5">
      <div className="marquee-mask">
        <div className="flex w-max animate-marquee items-center gap-8">
          {[...items, ...items].map((item, idx) => (
            <div key={idx} className="flex items-center gap-8">
              <span className="whitespace-nowrap text-sm font-medium text-muted-foreground">
                {item}
              </span>
              <span className="size-1.5 rounded-full bg-primary/40" />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
