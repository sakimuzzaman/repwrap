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
      const response = await axiosInstance.post("/workspace/create", {
        name: data.name,
      });


      if (response?.data?.code == 201) {
        toast.success(response.data.message);
        const workspace_id = response?.data?.workspace_id;
        if (workspace_id) {
          router.push(`/project-create?workspace_id=${workspace_id}`);
        } else {
          router.push('/project-create');
        }
        // Redirect to login page or handle success
      }

      if (response?.data?.code == 403) {
        toast.success(response.data.message);
      }
      
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Something went wrong!");
    }
  };


  return (
    <Card className="w-full max-w-xxl mx-auto">
      <CardHeader className="space-y-1 text-center">
        <CardTitle className="text-3xl">Welcome To Repwrap!</CardTitle>
        <p className="text-muted-foreground">
          You Are Signing As Tushar.Ahmed566@Gmail.Com
        </p>
      </CardHeader>
      <CardContent className="space-y-4">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="space-y-2">
            <h2 className="text-xl font-medium text-center">
              What Would You Like To Name Your Workspace?
            </h2>
            <Input
              placeholder="Try The Name Of Your Company Or Organisation"
              className="text-center"
              {...register("name", { required: "Name is required", minLength: { value: 2, message: "Name must be at least 6 characters" } })}
            />
            {errors.name && <p className="text-sm text-red-600">{errors.name.message}</p>}

          </div>
          <div className="flex justify-center space-x-4">
            <Button className="w-full bg-gradient-to-r from-gray-400 to-gray-600 text-white disabled:opacity-50" type="button" size="lg" onClick={() => router.back()} disabled={isSubmitting}>
              Back
            </Button>
           
            <Button className="w-full bg-gradient-to-r from-[#443EFC] to-[#06CBF8] text-white disabled:opacity-50" type="submit" size="lg" disabled={isSubmitting}>
              {isSubmitting ? "Continue..." : "Continue"}
            </Button>
          </div>

        </form>
      </CardContent>
    </Card>
  )
}

