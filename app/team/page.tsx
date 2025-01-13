import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

const team = [
  {
    id: 1,
    name: "John Doe",
    role: "Frontend Developer",
    email: "john@example.com",
    status: "Active",
  },
  {
    id: 1,
    name: "John Doe",
    role: "Frontend Developer",
    email: "john@example.com",
    status: "Active",
  },
  {
    id: 1,
    name: "John Doe",
    role: "Frontend Developer",
    email: "john@example.com",
    status: "Active",
  },
  {
    id: 1,
    name: "John Doe",
    role: "Frontend Developer",
    email: "john@example.com",
    status: "Active",
  },
  {
    id: 1,
    name: "John Doe",
    role: "Frontend Developer",
    email: "john@example.com",
    status: "Active",
  },
  // Add more team members...
]

export default function TeamPage() {
  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Team Members</h2>
        <Button>Add Member</Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>All Team Members</CardTitle>
          <CardDescription>
            Manage your team members and their roles.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Member</TableHead>
                <TableHead>Role</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {team.map((member) => (
                <TableRow key={member.id}>
                  <TableCell className="flex items-center gap-3">
                    <Avatar>
                      <AvatarImage src={`/placeholder.svg?height=32&width=32`} />
                      <AvatarFallback>
                        {member.name.split(" ").map((n) => n[0]).join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="font-medium">{member.name}</div>
                      <div className="text-sm text-muted-foreground">
                        {member.email}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>{member.role}</TableCell>
                  <TableCell>{member.status}</TableCell>
                  <TableCell>
                    <Button variant="ghost" size="sm">
                      Edit
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}

