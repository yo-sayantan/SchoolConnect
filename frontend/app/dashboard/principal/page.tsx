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
    Menu,
    X,
    BarChart3
} from "lucide-react";

export default function PrincipalDashboard() {
    const router = useRouter();
    const [user, setUser] = useState<any>(null);
    const [menuOpen, setMenuOpen] = useState(false);

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
            bgColor: "bg-blue-50 dark:bg-blue-900/20"
        },
        {
            icon: Users,
            label: "Total Teachers",
            value: "85",
            change: "+2",
            color: "from-purple-400 to-purple-600",
            bgColor: "bg-purple-50 dark:bg-purple-900/20"
        },
        {
            icon: Award,
            label: "Avg. Performance",
            value: "87%",
            change: "+3%",
            color: "from-green-400 to-green-600",
            bgColor: "bg-green-50 dark:bg-green-900/20"
        },
        {
            icon: TrendingUp,
            label: "Attendance Rate",
            value: "94%",
            change: "+1%",
            color: "from-yellow-400 to-yellow-600",
            bgColor: "bg-yellow-50 dark:bg-yellow-900/20"
        }
    ];

    const quickActions = [
        { icon: FileText, label: "Create Notice", color: "blue" },
        { icon: Calendar, label: "Schedule Event", color: "purple" },
        { icon: Users, label: "Manage Staff", color: "green" },
        { icon: BarChart3, label: "View Reports", color: "orange" },
        { icon: BookOpen, label: "Curriculum", color: "pink" },
        { icon: Settings, label: "Settings", color: "gray" }
    ];

    const recentActivities = [
        { title: "New teacher hired: Ms. Anderson", time: "2 hours ago", type: "staff" },
        { title: "Annual Sports Day scheduled", time: "5 hours ago", type: "event" },
        { title: "Monthly report generated", time: "1 day ago", type: "report" },
        { title: "Parent-Teacher meeting concluded", time: "2 days ago", type: "meeting" }
    ];

    if (!user) return null;

    return (
        <div className="min-h-screen pb-20">
            {/* Header */}
            <header className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 text-white p-6 sticky top-0 z-50 shadow-lg">
                <div className="max-w-7xl mx-auto flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <button
                            onClick={() => setMenuOpen(!menuOpen)}
                            className="lg:hidden p-2 hover:bg-white/20 rounded-lg"
                        >
                            {menuOpen ? <X /> : <Menu />}
                        </button>
                        <div>
                            <h1 className="text-2xl font-bold">Welcome, {user.name}! 👔</h1>
                            <p className="text-sm opacity-90">Principal Dashboard</p>
                        </div>
                    </div>
                    <button
                        onClick={handleLogout}
                        className="flex items-center gap-2 bg-white/20 hover:bg-white/30 px-4 py-2 rounded-lg transition-colors"
                    >
                        <LogOut className="w-5 h-5" />
                        <span className="hidden md:inline">Logout</span>
                    </button>
                </div>
            </header>

            <div className="max-w-7xl mx-auto p-6 space-y-8">
                {/* Stats Grid */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                    {stats.map((stat, index) => (
                        <div
                            key={index}
                            className={`card-hover ${stat.bgColor}`}
                        >
                            <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${stat.color} flex items-center justify-center mb-3`}>
                                <stat.icon className="w-6 h-6 text-white" />
                            </div>
                            <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">{stat.label}</p>
                            <div className="flex items-end justify-between">
                                <p className="text-2xl font-bold text-gray-800 dark:text-white">{stat.value}</p>
                                <span className="text-sm text-green-600 font-semibold">{stat.change}</span>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Quick Actions */}
                <div className="card">
                    <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">Quick Actions</h2>
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                        {quickActions.map((action, index) => (
                            <button
                                key={index}
                                className={`p-4 rounded-xl bg-gradient-to-br from-${action.color}-50 to-${action.color}-100 dark:from-${action.color}-900/20 dark:to-${action.color}-800/20 hover:shadow-lg transition-all text-center`}
                            >
                                <action.icon className="w-8 h-8 mx-auto mb-2 text-gray-700 dark:text-gray-300" />
                                <p className="text-sm font-semibold text-gray-800 dark:text-white">{action.label}</p>
                            </button>
                        ))}
                    </div>
                </div>

                <div className="grid lg:grid-cols-2 gap-6">
                    {/* Recent Activities */}
                    <div className="card space-y-4">
                        <h2 className="text-2xl font-bold text-gray-800 dark:text-white flex items-center gap-2">
                            <Bell className="w-6 h-6 text-purple-500" />
                            Recent Activities
                        </h2>
                        <div className="space-y-3">
                            {recentActivities.map((activity, index) => (
                                <div
                                    key={index}
                                    className="p-3 rounded-lg bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20"
                                >
                                    <p className="font-semibold text-gray-800 dark:text-white text-sm">
                                        {activity.title}
                                    </p>
                                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                                        {activity.time}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* School Performance */}
                    <div className="card space-y-4">
                        <h2 className="text-2xl font-bold text-gray-800 dark:text-white flex items-center gap-2">
                            <BarChart3 className="w-6 h-6 text-green-500" />
                            School Performance
                        </h2>
                        <div className="space-y-4">
                            <div>
                                <div className="flex justify-between mb-2">
                                    <span className="text-sm font-medium">Academic Excellence</span>
                                    <span className="text-sm font-bold">92%</span>
                                </div>
                                <div className="w-full bg-gray-200 rounded-full h-3">
                                    <div className="bg-gradient-to-r from-blue-500 to-blue-600 h-3 rounded-full" style={{ width: '92%' }}></div>
                                </div>
                            </div>
                            <div>
                                <div className="flex justify-between mb-2">
                                    <span className="text-sm font-medium">Student Satisfaction</span>
                                    <span className="text-sm font-bold">88%</span>
                                </div>
                                <div className="w-full bg-gray-200 rounded-full h-3">
                                    <div className="bg-gradient-to-r from-green-500 to-green-600 h-3 rounded-full" style={{ width: '88%' }}></div>
                                </div>
                            </div>
                            <div>
                                <div className="flex justify-between mb-2">
                                    <span className="text-sm font-medium">Teacher Engagement</span>
                                    <span className="text-sm font-bold">95%</span>
                                </div>
                                <div className="w-full bg-gray-200 rounded-full h-3">
                                    <div className="bg-gradient-to-r from-purple-500 to-purple-600 h-3 rounded-full" style={{ width: '95%' }}></div>
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
