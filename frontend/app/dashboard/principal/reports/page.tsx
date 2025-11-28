"use client";

import { useRouter } from "next/navigation";
import Navigation from "@/components/Navigation";
import { ArrowLeft, BarChart2, TrendingUp, Users, BookOpen, Download } from "lucide-react";

export default function ViewReportsPage() {
    const router = useRouter();

    const reports = [
        {
            title: "Academic Performance",
            description: "Overall school academic performance analysis",
            icon: <TrendingUp className="w-6 h-6 text-blue-600" />,
            color: "blue",
            date: "Updated today"
        },
        {
            title: "Attendance Report",
            description: "Student and staff attendance statistics",
            icon: <Users className="w-6 h-6 text-green-600" />,
            color: "green",
            date: "Updated yesterday"
        },
        {
            title: "Curriculum Progress",
            description: "Syllabus completion status by class",
            icon: <BookOpen className="w-6 h-6 text-purple-600" />,
            color: "purple",
            date: "Updated 2 days ago"
        },
        {
            title: "Financial Summary",
            description: "Fee collection and expense reports",
            icon: <BarChart2 className="w-6 h-6 text-orange-600" />,
            color: "orange",
            date: "Updated last week"
        }
    ];

    return (
        <div className="flex min-h-screen bg-gray-50">
            <Navigation role="PRINCIPAL" />
            <div className="flex-1 p-8">
                <div className="max-w-6xl mx-auto">
                    <button
                        onClick={() => router.back()}
                        className="flex items-center text-gray-600 hover:text-gray-900 mb-6 transition-colors"
                    >
                        <ArrowLeft className="w-5 h-5 mr-2" />
                        Back to Dashboard
                    </button>

                    <div className="flex items-center justify-between mb-8">
                        <div>
                            <h1 className="text-3xl font-bold text-gray-800">School Reports</h1>
                            <p className="text-gray-500">Access detailed reports and analytics</p>
                        </div>
                        <button className="btn-secondary flex items-center gap-2">
                            <Download className="w-5 h-5" />
                            Export All
                        </button>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                        {reports.map((report, index) => (
                            <div key={index} className="card-hover group">
                                <div className="flex items-start justify-between mb-4">
                                    <div className={`p-3 rounded-xl bg-${report.color}-100`}>
                                        {report.icon}
                                    </div>
                                    <span className="text-xs text-gray-400 font-medium">{report.date}</span>
                                </div>
                                <h3 className="text-xl font-bold text-gray-800 mb-2 group-hover:text-blue-600 transition-colors">
                                    {report.title}
                                </h3>
                                <p className="text-gray-500 mb-6">
                                    {report.description}
                                </p>
                                <button className="w-full py-2 rounded-xl bg-gray-50 text-gray-600 font-medium hover:bg-blue-50 hover:text-blue-600 transition-colors">
                                    View Details
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
