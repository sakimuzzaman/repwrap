"use client"

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

import axiosInstance from "@/lib/axios";
import { useEffect, useState } from "react";



export default function TeamPage() {
  const [teams, setTeams] = useState<any>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchLeaves = async () => {
    try {
      const response = await axiosInstance.get("/admin/team/members");

      setTeams(response.data?.data || [])

      // setLeaves(response.data?.data);
      setLoading(false);
    } catch (err) {
      setLoading(false);
    }
  };

  useEffect(() => {

    fetchLeaves();
  }, []);

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-[#010136] dark:text-[#FFFFFF]">Team Members</h2>
        {/* <Button>Add Member</Button> */}
      </div>



      <Card>
        <CardHeader>
          <CardTitle className="text-[#010136] dark:text-[#FFFFFF]">All Team Members</CardTitle>
          <CardDescription>
            Manage your team members and their roles.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Joined</TableHead>
                <TableHead>Last submission</TableHead>
                <TableHead>Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {teams.map((member: any) => (
                <TableRow key={member.id}>
                  <TableCell className="flex items-center gap-3">
                    <Avatar>
                      <AvatarImage src={`/placeholder.svg?height=32&width=32`} />
                      <AvatarFallback>
                        {member.name.split(" ").map((n: any) => n[0]).join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="font-medium">{member.name}</div>
                      <div className="text-sm text-muted-foreground">
                        {member.email}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    {new Date(member.created_at).toLocaleDateString('en-GB', {
                      day: '2-digit',
                      month: '2-digit',
                      year: '2-digit'
                    })}</TableCell>
                  <TableCell>
                    {new Date(member.last_work_report?.created_at).toLocaleDateString('en-GB', {
                      day: '2-digit',
                      month: '2-digit',
                      year: '2-digit',
                      weekday: 'long'
                    })}</TableCell>
                  <TableCell>

                    <Button variant="secondary" className="text-end text-[#010136] dark:text-[#B8B8B8] ">Click Here</Button>

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






