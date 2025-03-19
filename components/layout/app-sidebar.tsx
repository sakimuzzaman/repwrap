"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { BarChart2, ClipboardList, Users, Calendar, BookOpenCheck, CirclePlus, UsersRound, Workflow, Plus, UserPlus, FilePlus, LayoutDashboard, ClipboardPlus } from 'lucide-react'
import { cn } from "@/lib/utils"
import { useSelector } from "react-redux";
import Cookies from 'js-cookie';


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
import { boolean } from "yup"


export function AppSidebar() {
  const pathname = usePathname()
  const [user, setUser] = useState<any>(null)
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  // const user = useSelector((state: { user: { user: any } }) => state.user.user);
  
  const [openMenus, setOpenMenus] = useState<Record<string, boolean>>({});

  const toggleMenu = (label: string): void => {
    setOpenMenus((prev) => {
      const updatedMenus: Record<string, boolean> = { ...prev };
      updatedMenus[label] = !updatedMenus[label];
      return updatedMenus;
    });
    setActiveMenu(label);
  };


  useEffect(() => {
    setUser(Cookies.get('user') ? JSON.parse(Cookies.get('user') as string) : null);
  }, [Cookies.get('user')])

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
        className: "w-[24px] h-[25px]"
      },
      // {
      //   label: "Dashboard 2",
      //   icon: BarChart2,
      //   href: "/",
      //   tooltip: "Dashboard",
      //   color: "text-sky-500",
      // },
      // {
      //   label: "Profile Page",
      //   icon: "profileIcon.png",
      //   href: "/profile",
      //   tooltip: "profile",
      //   color: "text-sky-500",
      //   className: "w-[24px] h-[25px]"
      // },
      {
        label: "Task",
        icon: "/task.png",
        href: "/task",
        color: "text-sky-500",
        className: "w-[16px] h-[15px]"
      },

      {
        label: "Daily Reports",
        icon: "reporting.png",
        href: "/reports",
        color: "text-violet-500",
        className: "w-[24px] h-[25px]"
      },


      // {
      //   label: "Daily Reports Create",
      //   icon: CirclePlus,
      //   href: "/reports/new",
      //   color: "text-violet-500",
      // },
      {
        label: "Leaves",
        icon: "leave.png",
        href: "/leaves",
        color: "text-pink-500",


        submenu: [
          {
            label: "Leave Management",
            icon: "verticalLine.png",
            href: "/leaves",
            color: "text-pink-500",
            className: "w-[24px] h-[25px]"

          },
          {
            label: "Leave Type",
            icon: "verticalLine.png",
            href: "/leave-type",
            color: "text-pink-500",
            className: "w-[24px] h-[25px]"
    
          },
        ]
      },

      

      {
        label: "Team",
        icon: "teams.png",
        href: "/team",
        color: "text-orange-500",
        className: "w-[24px] h-[25px]"
      },

      {
        label: "Project",
        icon: "projects.png",
        href: "/projects",
        tooltip: "Projects",
        color: "text-orange-500",
        submenu: [
          {
            label: "Projects",
            icon: "verticalLine.png",
            href: "/projects",
            tooltip: "Projects",
            color: "text-orange-500",
            className: "w-[24px] h-[25px]"
          },
          {
            label: "Project Create",
            icon: "verticalLine.png",
            href: "/project-create",
            tooltip: "project",
            color: "text-orange-500",
            className: "w-[24px] h-[25px]"
          },
          {
            label: "Project Invite",
            icon: "verticalLine.png",
            href: "/project-invite",
            // tooltip: "Projects",
            color: "text-orange-500",
            className: "w-[24px] h-[25px]"
          },
        ]
      },

      
      
      {
        label: "Workspace Create",
        icon: "/workspace.png",
        href: "/workspace-create",
        tooltip: "Workspace",
        color: "text-orange-500",
        className: "w-[24px] h-[25px]"
      },
    ]
  } else {
    routes = [
      {
        label: "Dashboard",
        icon:  "dashboard.png",
        href: "/",
        color: "text-sky-500",
        className: "w-[24px] h-[25px]"
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


      // {
      //   label: "Leave Management",
      //   icon: "leaves.png",
      //   href: "/employee-leavemanagement",
      //   color: "text-sky-500",
      //   className: "w-[24px] h-[25px]"
      // },

      {
        label: "Task",
        icon: "/task.png",
        href: "/task",
        tooltip: "Dashboard",
        color: "text-sky-500",
        className: "w-[24px] h-[25px]"
      },



      {
        label: "Daily Reports",
        icon: "reporting.png",
        href: "/reports",
        color: "text-violet-500",
        className: "w-[24px] h-[25px]"
      },

      {
        label: "Daily Auto Reports",
        icon: "reporting.png",
        href: "/auto-reports",
        color: "text-violet-500",
        className: "w-[24px] h-[25px]"
      },
      {
        label: "Daily Reports Create",
        icon: "reporting.png",
        href: "/reports/new",
        color: "text-violet-500",
        className: "w-[24px] h-[25px]"
      },


      {
        label: "Leave Application",
        icon: "leaves.png",
        href: "/leave-application",
        color: "text-pink-500",
        className: "w-[24px] h-[25px]"
      },

      {
        label: "Team",
        icon: "teams.png",
        href: "/team",
        color: "text-orange-500",
        className: "w-[24px] h-[25px]"
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
        <SidebarMenu className="lg:ml-4">
          <SidebarMenuItem>
            <SidebarMenuButton asChild size="lg" className="hover:bg-transparent">
              <Link href={`${user?.role === 'admin' ? 'dashboard' : '/'}`} className="flex items-center ">
                <span className="font-semibold text-xl group-data-[collapsible=icon]:hidden">
                  <Image src="/repwrap_logo.png" alt="" height={35} width={150} />
                </span>
                <span className="hidden text-white group-data-[collapsible=icon]:block font-semibold text-xl">
                <Image
                  src="/LogoSymbol.svg"
                  alt="My Icon"
                  width={22} 
                  height={25} 
                  className=""
                 />
                </span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      <SidebarContent className="flex flex-col h-full">
      <SidebarGroup>
        <SidebarGroupContent>
          <SidebarMenu className="mx-auto space-y-2 w-48">
            {routes.map((route) => {
              const isOpen = openMenus[route.label];
              const isActive = activeMenu === route.label;
              if (route.submenu) {
                return (
                  <div key={route.label}>
                    <SidebarMenuItem className={`text-white cursor-pointer ${isActive ? "bg-blue-700 rounded-md " : ""}`}>
                      <div
                        className="flex items-center p-2 hover:bg-blue-700 rounded-md w-full"
                        onClick={() => toggleMenu(route.label)}
                      >
                        <Image
                          className={route.className}
                          src={`/sidebarIcons/${route.icon}`}
                          alt={route.label}
                          height={16}
                          width={16}
                        />
                        <span className="ml-5">{route.label}</span>
                        <div className="ml-auto">
                          {isOpen ? <ChevronUp /> : <ChevronDown />}
                        </div>
                      </div>
                    </SidebarMenuItem>
                    {isOpen && (
                      <div className=" text-white w-48 pl-4">
                        {route.submenu.map((subitem) => (
                          <div key={subitem.href} className="py-1">
                            <Link href={subitem.href}>
                              <div className="flex items-center p-2 hover:bg-blue-700 rounded-md">
                                <Image
                                  src={`/sidebarIcons/${subitem.icon}`}
                                  alt={subitem.label}
                                  height={16}
                                  width={16}
                                />
                                <span className="ml-2">{subitem.label}</span>
                              </div>
                            </Link>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                );
              }
              return (
                <SidebarMenuItem key={route.href} className={pathname === route.href ? "bg-blue-700 rounded-md " : ""}>
                  <SidebarMenuButton
                    asChild
                    isActive={pathname === route.href}
                    tooltip={route.tooltip}
                    className={`text-white hover:text-white hover:bg-blue-700 rounded-md ${
                      pathname === route.href ? "!bg-blue-700 !text-white" : ""
                    }`}
                    onClick={() => setActiveMenu(route.label)}
                  >
                    <Link href={route.href}>
                      <Image
                        src={`/sidebarIcons/${route.icon}`}
                        alt={route.label}
                        height={16}
                        width={16}
                      />
                      <span className="ml-3">{route.label}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              );
            })}
          </SidebarMenu>
        </SidebarGroupContent>
      </SidebarGroup>

      {/* Meet Logo at the bottom */}

      <SidebarMenu className="mx-auto mt-24  space-y-2 w-48 list-none">
      <SidebarMenuItem >
          <SidebarMenuButton asChild>
            <Link  href="https://meet.google.com/" target="_blank" rel="noopener noreferrer" className="flex items-center p-2  hover:!bg-blue-700 hover:text-white  rounded-md text-white">
              <Image src="/meetIcon.png" alt="Meeting" height={16} width={16} />
              <span className="ml-4">Meeting</span>
            </Link>
          </SidebarMenuButton>
        </SidebarMenuItem>


        <SidebarMenuItem >
          <SidebarMenuButton asChild>
            <Link  href="/conversation" className="flex items-center p-2 hover:!bg-blue-700 hover:text-white rounded-md text-white">
              <Image src="/messageIcon.png" alt="Messaging" height={16} width={16} />
              <span className="ml-4">Messaging</span>
            </Link>
          </SidebarMenuButton>
        </SidebarMenuItem>
        </SidebarMenu>
    
    </SidebarContent>

      <SidebarRail />
    </Sidebar>

  )
}


{/* <div className="mt-auto p-4 flex justify-center">
<a href="https://meet.google.com/" target="_blank" rel="noopener noreferrer">
  <img src="/meetIcon.png" className="w-[24px] h-[25px]" alt="Meet Logo" />
  <p>Meetings</p>
</a>

</div> */}



