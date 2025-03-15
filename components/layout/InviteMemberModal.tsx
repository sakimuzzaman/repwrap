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
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useRouter } from "next/navigation";
import axiosInstance from "@/lib/axios";
import toast from "react-hot-toast";
import { X } from "lucide-react";

export function InviteMemberModal({ openModal, onClose }: any) {
  const [open, setOpen] = useState(false);
  const [workspace, setWorkspace] = useState<any>(null);
  const [existingMembers, setExistingMembers] = useState<any[]>([]);
  const [allUsers, setAllUsers] = useState<any[]>([]);
  const [selectedMembers, setSelectedMembers] = useState<number[]>([]);
  const [email, setEmail] = useState("");
  const [search, setSearch] = useState("");
  const router = useRouter();

  useEffect(() => {
    setOpen(openModal);
  }, [openModal]);

  useEffect(() => {
    if (!open) {
      onClose();
    }
  }, [open]);

  useEffect(() => {
    const fetchWorkspaceData = async () => {
      try {
        const response = await axiosInstance.get("/workspace/members");
        const { workspace, existing_members, all_users } = response.data.data;

        setWorkspace(workspace);
        setExistingMembers(existing_members || []);
        setAllUsers(all_users || []);
      } catch (error) {
        toast.error("Failed to fetch workspace members");
      }
    };

    if (open) fetchWorkspaceData();
  }, [open]);

  const handleSelectMember = (id: number) => {
    setSelectedMembers((prev) =>
      prev.includes(id) ? prev.filter((m) => m !== id) : [...prev, id]
    );
  };

  const handleRemoveSelectedMember = (id: number) => {
    setSelectedMembers((prev) => prev.filter((m) => m !== id));
  };


  const handleInviteByEmail = async () => {
    if (!email) return toast.error("Please enter at least one email");

    // Split the email string by commas and trim any extra spaces
    const emailArray = email.split(',').map(email => email.trim());

    // Validate email format (you can improve this with a better regex if needed)
    const invalidEmails = emailArray.filter(email => !/\S+@\S+\.\S+/.test(email));
    if (invalidEmails.length > 0) {
      return toast.error(`Invalid email(s): ${invalidEmails.join(', ')}`);
    }

    try {
      await axiosInstance.post(`/workspace/${workspace?.id}/member/add/email`, { emails: emailArray });
      toast.success("Invitation sent successfully");
      setEmail(""); // Clear the input field after sending the invitation
    } catch (error) {
      toast.error("Failed to send invitation");
    }
  };

  const handleAddSelectedMembers = async () => {
    if (selectedMembers.length === 0) return toast.error("Select at least one member");
    try {
      await axiosInstance.post(`/workspace/${workspace?.id}/member/add/ids`, { ids: selectedMembers });
      toast.success("Members added successfully");
      setOpen(false);
      setSelectedMembers([]);
      router.refresh();
    } catch (error) {
      toast.error("Failed to add members");
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-[700px]">
        <DialogHeader>
          <DialogTitle>Invite Members</DialogTitle>
          <DialogDescription>Invite by email or select from the list</DialogDescription>
        </DialogHeader>

        {workspace && (
          <div className="mb-4 p-4 border rounded-lg bg-gray-100 flex justify-between items-center">
            <h3 className="text-lg font-semibold">{workspace.name}</h3>
            <p className="text-sm text-gray-600">Admin: <strong>{workspace.admin}</strong> | Total Members: <strong>{workspace.total_members}</strong></p>
          </div>
        )}

        <div className="space-y-2">
          <Label htmlFor="email">Invite via Email</Label>
          <div className="flex gap-2">
            <Input id="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Enter email ex(example@gmail.com, example2@gmail.com)" />
            <Button onClick={handleInviteByEmail}>Send Invitation</Button>
          </div>
        </div>

        <div className="">
          <Input id="search" value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search by name or email" />
        </div>

        {selectedMembers.length > 0 && (
          <div className=" p-2 border rounded-md bg-gray-50 max-h-20 overflow-y-auto">
            <div className="flex flex-wrap gap-2 mt-2">
              {selectedMembers.map((id) => {
                const user = allUsers.find((u) => u.id === id);
                return user ? (
                  <div key={id} className="flex items-center gap-2 p-2 bg-blue-100 rounded-md">
                    <span className="text-xs font-medium">{user.name}</span>
                    <button onClick={() => handleRemoveSelectedMember(id)} className="text-red-600">
                      <X size={14} />
                    </button>
                  </div>
                ) : null;
              })}
            </div>
          </div>
        )}

        <div className="max-h-44 overflow-y-auto border p-2 rounded-md">
          {allUsers
            .filter((user) =>
              user.name.toLowerCase().includes(search.toLowerCase()) ||
              user.email.toLowerCase().includes(search.toLowerCase())
            )
            .map((user) => (
              <div
                key={user.id}
                className={`px-2 py-1 border-b flex justify-between items-center cursor-pointer ${existingMembers.some((m) => m.id === user.id) ? "bg-gray-200" : ""}`}
                onClick={() => handleSelectMember(user.id)}
              >
                <div>
                  <span className="text-xs">{user.name}</span>
                  <p className="text-xs text-gray-500">{user.email}</p>
                </div>
                {existingMembers.some((m) => m.id === user.id) ? (
                  <span className="text-green-600 text-xs">(Already Added)</span>
                ) : selectedMembers.includes(user.id) ? (
                    <span className="text-blue-600 text-xs">(Selected)</span>
                ) : (
                      <span className="text-gray-500 text-xs">(Click to Select)</span>
                )}
              </div>
            ))}
        </div>

        <DialogFooter>
          <Button type="button" variant="outline" onClick={() => setOpen(false)}>
            Cancel
          </Button>
          <Button onClick={handleAddSelectedMembers} disabled={selectedMembers.length === 0}>
            Add Selected Members
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
