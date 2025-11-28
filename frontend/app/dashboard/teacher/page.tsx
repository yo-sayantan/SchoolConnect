"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
    BookOpen,
    Users,
    Calendar,
    FileText,
    CheckSquare,
    Bell,
    LogOut,
    Menu,
    X,
    Award
} from "lucide-react";
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer
} from "recharts";
import { fetchWithAuth } from "@/utils/api";
import Navigation from "@/components/Navigation";

export default function TeacherDashboard() {
    const router = useRouter();
    const [user, setUser] = useState<any>(null);
    const [myClasses, setMyClasses] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const token = localStorage.getItem("token");
        const role = localStorage.getItem("role");
        const userId = localStorage.getItem("userId");

        if (!token || role !== "TEACHER") {
            router.push("/login");
            return;
        }

        setUser({
            name: localStorage.getItem("name"),
            email: localStorage.getItem("email")
        });

        const fetchData = async () => {
            try {
                // Fetch Classes (assuming endpoint exists, otherwise mock for now)
                // const classesData = await fetchWithAuth(`/academic/classes/teacher/${userId}`);
                // setMyClasses(classesData);

                // Mocking classes for now as SchoolClassController might need update
                setMyClasses([
                    { id: 1, name: "Mathematics - Grade 10A", students: 30, time: "9:00 AM", color: "blue" },
                    { id: 2, name: "Mathematics - Grade 10B", students: 28, time: "11:00 AM", color: "purple" },
                    { id: 3, name: "Algebra - Grade 11", students: 25, time: "2:00 PM", color: "green" }
                ]);

            } catch (error) {
                console.error("Failed to fetch teacher data", error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [router]);

    const handleLogout = () => {
        localStorage.clear();
        router.push("/");
    };

    const stats = [
        { icon: Users, label: "My Classes", value: myClasses.length.toString(), color: "from-blue-400 to-blue-600", bgColor: "bg-blue-50" },
        { icon: Users, label: "Total Students", value: "83", color: "from-purple-400 to-purple-600", bgColor: "bg-purple-50" }, // Sum of students
        { icon: CheckSquare, label: "Pending Tasks", value: "8", color: "from-orange-400 to-orange-600", bgColor: "bg-orange-50" },
        { icon: Award, label: "Avg. Performance", value: "85%", color: "from-green-400 to-green-600", bgColor: "bg-green-50" }
    ];

    const pendingTasks = [
        { task: "Grade Math Quiz - Grade 10A", due: "Today", priority: "high" },
        { task: "Prepare Lesson Plan - Algebra", due: "Tomorrow", priority: "medium" },
        { task: "Update Attendance Records", due: "This Week", priority: "low" }
    ];

    if (loading) return <div className="flex justify-center items-center min-h-screen">Loading...</div>;
    if (!user) return null;

    return (
        <div className="flex min-h-screen">
            <Navigation role="TEACHER" />

            <div className="flex-1 p-6 lg:p-8 bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
                <div className="max-w-7xl mx-auto space-y-6">
                    {/* Welcome Header */}
                    <div className="card bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 text-white">
                        <div className="flex items-center justify-between">
                            <div>
                                <h1 className="text-3xl font-bold mb-2">Hello, {user.name}! 👨‍🏫</h1>
                                <p className="opacity-90">Teacher Dashboard</p>
                            </div>
                            <button onClick={handleLogout} className="flex items-center gap-2 bg-white/20 hover:bg-white/30 px-4 py-2 rounded-lg">
                                <LogOut className="w-5 h-5" />
                                <span className="hidden md:inline">Logout</span>
                            </button>
                        </div>
                    </div>
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
                        <div className="card space-y-4">
                            <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
                                <BookOpen className="w-6 h-6 text-blue-500" />
                                My Classes Today
                            </h2>
                            <div className="space-y-3">
                                {myClasses.map((cls, index) => (
                                    <div
                                        key={index}
                                        onClick={() => router.push(`/dashboard/teacher/classes/${cls.id}`)}
                                        className={`p-4 rounded-xl bg-${cls.color}-50 border-2 border-${cls.color}-200 cursor-pointer hover:shadow-md transition-all`}
                                    >
                                        <h3 className="font-bold text-gray-800">{cls.name}</h3>
                                        <div className="flex justify-between mt-2 text-sm text-gray-600">
                                            <span>{cls.students} students</span>
                                            <span className="font-semibold">{cls.time}</span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="card space-y-4">
                            <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
                                <Award className="w-6 h-6 text-purple-500" />
                                Class Performance Overview
                            </h2>
                            <div className="h-64">
                                <ResponsiveContainer width="100%" height="100%">
                                    <BarChart data={[
                                        { name: '10A', avg: 85 },
                                        { name: '10B', avg: 78 },
                                        { name: '11A', avg: 92 },
                                        { name: '12B', avg: 88 },
                                    ]}>
                                        <CartesianGrid strokeDasharray="3 3" />
                                        <XAxis dataKey="name" />
                                        <YAxis domain={[0, 100]} />
                                        <Tooltip />
                                        <Bar dataKey="avg" fill="#8884d8" radius={[4, 4, 0, 0]} />
                                    </BarChart>
                                </ResponsiveContainer>
                            </div>
                        </div>
                    </div>

                    <div className="grid lg:grid-cols-2 gap-6">
                        <div className="card space-y-4">
                            <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
                                <CheckSquare className="w-6 h-6 text-orange-500" />
                                Pending Tasks
                            </h2>
                            <div className="space-y-3">
                                {pendingTasks.map((task, index) => (
                                    <div key={index} className="p-3 rounded-lg bg-gradient-to-r from-orange-50 to-red-50">
                                        <p className="font-semibold text-gray-800 text-sm">{task.task}</p>
                                        <div className="flex justify-between mt-1">
                                            <span className="text-xs text-gray-500">{task.due}</span>
                                            <span className={`text-xs font-bold ${task.priority === 'high' ? 'text-red-600' : task.priority === 'medium' ? 'text-orange-600' : 'text-green-600'}`}>
                                                {task.priority.toUpperCase()}
                                            </span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    <div className="grid md:grid-cols-4 gap-4">
                        {[
                            { icon: "📝", label: "Grade Assignments", color: "blue", path: "/dashboard/teacher/marks" },
                            { icon: "📊", label: "View Analytics", color: "purple", path: "/dashboard/teacher/analytics" },
                            { icon: "📅", label: "Take Attendance", color: "green", path: "/dashboard/teacher/attendance" },
                            { icon: "💬", label: "Messages", color: "pink", path: "/messages" }
                        ].map((action, index) => (
                            <button
                                key={index}
                                onClick={() => router.push(action.path)}
                                className={`card-hover text-center p-6 bg-gradient-to-br from-${action.color}-50 to-${action.color}-100`}
                            >
                                <div className="text-4xl mb-2">{action.icon}</div>
                                <p className="font-bold text-gray-800">{action.label}</p>
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            <div className="fixed bottom-10 right-10 text-6xl animate-bounce-slow opacity-20 pointer-events-none">
                👨‍🏫
            </div>
        </div>
    );
}
