import { Header } from "@/components/auth/Header"

export default function AuthLayout({ children, }: { children: React.ReactNode }) {

  return (
    <div className="min-h-screen bg-[url('/login-bg-img.png')] bg-cover bg-center">
      <Header />
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-full max-w-[800px] mx-auto p-4">
          {children}
        </div>
      </div>
    </div>
    
  )
}
