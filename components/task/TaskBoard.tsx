"use client";
import { useEffect, useState } from "react";
import TaskCard from "./TaskCard";
import { CardModal } from "./CardModal";
import axiosInstance from "@/lib/axios";
import { Button } from "../ui/button";
import { useDispatch } from "react-redux";
import { setTask } from "@/redux/taskSlice";
import { useSelector } from "react-redux";
import { openModal, closeModal } from "@/redux/modalSlice"; // Import actions

export default function TaskBoard() {
  const [isOpenCardModal, setIsOpenCardModal] = useState<boolean>(false);
  const [cardId, setCardId] = useState<number | null>(null);
  const [tasks, setTasks] = useState<Record<string, any[]>>({});
  const statuses = [
    "backlog",
    "pending",
    "running",
    "completed",
    "on_hold",
    "canceled",
    "failed",
    "review",
  ];

  const dispatch = useDispatch();

  const taskSetToCard = (task: any) => {

    dispatch(setTask(task));
    dispatch(openModal({ modalType: "taskCard", id: task?.id }));
  }

  //const user = useSelector((state) => state.user.user);
  const task = useSelector((state: any) => state.task.task);
  // console.log(task)

  const fetchTasks = async () => {
    try {
      const response = await axiosInstance.get("/tasks");
      const tasksData = response.data.data;


      // Ensure tasksData is an array
      if (!Array.isArray(tasksData)) {
        console.error("API response is not an array:", tasksData);
        return;
      }

      // Group tasks by status
      const groupedTasks = statuses.reduce((acc: Record<string, any[]>, status) => {
        acc[status] = tasksData.filter((task: any) => task.status === status);
        return acc;
      }, {});

      setTasks(groupedTasks);
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
    finally {
      dispatch(closeModal('taskCard'))
    }
  };

  const { taskCard } = useSelector((state: any) => state.modal.modals);

  if (taskCard == 'processOn') {
    fetchTasks()
  }

  useEffect(() => {
    fetchTasks(); // Fetch tasks when the component is mounted
  }, []);

  return (

    <div className="flex overflow-x-scroll overflow-y-hidden space-x-4 p-4">

      {statuses.map((status) => (
        <div
          key={status}
          className="min-w-[300px] max-h-[450px] bg-gray-100 dark:bg-gray-800 rounded-md shadow-md"
        >
          <h2 className="text-lg font-semibold text-center p-3 capitalize">
            {status}
          </h2>
          <div className="p-2 space-y-3 max-h-[450px] overflow-y-auto">
            {tasks[status]?.map((task, index) => (
              <div onClick={() => taskSetToCard(task)} key={index}>
                <TaskCard
                  key={task.id}
                  cardInfo={task}
                />
              </div>
            ))}
          </div>
        </div>
      ))}


      <CardModal />
    </div>
  );
}
