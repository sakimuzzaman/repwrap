"use client"
import { ReportsList } from "@/components/dashboard/reports-list"
import { Button } from "@/components/ui/button"
import { PlusCircle, UserPlus } from "lucide-react"
import Link from "next/link"

export default function ReportsPage() {

    return (
        <div className=" p-6 ">
            <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold mb-6">Daily Reports</h2>
                <Link href={'/reports/new'} ><Button variant="outline" size="sm">
                    <PlusCircle className="mr-2 h-4 w-4" />
                    Create
                </Button></Link>
            </div>
{/* 
            <div className="flex gap-2 justify-end -mt-14">
                <Button variant="outline" size="sm">
                    <PlusCircle className="mr-2 h-4 w-4" />
                    Create Project
                </Button>

                <Button variant="outline" size="sm">
                    <UserPlus className="mr-2 h-4 w-4" />
                    Invite Teammates
                </Button>
            </div> */}

            <div className="mt-4">
                <ReportsList />
            </div>
        </div>
    )
}

