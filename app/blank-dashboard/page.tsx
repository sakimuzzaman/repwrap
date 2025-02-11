import { InviteTeammatesModal } from "@/components/blank-dashboard/InviteTeammatesModal";
import { NewProjectModal } from "@/components/blank-dashboard/NewProjectModal";
//import { InviteTeammatesModal } from "@/components/blank-dashboard/inviteteammates-modal";
//import { NewProjectModal }  from "@/components/blank-dashboard/newproject-modal";

import { DashboardShell } from "@/components/dashboard-shell";
import { Button } from "@/components/ui/button";
import { UserPlus } from "lucide-react";
import Image from "next/image";


export default function BlankDashboard() {
    return (

        <>


            <div className="">

                <h1 className="text-2xl font-semibold p-6">Dashboard</h1>

                <div className="flex justify-center">
                    <Image
                        src="/dashboard-barImg.png"
                        width={217}
                        height={161}
                        alt="dashboard image"
                    />
                </div>

                <div >

                    <h2 className="text-2xl font-medium text-center mt-4">Expect to see reports data appear here soon!</h2>


                    <p className="text-center  font-normal mt-2 ">To get report data start building a project and invite teammates to your project. </p>

                     <div className="flex justify-center mt-6 gap-3">

                       <InviteTeammatesModal>
                  
                            <Button className="bg-[#3D30EF]" variant="outline" size="sm">
                                <UserPlus className="mr-2 h-4 w-4" />
                                Invite Teammates
                            </Button>
                       
                     </InviteTeammatesModal>
                           
                        



                        <NewProjectModal>
                       
                             <Button className="bg-[#3D30EF]" variant="outline" size="sm">
                                <UserPlus className="mr-2 h-4 w-4" />
                                New Project
                            </Button>
                      
                      </NewProjectModal>

                    </div>

                </div>



            </div>

        </>


    )
}

