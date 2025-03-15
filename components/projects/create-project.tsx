"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useRouter } from "next/navigation";
import axiosInstance from "@/lib/axios";
import toast from 'react-hot-toast';
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { closeModal, processOn } from "@/redux/modalSlice"; // Import actions


interface CreateProjectProps {
  children: React.ReactNode
}

interface FormData {
  name: string;
  description: string;
}


export function CreateProject({ children }: CreateProjectProps) {
  const [open, setOpen] = useState(false)

  
  const { register, handleSubmit, watch, formState: { errors, isSubmitting } } = useForm<FormData>();

  const router = useRouter();
  const dispatch = useDispatch();

  const onSubmit = async (data: FormData) => {
    

    try {
      const response = await axiosInstance.post("project/create", {
        name: data.name,
        description: data.description
        
      });


      if (response?.data?.code == 201) {
        toast.success(response.data.message);
        dispatch(processOn("projectEdit"))

        setOpen(false)
      }
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Something went wrong!");
    }
  };


  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Create Project</DialogTitle>
          <DialogDescription>
            Create a new project to start tracking work.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
          
            <Label htmlFor="name">Project name</Label>
           
            <Input
                type="text"
                placeholder="Enter your project name"
                {...register("name", { required: "Name is required" })}
              />
              {errors.name && <p className="text-sm text-red-600">{errors.name.message}</p>}
          </div>
          <div className="grid gap-2">
          
            <Label htmlFor="name">Project Description</Label>
           
            <Input
                type="text"
                placeholder="Enter your project description"
                {...register("description", { required: "Description is required" })}
              />
              {errors.description && <p className="text-sm text-red-600">{errors.description.message}</p>}
          </div>
        </div>
        
        <DialogFooter>
          <Button variant="outline" onClick={() => setOpen(false)}>
            Cancel
          </Button>
         
          <Button className="w-full bg-[#3D30EF] text-white hover:bg-slate-400" type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Create project..." : "Create project"}
            </Button>
          
        </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}

