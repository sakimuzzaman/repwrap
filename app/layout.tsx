
"use client"
import { Inter } from 'next/font/google'
import { ThemeProvider } from "@/components/providers/theme-provider"
import { Header } from "@/components/layout/header"
import { AppSidebar } from "@/components/layout/app-sidebar"
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar"
import { cn } from "@/lib/utils"
import "./globals.css"
import { usePathname } from 'next/navigation';
import { Provider } from "react-redux";
import store from "@/redux/store";
import { Toaster } from 'react-hot-toast';
import './globals.css';
import Link from 'next/link'
import Image from 'next/image'

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
        <Provider store={store}>
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
                    <main className="flex-1">{children}
                      <div className='fixed bottom-4 right-16 mb-4 z-50'>
                        <Link href="/conversation">
                          <Image  
                            src='sidebarIcons/chats.png'
                            width={64}
                            height={64}
                            alt='chat icon'
                            className='filter invert-[47%] sepia-[79%] saturate-[2662%] hue-rotate-[87deg] brightness-[96%] contrast-[97%]'
                          />
                        </Link>
                        
                      </div>
                    </main>
                  </div>
                </SidebarInset>
              </div>
            </SidebarProvider>
          </ThemeProvider>
        </Provider>
      </body>
    </html>
  )
}

