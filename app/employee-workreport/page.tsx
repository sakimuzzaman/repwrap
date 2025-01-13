"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"

import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
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
import { DatePicker } from "@/components/employee-workreport/DatePicker"
import { Label } from "@/components/ui/label"


const formSchema = z.object({
  title: z.string().min(2).max(50),
  details: z.string().min(10),
  status: z.string(),
  hours: z.string(),
})

export default function NewReportPage() {
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

        <div>
          <h2 className="text-2xl font-bold mb-6">Daily Report</h2>
          <h2 className="text-xl font-medium mb-6 -mt-4">Date : 10/12/2024</h2>
        </div>

        <DatePicker />

      </div>

      <Card className="w-857px h-[500px] p-10">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem className="rounded-2xl">
                  <FormLabel>Task</FormLabel>
                  <FormControl>
                    <Input placeholder="write your task name here" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="details"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Details</FormLabel>
                  <FormControl className="rounded-2xl">
                    <Textarea
                      placeholder="Please provide task details..."
                      className="resize-none"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="grid grid-cols-3 gap-4">
              <FormField
                control={form.control}
                name="status"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Status</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select status" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="in-progress">In Progress</SelectItem>
                        <SelectItem value="completed">Completed</SelectItem>
                        <SelectItem value="blocked">Blocked</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="hours"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Hours Spent</FormLabel>
                    <FormControl>
                      <Input type="number" placeholder="0" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="status"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Status</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select status" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="in-progress">In Progress</SelectItem>
                        <SelectItem value="completed">Completed</SelectItem>
                        <SelectItem value="blocked">Blocked</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

         
                <div className="grid w-full max-w-sm mt-6 gap-1.5">
                  <Label htmlFor="picture">Attachment </Label>
                  <Input id="picture" type="file" />
                </div>

                
                
               

            </div>

          </form>

        </Form>
      </Card>

      <div className="flex flex-col justify-center items-center gap-4 mt-8">
        <Button variant="secondary" className="w-[198px] rounded-3xl items-center">+ Add new Report</Button>
        <Button variant="secondary" className="w-[139px]  rounded-lg items-center">Submit</Button>
      </div>
    </div>
  )
}
