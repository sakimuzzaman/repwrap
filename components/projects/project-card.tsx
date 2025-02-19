import Link from "next/link"
import { MoreVertical } from 'lucide-react'
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge"
import { useDispatch } from "react-redux";
import { openModal } from "@/redux/modalSlice"; // Import actions



interface Project {
  id: string
  name: string
  description: string
  status: string
}

interface ProjectCardProps {
  project: Project
}


export function ProjectCard({ project }: ProjectCardProps) {
  const dispatch = useDispatch();


  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">
          <p>{project.name}</p>
        </CardTitle>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreVertical className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">             
            <DropdownMenuItem onClick={() => dispatch(openModal({ modalType: "projectEdit", id: project?.id }))}>Edit project</DropdownMenuItem>
            <DropdownMenuItem onClick={() => dispatch(openModal({ modalType: "projectDetails", id: project?.id }))} className="">
              Details
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </CardHeader>
      <CardContent>
        <CardDescription className="line-clamp-2">
          {project.description}
        </CardDescription>
        {/* <div className="mt-2">
          <Badge variant={project.status === "completed" ? "secondary" : "default"}>
            {project.status}
          </Badge>
        </div> */}
      </CardContent>
    </Card>
  )
}

