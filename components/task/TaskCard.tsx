"use client"

import { MoreHorizontal } from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";




export default function TaskCard({cardInfo}: any) {
  const assignedMembers = [
    { id: 1, name: "Alice", profile_image: "/profile1.jpg" },
  ];



  return (
   
    <div className="bg-white max-h-[450px] dark:bg-gray-700 p-4 rounded-lg shadow-sm flex items-center justify-between">
      <div>
        <h4 className="font-sm line-clamp-2">{cardInfo?.title}</h4>
        <div className="flex space-x-2 mt-1">
          
          {assignedMembers.map((member) => (
            <img
              key={member.id}
              src={member.profile_image}
              alt={member.name}
              className="w-6 h-6 rounded-full"
            />
          ))}
        </div>
      </div>
      <DropdownMenu>
        <DropdownMenuTrigger>
          <MoreHorizontal className="w-6 h-6 cursor-pointer" />
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem>Assign Members</DropdownMenuItem>
          <DropdownMenuItem>Change Status</DropdownMenuItem>
          <DropdownMenuItem>Delete Task</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>


    </div>
  

 
  );
}
