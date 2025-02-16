"use client"

import { DatePicker } from "@/components/employee-workreport/DatePicker"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import Image from "next/image"
import { useState, useEffect } from "react"
import Link from "next/link"
import axiosInstance from "@/lib/axios";
import { Button } from "@/components/ui/button";
import { PlusCircle, UserPlus } from "lucide-react";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { ReportsList } from "@/components/dashboard/reports-list"
import { useRouter } from "next/navigation";
import { ProfileReportsList } from "@/components/dashboard/profile-reports-list"


export default function ProfilePage({ params }: { params: { id: string } }) {
    const [user, setUser] = useState<any>(null);
    const [selectedValueV, setSelectedValueV] = useState<{ month: string; year: string }>({
        month: '',
        year: ''
    });

    const [selectedValue, setSelectedValue] = useState<any>();

    const router = useRouter();
    const { id } = params; // Next.js 13+ এ params থেকে ID পাওয়া যায়

    const fetchUserDetails = async () => {
        try {
            const response = await axiosInstance.get(`/profile/${id}`, {
                params: selectedValueV
                    ? { month: selectedValueV.month, year: selectedValueV.year }
                    : {}
            });

            setUser(response.data.data);

        } catch (error) {
        }
    };

    // ✅ Fetch user personal details when modal opens
    useEffect(() => {

        fetchUserDetails();

    }, [selectedValue]); // selectedValue পরিবর্তন হলে useEffect চলবে

    const handleSelectChange = (value: string) => {
        setSelectedValue(value);

        // `value` থেকে month এবং year বের করা হচ্ছে
        const [monthName, year] = value.split("-"); // উদাহরণ: "feb-2024" -> ["feb", "2024"]

        // মাসের নাম থেকে মাসের নম্বর বের করার জন্য মাপিং
        const monthMapping: { [key: string]: number } = {
            jan: 1,
            feb: 2,
            mar: 3,
            apr: 4,
            may: 5,
            jun: 6,
            jul: 7,
            aug: 8,
            sep: 9,
            oct: 10,
            nov: 11,
            dec: 12
        };

        const monthNumber: any = monthMapping[monthName.toLowerCase()] || 1; // ডিফল্টভাবে জানুয়ারি (1) ধরবে

        setSelectedValueV({
            month: monthNumber,
            year: year
        });

        fetchUserDetails(); // API কল
    };


    const joinDate = user?.user_details?.join_date ? new Date(user.user_details.join_date) : new Date();
    const currentDate = new Date(); // বর্তমান তারিখ

    // যদি currentDate joinDate-এর আগে হয়, তাহলে currentDate ব্যবহার করব
    const startDate = currentDate > joinDate ? currentDate : joinDate;

    const months = [];
    const endDate = new Date(joinDate); // শেষ মাস join date হবে

    // লুপ চালিয়ে বর্তমান মাস থেকে `join_date` পর্যন্ত ডাটা বের করছি
    while (startDate >= endDate) {
        const monthName = startDate.toLocaleString("en-US", { month: "short" }).toLowerCase(); // "feb"
        const year = startDate.getFullYear().toString(); // "2025"

        months.push({
            value: `${monthName}-${year}`, // Value format: "feb-2024"
            label: `${monthName.charAt(0).toUpperCase() + monthName.slice(1)} ${year}`,
        });

        // আগের মাসে যাওয়ার জন্য ১ মাস কমানো হচ্ছে
        startDate.setMonth(startDate.getMonth() - 1);
    }

    return (
        <main className="flex-1 overflow-y-auto" >
            <div className="container mx-auto p-6">
                {/* Header */}
                <div className="mb-6 flex items-center justify-between">
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                        <Link href="/"> <span>Dashboard</span></Link>
                        <span>/</span>
                        <span className="font-bold">Profile Overview</span>
                    </div>
                    {/* <div className="flex gap-2">
                        <Button variant="outline">
                            <PlusCircle className="mr-2 h-4 w-4" />
                            Create Project
                        </Button>
                        <Button>
                            <UserPlus className="mr-2 h-4 w-4" />
                            Invite Teammates
                        </Button>
                    </div> */}
                </div>

                {/* Profile Details */}
                <Card className="mb-6 w-full">
                    <CardHeader className="flex flex-row items-center justify-between border-b pb-6">
                        <CardTitle>Profile Details</CardTitle>
                        <Select defaultValue={months[0]?.value} onValueChange={handleSelectChange}>
                            <SelectTrigger className="w-[180px]">
                                <SelectValue placeholder="Select month" />
                            </SelectTrigger>
                            <SelectContent>
                                {months.map(({ value, label }) => (
                                    <SelectItem key={value} value={value}>
                                        {label}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </CardHeader>
                    <CardContent className="pt-6">
                        <div className="flex flex-col gap-8">
                            {/* Profile Info */}
                            <div className="flex flex-col items-start gap-6 md:flex-row">
                                <Avatar className="h-24 w-24">
                                    <AvatarImage
                                        src={user?.user_details?.profile}
                                        alt="Profile"
                                    />
                                    <AvatarFallback>
                                        {user?.user_details?.name
                                            ?.split(" ")
                                            .map((word: any) => word[0])
                                            .join("")
                                            .toUpperCase() || "AA"}
                                    </AvatarFallback>
                                </Avatar>
                                <div className="space-y-1">
                                    <h3 className="text-2xl font-semibold capitalize">{user?.user_details?.name}</h3>
                                    <div className="space-y-1 text-sm text-gray-600">
                                        <p className="flex items-center gap-2">
                                            <span className="font-medium">Phone Number:</span>
                                            <span>{user?.user_details?.phone}</span>
                                        </p>
                                        <p className="flex items-center gap-2">
                                            <span className="font-medium">Email:</span>
                                            <span>{user?.user_details?.email}</span>
                                        </p>
                                        <p className="flex items-center gap-2">
                                            <span className="font-medium">Address:</span>
                                            <span>{user?.user_details?.address}</span>
                                        </p>

                                    </div>
                                </div>
                                <div className="space-y-1">
                                    <h3 className="text-2xl font-semibold">About</h3>
                                    <p className="flex items-center gap-2">
                                        <span>{user?.user_details?.about_us}</span>
                                    </p>
                                </div>
                            </div>
                            <h3 className="font-bold text-center text-2xl capitalize">Monthly stats {selectedValue ?? months[0]?.value}</h3>

                            {/* Stats Grid */}
                            <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-5">
                                <StatsCard title="Total Report Submission" value={user?.total_report_submission} className="col-span-1" />
                                <StatsCard title="Total Unsubmitted Days" value={user?.total_unsubmitted_days} className="col-span-1" />
                                <StatsCard title="Submission Percentage" value={user?.submission_percentage} className="col-span-1" />
                                <StatsCard title="Total Hours Worked" value={`${user?.total_hours_worked} h`} className="col-span-1" />
                                <StatsCard title="Total Leaves Days Taken" value={user?.total_leave_days_taken} className="col-span-1" />
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Upcoming Approved Leaves */}
                <Card className="mb-6">
                    <CardHeader>
                        <CardTitle>Upcoming Approved Leaves</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Leave Type</TableHead>
                                    <TableHead>From Date</TableHead>
                                    <TableHead>To Date</TableHead>
                                    <TableHead>Reason</TableHead>
                                    <TableHead>Status</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>


                                {user?.upcoming_approved_leaves?.map((leave: any) => (
                                    <TableRow key={leave.from_date}>
                                        <TableCell className="capitalize">{leave.leave_type}</TableCell>
                                        <TableCell>{leave.start_date}</TableCell>
                                        <TableCell>{leave.end_date}</TableCell>
                                        <TableCell>{leave.reason.length > 100 ? `${leave.reason.substring(0, 100)}...` : leave.reason}</TableCell>
                                        <TableCell>
                                            <span className="rounded-full bg-green-100 px-2 py-1 text-xs text-green-600 capitalize">{leave.status}</span>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </CardContent>
                </Card>

                <Card className="mb-6">
                    <ProfileReportsList id={id} />
                </Card>
            </div>
        </main>
    )
}



function StatsCard({ title, value, className }: { title: string; value: string; className?: string }) {
    const [tilt, setTilt] = useState({ x: 0, y: 0 });

    const handleMouseMove = (e: any) => {
        const { clientX, clientY, currentTarget } = e;
        const { left, top, width, height } = currentTarget.getBoundingClientRect();

        const x = ((clientX - left) / width - 0.5) * 15; // 15deg max tilt
        const y = ((clientY - top) / height - 0.5) * 15;

        setTilt({ x, y });
    };

    const handleMouseLeave = () => setTilt({ x: 0, y: 0 });

    return (
        <div
            className={`relative rounded-2xl bg-gradient-to-r from-[#010138] to-[#4a4e69] p-6 shadow-2xl border border-white/10 
                transition-all duration-500 ease-out transform hover:scale-110 hover:shadow-blue-500/70 
                hover:-translate-y-2 hover:rotate-1 ${className}`}
            style={{
                transform: `perspective(1000px) rotateX(${tilt.y}deg) rotateY(${tilt.x}deg)`,
            }}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
        >

            <p className="text-sm font-bold text-white uppercase text-center tracking-wider">{title}</p>
            <p className="mt-4 text-4xl font-extrabold text-white text-center">{value}</p>
        </div>
    );
}


