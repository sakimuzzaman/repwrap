'use client'
import { ProjectCard } from "@/components/projects/project-card"
import { useState, useEffect } from "react";

import axiosInstance from "@/lib/axios";



// const projects = [
//   {
//     id: "1",
//     name: "Repwrap",
//     description: "Employee management system",
//     status: "active",
//   },
//   {
//     id: "2",
//     name: "TimeFlow",
//     description: "Time tracking application",
//     status: "in-progress",
//   },
//   {
//     id: "3",
//     name: "Progressive Style",
//     description: "Design system documentation",
//     status: "completed",
//   },
// ]

export function ProjectList() {

  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchProjects = async () => {
    try {
      const response = await axiosInstance.get("/projects");
      console.log(response)
      setProjects(response.data?.data);
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
      {projects?.map((project) => (
        <ProjectCard key={project} project={project} />
      ))}
     
    </div>
  )
}

