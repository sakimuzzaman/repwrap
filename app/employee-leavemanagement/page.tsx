"use client"
import { useEffect, useState } from "react";
import axiosInstance from "@/lib/axios";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ApprovedRequestTable } from "@/components/leave/ApprovedRequestTable";
import { LeaveApplicationModal } from "@/components/leave/LeaveApplicationModal";
import { LeaveApplicationDetailsModal } from "@/components/leave/LeaveApplicationDetails";

const leaveTypes = [
  { name: "Sick Leave", days: "7 days", used: "2 days", remaining: "5 days" },
  { name: "Casual Leave", days: "12 days", used: "5 days", remaining: "7 days" },
  { name: "Parental leave", days: "14 days", used: "0 days", remaining: "14 days" },
  { name: "Study Leave", days: "14 days", used: "0 days", remaining: "14 days" },
];

export default function LeavesPage() {
  const [pendingLeaves, setPendingLeaves] = useState<any>([]);
  const [leaveHistory, setLeaveHistory] = useState<any>([]);
  const [leaveTypes, setLeaveTypes] = useState<any>([]);
  const [loading, setLoading] = useState<any>(true);
  const [error, setError] = useState<any>(null);

  const fetchLeaveData = async () => {
    try {
      const response = await axiosInstance.get("/employee/leave/application");
      setPendingLeaves(response.data.data.pendingLeave);
      setLeaveHistory(response.data.data.leaveHistory);
      setLeaveTypes(response.data.data.leaveTypes);
    } catch (err) {
      setError("Failed to fetch leaves.");
    } finally {
      setLoading(false);
    }
  };
  // ✅ API 
  useEffect(() => {
    fetchLeaveData();
  }, []);

  // Trigger data refresh when leave application is successfully submitted
  const onLeaveApplicationSuccess = () => {
    fetchLeaveData();
  };


  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Leaves</h2>
        <LeaveApplicationModal onLeaveApplicationSuccess={onLeaveApplicationSuccess}>
          <Button>+ New leave application</Button>
        </LeaveApplicationModal>
      </div>

      <div>
        <h2 className="text-2xl font-bold text-center">Monthly Leave Statistics - {new Date().toLocaleString('default', { month: 'long', year: 'numeric' })}</h2>
        <p className="text-base font-normal text-center">Here’s an overview of your leave usage across all categories.</p>
      </div>

      <div className="grid gap-4 md:grid-cols-4">
        {loading ? (
          <p>Loading...</p>
        ) : error ? (
          <p className="text-red-500">{error}</p>
        ) : leaveTypes.length === 0 ? (
          <p>No pending leave applications.</p>
        ) : (
          leaveTypes.map((leave: any) => (
            <Card key={leave.name}>
              <CardHeader>
                <CardTitle className="text-sm font-medium capitalize">{leave.name} Leave</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{leave.remaining}</div>
                <p className="text-xs text-muted-foreground">
                  Used: {leave.used} / Total: {leave.days}
                </p>
              </CardContent>
            </Card>
          ))
        )}
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Pending Leave Applications</CardTitle>
        </CardHeader>
        <CardContent>
          {loading ? (
            <p>Loading...</p>
          ) : error ? (
            <p className="text-red-500">{error}</p>
          ) : pendingLeaves.length === 0 ? (
            <p>No pending leave applications.</p>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Type</TableHead>
                  <TableHead>From Date</TableHead>
                  <TableHead>To Date</TableHead>
                  <TableHead>Days</TableHead>
                  <TableHead>Applied Date</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {pendingLeaves?.map((leave: any) => (
                  <TableRow key={leave.id}>
                    <TableCell className="capitalize">{leave.leave_type.type}</TableCell>
                    <TableCell>
                      {new Date(leave.start_date).toLocaleDateString('en-GB', {
                        day: '2-digit',
                        month: '2-digit',
                        year: '2-digit',
                        weekday: 'long'
                      })}
                    </TableCell>

                    <TableCell>
                      {new Date(leave.end_date).toLocaleDateString('en-GB', {
                        day: '2-digit',
                        month: '2-digit',
                        year: '2-digit',
                        weekday: 'long'
                      })}
                    </TableCell>
                    <TableCell>
                      {Math.ceil((new Date(leave.end_date).getTime() - new Date(leave.start_date).getTime()) / (1000 * 60 * 60 * 24))} days
                    </TableCell>
                    <TableCell>
                      {new Date(leave.applied_date).toLocaleDateString('en-GB', {
                        day: '2-digit',
                        month: '2-digit',
                        year: '2-digit',
                        weekday: 'long'
                      })}
                    </TableCell>
                    <TableCell className="capitalize">{leave.status}</TableCell>
                    <TableCell>
                      <LeaveApplicationDetailsModal leaveId={leave.id} userId={leave.user.id} onLeaveApplicationSuccess={onLeaveApplicationSuccess}>
                        <Button variant="outline" size="sm">View Details</Button>
                      </LeaveApplicationDetailsModal>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Leave History</CardTitle>
        </CardHeader>
        <CardContent>
          {loading ? (
            <p>Loading...</p>
          ) : error ? (
            <p className="text-red-500">{error}</p>
          ) : leaveHistory.length === 0 ? (
            <p>No leave application history.</p>
          ) :
            <ApprovedRequestTable leaves={leaveHistory} onLeaveApplicationSuccess={onLeaveApplicationSuccess} />
          }
        </CardContent>
      </Card>
    </div>
  );
}
