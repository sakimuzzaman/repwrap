
import React from 'react';
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import LeaveTypeTable from '../../components/leave-type/LeaveTypeTable'; 
import {LeaveTypeModal} from '@/components/leave-type/LeaveTypeModal';
import LeaveList from '@/components/leave-type/LeaveList';



const LeaveType = () => {
    return (
       <>
      <div className="p-6 space-y-6">
        <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Leave Type</h2>

        <LeaveTypeModal>
            <Button className='bg-[#3D30EF] text-white hover:bg-slate-400'>+ New Leave Type</Button>
        </LeaveTypeModal>

      </div> 
        </div>

        <Card>
         <CardHeader>
           <CardTitle>Approved Leave Request</CardTitle>
         </CardHeader>
        
        <CardContent>
            <LeaveList />
        </CardContent>

      </Card>
      </> 
    );
};

export default LeaveType;