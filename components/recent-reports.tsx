import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"

const reports = [
  {
    id: 1,
    title: "API Integration",
    status: "completed",
    date: "2024-01-05",
    hours: 8,
  },
  {
    id: 2,
    title: "Dashboard UI Development",
    status: "in-progress",
    date: "2024-01-05",
    hours: 6,
  },
  {
    id: 3,
    title: "Bug Fixes",
    status: "completed",
    date: "2024-01-04",
    hours: 4,
  },
]

export function RecentReports() {
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
        {reports.map((report) => (
          <TableRow key={report.id}>
            <TableCell className="font-medium">{report.title}</TableCell>
            <TableCell>
              <Badge variant={report.status === "completed" ? "default" : "secondary"}>
                {report.status}
              </Badge>
            </TableCell>
            <TableCell>{report.date}</TableCell>
            <TableCell>{report.hours}h</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}

