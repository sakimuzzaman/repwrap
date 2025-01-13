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
          <h2 className="text-2xl font-bold mb-6">Leave Application</h2>
         
        </div>

    

      </div>

      <Card className="w-857px h-[500px] p-10">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem className="rounded-2xl">
                  <FormLabel>Leave Type</FormLabel>
                  <FormControl>
                    <Input placeholder="Casual (total 7, taken 4, remaining 3)" className="w-1/2" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>

               
              )}
            />

<div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="status"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>From Date</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select status" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="in-progress">28-11-2024</SelectItem>
                        <SelectItem value="completed">05-01-2025</SelectItem>
                        <SelectItem value="blocked">07-31-2025</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
             
             <FormField
                control={form.control}
                name="status"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>To Date</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select status" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="in-progress">28-11-2024</SelectItem>
                        <SelectItem value="completed">05-02-2025</SelectItem>
                        <SelectItem value="blocked">07-31-2025</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

         

                
                
               

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
            <div className="flex justify-end  gap-4 mt-8">
        
        <Button variant="secondary" className="w-[139px]  rounded-lg items-center">Submit</Button>
      </div>
            
          </form>

        </Form>
      </Card>

      
    </div>
  )
}