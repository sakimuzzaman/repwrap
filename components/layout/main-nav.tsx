"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { BarChart2, Calendar, ClipboardList, Users, Menu } from 'lucide-react'

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { ScrollArea } from "@/components/ui/scroll-area"

const routes = [
  {
    label: "Dashboard",
    icon: BarChart2,
    href: "/dashboard",
    color: "text-sky-500",
  },
  
  {
    label: "Daily Reports",
    icon: ClipboardList,
    href: "/reports",
    color: "text-violet-500",
  },
  {
    label: "Leave Management",
    icon: Calendar,
    href: "/leaves",
    color: "text-pink-500",
  },
  {
    label: "Team",
    icon: Users,
    href: "/team",
    color: "text-orange-500",
  },
]

interface MainNavProps {
  className?: string
}

export function MainNav({ className }: MainNavProps) {
  const pathname = usePathname()

  return (
    <div className={cn("flex-1", className)}>
      {/* <div className="hidden md:flex">
        {routes.map((route) => (
          <Link
            key={route.href}
            href={route.href}
            className={cn(
              "flex items-center px-4 py-2 text-sm font-medium transition-colors hover:text-primary",
              pathname === route.href
                ? "text-primary"
                : "text-muted-foreground"
            )}
          >
            <route.icon className={cn("mr-2 h-4 w-4", route.color)} />
            {route.label}
          </Link>
        ))}
      </div> */}
      <Sheet>
        <SheetTrigger asChild>
          <Button
            variant="ghost"
            className="px-0 text-base hover:bg-transparent focus-visible:bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 md:hidden"
          >
            <Menu className="h-6 w-6" />
            <span className="sr-only">Toggle Menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="pr-0">
          <ScrollArea className="my-4 h-[calc(100vh-8rem)] pb-10">
            <div className="flex flex-col space-y-3">
              {routes.map((route) => (
                <Link
                  key={route.href}
                  href={route.href}
                  className={cn(
                    "flex items-center px-4 py-2 text-sm font-medium transition-colors hover:text-primary",
                    pathname === route.href
                      ? "text-primary"
                      : "text-muted-foreground"
                  )}
                >
                  <route.icon className={cn("mr-2 h-4 w-4", route.color)} />
                  {route.label}
                </Link>
              ))}
            </div>
          </ScrollArea>
        </SheetContent>
      </Sheet>
    </div>
  )
}

