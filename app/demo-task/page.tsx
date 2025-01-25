import { Suspense } from "react"
import { Plus } from 'lucide-react'
import { Button } from "@/components/ui/button"

import { DashboardHeader } from "@/components/dashboard-header"
import { DashboardShell } from "@/components/dashboard-shell"


import { TaskLoading } from "@/components/task/TaskLoading"
import  {CreateTaskModal}  from "@/components/task/CreateTaskModal"
import { CardModalDemo } from "@/components/task/CardModalDemo"



export default function DemoTaskPage() {
  return (
    <DashboardShell>
      <DashboardHeader heading="Tasks" text="Manage your task">
        <CreateTaskModal>
          <Button>
            <Plus className="mr-2 h-4 w-4" />
              Create  Card-Modal
          </Button>
        </CreateTaskModal>
      </DashboardHeader>
      <Suspense fallback={<TaskLoading />}>
        
      </Suspense>
    <CardModalDemo />
    </DashboardShell>
  )
}
