"use client";

import { useRouter } from "next/navigation";
import { Sparkles, GraduationCap, Users, User, ArrowRight } from "lucide-react";

export default function RegisterPage() {
    const router = useRouter();

    const roles = [
        {
            id: "student",
            name: "Student",
            description: "Access your classes, assignments, and grades",
            icon: <GraduationCap className="w-12 h-12" />,
            bgColor: "bg-blue-50 hover:bg-blue-100",
            textColor: "text-blue-600"
        },
        {
            id: "parent",
            name: "Parent",
            description: "Monitor your child's progress and stay connected",
            icon: <Users className="w-12 h-12" />,
            bgColor: "bg-purple-50 hover:bg-purple-100",
            textColor: "text-purple-600"
        },
        {
            id: "teacher",
            name: "Teacher",
            description: "Manage classes, attendance, and assessments",
            icon: <User className="w-12 h-12" />,
            bgColor: "bg-pink-50 hover:bg-pink-100",
            textColor: "text-pink-600"
        }
    ];

    return (
        <div className="flex-1 flex items-center justify-center p-4 py-20">
            <div className="max-w-4xl w-full">
                {/* Header */}
                <div className="text-center mb-12 animate-float">
                    <div className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white px-6 py-2 rounded-full text-sm font-semibold shadow-lg mb-4">
                        <Sparkles className="w-4 h-4" />
                        Join SchoolConnect
                    </div>
                    <h1 className="text-4xl md:text-5xl font-bold text-gradient mb-4">
                        Create Your Account 🚀
                    </h1>
                    <p className="text-gray-600 dark:text-gray-400 text-lg max-w-2xl mx-auto">
                        Choose your role to get started. We'll guide you through the registration process.
                    </p>
                </div>

                {/* Role Selection */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {roles.map((role, index) => (
                        <button
                            key={role.id}
                            onClick={() => router.push(`/register/${role.id}`)}
                            className={`group relative p-8 rounded-2xl transition-all duration-300 hover:-translate-y-2 hover:shadow-xl border-2 border-transparent hover:border-${role.textColor.split("-")[1]}-200 ${role.bgColor}`}
                            style={{ animationDelay: `${index * 100}ms` }}
                        >
                            <div className={`mb-6 ${role.textColor} transform group-hover:scale-110 transition-transform duration-300`}>
                                {role.icon}
                            </div>
                            <h3 className="text-2xl font-bold text-gray-800 mb-2">
                                {role.name}
                            </h3>
                            <p className="text-gray-600 mb-6 leading-relaxed">
                                {role.description}
                            </p>
                            <div className={`flex items-center font-semibold ${role.textColor} group-hover:gap-2 transition-all`}>
                                Register Now <ArrowRight className="w-4 h-4 ml-1" />
                            </div>
                        </button>
                    ))}
                </div>

                {/* Login Link */}
                <div className="text-center mt-12">
                    <p className="text-gray-600">
                        Already have an account?{" "}
                        <button
                            onClick={() => router.push("/login")}
                            className="text-blue-600 font-semibold hover:underline"
                        >
                            Login here
                        </button>
                    </p>
                </div>

                {/* Decorative elements */}
                <div className="fixed top-20 left-10 text-4xl animate-bounce-slow opacity-10 pointer-events-none">
                    🎨
                </div>
                <div className="fixed bottom-20 right-10 text-4xl animate-float opacity-10 pointer-events-none">
                    ⭐
                </div>
            </div>
        </div>
    );
}
