"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
    Users,
    BookOpen,
    Calendar,
    Bell,
    TrendingUp,
    Award,
    FileText,
    Settings,
    LogOut,
    BarChart3,
    CheckSquare,
    MessageSquare
} from "lucide-react";
import Navigation from "@/components/Navigation";
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    PieChart,
    Pie,
    Cell,
    Legend
} from "recharts";
import SchoolOverviewChart from "@/components/charts/SchoolOverviewChart";

export default function PrincipalDashboard() {
    const router = useRouter();
    const [user, setUser] = useState<any>(null);

    useEffect(() => {
        const token = localStorage.getItem("token");
        const role = localStorage.getItem("role");

        if (!token || role !== "PRINCIPAL") {
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

    const stats = [
        {
            icon: Users,
            label: "Total Students",
            value: "1,234",
            change: "+5%",
            color: "from-blue-400 to-blue-600",
            bgColor: "bg-blue-50"
        },
        {
            icon: Users,
            label: "Total Teachers",
            value: "85",
            change: "+2",
            color: "from-purple-400 to-purple-600",
            bgColor: "bg-purple-50"
        },
        {
            icon: Award,
            label: "Avg. Performance",
            value: "87%",
            change: "+3%",
            color: "from-green-400 to-green-600",
            bgColor: "bg-green-50"
        },
        {
            icon: TrendingUp,
            label: "Attendance Rate",
            value: "94%",
            change: "+1%",
            color: "from-yellow-400 to-yellow-600",
            bgColor: "bg-yellow-50"
        }
    ];

    const quickActions = [
        { icon: FileText, label: "Create Notice", color: "blue", path: "/dashboard/principal/notices/create" },
        { icon: Calendar, label: "Schedule Event", color: "purple", path: "/dashboard/principal/events" },
        { icon: Users, label: "Manage Staff", color: "green", path: "/dashboard/principal/staff" },
        { icon: BarChart3, label: "View Reports", color: "orange", path: "/dashboard/principal/reports" },
        { icon: BookOpen, label: "Curriculum", color: "pink", path: "/dashboard/principal/curriculum" },
        { icon: Settings, label: "Settings", color: "gray", path: "/settings" }
    ];

    const recentActivities = [
        { title: "New teacher hired: Ms. Anderson", time: "2 hours ago", type: "staff" },
        { title: "Annual Sports Day scheduled", time: "5 hours ago", type: "event" },
        { title: "Monthly report generated", time: "1 day ago", type: "report" },
        { title: "Parent-Teacher meeting concluded", time: "2 days ago", type: "meeting" }
    ];

    if (!user) return null;

    return (
        <div className="flex min-h-screen">
            <Navigation role="PRINCIPAL" />

            <div className="flex-1 p-6 lg:p-8 bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
                <div className="max-w-7xl mx-auto space-y-8">
                    {/* Welcome Header */}
                    <div className="card bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 text-white">
                        <div className="flex items-center justify-between">
                            <div>
                                <h1 className="text-3xl font-bold mb-2">Welcome, Principal! 👔</h1>
                                <p className="opacity-90">Principal Dashboard</p>
                            </div>
                            <button onClick={handleLogout} className="flex items-center gap-2 bg-white/20 hover:bg-white/30 px-4 py-2 rounded-lg transition-colors">
                                <LogOut className="w-5 h-5" />
                                <span className="hidden md:inline">Logout</span>
                            </button>
                        </div>
                    </div>

                    {/* Stats Grid */}
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                        {stats.map((stat, index) => (
                            <div key={index} className={`card-hover ${stat.bgColor}`}>
                                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${stat.color} flex items-center justify-center mb-3`}>
                                    <stat.icon className="w-6 h-6 text-white" />
                                </div>
                                <p className="text-sm text-gray-600 mb-1">{stat.label}</p>
                                <div className="flex items-end justify-between">
                                    <p className="text-2xl font-bold text-gray-800">{stat.value}</p>
                                    <span className="text-sm text-green-600 font-semibold">{stat.change}</span>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* School Overview Chart */}
                    <div className="card h-96">
                        <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
                            <BarChart3 className="w-6 h-6 text-blue-500" />
                            Student Distribution by Grade
                        </h2>
                        <SchoolOverviewChart />
                    </div>

                    {/* Quick Actions */}
                    <div className="card bg-white/40 backdrop-blur-md border-white/40">
                        <h2 className="text-2xl font-bold text-gray-800 mb-6">Quick Actions</h2>
                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                            {quickActions.map((action, index) => (
                                <button
                                    key={index}
                                    onClick={() => router.push(action.path)}
                                    className={`p-4 rounded-xl bg-gradient-to-br from-${action.color}-50 to-${action.color}-100 hover:shadow-lg hover:scale-105 transition-all text-center group`}
                                >
                                    <action.icon className={`w-8 h-8 mx-auto mb-3 text-${action.color}-600 group-hover:scale-110 transition-transform`} />
                                    <p className="text-sm font-bold text-gray-800">{action.label}</p>
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="grid lg:grid-cols-2 gap-6">
                        {/* Recent Activities */}
                        <div className="card space-y-4">
                            <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
                                <Bell className="w-6 h-6 text-purple-500" />
                                Recent Activities
                            </h2>
                            <div className="space-y-3">
                                {recentActivities.map((activity, index) => (
                                    <div
                                        key={index}
                                        className="p-4 rounded-xl bg-gradient-to-r from-purple-50 to-pink-50 hover:shadow-md transition-all"
                                    >
                                        <p className="font-bold text-gray-800 text-sm">
                                            {activity.title}
                                        </p>
                                        <p className="text-xs text-gray-500 mt-1">
                                            {activity.time}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* School Performance */}
                        <div className="card space-y-6">
                            <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
                                <BarChart3 className="w-6 h-6 text-green-500" />
                                School Performance
                            </h2>
                            <div className="space-y-6">
                                <div>
                                    <div className="flex justify-between mb-2">
                                        <span className="text-sm font-bold text-gray-700">Academic Excellence</span>
                                        <span className="text-sm font-bold text-blue-600">92%</span>
                                    </div>
                                    <div className="w-full bg-gray-100 rounded-full h-3 overflow-hidden">
                                        <div className="bg-gradient-to-r from-blue-500 to-blue-600 h-3 rounded-full animate-pulse-glow" style={{ width: '92%' }}></div>
                                    </div>
                                </div>
                                <div>
                                    <div className="flex justify-between mb-2">
                                        <span className="text-sm font-bold text-gray-700">Student Satisfaction</span>
                                        <span className="text-sm font-bold text-green-600">88%</span>
                                    </div>
                                    <div className="w-full bg-gray-100 rounded-full h-3 overflow-hidden">
                                        <div className="bg-gradient-to-r from-green-500 to-green-600 h-3 rounded-full animate-pulse-glow" style={{ width: '88%' }}></div>
                                    </div>
                                </div>
                                <div>
                                    <div className="flex justify-between mb-2">
                                        <span className="text-sm font-bold text-gray-700">Teacher Engagement</span>
                                        <span className="text-sm font-bold text-purple-600">95%</span>
                                    </div>
                                    <div className="w-full bg-gray-100 rounded-full h-3 overflow-hidden">
                                        <div className="bg-gradient-to-r from-purple-500 to-purple-600 h-3 rounded-full animate-pulse-glow" style={{ width: '95%' }}></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Decorative elements */}
            <div className="fixed bottom-10 right-10 text-6xl animate-bounce-slow opacity-20 pointer-events-none">
                👔
            </div>
        </div>
    );
}
