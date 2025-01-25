"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"

import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Card } from "@/components/ui/card"
import { Label } from "@/components/ui/label"

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

import { Calendar } from "@/components/ui/calendar"
import { format } from "date-fns"
import { CalendarIcon } from "lucide-react"

import { cn } from "@/lib/utils"

import axiosInstance from "@/lib/axios";
import { useEffect, useState } from "react";


const formSchema = z.object({
  title: z.string().min(2).max(50),
  details: z.string().min(10),
  status: z.string(),
  hours: z.string(),
})

export default function NewReportPage() {

  const [leaves, setLeaves] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [fromdate, setFromDate] = useState<Date>();
  const [todate, setToDate] = useState<Date>();

  const fetchLeaves = async () => {
    try {
      const response = await axiosInstance.get("/leaves");

      setLeaves(response.data?.data || [])
      // setLeaves(response.data?.data);
      console.log("Fetched Leaves:", response.data?.data);
      setLoading(false);
    } catch (err) {
      setLoading(false);
    }
  };


  useEffect(() => {

    fetchLeaves();
    console.log('data')
  }, []);


  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      details: "",
      status: "in-progress",
      hours: "",
    },
  })

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values)
  }

  return (
    <div className="max-w-2xl mx-auto p-6">

      <div className="flex justify-between">

          <h2 className="text-2xl font-bold mb-6">Leave Application</h2>
      </div>

      <Card className="w-857px h-[550px] p-10">

          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem className="rounded-2xl">
                  <FormLabel>Leave Type</FormLabel>
                  <FormControl>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Leave Type" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {leaves.map((leave: any, index: any) => (
                          <SelectItem key={index} value={leave?.type}>

                            {leave?.type}

                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-2 gap-4">
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant={"outline"}
                    className={cn(
                      "w-[240px] justify-start text-left font-normal",
                      !fromdate && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon />
                    {fromdate ? format(fromdate, "PPP") : <span>From date</span>}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={fromdate}
                    onSelect={setFromDate}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>

 
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant={"outline"}
                    className={cn(
                      "w-[240px] justify-start text-left font-normal",
                      !todate && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon />
                    {todate ? format(todate, "PPP") : <span>To Date</span>}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={todate}
                    onSelect={setToDate}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
              
            </div>


            <FormField
              control={form.control}
              name="details"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Reason</FormLabel>
                  <FormControl className="rounded-2xl">
                    <Textarea
                      placeholder="Please share what did you do today. If you reply by midnight, your response will be recorded!"
                      className="resize"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}

            />

            <div>
              <Label htmlFor="picture">Attachment </Label>
              <Input id="picture" type="file" />
            </div>

            <div className="flex justify-center">
              <Button variant="secondary" className=" rounded-lg items-center">Submit</Button>
            </div>



            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="grid grid-cols-2 gap-4 py-4">
            {/* Leave Type Dropdown */}
            <div className="grid gap-2">
              <Label htmlFor="name">Leave Type</Label>
              <select
                {...register("type", { required: "Leave type is required" })}
                className="border rounded p-2"
              >
                {leaveTypes.map((type) => (
                  <option key={type} value={type}>
                     {type.charAt(0).toUpperCase() + type.slice(1)}
                  </option>
                ))}
              </select>
              {errors.type && (
                <p className="text-sm text-red-600">{errors.type.message}</p>
              )}
            </div>

            {/* Unit Dropdown */}
            <div className="grid gap-2">
              <Label htmlFor="unit">Unit</Label>
              <select
                {...register("unit", { required: "Unit is required" })}
                value={unit}
                onChange={(e) => setUnit(e.target.value)}
                className="border rounded p-2"
              >
                <option value="day">Day</option>
                <option value="hours">Hour</option>
              </select>
              {errors.unit && (
                <p className="text-sm text-red-600">{errors.unit.message}</p>
              )}
            </div>
          </div>

          {/* Conditional Input Field */}
          {unit === "day" && (
            <div className="grid gap-2">
              <Label htmlFor="additionalField">Days</Label>
              <Input
                type="text"
                placeholder="Enter number of days"
                {...register("days", {
                  required: unit === "day" ? "Days are required" : false,
                })}
              />
              {errors.days && (
                <p className="text-sm text-red-600">
                  {errors.days.message}
                </p>
              )}
            </div>
          )}
          {unit === "hours" && (
            <div className="grid gap-2">
              <Label htmlFor="additionalField">Hours</Label>
              <Input
                type="text"
                placeholder="Enter number of hours"
                {...register("hours", {
                  required: unit === "hours" ? "Hours are required" : false,
                })}
              />
              {errors.hours && (
                <p className="text-sm text-red-600">
                  {errors.hours.message}
                </p>
              )}
            </div>
          )}

          

          {/* Status Dropdown */}
          <div className="grid gap-2">
            <Label htmlFor="status">Status</Label>
            <select
              {...register("status", { required: "Status is required" })}
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="border rounded p-2"
            >
              <option value="1">Active</option>
              <option value="0">Inactive</option>
            </select>
            {errors.status && (
              <p className="text-sm text-red-600">{errors.status.message}</p>
            )}
          </div>

          <DialogFooter>
            <div className="flex justify-end gap-4">
              <Button variant="outline" onClick={() => setOpen(false)}>
                Cancel
              </Button>
              <Button
                className="w-full"
                type="submit"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Creating..." : "Create"}
              </Button>
            </div>
          </DialogFooter>
        </form>

          </form>

        




      </Card>


    </div>
  )
}
