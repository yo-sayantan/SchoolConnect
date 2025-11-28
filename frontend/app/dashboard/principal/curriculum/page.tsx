"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Navigation from "@/components/Navigation";
import { ArrowLeft, Book, ChevronRight, CheckCircle, Clock } from "lucide-react";

export default function CurriculumPage() {
    const router = useRouter();
    const [selectedGrade, setSelectedGrade] = useState("10");

    const subjects = [
        { name: "Mathematics", progress: 75, status: "On Track", teacher: "Sarah Wilson" },
        { name: "Science", progress: 60, status: "Delayed", teacher: "James Miller" },
        { name: "English", progress: 85, status: "Ahead", teacher: "Emily Davis" },
        { name: "History", progress: 70, status: "On Track", teacher: "Robert Brown" },
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

                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
                        <div>
                            <h1 className="text-3xl font-bold text-gray-800">Curriculum Management</h1>
                            <p className="text-gray-500">Track syllabus completion and academic progress</p>
                        </div>
                        <select
                            value={selectedGrade}
                            onChange={(e) => setSelectedGrade(e.target.value)}
                            className="input-field w-48"
                        >
                            <option value="9">Grade 9</option>
                            <option value="10">Grade 10</option>
                            <option value="11">Grade 11</option>
                            <option value="12">Grade 12</option>
                        </select>
                    </div>

                    <div className="grid gap-6">
                        {subjects.map((subject, index) => (
                            <div key={index} className="card group">
                                <div className="flex flex-col md:flex-row md:items-center gap-6">
                                    <div className="p-4 bg-blue-50 rounded-2xl text-blue-600">
                                        <Book className="w-8 h-8" />
                                    </div>

                                    <div className="flex-1">
                                        <div className="flex justify-between items-start mb-2">
                                            <div>
                                                <h3 className="text-xl font-bold text-gray-800">{subject.name}</h3>
                                                <p className="text-gray-500 text-sm">Teacher: {subject.teacher}</p>
                                            </div>
                                            <span className={`badge ${subject.status === 'Ahead' ? 'badge-success' :
                                                    subject.status === 'Delayed' ? 'badge-danger' : 'badge-primary'
                                                }`}>
                                                {subject.status}
                                            </span>
                                        </div>

                                        <div className="mt-4">
                                            <div className="flex justify-between text-sm mb-1">
                                                <span className="font-medium text-gray-700">Syllabus Completion</span>
                                                <span className="font-bold text-blue-600">{subject.progress}%</span>
                                            </div>
                                            <div className="w-full bg-gray-100 rounded-full h-2.5 overflow-hidden">
                                                <div
                                                    className="bg-blue-600 h-2.5 rounded-full transition-all duration-500"
                                                    style={{ width: `${subject.progress}%` }}
                                                ></div>
                                            </div>
                                        </div>
                                    </div>

                                    <button className="p-3 rounded-xl hover:bg-gray-100 text-gray-400 hover:text-blue-600 transition-colors">
                                        <ChevronRight className="w-6 h-6" />
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
