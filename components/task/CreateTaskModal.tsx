

"use client"

import { useEffect, useState } from "react"
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
import axiosInstance from "@/lib/axios";
import toast from 'react-hot-toast';
import { useForm } from "react-hook-form";
import { Textarea } from "../ui/textarea"

interface FromProps {
  children: React.ReactNode
}

interface FormData {
  project_id: Number;
  title: string;
  description: string;
  point: Number;
}


export function CreateTaskModal({ children }: FromProps) {
  const [open, setOpen] = useState(false)

  const [projects, setProjects] = useState([]);

  
  const { register, handleSubmit, watch, formState: { errors, isSubmitting } } = useForm<FormData>();

  

  useEffect(() => {
    
    const fetchLeaveTypes = async () => {
      try {
        const response = await axiosInstance.get("/projects");
        setProjects(response.data?.data || []);
      } catch (error) {
        toast.error("Failed to fetch leave types");
      }
    };

    fetchLeaveTypes();
  
  }, []);



  const onSubmit = async (data: FormData) => {
    console.log("dasdasd")
    
    try {
      const response = await axiosInstance.post("task/create", {
        project_id: data.project_id,
        title: data.title,
        description: data.description
        
      });


      if (response?.data?.code == 201) {
        toast.success(response.data.message);
        setOpen(false)
      }
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Something went wrong!");
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-[625px]">
      <form  onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      
        <DialogHeader>
        
          <DialogTitle>
        
          <div>
              <Label htmlFor="project_type_id">Projects</Label>
              <select
                id="project_type_id"
                {...register("project_id", { required: "project type is required" })}
                className="border rounded p-2 w-full"
              >
                <option value="">Select Project</option>
                {projects.map((type: any, index: number) => (
                  <option key={index} value={type.id}>
                    {type.name}
                  </option>
                ))}
              </select>
              {errors.project_id && (
                <p className="text-sm text-red-600">{errors.project_id.message}</p>
              )}
            </div>

          </DialogTitle>
          <DialogDescription>
            
          </DialogDescription>
        </DialogHeader>
        
        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
          
            <Label htmlFor="name">Title</Label>
           
            <Input
                type="text"
                placeholder="Enter your project name"
                {...register("title", { required: "Name is required" })}
              />
              {errors.title && <p className="text-sm text-red-600">{errors.title.message}</p>}
          </div>
          <div className="grid gap-2">
          
            <Label htmlFor="name">Task Description</Label>
           
            <Textarea
                
                placeholder="Enter your task description"
                {...register("description", { required: "Description is required" })}
              />
              {errors.description && <p className="text-sm text-red-600">{errors.description.message}</p>}
          </div>
        </div>
        
        <DialogFooter>
          <Button type="button" variant="outline" onClick={() => setOpen(false)}>
            Cancel
          </Button>
         
          <Button className="w-1/5"  type="submit">
              {isSubmitting ? "Create project..." : "Create Task"}
            </Button>
        
        </DialogFooter>
       
      
      </form>
      </DialogContent>
    </Dialog>
  )
}

