"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import { fetchWithAuth } from "@/utils/api";
import { ArrowLeft, Users, TrendingUp, Award, CheckSquare } from "lucide-react";
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer,
    PieChart,
    Pie,
    Cell
} from "recharts";

export default function ClassDetailsPage() {
    const router = useRouter();
    const params = useParams();
    const classId = params.classId;
    const [classData, setClassData] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Mock fetching class details
        // In real app: fetchWithAuth(`/academic/classes/${classId}`)
        setTimeout(() => {
            setClassData({
                id: classId,
                name: "Mathematics - Grade 10A",
                students: 30,
                averageAttendance: 92,
                averageGrade: 85,
                gradeDistribution: [
                    { name: 'A', value: 10 },
                    { name: 'B', value: 12 },
                    { name: 'C', value: 5 },
                    { name: 'D', value: 2 },
                    { name: 'F', value: 1 },
                ],
                attendanceTrend: [
                    { day: 'Mon', present: 28, absent: 2 },
                    { day: 'Tue', present: 29, absent: 1 },
                    { day: 'Wed', present: 27, absent: 3 },
                    { day: 'Thu', present: 30, absent: 0 },
                    { day: 'Fri', present: 29, absent: 1 },
                ]
            });
            setLoading(false);
        }, 1000);
    }, [classId]);

    if (loading) return <div className="flex justify-center items-center min-h-screen">Loading...</div>;
    if (!classData) return <div>Class not found</div>;

    const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#FF0000'];

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-6">
            <div className="max-w-7xl mx-auto space-y-8">
                {/* Header */}
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <button onClick={() => router.back()} className="p-2 hover:bg-gray-200 rounded-full">
                            <ArrowLeft className="w-6 h-6 text-gray-600" />
                        </button>
                        <div>
                            <h1 className="text-3xl font-bold text-gray-800 dark:text-white">{classData.name}</h1>
                            <p className="text-gray-500">Class Details & Analytics</p>
                        </div>
                    </div>
                    <div className="flex gap-4">
                        <button
                            onClick={() => router.push(`/dashboard/teacher/attendance?classId=${classId}`)}
                            className="flex items-center gap-2 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
                        >
                            <CheckSquare className="w-4 h-4" />
                            Take Attendance
                        </button>
                        <button
                            onClick={() => router.push(`/dashboard/teacher/marks?classId=${classId}`)}
                            className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                        >
                            <Award className="w-4 h-4" />
                            Enter Marks
                        </button>
                    </div>
                </div>

                {/* Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="card bg-blue-50 border-l-4 border-blue-500 p-6">
                        <div className="flex items-center gap-4">
                            <div className="p-3 bg-blue-100 rounded-full">
                                <Users className="w-6 h-6 text-blue-600" />
                            </div>
                            <div>
                                <p className="text-sm text-gray-600">Total Students</p>
                                <p className="text-2xl font-bold text-gray-800">{classData.students}</p>
                            </div>
                        </div>
                    </div>
                    <div className="card bg-green-50 border-l-4 border-green-500 p-6">
                        <div className="flex items-center gap-4">
                            <div className="p-3 bg-green-100 rounded-full">
                                <TrendingUp className="w-6 h-6 text-green-600" />
                            </div>
                            <div>
                                <p className="text-sm text-gray-600">Avg. Attendance</p>
                                <p className="text-2xl font-bold text-gray-800">{classData.averageAttendance}%</p>
                            </div>
                        </div>
                    </div>
                    <div className="card bg-purple-50 border-l-4 border-purple-500 p-6">
                        <div className="flex items-center gap-4">
                            <div className="p-3 bg-purple-100 rounded-full">
                                <Award className="w-6 h-6 text-purple-600" />
                            </div>
                            <div>
                                <p className="text-sm text-gray-600">Avg. Grade</p>
                                <p className="text-2xl font-bold text-gray-800">{classData.averageGrade}%</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Charts */}
                <div className="grid lg:grid-cols-2 gap-8">
                    {/* Grade Distribution */}
                    <div className="card h-96">
                        <h2 className="text-xl font-bold mb-4">Grade Distribution</h2>
                        <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                                <Pie
                                    data={classData.gradeDistribution}
                                    cx="50%"
                                    cy="50%"
                                    labelLine={false}
                                    label={({ name, percent }: any) => `${name} ${((percent || 0) * 100).toFixed(0)}%`}
                                    outerRadius={80}
                                    fill="#8884d8"
                                    dataKey="value"
                                >
                                    {classData.gradeDistribution.map((entry: any, index: number) => (
                                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                    ))}
                                </Pie>
                                <Tooltip />
                                <Legend />
                            </PieChart>
                        </ResponsiveContainer>
                    </div>

                    {/* Attendance Trend */}
                    <div className="card h-96">
                        <h2 className="text-xl font-bold mb-4">Weekly Attendance</h2>
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={classData.attendanceTrend}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="day" />
                                <YAxis />
                                <Tooltip />
                                <Legend />
                                <Bar dataKey="present" fill="#82ca9d" name="Present" stackId="a" />
                                <Bar dataKey="absent" fill="#ff8042" name="Absent" stackId="a" />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            </div>
        </div>
    );
}
