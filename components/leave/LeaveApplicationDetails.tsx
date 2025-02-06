"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import axiosInstance from "@/lib/axios";
import toast from "react-hot-toast";
import Cookies from "js-cookie";

interface ComponentProps {
    children: React.ReactNode;
    leaveId: number;
    userId: number;
    onLeaveApplicationSuccess?: () => void;
}

export function LeaveApplicationDetailsModal({ children, leaveId, userId, onLeaveApplicationSuccess }: ComponentProps) {
    const [open, setOpen] = useState(false);
    const [leaveDetails, setLeaveDetails] = useState<any>(null);
    const [leaveTypes, setLeaveTypes] = useState<any>([]);
    const [loading, setLoading] = useState(false);
    const [user, setUser] = useState<any>(null);
    const [error, setError] = useState<any>(null);
    const router = useRouter();

    useEffect(() => {
        if (open) {
            fetchLeaveDetails();
        }
    }, [open]);

    useEffect(() => {
        setUser(Cookies.get("user") ? JSON.parse(Cookies.get("user") as string) : null);
    }, []);

    const fetchLeaveDetails = async () => {
        setLoading(true);
        try {
            const response = await axiosInstance.get(`/leave-applications/${leaveId}/${userId}`);
            setLeaveDetails(response.data.data.leaveDetails);
            setLeaveTypes(response.data.data.leaveTypes);
        } catch (error) {
            toast.error("Failed to fetch leave details");
        } finally {
            setLoading(false);
        }
    };

    const handleApprovalChange = async (status: string) => {
        if (user?.role === "admin") {
            try {
                await axiosInstance.put(`/leave-applications/${leaveId}/approval`, { status });
                toast.success(`Leave ${status} successfully`);
                fetchLeaveDetails(); // Refetch to update the leave status
                if (onLeaveApplicationSuccess) {
                    onLeaveApplicationSuccess();
                }
            } catch (error) {
                toast.error("Failed to update leave status");
            }
        }
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>{children}</DialogTrigger>
            <DialogContent className="sm:max-w-[1000px]">
                <DialogHeader>
                    <DialogTitle>Leave Application Details</DialogTitle>
                </DialogHeader>

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

                {loading ? (
                    <p>Loading...</p>
                ) : leaveDetails ? (
                    <div className="space-y-4">
                        <div className="flex justify-between">
                            <p className="capitalize">
                                <strong>Leave Type:</strong> {leaveDetails.leave_type?.type}
                            </p>
                            {/* Approval Dropdown for Admin */}
                            {user?.role === "admin" && leaveDetails.status === "pending" ? (
                                <select
                                    className="border p-1"
                                    value={leaveDetails.status}
                                    onChange={(e) => handleApprovalChange(e.target.value)}
                                >
                                    <option value="pending">Pending</option>
                                    <option value="approved">Approve</option>
                                    <option value="rejected">Reject</option>
                                </select>
                            ) : (
                                <p className="capitalize">
                                    <strong>Status:</strong> {leaveDetails.status}
                                </p>
                            )}
                        </div>
                        <p className="capitalize">
                            <strong>Reason:</strong> {leaveDetails.reason}
                        </p>
                        <p className="capitalize">
                            <strong>Applied Date:</strong> {leaveDetails.applied_date}
                        </p>
                        <p>
                            <strong>Start Date:</strong>{" "}
                            {new Date(leaveDetails.start_date).toLocaleDateString("en-GB", {
                                day: "2-digit",
                                month: "2-digit",
                                year: "2-digit",
                                weekday: "long",
                            })}
                        </p>
                        <p>
                            <strong>End Date:</strong>{" "}
                            {new Date(leaveDetails.end_date).toLocaleDateString("en-GB", {
                                day: "2-digit",
                                month: "2-digit",
                                year: "2-digit",
                                weekday: "long",
                            })}
                        </p>
                        {leaveDetails.attachment && (
                            <p>
                                <strong>Attachment:</strong>{" "}
                                <a
                                    href={leaveDetails.attachment}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-blue-500 underline"
                                >
                                    View Document
                                </a>
                            </p>
                        )}
                    </div>
                ) : (
                    <p>No details available.</p>
                )}

                <div className="flex justify-end">
                    <Button onClick={() => setOpen(false)}>Close</Button>
                </div>
            </DialogContent>
        </Dialog>
    );
}
