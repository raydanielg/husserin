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
  GlobalSearchIcon,
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

const data = {
  teams: [
    {
      name: "Husserin Investment",
      logo: (
        <HugeiconsIcon icon={Globe02Icon} strokeWidth={2} className="size-4" />
      ),
      plan: "Admin Dashboard",
    },
  ],
  navMain: [
    {
      title: "Dashboard",
      url: "/dashboard",
      icon: (
        <HugeiconsIcon icon={ChartLineIcon} strokeWidth={2} />
      ),
      isActive: true,
      items: [
        { title: "Overview", url: "/dashboard" },
        { title: "Analytics", url: "/dashboard" },
      ],
    },
    {
      title: "Enquiries",
      url: "#",
      icon: (
        <HugeiconsIcon icon={Mail01Icon} strokeWidth={2} />
      ),
      items: [
        { title: "All Enquiries", url: "#" },
        { title: "Vendor Registrations", url: "#" },
        { title: "RFQ Submissions", url: "#" },
        { title: "Contact Messages", url: "#" },
      ],
    },
    {
      title: "Trading & Supply",
      url: "/trading",
      icon: (
        <HugeiconsIcon icon={PackageIcon} strokeWidth={2} />
      ),
      items: [
        { title: "Overview", url: "/trading" },
        { title: "Orders", url: "#" },
        { title: "Suppliers", url: "#" },
      ],
    },
    {
      title: "Tender & Procurement",
      url: "/tender",
      icon: (
        <HugeiconsIcon icon={DocumentValidationIcon} strokeWidth={2} />
      ),
      items: [
        { title: "Active Tenders", url: "/tender" },
        { title: "Procurement", url: "/tender" },
        { title: "Compliance", url: "#" },
      ],
    },
    {
      title: "Cargo Consolidation",
      url: "/consolidation",
      icon: (
        <HugeiconsIcon icon={TruckIcon} strokeWidth={2} />
      ),
      items: [
        { title: "Shipments", url: "/consolidation" },
        { title: "Consolidation Orders", url: "#" },
      ],
    },
    {
      title: "Vendors",
      url: "/vendor-registration",
      icon: (
        <HugeiconsIcon icon={UserGroupIcon} strokeWidth={2} />
      ),
      items: [
        { title: "All Vendors", url: "/vendor-registration" },
        { title: "Pending Review", url: "#" },
        { title: "Approved", url: "#" },
      ],
    },
    {
      title: "Settings",
      url: "#",
      icon: (
        <HugeiconsIcon icon={Settings05Icon} strokeWidth={2} />
      ),
      items: [
        { title: "General", url: "#" },
        { title: "Team", url: "#" },
        { title: "Billing", url: "#" },
      ],
    },
  ],
  projects: [
    {
      name: "Government & Institutions",
      url: "/industries",
      icon: (
        <HugeiconsIcon icon={BuildingIcon} strokeWidth={2} className="size-4" />
      ),
    },
    {
      name: "Construction",
      url: "/industries",
      icon: (
        <HugeiconsIcon icon={ToolsIcon} strokeWidth={2} className="size-4" />
      ),
    },
    {
      name: "Aviation",
      url: "/industries",
      icon: (
        <HugeiconsIcon icon={PlaneIcon} strokeWidth={2} className="size-4" />
      ),
    },
    {
      name: "Energy",
      url: "/industries",
      icon: (
        <HugeiconsIcon icon={BoltIcon} strokeWidth={2} className="size-4" />
      ),
    },
  ],
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <TeamSwitcher teams={data.teams} />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
        <NavProjects projects={data.projects} />
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  )
}
