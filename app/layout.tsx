
"use client"
import { Inter } from 'next/font/google'
import { ThemeProvider } from "@/components/providers/theme-provider"
import { Header } from "@/components/layout/header"
import { AppSidebar } from "@/components/layout/app-sidebar"
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar"
import { cn } from "@/lib/utils"
import "./globals.css"
import { usePathname } from 'next/navigation';

import { Toaster } from 'react-hot-toast';
import './globals.css';

const inter = Inter({ subsets: ["latin"] })

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
  }) {
  const pathname = usePathname();
  let pages = ['/login', '/signup', '/forgot-password', '/workspace-create', '/project-create', '/project-invite'];
 
  let isAuthPage = pages.includes(pathname);;

  return (
    <html lang="en" suppressHydrationWarning>
      <body className={cn(
        "min-h-screen bg-background font-sans antialiased",
        inter.className
      )}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Toaster
            position="top-right"
            reverseOrder={false}
          />{/* Add Toaster here */}
          
          <SidebarProvider>
            <div className="relative flex min-h-screen">
              {!isAuthPage && <AppSidebar />} 
              <SidebarInset>
                <div className="flex flex-col flex-1">
                  {!isAuthPage && <Header />}
                  <main className="flex-1">{children}</main>
                </div>
              </SidebarInset>
            </div>
          </SidebarProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}

