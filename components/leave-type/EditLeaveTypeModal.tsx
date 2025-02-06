"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
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

interface EditLeaveTypeProps {
  leaveId: Number;
  
}

interface FormData {
  type: string;
  unit: string;
  hours: string;
  status: string;
  days: string;
}

export function  EditLeaveTypeModal({ leaveId }: EditLeaveTypeProps) {
  const [open, setOpen] = useState(true);
  const [unit, setUnit] = useState("day");
  const [status, setStatus] = useState("active");
  const [initialData, setInitialData] = useState<FormData | null>(null);
   
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
    formState: { errors, isSubmitting },
    setValue,
  } = useForm<FormData>();

  const router = useRouter();

  // Fetch leave data for the specific leaveId
  useEffect(() => {

    setOpen(true);

    const fetchLeaveType = async () => {
      try {
        const response = await axiosInstance.get(`/leaves/${leaveId}`);
        if (response?.data) {
          setInitialData(response.data.data);
          setUnit(response.data.data.duration_unit);
          setStatus(response.data.data.status);
          // Prepopulate form fields with fetched data
          setValue("type", response.data.data.type);
          setValue("days", response.data.data.days);
          setValue("hours", response.data.data.hours);
          setValue("status", response.data.data.status);

          //console.log(response.data.data.unit, "asdsada");
        
        }
      } catch (error: any) {
        toast.error("Failed to fetch leave data");
      }
    };

    fetchLeaveType();
  }, [leaveId, setValue]);

  const onSubmit = async (data: FormData) => {
    try {
      const response = await axiosInstance.post(`/leaves/${leaveId}/update`, {
        type: data.type,
        status: data.status,
        duration_unit: data.unit,
        days: data.days,
        hours: data.hours,
        
      });

      if (response?.data?.code === 200) {
        toast.success(response.data.message);
        setOpen(false);
        // router.refresh(); // Refresh the page or data after successful update
      }
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Something went wrong!");
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      
      <DialogContent className="sm:max-w-[625px]">
        <DialogHeader>
          <DialogTitle>Edit Leave Type</DialogTitle>
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
              <Button type="button" variant="outline" onClick={() => setOpen(false)}>
                Cancel
              </Button>
              <Button
                className="w-full"
                type="submit"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Updating..." : "Update"}
              </Button>
            </div>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
