

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
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { format } from "date-fns";
import { Calendar } from "@/components/ui/calendar"
import { cn } from "@/lib/utils"
import { CalendarIcon } from "lucide-react"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";


import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

import { useForm } from "react-hook-form";
import { Textarea } from "../ui/textarea"
import Image from "next/image"

interface CardProps {
  // children: React.ReactNode
  cardId: string;
}

interface FormData {
  card_id: Number;
  title: string;
  description: string;
  point: Number;
}


export function CardModalDemo({ cardId }: any) {
  const [open, setOpen] = useState(true)


  // date and time picker start here

  const [startDate, setStartDate] = useState<Date>();
  const [completeDate, setCompletingDate] = useState<Date>();
  const [isOpenS, setIsOpenS] = useState(false);
  const [isOpenC, setIsOpenC] = useState(false);

  const hours = Array.from({ length: 12 }, (_, i) => i + 1);





  const handleStartDateSelect = (selectedDate: Date | undefined) => {
    if (selectedDate) {
      setStartDate(selectedDate);
    }
  };

  const handleStartingTimeChange = (
    type: "hour" | "minute" | "ampm",
    value: string
  ) => {
    if (startDate) {
      const newDate = new Date(startDate);
      if (type === "hour") {
        newDate.setHours(
          (parseInt(value) % 12) + (newDate.getHours() >= 12 ? 12 : 0)
        );
      } else if (type === "minute") {
        newDate.setMinutes(parseInt(value));
      } else if (type === "ampm") {
        const currentHours = newDate.getHours();
        newDate.setHours(
          value === "PM" ? currentHours + 12 : currentHours - 12
        );
      }
      setStartDate(newDate);
    }
  };




  const handleCompletingDateSelect = (selectedDate: Date | undefined) => {
    if (selectedDate) {
      setCompletingDate(selectedDate);
    }
  };

  const handleCompletingTimeChange = (
    type: "hour" | "minute" | "ampm",
    value: string
  ) => {
    if (completeDate) {
      const newDate = new Date(completeDate);
      if (type === "hour") {
        newDate.setHours(
          (parseInt(value) % 12) + (newDate.getHours() >= 12 ? 12 : 0)
        );
      } else if (type === "minute") {
        newDate.setMinutes(parseInt(value));
      } else if (type === "ampm") {
        const currentHours = newDate.getHours();
        newDate.setHours(
          value === "PM" ? currentHours + 12 : currentHours - 12
        );
      }
      setCompletingDate(newDate);
    }
  };



  // date and time picker end here


  const [estimatedTime, setEstimatedTime] = useState<any>('');


  const handleEstimedTimeChange = (event: any) => {
    setEstimatedTime(event.target.value);
  };



  const { register, handleSubmit, watch, formState: { errors, isSubmitting } } = useForm<FormData>();



  //   useEffect(() => {

  //     const fetchLeaveTypes = async () => {
  //       try {
  //         const response = await axiosInstance.get("/projects");
  //         setProjects(response.data?.data || []);
  //       } catch (error) {
  //         toast.error("Failed to fetch leave types");
  //       }
  //     };

  //     fetchLeaveTypes();

  //   }, []);



  //   const onSubmit = async (data: FormData) => {
  //     console.log("dasdasd")

  //     try {
  //       const response = await axiosInstance.post("task/create", {
  //         project_id: data.project_id,
  //         title: data.title,
  //         description: data.description

  //       });


  //       if (response?.data?.code == 201) {
  //         toast.success(response.data.message);
  //         setOpen(false)
  //       }
  //     } catch (error: any) {
  //       toast.error(error.response?.data?.message || "Something went wrong!");
  //     }
  //   };



  return (
    <Dialog open={open} onOpenChange={setOpen}>

      <DialogContent className="sm:max-w-[1120px] sm:max-h-[450px]">


        <DialogHeader>

          <DialogTitle>

            <div className="grid gap-2">


              <Input
                className="outline-none "
                type="text"
                placeholder="Enter your project title"

              />

              <Select>
                <SelectTrigger className="w-[80px] h-[20px]">
                  <SelectValue placeholder="Todo" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>ToDo</SelectLabel>
                    <SelectItem value="apple">Task 1</SelectItem>
                    <SelectItem value="banana">Task 2</SelectItem>
                    <SelectItem value="blueberry">Task 3</SelectItem>

                  </SelectGroup>
                </SelectContent>
              </Select>



            </div>

            <br />

          </DialogTitle>
          <DialogDescription>

          </DialogDescription>
        </DialogHeader>


        <div className="flex justify-between">

          <div className="grid gap-4 py-4">


            <div className="grid gap-2">

              <Label htmlFor="name">Task Description</Label>

              <Textarea

                placeholder="Enter your task description"

              />

              <div className="flex gap-4">

                <Input
                  className="w-1/2"
                  type="text"
                  placeholder="Estimation time"

                />



                <Popover open={isOpenS} onOpenChange={setIsOpenS}>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn(
                        "w-full justify-start text-left font-normal",
                        !startDate && "text-muted-foreground"
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {startDate ? (
                        format(startDate, "MM/dd/yyyy hh:mm aa")
                      ) : (
                        <span>Started Date and Time</span>
                      )}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <div className="sm:flex">
                      <Calendar
                        mode="single"
                        selected={startDate}
                        onSelect={handleStartDateSelect}
                        initialFocus
                      />
                      <div className="flex flex-col sm:flex-row sm:h-[300px] divide-y sm:divide-y-0 sm:divide-x">
                        <ScrollArea className="w-64 sm:w-auto">
                          <div className="flex sm:flex-col p-2">
                            {hours.reverse().map((hour) => (
                              <Button
                                key={hour}
                                size="icon"
                                variant={
                                  startDate && startDate.getHours() % 12 === hour % 12
                                    ? "default"
                                    : "ghost"
                                }
                                className="sm:w-full shrink-0 aspect-square"
                                onClick={() => handleStartingTimeChange("hour", hour.toString())}
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
                                  startDate && startDate.getMinutes() === minute
                                    ? "default"
                                    : "ghost"
                                }
                                className="sm:w-full shrink-0 aspect-square"
                                onClick={() =>
                                  handleStartingTimeChange("minute", minute.toString())
                                }
                              >
                                {minute}
                              </Button>
                            ))}
                          </div>
                          <ScrollBar orientation="horizontal" className="sm:hidden" />
                        </ScrollArea>
                        <ScrollArea className="">
                          <div className="flex sm:flex-col p-2">
                            {["AM", "PM"].map((ampm) => (
                              <Button
                                key={ampm}
                                size="icon"
                                variant={
                                  startDate &&
                                    ((ampm === "AM" && startDate.getHours() < 12) ||
                                      (ampm === "PM" && startDate.getHours() >= 12))
                                    ? "default"
                                    : "ghost"
                                }
                                className="sm:w-full shrink-0 aspect-square"
                                onClick={() => handleStartingTimeChange("ampm", ampm)}
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


                <Popover open={isOpenC} onOpenChange={setIsOpenC}>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn(
                        "w-full justify-start text-left font-normal",
                        !completeDate && "text-muted-foreground"
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {completeDate ? (
                        format(completeDate, "MM/dd/yyyy hh:mm aa")
                      ) : (
                        <span>Completed Date and Time</span>
                      )}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <div className="sm:flex">
                      <Calendar
                        mode="single"
                        selected={completeDate}
                        onSelect={handleCompletingDateSelect}
                        initialFocus
                      />
                      <div className="flex flex-col sm:flex-row sm:h-[300px] divide-y sm:divide-y-0 sm:divide-x">
                        <ScrollArea className="w-64 sm:w-auto">
                          <div className="flex sm:flex-col p-2">
                            {hours.reverse().map((hour) => (
                              <Button
                                key={hour}
                                size="icon"
                                variant={
                                  completeDate && completeDate.getHours() % 12 === hour % 12
                                    ? "default"
                                    : "ghost"
                                }
                                className="sm:w-full shrink-0 aspect-square"
                                onClick={() => handleCompletingTimeChange("hour", hour.toString())}
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
                                  completeDate && completeDate.getMinutes() === minute
                                    ? "default"
                                    : "ghost"
                                }
                                className="sm:w-full shrink-0 aspect-square"
                                onClick={() =>
                                  handleCompletingTimeChange("minute", minute.toString())
                                }
                              >
                                {minute}
                              </Button>
                            ))}
                          </div>
                          <ScrollBar orientation="horizontal" className="sm:hidden" />
                        </ScrollArea>
                        <ScrollArea className="">
                          <div className="flex sm:flex-col p-2">
                            {["AM", "PM"].map((ampm) => (
                              <Button
                                key={ampm}
                                size="icon"
                                variant={
                                  completeDate &&
                                    ((ampm === "AM" && completeDate.getHours() < 12) ||
                                      (ampm === "PM" && completeDate.getHours() >= 12))
                                    ? "default"
                                    : "ghost"
                                }
                                className="sm:w-full shrink-0 aspect-square"
                                onClick={() => handleCompletingTimeChange("ampm", ampm)}
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




              </div>

            </div>
          </div>

          <div>

            <div className="flex gap-4 ">
              <Image
                src="/profile_img.png"
                alt="Description of the image"
                width={35}
                height={45}
              />

              <p className="mt-1">Sabbir Rahman</p>
            </div>

            <br />
            <hr />

            <div className="m-4">

              <p> Actions </p>

            </div>



            <Select>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Assign" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Assign</SelectLabel>
                  <SelectItem value="apple">Task 1</SelectItem>
                  <SelectItem value="banana">Task 2</SelectItem>
                  <SelectItem value="blueberry">Task 3</SelectItem>

                </SelectGroup>
              </SelectContent>
            </Select>


          </div>

        </div>

        <DialogFooter>
          <Button type="button" variant="outline" onClick={() => setOpen(false)}>
            Cancel
          </Button>

          <Button className="w-1/5" type="submit">
            {isSubmitting ? "Create Task..." : "Create Task"}
          </Button>

        </DialogFooter>



      </DialogContent>
    </Dialog>
  )
}












