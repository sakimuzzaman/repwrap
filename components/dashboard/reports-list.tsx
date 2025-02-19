"use client";

import { useEffect, useState } from "react";
import { Search, ChevronDown, ChevronUp } from 'lucide-react';
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { WeekDays } from "../reports/week-days";
import axiosInstance from "@/lib/axios";
import Link from "next/link";

import * as React from "react"
import { format } from "date-fns"
import { CalendarIcon } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

export function ReportsList() {
  const [expandedId, setExpandedId] = useState<number | null>(1);
  const [dailyReports, setDailyReports] = useState<any>([]);
  const [date, setDate] = useState<any>();
  const [search, setSearch] = useState<string>('');

  useEffect(() => {
    // Fetch reports whenever search or date changes
    const fetchReports = async () => {
      try {
        const response = await axiosInstance.get('/admin-daily-work-reports', {
          params: {
            search: search || "",
            date: date || "", // Passing selected date as a query parameter
          },
        });

        setDailyReports(response.data.data); // Store the fetched data in state
      } catch (error) {
        console.error('Error fetching reports:', error);
      }
    };

    fetchReports();
  }, [search, date]); // Re-fetch reports when search or date changes

  return (
    <Card>
      <CardHeader>
        <div className="">
          <h2 className="text-2xl font-bold mb-3 text-[#010136] dark:text-[#FFFFFF]">Work Report</h2>
          <div className="flex justify-between items-center">
            <div>
              {date ? <p className="text-2xl mb-3">{new Date(date).toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</p>
                :
                <p className="text-2xl mb-3">
                  {new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
                </p>
              }
            </div>
            <div className="mb-4">
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant={"outline"}
                    className={cn(
                      "w-[280px] justify-start text-left font-normal",
                      !date && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon />
                    {date ? format(date, "PPP") : <span>Pick a date</span>}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={date}
                    onSelect={setDate}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>
          </div>

        </div>
        <div>
          <WeekDays onDateChange={(date: string) => setDate(date)} />
        </div>
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
                            <img
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
      </CardContent>
    </Card>
  );
}
