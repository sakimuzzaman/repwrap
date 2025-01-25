"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useForm } from "react-hook-form";
import axiosInstance from "@/lib/axios";
import toast from 'react-hot-toast';
import { useRouter } from "next/navigation";

interface FormData {
  name: string;
}

export default function OnboardingPage() {
  const { register, handleSubmit, watch, formState: { errors, isSubmitting } } = useForm<FormData>();
  const router = useRouter();

  const onSubmit = async (data: FormData) => {

    try {
      const response = await axiosInstance.post("/project/create", {
        name: data.name,
      });


      if (response?.data?.code == 201) {
        toast.success(response.data.message);
        localStorage.setItem('project_id', response.data.data.id)
        router.push('/project-invite');

        // Redirect to login page or handle success
      }
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Something went wrong!");
    }
  };


  return (
    <Card className="w-full max-w-lg mx-auto">
      <CardHeader className="space-y-1 text-center">
        <CardTitle className="text-3xl">Welcome To Repwrap!</CardTitle>
        <p className="text-muted-foreground">
          You can now create a project
        </p>
      </CardHeader>
      <CardContent className="space-y-4">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="space-y-2">
            <h2 className="text-xl font-medium text-center">
              What Would You Like To Name Your Project?
            </h2>
          
            <Input
              placeholder="Enter your project name"
              className="text-center"
              {...register("name", { required: "Name is required", minLength: { value: 2, message: "Name must be at least 6 characters" } })}
            />
            {errors.name && <p className="text-sm text-red-600">{errors.name.message}</p>}

          </div>
          <Button className="w-full" type="submit" size="lg" disabled={isSubmitting}>
            {isSubmitting ? "Continue..." : "Continue"}
          </Button>

        </form>
      </CardContent>
    </Card>
  )
}

