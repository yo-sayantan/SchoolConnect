"use client";

import { useState, useEffect } from "react";
import { Send, Search, Phone, Video, MoreVertical, Paperclip, Smile, ArrowLeft, MessageCircle } from "lucide-react";
import { fetchWithAuth } from "@/utils/api";

interface Contact {
    id: string;
    name: string;
    role: string;
    avatar: string;
    status: "online" | "offline" | "away";
    lastMessage: string;
    time: string;
    unread: number;
}

interface Message {
    id: string;
    senderId: string;
    text: string;
    time: string;
    isMe: boolean;
}

export default function ChatInterface({ role, currentUser }: { role: string, currentUser: any }) {
    const [selectedContact, setSelectedContact] = useState<Contact | null>(null);
    const [messageInput, setMessageInput] = useState("");
    const [isMobileView, setIsMobileView] = useState(false);
    const [showSidebar, setShowSidebar] = useState(true);
    const [contacts, setContacts] = useState<Contact[]>([]);
    const [messages, setMessages] = useState<Message[]>([]);
    const [loading, setLoading] = useState(true);

    // Fetch User's Chats
    useEffect(() => {
        if (currentUser?.id) {
            fetchChats();
        }
    }, [currentUser]);

    const fetchChats = async () => {
        try {
            // In a real app, we would fetch enriched chat data (with names/avatars)
            // For this MVP, we'll fetch chats and map them to a display format
            // We might need a way to look up user names if they aren't in the chat object
            const data = await fetchWithAuth(`/communication/chats/user/${currentUser.id}`);

            // Transform backend chat data to Contact interface
            // Assuming backend returns list of Chat objects
            const formattedContacts: Contact[] = data.map((chat: any) => {
                // Find the other participant
                const otherId = chat.participantIds.find((id: string) => id !== currentUser.id) || "Unknown";

                return {
                    id: chat.id.toString(), // Chat ID
                    name: `User ${otherId}`, // Placeholder until we have user lookup
                    role: "Contact",
                    avatar: "👤",
                    status: "offline",
                    lastMessage: chat.lastMessage || "No messages yet",
                    time: chat.lastMessageTime ? new Date(chat.lastMessageTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : "",
                    unread: 0,
                    otherUserId: otherId // Store for reference
                };
            });
            setContacts(formattedContacts);
            setLoading(false);
        } catch (error) {
            console.error("Failed to fetch chats", error);
            setLoading(false);
        }
    };

    // Fetch Messages when a contact (chat) is selected
    useEffect(() => {
        if (selectedContact) {
            fetchMessages(selectedContact.id);
            // Set up polling or websocket here for real-time
            const interval = setInterval(() => fetchMessages(selectedContact.id), 5000);
            return () => clearInterval(interval);
        }
    }, [selectedContact]);

    const fetchMessages = async (chatId: string) => {
        try {
            const data = await fetchWithAuth(`/communication/chats/${chatId}/messages`);
            const formattedMessages: Message[] = data.map((msg: any) => ({
                id: msg.id.toString(),
                senderId: msg.senderId,
                text: msg.content,
                time: new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
                isMe: msg.senderId === currentUser.id
            }));
            setMessages(formattedMessages);
        } catch (error) {
            console.error("Failed to fetch messages", error);
        }
    };

    useEffect(() => {
        const handleResize = () => {
            setIsMobileView(window.innerWidth < 768);
            if (window.innerWidth < 768) {
                setShowSidebar(!selectedContact);
            } else {
                setShowSidebar(true);
            }
        };

        handleResize();
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, [selectedContact]);

    const handleSendMessage = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!messageInput.trim() || !selectedContact) return;

        try {
            const payload = {
                senderId: currentUser.id,
                content: messageInput
            };

            const response = await fetchWithAuth(`/communication/chats/${selectedContact.id}/messages`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload)
            });

            if (response) {
                setMessageInput("");
                fetchMessages(selectedContact.id); // Refresh messages
                fetchChats(); // Refresh last message in sidebar
            }
        } catch (error) {
            console.error("Failed to send message", error);
        }
    };

    return (
        <div className="flex h-[calc(100vh-2rem)] bg-white/80 backdrop-blur-xl rounded-2xl shadow-xl overflow-hidden border border-white/20">
            {/* Sidebar - Contacts List */}
            <div className={`${showSidebar ? 'w-full md:w-80' : 'hidden md:block md:w-80'} bg-gray-50/50 border-r border-gray-200 flex flex-col`}>
                <div className="p-4 border-b border-gray-200">
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                        <input
                            type="text"
                            placeholder="Search messages..."
                            className="w-full pl-10 pr-4 py-2 rounded-xl bg-white border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                        />
                    </div>
                </div>

                <div className="flex-1 overflow-y-auto">
                    {loading ? (
                        <div className="p-4 text-center text-gray-500">Loading chats...</div>
                    ) : contacts.length === 0 ? (
                        <div className="p-4 text-center text-gray-500">No conversations yet.</div>
                    ) : (
                        contacts.map(contact => (
                            <div
                                key={contact.id}
                                onClick={() => {
                                    setSelectedContact(contact);
                                    if (isMobileView) setShowSidebar(false);
                                }}
                                className={`p-4 flex items-center gap-3 cursor-pointer hover:bg-white/60 transition-colors ${selectedContact?.id === contact.id ? 'bg-blue-50 border-r-4 border-blue-500' : ''}`}
                            >
                                <div className="relative">
                                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center text-2xl text-white shadow-md">
                                        {contact.avatar}
                                    </div>
                                    <div className={`absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-white ${contact.status === 'online' ? 'bg-green-500' : contact.status === 'away' ? 'bg-yellow-500' : 'bg-gray-400'}`} />
                                </div>
                                <div className="flex-1 min-w-0">
                                    <div className="flex justify-between items-start mb-1">
                                        <h3 className="font-bold text-gray-800 truncate">{contact.name}</h3>
                                        <span className="text-xs text-gray-500 whitespace-nowrap">{contact.time}</span>
                                    </div>
                                    <div className="flex justify-between items-center">
                                        <p className="text-sm text-gray-500 truncate">{contact.lastMessage}</p>
                                        {contact.unread > 0 && (
                                            <span className="w-5 h-5 rounded-full bg-blue-500 text-white text-xs flex items-center justify-center font-bold">
                                                {contact.unread}
                                            </span>
                                        )}
                                    </div>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </div>

            {/* Chat Area */}
            <div className={`${!showSidebar ? 'w-full' : 'hidden md:flex'} flex-1 flex flex-col bg-white/50`}>
                {selectedContact ? (
                    <>
                        {/* Chat Header */}
                        <div className="p-4 border-b border-gray-200 flex items-center justify-between bg-white/80 backdrop-blur-md sticky top-0 z-10">
                            <div className="flex items-center gap-3">
                                <button
                                    onClick={() => setShowSidebar(true)}
                                    className="md:hidden p-2 hover:bg-gray-100 rounded-full"
                                >
                                    <ArrowLeft className="w-5 h-5" />
                                </button>
                                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center text-xl text-white">
                                    {selectedContact.avatar}
                                </div>
                                <div>
                                    <h3 className="font-bold text-gray-800">{selectedContact.name}</h3>
                                    <p className="text-xs text-green-500 font-medium flex items-center gap-1">
                                        <span className="w-1.5 h-1.5 rounded-full bg-green-500"></span>
                                        {selectedContact.status === 'online' ? 'Online' : 'Offline'}
                                    </p>
                                </div>
                            </div>
                            <div className="flex items-center gap-2 text-gray-500">
                                <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                                    <Phone className="w-5 h-5" />
                                </button>
                                <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                                    <Video className="w-5 h-5" />
                                </button>
                                <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                                    <MoreVertical className="w-5 h-5" />
                                </button>
                            </div>
                        </div>

                        {/* Messages List */}
                        <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50/30">
                            {messages.map((msg) => (
                                <div
                                    key={msg.id}
                                    className={`flex ${msg.isMe ? 'justify-end' : 'justify-start'}`}
                                >
                                    <div
                                        className={`max-w-[70%] rounded-2xl p-4 shadow-sm ${msg.isMe
                                            ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-br-none'
                                            : 'bg-white text-gray-800 rounded-bl-none'
                                            }`}
                                    >
                                        <p className="text-sm">{msg.text}</p>
                                        <p className={`text-[10px] mt-1 text-right ${msg.isMe ? 'text-blue-100' : 'text-gray-400'}`}>
                                            {msg.time}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Input Area */}
                        <div className="p-4 bg-white border-t border-gray-200">
                            <form onSubmit={handleSendMessage} className="flex items-center gap-2">
                                <button type="button" className="p-2 text-gray-400 hover:text-gray-600 transition-colors">
                                    <Paperclip className="w-5 h-5" />
                                </button>
                                <div className="flex-1 relative">
                                    <input
                                        type="text"
                                        value={messageInput}
                                        onChange={(e) => setMessageInput(e.target.value)}
                                        placeholder="Type a message..."
                                        className="w-full pl-4 pr-10 py-3 rounded-xl bg-gray-100 border-none focus:ring-2 focus:ring-blue-500 transition-all"
                                    />
                                    <button type="button" className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600">
                                        <Smile className="w-5 h-5" />
                                    </button>
                                </div>
                                <button
                                    type="submit"
                                    disabled={!messageInput.trim()}
                                    className="p-3 bg-blue-500 text-white rounded-xl hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-lg hover:shadow-blue-500/30"
                                >
                                    <Send className="w-5 h-5" />
                                </button>
                            </form>
                        </div>
                    </>
                ) : (
                    <div className="flex-1 flex flex-col items-center justify-center text-gray-400 p-8 text-center">
                        <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-4 animate-float">
                            <MessageCircle className="w-12 h-12 text-gray-300" />
                        </div>
                        <h3 className="text-xl font-bold text-gray-600 mb-2">Select a conversation</h3>
                        <p className="max-w-xs">Choose a contact from the sidebar to start chatting with teachers, principal, or admin.</p>
                    </div>
                )}
            </div>
        </div>
    );
}

