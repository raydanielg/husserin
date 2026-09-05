"use client"

import { Header } from "@/components/landing/header"
import { Footer } from "@/components/landing/footer"
import { PageHero } from "@/components/landing/page-hero"
import { RevealOnScroll } from "@/components/reveal-on-scroll"
import { TrackingForm } from "@/components/tracking-form"
import { HugeiconsIcon } from "@hugeicons/react"
import { Search01Icon } from "@hugeicons/core-free-icons"

export default function TrackingPage() {
  return (
    <div className="flex min-h-svh flex-col">
      <Header />
      <main className="flex-1">
        <PageHero
          label="Track Enquiry"
          title="Track your submission"
          description="Enter your reference ID to check the status of your vendor registration, RFQ or contact message."
        />

        <section className="bg-background py-20 lg:py-28">
          <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
            <RevealOnScroll>
              <div className="flex flex-col gap-8">
                <div className="flex items-center gap-3 rounded-xl border border-border bg-muted/20 p-5">
                  <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                    <HugeiconsIcon icon={Search01Icon} strokeWidth={2} className="size-5 text-primary" />
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Your reference ID was provided when you submitted your form.
                    It starts with <span className="font-medium text-foreground">VND-</span>,
                    <span className="font-medium text-foreground"> RFQ-</span>, or
                    <span className="font-medium text-foreground"> MSG-</span> followed by 8 characters.
                  </p>
                </div>

                <div className="rounded-2xl border border-border bg-background p-6 sm:p-8">
                  <TrackingForm />
                </div>
              </div>
            </RevealOnScroll>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
