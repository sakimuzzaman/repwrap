
"use client"
import { Suspense } from "react"
import axiosInstance from "@/lib/axios";
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
import { useState, useEffect } from "react"
import Cookies from 'js-cookie';
import { useRouter } from "next/navigation";
import Link from "next/link";


export default function DashboardPage() {
  const [loading, setLoading] = useState<any>(true);
  const [yesterday_pending_submissions, setYesterday_pending_submissions] = useState<any>(null);
  const [yesterday_submission_percentage, setYesterday_submission_percentage] = useState<any>(null);
  const [yesterday_leaves, setYesterday_leaves] = useState<any>(null);
  const [submission_rate_over_week, setSubmission_rate_over_week] = useState<any>(null);
  const [error, setError] = useState<any>(null);
  const [user, setUser] = useState<any>(null);
  const router = useRouter();

  const fetchDashboardData = async () => {
    try {
      const response = await axiosInstance.get("/admin/dashboard");

      setYesterday_pending_submissions(response?.data?.data?.yesterday_pending_submissions)
      setYesterday_submission_percentage(response?.data?.data?.yesterday_submission_percentage)
      setYesterday_leaves(response?.data?.data?.yesterday_leaves)
      setSubmission_rate_over_week(response?.data?.data?.submission_rate_over_week)

    } catch (err) {
      setError("Failed to fetch leaves.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    let usr:any = Cookies.get('user');
    usr = usr && JSON.parse(usr);
    if (!usr) {
      router.push('/login');
    }
    if (usr?.role == 'user') {
      router.push('/');
    }
    fetchDashboardData()
    setUser(usr);
  }, []);


  if (!user) {
    return
  }


  return (
    <DashboardShell>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-[#010136] dark:text-[#FFFFFF]">Admin Dashboard</h1>
          <p className="text-sm text-[#010136] dark:text-[#FFFFFF]">
            {new Date().toLocaleDateString()}
          </p>
        </div>
        <div className="flex gap-2">
          <Link href={"/projects"}>
            <Button className=" text-blue-600 hover:text-white hover:bg-blue-600 border-blue-600 hover:border-blue-600 transition duration-300 ease-in-out" variant="outline" size="sm">
              <PlusCircle className="mr-2 h-4 w-4" />
              Create Project
            </Button>
          </Link>
          {/* <Button className=" text-blue-600 hover:text-white hover:bg-blue-600 border-blue-600 hover:border-blue-600 transition duration-300 ease-in-out" variant="outline" size="sm">
            <UserPlus className="mr-2 h-4 w-4" />
            Invite Teammates
          </Button> */}
        </div>
      </div>
      <Suspense fallback={<DashboardLoading />}>
        <div className="grid gap-4 md:grid-cols-2">
          <PendingSubmissions yesterday_pending_submissions={yesterday_pending_submissions} />
          <SubmissionStats yesterday_submission_percentage={yesterday_submission_percentage} />
        </div>
        <div className="grid gap-4 md:grid-cols-2 mt-4">
          <LeavesTaken yesterday_leaves={yesterday_leaves} />
          <SubmissionChart submission_rate_over_week={submission_rate_over_week} />
        </div>
        <div className="mt-4">
          <ReportsList />
        </div>
      </Suspense>
    </DashboardShell>
  )
}

