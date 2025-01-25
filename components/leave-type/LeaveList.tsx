"use client"

import axiosInstance from "@/lib/axios";
import { useEffect, useState } from "react";


import LeaveTypeTable from "./LeaveTypeTable";


const LeaveList = () => {

    const [leaves, setLeaves] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
  
    const fetchLeaves = async () => {
      try {
        const response = await axiosInstance.get("/leaves");
      
        setLeaves(response.data?.data || [])
       // setLeaves(response.data?.data);
       console.log("Fetched Leaves:", response.data?.data);
        setLoading(false);
      } catch (err) {
        setLoading(false);
      }
    };
  
    useEffect(() => {
      
      fetchLeaves();
      console.log('data')
    }, []);
  
    return (
      
      <div> 

       <LeaveTypeTable 
          data={leaves}
          
       />
       
       </div>
    
    );
  };

  export default LeaveList;