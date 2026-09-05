import { SignupForm } from "@/components/signup-form"

export default function SignupPage() {
  return (
    <div className="grid min-h-svh lg:grid-cols-2">
      <div className="flex flex-col items-center justify-center gap-6 bg-background p-6 md:p-10">
        <div className="w-full max-w-sm">
          <SignupForm />
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
