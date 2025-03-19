"use client"


import ProfileModal from "@/components/team/ProfileModal"
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
import { EyeIcon, ScanEye } from "lucide-react"
import Link from "next/link"
import { Profiler, useEffect, useState } from "react";
import Cookies from 'js-cookie';
import { useRouter } from "next/navigation";



export default function TeamPage() {
  const [teams, setTeams] = useState<any>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [user, setUser] = useState<any>();
  const router = useRouter();
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

  useEffect(() => {
    let usr = Cookies.get('user');
    usr = usr && JSON.parse(usr);
    if (!usr) {
      router.push('/login');
    }

    setUser(usr);
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
                <TableHead>
                <div className="px-32"> 
            Action
          </div>
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {teams.map((member: any) => (
                <TableRow key={member.id}>
                  <TableCell className="flex items-center gap-3">
                    <Avatar>
                      <AvatarImage src={member?.profile?.profile_photo} />
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
                  <TableCell className="flex justify-center items-center">

                    <Link href={`/profile/${member.id}`}>
                      <Button className=" text-white hover:text-white bg-blue-600 border-blue-600 hover:border-blue-600 transition duration-300 ease-in-out" size="sm">
                        <ScanEye className="mr-2 h-4 w-4" />
                        Profile
                      </Button>
                    </Link>

                    {user && user?.role === 'admin' && <ProfileModal user={member} />}
                    {/* <ProfileModal>
                      <Button variant="secondary" className="text-end ml-4 text-[#010136] dark:text-[#B8B8B8] bg-green-400 ">
                        </Button>
                    </ProfileModal> */}
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






