
"use client"

import axiosInstance from "@/lib/axios";
import { useEffect, useState } from "react";

import { useDispatch, useSelector } from "react-redux";

import LeaveTypeTable from "./LeaveTypeTable";
import { closeModal, processOn } from "@/redux/modalSlice"; // Import actions


const LeaveList = () => {

  const [leaves, setLeaves] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const dispatch = useDispatch();

  const fetchLeaves = async () => {
    try {
      const response = await axiosInstance.get("/leaves");

      setLeaves(response.data?.data || [])
      // setLeaves(response.data?.data);
      setLoading(false);
    } catch (err) {
      setLoading(false);
    } finally {
      setLoading(false);
      dispatch(closeModal('leave'))
    }
  };

  useEffect(() => {

    fetchLeaves();
  }, []);

  const { leave } = useSelector((state: any) => state.modal.modals);
  if (leave == 'processOn') {
    fetchLeaves();
  }


  return (

    <div>

      <LeaveTypeTable
        data={leaves}

      />

    </div>

  );
};

export default LeaveList;