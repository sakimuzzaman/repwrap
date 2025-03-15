

"use client"
import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import { CalendarIcon } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";
import { useDispatch } from "react-redux";
import { setTask } from "@/redux/taskSlice";
import { closeModal, processOn } from "@/redux/modalSlice"; // Import actions
import Image from "next/image";
import { Select, SelectTrigger, SelectContent, SelectGroup, SelectItem, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input"
import { useForm } from "react-hook-form";
import { Textarea } from "../ui/textarea"
import axiosInstance from "@/lib/axios";
import { useSelector } from "react-redux";
import { toast } from "react-hot-toast";

interface FormData {
  title: string;
  description: string;
  complete_time_minutes: number;
  status: string;
  assigned_to: number;
  startDate: string;
  completed_time: string;
}

interface TeamMember {
  id: number;
  name: string;
  profile_photo_url?: string;
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
  const [open, setOpen] = useState(false);
  const [teams, setTeams] = useState<TeamMember[]>([]);
  const { register, setValue, handleSubmit, watch, formState: { errors, isSubmitting } } = useForm<FormData>();
  const task = useSelector((state: any) => state.task.task);
  const dispatch = useDispatch();

  const statuses = ['backlog', 'pending', 'running', 'completed', 'On hold', 'canceled', 'failed', 'review'];

  const startDateValue = watch("startDate");
  const completedTimeValue = watch("completed_time");
  let assignedToIdW: any = watch("assigned_to");
  let assignedToId: any = assignedToIdW?.id ?? assignedToIdW;

  const startDate = startDateValue ? new Date(startDateValue) : undefined;
  const completedTime = completedTimeValue ? new Date(completedTimeValue) : undefined;
  
  const handelSelectedMember = (value: any) => {
    setValue("assigned_to", Number(value))

    let tem = teams.find(m => m.id === Number(value));
    assignedToId = tem?.id
  }

  const fetchTeams = async () => {
    try {
      const response = await axiosInstance.get("/task/team/members");
      setTeams(response.data?.data || []);
    } catch (err) {
      toast.error("Failed to fetch team members");
    }
  };

  useEffect(() => {
    fetchTeams();
    if (task) {
      setValue("title", task.title);
      setValue("description", task.description);
      setValue("complete_time_minutes", task.complete_time_minutes);
      setValue("status", task.status);
      setValue("assigned_to", task.assigned_to);
      if (task.startDate) setValue("startDate", task.startDate);
      if (task.completed_time) setValue("completed_time", task.completed_time);
    }
  }, [task, setValue]);

  const handleTimeChange = (
    field: "startDate" | "completed_time",
    type: "hour" | "minute" | "ampm",
    value: string,
    currentDate: Date | undefined
  ) => {
    if (!currentDate) return;

    const newDate = new Date(currentDate);

    switch (type) {
      case "hour":
        const hour = parseInt(value);
        const isPM = newDate.getHours() >= 12;
        newDate.setHours(isPM ? hour + 12 : hour);
        break;
      case "minute":
        newDate.setMinutes(parseInt(value));
        break;
      case "ampm":
        const hours = newDate.getHours();
        if (value === "PM" && hours < 12) {
          newDate.setHours(hours + 12);
        } else if (value === "AM" && hours >= 12) {
          newDate.setHours(hours - 12);
        }
        break;
    }

    setValue(field, newDate.toISOString());
  };

  const onSubmit = async (data: FormData) => {
    
    try {
      const payload = {
        ...data,
        complete_time_minutes: Number(data.complete_time_minutes),
        assigned_to: typeof (data.assigned_to) === 'object' ? Number((data.assigned_to as TeamMember).id) : Number(data.assigned_to),
        card_id: task?.id || undefined,
      };

      const response = await axiosInstance.post(`/task/update/${task?.id}`, payload);

      dispatch(setTask(response.data));
      dispatch(processOn("taskCard"))
      toast.success(`Task ${task ? 'updated' : 'created'} successfully`);
      setOpen(false);
    } catch (error) {
      toast.error("Failed to save task");
    }
  };

  const { taskCard } = useSelector((state: any) => state.modal.modals);

  useEffect(() => {

    if (taskCard && typeof taskCard == 'number') {
      setOpen(true)
    }

  }, [taskCard])


  useEffect(() => {
    if (!open) {
      dispatch(closeModal("taskCard"))
    }
  }, [open])


  const taskDelete = async (id: any) => {
    if (confirm('Are you sure you want to delete this task?')) {
      try {
        const response = await axiosInstance.post("/tasks/delete/" + id);
        if (response?.data?.code === 200) {
          toast.success(response.data.message);
          // dispatch(setTask(response.data));
          dispatch(processOn("taskCard"))
          setOpen(false);

        } else {
          toast.error("Failed to delete the task.");
        }
      } catch (error) {
        toast.error("An error occurred while deleting the task.");
      }
    }
  }


  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-[1080px] sm:max-h-[450px]">
        <DialogHeader className="mt-6">
          <DialogTitle>
            <div className="grid gap-2">
              <Input
                {...register("title", { required: "Title is required" })}
                placeholder="Enter task title"
              />
              {errors.title && <p className="text-red-500 text-xs">{errors.title.message}</p>}

              <Select
                value={watch("status")}
                onValueChange={(value) => setValue("status", value)}
                required
              >
                <SelectTrigger className="w-[120px] capitalize" >
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    {statuses.map((status) => (
                      <SelectItem key={status} value={status} className="capitalize">
                        {status}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
              {errors.status && <p className="text-red-500 text-xs">{errors.status.message}</p>}
            </div>
          </DialogTitle>
        </DialogHeader>

        <div className="flex justify-between gap-4">
          <div className="w-full">
            <Textarea
              {...register("description", { required: "Description is required" })}
              placeholder="Task description"
            />
            {errors.description && <p className="text-red-500 text-xs">{errors.description.message}</p>}

            <div className="flex gap-4 mt-4">
              <div className="flex-1">
                <Input
                  {...register("complete_time_minutes", {
                    // required: "Estimation time is required",
                    // min: { value: 1, message: "Minimum 1 minute" }
                  })}
                  type="number"
                  placeholder="Estimation time (minutes)"
                />
                {errors.complete_time_minutes && <p className="text-red-500 text-xs">{errors.complete_time_minutes.message}</p>}
              </div>

              <div className="flex-1">
                <TimePicker
                  selectedDate={startDate}
                  onSelectDate={(date) => setValue("startDate", date?.toISOString() || "")}
                  onChangeTime={(type, value) =>
                    handleTimeChange("startDate", type, value, startDate)
                  }
                  placeholder="Start Date & Time"
                />
                {errors.startDate && <p className="text-red-500 text-xs">Start date is required</p>}
              </div>

              <div className="flex-1">
                <TimePicker
                  selectedDate={completedTime}
                  onSelectDate={(date) => setValue("completed_time", date?.toISOString() || "")}
                  onChangeTime={(type, value) =>
                    handleTimeChange("completed_time", type, value, completedTime)
                  }
                  placeholder="Complete Date & Time"
                />
              </div>
            </div>
          </div>

          <div className="w-64">
            <div className="flex gap-4 items-center mb-4">
              <Image
                src={teams.find((member) => member.id === assignedToId)?.profile_photo_url || "/profile_img.png"}
                alt="Profile"
                width={40}
                height={40}
                className="rounded-full"
              />
              <p>{teams.find((member) => member.id === assignedToId)?.name || "Unassigned"}</p>
            </div>
            {assignedToId === undefined || assignedToId == null && <p className="font-bold text-yellow-400">Need to Assign This Card</p>}    <Select
              value={String(assignedToId)}
              onValueChange={(value) => handelSelectedMember(value)}
            >
              <SelectTrigger className="capitalize">
                <SelectValue placeholder="Assign to" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  {teams.map((member) => (
                    <SelectItem key={member.id} value={String(member.id)}>
                      <div className="flex items-center gap-2">
                        <Image
                          src={member?.profile_photo_url || "/profile_img.png"}
                          alt={member.name}
                          width={24}
                          height={24}
                          className="rounded-full"
                        />
                        <span>{member.name}</span>
                      </div>
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
            {errors.assigned_to && <p className="text-red-500 text-xs">{errors.assigned_to.message}</p>}
          </div>
        </div>

        <DialogFooter>
          <Button className="text-red-500" variant="outline" onClick={() => taskDelete(task?.id)}>
            Delete
          </Button>

          <Button variant="outline" onClick={() => setOpen(false)}>
            Cancel
          </Button>
          <Button
            className="w-1/6 bg-[#3D30EF] hover:bg-[#2B1FED]"
            disabled={isSubmitting}
            onClick={handleSubmit(onSubmit)}
          >
            {isSubmitting
              ? `${task ? "Updating..." : "Creating..."}`
              : `${task ? "Update" : "Create"} Task`}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
