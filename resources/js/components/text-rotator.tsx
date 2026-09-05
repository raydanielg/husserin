"use client"

import { useEffect, useState } from "react"

const phrases = [
  { text: "General Trading", color: "text-primary" },
  { text: "Tender Supply", color: "text-amber-600" },
  { text: "Procurement", color: "text-primary" },
  { text: "Cargo Consolidation", color: "text-amber-600" },
  { text: "Global Sourcing", color: "text-primary" },
  { text: "Contract Supply", color: "text-amber-600" },
]

export function TextRotator() {
  const [index, setIndex] = useState(0)
  const [visible, setVisible] = useState(true)

  useEffect(() => {
    const interval = setInterval(() => {
      setVisible(false)
      setTimeout(() => {
        setIndex((prev) => (prev + 1) % phrases.length)
        setVisible(true)
      }, 400)
    }, 2800)
    return () => clearInterval(interval)
  }, [])

  const current = phrases[index] ?? phrases[0]!

  return (
    <span
      className={`inline-block transition-all duration-400 ${
        visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"
      } ${current.color}`}
    >
      {current.text}
    </span>
  )
}
