"use client";

import { useRouter } from "next/navigation";
import { Sparkles, BookOpen, Users, Calendar, Bell } from "lucide-react";

export default function Home() {
    const router = useRouter();

    const features = [
        {
            icon: BookOpen,
            title: "Learn & Grow",
            description: "Access your classes and assignments",
            color: "from-blue-400 to-blue-600"
        },
        {
            icon: Users,
            title: "Connect",
            description: "Stay connected with teachers and parents",
            color: "from-purple-400 to-purple-600"
        },
        {
            icon: Calendar,
            title: "Events",
            description: "Never miss important dates",
            color: "from-pink-400 to-pink-600"
        },
        {
            icon: Bell,
            title: "Notifications",
            description: "Get instant updates",
            color: "from-green-400 to-green-600"
        }
    ];

    return (
        <main className="flex flex-col items-center justify-center p-6 py-20">
            <div className="max-w-6xl w-full space-y-12 text-center">
                {/* Hero Section */}
                <div className="space-y-6 animate-float">
                    <div className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white px-6 py-2 rounded-full text-sm font-semibold shadow-lg">
                        <Sparkles className="w-4 h-4" />
                        Welcome to SchoolConnect V3.0
                    </div>

                    <h1 className="text-6xl md:text-7xl font-bold text-gradient leading-tight">
                        Your School,
                        <br />
                        Your Way! 🎓
                    </h1>

                    <p className="text-xl md:text-2xl text-gray-700 dark:text-gray-300 max-w-2xl mx-auto">
                        A fun and easy way to manage your school life - for students, parents, and teachers!
                    </p>

                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-8">
                        <button
                            onClick={() => router.push("/login")}
                            className="btn-primary text-lg px-10 py-4 inline-flex items-center gap-2 group min-w-[200px] justify-center"
                        >
                            Login
                            <span className="group-hover:translate-x-1 transition-transform">→</span>
                        </button>
                        <button
                            onClick={() => router.push("/register")}
                            className="px-10 py-4 rounded-xl font-bold text-lg border-2 border-blue-600 text-blue-600 hover:bg-blue-50 transition-colors min-w-[200px]"
                        >
                            Sign Up
                        </button>
                    </div>
                </div>

                {/* Features Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-16">
                    {features.map((feature, index) => (
                        <div
                            key={index}
                            className="card-hover group"
                            style={{ animationDelay: `${index * 100}ms` }}
                        >
                            <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${feature.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                                <feature.icon className="w-8 h-8 text-white" />
                            </div>
                            <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-2">
                                {feature.title}
                            </h3>
                            <p className="text-gray-600 dark:text-gray-400">
                                {feature.description}
                            </p>
                        </div>
                    ))}
                </div>

                {/* Fun decorative elements */}
                <div className="fixed top-10 left-10 text-6xl animate-bounce-slow opacity-20 pointer-events-none">
                    🎨
                </div>
                <div className="fixed bottom-10 right-10 text-6xl animate-bounce-slow opacity-20 pointer-events-none" style={{ animationDelay: '1s' }}>
                    ⭐
                </div>
                <div className="fixed top-1/2 right-20 text-4xl animate-float opacity-20 pointer-events-none" style={{ animationDelay: '0.5s' }}>
                    📚
                </div>
            </div>
        </main>
    );
}
