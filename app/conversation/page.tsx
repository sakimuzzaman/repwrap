
import React from 'react';
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import LeaveTypeTable from '../../components/leave-type/LeaveTypeTable';
import { LeaveTypeModal } from '@/components/leave-type/LeaveTypeModal';
import LeaveList from '@/components/leave-type/LeaveList';
import Chat from '@/components/chat/Chat';



const LeaveType = () => {
  return (
    <>
      <Card>
        {/* <CardHeader>
          <CardTitle>Approved Leave Request</CardTitle>
        </CardHeader> */}

        <CardContent>
          <Chat userId={2} />
        </CardContent>

      </Card>
    </>
  );
};

export default LeaveType;