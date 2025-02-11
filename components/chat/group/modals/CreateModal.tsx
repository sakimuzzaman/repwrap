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

interface User {
    id: number;
    name: string;
    email: string;
}

interface FormData {
    name: string;
    members: number[];
}

export function CreateModal({ children }: { children: React.ReactNode }) {
    const [open, setOpen] = useState(false);
    const [users, setUsers] = useState<User[]>([]);
    const [loadingUsers, setLoadingUsers] = useState(false);
    const router = useRouter();

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
        reset,
    } = useForm<FormData>();

    // Fetch users when modal opens
    useEffect(() => {
        const fetchUsers = async () => {
            try {
                setLoadingUsers(true);
                const response = await axiosInstance.get("/group/members");
                setUsers(response.data);
            } catch (error) {
                toast.error("Failed to fetch users");
            } finally {
                setLoadingUsers(false);
            }
        };

        if (open) fetchUsers();
    }, [open]);

    const onSubmit = async (data: FormData) => {
        try {
            const response:any = await axiosInstance.post("/groups/store", {
                name: data.name,
                members: data.members,
            });            

            if (response?.data?.code == 201) {
                toast.success(response?.data?.message);
                reset();
                setOpen(false);
                router.refresh();
            }
        } catch (error: any) {
            toast.error(error.response?.data?.message || "Failed to create group");
        }
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>{children}</DialogTrigger>
            <DialogContent className="sm:max-w-[625px]">
                <DialogHeader>
                    <DialogTitle>Create New Group</DialogTitle>
                    <DialogDescription>
                        Create a new group and add members to it
                    </DialogDescription>
                </DialogHeader>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="name">Group Name</Label>
                        <Input
                            id="name"
                            placeholder="Enter group name"
                            {...register("name", {
                                required: "Group name is required",
                                minLength: {
                                    value: 3,
                                    message: "Group name must be at least 3 characters",
                                },
                            })}
                        />
                        {errors.name && (
                            <p className="text-sm text-red-600">{errors.name.message}</p>
                        )}
                    </div>

                    <div className="space-y-2">
                        <Label>Add Members</Label>
                        {loadingUsers ? (
                            <div className="p-4 text-center">Loading users...</div>
                        ) : (
                            <div className="border rounded-md p-2 max-h-48 overflow-y-auto">
                                {users.map((user) => (
                                    <label
                                        key={user.id}
                                        className="flex items-center space-x-2 p-2 hover:bg-gray-100 rounded"
                                    >
                                        <input
                                            type="checkbox"
                                            value={user.id}
                                            {...register("members", {
                                                required: "Select at least one member",
                                            })}
                                            className="h-4 w-4"
                                        />
                                        <span>
                                            {user.name} ({user.email})
                                        </span>
                                    </label>
                                ))}
                            </div>
                        )}
                        {errors.members && (
                            <p className="text-sm text-red-600">{errors.members.message}</p>
                        )}
                    </div>

                    <DialogFooter>
                        <Button
                            type="button"
                            variant="outline"
                            onClick={() => setOpen(false)}
                        >
                            Cancel
                        </Button>
                        <Button type="submit" disabled={isSubmitting}>
                            {isSubmitting ? "Creating..." : "Create Group"}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}