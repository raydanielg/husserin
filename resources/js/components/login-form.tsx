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
import { HugeiconsIcon } from "@hugeicons/react"
import {
  Mail01Icon,
  LockKeyholeIcon,
  EyeIcon,
  EyeOffIcon,
  Loading03Icon,
  ArrowRight01Icon,
} from "@hugeicons/core-free-icons"
import { useToast } from "@/hooks/use-toast"

function fieldErrorClass(error?: string) {
  return error ? "border-red-500 focus-visible:ring-red-500/30" : ""
}

type Step = "email" | "password"

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const { success, error, warning } = useToast()
  const [step, setStep] = useState<Step>("email")
  const [loading, setLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [remember, setRemember] = useState(true)
  const [errors, setErrors] = useState<Record<string, string>>({})

  const handleEmailSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setErrors({})
    if (!email) {
      setErrors({ email: "Email is required" })
      return
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setErrors({ email: "Please enter a valid email address" })
      return
    }
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
      setStep("password")
    }, 600)
  }

  const handlePasswordSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setErrors({})
    if (!password) {
      setErrors({ password: "Password is required" })
      return
    }
    setLoading(true)

    try {
      const res = await fetch("/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-CSRF-TOKEN": (document.querySelector('meta[name="csrf-token"]') as HTMLMetaElement)?.content || "",
        },
        body: JSON.stringify({ email, password, remember }),
      })

      const data = await res.json()

      if (res.ok && data.success) {
        success("Welcome back!", `Signed in as ${data.user.name}`)
        setTimeout(() => {
          window.location.href = data.redirect || "/admin"
        }, 800)
      } else if (res.status === 403) {
        warning("Account deactivated", data.message || "Contact the administrator.")
        setLoading(false)
      } else {
        error("Sign in failed", data.message || "Invalid email or password.")
        setLoading(false)
      }
    } catch {
      error("Connection error", "Could not connect to the server. Please try again.")
      setLoading(false)
    }
  }

  const handleBack = () => {
    setStep("email")
    setPassword("")
    setErrors({})
    setShowPassword(false)
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
            {step === "email" ? "Welcome back" : "Enter your password"}
          </h1>
          <p className="text-lg text-muted-foreground">
            {step === "email"
              ? "Sign in to your Husserin Investment account"
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

      {step === "email" ? (
        <form onSubmit={handleEmailSubmit}>
          <FieldGroup>
            <Field>
              <FieldLabel htmlFor="email" className="text-lg font-medium">
                Email address
              </FieldLabel>
              <div className="relative group">
                <HugeiconsIcon
                  icon={Mail01Icon}
                  strokeWidth={2}
                  className="absolute left-4 top-1/2 size-6 -translate-y-1/2 text-muted-foreground transition-colors group-focus-within:text-primary"
                />
                <Input
                  id="email"
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
                  autoFocus
                />
              </div>
              {errors.email && (
                <FieldDescription className="text-red-500">
                  {errors.email}
                </FieldDescription>
              )}
            </Field>

            <Button
              type="submit"
              size="lg"
              className="group/btn mt-1 h-12 w-full text-lg font-semibold shadow-sm transition-all duration-300 hover:shadow-lg hover:shadow-primary/25 active:scale-[0.98] disabled:pointer-events-none disabled:opacity-70"
              disabled={loading}
            >
              {loading ? (
                <span className="animate-pulse">Please wait...</span>
              ) : (
                "Continue"
              )}
            </Button>

          </FieldGroup>
        </form>
      ) : (
        <form onSubmit={handlePasswordSubmit}>
          <FieldGroup>
            <Field>
              <div className="flex items-center justify-between">
                <FieldLabel htmlFor="password" className="text-lg font-medium">
                  Password
                </FieldLabel>
                <a
                  href="/forgot-password"
                  className="text-base font-medium text-primary underline-offset-4 hover:underline"
                >
                  Forgot password?
                </a>
              </div>
              <div className="relative group">
                <HugeiconsIcon
                  icon={LockKeyholeIcon}
                  strokeWidth={2}
                  className="absolute left-4 top-1/2 size-6 -translate-y-1/2 text-muted-foreground transition-colors group-focus-within:text-primary"
                />
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  className={cn(inputClass, "pr-12", fieldErrorClass(errors.password))}
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value)
                    if (errors.password)
                      setErrors((p) => ({ ...p, password: "" }))
                  }}
                  required
                  autoFocus
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

            <Field orientation="horizontal" className="items-center gap-2 pt-1">
              <Checkbox id="remember" defaultChecked />
              <FieldLabel
                htmlFor="remember"
                className="text-lg font-normal text-muted-foreground"
              >
                Remember me for 30 days
              </FieldLabel>
            </Field>

            <Button
              type="submit"
              size="lg"
              className="group/btn mt-1 h-12 w-full text-lg font-semibold shadow-sm transition-all duration-300 hover:shadow-lg hover:shadow-primary/25 active:scale-[0.98] disabled:pointer-events-none disabled:opacity-70"
              disabled={loading}
            >
              {loading ? (
                <span className="animate-pulse">Signing in...</span>
              ) : (
                "Sign in"
              )}
            </Button>

            <button
              type="button"
              onClick={handleBack}
              className="text-lg text-muted-foreground underline-offset-4 hover:text-foreground hover:underline"
            >
              Use a different email
            </button>
          </FieldGroup>
        </form>
      )}
    </div>
  )
}
