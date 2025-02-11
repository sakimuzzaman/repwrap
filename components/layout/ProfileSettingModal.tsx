
"use client";
import { useState } from "react";
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "../ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

export function ProfileSettingModal() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    image: null as File | null,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFormData({ ...formData, image: e.target.files[0] });
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Profile Settings</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Edit Profile</DialogTitle>
          <DialogDescription>
           
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">

          {/* Image Upload */}
          <div className="flex flex-col items-center gap-3">
            <Avatar className="w-20 h-20">
              {formData.image ? (
                <AvatarImage src={URL.createObjectURL(formData.image)} alt="Profile Image" />
              ) : (
                <AvatarFallback>IMG</AvatarFallback>
              )}
            </Avatar>
            <Input type="file" accept="image/*" onChange={handleImageChange} />
          </div>

          {/* Name Field */}
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right"> Name </Label>
            <Input id="name" value={formData.name} onChange={handleChange} placeholder="Enter your name" className="col-span-3" />
          </div>

          {/* Email Field */}
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="email" className="text-right"> Email </Label>
            <Input id="email" type="email" value={formData.email} onChange={handleChange} placeholder="Enter your email" className="col-span-3" />
          </div>

          {/* Phone Field */}
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="phone" className="text-right"> Phone </Label>
            <Input id="phone" type="tel" value={formData.phone} onChange={handleChange} placeholder="Enter your phone number" className="col-span-3" />
          </div>

          {/* Address Field */}
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="address" className="text-right"> Address </Label>
            <Textarea id="address" value={formData.address}  placeholder="Enter your address" className="col-span-3" />
          </div>

        
          
        </div>
        <DialogFooter>
          <Button type="submit">Save changes</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
