"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Navigation from "@/components/Navigation";
import { User, Mail, Phone, Calendar, Award, Edit, Camera } from "lucide-react";

export default function ProfilePage() {
    const router = useRouter();
    const [role, setRole] = useState("");
    const [user, setUser] = useState<any>(null);

    useEffect(() => {
        const userRole = localStorage.getItem("role");
        if (!userRole) {
            router.push("/login");
            return;
        }
        setRole(userRole);
        setUser({
            name: localStorage.getItem("name"),
            email: localStorage.getItem("email"),
            role: userRole
        });
    }, [router]);

    const studentInfo = {
        studentId: "STU2024001",
        grade: "Grade 10",
        class: "10-A",
        rollNumber: "15",
        dateOfBirth: "May 15, 2010",
        bloodGroup: "A+",
        address: "123 Main Street, City, State 12345",
        parentName: "John Anderson",
        parentPhone: "+1234567890",
        parentEmail: "parent1@school.com"
    };

    const achievements = [
        { title: "Perfect Attendance", emoji: "🏆", color: "yellow" },
        { title: "Math Olympiad Winner", emoji: "🥇", color: "gold" },
        { title: "Science Fair Participant", emoji: "🔬", color: "blue" },
        { title: "Sports Captain", emoji: "⚽", color: "green" }
    ];

    if (!role || !user) return null;

    return (
        <div className="flex min-h-screen">
            <Navigation role={role} />

            <div className="flex-1 p-6 lg:p-8 bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
                <div className="max-w-4xl mx-auto space-y-6">
                    {/* Header */}
                    <div className="text-center mb-8">
                        <h1 className="text-4xl md:text-5xl font-bold text-gradient mb-2">
                            My Profile 👤
                        </h1>
                        <p className="text-gray-600 dark:text-gray-400 text-lg">
                            Your personal information
                        </p>
                    </div>

                    {/* Profile Card */}
                    <div className="card bg-gradient-to-br from-blue-100 to-purple-100 dark:from-blue-900/20 dark:to-purple-900/20">
                        <div className="flex flex-col md:flex-row items-center gap-6">
                            {/* Avatar */}
                            <div className="relative">
                                <div className="w-32 h-32 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-6xl shadow-xl">
                                    {role === "STUDENT" ? "🎓" : role === "TEACHER" ? "👨‍🏫" : role === "PARENT" ? "👨‍👩‍👧" : role === "PRINCIPAL" ? "👔" : "📋"}
                                </div>
                                <button className="absolute bottom-0 right-0 w-10 h-10 bg-white dark:bg-gray-800 rounded-full shadow-lg flex items-center justify-center hover:scale-110 transition-transform">
                                    <Camera className="w-5 h-5 text-blue-500" />
                                </button>
                            </div>

                            {/* Info */}
                            <div className="flex-1 text-center md:text-left">
                                <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-2">
                                    {user.name}
                                </h2>
                                <p className="text-lg text-gray-600 dark:text-gray-400 mb-1">
                                    {role.replace("_", " ")}
                                </p>
                                {role === "STUDENT" && (
                                    <p className="text-sm text-gray-500">
                                        {studentInfo.grade} • Class {studentInfo.class} • Roll No. {studentInfo.rollNumber}
                                    </p>
                                )}
                            </div>

                            {/* Edit Button */}
                            <button className="px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-xl font-semibold hover:shadow-lg transition-all flex items-center gap-2">
                                <Edit className="w-5 h-5" />
                                Edit Profile
                            </button>
                        </div>
                    </div>

                    {/* Contact Information */}
                    <div className="card">
                        <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">
                            Contact Information
                        </h3>
                        <div className="grid md:grid-cols-2 gap-4">
                            <div className="flex items-center gap-3 p-3 rounded-lg bg-blue-50 dark:bg-blue-900/20">
                                <Mail className="w-6 h-6 text-blue-500" />
                                <div>
                                    <p className="text-xs text-gray-500">Email</p>
                                    <p className="font-semibold text-gray-800 dark:text-white">{user.email}</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-3 p-3 rounded-lg bg-green-50 dark:bg-green-900/20">
                                <Phone className="w-6 h-6 text-green-500" />
                                <div>
                                    <p className="text-xs text-gray-500">Phone</p>
                                    <p className="font-semibold text-gray-800 dark:text-white">+1234567890</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Student Details */}
                    {role === "STUDENT" && (
                        <>
                            <div className="card">
                                <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">
                                    Student Details
                                </h3>
                                <div className="grid md:grid-cols-2 gap-4">
                                    <div className="p-3 rounded-lg bg-purple-50 dark:bg-purple-900/20">
                                        <p className="text-xs text-gray-500 mb-1">Student ID</p>
                                        <p className="font-semibold text-gray-800 dark:text-white">{studentInfo.studentId}</p>
                                    </div>
                                    <div className="p-3 rounded-lg bg-pink-50 dark:bg-pink-900/20">
                                        <p className="text-xs text-gray-500 mb-1">Date of Birth</p>
                                        <p className="font-semibold text-gray-800 dark:text-white">{studentInfo.dateOfBirth}</p>
                                    </div>
                                    <div className="p-3 rounded-lg bg-orange-50 dark:bg-orange-900/20">
                                        <p className="text-xs text-gray-500 mb-1">Blood Group</p>
                                        <p className="font-semibold text-gray-800 dark:text-white">{studentInfo.bloodGroup}</p>
                                    </div>
                                    <div className="p-3 rounded-lg bg-teal-50 dark:bg-teal-900/20">
                                        <p className="text-xs text-gray-500 mb-1">Address</p>
                                        <p className="font-semibold text-gray-800 dark:text-white text-sm">{studentInfo.address}</p>
                                    </div>
                                </div>
                            </div>

                            {/* Parent Information */}
                            <div className="card">
                                <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">
                                    Parent/Guardian Information
                                </h3>
                                <div className="grid md:grid-cols-3 gap-4">
                                    <div className="p-3 rounded-lg bg-blue-50 dark:bg-blue-900/20">
                                        <p className="text-xs text-gray-500 mb-1">Name</p>
                                        <p className="font-semibold text-gray-800 dark:text-white">{studentInfo.parentName}</p>
                                    </div>
                                    <div className="p-3 rounded-lg bg-green-50 dark:bg-green-900/20">
                                        <p className="text-xs text-gray-500 mb-1">Phone</p>
                                        <p className="font-semibold text-gray-800 dark:text-white">{studentInfo.parentPhone}</p>
                                    </div>
                                    <div className="p-3 rounded-lg bg-purple-50 dark:bg-purple-900/20">
                                        <p className="text-xs text-gray-500 mb-1">Email</p>
                                        <p className="font-semibold text-gray-800 dark:text-white">{studentInfo.parentEmail}</p>
                                    </div>
                                </div>
                            </div>

                            {/* Achievements */}
                            <div className="card">
                                <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-4 flex items-center gap-2">
                                    <Award className="w-6 h-6 text-yellow-500" />
                                    Achievements & Awards
                                </h3>
                                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                    {achievements.map((achievement, index) => (
                                        <div
                                            key={index}
                                            className="text-center p-4 rounded-xl bg-gradient-to-br from-yellow-50 to-orange-50 dark:from-yellow-900/20 dark:to-orange-900/20 hover:shadow-lg transition-all"
                                        >
                                            <div className="text-4xl mb-2">{achievement.emoji}</div>
                                            <p className="text-sm font-semibold text-gray-800 dark:text-white">
                                                {achievement.title}
                                            </p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </>
                    )}
                </div>

                {/* Floating decoration */}
                <div className="fixed bottom-10 right-10 text-6xl animate-bounce-slow opacity-20 pointer-events-none">
                    👤
                </div>
            </div>
        </div>
    );
}
