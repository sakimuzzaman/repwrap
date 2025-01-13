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
   
  const invoices = [
    {
      name: "Izazul Islam",
      leaveType: "Casual",
      fromDate: "7 Nov, 2024",
      toDate: "4 Dec, 2024",
      reason: "I need a break.",
      status: "Approved",
      action: "View",
    },
    {
      name: "Izazul Islam",
      leaveType: "Casual",
      fromDate: "7 Nov, 2024",
      toDate: "4 Dec, 2024",
      reason: "I need a break.",
      status: "Approved",
      action: "View",
    },
    {
      name: "Izazul Islam",
      leaveType: "Casual",
      fromDate: "7 Nov, 2024",
      toDate: "4 Dec, 2024",
      reason: "I need a break.",
      status: "Approved",
      action: "View",
    },
    {
      name: "Izazul Islam",
      leaveType: "Casual",
      fromDate: "7 Nov, 2024",
      toDate: "4 Dec, 2024",
      reason: "I need a break.",
      status: "Approved",
      action: "View",
    },
    {
      name: "Izazul Islam",
      leaveType: "Casual",
      fromDate: "7 Nov, 2024",
      toDate: "4 Dec, 2024",
      reason: "I need a break.",
      status: "Approved",
      action: "View",
    },
    {
      name: "Izazul Islam",
      leaveType: "Casual",
      fromDate: "7 Nov, 2024",
      toDate: "4 Dec, 2024",
      reason: "I need a break.",
      status: "Approved",
      action: "View",
    },
    {
      name: "Izazul Islam",
      leaveType: "Casual",
      fromDate: "7 Nov, 2024",
      toDate: "4 Dec, 2024",
      reason: "I need a break.",
      status: "Approved",
      action: "View",
    },
    
  ]
   
  export function ApprovedRequestTable() {
    return (
      <Table>
        
        <TableHeader>
          <TableRow>
            <TableHead >Name/id</TableHead>
            <TableHead>Leave type</TableHead>
            <TableHead>From date</TableHead>
            <TableHead>To date</TableHead>
            <TableHead>Reason</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {invoices.map((name) => (
            <TableRow key={name.name}>
              <TableCell>{name.name}</TableCell>
              <TableCell>{name.leaveType}</TableCell>
              <TableCell>{name.fromDate}</TableCell>
              <TableCell>{name.toDate}</TableCell>
              <TableCell>{name.reason}</TableCell>
              <TableCell>{name.status}</TableCell>
              <TableCell>{name.action}</TableCell>
            </TableRow>
          ))}
        </TableBody>
        {/* <TableFooter>
          <TableRow>
            <TableCell colSpan={3}>Total</TableCell>
            <TableCell className="text-right">$2,500.00</TableCell>
          </TableRow>
        </TableFooter> */}
      </Table>
    )
  }