"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Navigation from "@/components/Navigation";
import ChatInterface from "@/components/ChatInterface";

export default function StudentChatPage() {
    const router = useRouter();
    const [user, setUser] = useState<any>(null);

    useEffect(() => {
        const token = localStorage.getItem("token");
        const role = localStorage.getItem("role");

        if (!token || role !== "STUDENT") {
            router.push("/login");
            return;
        }

        setUser({
            name: localStorage.getItem("name"),
            email: localStorage.getItem("email"),
            role: role
        });
    }, [router]);

    if (!user) return null;

    return (
        <div className="flex min-h-screen">
            <Navigation role="STUDENT" />
            <div className="flex-1 p-4 lg:p-6 bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 h-screen overflow-hidden">
                <ChatInterface role="STUDENT" currentUser={user} />
            </div>
        </div>
    );
}
