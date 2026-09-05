import { useState } from "react"
import { Toaster } from "@/components/ui/toast"
import { useToast } from "@/hooks/use-toast"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { HugeiconsIcon } from "@hugeicons/react"
import {
  Mail01Icon,
  Loading03Icon,
  CheckmarkCircle02Icon,
  ArrowLeft01Icon,
} from "@hugeicons/core-free-icons"

export default function ForgotPasswordPage() {
  return (
    <Toaster>
      <ForgotPasswordForm />
    </Toaster>
  )
}

function ForgotPasswordForm() {
  const { success, error } = useToast()
  const [email, setEmail] = useState("")
  const [loading, setLoading] = useState(false)
  const [done, setDone] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      error("Invalid email", "Please enter a valid email address.")
      return
    }

    setLoading(true)
    try {
      const res = await fetch("/api/forgot-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-CSRF-TOKEN": (document.querySelector('meta[name="csrf-token"]') as HTMLMetaElement)?.content || "",
        },
        body: JSON.stringify({ email }),
      })
      const data = await res.json()
      if (res.ok) {
        setDone(true)
        success("Check your email", data.message || "A password reset link has been sent.")
      } else {
        error("Failed", data.message || "Could not send reset email.")
      }
    } catch {
      error("Connection error", "Could not connect to the server.")
    }
    setLoading(false)
  }

  const inputClass =
    "h-14 pl-12 pr-4 text-lg rounded-xl bg-background/50 backdrop-blur-sm transition-all hover:border-primary/30 focus-visible:border-primary focus-visible:ring-primary/20 placeholder:text-muted-foreground/70"

  if (done) {
    return (
      <div className="flex min-h-svh items-center justify-center bg-background p-6">
        <div className="w-full max-w-sm text-center">
          <div className="mx-auto mb-6 flex size-16 items-center justify-center rounded-full bg-green-500/10">
            <HugeiconsIcon icon={CheckmarkCircle02Icon} strokeWidth={2} className="size-8 text-green-600" />
          </div>
          <h1 className="mb-2 text-2xl font-bold tracking-tight">Check Your Email</h1>
          <p className="mb-6 text-muted-foreground">
            If an account exists for <span className="font-medium text-foreground">{email}</span>, a password reset link has been sent. The link expires in 48 hours.
          </p>
          <a href="/login">
            <Button variant="outline" className="w-full">Back to Login</Button>
          </a>
        </div>
      </div>
    )
  }

  return (
    <div className="grid min-h-svh lg:grid-cols-2">
      <div className="flex flex-col items-center justify-center gap-6 bg-background p-6 md:p-10">
        <div className="w-full max-w-sm">
          <a href="/login" className="mb-6 flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground">
            <HugeiconsIcon icon={ArrowLeft01Icon} strokeWidth={2} className="size-4" />
            Back to login
          </a>

          <div className="mb-8 flex flex-col items-center gap-3 text-center">
            <img src="/assets/images/Hesserin Logo-01.png" alt="Husserin" className="size-14" />
            <div className="flex flex-col gap-1">
              <h1 className="text-2xl font-bold tracking-tight">Forgot Password?</h1>
              <p className="text-lg text-muted-foreground">
                Enter your email and we'll send you a link to reset your password.
              </p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="flex flex-col gap-5">
            <div className="relative group">
              <HugeiconsIcon
                icon={Mail01Icon}
                strokeWidth={2}
                className="absolute left-4 top-1/2 size-6 -translate-y-1/2 text-muted-foreground transition-colors group-focus-within:text-primary"
              />
              <Input
                type="email"
                placeholder="Enter your email address"
                className={inputClass}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                autoFocus
              />
            </div>

            <Button
              type="submit"
              size="lg"
              className="mt-1 h-12 w-full text-lg font-semibold shadow-sm transition-all duration-300 hover:shadow-lg hover:shadow-primary/25 active:scale-[0.98] disabled:pointer-events-none disabled:opacity-70"
              disabled={loading || !email}
            >
              {loading ? (
                <span className="flex items-center gap-2">
                  <HugeiconsIcon icon={Loading03Icon} strokeWidth={2} className="size-5 animate-spin" />
                  Sending reset link...
                </span>
              ) : (
                "Send Reset Link"
              )}
            </Button>
          </form>
        </div>
      </div>

      <div className="relative hidden overflow-hidden lg:block">
        <img
          src="/assets/images/serious-expert-expressing-support-colleague.jpg"
          alt=""
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/20 to-transparent" />
        <div className="relative flex h-full flex-col justify-end p-12">
          <div className="mb-6">
            <p className="text-sm font-semibold uppercase tracking-widest text-white/80">
              Husserin Investment Company Limited
            </p>
          </div>
          <blockquote className="max-w-md">
            <p className="text-2xl font-medium leading-snug tracking-tight text-white">
              General Trading · Tender Supply · Procurement · Cargo Consolidation
            </p>
          </blockquote>
        </div>
      </div>
    </div>
  )
}
