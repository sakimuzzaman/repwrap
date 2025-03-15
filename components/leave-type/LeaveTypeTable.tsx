"use client"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Button } from "../ui/button";
import { EditLeaveTypeModal } from '../../components/leave-type/EditLeaveTypeModal'
import { useDispatch } from "react-redux";
import { openModal } from "@/redux/modalSlice"; // Import actions


const LeaveTypeTable = ({ data }: { data: any[] }) => {
  const dispatch = useDispatch();

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

              <TableCell className="capitalize">{item?.type}</TableCell>
              <TableCell className="capitalize">{item?.duration_unit}</TableCell>
              <TableCell>{item?.duration_unit == 'day' ? item?.days : item?.hours}</TableCell>

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
                  <Button
                    variant="secondary"
                    onClick={() => dispatch(openModal({ modalType: "leave", id: item?.id }))}
                  >
                    Edit
                  </Button>

                  {/* <Button variant="secondary">Delete</Button> */}
                </div>
              </TableCell>
            </TableRow>
          ))}

        </TableBody>
      </Table>
      <EditLeaveTypeModal />
    </div>
  );
};

export default LeaveTypeTable;