// "use client"

// import { useState } from "react"
// import { Button } from "@/components/ui/button"
// import {
//   Dialog,
//   DialogContent,
//   DialogDescription,
//   DialogFooter,
//   DialogHeader,
//   DialogTitle,
//   DialogTrigger,
// } from "@/components/ui/dialog"
// import { Input } from "@/components/ui/input"
// import { Label } from "@/components/ui/label"
// import { useRouter } from "next/navigation";
// import axiosInstance from "@/lib/axios";
// import toast from 'react-hot-toast';
// import { useForm } from "react-hook-form";

// interface LeaveTypeProps {
//   children: React.ReactNode
// }

// interface FormData {
//   name: string;
//   description: string;
// }


// export function LeaveTypeModal({ children }: LeaveTypeProps) {
//   const [open, setOpen] = useState(false)

  




     

//   return (
//     <Dialog open={open} onOpenChange={setOpen}>
//        <DialogTrigger asChild>{children}</DialogTrigger>
//       <DialogContent className="sm:max-w-[625px]">
//         <DialogHeader>
//           <DialogTitle>Create New Leave Type</DialogTitle>
//           <hr />
//           <DialogDescription>
           
//           </DialogDescription>
//         </DialogHeader>
       
       

//         <div className="grid grid-cols-2 gap-4 py-4">
//           <div className="grid gap-2">
          
//             <Label htmlFor="name">Leave Type</Label>
           
//             <Input
//                 type="text"
//                 placeholder=""
                
//               />
              
//           </div>
//           <div className="grid gap-2">
          
//             <Label htmlFor="name">Unit</Label>
           
//             <Input
//                 type="text"
//                 placeholder="Days"
                
//               />
             
//           </div>
//         </div>
       

//         <div className="grid gap-2">
          
//             <Label htmlFor="name">Days per Year</Label>
           
//             <Input
//                 type="text"
//                 placeholder=""
                
//               />
              
//           </div>
        
//         <DialogFooter>

          
//           <div className="flex justify-end gap-4">

           
//               <Button variant="outline" onClick={() => setOpen(false)}>
//                 Cancel
//               </Button>

//               <Button variant="outline" onClick={() => setOpen(false)}>
//                 Create
//               </Button>
           
            
//           </div>
          
       
          
//         </DialogFooter>
   
//       </DialogContent>
//     </Dialog>
//   )
// }





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
import { Select, SelectItem } from "../ui/select";

interface LeaveTypeProps {
  children: React.ReactNode;
}

interface FormData {
  name: string;
  unit: string;
  daysPerYear: string;
}

export function LeaveTypeModal({ children }: LeaveTypeProps) {
  const [open, setOpen] = useState(false);




  const leaveType =[
    'sick',
    'paid',
    'unpaid',
    'vacation',
    'casual',
    'emergency',
    'marriage',
    'adoption'
]

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormData>();

  const router = useRouter();

  const onSubmit = async (data: FormData) => {
    try {
      const response = await axiosInstance.post("leave/create", {
       
        name: data.name,
        unit: data.unit,
        daysPerYear: data.daysPerYear,
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
            <div className="grid gap-2">
              <Label htmlFor="name">Leave Type</Label>
              <Input
                type="text"
                placeholder="Enter leave type"
                {...register("name", { required: "Leave type is required" })}
              />
              {errors.name && (
                <p className="text-sm text-red-600">{errors.name.message}</p>
              )}
            </div>
            <div className="grid gap-2">
              <Label htmlFor="unit">Unit</Label>
              <Input
                type="text"
                placeholder="Days"
                {...register("unit", { required: "Unit is required" })}
              />
              {errors.unit && (
                <p className="text-sm text-red-600">{errors.unit.message}</p>
              )}
            </div>
          </div>
          <div className="grid gap-2">
            <Label htmlFor="daysPerYear">Days per Year</Label>
            <Input
              type="text"
              placeholder="Enter days per year"
              {...register("daysPerYear", {
                required: "Days per year is required",
              })}
            />
            {errors.daysPerYear && (
              <p className="text-sm text-red-600">
                {errors.daysPerYear.message}
              </p>
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
