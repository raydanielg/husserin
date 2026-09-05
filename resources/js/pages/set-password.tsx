import { useState, useEffect } from "react"
import { Toaster } from "@/components/ui/toast"
import { useToast } from "@/hooks/use-toast"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { HugeiconsIcon } from "@hugeicons/react"
import {
  LockKeyholeIcon,
  EyeIcon,
  EyeOffIcon,
  Loading03Icon,
  CheckmarkCircle02Icon,
  ArrowLeft01Icon,
} from "@hugeicons/core-free-icons"

export default function SetPasswordPage() {
  return (
    <Toaster>
      <SetPasswordForm />
    </Toaster>
  )
}

function SetPasswordForm() {
  const { success, error } = useToast()
  const [params, setParams] = useState<URLSearchParams | null>(null)
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirm, setShowConfirm] = useState(false)
  const [loading, setLoading] = useState(false)
  const [done, setDone] = useState(false)
  const [validLink, setValidLink] = useState(true)

  useEffect(() => {
    const p = new URLSearchParams(window.location.search)
    setParams(p)
    if (!p.get("token") || !p.get("email")) {
      setValidLink(false)
    }
  }, [])

  const token = params?.get("token") || ""
  const email = params?.get("email") || ""
  const mode = params?.get("mode") || "invite"

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (password !== confirmPassword) {
      error("Passwords don't match", "Please make sure both passwords are the same.")
      return
    }
    if (password.length < 8) {
      error("Password too short", "Password must be at least 8 characters.")
      return
    }

    setLoading(true)
    try {
      const res = await fetch("/api/set-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-CSRF-TOKEN": (document.querySelector('meta[name="csrf-token"]') as HTMLMetaElement)?.content || "",
        },
        body: JSON.stringify({ token, email, password, password_confirmation: confirmPassword }),
      })
      const data = await res.json()
      if (res.ok) {
        setDone(true)
        success("Password set!", "You can now sign in to your account.")
      } else {
        error("Failed", data.message || "Could not set password. The link may have expired.")
      }
    } catch {
      error("Connection error", "Could not connect to the server.")
    }
    setLoading(false)
  }

  const inputClass =
    "h-14 pl-12 pr-12 text-lg rounded-xl bg-background/50 backdrop-blur-sm transition-all hover:border-primary/30 focus-visible:border-primary focus-visible:ring-primary/20 placeholder:text-muted-foreground/70"

  if (!validLink) {
    return (
      <div className="flex min-h-svh items-center justify-center bg-background p-6">
        <div className="w-full max-w-sm text-center">
          <img src="/assets/images/Hesserin Logo-01.png" alt="Husserin" className="mx-auto mb-6 size-14" />
          <h1 className="mb-2 text-2xl font-bold tracking-tight">Invalid Link</h1>
          <p className="mb-6 text-muted-foreground">
            This password setup link is missing required parameters. Please check your email and click the correct link.
          </p>
          <a href="/login">
            <Button variant="outline" className="w-full">Back to Login</Button>
          </a>
        </div>
      </div>
    )
  }

  if (done) {
    return (
      <div className="flex min-h-svh items-center justify-center bg-background p-6">
        <div className="w-full max-w-sm text-center">
          <div className="mx-auto mb-6 flex size-16 items-center justify-center rounded-full bg-green-500/10">
            <HugeiconsIcon icon={CheckmarkCircle02Icon} strokeWidth={2} className="size-8 text-green-600" />
          </div>
          <h1 className="mb-2 text-2xl font-bold tracking-tight">Password Set Successfully!</h1>
          <p className="mb-6 text-muted-foreground">
            Your password has been set. You can now sign in to your Husserin Investment account.
          </p>
          <a href="/login">
            <Button size="lg" className="w-full text-lg font-semibold">Sign In Now</Button>
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
              <h1 className="text-2xl font-bold tracking-tight">
                {mode === "reset" ? "Reset Your Password" : "Set Your Password"}
              </h1>
              <p className="text-lg text-muted-foreground">
                {mode === "reset"
                  ? "Enter your new password below"
                  : "Welcome! Create a password for your account"}
              </p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="flex flex-col gap-5">
            <div className="relative group">
              <HugeiconsIcon
                icon={LockKeyholeIcon}
                strokeWidth={2}
                className="absolute left-4 top-1/2 size-6 -translate-y-1/2 text-muted-foreground transition-colors group-focus-within:text-primary"
              />
              <Input
                type={showPassword ? "text" : "password"}
                placeholder="New password (min 8 characters)"
                className={inputClass}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                minLength={8}
                autoFocus
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground transition-colors hover:text-foreground"
              >
                <HugeiconsIcon icon={showPassword ? EyeOffIcon : EyeIcon} strokeWidth={2} className="size-5" />
              </button>
            </div>

            <div className="relative group">
              <HugeiconsIcon
                icon={LockKeyholeIcon}
                strokeWidth={2}
                className="absolute left-4 top-1/2 size-6 -translate-y-1/2 text-muted-foreground transition-colors group-focus-within:text-primary"
              />
              <Input
                type={showConfirm ? "text" : "password"}
                placeholder="Confirm new password"
                className={inputClass}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                minLength={8}
              />
              <button
                type="button"
                onClick={() => setShowConfirm(!showConfirm)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground transition-colors hover:text-foreground"
              >
                <HugeiconsIcon icon={showConfirm ? EyeOffIcon : EyeIcon} strokeWidth={2} className="size-5" />
              </button>
            </div>

            {password && confirmPassword && password !== confirmPassword && (
              <p className="text-sm text-red-500">Passwords do not match</p>
            )}

            <Button
              type="submit"
              size="lg"
              className="mt-1 h-12 w-full text-lg font-semibold shadow-sm transition-all duration-300 hover:shadow-lg hover:shadow-primary/25 active:scale-[0.98] disabled:pointer-events-none disabled:opacity-70"
              disabled={loading || !password || !confirmPassword || password !== confirmPassword}
            >
              {loading ? (
                <span className="flex items-center gap-2">
                  <HugeiconsIcon icon={Loading03Icon} strokeWidth={2} className="size-5 animate-spin" />
                  Setting password...
                </span>
              ) : (
                mode === "reset" ? "Reset Password" : "Set Password"
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
