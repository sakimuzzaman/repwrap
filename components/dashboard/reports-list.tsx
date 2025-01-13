"use client"

import { useState } from "react"
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

  return (
    <Card>
      <CardHeader>
       <WeekDays />
        <div className="relative">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search by Team Members Name"
            className="pl-8"
          />
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {reports.map((report) => (
          <div key={report.id} className="space-y-4">
            <div 
              className="flex items-center justify-between cursor-pointer"
              onClick={() => setExpandedId(expandedId === report.id ? null : report.id)}
            >
              <div className="flex items-center space-x-4">
                <Avatar>
                  <AvatarImage src={report.avatar} />
                  <AvatarFallback>{report.initials}</AvatarFallback>
                </Avatar>
                <div>
                  <p className="text-sm font-medium">Name: {report.name}</p>
                  <p className="text-sm text-muted-foreground">
                    Total Tasks Completed: {report.tasksCompleted} | 
                    Total Hours Worked: {report.hoursWorked} Hrs
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
                {report.tasks.map((task) => (
                  <div key={task.id} className="border rounded-lg p-4">
                    <div className="grid grid-cols-4 gap-4 mb-4">
                      <div>
                        <p className="text-sm font-medium">Task {task.id}</p>
                        <p className="text-sm text-muted-foreground">{task.title}</p>
                      </div>
                      <div>
                        <p className="text-sm font-medium">Project</p>
                        <p className="text-sm text-muted-foreground">{task.project}</p>
                      </div>
                      <div>
                        <p className="text-sm font-medium">Time</p>
                        <p className="text-sm text-muted-foreground">{task.time}</p>
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
                    <div className="flex gap-2 mt-4">
                      <Button variant="outline" size="sm">
                        <Paperclip className="h-4 w-4 mr-2" />
                        File.Png
                      </Button>
                      <Button variant="outline" size="sm">
                        <Paperclip className="h-4 w-4 mr-2" />
                        File.Pdf
                      </Button>
                      <Button variant="outline" size="sm">
                        <Paperclip className="h-4 w-4 mr-2" />
                        File.Pdf
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
        <div className="flex items-center justify-between pt-4 border-t">
          <p className="text-sm text-muted-foreground">
            Showing 1 To 9 Of 20 Entries
          </p>
          <div className="flex gap-2">
            <Button variant="outline" size="sm">1</Button>
            <Button variant="outline" size="sm">2</Button>
            <Button variant="outline" size="sm">→</Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

