"use client"

import { useEffect, useState } from "react"
import { Search, ChevronDown, ChevronUp, Paperclip } from 'lucide-react'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { WeekDays } from "../reports/week-days"
import axiosInstance from "@/lib/axios";
import Image from "next/image"
import Link from "next/link"

const reports = [
  {
    id: 1,
    name: "Izazul Islam",
    avatar: "/avatars/01.png",
    initials: "II",
    tasksCompleted: 5,
    hoursWorked: 120,
    expanded: true,
    tasks: [
      {
        id: 1,
        title: "Creating Wireframe",
        project: "Udemia",
        time: "7 Hour",
        details: "Landing Pages Between 5 And 10% Doing Pretty Well. We Would Be Pretty Happy With The Landing Page Between 20% And 30%. Great And Best Landing Pages Have A Conversion Rate Of 40% Which Is Free-Kingly Good.",
        status: "Completed"
      },
      {
        id: 2,
        title: "Creating Wireframe",
        project: "Udemia",
        time: "7 Hour",
        details: "Landing Pages Between 5 And 10% Doing Pretty Well. We Would Be Pretty Happy With The Landing Page Between 20% And 30%. Great And Best Landing Pages Have A Conversion Rate Of 40% Which Is Free-Kingly Good.",
        status: "Completed"
      }
    ]
  },
  // Add more reports with similar structure
]

export function ReportsList() {
  const [expandedId, setExpandedId] = useState<number | null>(1)

  const [dailyReports, setDailyReports] = useState<any>([]);
  const [date, setDate] = useState<any>('');
  const [search, setSearch] = useState<any>('');

  useEffect(() => {
    // Make the API call when the component is mounted
    const fetchReports = async () => {
      try {
        const response = await axiosInstance.get('/admin-daily-work-reports', {
          params: {
            search: search || "",  
            date: date || "",      
          },
        })
        setDailyReports(response.data.data); // Store the data in state
      } catch (error) {
        console.error('Error fetching reports:', error);
      }
    };

    fetchReports();
  }, [search]);

  return (
    <Card>
      <CardHeader>
        <WeekDays />
        <div className="relative">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search by Team Members Name"
            onChange={(e) => setSearch(e.target.value)}
            className="pl-8"
          />
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {dailyReports.length > 0 && dailyReports?.map((report: any, index: any) => (
          <div key={index} className="space-y-4">
            <div
              className="flex items-center justify-between cursor-pointer"
              onClick={() => setExpandedId(expandedId === report.id ? null : report.id)}
            >
              <div className="flex items-center space-x-4">
                <Avatar>
                  {/* <AvatarImage src={report.avatar} /> */}
                  <AvatarFallback>II</AvatarFallback>
                </Avatar>
                <div>
                  <p className="text-sm font-medium">Name: {report.name}</p>
                  <p className="text-sm text-muted-foreground">
                    Total Tasks Completed: {report.completed_task_count} |
                    Total Hours Worked: {report.total_hours_count} Hrs
                  </p>
                </div>
              </div>
              {expandedId === report.id ? (
                <ChevronUp className="h-4 w-4" />
              ) : (
                <ChevronDown className="h-4 w-4" />
              )}
            </div>

            {expandedId === report.id && (
              <div className="pl-12 space-y-4">
                {report.reports.map((task: any) => (
                  <div key={task.id} className="border rounded-lg p-4">
                    <div className="grid grid-cols-4 gap-4 mb-4">
                      <div>
                        <p className="text-sm font-medium capitalize">{task.title}</p>
                      </div>
                      <div>
                        <p className="text-sm font-medium">Project</p>
                        <p className="text-sm text-muted-foreground">{task.project.title}</p>
                      </div>
                      <div>
                        <p className="text-sm font-medium">Time</p>
                        <p className="text-sm text-muted-foreground">{task.hours}</p>
                      </div>
                      <div>
                        <p className="text-sm font-medium">Status</p>
                        <p className="text-sm text-muted-foreground">{task.status}</p>
                      </div>
                    </div>
                    <div>
                      <p className="text-sm font-medium">Details</p>
                      <p className="text-sm text-muted-foreground">{task.details}</p>
                    </div>
                    {task.task_url_link && <div className="mt-2 flex">
                      <p className="text-sm font-medium mr-2">Link: </p>
                      <p className="text-sm text-muted-foreground">
                        <Link href={task.task_url_link} target="_blank">Open Link</Link>
                      </p>
                    </div>}
                    
                    <div className="flex gap-2 mt-4">
                      {/* Attachment Section */}
                      <div className="flex gap-2 mt-4 items-center">
                        {task.attachment ? (
                          <Link href={task.attachment} target="_blank">
                            <Image
                              src={task.attachment}
                              alt="Attachment Preview"
                              width={200}
                              height={200}
                              className="rounded"
                            />
                          </Link>
                        ) : (
                          <div className="w-16 h-16 bg-gray-300 rounded flex items-center justify-center">
                            <p className="text-center text-white">No Image</p>
                          </div>
                        )}
                        
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
        {dailyReports.length == 0 && <p className="text-center">Report Not Found</p>}
        {/* <div className="flex items-center justify-between pt-4 border-t">
          <p className="text-sm text-muted-foreground">
            Showing 1 To 9 Of 20 Entries
          </p>
          <div className="flex gap-2">
            <Button variant="outline" size="sm">1</Button>
            <Button variant="outline" size="sm">2</Button>
            <Button variant="outline" size="sm">→</Button>
          </div>
        </div> */}
      </CardContent>
    </Card>
  )
}

