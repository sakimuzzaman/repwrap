"use client"
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
import Cookies from 'js-cookie';
import { useState, useEffect } from "react"
import { useRouter } from "next/navigation";
import axiosInstance from "@/lib/axios";
import toast from 'react-hot-toast';
import { ProfileSettingModal } from "./ProfileSettingModal"


export function Header() {
  const [user, setUser] = useState<any>();
  const router = useRouter();

  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);

  const handleProfileClick = () => {
    setIsProfileModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsProfileModalOpen(false);
  };

  useEffect(() => {
    let usr = Cookies.get('user');
    usr = usr && JSON.parse(usr);
    if (!usr) {
      router.push('/login');
    }
    
    setUser(usr);
  }, []);

  const handleLogout = async () => {
    try {
      // Call the logout API
      const response = await axiosInstance.post("/logout");

      if (response.data.code === 200) {
        // Remove user cookie and redirect to login page
        toast.success(response.data.message);
        Cookies.remove("user");
        setUser(null);
        router.push("/login");
      } else {
        console.error("Failed to log out");
      }
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  return (
    <header className="sticky top-0 z-50 pr-3 w-full border-b bg-background/95 dark:bg-[#1C202B] backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center gap-4">
        <SidebarTrigger />
        <MainNav />
        <div className="flex items-center justify-end space-x-4">
          <ThemeToggle />
          {!user && <Link href="/login">
            <Button className="w-full">Signin</Button>
          </Link>}

          {user && <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                <Avatar className="h-8 w-8">
                  <AvatarImage src="/avatars/01.png" alt="@username" />
                  <AvatarFallback>JD</AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56" align="end" forceMount>
              <DropdownMenuLabel className="font-normal">
                <div className="flex flex-col space-y-1">
                  <p className="text-sm font-medium leading-none">{user?.name} </p>
                  <p className="text-xs leading-none text-muted-foreground">
                    {user?.email}
                  </p>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />

              <DropdownMenuItem onClick={handleProfileClick}>
                Profile Settings
              </DropdownMenuItem>

              <DropdownMenuItem>
                <Link href={'profile'}>My Profile</Link>
              </DropdownMenuItem>

              <DropdownMenuItem>
                Support
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={handleLogout}>
                Log out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>}
          <ProfileSettingModal openModal={isProfileModalOpen} onClose={handleCloseModal} />

        </div>
      </div>
    </header>
  )
}

