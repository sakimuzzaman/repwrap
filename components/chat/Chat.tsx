"use client";

import { useState, useEffect, useRef } from "react";
import { io, Socket } from "socket.io-client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { formatDistanceToNow } from "date-fns";
import axiosInstance from "@/lib/axios";
import { X, Settings, Paperclip } from "lucide-react";
import Cookies from 'js-cookie';
import { useRouter } from "next/navigation";
import { CreateModal } from "./group/modals/CreateModal";
import { EditModal } from "./group/modals/EditModal";

interface Message {
    id: number;
    sender_id: number;
    receiver_id: number;
    group_id: number | null;
    message: string;
    name: string | null;
    files: any,
    created_at: string;
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
    profile: string | null;
}

interface ActiveChat {
    type: 'user' | 'group';
    id: number;
    name: string;
    image: string | null;
}

interface ChatMessages {
    [key: string]: Message[]; // Key format: 'user-1' or 'group-3'
}

// const socket: Socket = io("http://localhost:3000", {
//     autoConnect: false
// });

const socket: Socket = io(process.env.NEXT_PUBLIC_SOCKET_URL, {
    transports: ["websocket", "polling"],
    autoConnect: false
});

export default function Chat() {
    const router = useRouter();
    const [user, setUser] = useState<User | null>(null);
    const [users, setUsers] = useState<User[]>([]);
    const [groups, setGroups] = useState<Group[]>([]);
    const [activeChats, setActiveChats] = useState<ActiveChat[]>([]);
    const [messages, setMessages] = useState<ChatMessages>({});
    const [inputMessages, setInputMessages] = useState<{ [key: string]: string }>({});
    const messagesEndRef = useRef<HTMLDivElement>(null);
    let messageSound: HTMLAudioElement | null = null;

    const [filePreviews, setFilePreviews] = useState<{ [key: string]: any }>({});


    const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>, chatType: string, chatId: number) => {
        const files = e.target.files;
        if (!files) return;

        const chatKey = `${chatType}-${chatId}`;
        const newFiles = Array.from(files).map((file) => ({
            file, // Store actual file object
            preview: file.type.startsWith("image/") ? URL.createObjectURL(file) : null,
            type: file.type.startsWith("image/") ? "image" : "document",
            name: file.name
        }));

        setFilePreviews((prev) => ({
            ...prev,
            [chatKey]: [...(prev[chatKey] || []), ...newFiles],
        }));

        e.target.value = ""; // Reset input
    };


    interface FilePreview {
        preview?: string;
        type: "image" | "document";
        name: string;
    }

    const removeFile = (chatKey: string, index: number): void => {
        setFilePreviews((prev: { [key: string]: FilePreview[] }) => ({
            ...prev,
            [chatKey]: prev[chatKey].filter((_, i) => i !== index),
        }));
    }



    if (typeof window !== "undefined") {
        messageSound = new Audio("message_tone.mp3");
    }

    useEffect(() => {
        // Authentication check
        const userCookie = Cookies.get('user');
        if (!userCookie) {
            router.push('/login');
            return;
        }

        const parsedUser = JSON.parse(userCookie);

        setUser(parsedUser);

        // Connect socket after user is set
        socket.auth = { userId: parsedUser.id };
        socket.connect();

        // Fetch initial data
        const fetchData = async () => {
            try {
                const [usersRes, groupsRes] = await Promise.all([
                    axiosInstance.get<User[]>("/chatting/members"),
                    axiosInstance.get<Group[]>("/groups/index")
                ]);
                setUsers(usersRes.data);
                setGroups(groupsRes.data);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchData();

        // Socket event listeners
        const handleReceiveMessage = (message: Message) => {

            const cuser: any = Cookies.get('user');
            const usr: any = JSON.parse(cuser);

            const chatKey = message.group_id
                ? `group-${message.group_id}`
                : `user-${usr?.id == message.receiver_id ? message.sender_id : message.receiver_id}`;

            setMessages(prev => ({
                ...prev,
                [chatKey]: [...(prev[chatKey] || []), message]
            }));

            if (usr.id != message.sender_id) {
                messageSound?.play();
                // messageSound?.play();
            }

            scrollToBottom();
        };

        socket.on('receive_message', handleReceiveMessage);

        return () => {
            socket.off('receive_message', handleReceiveMessage);
            socket.disconnect();
        };
    }, [router]);


    // app/chat/page.tsx
    const openChat = (type: 'user' | 'group', id: number) => {
        const target = type === 'user'
            ? users.find(u => u.id === id)
            : groups.find(g => g.id === id);

        if (!target) return;

        const newChat: ActiveChat = {
            type,
            id,
            name: target.name,
            image: type === 'user'
                ? (target as User).profile_image
                : (target as Group).profile
        };

        setActiveChats(prev => {
            const exists = prev.some(c => c.type === type && c.id === id);
            if (exists) return prev;

            const updated = [...prev, newChat].slice(-2);
            return updated;
        });


        if (type === 'group') {
            socket.emit("join_group", id);
        }

        fetchMessages(type, id);
    };

    const closeChat = (type: 'user' | 'group', id: number) => {
        setActiveChats(prev => prev.filter(c => !(c.type === type && c.id === id)));
    };

    const fetchMessages = async (type: 'user' | 'group', id: number) => {
        try {
            const endpoint = type === 'user'
                ? `/messages/user/${id}`
                : `/messages/group/${id}`;

            const response = await axiosInstance.get<Message[]>(endpoint);
            const chatKey = `${type}-${id}`;

            setMessages(prev => ({
                ...prev,
                [chatKey]: response.data
            }));

            scrollToBottom();
        } catch (error) {
            console.error("Error fetching messages:", error);
        }
    };

   
    const sendMessage = async (type: 'user' | 'group', id: number) => {
        if (!user) return;

        const chatKey = `${type}-${id}`;
        const content = inputMessages[chatKey]?.trim();
        const files = filePreviews[chatKey] || [];

        if (!content && files.length === 0) return;

        const tempId = Date.now(); // For optimistic update
        let newMessage: Message = {
            id: tempId,
            sender_id: user.id,
            receiver_id: type === 'user' ? id : 0,
            group_id: type === 'group' ? id : null,
            name: type === 'group' ? user.name : null,
            message: content,
            files: files, // Store uploaded files preview temporarily
            created_at: new Date().toISOString()
        };


        setInputMessages(prev => ({ ...prev, [chatKey]: '' }));
        setFilePreviews(prev => ({ ...prev, [chatKey]: [] })); // Clear file previews after sending

        try {
            const formData = new FormData();
            formData.append("receiver_id", type == 'user' ? id.toString() : "");
            formData.append("group_id", type == 'group' ? id.toString() : "");
            formData.append("message", content);

            files.forEach((file: any) => {
                formData.append("files[]", file.file); // Append actual file object
            });

            const response = await axiosInstance.post("/send-message", formData, {
                headers: {
                    "Content-Type": "multipart/form-data"
                }
            });

            const realMessage = response.data.chat; // Get real message from API response

            const tempId = Date.now(); // For optimistic update
            newMessage = {
                id: tempId,
                sender_id: user.id,
                receiver_id: type === 'user' ? id : 0,
                group_id: type === 'group' ? id : null,
                name: type === 'group' ? user.name : null,
                message: content,
                created_at: new Date().toISOString(),
                files: realMessage.files
            };


            setMessages(prev => {
                const updatedMessages = prev[chatKey] ? [...prev[chatKey]] : [];
                updatedMessages.push(newMessage);
                return { ...prev, [chatKey]: updatedMessages };
            });
            socket.emit('send_message', newMessage);

            // Update messages with real ID from server
            setMessages(prev => ({
                ...prev,
                [chatKey]: prev[chatKey].map(m => m.id === tempId ? realMessage : m)
            }));

        } catch (error) {
            console.error("Error sending message:", error);
            setMessages(prev => ({
                ...prev,
                [chatKey]: prev[chatKey].filter(m => m.id !== tempId) // Rollback optimistic update
            }));
        }

        scrollToBottom();
    };



    const handleKeyDown = (
        e: React.KeyboardEvent<HTMLTextAreaElement>,
        type: 'user' | 'group',
        id: number
    ) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            sendMessage(type, id);
        }
    };

    const getInitials = (name: string) => {
        return name?.split(' ')
            .map(n => n[0]?.toUpperCase() || '')
            .join('')
            .slice(0, 2);
    };

    const scrollToBottom = () => {
        setTimeout(() => {
            messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
        }, 100);
    };


    return (
        <div className="flex h-[calc(100vh-84px)]">
            {/* Left sidebar */}
            <div className="w-80 bg-gray-100 dark:bg-gray-800 p-4 overflow-y-auto">
                <div className="flex justify-between">
                    <h2 className="text-xl font-semibold mb-4">Groups</h2>
                    <CreateModal>
                        <Button>New Create</Button>
                    </CreateModal>
                </div>
                <div className="space-y-4">
                    {groups.map((group: any) => (
                        <div
                            key={`group-${group.id}`}
                            onClick={() => openChat('group', group.id)}
                            className="flex items-center p-2 hover:bg-gray-200 dark:hover:bg-gray-700 rounded cursor-pointer"
                        >
                            {group.profile ? (
                                <img
                                    src={group.profile}
                                    alt={group.name}
                                    className="w-10 h-10 rounded-full"
                                />
                            ) : (
                                <div className="w-10 h-10 rounded-full bg-blue-500 text-white flex items-center justify-center">
                                    {getInitials(group.name)}
                                </div>
                            )}
                            <span className="ml-3 font-medium dark:text-white">{group.name}</span>
                        </div>
                    ))}
                </div>

                <h2 className="text-xl font-semibold my-4">Users</h2>
                <div className="space-y-4">
                    {users.map(user => (
                        <div
                            key={`user-${user.id}`}
                            onClick={() => openChat('user', user.id)}
                            className="flex items-center p-2 hover:bg-gray-200 dark:hover:bg-gray-700 rounded cursor-pointer"
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
                            <span className="ml-3 font-medium dark:text-white">{user.name}</span>
                        </div>
                    ))}
                </div>
            </div>

            {/* Active chats */}
            <div className="flex-1 flex gap-4 p-4 overflow-x-auto">
                {activeChats.map((chat: any) => {
                    const chatKey = `${chat.type}-${chat.id}`;
                    const chatMessages = messages[chatKey] || [];

                    return (
                        <Card key={chatKey} className="min-w-[400px] flex flex-col shadow-lg">
                            <CardHeader className="bg-gray-100 dark:bg-gray-800 flex-row items-center justify-between py-3">
                                <div className="flex items-center gap-3">
                                    {chat.image ? (
                                        <img
                                            src={chat.image}
                                            alt={chat.name}
                                            className="w-8 h-8 rounded-full"
                                        />
                                    ) : (
                                        <div className="w-8 h-8 rounded-full bg-blue-500 text-white flex items-center justify-center text-sm">
                                            {getInitials(chat.name)}
                                        </div>
                                    )}
                                    <CardTitle className="text-lg">{chat.name}</CardTitle>
                                </div>
                                <div className="flex justify-between space-x-4">
                                    {chat.type == 'group' &&
                                        <button
                                            className="hover:text-gray-600 dark:hover:text-gray-300"
                                        >
                                            <EditModal groupId={chat.id}>
                                                <Settings />
                                            </EditModal>
                                        </button>}

                                    <button
                                        onClick={() => closeChat(chat.type, chat.id)}
                                        className="hover:text-gray-600 dark:hover:text-gray-300"
                                    >
                                        <X size={18} />
                                    </button>
                                </div>
                            </CardHeader>

                            <CardContent className="flex-1 overflow-y-auto space-y-3 p-4">
                                {chatMessages.map((message: any, index) => (
                                    <div key={index}>
                                        {message?.files?.length > 0 && (
                                            <div className={`flex flex-wrap items-center space-x-4 ${message.sender_id === user?.id ? 'justify-end' : 'justify-start'}`}>
                                                {message?.files?.map((file: any, index: number) => {
                                                    // ফাইল টাইপ চেক করা (ইমেজ হলে দেখাবে, নাহলে লিংক দেখাবে)
                                                    const isImage = file.type.startsWith("image/");

                                                    return (
                                                        <div key={index} className="mb-2 shadow-sm">
                                                            {isImage ? (
                                                                // ইমেজ হলে <img> ট্যাগে দেখাবে
                                                                <img
                                                                    src={file.path}
                                                                    alt={file.name}
                                                                    className="w-32 h-32 object-cover rounded-md border border-gray-300 shadow-sm"
                                                                />
                                                            ) : (
                                                                // পিডিএফ বা অন্য ডক হলে লিংক আকারে দেখাবে
                                                                <a
                                                                    href={file.path}
                                                                    target="_blank"
                                                                    rel="noopener noreferrer"
                                                                    className="text-blue-500 underline shadow-sm"
                                                                >
                                                                    {file.name}
                                                                </a>
                                                            )}
                                                        </div>
                                                    );
                                                })}
                                            </div>
                                        )}

                                        <div

                                            className={`flex ${message.sender_id === user?.id ? 'justify-end' : 'justify-start'}`}
                                        >
                                            <div
                                                className={`max-w-[80%] rounded-lg p-3 ${message.sender_id === user?.id
                                                    ? 'bg-blue-500 text-white'
                                                    : 'bg-gray-200 dark:bg-gray-700'
                                                    }`}
                                            >
                                                {message.sender_id != user?.id && <p className="font">{message?.sender ? message?.sender?.name : message.name}</p>}
                                                {message.message && <p className={`text-sm ${message.sender_id === user?.id ? '' : 'ml-2'}`}>{message.message}</p>} 
                                                <p className={`text-xs mt-1 ${message.sender_id === user?.id
                                                    ? 'text-blue-100'
                                                    : 'text-gray-500 ml-2'
                                                    }`}>
                                                    {formatDistanceToNow(new Date(message?.created_at))} ago
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                                <div ref={messagesEndRef} />
                            </CardContent>




                            {/* <Textarea
                                    value={inputMessages[chatKey] || ''}
                                    onChange={(e) => setInputMessages(prev => ({
                                        ...prev,
                                        [chatKey]: e.target.value
                                    }))}
                                    onKeyDown={(e) => handleKeyDown(e, chat.type, chat.id)}
                                    placeholder="Type a message..."
                                    rows={2}
                                    className="resize-none"
                                /> */}

                            <div className="p-4 border-t">
                                <div className="flex items-center gap-2">
                                    {/* File Upload Button */}
                                    <label className="cursor-pointer">
                                        <input
                                            type="file"
                                            accept="image/*,.pdf,.doc,.docx"
                                            multiple
                                            className="hidden"
                                            onChange={(e) => handleFileUpload(e, chat.type, chat.id)}
                                        />
                                        <Paperclip className="w-6 h-6 text-gray-500 hover:text-gray-700" />
                                    </label>

                                    <Textarea
                                        value={inputMessages[chatKey] || ""}
                                        onChange={(e) =>
                                            setInputMessages((prev) => ({
                                                ...prev,
                                                [chatKey]: e.target.value,
                                            }))
                                        }
                                        onKeyDown={(e) => handleKeyDown(e, chat.type, chat.id)}
                                        placeholder="Type a message..."
                                        rows={2}
                                        className="resize-none flex-1"
                                    />
                                </div>

                                {/* File Previews Section */}
                                {filePreviews[chatKey] && filePreviews[chatKey].length > 0 && (
                                    <div className="mt-4 flex flex-wrap gap-2">
                                        {filePreviews[chatKey].map((file: any, index: number) => (
                                            <div key={index} className="relative group">
                                                {file.type === "image" ? (
                                                    <div className="relative">
                                                        <img
                                                            src={file.preview}
                                                            alt="Preview"
                                                            className="w-16 h-16 rounded-md object-cover"
                                                        />
                                                        {/* Remove Button */}
                                                        <button
                                                            onClick={() => removeFile(chatKey, index)}
                                                            className="absolute -top-2 -right-2 text-red-500 text-xs rounded-full w-5 h-5 flex items-center justify-center opacity-80 hover:opacity-100"
                                                        >
                                                            ❌
                                                        </button>
                                                    </div>
                                                ) : (
                                                    <div className="flex items-center text-red-500 dark:bg-gray-700 px-2 py-1 rounded-md">
                                                        <span className="text-sm text-gray-700 dark:text-white">{file.name}</span>
                                                        {/* Remove Button */}
                                                        <button
                                                            onClick={() => removeFile(chatKey, index)}
                                                            className="ml-2 text-red-500 text-xs hover:text-red-700"
                                                        >
                                                            ❌
                                                        </button>
                                                    </div>
                                                )}
                                            </div>
                                        ))}
                                    </div>
                                )}

                                <div className="mt-2 flex justify-end space-x-2 items-center">
                                    {/* File Upload Button */}
                                    {/* <label className="cursor-pointer">
                                        <input
                                            type="file"
                                            accept="image/*,.pdf,.doc,.docx"
                                            multiple
                                            className="hidden"
                                            onChange={(e) => handleFileUpload(e, chat.type, chat.id)}
                                        />
                                        <Paperclip className="w-6 h-6 text-gray-500 hover:text-gray-700" />
                                    </label> */}
                                    <Button onClick={() => sendMessage(chat.type, chat.id)}>
                                        Send
                                    </Button>
                                </div>

                            </div>

                        </Card>
                    );
                })}
            </div>
        </div>
    );
}