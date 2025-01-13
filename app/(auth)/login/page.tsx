// "use client"

// import Link from "next/link"
// import { useState } from "react"
// import { Eye, EyeOff } from 'lucide-react'
// import { Button } from "@/components/ui/button"
// import { Input } from "@/components/ui/input"
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

// export default function LoginPage() {
//   const [showPassword, setShowPassword] = useState(false)

//   return (
//       <>
//         <Card>
//           <CardHeader className="space-y-1">
//             <CardTitle className="text-2xl text-center">Welcome to Repwrap</CardTitle>
//             <p className="text-center text-muted-foreground">Login to your account</p>
//           </CardHeader>
//           <CardContent>
//             <div className="space-y-4">
//               <div className="space-y-2">
//                 <label className="text-sm font-medium">Work Email</label>
//                 <Input
//                   type="email"
//                   placeholder="Enter your email"
//                 />
//               </div>
//               <div className="space-y-2">
//                 <div className="flex items-center justify-between">
//                   <label className="text-sm font-medium">Password</label>
//                   <Button variant="link" className="px-0 text-sm">
//                     Forgot?
//                   </Button>
//                 </div>
//                 <div className="relative">
//                   <Input
//                     type={showPassword ? "text" : "password"}
//                     placeholder="Enter your password"
//                   />
//                   <Button
//                     variant="ghost"
//                     size="sm"
//                     className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
//                     onClick={() => setShowPassword(!showPassword)}
//                   >
//                     {showPassword ? (
//                       <EyeOff className="h-4 w-4 text-muted-foreground" />
//                     ) : (
//                       <Eye className="h-4 w-4 text-muted-foreground" />
//                     )}
//                     <span className="sr-only">
//                       {showPassword ? "Hide password" : "Show password"}
//                     </span>
//                   </Button>
//                 </div>
//               </div>
//               <Button className="w-full">Login Now</Button>
//               <div className="relative">
//                 <div className="absolute inset-0 flex items-center">
//                   <span className="w-full border-t" />
//                 </div>
//                 <div className="relative flex justify-center text-xs uppercase">
//                   <span className="bg-background px-2 text-muted-foreground">
//                     Or Login with
//                   </span>
//                 </div>
//               </div>
//               <div className="grid grid-cols-2 gap-4">
//                 <Button variant="outline">
//                   <svg className="mr-2 h-4 w-4" viewBox="0 0 24 24">
//                     <path
//                       d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
//                       fill="#4285F4"
//                     />
//                     <path
//                       d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
//                       fill="#34A853"
//                     />
//                     <path
//                       d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
//                       fill="#FBBC05"
//                     />
//                     <path
//                       d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
//                       fill="#EA4335"
//                     />
//                   </svg>
//                   Google
//                 </Button>
//                 <Button variant="outline">
//                   <svg className="mr-2 h-4 w-4" fill="#1877F2" viewBox="0 0 24 24">
//                     <path d="M9.101 23.691v-7.98H6.627v-3.667h2.474v-1.58c0-4.085 1.848-5.978 5.858-5.978.401 0 .955.042 1.468.103a8.68 8.68 0 0 1 1.141.195v3.325a8.623 8.623 0 0 0-.653-.036 26.805 26.805 0 0 0-.733-.009c-.707 0-1.259.096-1.675.309a1.686 1.686 0 0 0-.679.622c-.258.42-.374.995-.374 1.752v1.297h3.919l-.386 2.103-.287 1.564h-3.246v8.245C19.396 23.238 24 18.179 24 12.044c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.628 3.874 10.35 9.101 11.647Z" />
//                   </svg>
//                   Facebook
//                 </Button>
//               </div>
//               <p className="text-center text-sm text-muted-foreground">
//                 Don't Have An Account?{" "}
//                 <Link href="/signup" className="text-primary hover:underline">
//                   Signup
//                 </Link>
//               </p>
//             </div>
//           </CardContent>
//         </Card>
//       </>
//   )
// }



"use client";

import Link from "next/link";
import { useState } from "react";
import { Eye, EyeOff } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import axiosInstance from "@/lib/axios";
import { useRouter } from "next/navigation";
import toast from 'react-hot-toast';

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("johndoe@example.com");
  const [password, setPassword] = useState("securepassword");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const response = await axiosInstance.post("/login", { email, password });

      // Assuming the API returns a token
      const token = response.data.token;
      const user = response.data.data;
      // localStorage.setItem("authToken", token);
      document.cookie = `auth_token=${token}; path=/; secure; samesite=strict`;
      document.cookie = `user=${JSON.stringify(user)};`;
      toast.success('Login successful');
      // Redirect user after successful login
      router.push("/dashboard");
    } catch (err: any) {
      setError(err.response?.data?.message || "Login failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Card>
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl text-center">Welcome to Repwrap</CardTitle>
          <p className="text-center text-muted-foreground">Login to your account</p>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Work Email</label>
              <Input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label className="text-sm font-medium">Password</label>
                <Button variant="link" className="px-0 text-sm">
                  Forgot?
                </Button>
              </div>
              <div className="relative">
                <Input
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <Button
                  variant="ghost"
                  type="button"
                  size="sm"
                  className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4 text-muted-foreground" />
                  ) : (
                    <Eye className="h-4 w-4 text-muted-foreground" />
                  )}
                  <span className="sr-only">
                    {showPassword ? "Hide password" : "Show password"}
                  </span>
                </Button>
              </div>
            </div>
            {error && <p className="text-sm text-red-500">{error}</p>}
            <Button className="w-full" type="submit" disabled={loading}>
              {loading ? "Logging in..." : "Login Now"}
            </Button>
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-background px-2 text-muted-foreground">
                  Or Login with
                </span>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <Button variant="outline">Google</Button>
              <Button variant="outline">Facebook</Button>
            </div>
            <p className="text-center text-sm text-muted-foreground">
              Don't Have An Account?{" "}
              <Link href="/signup" className="text-primary hover:underline">
                Signup
              </Link>
            </p>
          </form>
        </CardContent>
      </Card>
    </>
  );
}
