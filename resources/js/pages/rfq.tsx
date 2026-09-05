import { RfqForm } from "@/components/rfq-form"
import { Header } from "@/components/landing/header"
import { Footer } from "@/components/landing/footer"
import { RevealOnScroll } from "@/components/reveal-on-scroll"

export default function RfqPage() {
  return (
    <div className="flex min-h-svh flex-col">
      <Header />
      <main className="flex-1">
        <section className="bg-muted/30 py-16 lg:py-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <RevealOnScroll>
              <div className="mx-auto max-w-2xl text-center">
                <span className="text-xs font-medium uppercase tracking-[0.2em] text-primary">
                  Request for Quotation
                </span>
                <h1 className="mt-6 text-4xl font-semibold tracking-tight text-balance sm:text-5xl">
                  Submit your requirement
                </h1>
                <p className="mt-6 text-lg text-muted-foreground text-pretty">
                  Can&apos;t find the item? Send us your specification, BOQ or
                  product list. Our procurement team will source and quote
                  against your requirement.
                </p>
              </div>
            </RevealOnScroll>
          </div>
        </section>

        <section className="bg-background py-16 lg:py-20">
          <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
            <RfqForm />
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
