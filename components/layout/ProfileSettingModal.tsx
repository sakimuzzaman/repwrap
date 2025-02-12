
"use client";
import { useState, useEffect } from "react";
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "../ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import axiosInstance from "@/lib/axios";
import toast from "react-hot-toast";

export function ProfileSettingModal() {
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    address: "",
    about_us: "",
    image: null as File | null,
  });

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axiosInstance.get("/me");
        if (response.data) {
          setFormData({
            name: response.data.name || "",
            phone: response.data.phone || "",
            address: response.data.address || "",
            about_us: response.data.about_us || "",
            image: null,
          });
          if (response.data.profile_photo) {
            setImagePreview(response.data.profile_photo);
          }
        }
      } catch (error) {
        toast.error("Failed to fetch user data");
      }
    };
    fetchUserData();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImagePreview(URL.createObjectURL(file));
      setFormData({ ...formData, image: file });
    }
  };

  const onSubmit = async () => {
    try {
      const submissionData = new FormData();
      submissionData.append("name", formData.name);
      submissionData.append("phone", formData.phone);
      submissionData.append("address", formData.address);
      submissionData.append("aboutus", formData.about_us);
      if (formData.image) {
        submissionData.append("profile_photo", formData.image);
      }

      const response = await axiosInstance.post(`/user/personal-details/update`, submissionData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      if (response?.data?.status === "success") {
        toast.success("Profile updated successfully");
      }
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Failed to update profile");
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Edit Profile</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Update Profile</DialogTitle>
          <DialogDescription>Modify your profile details below.</DialogDescription>
        </DialogHeader>
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-4">
            <Avatar>
              {imagePreview ? <AvatarImage src={imagePreview} /> : <AvatarFallback>U</AvatarFallback>}
            </Avatar>
            <Input type="file" accept="image/*" onChange={handleImageChange} />
          </div>
          <Label htmlFor="name">Name</Label>
          <Input id="name" value={formData.name} onChange={handleChange} />
          <Label htmlFor="phone">Phone</Label>
          <Input id="phone" type="tel" value={formData.phone} onChange={handleChange} />
          <Label htmlFor="address">Address</Label>
          <Input id="address" value={formData.address} onChange={handleChange} />
          <Label htmlFor="about_us">About Us</Label>
          <Textarea id="about_us" value={formData.about_us} onChange={handleChange} />
        </div>
        <DialogFooter>
          <Button onClick={onSubmit}>Save Changes</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

