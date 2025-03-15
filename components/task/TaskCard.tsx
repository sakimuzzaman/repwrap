"use client"

import { MoreHorizontal } from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";




export default function TaskCard({ cardInfo }: any) {


  return (

    <div className="bg-white max-h-[450px] dark:bg-gray-700 cursor-pointer p-4 rounded-lg shadow-sm flex items-center justify-between">
      <div>
        <h4 className="font-sm line-clamp-2">{cardInfo?.title}</h4>
        <div className="flex space-x-2 mt-1">
          {cardInfo?.assigned_to ? 
          
            <div className="flex items-center"> 
              <img
                src={cardInfo?.assigned_to?.profile_photo_url}
                alt={cardInfo?.assigned_to?.name}
                className="w-6 h-6 rounded-full"
              />
              <p className="ml-2 text-sm ">{cardInfo?.assigned_to?.name}</p>
            </div>
          : <p className="font-bold text-yellow-400">Need Assign This Card</p>}
          
        </div>
      </div>
      {/* <DropdownMenu>
        <DropdownMenuTrigger>
          <MoreHorizontal className="w-6 h-6 cursor-pointer" />
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem>Assign Members</DropdownMenuItem>
          <DropdownMenuItem>Change Status</DropdownMenuItem>
          <DropdownMenuItem>Delete Task</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu> */}

    </div>
  );
}
