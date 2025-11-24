"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
    User,
    BookOpen,
    Calendar,
    Bell,
    TrendingUp,
    Award,
    FileText,
    LogOut,
    Menu,
    X
} from "lucide-react";

export default function ParentDashboard() {
    const router = useRouter();
    const [user, setUser] = useState<any>(null);

    useEffect(() => {
        const token = localStorage.getItem("token");
        const role = localStorage.getItem("role");

        if (!token || role !== "PARENT") {
            router.push("/login");
            return;
        }

        setUser({
            name: localStorage.getItem("name"),
            email: localStorage.getItem("email")
        });
    }, [router]);

    const handleLogout = () => {
        localStorage.clear();
        router.push("/");
    };

    const children = [
        { name: "Emma Anderson", grade: "Grade 10", class: "10-A", avatar: "👧" },
        { name: "Liam Anderson", grade: "Grade 8", class: "8-B", avatar: "👦" }
    ];

    const stats = [
        { icon: Award, label: "Avg. Grade", value: "A-", color: "from-blue-400 to-blue-600", bgColor: "bg-blue-50" },
        { icon: TrendingUp, label: "Attendance", value: "96%", color: "from-green-400 to-green-600", bgColor: "bg-green-50" },
        { icon: BookOpen, label: "Assignments", value: "12/15", color: "from-purple-400 to-purple-600", bgColor: "bg-purple-50" },
        { icon: Bell, label: "New Notices", value: "3", color: "from-orange-400 to-orange-600", bgColor: "bg-orange-50" }
    ];

    const recentGrades = [
        { subject: "Mathematics", grade: "A", student: "Emma", color: "blue" },
        { subject: "Science", grade: "B+", student: "Liam", color: "green" },
        { subject: "English", grade: "A-", student: "Emma", color: "purple" }
    ];

    const upcomingEvents = [
        { title: "Parent-Teacher Meeting", date: "Nov 25", time: "3:00 PM" },
        { title: "Science Fair", date: "Nov 28", time: "10:00 AM" },
        { title: "Sports Day", date: "Dec 2", time: "9:00 AM" }
    ];

    if (!user) return null;

    return (
        <div className="min-h-screen pb-20">
            <header className="bg-gradient-to-r from-green-500 via-teal-500 to-blue-500 text-white p-6 sticky top-0 z-50 shadow-lg">
                <div className="max-w-7xl mx-auto flex items-center justify-between">
                    <div>
                        <h1 className="text-2xl font-bold">Welcome, {user.name}! 👨‍👩‍👧</h1>
                        <p className="text-sm opacity-90">Parent Dashboard</p>
                    </div>
                    <button onClick={handleLogout} className="flex items-center gap-2 bg-white/20 hover:bg-white/30 px-4 py-2 rounded-lg">
                        <LogOut className="w-5 h-5" />
                        <span className="hidden md:inline">Logout</span>
                    </button>
                </div>
            </header>

            <div className="max-w-7xl mx-auto p-6 space-y-8">
                {/* Children Cards */}
                <div className="grid md:grid-cols-2 gap-4">
                    {children.map((child, index) => (
                        <div key={index} className="card-hover bg-gradient-to-br from-blue-50 to-purple-50">
                            <div className="flex items-center gap-4">
                                <div className="text-5xl">{child.avatar}</div>
                                <div>
                                    <h3 className="text-xl font-bold text-gray-800">{child.name}</h3>
                                    <p className="text-gray-600">{child.grade} - Class {child.class}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Stats */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                    {stats.map((stat, index) => (
                        <div key={index} className={`card-hover ${stat.bgColor}`}>
                            <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${stat.color} flex items-center justify-center mb-3`}>
                                <stat.icon className="w-6 h-6 text-white" />
                            </div>
                            <p className="text-sm text-gray-600 mb-1">{stat.label}</p>
                            <p className="text-2xl font-bold text-gray-800">{stat.value}</p>
                        </div>
                    ))}
                </div>

                <div className="grid lg:grid-cols-2 gap-6">
                    {/* Recent Grades */}
                    <div className="card space-y-4">
                        <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
                            <Award className="w-6 h-6 text-yellow-500" />
                            Recent Grades
                        </h2>
                        <div className="space-y-3">
                            {recentGrades.map((grade, index) => (
                                <div key={index} className={`p-4 rounded-xl bg-${grade.color}-50 border-2 border-${grade.color}-200`}>
                                    <div className="flex justify-between items-center">
                                        <div>
                                            <h3 className="font-bold text-gray-800">{grade.subject}</h3>
                                            <p className="text-sm text-gray-600">{grade.student}</p>
                                        </div>
                                        <div className="text-3xl font-bold text-gray-800">{grade.grade}</div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Upcoming Events */}
                    <div className="card space-y-4">
                        <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
                            <Calendar className="w-6 h-6 text-purple-500" />
                            Upcoming Events
                        </h2>
                        <div className="space-y-3">
                            {upcomingEvents.map((event, index) => (
                                <div key={index} className="p-3 rounded-lg bg-gradient-to-r from-purple-50 to-pink-50">
                                    <p className="font-semibold text-gray-800">{event.title}</p>
                                    <div className="flex justify-between mt-1 text-sm text-gray-600">
                                        <span>{event.date}</span>
                                        <span>{event.time}</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Quick Actions */}
                <div className="grid md:grid-cols-4 gap-4">
                    {[
                        { icon: "📊", label: "View Reports", color: "blue" },
                        { icon: "📅", label: "Attendance", color: "green" },
                        { icon: "💬", label: "Messages", color: "purple" },
                        { icon: "📢", label: "Notices", color: "orange" }
                    ].map((action, index) => (
                        <button key={index} className={`card-hover text-center p-6 bg-gradient-to-br from-${action.color}-50 to-${action.color}-100`}>
                            <div className="text-4xl mb-2">{action.icon}</div>
                            <p className="font-bold text-gray-800">{action.label}</p>
                        </button>
                    ))}
                </div>
            </div>

            <div className="fixed bottom-10 right-10 text-6xl animate-bounce-slow opacity-20 pointer-events-none">
                👨‍👩‍👧
            </div>
        </div>
    );
}
