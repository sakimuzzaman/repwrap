import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
// import  ApprovedRequestTable  from '../../components/leave/ApprovedRequestTable';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { ApprovedRequestTable } from "@/components/leave/ApprovedRequestTable"
import { LeaveApplicationModal } from "@/components/leave/LeaveApplicationModal"

const leaveTypes = [
  { name: "Sick Leave", days: "7 days", used: "2 days", remaining: "5 days" },
  { name: "Casual Leave", days: "12 days", used: "5 days", remaining: "7 days" },
  { name: "Parental leave", days: "14 days", used: "0 days", remaining: "14 days" },
  { name: "Study Leave", days: "14 days", used: "0 days", remaining: "14 days" },
]

const pendingLeaves = [
  {
    id: 1,
    type: "Casual Leave",
    from: "2024-01-15",
    to: "2024-01-16",
    days: "2",
    status: "Pending",
  },
  {
    id: 1,
    type: "Casual Leave",
    from: "2024-01-15",
    to: "2024-01-16",
    days: "2",
    status: "Pending",
  },
  {
    id: 1,
    type: "Casual Leave",
    from: "2024-01-15",
    to: "2024-01-16",
    days: "2",
    status: "Pending",
  },
  // Add more pending leaves...
]

export default function LeavesPage() {
  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Leaves</h2>
        <LeaveApplicationModal>
          <Button>+ new leave application</Button>
        </LeaveApplicationModal>
      </div>

        <div>

            <h2 className="text-2xl font-bold text-center">Monthly Leave Statistics - December 2024</h2>
            <p className="text-base font-normal text-center">Here’s an overview of your leave usage across all categories.</p>

        </div>
       
      
      <div className="grid gap-4 md:grid-cols-4">
        {leaveTypes.map((leave) => (
          <Card key={leave.name}>
            <CardHeader>
              <CardTitle className="text-sm font-medium">{leave.name}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{leave.remaining}</div>
              <p className="text-xs text-muted-foreground">
                Used: {leave.used} / Total: {leave.days}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Pending Leave Applications</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Type</TableHead>
                <TableHead>From</TableHead>
                <TableHead>To</TableHead>
                <TableHead>Days</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {pendingLeaves.map((leave) => (
                <TableRow key={leave.id}>
                  <TableCell>{leave.type}</TableCell>
                  <TableCell>{leave.from}</TableCell>
                  <TableCell>{leave.to}</TableCell>
                  <TableCell>{leave.days}</TableCell>
                  <TableCell>{leave.status}</TableCell>
                  <TableCell>
                    <Button variant="ghost" size="sm">
                      View
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>


      <Card>
         <CardHeader>
           <CardTitle>Leave History</CardTitle>
         </CardHeader>
        
        <CardContent>
            <ApprovedRequestTable />
        </CardContent>

      </Card>

    </div>
  )
}
