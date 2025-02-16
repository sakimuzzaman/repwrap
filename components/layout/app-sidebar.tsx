"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { BarChart2, ClipboardList, Users, Calendar, BookOpenCheck, CirclePlus, UsersRound, Workflow, Plus, UserPlus, FilePlus, LayoutDashboard, ClipboardPlus } from 'lucide-react'
import { cn } from "@/lib/utils"
import { useSelector } from "react-redux";
import Cookies from 'js-cookie';

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
import { useEffect, useState } from "react"
import Image from "next/image"

// routes = [
//   {
//     label: "Dashboard",
//     icon: BarChart2,
//     href: "/dashboard",
//     color: "text-sky-500",
//   },
//   {
//     label: "Employee WorkReport",
//     icon: BarChart2,
//     href: "/employee-workreport",
//     color: "text-sky-500",
//   },
//   {
//     label: "Demo Task",
//     icon: BarChart2,
//     href: "/demo-task",
//     color: "text-sky-500",
//   },
//   {
//     label: "Dashboard 2",
//     icon: BarChart2,
//     href: "/",
//     tooltip: "Dashboard",
//     color: "text-sky-500",
//   },
//   {
//     label: "Task",
//     icon: BarChart2,
//     href: "/task",
//     tooltip: "Dashboard",
//     color: "text-sky-500",
//   },
//   {
//     label: "EmployeeDashboard",
//     icon: BarChart2,
//     href: "/employee-dashboard",
//     color: "text-sky-500",
//   },
//   {
//     label: "Employee LeaveManagement",
//     icon: BarChart2,
//     href: "/employee-leavemanagement",
//     color: "text-sky-500",
//   },
//   {
//     label: "EmployeeBlankDashboard",
//     icon: BarChart2,
//     href: "/employee-blankdashboard",
//     color: "text-sky-500",
//   },

//   {
//     label: "Daily Reports",
//     icon: ClipboardList,
//     href: "/reports",
//     color: "text-violet-500",
//   },
//   {
//     label: "Daily Reports Create",
//     icon: ClipboardList,
//     href: "/reports/new",
//     color: "text-violet-500",
//   },
//   {
//     label: "Leave Management",
//     icon: Calendar,
//     href: "/leaves",
//     color: "text-pink-500",
//   },
//   {
//     label: "Leave Type",
//     icon: Calendar,
//     href: "/leave-type",
//     color: "text-pink-500",
//   },
//   {
//     label: "Employee Leave Application",
//     icon: Calendar,
//     href: "/employee-leaveapplication",
//     color: "text-pink-500",
//   },
//   {
//     label: "Team",
//     icon: Users,
//     href: "/team",
//     color: "text-orange-500",
//   },
//   {
//     label: "Employee Team",
//     icon: Users,
//     href: "/employee-team",
//     color: "text-orange-500",
//   },
//   {
//     label: "Projects",
//     icon: ClipboardList,
//     href: "/projects",
//     tooltip: "Projects",
//     color: "text-orange-500",
//   },
//   {
//     label: "Workspace Create",
//     icon: ClipboardList,
//     href: "/workspace-create",
//     tooltip: "Workspace",
//     color: "text-orange-500",
//   },
//   {
//     label: "Project Create",
//     icon: ClipboardList,
//     href: "/project-create",
//     tooltip: "project",
//     color: "text-orange-500",
//   },
//   {
//     label: "Project Invite",
//     icon: ClipboardList,
//     href: "/project-invite",
//     tooltip: "Projects",
//     color: "text-orange-500",
//   },
// ]

