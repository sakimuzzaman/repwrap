
"use client";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { LeaveApplicationDetailsModal } from "./LeaveApplicationDetails"
import Cookies from "js-cookie";
import { useState, useEffect } from "react";

export function ApprovedRequestTable({ leaves, onLeaveApplicationSuccess }: any) {
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    setUser(Cookies.get("user") ? JSON.parse(Cookies.get("user") as string) : null);
  }, []);
  return (
    <Table>

      <TableHeader>
        <TableRow>
          {user?.role == 'admin' && <TableHead>Applicant Name</TableHead>}
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
        {leaves?.map((leave: any) => (
          <TableRow key={leave.id}>
            {user?.role == 'admin' && <TableCell className="capitalize">{leave.user.name}</TableCell>}
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
  )
}