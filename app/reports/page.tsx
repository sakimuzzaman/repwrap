"use client"
import { ReportsList } from "@/components/dashboard/reports-list"
import { Button } from "@/components/ui/button"
import { PlusCircle, UserPlus } from "lucide-react"
import Link from "next/link"

export default function ReportsPage() {

    return (
        <div className=" p-6 ">
            <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold mb-6 text-[#010136] dark:text-[#FFFFFF]">Daily Reports</h2>
                <Link href={'/reports/new'} >
                    {/* <Button variant="outline" size="sm">
                    <PlusCircle className="mr-2 h-4 w-4" />
                    Create
                </Button> */}

                    <div className="flex gap-2">
                        <Link href={'/reports/new'}>
                            <Button className=" text-blue-600 hover:text-white hover:bg-blue-600 border-blue-600 hover:border-blue-600 transition duration-300 ease-in-out" variant="outline" size="sm">
                                <PlusCircle className="mr-2 h-4 w-4" />
                                Create
                            </Button>
                        </Link>
                        {/* <Button className=" text-blue-600 hover:text-white hover:bg-blue-600 border-blue-600 hover:border-blue-600 transition duration-300 ease-in-out" variant="outline" size="sm">
                            <UserPlus className="mr-2 h-4 w-4" />
                            Invite Teammates
                        </Button> */}
                    </div>

                </Link>
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

