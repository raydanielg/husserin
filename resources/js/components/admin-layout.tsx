import { useState, useEffect, useRef } from "react"
import { AppSidebar } from "@/components/app-sidebar"
import { Toaster } from "@/components/ui/toast"
import ChangePasswordDrawer from "@/pages/admin/change-password-drawer"
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
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuLabel,
  DropdownMenuGroup,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Outlet, useLocation, useNavigate, Link } from "react-router-dom"
import { HugeiconsIcon } from "@hugeicons/react"
import {
  Sun02Icon,
  Moon02Icon,
  Search01Icon,
  UserCircleIcon,
  Settings05Icon,
  Logout01Icon,
  DashboardSpeed01Icon,
  LockKeyholeIcon,
} from "@hugeicons/core-free-icons"
import { useTheme } from "@/components/theme-provider"

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
  const navigate = useNavigate()
  const { theme, toggleTheme } = useTheme()
  const currentLabel = routeLabels[location.pathname] || "Dashboard"
  const parentLabel = getParentLabel(location.pathname)

  const [user, setUser] = useState<{ name: string; email: string; role: string } | null>(null)
  const [searchQuery, setSearchQuery] = useState("")
  const [searchOpen, setSearchOpen] = useState(false)
  const [passwordOpen, setPasswordOpen] = useState(false)
  const searchRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    fetch("/api/me")
      .then((r) => r.json())
      .then((d) => { if (d?.user) setUser(d.user) })
      .catch(() => {})
  }, [])

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(e.target as Node)) {
        setSearchOpen(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      navigate(`/admin/enquiries?search=${encodeURIComponent(searchQuery.trim())}`)
      setSearchOpen(false)
      setSearchQuery("")
    }
  }

  const handleLogout = async () => {
    try {
      await fetch("/api/logout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-CSRF-TOKEN": (document.querySelector('meta[name="csrf-token"]') as HTMLMetaElement)?.content || "",
        },
      })
    } catch {}
    window.location.href = "/login"
  }

  const initials = user?.name
    ? user.name.split(" ").map((n) => n[0]).slice(0, 2).join("").toUpperCase()
    : "AD"

  return (
    <Toaster>
      <SidebarProvider>
        <AppSidebar userRole={user?.role} />
        <SidebarInset>
          <header className="flex h-16 shrink-0 items-center gap-2 border-b border-border bg-background transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12">
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

            <div className="ml-auto flex items-center gap-2 px-4">
              {/* Search */}
              <div ref={searchRef} className="relative">
                {searchOpen ? (
                  <form onSubmit={handleSearch} className="flex items-center">
                    <div className="relative">
                      <HugeiconsIcon icon={Search01Icon} strokeWidth={2} className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
                      <input
                        type="text"
                        autoFocus
                        placeholder="Search enquiries..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="h-9 w-48 rounded-lg border border-input bg-background pl-9 pr-3 text-sm placeholder:text-muted-foreground focus-visible:border-primary focus-visible:ring-primary/20 sm:w-64"
                      />
                    </div>
                  </form>
                ) : (
                  <button
                    onClick={() => setSearchOpen(true)}
                    className="flex size-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                    aria-label="Search"
                  >
                    <HugeiconsIcon icon={Search01Icon} strokeWidth={2} className="size-5" />
                  </button>
                )}
              </div>

              {/* Theme Toggle */}
              <button
                onClick={toggleTheme}
                className="flex size-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                aria-label="Toggle theme"
              >
                <HugeiconsIcon icon={theme === "dark" ? Sun02Icon : Moon02Icon} strokeWidth={2} className="size-5" />
              </button>

              {/* Profile Dropdown */}
              <DropdownMenu>
                <DropdownMenuTrigger className="flex items-center gap-2 rounded-lg p-1 transition-colors hover:bg-muted focus-visible:outline-none">
                  <Avatar size="sm">
                    <AvatarFallback className="bg-primary/10 text-xs font-semibold text-primary">
                      {initials}
                    </AvatarFallback>
                  </Avatar>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" sideOffset={8}>
                  <DropdownMenuGroup>
                    <DropdownMenuLabel>
                      <div className="flex flex-col gap-0.5">
                        <span className="text-sm font-medium">{user?.name ?? "Admin"}</span>
                        <span className="text-xs text-muted-foreground">{user?.email ?? "admin@husserin.com"}</span>
                        <span className="mt-1 inline-flex w-fit items-center rounded-full border border-primary/20 bg-primary/10 px-2 py-0.5 text-xs font-medium text-primary">
                          {user?.role?.replace(/_/g, " ") ?? "SUPER ADMIN"}
                        </span>
                      </div>
                    </DropdownMenuLabel>
                  </DropdownMenuGroup>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={() => navigate("/admin")}>
                    <HugeiconsIcon icon={DashboardSpeed01Icon} strokeWidth={2} className="size-4" />
                    Dashboard
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => navigate("/admin/settings")}>
                    <HugeiconsIcon icon={Settings05Icon} strokeWidth={2} className="size-4" />
                    Settings
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setPasswordOpen(true)}>
                    <HugeiconsIcon icon={LockKeyholeIcon} strokeWidth={2} className="size-4" />
                    Change Password
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleLogout} className="text-red-600 focus:text-red-600">
                    <HugeiconsIcon icon={Logout01Icon} strokeWidth={2} className="size-4" />
                    Logout
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </header>
          <Outlet />
        </SidebarInset>
      </SidebarProvider>
      <ChangePasswordDrawer open={passwordOpen} onOpenChange={setPasswordOpen} />
    </Toaster>
  )
}
