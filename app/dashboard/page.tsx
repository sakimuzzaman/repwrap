import { Suspense } from "react"
import { Button } from "@/components/ui/button"
import { PlusCircle, UserPlus } from 'lucide-react'
import { DashboardHeader } from "@/components/dashboard-header"
import { DashboardShell } from "@/components/dashboard-shell"
import { PendingSubmissions } from "@/components/dashboard/pending-submissions"
import { SubmissionStats } from "@/components/dashboard/submission-stats"
import { LeavesTaken } from "@/components/dashboard/leaves-taken"
import { SubmissionChart } from "@/components/dashboard/submission-chart"
import { ReportsList } from "@/components/dashboard/reports-list"
import { DashboardLoading } from "../../components/dashboard/loading"

export default function DashboardPage() {
  return (
    <DashboardShell>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-[#010136] dark:text-[#FFFFFF]">Admin Dashboard</h1>
          <p className="text-sm text-[#010136] dark:text-[#FFFFFF]">
            12th December, 2024
          </p>
        </div>
        <div className="flex gap-2">
          <Button className=" text-blue-600 hover:text-white hover:bg-blue-600 border-blue-600 hover:border-blue-600 transition duration-300 ease-in-out"  variant="outline" size="sm">
            <PlusCircle className="mr-2 h-4 w-4" />
            Create Project
          </Button>
          <Button className=" text-blue-600 hover:text-white hover:bg-blue-600 border-blue-600 hover:border-blue-600 transition duration-300 ease-in-out"  variant="outline" size="sm">
            <UserPlus className="mr-2 h-4 w-4" />
            Invite Teammates
          </Button>
        </div>
      </div>
      <Suspense fallback={<DashboardLoading />}>
        <div className="grid gap-4 md:grid-cols-2">
          <PendingSubmissions />
          <SubmissionStats />
        </div>
        <div className="grid gap-4 md:grid-cols-2 mt-4">
          <LeavesTaken />
          <SubmissionChart />
        </div>
        <div className="mt-4">
          <ReportsList />
        </div>
      </Suspense>
    </DashboardShell>
  )
}

