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


interface User {
    id: number;
    name: string;
    email: string;
}

interface FormData {
    name: string;
    members: number[];
    profile?: FileList;
}

export function EditModal({ children, groupId }: { children: React.ReactNode; groupId: number }) {

    const [open, setOpen] = useState(false);
    const [users, setUsers] = useState<User[]>([]);
    const [groupInfo, setGroupInfo] = useState<any>(null);
    const [loadingUsers, setLoadingUsers] = useState(false);
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

    // ✅ Fetch users and group details when modal opens
    useEffect(() => {

        const userCookie: any = Cookies.get('user');
        setAuthUser(JSON.parse(userCookie))

        const fetchUsersAndGroup = async () => {
            try {
                setLoadingUsers(true);

                // ✅ Fetch group details
                const groupResponse = await axiosInstance.get(`/groups/${groupId}`);
                const groupData = groupResponse.data.data;
                setGroupInfo(groupData);

                // ✅ Set existing group data in the form
                setValue("name", groupData.name);
                setValue("members", groupData.members.map((m: User) => m.id));

                // ✅ Set existing profile image
                setImagePreview(groupData.profile || null);

                // ✅ Fetch all users for selection
                const usersResponse = await axiosInstance.get("/group/members");
                const allUsers = usersResponse.data;

                // ✅ Sort users: selected members first, then alphabetically
                const sortedUsers = allUsers.sort((a: User, b: User) => {
                    const isSelectedA = groupData.members.some((m: User) => m.id === a.id);
                    const isSelectedB = groupData.members.some((m: User) => m.id === b.id);

                    if (isSelectedA && !isSelectedB) return -1;
                    if (!isSelectedA && isSelectedB) return 1;
                    return a.name.localeCompare(b.name);
                });

                setUsers(sortedUsers);
            } catch (error) {
                toast.error("Failed to fetch data");
            } finally {
                setLoadingUsers(false);
            }
        };

        if (open) fetchUsersAndGroup();
    }, [open, groupId, setValue]);

    // ✅ Handle Image Preview
    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setImagePreview(URL.createObjectURL(file));
        }
    };

    const onSubmit = async (data: FormData) => {
        try {
            const formData = new FormData();
            formData.append("name", data.name);
            data.members.forEach(member => formData.append("members[]", member.toString()));

            // ✅ Append Image If Selected
            if (data.profile && data.profile.length > 0) {
                formData.append("profile", data.profile[0]);
            }

            const response = await axiosInstance.post(`/groups/${groupId}/update`, formData, {
                headers: { "Content-Type": "multipart/form-data" },
            });

            if (response?.data?.status === "success") {
                toast.success("Group updated successfully");
                reset();
                setOpen(false);
                router.refresh();
            }
        } catch (error: any) {
            toast.error(error.response?.data?.message || "Failed to update group");
        }
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>{children}</DialogTrigger>
            <DialogContent className="sm:max-w-[625px]">
                <DialogHeader>
                    <DialogTitle>Edit Group</DialogTitle>
                    <DialogDescription>Manage your group settings</DialogDescription>
                </DialogHeader>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                    {/* ✅ Show Group Name in Input */}
                    <div className="space-y-2">
                        <Label htmlFor="name">Group Name</Label>
                        {authUser?.role == 'admin' ? < Input
                            id="name"
                            placeholder="Enter group name"
                            {...register("name", { required: "Group name is required" })}
                        /> : <Input
                            id="name"
                            readOnly
                            placeholder="Enter group name"
                            {...register("name", { required: "Group name is required" })}
                        />}

                        {errors.name && <p className="text-sm text-red-600">{errors.name.message}</p>}
                    </div>

                    {/* ✅ Group Profile Image Upload & Preview */}
                    <div className="space-y-2">
                        <Label htmlFor="profile">Group Profile Image</Label>
                        {imagePreview && (
                            <div className="flex justify-center">
                                <img src={imagePreview} alt="Profile Preview" className="h-24 w-24 rounded-full border" />
                            </div>
                        )}
                        <Input
                            id="profile"
                            type="file"
                            accept="image/*"
                            {...register("profile")}
                            onChange={handleImageChange}
                        />
                    </div>

                    {/* ✅ Show Selected Members First & Sort Alphabetically */}
                    <div className="space-y-2">
                        <Label>Manage Members</Label>
                        {loadingUsers ? (
                            <p className="p-4 text-center">Loading users...</p>
                        ) : (
                            <div className="border rounded-md p-2 max-h-48 overflow-y-auto">
                                {users.map((user) => (
                                    <label key={user.id} className="flex items-center space-x-2 p-2">
                                        <input
                                            type="checkbox"
                                            value={user.id}
                                            {...register("members")}
                                            className="h-4 w-4"
                                            defaultChecked={groupInfo?.members?.some((m: User) => m.id === user.id)}
                                        />
                                        <span>{user.name} ({user.email})</span>
                                    </label>
                                ))}
                            </div>
                        )}
                    </div>

                    <DialogFooter>
                        <Button type="button" variant="outline" onClick={() => setOpen(false)}>Cancel</Button>
                        <Button type="submit" disabled={isSubmitting}>{isSubmitting ? "Updating..." : "Update Group"}</Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}
