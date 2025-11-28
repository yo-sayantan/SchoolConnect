"use client";

import { useRouter, usePathname } from "next/navigation";
import { Home, BookOpen, Calendar, Bell, User, LogOut, Menu, X, MessageCircle } from "lucide-react";
import { useState } from "react";

interface NavItem {
    icon: any;
    label: string;
    path: string;
    emoji: string;
    color: string;
}

export default function Navigation({ role }: { role: string }) {
    const router = useRouter();
    const pathname = usePathname();
    const [isOpen, setIsOpen] = useState(false);

    const roleBasedNav: Record<string, NavItem[]> = {
        STUDENT: [
            { icon: Home, label: "Dashboard", path: `/dashboard/student`, emoji: "🏠", color: "blue" },
            { icon: BookOpen, label: "Homework", path: `/homework`, emoji: "📚", color: "purple" },
            { icon: Calendar, label: "Timetable", path: `/timetable`, emoji: "📅", color: "green" },
            { icon: MessageCircle, label: "Messages", path: `/dashboard/student/chat`, emoji: "💬", color: "pink" },
            { icon: Bell, label: "Notices", path: `/notices`, emoji: "📢", color: "orange" },
            { icon: User, label: "Profile", path: `/profile`, emoji: "👤", color: "gray" }
        ],
        TEACHER: [
            { icon: Home, label: "Dashboard", path: `/dashboard/teacher`, emoji: "🏠", color: "blue" },
            { icon: BookOpen, label: "My Classes", path: `/classes`, emoji: "👥", color: "purple" },
            { icon: Calendar, label: "Schedule", path: `/timetable`, emoji: "📅", color: "green" },
            { icon: MessageCircle, label: "Messages", path: `/dashboard/teacher/chat`, emoji: "💬", color: "pink" },
            { icon: Bell, label: "Notices", path: `/notices`, emoji: "📢", color: "orange" },
            { icon: User, label: "Profile", path: `/profile`, emoji: "👤", color: "gray" }
        ],
        PARENT: [
            { icon: Home, label: "Dashboard", path: `/dashboard/parent`, emoji: "🏠", color: "blue" },
            { icon: BookOpen, label: "Progress", path: `/progress`, emoji: "📊", color: "purple" },
            { icon: Calendar, label: "Events", path: `/events`, emoji: "📅", color: "green" },
            { icon: MessageCircle, label: "Messages", path: `/dashboard/parent/chat`, emoji: "💬", color: "pink" },
            { icon: Bell, label: "Notices", path: `/notices`, emoji: "📢", color: "orange" },
            { icon: User, label: "Profile", path: `/profile`, emoji: "👤", color: "gray" }
        ],
        PRINCIPAL: [
            { icon: Home, label: "Dashboard", path: `/dashboard/principal`, emoji: "🏠", color: "blue" },
            { icon: BookOpen, label: "Reports", path: `/reports`, emoji: "📊", color: "purple" },
            { icon: Calendar, label: "Events", path: `/events`, emoji: "📅", color: "green" },
            { icon: MessageCircle, label: "Messages", path: `/dashboard/principal/chat`, emoji: "💬", color: "pink" },
            { icon: Bell, label: "Notices", path: `/notices`, emoji: "📢", color: "orange" },
            { icon: User, label: "Settings", path: `/settings`, emoji: "⚙️", color: "gray" }
        ],
        ADMIN_ASSISTANT: [
            { icon: Home, label: "Dashboard", path: `/dashboard/admin_assistant`, emoji: "🏠", color: "blue" },
            { icon: BookOpen, label: "Students", path: `/students`, emoji: "👥", color: "purple" },
            { icon: Calendar, label: "Events", path: `/events`, emoji: "📅", color: "green" },
            { icon: MessageCircle, label: "Messages", path: `/dashboard/admin_assistant/chat`, emoji: "💬", color: "pink" },
            { icon: Bell, label: "Notices", path: `/notices`, emoji: "📢", color: "orange" },
            { icon: User, label: "Settings", path: `/settings`, emoji: "⚙️", color: "gray" }
        ]
    };

    const navItems = roleBasedNav[role] || roleBasedNav.STUDENT;

    const handleLogout = () => {
        localStorage.clear();
        router.push("/");
    };

    return (
        <>
            {/* Mobile Menu Button */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="lg:hidden fixed bottom-6 right-6 z-50 w-14 h-14 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-full shadow-2xl flex items-center justify-center hover:scale-110 transition-transform"
            >
                {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>

            {/* Mobile Overlay */}
            {isOpen && (
                <div
                    className="lg:hidden fixed inset-0 bg-black/50 z-40"
                    onClick={() => setIsOpen(false)}
                />
            )}

            {/* Navigation Sidebar */}
            <nav
                className={`fixed left-0 top-0 h-full bg-white dark:bg-gray-800 shadow-2xl z-40 transition-transform duration-300 ${isOpen ? "translate-x-0" : "-translate-x-full"
                    } lg:translate-x-0 w-64 lg:w-20 hover:lg:w-64 group`}
            >
                <div className="p-4 space-y-2">
                    {/* Logo */}
                    <div className="mb-8 text-center lg:group-hover:text-left transition-all">
                        <div className="text-4xl mb-2">🎓</div>
                        <h2 className="font-bold text-lg text-gray-800 dark:text-white hidden lg:group-hover:block">
                            SchoolConnect
                        </h2>
                    </div>

                    {/* Nav Items */}
                    {navItems.map((item, index) => {
                        const isActive = pathname === item.path;
                        return (
                            <button
                                key={index}
                                onClick={() => {
                                    router.push(item.path);
                                    setIsOpen(false);
                                }}
                                className={`w-full flex items-center gap-4 p-4 rounded-xl transition-all ${isActive
                                    ? `bg-gradient-to-r from-${item.color}-100 to-${item.color}-200 dark:from-${item.color}-900/40 dark:to-${item.color}-800/40 shadow-lg scale-105`
                                    : "hover:bg-gray-100 dark:hover:bg-gray-700"
                                    }`}
                            >
                                <div className={`text-2xl ${isActive ? "animate-bounce-slow" : ""}`}>
                                    {item.emoji}
                                </div>
                                <span
                                    className={`font-semibold ${isActive ? "text-gray-900 dark:text-white" : "text-gray-600 dark:text-gray-300"
                                        } lg:hidden lg:group-hover:block`}
                                >
                                    {item.label}
                                </span>
                            </button>
                        );
                    })}

                    {/* Logout */}
                    <button
                        onClick={handleLogout}
                        className="w-full flex items-center gap-4 p-4 rounded-xl hover:bg-red-100 dark:hover:bg-red-900/20 transition-all mt-8"
                    >
                        <LogOut className="w-6 h-6 text-red-500" />
                        <span className="font-semibold text-red-500 lg:hidden lg:group-hover:block">
                            Logout
                        </span>
                    </button>
                </div>
            </nav>

            {/* Spacer for desktop */}
            <div className="hidden lg:block w-20" />
        </>
    );
}
