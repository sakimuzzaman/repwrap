import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import Image from "next/image";

export default function ProfileModal({ user }: any) {
  return (
    <div className="flex justify-between items-center p-4">
      <Dialog>
        <DialogTrigger asChild>
          <Button variant="outline" className="px-6 py-2 text-lg font-medium">
            View Profile
          </Button>
        </DialogTrigger>
        <DialogContent className="max-w-[850px] w-full rounded-lg shadow-lg">
          <DialogHeader>
            <DialogTitle className="text-center text-2xl font-bold text-gray-700">
              Profile Details
            </DialogTitle>
          </DialogHeader>
          <Card className="w-full max-w-[800px] rounded-lg border shadow-lg">
            <CardHeader className="bg-gray-100 rounded-t-lg text-center p-6">
              <CardTitle className="text-xl font-semibold text-gray-700">
                User Information
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <div className="flex flex-col md:flex-row items-center md:items-start">
                {/* Profile Image */}
                <div className="flex-shrink-0">
                  <Image
                    src={user?.profile?.profile_photo || "/profile_img.png"}
                    alt="Profile Image"
                    width={135}
                    height={135}
                    className="rounded-full border border-gray-300 shadow-md"
                  />
                </div>

                <div className="flex flex-col md:flex-row justify-between w-full mt-6 md:mt-0 md:ml-8">
                  {/* User Info */}
                  <div className="text-center md:text-left">
                    <p className="text-2xl font-semibold text-gray-800">{user?.name || "N/A"}</p>
                    <p className="text-gray-500 mt-1">Phone Number</p>
                    <p className="font-medium text-gray-700">{user?.profile?.phone || "N/A"}</p>
                  </div>

                  {/* Email */}
                  <div className="text-center md:text-left mt-6 md:mt-0">
                    <p className="text-gray-500">Email</p>
                    <p className="font-medium text-gray-700">{user?.email || "N/A"}</p>
                  </div>
                </div>
              </div>

              {/* About & Address Section */}
              <div className="mt-6">
                {/* About */}
                <div className="mb-4">
                  <p className="text-gray-500 font-medium">About</p>
                  <p className="text-gray-700 border p-3 rounded-lg">
                    {user?.profile?.about || "No information available"}
                  </p>
                </div>

                {/* Address */}
                <div>
                  <p className="text-gray-500 font-medium">Address</p>
                  <p className="text-gray-700 border p-3 rounded-lg">
                    {user?.profile?.address || "No address provided"}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </DialogContent>
      </Dialog>
    </div>
  );
}
