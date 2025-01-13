import { Header } from "@/components/auth/Header"

export default function AuthLayout({ children, }: { children: React.ReactNode }) {

  return (
    <div>
      <Header />
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="w-full max-w-[600px] mx-auto p-4">
          {children}
        </div>
      </div>
    </div>
  )
}
