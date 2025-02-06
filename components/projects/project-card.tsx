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
import { EditProject } from "./edit-modal"
import { useState } from "react"



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
  const [editModal, setEditModal] = useState<any>(false)
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">
          <Link href={`/projects/${project.id}`} className="hover:underline">
            {project.name}
          </Link>
        </CardTitle>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreVertical className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {/* <DropdownMenuItem>View details</DropdownMenuItem> */}
             
                <DropdownMenuItem onClick={() => setEditModal(true)}>Edit project</DropdownMenuItem>
             
            {/* <DropdownMenuItem className="text-destructive">
              Delete project
            </DropdownMenuItem> */}
          </DropdownMenuContent>
        </DropdownMenu>
      </CardHeader>
      <CardContent>
        <CardDescription className="line-clamp-2">
          {project.description}
        </CardDescription>
        <div className="mt-2">
          <Badge variant={project.status === "completed" ? "secondary" : "default"}>
            {project.status}
          </Badge>
        </div>
      </CardContent>

      {editModal && <EditProject projectId={project.id} />}
    </Card>
  )
}

