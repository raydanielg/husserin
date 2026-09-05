"use client"

import { Header } from "@/components/landing/header"
import { Footer } from "@/components/landing/footer"
import { PageHero } from "@/components/landing/page-hero"
import { RevealOnScroll } from "@/components/reveal-on-scroll"
import { ContactForm } from "@/components/contact-form"
import { HugeiconsIcon } from "@hugeicons/react"
import { Mail01Icon, Globe02Icon, MapPinIcon } from "@hugeicons/core-free-icons"

export default function ContactPage() {
  return (
    <div className="flex min-h-svh flex-col">
      <Header />
      <main className="flex-1">
        <PageHero
          label="Contact"
          title="Get in touch"
          description="Have a question, requirement or enquiry? Send us a message and our team will respond within 1-2 business days."
        />

        <section className="bg-background py-20 lg:py-28">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid gap-12 lg:grid-cols-[1fr_1.5fr]">
              <RevealOnScroll>
                <div className="flex flex-col gap-8">
                  <div className="flex flex-col gap-4">
                    <h2 className="text-2xl font-semibold tracking-tight">
                      Contact information
                    </h2>
                    <p className="text-base text-muted-foreground">
                      Reach out through any of the channels below or use the
                      form to send us a detailed message.
                    </p>
                  </div>

                  <div className="flex flex-col gap-5">
                    <div className="flex items-start gap-3">
                      <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                        <HugeiconsIcon icon={Mail01Icon} strokeWidth={2} className="size-5 text-primary" />
                      </div>
                      <div className="flex flex-col gap-0.5">
                        <span className="text-sm font-medium text-foreground">Email</span>
                        <a href="mailto:contact@hesserininvestement.com" className="text-sm text-muted-foreground transition-colors hover:text-foreground">
                          contact@hesserininvestement.com
                        </a>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                        <HugeiconsIcon icon={Globe02Icon} strokeWidth={2} className="size-5 text-primary" />
                      </div>
                      <div className="flex flex-col gap-0.5">
                        <span className="text-sm font-medium text-foreground">Website</span>
                        <span className="text-sm text-muted-foreground">www.hesserininvestement.com</span>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                        <HugeiconsIcon icon={MapPinIcon} strokeWidth={2} className="size-5 text-primary" />
                      </div>
                      <div className="flex flex-col gap-0.5">
                        <span className="text-sm font-medium text-foreground">Location</span>
                        <span className="text-sm text-muted-foreground">Established 2022 · Global Operations</span>
                      </div>
                    </div>
                  </div>

                  <div className="rounded-xl border border-border bg-muted/20 p-6">
                    <h3 className="text-base font-semibold">Prefer to submit a requirement?</h3>
                    <p className="mt-2 text-sm text-muted-foreground">
                      If you have a specification, BOQ or product list, use our
                      RFQ form for a faster response.
                    </p>
                    <a href="/rfq" className="mt-3 inline-flex items-center gap-1.5 text-sm font-medium text-primary">
                      Submit RFQ
                      <span aria-hidden="true">→</span>
                    </a>
                  </div>
                </div>
              </RevealOnScroll>

              <RevealOnScroll delay={100}>
                <div className="rounded-xl border border-border bg-background p-6 sm:p-8">
                  <ContactForm />
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
