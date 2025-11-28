"use client";

import { useEffect, useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { fetchWithAuth } from "@/utils/api";
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
    RadarChart,
    Radar,
    PolarGrid,
    PolarAngleAxis,
    PolarRadiusAxis,
    Legend
} from "recharts";
import { TrendingUp, Award, BookOpen, Calendar } from "lucide-react";

function AnalyticsContent() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const childId = searchParams.get("childId");

    const [user, setUser] = useState<any>(null);
    const [childName, setChildName] = useState("Child");
    const [subjectPerformance, setSubjectPerformance] = useState<any[]>([]);
    const [performanceTrend, setPerformanceTrend] = useState<any[]>([]);
    const [attendanceData, setAttendanceData] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

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

        if (childId) {
            const fetchData = async () => {
                try {
                    // Fetch Child Name (Mock for now, ideally fetch from backend)
                    setChildName(`Child ${childId}`);

                    // Mock Data for now
                    setSubjectPerformance([
                        { subject: 'Math', A: 85, fullMark: 100 },
                        { subject: 'Science', A: 92, fullMark: 100 },
                        { subject: 'English', A: 78, fullMark: 100 },
                        { subject: 'History', A: 88, fullMark: 100 },
                    ]);

                    setPerformanceTrend([
                        { month: 'Jan', score: 82 },
                        { month: 'Feb', score: 85 },
                        { month: 'Mar', score: 83 },
                        { month: 'Apr', score: 88 },
                    ]);

                    setAttendanceData([
                        { name: 'Attendance', present: 95, absent: 2, late: 3 }
                    ]);

                } catch (error) {
                    console.error("Failed to fetch analytics", error);
                } finally {
                    setLoading(false);
                }
            };
            fetchData();
        }
    }, [router, childId]);

    if (!user) return null;

    return (
        <div className="flex min-h-screen">
            <Navigation role="PARENT" />

            <div className="flex-1 p-6 lg:p-8 bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
                <div className="max-w-7xl mx-auto space-y-8">
                    {/* Header */}
                    <div className="text-center mb-8">
                        <h1 className="text-4xl font-bold text-gradient mb-2">
                            {childName}'s Performance 📊
                        </h1>
                        <p className="text-gray-600 dark:text-gray-400 text-lg">
                            Detailed academic insights and progress tracking.
                        </p>
                    </div>

                    <div className="grid lg:grid-cols-2 gap-8">
                        {/* Subject Performance Radar */}
                        <div className="card h-96">
                            <h2 className="text-xl font-bold mb-4 text-gray-800 flex items-center gap-2">
                                <Award className="w-5 h-5 text-purple-500" />
                                Subject Strengths
                            </h2>
                            <ResponsiveContainer width="100%" height="100%">
                                <RadarChart cx="50%" cy="50%" outerRadius="80%" data={subjectPerformance}>
                                    <PolarGrid />
                                    <PolarAngleAxis dataKey="subject" />
                                    <PolarRadiusAxis angle={30} domain={[0, 100]} />
                                    <Radar name={childName} dataKey="A" stroke="#8884d8" fill="#8884d8" fillOpacity={0.6} />
                                    <Legend />
                                    <Tooltip />
                                </RadarChart>
                            </ResponsiveContainer>
                        </div>

                        {/* Performance Trend Line */}
                        <div className="card h-96">
                            <h2 className="text-xl font-bold mb-4 text-gray-800 flex items-center gap-2">
                                <TrendingUp className="w-5 h-5 text-blue-500" />
                                Academic Progress
                            </h2>
                            <ResponsiveContainer width="100%" height="100%">
                                <LineChart data={performanceTrend}>
                                    <CartesianGrid strokeDasharray="3 3" />
                                    <XAxis dataKey="month" />
                                    <YAxis domain={[0, 100]} />
                                    <Tooltip />
                                    <Legend />
                                    <Line type="monotone" dataKey="score" stroke="#82ca9d" strokeWidth={3} activeDot={{ r: 8 }} />
                                </LineChart>
                            </ResponsiveContainer>
                        </div>
                    </div>

                    {/* Attendance Overview */}
                    <div className="card">
                        <h2 className="text-xl font-bold mb-4 text-gray-800 flex items-center gap-2">
                            <Calendar className="w-5 h-5 text-green-500" />
                            Attendance History
                        </h2>
                        <div className="h-64">
                            <ResponsiveContainer width="100%" height="100%">
                                <BarChart data={attendanceData} layout="vertical">
                                    <CartesianGrid strokeDasharray="3 3" />
                                    <XAxis type="number" domain={[0, 100]} />
                                    <YAxis dataKey="name" type="category" />
                                    <Tooltip />
                                    <Legend />
                                    <Bar dataKey="present" fill="#4ade80" name="Present %" stackId="a" />
                                    <Bar dataKey="late" fill="#fbbf24" name="Late %" stackId="a" />
                                    <Bar dataKey="absent" fill="#f87171" name="Absent %" stackId="a" />
                                </BarChart>
                            </ResponsiveContainer>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default function ParentAnalyticsPage() {
    return (
        <Suspense fallback={<div className="flex justify-center items-center min-h-screen">Loading...</div>}>
            <AnalyticsContent />
        </Suspense>
    );
}
