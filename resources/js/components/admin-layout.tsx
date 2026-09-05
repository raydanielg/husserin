import { AppSidebar } from "@/components/app-sidebar"
import { Toaster } from "@/components/ui/toast"
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
import { Outlet, useLocation } from "react-router-dom"

const routeLabels: Record<string, string> = {
  "/admin": "Overview",
  "/admin/analytics": "Analytics",
  "/admin/enquiries": "All Enquiries",
  "/admin/enquiries/vendors": "Vendor Registrations",
  "/admin/enquiries/rfqs": "RFQ Submissions",
  "/admin/enquiries/contacts": "Contact Messages",
  "/admin/trading": "Overview",
  "/admin/trading/orders": "Orders",
  "/admin/trading/suppliers": "Suppliers",
  "/admin/tenders": "Active Tenders",
  "/admin/tenders/procurement": "Procurement",
  "/admin/tenders/compliance": "Compliance",
  "/admin/consolidation": "Shipments",
  "/admin/consolidation/orders": "Consolidation Orders",
  "/admin/vendors": "All Vendors",
  "/admin/vendors/pending": "Pending Review",
  "/admin/vendors/approved": "Approved",
  "/admin/settings": "General",
  "/admin/settings/team": "Team",
  "/admin/industries": "All Industries",
  "/admin/industries/government": "Government & Institutions",
  "/admin/industries/construction": "Construction",
  "/admin/industries/aviation": "Aviation",
  "/admin/industries/energy": "Energy",
}

function getParentLabel(path: string): string | null {
  if (path.startsWith("/admin/enquiries")) return "Enquiries"
  if (path.startsWith("/admin/trading")) return "Trading & Supply"
  if (path.startsWith("/admin/tenders")) return "Tender & Procurement"
  if (path.startsWith("/admin/consolidation")) return "Cargo Consolidation"
  if (path.startsWith("/admin/vendors")) return "Vendors"
  if (path.startsWith("/admin/settings")) return "Settings"
  if (path.startsWith("/admin/industries")) return "Industries"
  if (path === "/admin" || path === "/admin/analytics") return "Dashboard"
  return null
}

export default function AdminLayout() {
  const location = useLocation()
  const currentLabel = routeLabels[location.pathname] || "Dashboard"
  const parentLabel = getParentLabel(location.pathname)

  return (
    <Toaster>
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
                  {parentLabel && (
                    <>
                      <BreadcrumbItem className="hidden md:block">
                        <BreadcrumbLink href="/admin">{parentLabel}</BreadcrumbLink>
                      </BreadcrumbItem>
                      <BreadcrumbSeparator className="hidden md:block" />
                    </>
                  )}
                  <BreadcrumbItem>
                    <BreadcrumbPage>{currentLabel}</BreadcrumbPage>
                  </BreadcrumbItem>
                </BreadcrumbList>
              </Breadcrumb>
            </div>
          </header>
          <Outlet />
        </SidebarInset>
      </SidebarProvider>
    </Toaster>
  )
}
