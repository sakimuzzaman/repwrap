"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { BarChart2, ClipboardList, Users, Calendar } from 'lucide-react'
import { cn } from "@/lib/utils"
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar"

const routes = [
  {
    label: "Dashboard",
    icon: BarChart2,
    href: "/dashboard",
    color: "text-sky-500",
  },
  {
    label: "Employee WorkReport",
    icon: BarChart2,
    href: "/employee-workreport",
    color: "text-sky-500",
  },
  {
    label: "Dashboard 2",
    icon: BarChart2,
    href: "/",
    tooltip: "Dashboard",
    color: "text-sky-500",
  },
  {
    label: "EmployeeDashboard",
    icon: BarChart2,
    href: "/employee-dashboard",
    color: "text-sky-500",
  },
  {
    label: "Employee LeaveManagement",
    icon: BarChart2,
    href: "/employee-leavemanagement",
    color: "text-sky-500",
  },
  {
    label: "EmployeeBlankDashboard",
    icon: BarChart2,
    href: "/employee-blankdashboard",
    color: "text-sky-500",
  },
  
  {
    label: "Daily Reports",
    icon: ClipboardList,
    href: "/reports",
    color: "text-violet-500",
  },
  {
    label: "Daily Reports Create",
    icon: ClipboardList,
    href: "/reports/new",
    color: "text-violet-500",
  },
  {
    label: "Leave Management",
    icon: Calendar,
    href: "/leaves",
    color: "text-pink-500",
  },
  {
    label: "Employee Leave Application",
    icon: Calendar,
    href: "/employee-leaveapplication",
    color: "text-pink-500",
  },
  {
    label: "Team",
    icon: Users,
    href: "/team",
    color: "text-orange-500",
  },
  {
    label: "Employee Team",
    icon: Users,
    href: "/employee-team",
    color: "text-orange-500",
  },
  {
    label: "Projects",
    icon: ClipboardList,
    href: "/projects",
    tooltip: "Projects",
    color: "text-orange-500",
  },
  {
    label: "Workspace Create",
    icon: ClipboardList,
    href: "/workspace-create",
    tooltip: "Workspace",
    color: "text-orange-500",
  },
  {
    label: "Project Create",
    icon: ClipboardList,
    href: "/project-create",
    tooltip: "project",
    color: "text-orange-500",
  },
  {
    label: "Project Invite",
    icon: ClipboardList,
    href: "/project-invite",
    tooltip: "Projects",
    color: "text-orange-500",
  },
]

// const routes = [

//   {
//     label: "Leaves",
//     icon: Calendar,
//     href: "/leaves",
//     tooltip: "Leaves"
//   },
//   {
//     label: "Projects",
//     icon: ClipboardList,
//     href: "/projects",
//     tooltip: "Projects"
//   },
//   {
//     label: "Teams",
//     icon: Users,
//     href: "/team",
//     tooltip: "Teams"
//   },
// ]

export function AppSidebar() {
  const pathname = usePathname()

  return (
    <Sidebar collapsible="icon">
      <SidebarHeader className="border-b">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild size="lg">
              <Link href="/" className="flex items-center">
                <span className="font-semibold text-xl group-data-[collapsible=icon]:hidden">Repwrap</span>
                <span className="hidden group-data-[collapsible=icon]:block font-semibold text-xl">R</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {routes.map((route) => (
                <SidebarMenuItem key={route.href}>
                  <SidebarMenuButton
                    asChild
                    isActive={pathname === route.href}
                    tooltip={route.tooltip}
                  >
                    <Link href={route.href}>
                      <route.icon className={cn("mr-2 h-4 w-4", route.color)} />
                      <span className="group-data-[collapsible=icon]:hidden">{route.label}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  )
}

