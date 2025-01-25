"use client"

import { MoreHorizontal } from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { useState } from "react";


export default function TaskCard({cardModalManage, cardInfo}: any) {
  const assignedMembers = [
    { id: 1, name: "Alice", profile_image: "/profile1.jpg" },
    { id: 2, name: "Bob", profile_image: "/profile2.jpg" },
  ];

console.log(cardInfo);

  const modalOpen = (id :any) => {
    console.log('info', id);
    cardModalManage(id)
  }

  return (
   
    <div onClick={() => modalOpen(1)} className="bg-white max-h-[450px] dark:bg-gray-700 p-4 rounded-lg shadow-sm flex items-center justify-between">
      <div>
        <h3 className="font-medium">Task Title</h3>
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
