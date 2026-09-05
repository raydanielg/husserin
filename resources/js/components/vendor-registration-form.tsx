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
  Globe02Icon,
  MapPinIcon,
  Tag01Icon,
  Certificate01Icon,
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

export function VendorRegistrationForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const [loading, setLoading] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [enquiryId, setEnquiryId] = useState("")
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [form, setForm] = useState({
    companyName: "",
    country: "",
    contactPerson: "",
    email: "",
    phone: "",
    website: "",
    category: "",
    brands: "",
    certifications: "",
    address: "",
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
      companyName: form.companyName,
      country: form.country,
      contactPerson: form.contactPerson,
      email: form.email,
      phone: form.phone,
      category: form.category,
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
      const res = await fetch("/api/vendor-registration", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-CSRF-TOKEN": (document.querySelector('meta[name="csrf-token"]') as HTMLMetaElement)?.content || "",
        },
        body: JSON.stringify({
          company_name: form.companyName,
          country: form.country,
          contact_person: form.contactPerson,
          email: form.email,
          phone: form.phone,
          website: form.website || null,
          address: form.address || null,
          category: form.category,
          brands: form.brands || null,
          certifications: form.certifications || null,
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
            companyName: "",
            country: "",
            contactPerson: "",
            email: "",
            phone: "",
            website: "",
            category: "",
            brands: "",
            certifications: "",
            address: "",
            message: "",
            agreed: false,
          })
        }}
        enquiryId={enquiryId}
        title="Registration submitted"
        message="Thank you for registering as a vendor. Our procurement team will review your application and contact you within 2-3 business days."
      />
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight">
          Vendor Registration
        </h1>
        <p className="text-lg text-muted-foreground">
          Register your company as an approved supplier. Our procurement team
          reviews all applications before onboarding.
        </p>
      </div>

      <form onSubmit={handleSubmit}>
        <FieldGroup>
          {/* Company Information */}
          <div className="flex flex-col gap-4">
            <h2 className="text-lg font-semibold text-muted-foreground">
              Company Information
            </h2>

            <Field>
              <FieldLabel htmlFor="company-name" className="text-base font-medium">
                Company name
              </FieldLabel>
              <div className="relative group">
                <HugeiconsIcon
                  icon={Building02Icon}
                  strokeWidth={2}
                  className="absolute left-3.5 top-1/2 size-5 -translate-y-1/2 text-muted-foreground transition-colors group-focus-within:text-primary"
                />
                <Input
                  id="company-name"
                  placeholder="Enter your company name"
                  className={cn(inputClass, fieldErrorClass(errors.companyName))}
                  value={form.companyName}
                  onChange={(e) => set("companyName", e.target.value)}
                  required
                />
              </div>
              {errors.companyName && (
                <FieldDescription className="text-red-500">
                  {errors.companyName}
                </FieldDescription>
              )}
            </Field>

            <div className="grid gap-4 sm:grid-cols-2">
              <Field>
                <FieldLabel htmlFor="country" className="text-base font-medium">
                  Country
                </FieldLabel>
                <div className="relative group">
                  <HugeiconsIcon
                    icon={MapPinIcon}
                    strokeWidth={2}
                    className="absolute left-3.5 top-1/2 size-5 -translate-y-1/2 text-muted-foreground transition-colors group-focus-within:text-primary"
                  />
                  <Input
                    id="country"
                    placeholder="e.g. United Arab Emirates"
                    className={cn(inputClass, fieldErrorClass(errors.country))}
                    value={form.country}
                    onChange={(e) => set("country", e.target.value)}
                    required
                  />
                </div>
                {errors.country && (
                  <FieldDescription className="text-red-500">
                    {errors.country}
                  </FieldDescription>
                )}
              </Field>

              <Field>
                <FieldLabel htmlFor="website" className="text-base font-medium">
                  Website <span className="text-muted-foreground/60">(optional)</span>
                </FieldLabel>
                <div className="relative group">
                  <HugeiconsIcon
                    icon={Globe02Icon}
                    strokeWidth={2}
                    className="absolute left-3.5 top-1/2 size-5 -translate-y-1/2 text-muted-foreground transition-colors group-focus-within:text-primary"
                  />
                  <Input
                    id="website"
                    type="url"
                    placeholder="www.company.com"
                    className={inputClass}
                    value={form.website}
                    onChange={(e) => set("website", e.target.value)}
                  />
                </div>
              </Field>
            </div>

            <Field>
              <FieldLabel htmlFor="address" className="text-base font-medium">
                Business address <span className="text-muted-foreground/60">(optional)</span>
              </FieldLabel>
              <Textarea
                id="address"
                placeholder="Enter your full business address"
                className="rounded-xl bg-background/50 text-base placeholder:text-muted-foreground/70"
                value={form.address}
                onChange={(e) => set("address", e.target.value)}
                rows={2}
              />
            </Field>
          </div>

          {/* Contact Person */}
          <div className="flex flex-col gap-4 pt-4">
            <h2 className="text-lg font-semibold text-muted-foreground">
              Contact Person
            </h2>

            <div className="grid gap-4 sm:grid-cols-2">
              <Field>
                <FieldLabel htmlFor="contact-person" className="text-base font-medium">
                  Contact person
                </FieldLabel>
                <div className="relative group">
                  <HugeiconsIcon
                    icon={UserIcon}
                    strokeWidth={2}
                    className="absolute left-3.5 top-1/2 size-5 -translate-y-1/2 text-muted-foreground transition-colors group-focus-within:text-primary"
                  />
                  <Input
                    id="contact-person"
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
                <FieldLabel htmlFor="phone" className="text-base font-medium">
                  Phone
                </FieldLabel>
                <div className="relative group">
                  <HugeiconsIcon
                    icon={PhoneCallIcon}
                    strokeWidth={2}
                    className="absolute left-3.5 top-1/2 size-5 -translate-y-1/2 text-muted-foreground transition-colors group-focus-within:text-primary"
                  />
                  <Input
                    id="phone"
                    type="tel"
                    placeholder="+971 50 123 4567"
                    className={cn(inputClass, fieldErrorClass(errors.phone))}
                    value={form.phone}
                    onChange={(e) => set("phone", e.target.value)}
                    required
                  />
                </div>
                {errors.phone && (
                  <FieldDescription className="text-red-500">
                    {errors.phone}
                  </FieldDescription>
                )}
              </Field>
            </div>

            <Field>
              <FieldLabel htmlFor="email" className="text-base font-medium">
                Email address
              </FieldLabel>
              <div className="relative group">
                <HugeiconsIcon
                  icon={Mail01Icon}
                  strokeWidth={2}
                  className="absolute left-3.5 top-1/2 size-5 -translate-y-1/2 text-muted-foreground transition-colors group-focus-within:text-primary"
                />
                <Input
                  id="email"
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

          {/* Supply Categories */}
          <div className="flex flex-col gap-4 pt-4">
            <h2 className="text-lg font-semibold text-muted-foreground">
              Supply Information
            </h2>

            <Field>
              <FieldLabel htmlFor="category" className="text-base font-medium">
                Primary product / service category
              </FieldLabel>
              <Select
                value={form.category}
                onValueChange={(val) => set("category", val ?? "")}
              >
                <SelectTrigger
                  className={cn(
                    "h-12 w-full rounded-xl bg-background/50 text-base",
                    fieldErrorClass(errors.category)
                  )}
                >
                  <SelectValue placeholder="Select your primary category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((cat) => (
                    <SelectItem key={cat} value={cat}>
                      {cat}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors.category && (
                <FieldDescription className="text-red-500">
                  {errors.category}
                </FieldDescription>
              )}
            </Field>

            <Field>
              <FieldLabel htmlFor="brands" className="text-base font-medium">
                Brands / products you supply <span className="text-muted-foreground/60">(optional)</span>
              </FieldLabel>
              <div className="relative group">
                <HugeiconsIcon
                  icon={Tag01Icon}
                  strokeWidth={2}
                  className="absolute left-3.5 top-3.5 size-5 text-muted-foreground transition-colors group-focus-within:text-primary"
                />
                <Textarea
                  id="brands"
                  placeholder="List key brands or product families you supply"
                  className="pl-11 rounded-xl bg-background/50 text-base placeholder:text-muted-foreground/70"
                  value={form.brands}
                  onChange={(e) => set("brands", e.target.value)}
                  rows={3}
                />
              </div>
            </Field>

            <Field>
              <FieldLabel htmlFor="certifications" className="text-base font-medium">
                Certifications <span className="text-muted-foreground/60">(optional)</span>
              </FieldLabel>
              <div className="relative group">
                <HugeiconsIcon
                  icon={Certificate01Icon}
                  strokeWidth={2}
                  className="absolute left-3.5 top-3.5 size-5 text-muted-foreground transition-colors group-focus-within:text-primary"
                />
                <Textarea
                  id="certifications"
                  placeholder="ISO, quality certifications, industry approvals, etc."
                  className="pl-11 rounded-xl bg-background/50 text-base placeholder:text-muted-foreground/70"
                  value={form.certifications}
                  onChange={(e) => set("certifications", e.target.value)}
                  rows={2}
                />
              </div>
            </Field>

            <Field>
              <FieldLabel htmlFor="message" className="text-base font-medium">
                Additional information <span className="text-muted-foreground/60">(optional)</span>
              </FieldLabel>
              <Textarea
                id="message"
                placeholder="Tell us about your capabilities, capacity, or any other relevant details"
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
              id="vendor-terms"
              className="mt-0.5"
              checked={form.agreed}
              onCheckedChange={(val) => set("agreed", !!val)}
            />
            <FieldLabel
              htmlFor="vendor-terms"
              className="flex flex-wrap items-center gap-x-1 text-base font-normal leading-relaxed text-muted-foreground"
            >
              <span>I confirm that the information provided is accurate and I agree to the</span>
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
              "Register as Vendor"
            )}
          </Button>
        </FieldGroup>
      </form>
    </div>
  )
}
