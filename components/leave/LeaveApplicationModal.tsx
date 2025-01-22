"use client";

import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import axiosInstance from "@/lib/axios";
import { cn } from "@/lib/utils";

interface ComponentProps {
  children: React.ReactNode;
}

interface FormData {
  leave_type_id: string;
  reason: string;
  start_date: string;
  end_date: string;
  certificate: File | null;
}

export function LeaveApplicationModal({ children }: ComponentProps) {
  const [open, setOpen] = useState(false);
  const [leaveTypes, setLeaveTypes] = useState([]);
  const [startDate, setStartDate] = useState<any>(null);
  const [endDate, setEndDate] = useState<any>(null);
  const [certificate, setCertificate] = useState<any>(null);
  

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({
    defaultValues: {
      leave_type_id: "",
      reason: "",
      start_date: undefined,
      end_date: undefined,
      certificate: null,
    },
  });

  const router = useRouter();

  useEffect(() => {
    // Fetch leave types
    const fetchLeaveTypes = async () => {
      try {
        const response = await axiosInstance.get("/leaves");
        setLeaveTypes(response.data?.data || []);
      } catch (error) {
        toast.error("Failed to fetch leave types");
      }
    };

    fetchLeaveTypes();
  }, []);

  const onSubmit = async (data: FormData) => {
    try {
      const formData = new FormData();
      formData.append("leave_type_id", data.leave_type_id);
      formData.append("reason", data.reason);
      formData.append("start_date", startDate);
      formData.append("end_date", endDate);
      
      formData.append("certificate", certificate);
    

      const response = await axiosInstance.post("/leave/application/apply", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      if (response?.data?.code === 201) {
        toast.success(response.data.message);
        setOpen(false);
        router.refresh();
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
          <DialogTitle>Apply for Leave</DialogTitle>
          <DialogDescription>
            Fill out the form below to submit your leave application.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4" encType="multipart/form-data">
          <div className="grid gap-4">
            <div>
              <Label htmlFor="leave_type_id">Leave Type</Label>
              <select
                id="leave_type_id"
                {...register("leave_type_id", { required: "Leave type is required" })}
                className="border rounded p-2 w-full"
              >
                <option value="">Select Leave Type</option>
                {leaveTypes.map((type: any, index: number) => (
                  <option key={index} value={type.id}>
                    {type.type}
                  </option>
                ))}
              </select>
              {errors.leave_type_id && (
                <p className="text-sm text-red-600">{errors.leave_type_id.message}</p>
              )}
            </div>

            <div className="grid grid-cols-2 gap-4">
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      "w-full justify-start text-left font-normal",
                      !startDate && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon />
                    {startDate ? format(startDate, "PPP") : "From Date"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={startDate || undefined}
                    onSelect={(date: any) => {
                        if (date) {
                         
                          setStartDate(format(date, "yyyy-MM-dd"));
                           // Save the formatted date to the form
                        }
                      }}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>

              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      "w-full justify-start text-left font-normal",
                      !endDate && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon />
                    {endDate ? format(endDate, "PPP") : "To Date"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={endDate || undefined}
                    onSelect={(date: any) => {
                        if (date) {
                          // Format the date to 'YYYY-MM-DD'
                          setEndDate(format(date, "yyyy-MM-dd"));
                          // Save the formatted date to the form
                        }
                      }}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>

            <div>
              <Label htmlFor="reason">Reason</Label>
              <Textarea
                id="reason"
                {...register("reason", { required: "Reason is required" })}
                placeholder="Describe your reason for the leave"
              />
              {errors.reason && (
                <p className="text-sm text-red-600">{errors.reason.message}</p>
              )}
            </div>

            <div>
              <Label htmlFor="certificate">Attachment</Label>
              <Input
                id="certificate"
                type="file"
                {...register("certificate")}
                onChange={(e) =>
                  setCertificate(e.target.files?.[0] || null)
                }
              />
            </div>
          </div>

          <DialogFooter>
            <Button
              variant="outline"
              type="button"
              onClick={() => setOpen(false)}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Submitting..." : "Submit"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
