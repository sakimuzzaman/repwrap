"use client";

import { useState, useEffect } from "react";
import { io } from "socket.io-client";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { formatDistanceToNow } from "date-fns";
import axiosInstance from "@/lib/axios";
import { X } from "lucide-react";

interface Message {
    sender_id: number;
    message: string;
}

interface User {
    id: number;
    name: string;
    profile_image: string;
    created_at: string;
}

interface Group {
    id: number;
    name: string;
    image: any;
}

interface ChatProps {
    userId: number;
}

const socket = io("http://localhost:3000");

export default function Chat({ userId }: ChatProps) {
    const [messages, setMessages] = useState<Message[]>([]);
    const [message, setMessage] = useState<string>("");
    const [users, setUsers] = useState<User[]>([]);
    const [groups, setGroups] = useState<Group[]>([]); // Group state
    const [activeChats, setActiveChats] = useState<number[]>([]);

    useEffect(() => {
        // Fetch users and groups
        axiosInstance.get<User[]>("/chatting/members").then(res => setUsers(res.data));
        // Demo group list
        setGroups([
            { id: 1, name: "Group 1", image: null },
            { id: 2, name: "Group 2", image: null },
            { id: 3, name: "Group 3", image: null },
        ]);
    }, []);

    useEffect(() => {
        if (activeChats.length > 0) {
            axiosInstance.get<Message[]>(`/messages/${activeChats[activeChats.length - 1]}`)
                .then(res => setMessages(res.data));
        }
    }, [activeChats]);

    useEffect(() => {
        socket.on("receive_message", (data: Message) => {
            setMessages(prev => [...prev, data]);
        });
        return () => {
            socket.off("receive_message");
        };
    }, []);

    const sendMessage = () => {
        if (!message.trim()) return;
        const newMessage: Message = { sender_id: userId, message };
        socket.emit("send_message", newMessage);
        axiosInstance.post("/send-message", newMessage);
        setMessage("");
    };

    const handleChatOpen = (userId: number) => {
        setActiveChats(prev => {
            const updatedChats = prev.includes(userId) ? prev : [...prev, userId];
            return updatedChats.length > 2 ? updatedChats.slice(1) : updatedChats;
        });
    };

    const handleChatClose = (chatId: number) => {
        setActiveChats(prev => prev.filter(id => id !== chatId));
    };

    const getInitials = (name: string) => {
        const nameArray = name.split(" ");
        return nameArray.map(n => n.charAt(0).toUpperCase()).join("");
    };

    // Handle Enter for sending message and Shift+Enter for new line
    const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            sendMessage();
        }
    };

    return (
        <div className="flex h-[calc(100vh-84px)]">
            <div className="w-80 bg-gray-100 dark:bg-gray-800 p-4 overflow-y-auto">
                {/* Group List Section */}
                <h2 className="text-xl font-semibold mb-4">Groups</h2>
                <div className="space-y-4 max-h-72 overflow-y-auto">
                    {groups.map(group => (
                        <div
                            key={group.id}
                            className="flex items-center space-x-2 cursor-pointer"
                            onClick={() => handleChatOpen(group.id)} // Handle group chat
                        >
                            {group.image ? (
                                <img
                                    src={group.image}
                                    alt={group.name}
                                    className="w-10 h-10 rounded-full"
                                />
                            ) : (
                                <div className="w-10 h-10 rounded-full bg-blue-500 text-white flex items-center justify-center">
                                    {getInitials(group.name)}
                                </div>
                            )}
                            <div className="flex-1">
                                <p className="font-semibold text-black dark:text-white">{group.name}</p>
                            </div>
                        </div>
                    ))}
                </div>

                {/* User List Section */}
                <h2 className="text-xl font-semibold mb-4 mt-6">Users</h2>
                <div className="space-y-4">
                    {users.map(user => (
                        <div
                            key={user.id}
                            className="flex items-center space-x-2 cursor-pointer"
                            onClick={() => handleChatOpen(user.id)}
                        >
                            {user.profile_image ? (
                                <img
                                    src={user.profile_image}
                                    alt={user.name}
                                    className="w-10 h-10 rounded-full"
                                />
                            ) : (
                                <div className="w-10 h-10 rounded-full bg-blue-500 text-white flex items-center justify-center">
                                    {getInitials(user.name)}
                                </div>
                            )}
                            <div className="flex-1">
                                <p className="font-semibold text-black dark:text-white">{user.name}</p>
                                <p className="text-sm text-gray-500 dark:text-gray-400">
                                    {formatDistanceToNow(new Date(user.created_at))} ago
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <div className="flex-1 flex space-x-4 overflow-x-auto p-4">
                {activeChats.map(chatId => {
                    const user = users.find(u => u.id === chatId);
                    const group = groups.find(g => g.id === chatId); // For group chat
                    const currentUser: any = user || group;
                    return (
                        <Card
                            key={chatId}
                            className="w-96 shadow-md border relative bg-white dark:bg-gray-700"
                        >
                            <CardHeader className="flex flex-row justify-between items-center bg-gradient-to-r from-blue-500 to-teal-500 text-white rounded-t-lg">
                                <div className="flex flex-row items-center justify-between space-x-2">
                                    {currentUser?.profile_image ? (
                                        <img
                                            src={currentUser.profile_image}
                                            alt={currentUser?.name}
                                            className="w-10 h-10 rounded-full"
                                        />
                                    ) : (
                                        <div className="w-10 h-10 rounded-full bg-blue-500 text-white flex items-center justify-center">
                                            {getInitials(currentUser?.name || "")}
                                        </div>
                                    )}
                                    <div>
                                        <CardTitle>{currentUser?.name}</CardTitle>
                                    </div>
                                </div>
                                <button
                                    onClick={() => handleChatClose(chatId)}
                                    className="text-white hover:text-gray-200"
                                >
                                    <X size={20} />
                                </button>
                            </CardHeader>
                            <div>
                                <CardContent className="h-96 overflow-y-auto flex flex-col gap-2 p-4 bg-gray-50 dark:bg-gray-800">
                                    {messages.map((msg, i) => (
                                        <div
                                            key={i}
                                            className={`p-2 rounded-lg ${msg.sender_id === userId
                                                ? "bg-blue-500 text-white ml-auto"
                                                : "bg-gray-200 text-black mr-auto"
                                                } max-w-xs`}
                                        >
                                            {msg.message}
                                        </div>
                                    ))}
                                </CardContent>
                            </div>
                            <div className="p-4 flex gap-2 border-t border-gray-200 dark:border-gray-600">
                                <Textarea
                                    placeholder="Type a message..."
                                    value={message}
                                    onChange={(e) => setMessage(e.target.value)}
                                    onKeyDown={handleKeyDown} // Handle keydown event for Enter/Shift+Enter
                                    rows={2}
                                    className="flex-1 dark:bg-gray-600 dark:text-white"
                                />
                                <Button onClick={sendMessage}>Send</Button>
                            </div>
                        </Card>
                    );
                })}
            </div>
        </div>
    );
}
