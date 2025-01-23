

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

import { useForm } from "react-hook-form";
import { Textarea } from "../ui/textarea"

// interface CardProps {
//   children: React.ReactNode
// }

// interface FormData {
//   project_id: Number;
//   title: string;
//   description: string;
//   point: Number;
// }


export function CardModal({onClose}: { onClose: any }) {
  const [open, setOpen] = useState(false)

  //const [projects, setProjects] = useState([]);

  
   const { register, handleSubmit, watch, formState: { errors, isSubmitting } } = useForm<FormData>();

  

//   useEffect(() => {
    
//     const fetchLeaveTypes = async () => {
//       try {
//         const response = await axiosInstance.get("/projects");
//         setProjects(response.data?.data || []);
//       } catch (error) {
//         toast.error("Failed to fetch leave types");
//       }
//     };

//     fetchLeaveTypes();
  
//   }, []);



//   const onSubmit = async (data: FormData) => {
//     console.log("dasdasd")
    
//     try {
//       const response = await axiosInstance.post("task/create", {
//         project_id: data.project_id,
//         title: data.title,
//         description: data.description
        
//       });


//       if (response?.data?.code == 201) {
//         toast.success(response.data.message);
//         setOpen(false)
//       }
//     } catch (error: any) {
//       toast.error(error.response?.data?.message || "Something went wrong!");
//     }
//   };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      
      <DialogContent className="sm:max-w-[925px] sm:max-h-[450px]">
     
      
        <DialogHeader>
        
          <DialogTitle>
        
          <div>
              <Label htmlFor="project_type_id">Projects</Label>
              <select
                id="project_type_id"
                // {...register("project_id", { required: "project type is required" })}
                className="border rounded p-2 w-full"
              >
                <option value="">Select Project</option>
                
              </select>
            
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
               
              />
             
          </div>
          <div className="grid gap-2">
          
            <Label htmlFor="name">Task Description</Label>
           
            <Textarea
                
                placeholder="Enter your task description"
               
              />
              
          </div>
        </div>
        
        <DialogFooter>
          <Button type="button" variant="outline" onClick={() => {setOpen(false); onClose();}}>
            Cancel
          </Button>
{/*          
          <Button className="w-1/5"  type="submit">
              {isSubmitting ? "Create project..." : "Create Task"}
            </Button> */}
        
        </DialogFooter>
       
      
      
      </DialogContent>
    </Dialog>
  )
}







// "use client";

// import { Button } from "@/components/ui/button";
// import {
//   Dialog,
//   DialogContent,
//   DialogFooter,
//   DialogHeader,
//   DialogTitle,
// } from "@/components/ui/dialog";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import { Textarea } from "../ui/textarea";

// interface CardModalProps {
//   onClose: () => void;
//   open: boolean;
// }

// export function CardModal({ onClose, open }: CardModalProps) {
//   return (
//     <Dialog open={open} onOpenChange={(isOpen) => { if (!isOpen) onClose(); }}>
//       <DialogContent className="sm:max-w-[925px] sm:max-h-[450px]">
//         <DialogHeader>
//           <DialogTitle>
//             <div>
//               <Label htmlFor="project_type_id">Projects</Label>
//               <select id="project_type_id" className="border rounded p-2 w-full">
//                 <option value="">Select Project</option>
//               </select>
//             </div>
//           </DialogTitle>
//         </DialogHeader>

//         <div className="grid gap-4 py-4">
//           <div className="grid gap-2">
//             <Label htmlFor="name">Title</Label>
//             <Input type="text" placeholder="Enter your project name" />
//           </div>
//           <div className="grid gap-2">
//             <Label htmlFor="description">Task Description</Label>
//             <Textarea placeholder="Enter your task description" />
//           </div>
//         </div>

//         <DialogFooter>
//           <Button type="button" variant="outline" onClick={onClose}>
//             Cancel
//           </Button>
//         </DialogFooter>
//       </DialogContent>
//     </Dialog>
//   );
// }

