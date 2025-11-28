"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Navigation from "@/components/Navigation";
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    LineChart,
    Line,
    PieChart,
    Pie,
    Cell,
    Legend
} from "recharts";
import { TrendingUp, Users, Award, BookOpen } from "lucide-react";

export default function TeacherAnalyticsPage() {
    const router = useRouter();
    const [user, setUser] = useState<any>(null);

    useEffect(() => {
        const token = localStorage.getItem("token");
        const role = localStorage.getItem("role");

        if (!token || role !== "TEACHER") {
            router.push("/login");
            return;
        }

        setUser({
            name: localStorage.getItem("name"),
            email: localStorage.getItem("email")
        });
    }, [router]);

    // Mock Data - In a real app, fetch this from backend
    const classPerformanceData = [
        { name: 'Grade 10A', math: 85, science: 78, english: 82 },
        { name: 'Grade 10B', math: 75, science: 85, english: 80 },
        { name: 'Grade 11A', math: 90, science: 88, english: 92 },
        { name: 'Grade 11B', math: 65, science: 70, english: 75 },
        { name: 'Grade 12A', math: 95, science: 92, english: 88 },
    ];

    const overallPerformanceData = [
        { month: 'Jan', rating: 4.2 },
        { month: 'Feb', rating: 4.5 },
        { month: 'Mar', rating: 4.3 },
        { month: 'Apr', rating: 4.6 },
        { month: 'May', rating: 4.8 },
        { month: 'Jun', rating: 4.7 },
    ];

    const studentDistributionData = [
        { name: 'Excellent (>90%)', value: 15 },
        { name: 'Good (70-90%)', value: 45 },
        { name: 'Average (50-70%)', value: 30 },
        { name: 'Needs Improvement (<50%)', value: 10 },
    ];

    const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

    if (!user) return null;

    return (
        <div className="flex min-h-screen">
            <Navigation role="TEACHER" />

            <div className="flex-1 p-6 lg:p-8 bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
                <div className="max-w-7xl mx-auto space-y-8">
                    {/* Header */}
                    <div className="text-center mb-8">
                        <h1 className="text-4xl font-bold text-gradient mb-2">
                            Analytics Dashboard 📊
                        </h1>
                        <p className="text-gray-600 dark:text-gray-400 text-lg">
                            Insights into your classes and teaching performance.
                        </p>
                    </div>

                    {/* Key Metrics */}
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                        <div className="card bg-blue-50 dark:bg-blue-900/20">
                            <div className="flex items-center gap-3">
                                <Users className="w-8 h-8 text-blue-500" />
                                <div>
                                    <p className="text-sm text-gray-600">Total Students</p>
                                    <p className="text-2xl font-bold text-gray-800">145</p>
                                </div>
                            </div>
                        </div>
                        <div className="card bg-purple-50 dark:bg-purple-900/20">
                            <div className="flex items-center gap-3">
                                <BookOpen className="w-8 h-8 text-purple-500" />
                                <div>
                                    <p className="text-sm text-gray-600">Classes Taught</p>
                                    <p className="text-2xl font-bold text-gray-800">5</p>
                                </div>
                            </div>
                        </div>
                        <div className="card bg-green-50 dark:bg-green-900/20">
                            <div className="flex items-center gap-3">
                                <Award className="w-8 h-8 text-green-500" />
                                <div>
                                    <p className="text-sm text-gray-600">Avg Class Score</p>
                                    <p className="text-2xl font-bold text-gray-800">82%</p>
                                </div>
                            </div>
                        </div>
                        <div className="card bg-orange-50 dark:bg-orange-900/20">
                            <div className="flex items-center gap-3">
                                <TrendingUp className="w-8 h-8 text-orange-500" />
                                <div>
                                    <p className="text-sm text-gray-600">Teacher Rating</p>
                                    <p className="text-2xl font-bold text-gray-800">4.7/5</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="grid lg:grid-cols-2 gap-8">
                        {/* Class Performance Chart */}
                        <div className="card h-96">
                            <h2 className="text-xl font-bold mb-4 text-gray-800 flex items-center gap-2">
                                <BookOpen className="w-5 h-5 text-blue-500" />
                                Class Performance Overview
                            </h2>
                            <ResponsiveContainer width="100%" height="100%">
                                <BarChart data={classPerformanceData}>
                                    <CartesianGrid strokeDasharray="3 3" />
                                    <XAxis dataKey="name" />
                                    <YAxis domain={[0, 100]} />
                                    <Tooltip />
                                    <Legend />
                                    <Bar dataKey="math" fill="#8884d8" name="Math" radius={[4, 4, 0, 0]} />
                                    <Bar dataKey="science" fill="#82ca9d" name="Science" radius={[4, 4, 0, 0]} />
                                    <Bar dataKey="english" fill="#ffc658" name="English" radius={[4, 4, 0, 0]} />
                                </BarChart>
                            </ResponsiveContainer>
                        </div>

                        {/* Student Distribution Pie Chart */}
                        <div className="card h-96">
                            <h2 className="text-xl font-bold mb-4 text-gray-800 flex items-center gap-2">
                                <Users className="w-5 h-5 text-purple-500" />
                                Student Performance Distribution
                            </h2>
                            <ResponsiveContainer width="100%" height="100%">
                                <PieChart>
                                    <Pie
                                        data={studentDistributionData}
                                        cx="50%"
                                        cy="50%"
                                        innerRadius={60}
                                        outerRadius={100}
                                        fill="#8884d8"
                                        paddingAngle={5}
                                        dataKey="value"
                                        label
                                    >
                                        {studentDistributionData.map((entry, index) => (
                                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                        ))}
                                    </Pie>
                                    <Tooltip />
                                    <Legend />
                                </PieChart>
                            </ResponsiveContainer>
                        </div>
                    </div>

                    {/* Overall Teacher Performance */}
                    <div className="card h-96">
                        <h2 className="text-xl font-bold mb-4 text-gray-800 flex items-center gap-2">
                            <TrendingUp className="w-5 h-5 text-orange-500" />
                            My Overall Performance Trend
                        </h2>
                        <ResponsiveContainer width="100%" height="100%">
                            <LineChart data={overallPerformanceData}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="month" />
                                <YAxis domain={[0, 5]} />
                                <Tooltip />
                                <Legend />
                                <Line type="monotone" dataKey="rating" stroke="#ff7300" strokeWidth={3} activeDot={{ r: 8 }} name="Teacher Rating" />
                            </LineChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            </div>
        </div>
    );
}
