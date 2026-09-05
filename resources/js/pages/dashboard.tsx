import { AppSidebar } from "@/components/app-sidebar"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Separator } from "@/components/ui/separator"
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar"
import { HugeiconsIcon } from "@hugeicons/react"
import {
  Mail01Icon,
  PackageIcon,
  UserGroupIcon,
  TruckIcon,
  ArrowUp01Icon,
  ArrowDown01Icon,
} from "@hugeicons/core-free-icons"

const stats = [
  {
    label: "Total Enquiries",
    value: "248",
    change: "+12.5%",
    trend: "up" as const,
    icon: Mail01Icon,
  },
  {
    label: "Active RFQs",
    value: "36",
    change: "+8.2%",
    trend: "up" as const,
    icon: PackageIcon,
  },
  {
    label: "Registered Vendors",
    value: "1,420",
    change: "+3.1%",
    trend: "up" as const,
    icon: UserGroupIcon,
  },
  {
    label: "Consolidation Orders",
    value: "18",
    change: "-2.4%",
    trend: "down" as const,
    icon: TruckIcon,
  },
]

const recentEnquiries = [
  { id: "RFQ-AB123456", type: "RFQ", company: "Bamburi Cement Ltd", status: "Pending", date: "2025-01-15" },
  { id: "VND-CD789012", type: "Vendor", company: "SolarTech East Africa", status: "Pending", date: "2025-01-15" },
  { id: "MSG-EF345678", type: "Contact", company: "—", status: "Replied", date: "2025-01-14" },
  { id: "RFQ-GH901234", type: "RFQ", company: "Kenya Power", status: "Quoted", date: "2025-01-14" },
  { id: "VND-IJ567890", type: "Vendor", company: "Maersk Logistics", status: "Approved", date: "2025-01-13" },
  { id: "RFQ-KL123456", type: "RFQ", company: "TANESCO", status: "Pending", date: "2025-01-13" },
]

const statusColors: Record<string, string> = {
  Pending: "bg-amber-500/10 text-amber-600 border-amber-500/20",
  Quoted: "bg-blue-500/10 text-blue-600 border-blue-500/20",
  Replied: "bg-green-500/10 text-green-600 border-green-500/20",
  Approved: "bg-green-500/10 text-green-600 border-green-500/20",
}

export default function Page() {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12">
          <div className="flex items-center gap-2 px-4">
            <SidebarTrigger className="-ml-1" />
            <Separator
              orientation="vertical"
              className="mr-2 data-vertical:h-4 data-vertical:self-auto"
            />
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem className="hidden md:block">
                  <BreadcrumbLink href="/dashboard">
                    Dashboard
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator className="hidden md:block" />
                <BreadcrumbItem>
                  <BreadcrumbPage>Overview</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
        </header>

        <div className="flex flex-1 flex-col gap-6 p-4 pt-0 lg:p-6">
          <div className="flex flex-col gap-1">
            <h1 className="text-2xl font-bold tracking-tight">
              Welcome back, Admin
            </h1>
            <p className="text-sm text-muted-foreground">
              Here's what's happening across your operations today.
            </p>
          </div>

          <div className="grid auto-rows-min gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {stats.map((stat) => (
              <div
                key={stat.label}
                className="flex flex-col gap-3 rounded-xl border border-border bg-background p-5 transition-all hover:border-primary/20 hover:shadow-md"
              >
                <div className="flex items-center justify-between">
                  <div className="flex size-10 items-center justify-center rounded-lg bg-primary/10">
                    <HugeiconsIcon icon={stat.icon} strokeWidth={2} className="size-5 text-primary" />
                  </div>
                  <span
                    className={`flex items-center gap-0.5 text-xs font-medium ${
                      stat.trend === "up" ? "text-green-600" : "text-red-500"
                    }`}
                  >
                    <HugeiconsIcon
                      icon={stat.trend === "up" ? ArrowUp01Icon : ArrowDown01Icon}
                      strokeWidth={2}
                      className="size-3"
                    />
                    {stat.change}
                  </span>
                </div>
                <div className="flex flex-col gap-0.5">
                  <span className="text-2xl font-bold tracking-tight">{stat.value}</span>
                  <span className="text-xs text-muted-foreground">{stat.label}</span>
                </div>
              </div>
            ))}
          </div>

          <div className="flex flex-col gap-4 rounded-xl border border-border bg-background p-4 lg:p-6">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold">Recent Enquiries</h2>
              <a
                href="#"
                className="text-sm font-medium text-primary hover:underline"
              >
                View all
              </a>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full min-w-[640px]">
                <thead>
                  <tr className="border-b border-border">
                    <th className="pb-3 text-left text-xs font-medium uppercase tracking-wide text-muted-foreground">
                      Reference
                    </th>
                    <th className="pb-3 text-left text-xs font-medium uppercase tracking-wide text-muted-foreground">
                      Type
                    </th>
                    <th className="pb-3 text-left text-xs font-medium uppercase tracking-wide text-muted-foreground">
                      Company
                    </th>
                    <th className="pb-3 text-left text-xs font-medium uppercase tracking-wide text-muted-foreground">
                      Status
                    </th>
                    <th className="pb-3 text-left text-xs font-medium uppercase tracking-wide text-muted-foreground">
                      Date
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {recentEnquiries.map((enquiry) => (
                    <tr
                      key={enquiry.id}
                      className="border-b border-border/50 transition-colors hover:bg-muted/30"
                    >
                      <td className="py-3 text-sm font-medium text-primary">
                        {enquiry.id}
                      </td>
                      <td className="py-3 text-sm text-muted-foreground">
                        {enquiry.type}
                      </td>
                      <td className="py-3 text-sm font-medium">
                        {enquiry.company}
                      </td>
                      <td className="py-3">
                        <span
                          className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium ${
                            statusColors[enquiry.status] || "bg-muted text-muted-foreground border-border"
                          }`}
                        >
                          {enquiry.status}
                        </span>
                      </td>
                      <td className="py-3 text-sm text-muted-foreground">
                        {enquiry.date}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
