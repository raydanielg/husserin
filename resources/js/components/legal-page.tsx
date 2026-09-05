"use client"

import { Header } from "@/components/landing/header"
import { Footer } from "@/components/landing/footer"
import { RevealOnScroll } from "@/components/reveal-on-scroll"

export interface LegalSection {
  heading: string
  body: React.ReactNode
}

export function LegalPage({
  label,
  title,
  description,
  sections,
  lastUpdated,
}: {
  label: string
  title: string
  description: string
  sections: LegalSection[]
  lastUpdated: string
}) {
  return (
    <div className="flex min-h-svh flex-col">
      <Header />
      <main className="flex-1">
        <section className="bg-muted/30 py-16 lg:py-20">
          <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
            <RevealOnScroll>
              <span className="text-xs font-medium uppercase tracking-[0.2em] text-primary">
                {label}
              </span>
              <h1 className="mt-6 text-4xl font-semibold tracking-tight text-balance sm:text-5xl">
                {title}
              </h1>
              <p className="mt-6 text-lg text-muted-foreground text-pretty">
                {description}
              </p>
              <p className="mt-4 text-sm text-muted-foreground/70">
                Last updated: {lastUpdated}
              </p>
            </RevealOnScroll>
          </div>
        </section>

        <section className="bg-background py-16 lg:py-20">
          <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col gap-10">
              {sections.map((section, idx) => (
                <RevealOnScroll key={idx} delay={idx * 60}>
                  <div className="flex flex-col gap-3">
                    <h2 className="text-xl font-semibold tracking-tight">
                      {section.heading}
                    </h2>
                    <div className="text-base leading-relaxed text-muted-foreground">
                      {section.body}
                    </div>
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
