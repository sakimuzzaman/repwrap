"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import axiosInstance from "@/lib/axios";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { closeModal } from "@/redux/modalSlice"; // Import actions

interface ProjectData {
  name: string;
  description: string;
}

export function DetailsProject() {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [project, setProject] = useState<ProjectData | null>(null);
  const dispatch = useDispatch();

  const { projectDetails } = useSelector((state: any) => state.modal.modals);

  // Fetch project details
  const fetchProjectDetails = async (id: number) => {
    try {
      const response = await axiosInstance.get(`/projects/${id}`);
      setProject(response.data.data);
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Failed to fetch project details");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (projectDetails && typeof projectDetails === "number") {
      fetchProjectDetails(projectDetails);
      setOpen(true);
    }
  }, [projectDetails]);

  useEffect(() => {
    if (!open) {
      dispatch(closeModal("projectDetails"));
    }
  }, [open]);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Project Details</DialogTitle>
          <DialogDescription>View the details of your project.</DialogDescription>
        </DialogHeader>

        {loading ? (
          <p>Loading...</p>
        ) : (
          project && (
            <div className="space-y-4">
              <div className="grid gap-4 py-4">
                <div className="grid gap-2">
                  <h3 className="text-lg font-semibold">Project Name</h3>
                  <p className="text-gray-700">{project.name}</p>
                </div>
                <div className="grid gap-2">
                  <h3 className="text-lg font-semibold">Project Description</h3>
                  <p className="text-gray-700 whitespace-pre-line">{project.description}</p>
                </div>
              </div>

              <div className="flex justify-end">
                <Button variant="outline" onClick={() => setOpen(false)}>
                  Close
                </Button>
              </div>
            </div>
          )
        )}
      </DialogContent>
    </Dialog>
  );
}
