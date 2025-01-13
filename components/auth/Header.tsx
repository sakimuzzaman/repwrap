import { MainNav } from "@/components/layout/main-nav"
import { ThemeToggle } from "@/components/layout/theme-toggle"
import { SidebarTrigger } from "@/components/ui/sidebar"
import { Button } from "@/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import Link from "next/link"
import { Logo } from "../setting/logo"

export function Header() {
    return (
        <header className="sticky top-0 z-50 px-5 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="container flex h-14 items-center justify-between gap-4">
                <Logo />
                <div className="flex items-center justify-end space-x-4">
                    <ThemeToggle />
                    <Link href="/login">
                        <Button className="w-full">Signin</Button>
                    </Link>
                </div>
            </div>
        </header>
    )
}

