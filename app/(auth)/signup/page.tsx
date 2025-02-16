
"use client";

import Link from "next/link";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Eye, EyeOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import axiosInstance from "@/lib/axios";
import toast from 'react-hot-toast';
import { useRouter } from "next/navigation";

interface SignUpFormData {
  name: string;
  email: string;
  password: string;
  password_confirmation: string;
}

export default function SignUp() {
  const [showPassword, setShowPassword] = useState(false);
  const [passwordNotMatch, setPasswordNotMatch] = useState<String>('');
  const { register, handleSubmit, watch, formState: { errors, isSubmitting } } = useForm<SignUpFormData>();
  const router = useRouter();

  const onSubmit = async (data: SignUpFormData) => {
    // Ensure passwords match
    if (data.password !== data.password_confirmation) {
      setPasswordNotMatch('Passwords do not match');
      return;
    }

    try {
      const response = await axiosInstance.post("/register", {
        name: data.name,
        email: data.email,
        password: data.password,
        password_confirmation: data.password_confirmation,
      });


      if (response?.data?.code == 201) {
        toast.success('Sign up successful! Please log in.');
        router.push('/login');
        // Redirect to login page or handle success
      }
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Something went wrong!");
    }
  };

  return (
    <>
      {/* <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-semibold">Repwrap</h1>
        <div className="flex items-center gap-2">
          <span className="text-sm text-muted-foreground">Have An Account?</span>
          <Button variant="outline" size="sm" asChild>
            <Link href="/login">Login</Link>
          </Button>
        </div>
      </div> */}
      <Card>
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl text-center bg-gradient-to-r from-[#443EFC] to-[#06CBF8] bg-clip-text text-transparent">Welcome to Repwrap</CardTitle>
          <p className="text-center text-[#271654]">Sign up for your account</p>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Name</label>
              <Input
                type="text"
                placeholder="Enter your name"
                {...register("name", { required: "Name is required" })}
              />
              {errors.name && <p className="text-sm text-red-600">{errors.name.message}</p>}
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Email</label>
              <Input
                type="email"
                placeholder="Enter your email"
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                    message: "Invalid email address",
                  },
                })}
              />
              {errors.email && <p className="text-sm text-red-600">{errors.email.message}</p>}
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Password</label>
              <div className="relative">
                <Input
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  {...register("password", { required: "Password is required", minLength: { value: 6, message: "Password must be at least 6 characters" } })}
                />
                <Button
                  variant="ghost"
                  size="sm"
                  className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                  onClick={() => setShowPassword(!showPassword)}
                  type="button"
                >
                  {showPassword ? <EyeOff className="h-4 w-4 text-muted-foreground" /> : <Eye className="h-4 w-4 text-muted-foreground" />}
                  <span className="sr-only">{showPassword ? "Hide password" : "Show password"}</span>
                </Button>
              </div>
              {errors.password && <p className="text-sm text-red-600">{errors.password.message}</p>}
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Confirm Password</label>
              <div className="relative">
                <Input
                  type={showPassword ? "text" : "password"}
                  placeholder="Confirm your password"
                  {...register("password_confirmation", { required: "Confirm Password is required" })}
                />
                <Button
                  variant="ghost"
                  size="sm"
                  className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                  onClick={() => setShowPassword(!showPassword)}
                  type="button"
                >
                  {showPassword ? <EyeOff className="h-4 w-4 text-muted-foreground" /> : <Eye className="h-4 w-4 text-muted-foreground" />}
                  <span className="sr-only">{showPassword ? "Hide password" : "Show password"}</span>
                </Button>
              </div>
              {errors.password_confirmation && <p className="text-sm text-red-600">{errors.password_confirmation.message}</p>}
              {passwordNotMatch && <p className="text-sm text-red-600">{passwordNotMatch}</p>}

            </div>

            <Button className="w-full bg-gradient-to-r from-[#443EFC] to-[#06CBF8] text-white disabled:opacity-50" type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Signing up..." : "Sign up"}
            </Button>
          </form>

          <div className="mt-4 ">
            <h4 className="text-center">Have an account?</h4>
            <Link href="/login">
              <Button className="w-full bg-[#fff] text-[#222121] hover:bg-slate-400">Signin</Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    </>
  );
}
