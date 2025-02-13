import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"


export function RecentReports({ last_10_reports }:any) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Title</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Date</TableHead>
          <TableHead>Hours</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {last_10_reports?.map((report:any, index:number) => (
          <TableRow key={index}>
            <TableCell className="font-medium capitalize">{report.title}</TableCell>
            <TableCell>
              <Badge className="capitalize" variant={report.status === "complete" ? "default" : "secondary"}>
                {report.status}
              </Badge>
            </TableCell>
            <TableCell>
              {new Date(report.created_at).toLocaleDateString('en-GB', {
                day: '2-digit',
                month: '2-digit',
                year: '2-digit',
                weekday: 'short'
              })}</TableCell>
            <TableCell>{report.hours}h</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}

