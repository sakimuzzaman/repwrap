import Link from "next/link"
import { LucideDelete, MoreVertical } from 'lucide-react'
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
import { openModal, processOn } from "@/redux/modalSlice"; // Import actions
import axiosInstance from "@/lib/axios";
import toast from "react-hot-toast";

interface Project {
  id: string
  name: string
  description: string
  status: string
}

interface ProjectCardProps {
  project: Project
}

const setProjectId = (id: any) => {
  localStorage.setItem('project_id', id)
}




export function ProjectCard({ project }: ProjectCardProps) {

  const dispatch = useDispatch();

  const projectDelete = async (id: any) => {
    if (confirm('Are you sure you want to delete this project?')) {
      try {
        const response = await axiosInstance.post("/projects/delete/" + id);
        if (response?.data?.code === 200) {
          toast.success(response.data.message);
          dispatch(processOn("projectEdit"));
        } else {
          toast.error("Failed to delete the project.");
        }
      } catch (error) {
        toast.error("An error occurred while deleting the project.");
      }
    }
  }

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
              <MoreVertical className="h-4 w-4 cursor-pointer" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem className="cursor-pointer" onClick={() => dispatch(openModal({ modalType: "projectEdit", id: project?.id }))}>Edit project</DropdownMenuItem>
            <DropdownMenuItem className="cursor-pointer" onClick={() => dispatch(openModal({ modalType: "projectDetails", id: project?.id }))}>
              Details
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setProjectId(project?.id)} className="cursor-pointer" >
              <Link href={'/project-invite'}>Invite Members</Link>
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => projectDelete(project?.id)} className="cursor-pointer" >
              Delete
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

