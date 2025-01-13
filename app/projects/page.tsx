import { Suspense } from "react"
import { Plus } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { ProjectList } from "@/components/projects/project-list"
import { CreateProject } from "@/components/projects/create-project"
import { DashboardHeader } from "@/components/dashboard-header"
import { DashboardShell } from "@/components/dashboard-shell"
import { ProjectsLoading } from "../../components/projects/loading"

export default function ProjectsPage() {
  return (
    <DashboardShell>
      <DashboardHeader heading="Projects" text="Manage your projects and teams.">
        <CreateProject>
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Create Project
          </Button>
        </CreateProject>
      </DashboardHeader>
      <Suspense fallback={<ProjectsLoading />}>
        <ProjectList />
      </Suspense>
    </DashboardShell>
  )
}

