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

import toast from 'react-hot-toast';
import { useForm } from "react-hook-form";

interface CreateProjectProps {
  children: React.ReactNode
}

interface FormData {
  name: string;
  description: string;
}


export function CreateTaskModal({ children }: CreateProjectProps) {
  const [open, setOpen] = useState(false)

  
  const { register, handleSubmit, watch, formState: { errors, isSubmitting } } = useForm<FormData>();

  

 


  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Create Task</DialogTitle>
          <DialogDescription>
            
          </DialogDescription>
        </DialogHeader>
        
        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
          
            <Label htmlFor="name">Project name</Label>
           
            <Input
                type="text"
                placeholder="Title"
                {...register("name", { required: "Name is required" })}
              />
              {errors.name && <p className="text-sm text-red-600">{errors.name.message}</p>}
          </div>
          <div className="grid gap-2">
          
            <Label htmlFor="name">Task Description</Label>
           
            <Input
                type="text"
                placeholder="Enter your task description"
                {...register("description", { required: "Description is required" })}
              />
              {errors.description && <p className="text-sm text-red-600">{errors.description.message}</p>}
          </div>
        </div>
        
        <DialogFooter>
          <Button variant="outline" onClick={() => setOpen(false)}>
            Cancel
          </Button>
         
          {/* <Button className="w-full" type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Create project..." : "Create project"}
            </Button> */}
          
        </DialogFooter>
     
      </DialogContent>
    </Dialog>
  )
}

