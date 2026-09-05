"use client"

import { RevealOnScroll } from "@/components/reveal-on-scroll"

export function PageHero({
  label,
  title,
  description,
}: {
  label: string
  title: string
  description: string
}) {
  return (
    <section className="bg-muted/30 py-16 lg:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <RevealOnScroll>
          <div className="max-w-2xl">
            <span className="text-xs font-medium uppercase tracking-[0.2em] text-primary">
              {label}
            </span>
            <h1 className="mt-6 text-4xl font-semibold tracking-tight text-balance sm:text-5xl">
              {title}
            </h1>
            <p className="mt-6 text-lg text-muted-foreground text-pretty">
              {description}
            </p>
          </div>
        </RevealOnScroll>
      </div>
    </section>
  )
}
