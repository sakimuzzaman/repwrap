"use client"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Overview } from "@/components/overview"
import { RecentReports } from "@/components/recent-reports"
import { CalendarView } from "@/components/calendar-view"
import { Badge } from "@/components/ui/badge"
import axiosInstance from "@/lib/axios";
import { useState, useEffect } from "react"

export default function DashboardPage() {
  const [loading, setLoading] = useState<any>(true);
  const [total_report, setTotal_report] = useState<any>(null);
  const [pending_leave, setPending_leave] = useState<any>(null);
  const [completed_report, setCompleted_report] = useState<any>(null);
  const [completion_rate, setCompletion_rate] = useState<any>(null);
  const [monthly_work_data, setMonthly_work_data] = useState<any>(null);
  const [last_10_reports, setLast_10_reports] = useState<any>(null);
  const [totalCompletedHours, setTotalCompletedHours] = useState<any>(null);
  const [error, setError] = useState<any>(null);

  const fetchDashboardData = async () => {
    try {
      const response = await axiosInstance.get("/employee/dashboard");

      setTotal_report(response?.data?.data?.total_report)
      setPending_leave(response?.data?.data?.pending_leave)
      setCompleted_report(response?.data?.data?.completed_report)
      setCompletion_rate(response?.data?.data?.completion_rate)
      setMonthly_work_data(response?.data?.data?.monthly_work_data)
      setLast_10_reports(response?.data?.data?.last_10_reports)
      setTotalCompletedHours(response?.data?.data?.totalCompletedHours)

    } catch (err) {
      setError("Failed to fetch leaves.");
    } finally {
      setLoading(false);
    }
  };

  // ✅ API 
  useEffect(() => {
    fetchDashboardData();
  }, []);

  return (
    <div className="p-6 space-y-6">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Reports</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{total_report ?? 0}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending Leaves</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{pending_leave ?? 0}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Completion Rate</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{completion_rate}%</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Hours</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalCompletedHours}h</div>
          </CardContent>
        </Card>
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="col-span-5">
          <CardHeader>
            <CardTitle>Overview</CardTitle>
          </CardHeader>
          <CardContent className="pl-2">
            <Overview monthly_work_data={monthly_work_data} />
          </CardContent>
        </Card>
        <Card className="col-span-2">
          <CardHeader>
            <CardTitle>Calendar</CardTitle>
          </CardHeader>
          <CardContent>
            <CalendarView />
          </CardContent>
        </Card>
      </div>
      <Card className="col-span-3">
        <CardHeader>
          <CardTitle>Recent Reports</CardTitle>
        </CardHeader>
        <CardContent>
          <RecentReports last_10_reports={last_10_reports} />
        </CardContent>
      </Card>
    </div>
  )
}

