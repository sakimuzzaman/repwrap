






"use client";

import { useState } from "react";
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

interface LeaveTypeProps {
  children: React.ReactNode;
}

interface FormData {
  type: string;
  status: string;
  unit: string;
  hours: string;
  days: string;
}

export function LeaveTypeModal({ children }: LeaveTypeProps) {
  const [open, setOpen] = useState(false);
  const [unit, setUnit] = useState("day");
  const [status, setStatus] = useState("active");

  const leaveTypes = [
    "sick",
    "paid",
    "unpaid",
    "vacation",
    "casual",
    "emergency",
    "marriage",
    "adoption",
    'parental',
    'study',
  ];

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<FormData>();

  const router = useRouter();

  const onSubmit = async (data: FormData) => {
    try {
      const response = await axiosInstance.post("/leave/create", {
        type: data.type,
        duration_unit: data.unit,
        status: data.status,
        hours:data.hours,
        days:data.days,

      });

      if (response?.data?.code === 201) {
        toast.success(response.data.message);
        setOpen(false);
        // router.refresh(); // Refresh the page or data after successful creation
      }
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Something went wrong!");
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-[625px]">
        <DialogHeader>
          <DialogTitle>Create New Leave Type</DialogTitle>
          <hr />
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="grid grid-cols-2 gap-4 py-4">
            {/* Leave Type Dropdown */}
            <div className="grid gap-2">
              <Label htmlFor="name">Leave Type</Label>
              <select
                {...register("type", { required: "Leave type is required" })}
                className="border rounded p-2"
              >
                {leaveTypes.map((type) => (
                  <option key={type} value={type}>
                     {type.charAt(0).toUpperCase() + type.slice(1)}
                  </option>
                ))}
              </select>
              {errors.type && (
                <p className="text-sm text-red-600">{errors.type.message}</p>
              )}
            </div>

            {/* Unit Dropdown */}
            <div className="grid gap-2">
              <Label htmlFor="unit">Unit</Label>
              <select
                {...register("unit", { required: "Unit is required" })}
                value={unit}
                onChange={(e) => setUnit(e.target.value)}
                className="border rounded p-2"
              >
                <option value="day">Day</option>
                <option value="hours">Hour</option>
              </select>
              {errors.unit && (
                <p className="text-sm text-red-600">{errors.unit.message}</p>
              )}
            </div>
          </div>

          {/* Conditional Input Field */}
          {unit === "day" && (
            <div className="grid gap-2">
              <Label htmlFor="additionalField">Days</Label>
              <Input
                type="text"
                placeholder="Enter number of days"
                {...register("days", {
                  required: unit === "day" ? "Days are required" : false,
                })}
              />
              {errors.days && (
                <p className="text-sm text-red-600">
                  {errors.days.message}
                </p>
              )}
            </div>
          )}
          {unit === "hours" && (
            <div className="grid gap-2">
              <Label htmlFor="additionalField">Hours</Label>
              <Input
                type="text"
                placeholder="Enter number of hours"
                {...register("hours", {
                  required: unit === "hours" ? "Hours are required" : false,
                })}
              />
              {errors.hours && (
                <p className="text-sm text-red-600">
                  {errors.hours.message}
                </p>
              )}
            </div>
          )}

          

          {/* Status Dropdown */}
          <div className="grid gap-2">
            <Label htmlFor="status">Status</Label>
            <select
              {...register("status", { required: "Status is required" })}
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="border rounded p-2"
            >
              <option value="1">Active</option>
              <option value="0">Inactive</option>
            </select>
            {errors.status && (
              <p className="text-sm text-red-600">{errors.status.message}</p>
            )}
          </div>

          <DialogFooter>
            <div className="flex justify-end gap-4">
              <Button variant="outline" onClick={() => setOpen(false)}>
                Cancel
              </Button>
              <Button
                className="w-full"
                type="submit"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Creating..." : "Create"}
              </Button>
            </div>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
