"use client";

import Link from "next/link";
import { Eye, EyeOff } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import axiosInstance from "@/lib/axios";
import { useRouter } from "next/navigation";
import toast from 'react-hot-toast';
import { useDispatch } from "react-redux";
import { setUser } from "@/redux/userSlice";
import { useEffect, useState } from "react";
import axios from 'axios';
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";

// Main page wrapper
export default function LoginPage() {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <Suspense fallback={<div className="flex justify-center items-center">Loading...</div>}>
        <LoginForm />
      </Suspense>
    </div>
  );
}

// Actual form component that uses searchParams
function LoginForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const dispatch = useDispatch();
  const [googleUrl, setGoogleUrl] = useState("");
  const searchParams = useSearchParams();

  const [emailOAuth, setEmailOAuth] = useState<string | null>(null);
  const [passwordOAuth, setPasswordOAuth] = useState<string | null>(null);

  const handleSubmit = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const response = await axiosInstance.post("/login", {
        'email': emailOAuth ?? email,
        'password': passwordOAuth ?? password
      });

      const token = response.data.token;
      const user = response.data.data;
      const workspaces = response.data.workspaces;

      document.cookie = `auth_token=${token}; path=/; secure; samesite=strict`;
      document.cookie = `user=${JSON.stringify(user)};`;
      document.cookie = `workspaces=${JSON.stringify(workspaces)};`;

      dispatch(setUser(user));

      toast.success('Login successful');

      if (user?.role === 'admin') {
        router.push("/dashboard");
      } else {
        router.push("/");
      }
    } catch (err: any) {
      setError(err.response?.data?.message || "Login failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setEmailOAuth(searchParams.get("email"));
    setPasswordOAuth(searchParams.get("password"));

    axios.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}auth/google`)
      .then((res) => {
        setGoogleUrl(res.data.url);
      })
      .catch((error) => {
        console.error("Error fetching Google URL:", error);
      });
  }, [searchParams]);

  useEffect(() => {
    if (emailOAuth && passwordOAuth) {
      handleSubmit();
    }
  }, [emailOAuth, passwordOAuth]);

  return (
    <Card className="w-full max-w-md">
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl text-center bg-gradient-to-r from-[#443EFC] to-[#06CBF8] bg-clip-text text-transparent">
          Welcome to Repwrap
        </CardTitle>
        <p className="text-center text-[#271654]">Login to your account</p>
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
              disabled={!!emailOAuth}
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
                disabled={!!passwordOAuth}
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
          <Button
            className="w-full bg-gradient-to-r from-[#443EFC] to-[#06CBF8] text-white disabled:opacity-50"
            type="submit"
            disabled={loading}
          >
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
          <div className="flex justify-center">
            <a href={googleUrl} onClick={() => setLoading(true)}>
              <Button
                className="w-full bg-gradient-to-r from-[#443EFC] to-[#06CBF8] text-white disabled:opacity-50"
                type="button"
                disabled={loading}
              >
                {loading ? "Redirecting to Google..." : "Login with Google"}
              </Button>
            </a>
          </div>
          <p className="text-center text-md text-[#271654]">
            Don't Have An Account?{" "}
            <Link href="/signup" className="text-[#588EF5] hover:underline">
              Signup
            </Link>
          </p>
        </form>
      </CardContent>
    </Card>
  );
}