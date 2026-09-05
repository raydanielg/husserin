export default function PlaceholderPage({ title, description }: { title: string; description: string }) {
  return (
    <div className="flex flex-1 flex-col gap-6 p-4 pt-0 lg:p-6">
      <div className="flex flex-col gap-1">
        <h1 className="text-2xl font-bold tracking-tight">{title}</h1>
        <p className="text-sm text-muted-foreground">{description}</p>
      </div>
      <div className="flex flex-1 items-center justify-center rounded-xl border border-dashed border-border bg-background p-12">
        <div className="flex flex-col items-center gap-3 text-center">
          <div className="flex size-16 items-center justify-center rounded-full bg-primary/10">
            <svg className="size-8 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.852l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z" />
            </svg>
          </div>
          <h2 className="text-lg font-semibold">Coming Soon</h2>
          <p className="max-w-md text-sm text-muted-foreground">
            This module is under active development. Data will appear here once the backend integration is complete.
          </p>
        </div>
      </div>
    </div>
  )
}
