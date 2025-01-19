"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useRouter } from "next/navigation";
import axiosInstance from "@/lib/axios";
import toast from "react-hot-toast";
import { useForm } from "react-hook-form";

interface EditProjectProps {
  projectId: string; // ID of the project to edit
}

interface FormData {
  name: string;
  description: string;
}

export function EditProject({ projectId }: EditProjectProps) {
  const [open, setOpen] = useState(true);
  const [loading, setLoading] = useState(true); // For initial fetch loading

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<FormData>();

  const router = useRouter();

  // Fetch project details
  const fetchProjectDetails = async () => {
    try {
      const response = await axiosInstance.get(`/projects/${projectId}`);
      const { name, description } = response.data.data;
      console.log(name, description);
      
      setValue("name", name); // Populate form fields
      setValue("description", description);
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Failed to fetch project details");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (open) {
      fetchProjectDetails(); // Fetch details when modal opens
    }
  }, [open]);

  const onSubmit = async (data: FormData) => {
    try {
      const response = await axiosInstance.post(`/projects/${projectId}/update`, {
        name: data.name,
        description: data.description,
      });

      if (response?.data?.code === 200) {
        toast.success(response.data.message);
        setOpen(false);
        
      }
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Something went wrong!");
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      {/* <DialogTrigger asChild>{children}</DialogTrigger> */}
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit Project</DialogTitle>
          <DialogDescription>
            Update your project details.
          </DialogDescription>
        </DialogHeader>
        {loading ? (
          <p>Loading...</p>
        ) : (
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
                <Label htmlFor="description">Project Description</Label>
                <Input
                  type="text"
                  placeholder="Enter your project description"
                  {...register("description", { required: "Description is required" })}
                />
                {errors.description && (
                  <p className="text-sm text-red-600">{errors.description.message}</p>
                )}
              </div>
            </div>

            <DialogFooter>
              <Button variant="outline" onClick={() => setOpen(false)}>
                Cancel
              </Button>
              <Button className="w-full" type="submit" disabled={isSubmitting}>
                {isSubmitting ? "Updating project..." : "Update project"}
              </Button>
            </DialogFooter>
          </form>
        )}
      </DialogContent>
    </Dialog>
  );
}
