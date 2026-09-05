"use client"

import { RevealOnScroll } from "@/components/reveal-on-scroll"
import { HugeiconsIcon } from "@hugeicons/react"
import {
  Mail01Icon,
  PhoneCallIcon,
  Globe02Icon,
  ArrowUpRightIcon,
} from "@hugeicons/core-free-icons"

const footerSections = [
  {
    title: "Services",
    links: [
      { label: "Trading & Supply", href: "/trading" },
      { label: "Tender & Procurement", href: "/tender" },
      { label: "Consolidation", href: "/consolidation" },
      { label: "Vendor Registration", href: "/vendor-registration" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About Us", href: "/about" },
      { label: "Industries", href: "/industries" },
      { label: "How We Work", href: "#how-we-work" },
      { label: "Contact", href: "/contact" },
    ],
  },
  {
    title: "Legal",
    links: [
      { label: "Privacy Policy", href: "/privacy" },
      { label: "Terms of Use", href: "/terms" },
    ],
  },
]

export function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-border bg-muted/20">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0 select-none overflow-hidden leading-none"
      >
        <span className="block translate-y-[18%] text-center text-[18vw] font-bold tracking-tighter text-foreground/[0.02] sm:text-[14vw] lg:text-[12vw]">
          HESSERIN
        </span>
      </div>

      <RevealOnScroll>
        <div className="relative border-b border-border/60">
          <div className="mx-auto flex max-w-7xl flex-col items-center gap-6 px-4 py-14 text-center sm:px-6 lg:flex-row lg:justify-between lg:text-left lg:px-8">
            <div className="flex flex-col gap-2">
              <h3 className="text-2xl font-semibold tracking-tight text-balance sm:text-3xl">
                Let&apos;s work together
              </h3>
              <p className="text-sm text-muted-foreground">
                Send us your specification, BOQ or product list today.
              </p>
            </div>
            <a
              href="/rfq"
              className="group inline-flex shrink-0 items-center gap-2 rounded-full border border-primary/40 bg-primary/10 px-6 py-3 text-sm font-medium text-foreground transition-all duration-300 hover:bg-primary/20 hover:border-primary/60"
            >
              Submit RFQ
              <HugeiconsIcon icon={ArrowUpRightIcon} strokeWidth={2} className="size-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>
          </div>
        </div>
      </RevealOnScroll>

      <div className="relative mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-[1.4fr_3fr]">
          <RevealOnScroll>
            <div className="flex flex-col gap-5">
              <a href="/" className="flex items-center gap-2.5 transition-opacity hover:opacity-80">
                <img
                  src="/assets/images/Hesserin Logo-01.png"
                  alt="Husserin"
                  className="size-8"
                />
                <span className="text-lg font-semibold tracking-tight text-foreground">
                  Husserin Investment
                </span>
              </a>
              <p className="max-w-xs text-sm text-muted-foreground text-pretty">
                Global Trading, Procurement and Cargo Consolidation for
                businesses, institutions and project requirements.
              </p>
              <div className="flex flex-col gap-2.5 text-sm text-muted-foreground">
                <a href="mailto:contact@hesserininvestement.com" className="flex items-center gap-2 transition-colors hover:text-foreground">
                  <HugeiconsIcon icon={Mail01Icon} strokeWidth={2} className="size-4 shrink-0 text-primary" />
                  contact@hesserininvestement.com
                </a>
                <span className="flex items-center gap-2">
                  <HugeiconsIcon icon={Globe02Icon} strokeWidth={2} className="size-4 shrink-0 text-primary" />
                  www.hesserininvestement.com
                </span>
              </div>
            </div>
          </RevealOnScroll>

          <div className="grid grid-cols-2 gap-8 sm:grid-cols-3">
            {footerSections.map((section, idx) => (
              <RevealOnScroll key={section.title} delay={idx * 80}>
                <div className="flex flex-col gap-3">
                  <h4 className="group relative text-sm font-semibold text-foreground">
                    {section.title}
                    <span className="absolute -bottom-1 left-0 h-px w-6 bg-primary/60 transition-all duration-300 group-hover:w-full" />
                  </h4>
                  <ul className="flex flex-col gap-2.5">
                    {section.links.map((link) => (
                      <li key={link.href}>
                        <a
                          href={link.href}
                          className="text-sm text-muted-foreground transition-colors duration-200 hover:text-foreground"
                        >
                          {link.label}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              </RevealOnScroll>
            ))}
          </div>
        </div>

        <div className="relative mt-12 flex flex-col items-center justify-between gap-4 border-t border-border/60 pt-8 sm:flex-row">
          <p className="text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} Husserin Investment Company Limited. All rights reserved.
          </p>
          <p className="text-sm text-muted-foreground">
            Established 2022
          </p>
        </div>
      </div>
    </footer>
  )
}
