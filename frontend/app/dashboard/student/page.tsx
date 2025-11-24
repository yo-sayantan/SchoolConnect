"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Navigation from "@/components/Navigation";
import {
    BookOpen,
    Calendar,
    Bell,
    Trophy,
    Star,
    TrendingUp
} from "lucide-react";

export default function StudentDashboard() {
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
            email: localStorage.getItem("email")
        });
    }, [router]);

    const stats = [
        { icon: BookOpen, label: "Classes Today", value: "5", color: "from-blue-400 to-blue-600", bgColor: "bg-blue-50 dark:bg-blue-900/20" },
        { icon: Trophy, label: "Attendance", value: "95%", color: "from-green-400 to-green-600", bgColor: "bg-green-50 dark:bg-green-900/20" },
        { icon: Star, label: "Average Grade", value: "A", color: "from-yellow-400 to-yellow-600", bgColor: "bg-yellow-50 dark:bg-yellow-900/20" },
        { icon: TrendingUp, label: "Progress", value: "+12%", color: "from-purple-400 to-purple-600", bgColor: "bg-purple-50 dark:bg-purple-900/20" }
    ];

    const upcomingClasses = [
        { subject: "Mathematics", time: "9:00 AM", teacher: "Mr. Smith", color: "blue" },
        { subject: "Science", time: "10:30 AM", teacher: "Ms. Johnson", color: "green" },
        { subject: "English", time: "1:00 PM", teacher: "Mrs. Davis", color: "purple" }
    ];

    const recentGrades = [
        { subject: "Mathematics", grade: "A+", score: "95/100", color: "blue" },
        { subject: "Science", grade: "A", score: "92/100", color: "green" },
        { subject: "History", grade: "B+", score: "88/100", color: "orange" }
    ];

    const notices = [
        { title: "Sports Day Next Week! 🏃", time: "2 hours ago" },
        { title: "Math Quiz Tomorrow", time: "5 hours ago" },
        { title: "Library Books Due", time: "1 day ago" }
    ];

    if (!user) return null;

    return (
        <div className="flex min-h-screen">
            <Navigation role="STUDENT" />

            <div className="flex-1 p-6 lg:p-8 bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
                <div className="max-w-7xl mx-auto space-y-6">
                    {/* Welcome Header */}
                    <div className="card bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-white">
                        <h1 className="text-3xl font-bold mb-2">Hey, {user.name}! 👋</h1>
                        <p className="opacity-90">Ready to learn something awesome today?</p>
                    </div>

                    {/* Stats Grid */}
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                        {stats.map((stat, index) => (
                            <div key={index} className={`card-hover ${stat.bgColor}`}>
                                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${stat.color} flex items-center justify-center mb-3`}>
                                    <stat.icon className="w-6 h-6 text-white" />
                                </div>
                                <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">{stat.label}</p>
                                <p className="text-2xl font-bold text-gray-800 dark:text-white">{stat.value}</p>
                            </div>
                        ))}
                    </div>

                    <div className="grid lg:grid-cols-3 gap-6">
                        {/* Upcoming Classes */}
                        <div className="lg:col-span-2 card space-y-4">
                            <div className="flex items-center justify-between">
                                <h2 className="text-2xl font-bold text-gray-800 dark:text-white flex items-center gap-2">
                                    <Calendar className="w-6 h-6 text-blue-500" />
                                    Today's Classes
                                </h2>
                                <span className="badge-primary">3 classes</span>
                            </div>

                            <div className="space-y-3">
                                {upcomingClasses.map((cls, index) => (
                                    <div key={index} className="p-4 rounded-xl bg-blue-50 dark:bg-blue-900/20 border-2 border-blue-200 dark:border-blue-800 hover:shadow-md transition-shadow">
                                        <div className="flex items-center justify-between">
                                            <div>
                                                <h3 className="font-bold text-gray-800 dark:text-white text-lg">{cls.subject}</h3>
                                                <p className="text-sm text-gray-600 dark:text-gray-400">with {cls.teacher}</p>
                                            </div>
                                            <div className="px-4 py-2 rounded-lg bg-gradient-to-r from-blue-400 to-blue-600 text-white font-bold">
                                                {cls.time}
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Notices */}
                        <div className="card space-y-4">
                            <h2 className="text-2xl font-bold text-gray-800 dark:text-white flex items-center gap-2">
                                <Bell className="w-6 h-6 text-purple-500" />
                                Notices
                            </h2>

                            <div className="space-y-3">
                                {notices.map((notice, index) => (
                                    <div key={index} className="p-3 rounded-lg bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 hover:shadow-md transition-shadow cursor-pointer">
                                        <p className="font-semibold text-gray-800 dark:text-white text-sm">{notice.title}</p>
                                        <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">{notice.time}</p>
                                    </div>
                                ))}
                            </div>

                            <button className="w-full btn-secondary text-sm py-2">View All Notices</button>
                        </div>
                    </div>

                    {/* Recent Grades */}
                    <div className="card space-y-4">
                        <h2 className="text-2xl font-bold text-gray-800 dark:text-white flex items-center gap-2">
                            <Trophy className="w-6 h-6 text-yellow-500" />
                            Recent Grades
                        </h2>

                        <div className="grid md:grid-cols-3 gap-4">
                            {recentGrades.map((grade, index) => (
                                <div key={index} className="p-6 rounded-xl bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 border-2 border-blue-200 dark:border-blue-700">
                                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">{grade.subject}</p>
                                    <p className="text-4xl font-bold text-gray-800 dark:text-white mb-1">{grade.grade}</p>
                                    <p className="text-sm text-gray-600 dark:text-gray-400">{grade.score}</p>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Quick Actions */}
                    <div className="grid md:grid-cols-4 gap-4">
                        {[
                            { icon: "📚", label: "Homework", path: "/homework" },
                            { icon: "📅", label: "Timetable", path: "/timetable" },
                            { icon: "📊", label: "Progress", path: "/progress" },
                            { icon: "💬", label: "Messages", path: "/messages" }
                        ].map((action, index) => (
                            <button
                                key={index}
                                onClick={() => router.push(action.path)}
                                className="card-hover text-center p-6 bg-gradient-to-br from-blue-50 to-purple-100 dark:from-blue-900/20 dark:to-purple-800/20"
                            >
                                <div className="text-4xl mb-2">{action.icon}</div>
                                <p className="font-bold text-gray-800 dark:text-white">{action.label}</p>
                            </button>
                        ))}
                    </div>
                </div>

                {/* Fun floating elements */}
                <div className="fixed bottom-10 right-10 text-6xl animate-bounce-slow opacity-20 pointer-events-none">
                    🎓
                </div>
            </div>
        </div>
    );
}
