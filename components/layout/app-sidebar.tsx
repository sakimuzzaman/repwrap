"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { BarChart2, ClipboardList, Users, Calendar, BookOpenCheck, CirclePlus, UsersRound, Workflow, Plus, UserPlus, FilePlus, LayoutDashboard, ClipboardPlus } from 'lucide-react'
import { cn } from "@/lib/utils"
import { useSelector } from "react-redux";
import Cookies from 'js-cookie';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

import { ChevronDown } from 'lucide-react';
import { ChevronUp } from 'lucide-react';

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
      // {
      //   label: "Conversation",
      //   icon: "chats.png",
      //   href: "/conversation",
      //   color: "text-sky-500",
      // },
      {
        label: "Dashboard admin",
        icon:  "dashboard.png",
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
        icon: "profileIcon.png",
        href: "/profile",
        tooltip: "profile",
        color: "text-sky-500",
      },
      {
        label: "Task",
        icon: "/task.png",
        href: "/task",
        color: "text-sky-500",
      },

      {
        label: "Daily Reports",
        icon: "reporting.png",
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
        label: "Leaves",
        icon: "leaves.png",
        href: "/leaves",
        color: "text-pink-500",

        submenu: [
          {
            label: "Leave Management",
            icon: "leaves.png",
            href: "/leaves",
            color: "text-pink-500",
          },
          {
            label: "Leave Type",
            icon: "leaves.png",
            href: "/leave-type",
            color: "text-pink-500",
    
          },
        ]
      },

      

      {
        label: "Team",
        icon: "teams.png",
        href: "/team",
        color: "text-orange-500",
      },

      {
        label: "Projects",
        icon: "projects.png",
        href: "/projects",
        tooltip: "Projects",
        color: "text-orange-500",
        submenu: [
          {
            label: "Projects",
            icon: "projects.png",
            href: "/projects",
            tooltip: "Projects",
            color: "text-orange-500",
          },
          {
            label: "Project Create",
            icon: "projects.png",
            href: "/project-create",
            tooltip: "project",
            color: "text-orange-500",
          },
          {
            label: "Project Invite",
            icon: "projects.png",
            href: "/project-invite",
            // tooltip: "Projects",
            color: "text-orange-500",
          },
        ]
      },

      
      
      {
        label: "Workspace Create",
        icon: "/workspace.png",
        href: "/workspace-create",
        tooltip: "Workspace",
        color: "text-orange-500",
      },
    ]
  } else {
    routes = [
      {
        label: "Dashboard",
        icon:  "dashboard.png",
        href: "/",
        color: "text-sky-500",
      },
      // {
      //   label: "Conversation",
      //   icon: "chats.png",
      //   href: "/conversation",
      //   color: "text-sky-500",
      // },
      // {
      //   label: "Blank Dashboard",
      //   icon: BarChart2,
      //   href: "/employee-blankdashboard",
      //   color: "text-sky-500",
      // },


      {
        label: "Leave Management",
        icon: "leaves.png",
        href: "/employee-leavemanagement",
        color: "text-sky-500",
      },

      {
        label: "Task",
        icon: "/task.png",
        href: "/task",
        tooltip: "Dashboard",
        color: "text-sky-500",
      },



      {
        label: "Daily Reports",
        icon: "reporting.png",
        href: "/reports",
        color: "text-violet-500",
      },
      {
        label: "Daily Reports Create",
        icon: "reporting.png",
        href: "/reports/new",
        color: "text-violet-500",
      },


      {
        label: "Leave Application",
        icon: "leaves.png",
        href: "/employee-leaveapplication",
        color: "text-pink-500",
      },

      {
        label: "Employee Team",
        icon: "teams.png",
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
            <SidebarMenuButton asChild size="lg" className="hover:bg-transparent">
              <Link href={`${user?.role === 'admin' ? 'dashboard' : '/'}`} className="flex items-center ">
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
          {routes.map((route) => {
                // If the route has a submenu, check if it's Projects to render a dropdown
                if (route.submenu && route.label === "Projects" || route.submenu && route.label === "Leaves") {
                  return (
                    <SidebarMenuItem key={route.label} className="text-white">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <div className="flex items-center p-2 hover:bg-blue-700 rounded-md cursor-pointer w-full">
                            <Image src={`/sidebarIcons/${route.icon}`} alt={route.label} height={24} width={24} />
                            <span className="group-data-[collapsible=icon]:hidden ml-5">{route.label}</span>
                            
                            <div className="ml-28">
                             {/* <ChevronUp />  */}
                            <ChevronDown />
                            </div>
                          </div>

                        </DropdownMenuTrigger>
                        <DropdownMenuContent className="bg-blue-700 text-white !w-64">
                          {route.submenu.map((subitem) => (
                            <DropdownMenuItem key={subitem.href}>
                              <Link href={subitem.href}>
                                <div className="flex items-center w-full">
                                  <Image src={`/sidebarIcons/${subitem.icon}`} className="bg-blue-700" alt={subitem.label} height={24} width={24} />
                                  <span className="ml-2">{subitem.label}</span>
                                </div>
                              </Link>
                            </DropdownMenuItem>
                          ))}
                           
                        </DropdownMenuContent>
                        
                      </DropdownMenu>
                      
                    </SidebarMenuItem>
                  );
                }
          // Render a normal menu item if no submenu exists
          return (
           <SidebarMenuItem key={route.href}>
              <SidebarMenuButton
                asChild
                isActive={pathname === route.href}
                tooltip={route.tooltip}
                className={`text-white hover:text-white hover:bg-blue-700 rounded-md 
                ${pathname === route.href ? "!bg-blue-700 !text-white" : ""}`}
              >
                <Link href={route.href}>
                   <Image src={`/sidebarIcons/${route.icon}`} alt={route.label} height={24} width={24} />
                  <span className="group-data-[collapsible=icon]:hidden ml-2">{route.label}</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          );
        })}
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

