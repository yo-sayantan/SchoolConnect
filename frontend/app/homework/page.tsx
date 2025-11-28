"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Navigation from "@/components/Navigation";
import { BookOpen, CheckCircle, Clock, AlertCircle, Calendar, MessageCircle, CheckSquare } from "lucide-react";

export default function HomeworkPage() {
    const router = useRouter();
    const [role, setRole] = useState("");
    const [activeFilter, setActiveFilter] = useState("all");

    useEffect(() => {
        const userRole = localStorage.getItem("role");
        if (!userRole || userRole !== "STUDENT") {
            router.push("/login");
            return;
        }
        setRole(userRole);
    }, [router]);

    const assignments = [
        {
            subject: "Mathematics",
            title: "Complete Chapter 5 Exercises",
            dueDate: "Tomorrow",
            status: "pending",
            priority: "high",
            emoji: "🔢",
            color: "red"
        },
        {
            subject: "Science",
            title: "Lab Report - Plant Cell",
            dueDate: "In 2 days",
            status: "in-progress",
            priority: "medium",
            emoji: "🔬",
            color: "blue"
        },
        {
            subject: "English",
            title: "Essay on Summer Vacation",
            dueDate: "In 3 days",
            status: "pending",
            priority: "medium",
            emoji: "✍️",
            color: "purple"
        },
        {
            subject: "History",
            title: "Read Chapter 8",
            dueDate: "Next week",
            status: "pending",
            priority: "low",
            emoji: "📜",
            color: "green"
        },
        {
            subject: "Art",
            title: "Draw a Landscape",
            dueDate: "Completed",
            status: "completed",
            priority: "low",
            emoji: "🎨",
            color: "yellow"
        }
    ];

    const stats = {
        all: assignments.length,
        pending: assignments.filter(a => a.status === "pending").length,
        "in-progress": assignments.filter(a => a.status === "in-progress").length,
        completed: assignments.filter(a => a.status === "completed").length
    };

    const filteredAssignments = activeFilter === "all"
        ? assignments
        : assignments.filter(a => a.status === activeFilter);

    if (!role) return null;

    return (
        <div className="flex min-h-screen">
            <Navigation role={role} />

            <div className="flex-1 p-6 lg:p-8 bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
                <div className="max-w-6xl mx-auto space-y-6">
                    {/* Header */}
                    <div className="text-center mb-8">
                        <h1 className="text-4xl md:text-5xl font-bold text-gradient mb-2">
                            My Homework 📚
                        </h1>
                        <p className="text-gray-600 dark:text-gray-400 text-lg">
                            Keep track of all your assignments!
                        </p>
                    </div>

                    {/* Stats Filters */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        <button
                            onClick={() => setActiveFilter("all")}
                            className={`card text-left transition-all ${activeFilter === "all" ? "ring-4 ring-blue-400 scale-105" : "hover:scale-105"} bg-blue-50 dark:bg-blue-900/20`}
                        >
                            <div className="flex items-center gap-3">
                                <BookOpen className="w-8 h-8 text-blue-500" />
                                <div>
                                    <p className="text-sm text-gray-600">Total</p>
                                    <p className="text-2xl font-bold text-gray-800">{stats.all}</p>
                                </div>
                            </div>
                        </button>
                        <button
                            onClick={() => setActiveFilter("pending")}
                            className={`card text-left transition-all ${activeFilter === "pending" ? "ring-4 ring-orange-400 scale-105" : "hover:scale-105"} bg-orange-50 dark:bg-orange-900/20`}
                        >
                            <div className="flex items-center gap-3">
                                <AlertCircle className="w-8 h-8 text-orange-500" />
                                <div>
                                    <p className="text-sm text-gray-600">Pending</p>
                                    <p className="text-2xl font-bold text-gray-800">{stats.pending}</p>
                                </div>
                            </div>
                        </button>
                        <button
                            onClick={() => setActiveFilter("in-progress")}
                            className={`card text-left transition-all ${activeFilter === "in-progress" ? "ring-4 ring-purple-400 scale-105" : "hover:scale-105"} bg-purple-50 dark:bg-purple-900/20`}
                        >
                            <div className="flex items-center gap-3">
                                <Clock className="w-8 h-8 text-purple-500" />
                                <div>
                                    <p className="text-sm text-gray-600">In Progress</p>
                                    <p className="text-2xl font-bold text-gray-800">{stats["in-progress"]}</p>
                                </div>
                            </div>
                        </button>
                        <button
                            onClick={() => setActiveFilter("completed")}
                            className={`card text-left transition-all ${activeFilter === "completed" ? "ring-4 ring-green-400 scale-105" : "hover:scale-105"} bg-green-50 dark:bg-green-900/20`}
                        >
                            <div className="flex items-center gap-3">
                                <CheckCircle className="w-8 h-8 text-green-500" />
                                <div>
                                    <p className="text-sm text-gray-600">Completed</p>
                                    <p className="text-2xl font-bold text-gray-800">{stats.completed}</p>
                                </div>
                            </div>
                        </button>
                    </div>

                    {/* Assignments List */}
                    <div className="space-y-4">
                        {filteredAssignments.map((assignment, index) => (
                            <div
                                key={index}
                                className={`card-hover ${assignment.status === "completed"
                                    ? "opacity-60"
                                    : ""
                                    }`}
                            >
                                <div className="flex flex-col md:flex-row items-start gap-4">
                                    {/* Emoji Icon */}
                                    <div className="text-5xl">{assignment.emoji}</div>

                                    {/* Content */}
                                    <div className="flex-1 w-full">
                                        <div className="flex items-start justify-between mb-2">
                                            <div>
                                                <h3 className="text-xl font-bold text-gray-800 dark:text-white">
                                                    {assignment.title}
                                                </h3>
                                                <p className="text-sm text-gray-600 dark:text-gray-400">
                                                    {assignment.subject}
                                                </p>
                                            </div>
                                            <span
                                                className={`px-3 py-1 rounded-full text-xs font-bold ${assignment.priority === "high"
                                                    ? "bg-red-200 text-red-800"
                                                    : assignment.priority === "medium"
                                                        ? "bg-orange-200 text-orange-800"
                                                        : "bg-green-200 text-green-800"
                                                    }`}
                                            >
                                                {assignment.priority.toUpperCase()}
                                            </span>
                                        </div>

                                        <div className="flex items-center gap-4 mt-3">
                                            <div className="flex items-center gap-2 text-sm text-gray-600">
                                                <Calendar className="w-4 h-4" />
                                                <span>{assignment.dueDate}</span>
                                            </div>
                                            <span
                                                className={`px-3 py-1 rounded-full text-xs font-semibold ${assignment.status === "completed"
                                                    ? "bg-green-100 text-green-800"
                                                    : assignment.status === "in-progress"
                                                        ? "bg-blue-100 text-blue-800"
                                                        : "bg-gray-100 text-gray-800"
                                                    }`}
                                            >
                                                {assignment.status === "completed"
                                                    ? "✓ Completed"
                                                    : assignment.status === "in-progress"
                                                        ? "⏳ In Progress"
                                                        : "📝 To Do"}
                                            </span>
                                        </div>

                                        {/* Action Buttons */}
                                        <div className="flex flex-wrap gap-2 mt-4">
                                            {assignment.status !== "completed" ? (
                                                <>
                                                    <button className="px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg font-semibold hover:shadow-lg hover:scale-105 transition-all text-sm flex items-center gap-2">
                                                        Start Working
                                                    </button>
                                                    <button className="px-4 py-2 bg-green-100 text-green-700 border border-green-200 rounded-lg font-semibold hover:bg-green-200 transition-all text-sm flex items-center gap-2">
                                                        <CheckSquare className="w-4 h-4" />
                                                        Completed
                                                    </button>
                                                </>
                                            ) : (
                                                <button className="px-4 py-2 bg-gray-100 text-gray-500 rounded-lg font-semibold cursor-default text-sm flex items-center gap-2">
                                                    <CheckCircle className="w-4 h-4" />
                                                    Done
                                                </button>
                                            )}

                                            <button className="px-4 py-2 bg-white border border-gray-200 text-gray-700 rounded-lg font-semibold hover:bg-gray-50 transition-all text-sm">
                                                View Details
                                            </button>

                                            <button
                                                onClick={() => router.push("/dashboard/student/chat")}
                                                className="px-4 py-2 bg-pink-50 text-pink-600 border border-pink-100 rounded-lg font-semibold hover:bg-pink-100 transition-all text-sm flex items-center gap-2 ml-auto"
                                            >
                                                <MessageCircle className="w-4 h-4" />
                                                Message Teacher
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}

                        {filteredAssignments.length === 0 && (
                            <div className="text-center py-12 text-gray-500">
                                <p className="text-xl">No assignments found in this category! 🎉</p>
                            </div>
                        )}
                    </div>
                </div>

                {/* Floating decoration */}
                <div className="fixed bottom-10 right-10 text-6xl animate-bounce-slow opacity-20 pointer-events-none">
                    📚
                </div>
            </div>
        </div>
    );
}
