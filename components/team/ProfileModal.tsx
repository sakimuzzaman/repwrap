import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

import Image from "next/image";

export default function ProfileModal() {
  return (
    <div className="flex justify-between items-center p-4">
      <h2 className="text-lg font-semibold">Profile Details</h2>
      <Dialog>
        <DialogTrigger asChild>
          <Button variant="outline">View Profile</Button>
        </DialogTrigger>
        <DialogContent  className="max-w-[850px] w-full">
          <DialogHeader>
            <DialogTitle>Profile Details</DialogTitle>
          </DialogHeader>
          <Card className="w-[800px]">
            <CardHeader>
              <CardTitle>User Information</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex justify-between">
                
                
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
            </CardContent>
          </Card>
        </DialogContent>
      </Dialog>
    </div>
  );
}
