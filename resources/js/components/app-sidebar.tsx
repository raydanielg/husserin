"use client"

import * as React from "react"

import { NavMain } from "@/components/nav-main"
import { NavProjects } from "@/components/nav-projects"
import { TeamSwitcher } from "@/components/team-switcher"
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar"
import { HugeiconsIcon } from "@hugeicons/react"
import {
  Globe02Icon,
  PackageIcon,
  DocumentValidationIcon,
  UserGroupIcon,
  Mail01Icon,
  ChartLineIcon,
  TruckIcon,
  Settings05Icon,
  BuildingIcon,
  ToolsIcon,
  PlaneIcon,
  BoltIcon,
} from "@hugeicons/core-free-icons"

const allNavMain: any[] = [
    {
      title: "Dashboard",
      url: "/admin",
      icon: (
        <HugeiconsIcon icon={ChartLineIcon} strokeWidth={2} />
      ),
      isActive: true,
      roles: ["SUPER_ADMIN", "STAFF"],
      items: [
        { title: "Overview", url: "/admin" },
        { title: "Analytics", url: "/admin/analytics" },
      ],
    },
    {
      title: "Enquiries",
      url: "/admin/enquiries",
      icon: (
        <HugeiconsIcon icon={Mail01Icon} strokeWidth={2} />
      ),
      roles: ["SUPER_ADMIN", "STAFF"],
      items: [
        { title: "All Enquiries", url: "/admin/enquiries" },
        { title: "Vendor Registrations", url: "/admin/enquiries/vendors" },
        { title: "RFQ Submissions", url: "/admin/enquiries/rfqs" },
        { title: "Contact Messages", url: "/admin/enquiries/contacts" },
      ],
    },
    {
      title: "Trading & Supply",
      url: "/admin/trading",
      icon: (
        <HugeiconsIcon icon={PackageIcon} strokeWidth={2} />
      ),
      roles: ["SUPER_ADMIN", "STAFF"],
      items: [
        { title: "Overview", url: "/admin/trading" },
        { title: "Orders", url: "/admin/trading/orders" },
        { title: "Suppliers", url: "/admin/trading/suppliers" },
      ],
    },
    {
      title: "Tender & Procurement",
      url: "/admin/tenders",
      icon: (
        <HugeiconsIcon icon={DocumentValidationIcon} strokeWidth={2} />
      ),
      roles: ["SUPER_ADMIN", "STAFF"],
      items: [
        { title: "Active Tenders", url: "/admin/tenders" },
        { title: "Procurement", url: "/admin/tenders/procurement" },
        { title: "Compliance", url: "/admin/tenders/compliance" },
      ],
    },
    {
      title: "Cargo Consolidation",
      url: "/admin/consolidation",
      icon: (
        <HugeiconsIcon icon={TruckIcon} strokeWidth={2} />
      ),
      roles: ["SUPER_ADMIN", "STAFF"],
      items: [
        { title: "Shipments", url: "/admin/consolidation" },
        { title: "Consolidation Orders", url: "/admin/consolidation/orders" },
      ],
    },
    {
      title: "Vendors",
      url: "/admin/vendors",
      icon: (
        <HugeiconsIcon icon={UserGroupIcon} strokeWidth={2} />
      ),
      roles: ["SUPER_ADMIN", "STAFF"],
      items: [
        { title: "All Vendors", url: "/admin/vendors" },
        { title: "Pending Review", url: "/admin/vendors/pending" },
        { title: "Approved", url: "/admin/vendors/approved" },
      ],
    },
    {
      title: "Settings",
      url: "/admin/settings",
      icon: (
        <HugeiconsIcon icon={Settings05Icon} strokeWidth={2} />
      ),
      roles: ["SUPER_ADMIN"],
      items: [
        { title: "General", url: "/admin/settings" },
        { title: "Team", url: "/admin/settings/team" },
      ],
    },
  ]

const projects = [
    {
      name: "Government & Institutions",
      url: "/admin/industries/government",
      icon: (
        <HugeiconsIcon icon={BuildingIcon} strokeWidth={2} className="size-4" />
      ),
    },
    {
      name: "Construction",
      url: "/admin/industries/construction",
      icon: (
        <HugeiconsIcon icon={ToolsIcon} strokeWidth={2} className="size-4" />
      ),
    },
    {
      name: "Aviation",
      url: "/admin/industries/aviation",
      icon: (
        <HugeiconsIcon icon={PlaneIcon} strokeWidth={2} className="size-4" />
      ),
    },
    {
      name: "Energy",
      url: "/admin/industries/energy",
      icon: (
        <HugeiconsIcon icon={BoltIcon} strokeWidth={2} className="size-4" />
      ),
    },
  ]

const teams = [
  {
    name: "Husserin Investment",
    logo: (
      <HugeiconsIcon icon={Globe02Icon} strokeWidth={2} className="size-4" />
    ),
    plan: "Admin Dashboard",
  },
]

interface AppSidebarProps extends React.ComponentProps<typeof Sidebar> {
  userRole?: string
}

export function AppSidebar({ userRole, ...props }: AppSidebarProps) {
  const role = userRole || "STAFF"
  const filteredNavMain = allNavMain.filter(
    (item) => item.roles.includes(role)
  )

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <TeamSwitcher teams={teams} />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={filteredNavMain} />
        <NavProjects projects={projects} />
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  )
}
