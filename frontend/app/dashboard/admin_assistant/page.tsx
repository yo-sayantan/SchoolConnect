"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
    Users,
    Calendar,
    FileText,
    CheckSquare,
    Bell,
    TrendingUp,
    LogOut,
    Menu,
    X,
    UserPlus
} from "lucide-react";
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

export default function AdminDashboard() {
    const router = useRouter();
    const [user, setUser] = useState<any>(null);

    useEffect(() => {
        const token = localStorage.getItem("token");
        const role = localStorage.getItem("role");

        if (!token || role !== "ADMIN_ASSISTANT") {
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
        { icon: Users, label: "Total Students", value: "1,234", color: "from-blue-400 to-blue-600", bgColor: "bg-blue-50" },
        { icon: Users, label: "Total Staff", value: "95", color: "from-purple-400 to-purple-600", bgColor: "bg-purple-50" },
        { icon: CheckSquare, label: "Pending Tasks", value: "23", color: "from-orange-400 to-orange-600", bgColor: "bg-orange-50" },
        { icon: TrendingUp, label: "Attendance Today", value: "94%", color: "from-green-400 to-green-600", bgColor: "bg-green-50" }
    ];

    const pendingTasks = [
        { task: "Process new student admissions", count: 8, priority: "high" },
        { task: "Update attendance records", count: 5, priority: "medium" },
        { task: "Generate monthly reports", count: 3, priority: "medium" },
        { task: "Schedule parent meetings", count: 7, priority: "low" }
    ];

    const quickActions = [
        { icon: UserPlus, label: "Add Student", color: "blue" },
        { icon: FileText, label: "Generate Report", color: "purple" },
        { icon: Calendar, label: "Schedule Event", color: "green" },
        { icon: Bell, label: "Send Notice", color: "orange" },
        { icon: CheckSquare, label: "Mark Attendance", color: "pink" },
        { icon: Users, label: "Manage Staff", color: "indigo" }
    ];

    if (!user) return null;

    return (
        <div className="min-h-screen pb-20">
            <header className="bg-gradient-to-r from-orange-500 via-red-500 to-pink-500 text-white p-6 sticky top-0 z-50 shadow-lg">
                <div className="max-w-7xl mx-auto flex items-center justify-between">
                    <div>
                        <h1 className="text-2xl font-bold">Hello, {user.name}! 📋</h1>
                        <p className="text-sm opacity-90">Admin Assistant Dashboard</p>
                    </div>
                    <button onClick={handleLogout} className="flex items-center gap-2 bg-white/20 hover:bg-white/30 px-4 py-2 rounded-lg">
                        <LogOut className="w-5 h-5" />
                        <span className="hidden md:inline">Logout</span>
                    </button>
                </div>
            </header>

            <div className="max-w-7xl mx-auto p-6 space-y-8">
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

                {/* Analytics Overview */}
                <div className="grid lg:grid-cols-2 gap-6">
                    <div className="card h-80">
                        <h2 className="text-xl font-bold mb-4 text-gray-800">School Demographics</h2>
                        <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                                <Pie
                                    data={[
                                        { name: 'Students', value: 1234 },
                                        { name: 'Teachers', value: 85 },
                                        { name: 'Staff', value: 10 },
                                    ]}
                                    cx="50%"
                                    cy="50%"
                                    innerRadius={60}
                                    outerRadius={80}
                                    fill="#8884d8"
                                    dataKey="value"
                                    label
                                >
                                    {['#0088FE', '#00C49F', '#FFBB28'].map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={['#0088FE', '#00C49F', '#FFBB28'][index]} />
                                    ))}
                                </Pie>
                                <Tooltip />
                                <Legend />
                            </PieChart>
                        </ResponsiveContainer>
                    </div>

                    <div className="card h-80">
                        <h2 className="text-xl font-bold mb-4 text-gray-800">Attendance Overview (Last 5 Days)</h2>
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart
                                data={[
                                    { day: 'Mon', present: 95 },
                                    { day: 'Tue', present: 92 },
                                    { day: 'Wed', present: 96 },
                                    { day: 'Thu', present: 94 },
                                    { day: 'Fri', present: 91 },
                                ]}
                            >
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="day" />
                                <YAxis domain={[0, 100]} />
                                <Tooltip />
                                <Bar dataKey="present" fill="#82ca9d" name="Attendance %" radius={[4, 4, 0, 0]} />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* Quick Actions */}
                <div className="card">
                    <h2 className="text-2xl font-bold text-gray-800 mb-4">Quick Actions</h2>
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                        {quickActions.map((action, index) => (
                            <button key={index} className={`p-4 rounded-xl bg-gradient-to-br from-${action.color}-50 to-${action.color}-100 hover:shadow-lg transition-all text-center`}>
                                <action.icon className="w-8 h-8 mx-auto mb-2 text-gray-700" />
                                <p className="text-sm font-semibold text-gray-800">{action.label}</p>
                            </button>
                        ))}
                    </div>
                </div>

                {/* Pending Tasks */}
                <div className="card space-y-4">
                    <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
                        <CheckSquare className="w-6 h-6 text-orange-500" />
                        Pending Tasks
                    </h2>
                    <div className="grid md:grid-cols-2 gap-4">
                        {pendingTasks.map((task, index) => (
                            <div key={index} className="p-4 rounded-xl bg-gradient-to-r from-orange-50 to-red-50 border-2 border-orange-200">
                                <div className="flex justify-between items-start">
                                    <div>
                                        <h3 className="font-bold text-gray-800">{task.task}</h3>
                                        <p className="text-sm text-gray-600 mt-1">{task.count} items</p>
                                    </div>
                                    <span className={`px-3 py-1 rounded-full text-xs font-bold ${task.priority === 'high' ? 'bg-red-200 text-red-800' : task.priority === 'medium' ? 'bg-orange-200 text-orange-800' : 'bg-green-200 text-green-800'}`}>
                                        {task.priority.toUpperCase()}
                                    </span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Recent Activity */}
                <div className="card space-y-4">
                    <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
                        <Bell className="w-6 h-6 text-purple-500" />
                        Recent Activity
                    </h2>
                    <div className="space-y-3">
                        {[
                            { text: "5 new student admissions processed", time: "2 hours ago" },
                            { text: "Attendance marked for all classes", time: "4 hours ago" },
                            { text: "Monthly report generated", time: "1 day ago" },
                            { text: "Parent meeting scheduled", time: "2 days ago" }
                        ].map((activity, index) => (
                            <div key={index} className="p-3 rounded-lg bg-gradient-to-r from-purple-50 to-pink-50">
                                <p className="font-semibold text-gray-800 text-sm">{activity.text}</p>
                                <p className="text-xs text-gray-500 mt-1">{activity.time}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <div className="fixed bottom-10 right-10 text-6xl animate-bounce-slow opacity-20 pointer-events-none">
                📋
            </div>
        </div>
    );
}
