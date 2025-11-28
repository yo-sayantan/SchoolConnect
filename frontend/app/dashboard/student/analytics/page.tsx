"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { fetchWithAuth } from "@/utils/api";
import { ArrowLeft } from "lucide-react";
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer,
    BarChart,
    Bar,
    RadarChart,
    PolarGrid,
    PolarAngleAxis,
    PolarRadiusAxis,
    Radar
} from "recharts";

export default function StudentAnalyticsPage() {
    const router = useRouter();
    const [performanceData, setPerformanceData] = useState<any>(null);
    const [yearlyData, setYearlyData] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const userId = localStorage.getItem("userId");
        if (!userId) {
            router.push("/login");
            return;
        }

        const fetchData = async () => {
            try {
                // Fetch Performance Summary
                const summary = await fetchWithAuth(`/academic/analytics/summary/${userId}`);
                setPerformanceData(summary);

                // Fetch Yearly Performance
                const yearly = await fetchWithAuth(`/academic/analytics/yearly/${userId}`);
                const formattedYearly = Object.entries(yearly).map(([year, avg]) => ({
                    year: year,
                    average: avg
                })).sort((a: any, b: any) => a.year - b.year);
                setYearlyData(formattedYearly);

            } catch (error) {
                console.error("Failed to fetch analytics", error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [router]);

    if (loading) return <div className="flex justify-center items-center min-h-screen">Loading...</div>;

    // Transform data for charts
    const subjectData = performanceData?.subjectAverages ? Object.entries(performanceData.subjectAverages).map(([subjectId, avg]) => ({
        subject: `Subject ${subjectId}`, // Ideally fetch subject name
        average: avg,
        fullMark: 100
    })) : [];

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-6">
            <div className="max-w-7xl mx-auto space-y-8">
                <div className="flex items-center justify-between">
                    <button onClick={() => router.back()} className="flex items-center gap-2 text-gray-600 hover:text-gray-900">
                        <ArrowLeft className="w-5 h-5" /> Back
                    </button>
                    <h1 className="text-3xl font-bold text-gray-800 dark:text-white">Performance Analytics</h1>
                </div>

                <div className="grid lg:grid-cols-2 gap-8">
                    {/* Performance Trend (Yearly) */}
                    <div className="card h-96">
                        <h2 className="text-xl font-bold mb-4">Performance Over Years</h2>
                        <ResponsiveContainer width="100%" height="100%">
                            <LineChart data={yearlyData}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="year" />
                                <YAxis domain={[0, 100]} />
                                <Tooltip />
                                <Legend />
                                <Line type="monotone" dataKey="average" stroke="#8884d8" strokeWidth={2} activeDot={{ r: 8 }} name="Average Grade" />
                            </LineChart>
                        </ResponsiveContainer>
                    </div>

                    {/* Subject Comparison */}
                    <div className="card h-96">
                        <h2 className="text-xl font-bold mb-4">Subject Comparison</h2>
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={subjectData}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="subject" />
                                <YAxis domain={[0, 100]} />
                                <Tooltip />
                                <Legend />
                                <Bar dataKey="average" fill="#82ca9d" name="Average Score" />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>

                    {/* Skills Radar */}
                    <div className="card h-96 lg:col-span-2">
                        <h2 className="text-xl font-bold mb-4">Skills Assessment</h2>
                        <ResponsiveContainer width="100%" height="100%">
                            <RadarChart cx="50%" cy="50%" outerRadius="80%" data={subjectData}>
                                <PolarGrid />
                                <PolarAngleAxis dataKey="subject" />
                                <PolarRadiusAxis domain={[0, 100]} />
                                <Radar name="Student Performance" dataKey="average" stroke="#8884d8" fill="#8884d8" fillOpacity={0.6} />
                                <Legend />
                            </RadarChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            </div>
        </div>
    );
}
