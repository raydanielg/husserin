"use client"

import { useState } from "react"
import { cn } from "cn"

import { Button } from "@/components/ui/button"
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp"
import { HugeiconsIcon } from "@hugeicons/react"
import {
  Mail01Icon,
  LockKeyholeIcon,
  EyeIcon,
  EyeOffIcon,
  UserIcon,
  CheckmarkCircle01Icon,
} from "@hugeicons/core-free-icons"

type Step = "details" | "verify"

function fieldErrorClass(error?: string) {
  return error ? "border-red-500 focus-visible:ring-red-500/30" : ""
}

export function SignupForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const [step, setStep] = useState<Step>("details")
  const [loading, setLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [agreed, setAgreed] = useState(false)
  const [otp, setOtp] = useState("")
  const [errors, setErrors] = useState<Record<string, string>>({})

  const handleDetailsSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setErrors({})
    if (!firstName) {
      setErrors({ firstName: "First name is required" })
      return
    }
    if (!lastName) {
      setErrors({ lastName: "Last name is required" })
      return
    }
    if (!email) {
      setErrors({ email: "Email is required" })
      return
    }
    if (!password) {
      setErrors({ password: "Password is required" })
      return
    }
    if (password.length < 8) {
      setErrors({ password: "Password must be at least 8 characters" })
      return
    }
    if (password !== confirmPassword) {
      setErrors({ confirmPassword: "Passwords do not match" })
      return
    }
    if (!agreed) {
      setErrors({ agreed: "You must agree to the terms" })
      return
    }
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
      setStep("verify")
    }, 1000)
  }

  const handleVerifySubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setErrors({})
    if (otp.length !== 6) {
      setErrors({ otp: "Enter the 6-digit code" })
      return
    }
    setLoading(true)
    setTimeout(() => setLoading(false), 1500)
  }

  const handleBack = () => {
    setStep("details")
    setOtp("")
    setErrors({})
  }

  const inputClass =
    "h-14 pl-12 pr-4 text-lg rounded-xl bg-background/50 backdrop-blur-sm transition-all hover:border-primary/30 focus-visible:border-primary focus-visible:ring-primary/20 placeholder:text-muted-foreground/70 placeholder:font-normal"

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <div className="flex flex-col items-center gap-3 text-center">
        <img
          src="/assets/images/Hesserin Logo-01.png"
          alt="Husserin"
          className="size-14"
        />
        <div className="flex flex-col gap-1">
          <h1 className="text-2xl font-bold tracking-tight">
            {step === "details" ? "Create your account" : "Verify your email"}
          </h1>
          <p className="text-lg text-muted-foreground">
            {step === "details"
              ? "Join Husserin Investment today"
              : (
                <span className="flex items-center justify-center gap-1.5">
                  <HugeiconsIcon icon={Mail01Icon} strokeWidth={2} className="size-5" />
                  {email}
                </span>
              )
            }
          </p>
        </div>
      </div>

      {step === "details" ? (
        <form onSubmit={handleDetailsSubmit}>
          <FieldGroup>
            <div className="grid grid-cols-2 gap-3">
              <Field>
                <FieldLabel htmlFor="first-name" className="text-lg font-medium">
                  First name
                </FieldLabel>
                <div className="relative group">
                  <HugeiconsIcon
                    icon={UserIcon}
                    strokeWidth={2}
                    className="absolute left-4 top-1/2 size-6 -translate-y-1/2 text-muted-foreground transition-colors group-focus-within:text-primary"
                  />
                  <Input
                    id="first-name"
                    type="text"
                    placeholder="John"
                    className={cn(inputClass, fieldErrorClass(errors.firstName))}
                    value={firstName}
                    onChange={(e) => {
                      setFirstName(e.target.value)
                      if (errors.firstName)
                        setErrors((p) => ({ ...p, firstName: "" }))
                    }}
                    required
                    autoFocus
                  />
                </div>
                {errors.firstName && (
                  <FieldDescription className="text-red-500">
                    {errors.firstName}
                  </FieldDescription>
                )}
              </Field>
              <Field>
                <FieldLabel htmlFor="last-name" className="text-lg font-medium">
                  Last name
                </FieldLabel>
                <div className="relative group">
                  <HugeiconsIcon
                    icon={UserIcon}
                    strokeWidth={2}
                    className="absolute left-4 top-1/2 size-6 -translate-y-1/2 text-muted-foreground transition-colors group-focus-within:text-primary"
                  />
                  <Input
                    id="last-name"
                    type="text"
                    placeholder="Doe"
                    className={cn(inputClass, fieldErrorClass(errors.lastName))}
                    value={lastName}
                    onChange={(e) => {
                      setLastName(e.target.value)
                      if (errors.lastName)
                        setErrors((p) => ({ ...p, lastName: "" }))
                    }}
                    required
                  />
                </div>
                {errors.lastName && (
                  <FieldDescription className="text-red-500">
                    {errors.lastName}
                  </FieldDescription>
                )}
              </Field>
            </div>

            <Field>
              <FieldLabel htmlFor="signup-email" className="text-lg font-medium">
                Email address
              </FieldLabel>
              <div className="relative group">
                <HugeiconsIcon
                  icon={Mail01Icon}
                  strokeWidth={2}
                  className="absolute left-4 top-1/2 size-6 -translate-y-1/2 text-muted-foreground transition-colors group-focus-within:text-primary"
                />
                <Input
                  id="signup-email"
                  type="email"
                  placeholder="Enter your email address"
                  className={cn(inputClass, fieldErrorClass(errors.email))}
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value)
                    if (errors.email)
                      setErrors((p) => ({ ...p, email: "" }))
                  }}
                  required
                />
              </div>
              {errors.email && (
                <FieldDescription className="text-red-500">
                  {errors.email}
                </FieldDescription>
              )}
            </Field>

            <Field>
              <FieldLabel htmlFor="signup-password" className="text-lg font-medium">
                Password
              </FieldLabel>
              <div className="relative group">
                <HugeiconsIcon
                  icon={LockKeyholeIcon}
                  strokeWidth={2}
                  className="absolute left-4 top-1/2 size-6 -translate-y-1/2 text-muted-foreground transition-colors group-focus-within:text-primary"
                />
                <Input
                  id="signup-password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Create a strong password"
                  className={cn(inputClass, "pr-12", fieldErrorClass(errors.password))}
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value)
                    if (errors.password)
                      setErrors((p) => ({ ...p, password: "" }))
                  }}
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground transition-colors hover:text-foreground"
                >
                  <HugeiconsIcon
                    icon={showPassword ? EyeOffIcon : EyeIcon}
                    strokeWidth={2}
                    className="size-5"
                  />
                </button>
              </div>
              {errors.password && (
                <FieldDescription className="text-red-500">
                  {errors.password}
                </FieldDescription>
              )}
            </Field>

            <Field>
              <FieldLabel htmlFor="confirm-password" className="text-lg font-medium">
                Confirm password
              </FieldLabel>
              <div className="relative group">
                <HugeiconsIcon
                  icon={LockKeyholeIcon}
                  strokeWidth={2}
                  className="absolute left-4 top-1/2 size-6 -translate-y-1/2 text-muted-foreground transition-colors group-focus-within:text-primary"
                />
                <Input
                  id="confirm-password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Re-enter your password"
                  className={cn(inputClass, "pr-12", fieldErrorClass(errors.confirmPassword))}
                  value={confirmPassword}
                  onChange={(e) => {
                    setConfirmPassword(e.target.value)
                    if (errors.confirmPassword)
                      setErrors((p) => ({ ...p, confirmPassword: "" }))
                  }}
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground transition-colors hover:text-foreground"
                >
                  <HugeiconsIcon
                    icon={showPassword ? EyeOffIcon : EyeIcon}
                    strokeWidth={2}
                    className="size-5"
                  />
                </button>
              </div>
              {errors.confirmPassword && (
                <FieldDescription className="text-red-500">
                  {errors.confirmPassword}
                </FieldDescription>
              )}
            </Field>

            <Field orientation="horizontal" className="items-start gap-2.5 pt-1">
              <Checkbox
                id="terms"
                className="mt-0.5"
                checked={agreed}
                onCheckedChange={(val) => setAgreed(!!val)}
              />
              <FieldLabel
                htmlFor="terms"
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
              className="group/btn mt-1 h-12 w-full text-lg font-semibold shadow-sm transition-all duration-300 hover:shadow-lg hover:shadow-primary/25 active:scale-[0.98] disabled:pointer-events-none disabled:opacity-70"
              disabled={loading || !agreed}
            >
              {loading ? (
                <span className="animate-pulse">Please wait...</span>
              ) : (
                "Create account"
              )}
            </Button>

            <FieldDescription className="pt-2 text-center text-lg">
              Already have an account?{" "}
              <a
                href="/login"
                className="font-semibold text-primary underline underline-offset-4"
              >
                Sign in
              </a>
            </FieldDescription>
          </FieldGroup>
        </form>
      ) : (
        <form onSubmit={handleVerifySubmit}>
          <FieldGroup>
            <div className="flex flex-col items-center gap-4 rounded-xl border border-border/60 bg-muted/40 p-6">
              <div className="flex size-12 items-center justify-center rounded-full bg-primary/10">
                <HugeiconsIcon
                  icon={Mail01Icon}
                  strokeWidth={2}
                  className="size-6 text-primary"
                />
              </div>
              <p className="text-center text-base text-muted-foreground">
                We sent a 6-digit verification code to your email. Enter it below
                to activate your account.
              </p>
            </div>

            <div className="flex flex-col items-center gap-2">
              <InputOTP
                maxLength={6}
                value={otp}
                onChange={(value) => {
                  setOtp(value)
                  if (errors.otp)
                    setErrors((p) => ({ ...p, otp: "" }))
                }}
                disabled={loading}
              >
                <InputOTPGroup>
                  {[0, 1, 2, 3, 4, 5].map((i) => (
                    <InputOTPSlot key={i} index={i} />
                  ))}
                </InputOTPGroup>
              </InputOTP>
              {errors.otp && (
                <FieldDescription className="text-red-500">
                  {errors.otp}
                </FieldDescription>
              )}
            </div>

            <Button
              type="submit"
              size="lg"
              className="group/btn mt-1 h-12 w-full text-lg font-semibold shadow-sm transition-all duration-300 hover:shadow-lg hover:shadow-primary/25 active:scale-[0.98] disabled:pointer-events-none disabled:opacity-70"
              disabled={loading}
            >
              {loading ? (
                <span className="animate-pulse">Verifying...</span>
              ) : (
                "Verify and continue"
              )}
            </Button>

            <div className="flex flex-col items-center gap-2">
              <button
                type="button"
                onClick={handleBack}
                className="text-base text-muted-foreground underline-offset-4 hover:text-foreground hover:underline"
              >
                Use a different email
              </button>
              <button
                type="button"
                className="text-base text-muted-foreground underline-offset-4 hover:text-foreground hover:underline"
              >
                Didn&apos;t receive a code? Resend
              </button>
            </div>
          </FieldGroup>
        </form>
      )}
    </div>
  )
}
