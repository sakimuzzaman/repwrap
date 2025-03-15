'use client'
import { ProjectCard } from "@/components/projects/project-card"
import { useState, useEffect } from "react";

import axiosInstance from "@/lib/axios";
import { EditProject } from "./edit-modal";
import { DetailsProject } from "./details-modal";
import { useDispatch, useSelector } from "react-redux";
import { closeModal, processOn } from "@/redux/modalSlice"; // Import actions


export function ProjectList() {

  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const dispatch = useDispatch();

  const fetchProjects = async () => {
    try {
      const response = await axiosInstance.get("/projects");
      // console.log(response)
      setProjects(response.data?.data);
      setLoading(false);
    } catch (err) {
      setLoading(false);
    } finally {
      setLoading(false);
      dispatch(closeModal('projectEdit'))
    }
  };
  const { projectEdit } = useSelector((state: any) => state.modal.modals);

  if (projectEdit == 'processOn') {
    fetchProjects()
  }


  useEffect(() => {

    fetchProjects();
  }, []);

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {projects?.map((project, index: number) => (
        <ProjectCard key={index} project={project} />
      ))}

      <EditProject/>
      <DetailsProject/>

    </div>
  )
}

