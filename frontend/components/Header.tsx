"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Header() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const router = useRouter();

    useEffect(() => {
        const token = localStorage.getItem("token");
        setIsLoggedIn(!!token);
    }, []);

    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("role");
        localStorage.removeItem("name");
        localStorage.removeItem("email");
        setIsLoggedIn(false);
        router.push("/");
    };

    return (
        <header className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 text-white shadow-lg">
            <div className="max-w-7xl mx-auto px-6 py-4">
                <div className="flex items-center justify-between">
                    {/* School Logo & Name */}
                    <div className="flex items-center gap-4 cursor-pointer" onClick={() => router.push("/")}>
                        <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-3xl shadow-lg">
                            🎓
                        </div>
                        <div>
                            <h1 className="text-2xl font-bold">Greenwood International School</h1>
                            <p className="text-sm opacity-90 flex items-center gap-2">
                                <span>📍</span>
                                <span>123 Education Lane, Silicon Valley, CA 94025</span>
                            </p>
                        </div>
                    </div>

                    {/* Quick Info */}
                    <div className="hidden md:flex items-center gap-6 text-sm">
                        <div className="flex items-center gap-2">
                            <span>📞</span>
                            <span>+1 (555) 123-4567</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <span>✉️</span>
                            <span>info@greenwood.edu</span>
                        </div>

                        {isLoggedIn ? (
                            <button
                                onClick={handleLogout}
                                className="bg-white/10 text-white border border-white/20 px-4 py-2 rounded-lg font-bold hover:bg-white/20 transition-colors backdrop-blur-sm"
                            >
                                Logout
                            </button>
                        ) : (
                            <a
                                href="/register"
                                className="bg-white text-purple-600 px-4 py-2 rounded-lg font-bold hover:bg-gray-100 transition-colors shadow-md"
                            >
                                Sign Up
                            </a>
                        )}
                    </div>
                </div>
            </div>
        </header>
    );
}