export function AppSidebar() {
  const pathname = usePathname()
  const [user, setUser] = useState<any>(null)
  // const user = useSelector((state: { user: { user: any } }) => state.user.user);

  useEffect(() => {
    setUser(Cookies.get('user') ? JSON.parse(Cookies.get('user') as string) : null);
  }, [])

  let routes = [];

  if (user?.role === 'admin') {
    routes = [
      {
        label: "Conversation",
        icon: BarChart2,
        href: "/conversation",
        color: "text-sky-500",
      },
      {
        label: "Dashboard admin",
        icon: BarChart2,
        href: "/dashboard",
        color: "text-sky-500",
      },
      // {
      //   label: "Dashboard 2",
      //   icon: BarChart2,
      //   href: "/",
      //   tooltip: "Dashboard",
      //   color: "text-sky-500",
      // },
      {
        label: "Profile Page",
        icon: BarChart2,
        href: "/profile",
        tooltip: "profile",
        color: "text-sky-500",
      },
      {
        label: "Task",
        icon: BookOpenCheck,
        href: "/task",
        color: "text-sky-500",
      },

      {
        label: "Daily Reports",
        icon: ClipboardList,
        href: "/reports",
        color: "text-violet-500",
      },


      // {
      //   label: "Daily Reports Create",
      //   icon: CirclePlus,
      //   href: "/reports/new",
      //   color: "text-violet-500",
      // },


      {
        label: "Leave Management",
        icon: Calendar,
        href: "/leaves",
        color: "text-pink-500",
      },
      {
        label: "Leave Type",
        icon: Calendar,
        href: "/leave-type",
        color: "text-pink-500",

      },

      {
        label: "Team",
        icon: UsersRound,
        href: "/team",
        color: "text-orange-500",
      },

      {
        label: "Projects",
        icon: Workflow,
        href: "/projects",
        tooltip: "Projects",
        color: "text-orange-500",
      },

      {
        label: "Project Create",
        icon: Plus,
        href: "/project-create",
        tooltip: "project",
        color: "text-orange-500",
      },
      {
        label: "Project Invite",
        icon: UserPlus,
        href: "/project-invite",
        tooltip: "Projects",
        color: "text-orange-500",
      },
      {
        label: "Workspace Create",
        icon: FilePlus,
        href: "/workspace-create",
        tooltip: "Workspace",
        color: "text-orange-500",
      },
    ]
  } else {
    routes = [
      {
        label: "Dashboard",
        icon: LayoutDashboard,
        href: "/",
        color: "text-sky-500",
      },
      {
        label: "Conversation",
        icon: BarChart2,
        href: "/conversation",
        color: "text-sky-500",
      },
      // {
      //   label: "Blank Dashboard",
      //   icon: BarChart2,
      //   href: "/employee-blankdashboard",
      //   color: "text-sky-500",
      // },


      {
        label: "Leave Management",
        icon: BarChart2,
        href: "/employee-leavemanagement",
        color: "text-sky-500",
      },

      {
        label: "Task",
        icon: BookOpenCheck,
        href: "/task",
        tooltip: "Dashboard",
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
        label: "Leave Application",
        icon: Calendar,
        href: "/employee-leaveapplication",
        color: "text-pink-500",
      },

      {
        label: "Employee Team",
        icon: Users,
        href: "/employee-team",
        color: "text-orange-500",
      },




      // {
      //   label: "Project Create",
      //   icon: Plus,
      //   href: "/project-create",
      //   tooltip: "project",
      //   color: "text-orange-500",
      // },
      // {
      //   label: "Project Invite",
      //   icon: UserPlus,
      //   href: "/project-invite",
      //   tooltip: "Projects",
      //   color: "text-orange-500",
      // },
      // {
      //   label: "Leave Type",
      //   icon: Calendar,
      //   href: "/leave-type",
      //   color: "text-pink-500",
      // },


    ]
  }

  return (
    <Sidebar collapsible="icon">
      <SidebarHeader className="border-b">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild size="lg">
              <Link href={`${user?.role === 'admin' ? 'dashboard' : '/'}`} className="flex items-center hover:bg-gray-900">
                <span className="font-semibold text-xl group-data-[collapsible=icon]:hidden">
                  <Image src="/repwrap_logo.png" alt="" height={35} width={150} />
                </span>
                <span className="hidden text-white group-data-[collapsible=icon]:block font-semibold text-xl">R</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      <SidebarContent className="flex flex-col h-full">
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {routes.map((route) => (
                <SidebarMenuItem key={route.href}>
                  <SidebarMenuButton
                    asChild
                    isActive={pathname === route.href}
                    tooltip={route.tooltip}
                    className="text-white hover:text-white hover:bg-blue-700 rounded-md"
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

        {/* Meet Logo at the bottom */}
        <div className="mt-auto p-4 flex justify-center">
          <a href="https://meet.google.com/" target="_blank" rel="noopener noreferrer">
            <img src="/meet.png" className="w-16 h-16" alt="Meet Logo" />
          </a>
        </div>
      </SidebarContent>

      <SidebarRail />
    </Sidebar>

  )
}

