"use client"

import { useState } from "react"
import { cn } from "cn"

import { Button } from "@/components/ui/button"
import { SuccessModal } from "@/components/success-modal"
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { HugeiconsIcon } from "@hugeicons/react"
import {
  UserIcon,
  Mail01Icon,
  PhoneCallIcon,
  Building02Icon,
  CheckmarkCircle01Icon,
} from "@hugeicons/core-free-icons"

function fieldErrorClass(error?: string) {
  return error ? "border-red-500 focus-visible:ring-red-500/30" : ""
}

export function ContactForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const [loading, setLoading] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [enquiryId, setEnquiryId] = useState("")
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    subject: "",
    message: "",
  })

  const set = (key: string, value: string) => {
    setForm((p) => ({ ...p, [key]: value }))
    if (errors[key]) setErrors((p) => ({ ...p, [key]: "" }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setErrors({})

    const required: Record<string, string> = {
      name: form.name,
      email: form.email,
      subject: form.subject,
      message: form.message,
    }

    const newErrors: Record<string, string> = {}
    for (const [key, val] of Object.entries(required)) {
      if (!val) newErrors[key] = "This field is required"
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      return
    }

    setLoading(true)
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-CSRF-TOKEN": (document.querySelector('meta[name="csrf-token"]') as HTMLMetaElement)?.content || "",
        },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          phone: form.phone || null,
          company: form.company || null,
          subject: form.subject,
          message: form.message,
        }),
      })

      const data = await res.json()

      if (!res.ok) {
        if (data.errors) {
          const fieldErrors: Record<string, string> = {}
          for (const [key, msgs] of Object.entries(data.errors)) {
            fieldErrors[key] = Array.isArray(msgs) ? msgs[0] : String(msgs)
          }
          setErrors(fieldErrors)
        } else {
          setErrors({ general: data.message || "Something went wrong" })
        }
        setLoading(false)
        return
      }

      setEnquiryId(data.enquiry_id || "")
      setSubmitted(true)
    } catch {
      setErrors({ general: "Network error. Please try again." })
    }
    setLoading(false)
  }

  const inputClass =
    "h-12 pl-11 pr-4 text-base rounded-xl bg-background/50 backdrop-blur-sm transition-all hover:border-primary/30 focus-visible:border-primary focus-visible:ring-primary/20 placeholder:text-muted-foreground/70 placeholder:font-normal"

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <SuccessModal
        open={submitted}
        onClose={() => {
          setSubmitted(false)
          setForm({ name: "", email: "", phone: "", company: "", subject: "", message: "" })
        }}
        enquiryId={enquiryId}
        title="Message sent"
        message="Thank you for reaching out. We will get back to you within 1-2 business days."
      />
      {errors.general && (
        <div className="rounded-lg border border-red-500/30 bg-red-500/5 px-4 py-3 text-base text-red-500">
          {errors.general}
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <FieldGroup>
          <div className="grid gap-4 sm:grid-cols-2">
            <Field>
              <FieldLabel htmlFor="contact-name" className="text-base font-medium">
                Full name
              </FieldLabel>
              <div className="relative group">
                <HugeiconsIcon
                  icon={UserIcon}
                  strokeWidth={2}
                  className="absolute left-3.5 top-1/2 size-5 -translate-y-1/2 text-muted-foreground transition-colors group-focus-within:text-primary"
                />
                <Input
                  id="contact-name"
                  placeholder="Enter your full name"
                  className={cn(inputClass, fieldErrorClass(errors.name))}
                  value={form.name}
                  onChange={(e) => set("name", e.target.value)}
                  required
                />
              </div>
              {errors.name && (
                <FieldDescription className="text-red-500">
                  {errors.name}
                </FieldDescription>
              )}
            </Field>

            <Field>
              <FieldLabel htmlFor="contact-email" className="text-base font-medium">
                Email address
              </FieldLabel>
              <div className="relative group">
                <HugeiconsIcon
                  icon={Mail01Icon}
                  strokeWidth={2}
                  className="absolute left-3.5 top-1/2 size-5 -translate-y-1/2 text-muted-foreground transition-colors group-focus-within:text-primary"
                />
                <Input
                  id="contact-email"
                  type="email"
                  placeholder="you@example.com"
                  className={cn(inputClass, fieldErrorClass(errors.email))}
                  value={form.email}
                  onChange={(e) => set("email", e.target.value)}
                  required
                />
              </div>
              {errors.email && (
                <FieldDescription className="text-red-500">
                  {errors.email}
                </FieldDescription>
              )}
            </Field>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <Field>
              <FieldLabel htmlFor="contact-phone" className="text-base font-medium">
                Phone <span className="text-muted-foreground/60">(optional)</span>
              </FieldLabel>
              <div className="relative group">
                <HugeiconsIcon
                  icon={PhoneCallIcon}
                  strokeWidth={2}
                  className="absolute left-3.5 top-1/2 size-5 -translate-y-1/2 text-muted-foreground transition-colors group-focus-within:text-primary"
                />
                <Input
                  id="contact-phone"
                  type="tel"
                  placeholder="+971 50 123 4567"
                  className={inputClass}
                  value={form.phone}
                  onChange={(e) => set("phone", e.target.value)}
                />
              </div>
            </Field>

            <Field>
              <FieldLabel htmlFor="contact-company" className="text-base font-medium">
                Company <span className="text-muted-foreground/60">(optional)</span>
              </FieldLabel>
              <div className="relative group">
                <HugeiconsIcon
                  icon={Building02Icon}
                  strokeWidth={2}
                  className="absolute left-3.5 top-1/2 size-5 -translate-y-1/2 text-muted-foreground transition-colors group-focus-within:text-primary"
                />
                <Input
                  id="contact-company"
                  placeholder="Company name"
                  className={inputClass}
                  value={form.company}
                  onChange={(e) => set("company", e.target.value)}
                />
              </div>
            </Field>
          </div>

          <Field>
            <FieldLabel htmlFor="contact-subject" className="text-base font-medium">
              Subject
            </FieldLabel>
            <Input
              id="contact-subject"
              placeholder="What is this about?"
              className={cn(
                "h-12 px-4 text-base rounded-xl bg-background/50 backdrop-blur-sm transition-all hover:border-primary/30 focus-visible:border-primary focus-visible:ring-primary/20 placeholder:text-muted-foreground/70",
                fieldErrorClass(errors.subject)
              )}
              value={form.subject}
              onChange={(e) => set("subject", e.target.value)}
              required
            />
            {errors.subject && (
              <FieldDescription className="text-red-500">
                {errors.subject}
              </FieldDescription>
            )}
          </Field>

          <Field>
            <FieldLabel htmlFor="contact-message" className="text-base font-medium">
              Message
            </FieldLabel>
            <Textarea
              id="contact-message"
              placeholder="Tell us how we can help"
              className={cn(
                "rounded-xl bg-background/50 text-base placeholder:text-muted-foreground/70",
                fieldErrorClass(errors.message)
              )}
              value={form.message}
              onChange={(e) => set("message", e.target.value)}
              rows={5}
              required
            />
            {errors.message && (
              <FieldDescription className="text-red-500">
                {errors.message}
              </FieldDescription>
            )}
          </Field>

          <Button
            type="submit"
            size="lg"
            className="mt-2 h-12 w-full text-base font-semibold shadow-sm transition-all duration-300 hover:shadow-lg hover:shadow-primary/25 active:scale-[0.98] disabled:pointer-events-none disabled:opacity-70"
            disabled={loading}
          >
            {loading ? (
              <span className="animate-pulse">Sending...</span>
            ) : (
              "Send Message"
            )}
          </Button>
        </FieldGroup>
      </form>
    </div>
  )
}
