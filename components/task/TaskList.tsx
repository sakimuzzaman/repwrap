'use client'
import { ProjectCard } from "@/components/projects/project-card"
import { useState, useEffect } from "react";

import axiosInstance from "@/lib/axios";


export function ProjectList() {

  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchProjects = async () => {
    try {
      const response = await axiosInstance.get("/projects");
      console.log(response)
      setTasks(response.data?.data);
      setLoading(false);
    } catch (err) {
      setLoading(false);
    }
  };

  useEffect(() => {
    
    fetchProjects();
  }, []);

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {/* {projects?.map((project) => (
        <ProjectCard key={project} project={project} />
      ))} */}
     
    </div>
  )
}
