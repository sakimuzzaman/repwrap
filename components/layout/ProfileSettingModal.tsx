"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useRouter } from "next/navigation";
import axiosInstance from "@/lib/axios";
import toast from "react-hot-toast";
import { useForm } from "react-hook-form";
import Cookies from 'js-cookie';

interface FormData {
  name: string;
  phone: string;
  address: string;
  about_us: string;
  profile_photo?: FileList;
}

export function ProfileSettingModal({ openModal, onClose }:any) {
  const [open, setOpen] = useState(false);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [authUser, setAuthUser] = useState<any>(null);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    setValue,
  } = useForm<FormData>();

  // ✅ Fetch user personal details when modal opens
  useEffect(() => {
    const userCookie: any = Cookies.get('user');
    setAuthUser(JSON.parse(userCookie));

    const fetchUserDetails = async () => {
      try {
        const response = await axiosInstance.get("/me");
        
        const userData = response.data.data;

        // ✅ Set existing user data in the form
        setValue("name", userData.name);
        setValue("phone", userData.profile_details.phone);
        setValue("address", userData.profile_details.address);
        setValue("about_us", userData.profile_details.about_us);

        // ✅ Set profile image preview
        setImagePreview(userData.profile_details.profile_photo || null);
      } catch (error) {
        toast.error("Failed to fetch user details");
      }
    };

    if (open) fetchUserDetails();
  }, [open, setValue]);

  // ✅ Handle Image Preview
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImagePreview(URL.createObjectURL(file));
    }
  };

  // Fetch user details when modal opens
  useEffect(() => {
    setOpen(openModal);
  }, [openModal]);

  useEffect(() => {
    if (!open) {
      onClose()
    }
  }, [open]);

  const onSubmit = async (data: FormData) => {
    try {
      const formData = new FormData();
      formData.append("name", data.name);
      formData.append("phone", data.phone);
      formData.append("address", data.address);
      formData.append("about_us", data.about_us);

      // ✅ Append profile photo if selected
      if (data.profile_photo && data.profile_photo.length > 0) {
        formData.append("profile_photo", data.profile_photo[0]);
      }

      const response = await axiosInstance.post("/user/personal-details/update", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      if (response?.data?.status === "success") {
        toast.success("Profile updated successfully");
        reset();
        setOpen(false);
        router.refresh();
      }
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Failed to update profile");
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      {/* <DialogTrigger asChild>{children}</DialogTrigger> */}
      <DialogContent className="sm:max-w-[625px]">
        <DialogHeader>
          <DialogTitle>Edit Profile</DialogTitle>
          <DialogDescription>Update your personal details</DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* ✅ Name */}
          <div className="space-y-2">
            <Label htmlFor="name">Full Name</Label>
            <Input id="name" {...register("name", { required: "Name is required" })} />
            {errors.name && <p className="text-sm text-red-600">{errors.name.message}</p>}
          </div>

          {/* ✅ Phone */}
          <div className="space-y-2">
            <Label htmlFor="phone">Phone</Label>
            <Input id="phone" {...register("phone", { required: "Phone number is required" })} />
            {errors.phone && <p className="text-sm text-red-600">{errors.phone.message}</p>}
          </div>

          {/* ✅ Address */}
          <div className="space-y-2">
            <Label htmlFor="address">Address</Label>
            <Input id="address" {...register("address", { required: "Address is required" })} />
            {errors.address && <p className="text-sm text-red-600">{errors.address.message}</p>}
          </div>

          {/* ✅ About Us */}
          <div className="space-y-2">
            <Label htmlFor="about_us">About Me</Label>
            <textarea id="about_us" rows={3} className="w-full border rounded-md p-2"
              {...register("about_us", { required: "Please provide some details about yourself" })}
            ></textarea>
            {errors.about_us && <p className="text-sm text-red-600">{errors.about_us.message}</p>}
          </div>

          {/* ✅ Profile Image Upload & Preview */}
          <div className="space-y-2">
            <Label htmlFor="profile_photo">Profile Image</Label>
            {imagePreview && (
              <div className="flex justify-center">
                <img src={imagePreview} alt="Profile Preview" className="h-24 w-24 rounded-full border" />
              </div>
            )}
            <Input id="profile_photo" type="file" accept="image/*" {...register("profile_photo")}
              onChange={handleImageChange}
            />
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => setOpen(false)}>Cancel</Button>
            <Button type="submit" disabled={isSubmitting}>{isSubmitting ? "Updating..." : "Update Profile"}</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
