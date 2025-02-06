

"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import { CalendarIcon } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";
import { useDispatch } from "react-redux";
import { setTask } from "@/redux/taskSlice";

import Image from "next/image";
import { Select, SelectTrigger, SelectContent, SelectGroup, SelectLabel, SelectItem, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

import { useForm } from "react-hook-form";
import { Textarea } from "../ui/textarea"
import axiosInstance from "@/lib/axios";
import { useSelector } from "react-redux";



interface FormData {
  card_id: Number;
  title: string;
  description: string;
  point: Number;
  status: string;
  assigned_to: Number;
  startDate: string;
  completed_time: string;
}


const TimePicker = ({
  selectedDate,
  onSelectDate,
  onChangeTime,
  placeholder,
}: {
  selectedDate?: Date;
  onSelectDate: (date?: Date) => void;
  onChangeTime: (type: "hour" | "minute" | "ampm", value: string) => void;
  placeholder: string;
}) => {
  const hours = Array.from({ length: 12 }, (_, i) => i + 1);

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          className={cn(
            "w-full justify-start text-left font-normal",
            !selectedDate && "text-muted-foreground"
          )}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {selectedDate ? format(selectedDate, "MM/dd/yyyy hh:mm aa") : placeholder}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0">
        <div className="sm:flex">
          <Calendar mode="single" selected={selectedDate} onSelect={onSelectDate} initialFocus />
          <div className="flex flex-col sm:flex-row sm:h-[300px] divide-y sm:divide-y-0 sm:divide-x">
            <ScrollArea className="w-64 sm:w-auto">
              <div className="flex sm:flex-col p-2">
                {hours.reverse().map((hour) => (
                  <Button
                    key={hour}
                    size="icon"
                    variant={
                      selectedDate && selectedDate.getHours() % 12 === hour % 12
                        ? "default"
                        : "ghost"
                    }
                    onClick={() => onChangeTime("hour", hour.toString())}
                  >
                    {hour}
                  </Button>
                ))}
              </div>
              <ScrollBar orientation="horizontal" className="sm:hidden" />
            </ScrollArea>
            <ScrollArea className="w-64 sm:w-auto">
              <div className="flex sm:flex-col p-2">
                {Array.from({ length: 12 }, (_, i) => i * 5).map((minute) => (
                  <Button
                    key={minute}
                    size="icon"
                    variant={
                      selectedDate && selectedDate.getMinutes() === minute
                        ? "default"
                        : "ghost"
                    }
                    onClick={() => onChangeTime("minute", minute.toString())}
                  >
                    {minute}
                  </Button>
                ))}
              </div>
              <ScrollBar orientation="horizontal" className="sm:hidden" />
            </ScrollArea>
            <ScrollArea>
              <div className="flex sm:flex-col p-2">
                {["AM", "PM"].map((ampm) => (
                  <Button
                    key={ampm}
                    size="icon"
                    variant={
                      selectedDate &&
                        ((ampm === "AM" && selectedDate.getHours() < 12) ||
                          (ampm === "PM" && selectedDate.getHours() >= 12))
                        ? "default"
                        : "ghost"
                    }
                    onClick={() => onChangeTime("ampm", ampm)}
                  >
                    {ampm}
                  </Button>
                ))}
              </div>
            </ScrollArea>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
};



export function CardModal() {
  const [open, setOpen] = useState(true)

  const [teams, setTeams] = useState<any>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [selectedMember, setSelectedMember] = useState<any>(teams[0]?.name || "");

  const [startDate, setStartDate] = useState<Date>();
  const [completeDate, setCompleteDate] = useState<Date>();
  const { register, setValue, handleSubmit, watch, formState: { errors, isSubmitting } } = useForm<FormData>();
  const task = useSelector((state: any) => state.task.task);

  const dispatch = useDispatch();

  const handleSelectChange = (value: string) => {
    setSelectedMember(value);
  };


  const handleTimeChange = (
    dateSetter: React.Dispatch<React.SetStateAction<Date | undefined>>,
    type: "hour" | "minute" | "ampm",
    value: string
  ) => {
    if (!startDate) return;
    const newDate = new Date(startDate);
    if (type === "hour") {
      newDate.setHours((parseInt(value) % 12) + (newDate.getHours() >= 12 ? 12 : 0));
    } else if (type === "minute") {
      newDate.setMinutes(parseInt(value));
    } else if (type === "ampm") {
      const currentHours = newDate.getHours();
      newDate.setHours(value === "PM" ? currentHours + 12 : currentHours - 12);
    }
    dateSetter(newDate);
  };

  useEffect(() => {
    if (!open) {
      dispatch(setTask(null));
    }
  }, [open])

  const fetchteams = async () => {
    try {
      const response = await axiosInstance.get("/admin/team/members");

      setTeams(response.data?.data || [])

      // setLeaves(response.data?.data);
      console.log("Fetched team members:", response.data?.data);
      setLoading(false);
    } catch (err) {
      setLoading(false);
    }
  };

  useEffect(() => {

    fetchteams();


    setValue("title", task.title || "");
    setValue("description", task.description || "");
    setValue("point", task.point || 0);
    setValue("status", task.status || "");
    setValue("assigned_to", task.assigned_to || "");
    setValue("startDate", task.complete_time || "");
  }, []);
  const selectedStatus = watch("status");

  const onSubmit = (data: FormData) => {
    console.log("Form submitted:", data);
    setOpen(false);
  };
  const statuses = ['backlog', 'pending', 'running', 'completed', 'On hold', 'canceled', 'failed', 'review'];

  return (


    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-[1080px] sm:max-h-[450px]">
        <DialogHeader>
          <DialogTitle>
            <div className="grid gap-2">
              <Input className="mt-4" {...register("title")} placeholder="Enter your project title" />
              <Select value={selectedStatus} onValueChange={(value) => setValue("status", value)}>
                <SelectTrigger className="w-[120px]">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>

                    {statuses.map((status: string, index: number) => (
                      <SelectItem key={index} value={status}>
                        {status}
                      </SelectItem>
                    ))}

                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
          </DialogTitle>
        </DialogHeader>

        <div className="flex justify-between gap-4">
          <div className="w-full">
            <Textarea {...register("description")} placeholder="Enter your task description" />
            <div className="flex gap-4">

              <div>
                <Input {...register("point")} className="mt-4" type="number" placeholder="Estimation time" />
                <p className="text-yellow-500 text-xs -mb-4">Note: Calculate estimated time in munite</p>
              </div>

              <div className="mt-4">
                <TimePicker
                  selectedDate={startDate}
                  onSelectDate={(date:any) => setValue("startDate", date)}
                  onChangeTime={(type, value) => handleTimeChange(setStartDate, type, value)}
                  placeholder="Started Date and Time"
                />
              </div>

              <div className="mt-4" >
                <TimePicker
                  selectedDate={completeDate}
                  onSelectDate={setCompleteDate}
                  onChangeTime={(type, value) => handleTimeChange(setCompleteDate, type, value)}
                  placeholder="Completed Date and Time"
                />
              </div>

            </div>
          </div>

          <div className="">
            <div className="flex gap-4">
              <Image src="/profile_img.png" alt="Profile" width={35} height={45} />
              <p className="mt-1">{selectedMember}</p>
            </div>
            <hr className="my-4" />

            <Select onValueChange={handleSelectChange}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Assign" />
              </SelectTrigger>
              <SelectContent>

                <SelectGroup>
                  {teams.map((member: any) => (
                    <SelectItem value={member.name} >
                      <div className="font-medium">{member.name}</div>
                    </SelectItem>
                  ))}

                </SelectGroup>
              </SelectContent>

            </Select>

          </div>

        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => setOpen(false)}>
            Cancel
          </Button>
          <Button className="w-1/6" type="button" onClick={handleSubmit(onSubmit)}>
            {isSubmitting ? "Creating Task..." : "Updated Task"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>

  )
}







