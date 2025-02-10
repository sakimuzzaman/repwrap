import { Suspense } from "react"
import { Plus } from 'lucide-react'
import { Button } from "@/components/ui/button"

import { DashboardHeader } from "@/components/dashboard-header"
import { DashboardShell } from "@/components/dashboard-shell"


import { TaskLoading } from "@/components/task/TaskLoading"
import  {CreateTaskModal}  from "@/components/task/CreateTaskModal"
import TaskBoard from "@/components/task/TaskBoard"
//import { TaskList } from "@/components/task/TaskList"

export default function TaskPage() {
  return (
    <DashboardShell>
      <DashboardHeader heading="Tasks" text="Manage your task">
        <CreateTaskModal>
          <Button className="bg-[#3D30EF] text-white hover:bg-slate-400">
            <Plus className="mr-2 h-4 w-4" />
              Create Task
          </Button>
        </CreateTaskModal>
      </DashboardHeader>
      <Suspense fallback={<TaskLoading />}>
        
      </Suspense>
      <TaskBoard />
    </DashboardShell>
  )
}

