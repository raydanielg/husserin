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
import { Checkbox } from "@/components/ui/checkbox"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { HugeiconsIcon } from "@hugeicons/react"
import {
  Building02Icon,
  UserIcon,
  Mail01Icon,
  PhoneCallIcon,
  MapPinIcon,
  PackageIcon,
  Calendar03Icon,
  CheckmarkCircle01Icon,
} from "@hugeicons/core-free-icons"

function fieldErrorClass(error?: string) {
  return error ? "border-red-500 focus-visible:ring-red-500/30" : ""
}

const categories = [
  "Industrial & Engineering",
  "Electrical & Power",
  "Construction Materials",
  "ICT & Electronics",
  "Office & Corporate",
  "Safety & PPE",
  "Vehicles & Spare Parts",
  "Hospitality Supplies",
  "Agriculture & Food",
  "Aviation & Ground Support",
  "Machinery & Tools",
  "Custom Sourcing",
]

const units = ["pcs", "sets", "kg", "tons", "boxes", "cartons", "pallets", "units", "lots"]

export function RfqForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const [loading, setLoading] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [enquiryId, setEnquiryId] = useState("")
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [form, setForm] = useState({
    company: "",
    contactPerson: "",
    email: "",
    phone: "",
    country: "",
    itemOrSpec: "",
    category: "",
    quantity: "",
    unit: "",
    destination: "",
    requiredDate: "",
    message: "",
    agreed: false,
  })

  const set = (key: string, value: string | boolean) => {
    setForm((p) => ({ ...p, [key]: value }))
    if (errors[key]) setErrors((p) => ({ ...p, [key]: "" }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setErrors({})

    const required: Record<string, string> = {
      company: form.company,
      contactPerson: form.contactPerson,
      email: form.email,
      itemOrSpec: form.itemOrSpec,
    }

    const newErrors: Record<string, string> = {}
    for (const [key, val] of Object.entries(required)) {
      if (!val) newErrors[key] = "This field is required"
    }
    if (!form.agreed) newErrors.agreed = "You must agree to the terms"

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      return
    }

    setLoading(true)
    try {
      const res = await fetch("/api/rfq", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-CSRF-TOKEN": (document.querySelector('meta[name="csrf-token"]') as HTMLMetaElement)?.content || "",
        },
        body: JSON.stringify({
          company: form.company,
          contact_person: form.contactPerson,
          email: form.email,
          phone: form.phone || null,
          country: form.country || null,
          item_or_spec: form.itemOrSpec,
          category: form.category || null,
          quantity: form.quantity ? parseInt(form.quantity) : null,
          unit: form.unit || null,
          destination: form.destination || null,
          required_date: form.requiredDate || null,
          message: form.message || null,
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
          setForm({
            company: "",
            contactPerson: "",
            email: "",
            phone: "",
            country: "",
            itemOrSpec: "",
            category: "",
            quantity: "",
            unit: "",
            destination: "",
            requiredDate: "",
            message: "",
            agreed: false,
          })
        }}
        enquiryId={enquiryId}
        title="RFQ submitted successfully"
        message="Our procurement team will review your requirement and respond with a quotation within 1-2 business days."
      />
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight">
          Request for Quotation
        </h1>
        <p className="text-lg text-muted-foreground">
          Send us your specification, BOQ or product list. Our procurement team
          will source and quote against your requirement.
        </p>
      </div>

      {errors.general && (
        <div className="rounded-lg border border-red-500/30 bg-red-500/5 px-4 py-3 text-base text-red-500">
          {errors.general}
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <FieldGroup>
          {/* Company Information */}
          <div className="flex flex-col gap-4">
            <h2 className="text-lg font-semibold text-muted-foreground">
              Company Information
            </h2>

            <Field>
              <FieldLabel htmlFor="rfq-company" className="text-base font-medium">
                Company name
              </FieldLabel>
              <div className="relative group">
                <HugeiconsIcon
                  icon={Building02Icon}
                  strokeWidth={2}
                  className="absolute left-3.5 top-1/2 size-5 -translate-y-1/2 text-muted-foreground transition-colors group-focus-within:text-primary"
                />
                <Input
                  id="rfq-company"
                  placeholder="Enter your company name"
                  className={cn(inputClass, fieldErrorClass(errors.company))}
                  value={form.company}
                  onChange={(e) => set("company", e.target.value)}
                  required
                />
              </div>
              {errors.company && (
                <FieldDescription className="text-red-500">
                  {errors.company}
                </FieldDescription>
              )}
            </Field>

            <div className="grid gap-4 sm:grid-cols-2">
              <Field>
                <FieldLabel htmlFor="rfq-contact" className="text-base font-medium">
                  Contact person
                </FieldLabel>
                <div className="relative group">
                  <HugeiconsIcon
                    icon={UserIcon}
                    strokeWidth={2}
                    className="absolute left-3.5 top-1/2 size-5 -translate-y-1/2 text-muted-foreground transition-colors group-focus-within:text-primary"
                  />
                  <Input
                    id="rfq-contact"
                    placeholder="Full name"
                    className={cn(inputClass, fieldErrorClass(errors.contactPerson))}
                    value={form.contactPerson}
                    onChange={(e) => set("contactPerson", e.target.value)}
                    required
                  />
                </div>
                {errors.contactPerson && (
                  <FieldDescription className="text-red-500">
                    {errors.contactPerson}
                  </FieldDescription>
                )}
              </Field>

              <Field>
                <FieldLabel htmlFor="rfq-email" className="text-base font-medium">
                  Email address
                </FieldLabel>
                <div className="relative group">
                  <HugeiconsIcon
                    icon={Mail01Icon}
                    strokeWidth={2}
                    className="absolute left-3.5 top-1/2 size-5 -translate-y-1/2 text-muted-foreground transition-colors group-focus-within:text-primary"
                  />
                  <Input
                    id="rfq-email"
                    type="email"
                    placeholder="contact@company.com"
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
                <FieldLabel htmlFor="rfq-phone" className="text-base font-medium">
                  Phone <span className="text-muted-foreground/60">(optional)</span>
                </FieldLabel>
                <div className="relative group">
                  <HugeiconsIcon
                    icon={PhoneCallIcon}
                    strokeWidth={2}
                    className="absolute left-3.5 top-1/2 size-5 -translate-y-1/2 text-muted-foreground transition-colors group-focus-within:text-primary"
                  />
                  <Input
                    id="rfq-phone"
                    type="tel"
                    placeholder="+971 50 123 4567"
                    className={inputClass}
                    value={form.phone}
                    onChange={(e) => set("phone", e.target.value)}
                  />
                </div>
              </Field>

              <Field>
                <FieldLabel htmlFor="rfq-country" className="text-base font-medium">
                  Country <span className="text-muted-foreground/60">(optional)</span>
                </FieldLabel>
                <div className="relative group">
                  <HugeiconsIcon
                    icon={MapPinIcon}
                    strokeWidth={2}
                    className="absolute left-3.5 top-1/2 size-5 -translate-y-1/2 text-muted-foreground transition-colors group-focus-within:text-primary"
                  />
                  <Input
                    id="rfq-country"
                    placeholder="e.g. United Arab Emirates"
                    className={inputClass}
                    value={form.country}
                    onChange={(e) => set("country", e.target.value)}
                  />
                </div>
              </Field>
            </div>
          </div>

          {/* Requirement Details */}
          <div className="flex flex-col gap-4 pt-4">
            <h2 className="text-lg font-semibold text-muted-foreground">
              Requirement Details
            </h2>

            <Field>
              <FieldLabel htmlFor="rfq-item" className="text-base font-medium">
                Item / specification / BOQ
              </FieldLabel>
              <Textarea
                id="rfq-item"
                placeholder="Describe the item, specification, or paste your BOQ / product list"
                className={cn(
                  "rounded-xl bg-background/50 text-base placeholder:text-muted-foreground/70",
                  fieldErrorClass(errors.itemOrSpec)
                )}
                value={form.itemOrSpec}
                onChange={(e) => set("itemOrSpec", e.target.value)}
                rows={4}
                required
              />
              {errors.itemOrSpec && (
                <FieldDescription className="text-red-500">
                  {errors.itemOrSpec}
                </FieldDescription>
              )}
            </Field>

            <div className="grid gap-4 sm:grid-cols-3">
              <Field>
                <FieldLabel htmlFor="rfq-category" className="text-base font-medium">
                  Category <span className="text-muted-foreground/60">(optional)</span>
                </FieldLabel>
                <Select
                  value={form.category}
                  onValueChange={(val) => set("category", val ?? "")}
                >
                  <SelectTrigger className="h-12 w-full rounded-xl bg-background/50 text-base">
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((cat) => (
                      <SelectItem key={cat} value={cat}>
                        {cat}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </Field>

              <Field>
                <FieldLabel htmlFor="rfq-quantity" className="text-base font-medium">
                  Quantity <span className="text-muted-foreground/60">(optional)</span>
                </FieldLabel>
                <Input
                  id="rfq-quantity"
                  type="number"
                  placeholder="e.g. 500"
                  className={inputClass}
                  value={form.quantity}
                  onChange={(e) => set("quantity", e.target.value)}
                />
              </Field>

              <Field>
                <FieldLabel htmlFor="rfq-unit" className="text-base font-medium">
                  Unit <span className="text-muted-foreground/60">(optional)</span>
                </FieldLabel>
                <Select
                  value={form.unit}
                  onValueChange={(val) => set("unit", val ?? "")}
                >
                  <SelectTrigger className="h-12 w-full rounded-xl bg-background/50 text-base">
                    <SelectValue placeholder="Select unit" />
                  </SelectTrigger>
                  <SelectContent>
                    {units.map((u) => (
                      <SelectItem key={u} value={u}>
                        {u}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </Field>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <Field>
                <FieldLabel htmlFor="rfq-destination" className="text-base font-medium">
                  Delivery destination <span className="text-muted-foreground/60">(optional)</span>
                </FieldLabel>
                <div className="relative group">
                  <HugeiconsIcon
                    icon={MapPinIcon}
                    strokeWidth={2}
                    className="absolute left-3.5 top-1/2 size-5 -translate-y-1/2 text-muted-foreground transition-colors group-focus-within:text-primary"
                  />
                  <Input
                    id="rfq-destination"
                    placeholder="e.g. Dubai, UAE"
                    className={inputClass}
                    value={form.destination}
                    onChange={(e) => set("destination", e.target.value)}
                  />
                </div>
              </Field>

              <Field>
                <FieldLabel htmlFor="rfq-date" className="text-base font-medium">
                  Required date <span className="text-muted-foreground/60">(optional)</span>
                </FieldLabel>
                <div className="relative group">
                  <HugeiconsIcon
                    icon={Calendar03Icon}
                    strokeWidth={2}
                    className="absolute left-3.5 top-1/2 size-5 -translate-y-1/2 text-muted-foreground transition-colors group-focus-within:text-primary"
                  />
                  <Input
                    id="rfq-date"
                    type="date"
                    className={inputClass}
                    value={form.requiredDate}
                    onChange={(e) => set("requiredDate", e.target.value)}
                  />
                </div>
              </Field>
            </div>

            <Field>
              <FieldLabel htmlFor="rfq-message" className="text-base font-medium">
                Additional notes <span className="text-muted-foreground/60">(optional)</span>
              </FieldLabel>
              <Textarea
                id="rfq-message"
                placeholder="Any additional requirements, preferences or context"
                className="rounded-xl bg-background/50 text-base placeholder:text-muted-foreground/70"
                value={form.message}
                onChange={(e) => set("message", e.target.value)}
                rows={3}
              />
            </Field>
          </div>

          {/* Terms */}
          <Field orientation="horizontal" className="items-start gap-2.5 pt-2">
            <Checkbox
              id="rfq-terms"
              className="mt-0.5"
              checked={form.agreed}
              onCheckedChange={(val) => set("agreed", !!val)}
            />
            <FieldLabel
              htmlFor="rfq-terms"
              className="flex flex-wrap items-center gap-x-1 text-base font-normal leading-relaxed text-muted-foreground"
            >
              <span>I agree to the</span>
              <a href="/terms" className="font-medium text-primary underline underline-offset-4">
                Terms of Service
              </a>
              <span>and</span>
              <a href="/privacy" className="font-medium text-primary underline underline-offset-4">
                Privacy Policy
              </a>
            </FieldLabel>
          </Field>
          {errors.agreed && (
            <FieldDescription className="text-red-500">
              {errors.agreed}
            </FieldDescription>
          )}

          <Button
            type="submit"
            size="lg"
            className="mt-2 h-12 w-full text-base font-semibold shadow-sm transition-all duration-300 hover:shadow-lg hover:shadow-primary/25 active:scale-[0.98] disabled:pointer-events-none disabled:opacity-70"
            disabled={loading || !form.agreed}
          >
            {loading ? (
              <span className="animate-pulse">Submitting...</span>
            ) : (
              "Submit RFQ"
            )}
          </Button>
        </FieldGroup>
      </form>
    </div>
  )
}
