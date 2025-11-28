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
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer
} from "recharts";

import { fetchWithAuth } from "@/utils/api";
import Navigation from "@/components/Navigation";

export default function ParentDashboard() {
    const router = useRouter();
    const [user, setUser] = useState<any>(null);
    const [children, setChildren] = useState<any[]>([]);
    const [selectedChild, setSelectedChild] = useState<any>(null);
    const [stats, setStats] = useState<any>(null);
    const [recentGrades, setRecentGrades] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const token = localStorage.getItem("token");
        const role = localStorage.getItem("role");
        const userId = localStorage.getItem("userId");

        if (!token || role !== "PARENT") {
            router.push("/login");
            return;
        }

        const fetchParentAndChildren = async () => {
            try {
                // 1. Fetch Parent Details to get linkedStudentIds
                const parentData = await fetchWithAuth(`/auth/user/${userId}`);
                setUser(parentData);

                if (parentData.linkedStudentIds) {
                    const studentIds = parentData.linkedStudentIds.split(',').map((id: string) => parseInt(id.trim()));

                    // 2. Fetch Children Details
                    const childrenData = await fetchWithAuth('/auth/users/batch', {
                        method: 'POST',
                        body: JSON.stringify(studentIds)
                    });

                    // Add avatars
                    const childrenWithAvatars = childrenData.map((child: any) => ({
                        ...child,
                        avatar: child.gender === 'Female' ? '👧' : '👦', // Simple logic, can be improved
                        grade: "Grade 10", // Placeholder as User entity doesn't have grade yet
                        class: "10-A"
                    }));

                    setChildren(childrenWithAvatars);
                    if (childrenWithAvatars.length > 0) {
                        setSelectedChild(childrenWithAvatars[0]);
                    }
                }
            } catch (error) {
                console.error("Failed to fetch parent/children data", error);
            } finally {
                setLoading(false);
            }
        };

        fetchParentAndChildren();
    }, [router]);

    useEffect(() => {
        if (selectedChild) {
            const fetchData = async () => {
                try {
                    // Fetch Stats for selected child
                    const statsData = await fetchWithAuth(`/academic/analytics/stats/${selectedChild.id}`);
                    setStats(statsData);

                    // Fetch Recent Grades for selected child
                    const gradesData = await fetchWithAuth(`/academic/marks/student/${selectedChild.id}`);
                    setRecentGrades(gradesData.slice(0, 3));
                } catch (error) {
                    console.error("Failed to fetch child data", error);
                }
            };
            fetchData();
        }
    }, [selectedChild]);

    const handleLogout = () => {
        localStorage.clear();
        router.push("/");
    };

    const statCards = [
        { icon: Award, label: "Avg. Grade", value: `${stats?.averageGrade?.toFixed(1) || 0}%`, color: "from-blue-400 to-blue-600", bgColor: "bg-blue-50" },
        { icon: TrendingUp, label: "Attendance", value: `${stats?.attendancePercentage?.toFixed(1) || 0}%`, color: "from-green-400 to-green-600", bgColor: "bg-green-50" },
        { icon: BookOpen, label: "Assignments", value: "12/15", color: "from-purple-400 to-purple-600", bgColor: "bg-purple-50" }, // Mocked
        { icon: Bell, label: "New Notices", value: "3", color: "from-orange-400 to-orange-600", bgColor: "bg-orange-50" } // Mocked
    ];

    const upcomingEvents = [
        { title: "Parent-Teacher Meeting", date: "Nov 25", time: "3:00 PM" },
        { title: "Science Fair", date: "Nov 28", time: "10:00 AM" },
        { title: "Sports Day", date: "Dec 2", time: "9:00 AM" }
    ];

    if (loading) return <div className="flex justify-center items-center min-h-screen">Loading...</div>;
    if (!user) return null;

    return (
        <div className="flex min-h-screen">
            <Navigation role="PARENT" />

            <div className="flex-1 p-6 lg:p-8 bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
                <div className="max-w-7xl mx-auto space-y-6">
                    {/* Welcome Header & Child Selector */}
                    <div className="card bg-gradient-to-r from-green-500 via-teal-500 to-blue-500 text-white p-6">
                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                            <div>
                                <h1 className="text-3xl font-bold mb-2">Welcome, {user.name}! 👨‍👩‍👧</h1>
                                <p className="opacity-90">Monitoring progress for:</p>
                            </div>

                            <div className="flex items-center gap-4">
                                <div className="relative">
                                    <select
                                        value={selectedChild?.id || ""}
                                        onChange={(e) => {
                                            const child = children.find(c => c.id === parseInt(e.target.value));
                                            setSelectedChild(child);
                                        }}
                                        className="appearance-none bg-white/20 backdrop-blur-md text-white border border-white/30 rounded-xl px-4 py-2 pr-10 font-bold focus:outline-none focus:ring-2 focus:ring-white/50 cursor-pointer min-w-[200px]"
                                    >
                                        {children.map(child => (
                                            <option key={child.id} value={child.id} className="text-gray-800">
                                                {child.avatar} {child.name}
                                            </option>
                                        ))}
                                    </select>
                                    <div className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
                                        <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                                    </div>
                                </div>

                                <button onClick={handleLogout} className="bg-white/20 hover:bg-white/30 p-2 rounded-lg transition-colors">
                                    <LogOut className="w-5 h-5" />
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Stats */}
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                        {statCards.map((stat, index) => (
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
                        {/* Recent Grades & Trend */}
                        <div className="card space-y-4">
                            <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
                                <Award className="w-6 h-6 text-yellow-500" />
                                Recent Performance
                            </h2>
                            <div className="h-48">
                                <ResponsiveContainer width="100%" height="100%">
                                    <LineChart data={recentGrades.length > 0 ? recentGrades.map(g => ({ name: g.examName.split(' ')[0], score: g.percentage || 0 })).reverse() : []}>
                                        <CartesianGrid strokeDasharray="3 3" />
                                        <XAxis dataKey="name" />
                                        <YAxis domain={[0, 100]} />
                                        <Tooltip />
                                        <Line type="monotone" dataKey="score" stroke="#8884d8" strokeWidth={2} />
                                    </LineChart>
                                </ResponsiveContainer>
                            </div>
                            <div className="space-y-3">
                                {recentGrades.length > 0 ? recentGrades.map((grade, index) => (
                                    <div key={index} className="p-4 rounded-xl bg-blue-50 border-2 border-blue-200">
                                        <div className="flex justify-between items-center">
                                            <div>
                                                <h3 className="font-bold text-gray-800">{grade.examName}</h3>
                                                <p className="text-sm text-gray-600">{grade.marksObtained}/{grade.totalMarks}</p>
                                            </div>
                                            <div className="text-3xl font-bold text-gray-800">{grade.grade || 'N/A'}</div>
                                        </div>
                                    </div>
                                )) : <p>No recent grades found.</p>}
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
                            { icon: "📊", label: "View Reports", color: "blue", action: () => router.push(`/dashboard/parent/analytics?childId=${selectedChild?.id}`) },
                            { icon: "📅", label: "Attendance", color: "green", action: () => { } },
                            { icon: "💬", label: "Messages", color: "purple", action: () => router.push("/dashboard/parent/chat") },
                            { icon: "📢", label: "Notices", color: "orange", action: () => router.push("/notices") }
                        ].map((action, index) => (
                            <button
                                key={index}
                                onClick={action.action}
                                className={`card-hover text-center p-6 bg-gradient-to-br from-${action.color}-50 to-${action.color}-100`}
                            >
                                <div className="text-4xl mb-2">{action.icon}</div>
                                <p className="font-bold text-gray-800">{action.label}</p>
                            </button>
                        ))
                        }
                    </div>
                </div>

            </div>

            <div className="fixed bottom-10 right-10 text-6xl animate-bounce-slow opacity-20 pointer-events-none">
                👨‍👩‍👧
            </div>
        </div>
    );
}
