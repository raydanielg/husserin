"use client"

import { Header } from "@/components/landing/header"
import { Footer } from "@/components/landing/footer"
import { Hero } from "@/components/landing/hero"
import { TrustStrip } from "@/components/landing/trust-strip"
import { Capabilities } from "@/components/landing/capabilities"
import { Industries } from "@/components/landing/industries"
import { HowWeWork } from "@/components/landing/how-we-work"
import { CTA } from "@/components/landing/cta"

export default function LandingPage() {
  return (
    <div className="flex min-h-svh flex-col">
      <Header />
      <main className="flex-1">
        <Hero />
        <TrustStrip />
        <Capabilities />
        <Industries />
        <HowWeWork />
        <CTA />
      </main>
      <Footer />
    </div>
  )
}
