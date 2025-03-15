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
import { InviteMemberModal } from "./InviteMemberModal"
import { assert } from "console"


export function Header() {
  const [user, setUser] = useState<any>();
  const [workspaces, setWorkspaces] = useState<any>();
  const router = useRouter();

  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  const [isInviteModalOpen, setIsInviteModalOpen] = useState(false);

  const handleProfileClick = () => {
    setIsProfileModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsProfileModalOpen(false);
  };
  const handleInviteMemberClick = () => {
    setIsInviteModalOpen(true);
  };

  const handleCloseInviteMemberModal = () => {
    setIsInviteModalOpen(false);
  };

  useEffect(() => {
    let usr = Cookies.get('user');
    let workspacesCookies = Cookies.get('workspaces');
    usr = usr && JSON.parse(usr);
    workspacesCookies = workspacesCookies && JSON.parse(workspacesCookies);
    if (!usr) {
      router.push('/login');
    }

    setUser(usr);
    setWorkspaces(workspacesCookies);
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

  const changeWorkspace = async (id:any) => {
    // Call the logout API
    const response = await axiosInstance.get(`/workspaces/switch/${id}`);

    if (response.data.code === 200) {

      const rUser = response.data.data;
      const workspaces = response.data.workspaces;
      Cookies.remove("user");
      Cookies.remove("workspaces");

      document.cookie = `user=${JSON.stringify(rUser)};`;
      document.cookie = `workspaces=${JSON.stringify(workspaces)};`;

      setUser(rUser);
      setWorkspaces(workspaces);

      toast.success(response.data.message);
      if (rUser?.role === 'admin') {
        router.push("/dashboard");
      } else {
        router.push("/");
      }

    } else {
      console.error("Failed to log out");
    }
  }

  return (
    <header className="sticky top-0 z-50 pr-3 w-full border-b bg-background/95 dark:bg-[#1C202B] backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center gap-4">
        <SidebarTrigger />

        {user && <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="relative">
              <div className="flex flex-col justify-start items-start">
                <h3 className="font-bold">Workspace </h3>
                <p className="text-[10px]">{workspaces?.currentWorkspace?.name}</p>
              </div>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56" align="center" forceMount>
            {workspaces?.workspaces?.map((item:any, index:number) => 
              <div key={index}>
                <DropdownMenuItem onClick={() => changeWorkspace(item?.id)} className="capitalize flex justify-between items-center">
                  {item?.name}
                  <span className="ml-2">&rarr;</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
              </div>
            )}
          </DropdownMenuContent>
        </DropdownMenu>}

        {user?.role == 'admin' && <Button onClick={handleInviteMemberClick}>Invite Members +</Button>}

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
                  <AvatarImage src={user?.profile_details?.profile_photo} alt="@username" />
                  <AvatarFallback>
                    {user?.user_details?.name
                      ?.split(" ")
                      .map((word: any) => word[0])
                      .join("")
                      .toUpperCase() || "PP"}
                  </AvatarFallback>
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
                <Link href={`/profile/${user?.id}`}>My Profile</Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={handleLogout}>
                Log out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>}
          <ProfileSettingModal openModal={isProfileModalOpen} onClose={handleCloseModal} />
          <InviteMemberModal openModal={isInviteModalOpen} onClose={handleCloseInviteMemberModal} />

        </div>
      </div>
    </header>
  )
}

