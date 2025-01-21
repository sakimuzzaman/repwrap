"use client"
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Button } from "../ui/button";
import { useState } from "react";
import { EditLeaveTypeModal } from '../../components/leave-type/EditLeaveTypeModal'



const LeaveTypeTable = ({ data }: { data: any[] }) => {

  const [editableModal, setEditableModal] = useState<any>(false)
  const [leaveId, setLeaveId] = useState<any>(null)

  const modalOpen = (id: any) => {
    setEditableModal(true); // Open the modal
    setLeaveId(id);
  }

  

  return (

    <div>

    <Table>

      <TableHeader>
        <TableRow>
          <TableHead>Leave Type</TableHead>
          <TableHead>Duration Unit</TableHead>
          <TableHead>Days/hour</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Action</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {data.map((item: any, index: any) => (
          <TableRow key={index}>

            <TableCell>{item?.type}</TableCell>
            <TableCell>{item?.duration_unit}</TableCell>
            <TableCell>{item?.hours}</TableCell>

            <TableCell>
              {item?.status === 1 ? (
                <Button className="bg-green-500 text-white px-4 py-2 mt-5 rounded">
                  Activated
                </Button>
              ) : (
                <Button className="bg-red-500 text-white px-4 py-2  rounded">
                  Inactive
                </Button>
              )}
            </TableCell>

            <TableCell>


              <div className="flex gap-3">

                {/* <Button variant="secondary" onClick={() => {
                  setEditableModal(true) , setLeaveId(item.id)
                }}>Edit </Button> */}

                <Button
                  variant="secondary"
                  onClick={() => modalOpen(item.id)}
                >
                  Edit
                </Button>


                <Button variant="secondary">Delete</Button>

              </div>


            </TableCell>




          </TableRow>
        ))}


      </TableBody>
      
    </Table>

{editableModal && <EditLeaveTypeModal leaveId={leaveId} />}
   </div>


  );
};

export default LeaveTypeTable;