"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import axiosInstance from "@/lib/axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const formSchema = z.object({
  title: z.string().min(2).max(50),
  details: z.string().min(10),
  status: z.string(),
  hours: z.string(),
  project_id: z.string(),
  task_url_link: z.string().url(),
  attachment: z.any().optional(),
});

export default function NewReportPage() {
  const [projects, setProjects] = useState<{ id: number; name: string }[]>([]);
  const [reports, setReports] = useState([{ id: Date.now(), data: {} }]);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await axiosInstance.get("/projects");
        setProjects(response.data?.data || []);
      } catch (error) {
        toast.error("Failed to fetch projects");
      }
    };

    fetchProjects();
  }, []);

  const addNewReport = () => {
    setReports([...reports, { id: Date.now(), data: {} }]);
  };

  const removeReport = (id: number) => {
    setReports(reports.filter((report) => report.id !== id));
  };

  const updateReportData = (id: number, newData: any) => {
    setReports((prevReports) =>
      prevReports.map((report) =>
        report.id === id ? { ...report, data: { ...report.data, ...newData } } : report
      )
    );
  };

  const submitAllReports = async () => {
    const formData = new FormData();

    reports.forEach((report, index) => {
      Object.entries(report.data).forEach(([key, value]) => {
        if (key === "attachment" && value instanceof File) {
          formData.append(`reports[${index}][${key}]`, value);
        } else {
          formData.append(`reports[${index}][${key}]`, value as string);
        }
      });
    });

    try {
      await axiosInstance.post("/daily-work-reports", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      toast.success("Reports submitted successfully!");
      setReports([{ id: Date.now(), data: {} }]);
    } catch (error) {
      toast.error("Failed to submit reports!");
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-6">Daily Report</h2>
      {reports.map((report: any, index) => (
        <div key={report.id}>
          <h3 className="text-lg font-semibold mb-2">Task {index + 1}</h3>

          <ReportForm
            projects={projects}
            onRemove={() => removeReport(report.id)}
            onUpdate={(newData) => updateReportData(report.id, newData)}
            index={index}
          />
        </div>

      ))}
      <div className="flex gap-2 mt-4">
        <Button type="button" onClick={addNewReport}>
          Add New Report
        </Button>
        <Button type="button" className="bg-green-600" onClick={submitAllReports}>
          Submit All Reports
        </Button>
      </div>
    </div>
  );
}

function ReportForm({
  projects,
  onRemove,
  onUpdate,
  index
}: {
  projects: { id: number; name: string }[];
  onRemove: () => void;
  onUpdate: (data: any) => void;
  index: Number;
}) {
  const [preview, setPreview] = useState<string | null>(null);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      details: "",
      status: "in-progress",
      hours: "",
      project_id: "",
      task_url_link: "",
      attachment: null,
    },
  });

  function onFormChange() {
    onUpdate(form.getValues());
  }

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (file) {
      form.setValue("attachment", file);
      setPreview(URL.createObjectURL(file));
      onUpdate({ attachment: file });
    }
  }

  return (
    <Form {...form}>
      <form
        onChange={onFormChange}
        className="space-y-6 border p-4 rounded-md mb-4"
      >
        <FormField control={form.control} name="title" render={({ field }) => (
          <FormItem>
            <FormLabel>Task Title</FormLabel>
            <FormControl><Input placeholder="Enter task title" {...field} /></FormControl>
            <FormMessage />
          </FormItem>
        )} />

        <FormField control={form.control} name="details" render={({ field }) => (
          <FormItem>
            <FormLabel>Details</FormLabel>
            <FormControl><Textarea placeholder="Task details..." className="resize-none" {...field} /></FormControl>
            <FormMessage />
          </FormItem>
        )} />

        <FormField control={form.control} name="task_url_link" render={({ field }) => (
          <FormItem>
            <FormLabel>Task URL Link</FormLabel>
            <FormControl><Input type="url" placeholder="Enter task URL" {...field} /></FormControl>
            <FormMessage />
          </FormItem>
        )} />

        <div className="flex justify-between">
          <FormField control={form.control} name="status" render={({ field }) => (
            <FormItem>
              <FormLabel>Status</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl><SelectTrigger><SelectValue placeholder="Select status" /></SelectTrigger></FormControl>
                <SelectContent>
                  <SelectItem value="in-progress">In Progress</SelectItem>
                  <SelectItem value="complete">Completed</SelectItem>
                  <SelectItem value="blocked">Blocked</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )} />

          <FormField control={form.control} name="project_id" render={({ field }) => (
            <FormItem>
              <FormLabel>Project</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl><SelectTrigger><SelectValue placeholder="Select project" /></SelectTrigger></FormControl>
                <SelectContent>
                  {projects.map(project => <SelectItem key={project.id} value={project.id.toString()}>{project.name}</SelectItem>)}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )} />

          <FormField control={form.control} name="hours" render={({ field }) => (
            <FormItem>
              <FormLabel>Hours</FormLabel>
              <FormControl>
                <Input type="number" placeholder="Enter hours" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )} />
        </div>
       

        <FormField control={form.control} name="attachment" render={() => (
          <FormItem>
            <FormLabel>Attachment</FormLabel>
            <FormControl>
              <Input type="file" accept="image/*" onChange={handleFileChange} />
            </FormControl>
            {preview && <img src={preview} alt="Preview" className="mt-2 w-32 h-32 object-cover" />}
            <FormMessage />
          </FormItem>
        )} />

        {index != 0 && <Button type="button" onClick={onRemove} className="ml-2 bg-red-500">Remove</Button>} 
      </form>
    </Form>
  );
}
