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



const LeaveTypeTable = ({ data }: { data: any[] }) => {

  return (
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

                <Button variant="secondary">Edit</Button>

                <Button variant="secondary">Delete</Button>
                
              </div>


            </TableCell>



          </TableRow>
        ))}


      </TableBody>

    </Table>
  );
};

export default LeaveTypeTable;