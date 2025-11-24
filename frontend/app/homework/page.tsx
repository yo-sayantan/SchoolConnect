"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Navigation from "@/components/Navigation";
import { BookOpen, CheckCircle, Clock, AlertCircle, Calendar } from "lucide-react";

export default function HomeworkPage() {
    const router = useRouter();
    const [role, setRole] = useState("");

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
        total: assignments.length,
        pending: assignments.filter(a => a.status === "pending").length,
        inProgress: assignments.filter(a => a.status === "in-progress").length,
        completed: assignments.filter(a => a.status === "completed").length
    };

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

                    {/* Stats Cards */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        <div className="card bg-blue-50 dark:bg-blue-900/20">
                            <div className="flex items-center gap-3">
                                <BookOpen className="w-8 h-8 text-blue-500" />
                                <div>
                                    <p className="text-sm text-gray-600">Total</p>
                                    <p className="text-2xl font-bold text-gray-800">{stats.total}</p>
                                </div>
                            </div>
                        </div>
                        <div className="card bg-orange-50 dark:bg-orange-900/20">
                            <div className="flex items-center gap-3">
                                <AlertCircle className="w-8 h-8 text-orange-500" />
                                <div>
                                    <p className="text-sm text-gray-600">Pending</p>
                                    <p className="text-2xl font-bold text-gray-800">{stats.pending}</p>
                                </div>
                            </div>
                        </div>
                        <div className="card bg-purple-50 dark:bg-purple-900/20">
                            <div className="flex items-center gap-3">
                                <Clock className="w-8 h-8 text-purple-500" />
                                <div>
                                    <p className="text-sm text-gray-600">In Progress</p>
                                    <p className="text-2xl font-bold text-gray-800">{stats.inProgress}</p>
                                </div>
                            </div>
                        </div>
                        <div className="card bg-green-50 dark:bg-green-900/20">
                            <div className="flex items-center gap-3">
                                <CheckCircle className="w-8 h-8 text-green-500" />
                                <div>
                                    <p className="text-sm text-gray-600">Completed</p>
                                    <p className="text-2xl font-bold text-gray-800">{stats.completed}</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Assignments List */}
                    <div className="space-y-4">
                        {assignments.map((assignment, index) => (
                            <div
                                key={index}
                                className={`card-hover ${assignment.status === "completed"
                                        ? "opacity-60"
                                        : ""
                                    }`}
                            >
                                <div className="flex items-start gap-4">
                                    {/* Emoji Icon */}
                                    <div className="text-5xl">{assignment.emoji}</div>

                                    {/* Content */}
                                    <div className="flex-1">
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
                                        {assignment.status !== "completed" && (
                                            <div className="flex gap-2 mt-4">
                                                <button className="px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg font-semibold hover:shadow-lg transition-all text-sm">
                                                    Start Working
                                                </button>
                                                <button className="px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white rounded-lg font-semibold hover:shadow-lg transition-all text-sm">
                                                    View Details
                                                </button>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        ))}
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
