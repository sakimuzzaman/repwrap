"use client"

import { DatePicker } from "@/components/employee-workreport/DatePicker"
import { Card } from "@/components/ui/card"
import Image from "next/image"
import { useState } from "react"


export default function ProfilePage() {



    return (
        <Card className="space-y-2  m-6 p-4  border-none shadow-none mb-4">

            <div className="flex justify-between">
                <h2>Profile Details</h2>

                <DatePicker />

            </div>



            <div>
                <div className="flex">
                    <Image
                        src='/profile_img.png'
                        alt="profile image"
                        width={135}
                        height={135}
                    />

                    <div className="ml-12">
                        <p>
                            <span className="text-2xl font-semibold"> Izazul Islam </span>
                        </p>

                        <br />

                        <p>Phone number</p>

                        <p>+8801754298028</p>
                    </div>


                    <div className="mt-14 ml-36">
                        <p> Email </p>

                        <p>Tushar.ahmed566@gmail.com</p>
                    </div>

                </div>

            </div>

            <h2 className="text-center text-2xl font-bold">Monthly stats - December 2024</h2>

            <div className="flex justify-evenly gap-4">

                <div className="bg-white w-[153px] h-[100px] ">

                    <p className="text-center text-xs mt-4 font-semibold">Total report submisiion</p>

                    <p className="text-center text-3xl">56</p>

                </div>

                <div className="bg-white w-[150px] h-[100px] ">
                    <p className="text-center text-xs mt-4 font-semibold">Total report submisiion</p>

                    <p className="text-center text-3xl">56</p>
                </div>

                <div className="bg-white w-[150px] h-[100px]">
                    <p className="text-center text-xs mt-4 font-semibold">Total report submisiion</p>

                    <p className="text-center text-3xl">56</p>
                </div>

                <div className="bg-white w-[150px] h-[100px] ">
                    <p className="text-center text-xs mt-4 font-semibold">Total report submisiion</p>

                    <p className="text-center text-3xl">56</p>
                </div>

                <div className="bg-white w-[150px] h-[100px]">
                    <p className="text-center text-xs mt-4 font-semibold">Total report submisiion</p>

                    <p className="text-center text-3xl">56</p>
                </div>


            </div>





        </Card>
    )
}

