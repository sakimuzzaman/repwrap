"use client"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { ApprovedRequestTable } from "@/components/leave/ApprovedRequestTable"
import { useState, useEffect } from "react"
import axiosInstance from "@/lib/axios";
import { LeaveApplicationDetailsModal } from "@/components/leave/LeaveApplicationDetails"

export default function LeavesPage() {
  const [pendingLeaves, setPendingLeaves] = useState<any>([]);
  const [approveLeave, setApproveLeave] = useState<any>([]);
  const [loading, setLoading] = useState<any>(true);
  const [error, setError] = useState<any>(null);

  const fetchLeaveData = async () => {
    try {
      const response = await axiosInstance.get("/admin/leave/manage");
      setPendingLeaves(response.data.data.pendingLeave);
      setApproveLeave(response.data.data.approveLeave);
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
        <h2 className="text-2xl font-bold">Leave Management</h2>
        {/* <Button>Set Leave system</Button> */}
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
                  <TableHead>Applicant Name</TableHead>
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
                    <TableCell className="capitalize">{leave.user.name}</TableCell>
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
                        <Button className="bg-[#45BB65]" variant="outline" size="sm">View Details</Button>
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
          <CardTitle>Approved Leave Request</CardTitle>
        </CardHeader>

        <CardContent>
          {loading ? (
            <p>Loading...</p>
          ) : error ? (
            <p className="text-red-500">{error}</p>
          ) : approveLeave.length === 0 ? (
            <p>No leave applications.</p>
          ) : (
            <ApprovedRequestTable leaves={approveLeave} onLeaveApplicationSuccess={onLeaveApplicationSuccess} />
          )}
        </CardContent>

      </Card>

    </div>
  )
}

