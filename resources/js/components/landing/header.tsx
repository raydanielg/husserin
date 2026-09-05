"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { HugeiconsIcon } from "@hugeicons/react"
import { Menu02Icon, ArrowRight01Icon } from "@hugeicons/core-free-icons"

const navLinks = [
  { label: "About Us", href: "/about" },
  { label: "Trading & Supply", href: "/trading" },
  { label: "Tender & Procurement", href: "/tender" },
  { label: "Consolidation", href: "/consolidation" },
  { label: "Industries", href: "/industries" },
  { label: "Contact", href: "/contact" },
]

export function Header() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    window.addEventListener("scroll", onScroll)
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  return (
    <header
      className={`sticky top-0 z-50 w-full border-b transition-all duration-300 ${
        scrolled
          ? "border-border/60 bg-background/95 backdrop-blur-md"
          : "border-transparent bg-background/80 backdrop-blur-sm"
      }`}
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
        <a href="/" className="flex items-center gap-2.5 transition-opacity hover:opacity-80">
          <img
            src="/assets/images/Hesserin Logo-01.png"
            alt="Husserin"
            className="size-8"
          />
          <span className="text-base font-semibold tracking-tight text-foreground">
            Husserin Investment
          </span>
        </a>

        <nav className="hidden items-center gap-7 lg:flex">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="group relative text-sm font-medium text-muted-foreground transition-colors duration-200 hover:text-foreground"
            >
              {link.label}
              <span className="absolute -bottom-1 left-0 h-px w-0 bg-primary transition-all duration-300 group-hover:w-full" />
            </a>
          ))}
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          <a href="/rfq">
            <Button
              size="sm"
              className="transition-transform duration-300 hover:scale-105"
            >
              Request a Quote
              <HugeiconsIcon icon={ArrowRight01Icon} strokeWidth={2} className="size-3.5" />
            </Button>
          </a>
        </div>

        <div className="flex items-center gap-2 lg:hidden">
          <DropdownMenu>
            <DropdownMenuTrigger
              render={
                <Button variant="ghost" size="icon" />
              }
            >
              <HugeiconsIcon icon={Menu02Icon} strokeWidth={2} className="size-5" />
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              {navLinks.map((link) => (
                <DropdownMenuItem key={link.href} render={<a href={link.href} />}>
                  {link.label}
                </DropdownMenuItem>
              ))}
              <DropdownMenuItem render={<a href="/rfq" />}>
                Request a Quote
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  )
}
