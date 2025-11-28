"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Navigation from "@/components/Navigation";
import { Users, BookOpen, Calendar, Edit, ArrowRight } from "lucide-react";

export default function ClassDetailsPage() {
    const router = useRouter();
    const [classes, setClasses] = useState<any[]>([]);

    useEffect(() => {
        // Mock data for classes
        setClasses([
            { id: 1, name: "Grade 10-A", subject: "Mathematics", students: 32, nextClass: "10:00 AM" },
            { id: 2, name: "Grade 9-B", subject: "Mathematics", students: 28, nextClass: "11:30 AM" },
            { id: 3, name: "Grade 11-A", subject: "Physics", students: 30, nextClass: "02:00 PM" },
        ]);
    }, []);

    return (
        <div className="flex min-h-screen">
            <Navigation role="TEACHER" />
            <div className="flex-1 p-6 lg:p-8 bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
                <div className="max-w-7xl mx-auto space-y-6">
                    <div className="flex items-center justify-between">
                        <div>
                            <h1 className="text-3xl font-bold text-gray-800">My Classes 📚</h1>
                            <p className="text-gray-600">Manage your classrooms, attendance, and marks.</p>
                        </div>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {classes.map((cls) => (
                            <div key={cls.id} className="card group">
                                <div className="flex justify-between items-start mb-4">
                                    <div className="p-3 rounded-xl bg-blue-100 text-blue-600">
                                        <BookOpen className="w-6 h-6" />
                                    </div>
                                    <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-medium">
                                        Active
                                    </span>
                                </div>

                                <h3 className="text-xl font-bold text-gray-800 mb-1">{cls.name}</h3>
                                <p className="text-gray-600 mb-4">{cls.subject}</p>

                                <div className="flex items-center gap-4 text-sm text-gray-500 mb-6">
                                    <div className="flex items-center gap-1">
                                        <Users className="w-4 h-4" />
                                        {cls.students} Students
                                    </div>
                                    <div className="flex items-center gap-1">
                                        <Calendar className="w-4 h-4" />
                                        {cls.nextClass}
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <button
                                        onClick={() => router.push(`/dashboard/teacher/attendance?classId=${cls.id}`)}
                                        className="w-full flex items-center justify-between p-3 rounded-lg bg-gray-50 hover:bg-blue-50 text-gray-700 hover:text-blue-700 transition-colors"
                                    >
                                        <span className="font-medium">Take Attendance</span>
                                        <ArrowRight className="w-4 h-4" />
                                    </button>
                                    <button
                                        onClick={() => router.push(`/dashboard/teacher/marks?classId=${cls.id}`)}
                                        className="w-full flex items-center justify-between p-3 rounded-lg bg-gray-50 hover:bg-purple-50 text-gray-700 hover:text-purple-700 transition-colors"
                                    >
                                        <span className="font-medium">Enter Marks</span>
                                        <ArrowRight className="w-4 h-4" />
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
