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
        <header className="bg-white/70 backdrop-blur-xl border-b border-white/50 sticky top-0 z-50 transition-all duration-300">
            <div className="w-full px-8 py-3">
                <div className="flex items-center justify-between">
                    {/* School Logo & Name */}
                    <div className="flex items-center gap-3 cursor-pointer group" onClick={() => router.push("/")}>
                        <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center text-2xl shadow-lg group-hover:scale-110 transition-transform duration-200">
                            🎓
                        </div>
                        <div>
                            <h1 className="text-xl font-extrabold text-gray-900 tracking-tight group-hover:text-indigo-600 transition-colors">
                                Greenwood International
                            </h1>
                            <p className="text-xs text-gray-500 font-medium flex items-center gap-1">
                                <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
                                Online Campus
                            </p>
                        </div>
                    </div>

                    {/* Quick Info */}
                    <div className="hidden md:flex items-center gap-6 text-sm font-medium text-gray-600">
                        <div className="flex items-center gap-2 hover:text-indigo-600 transition-colors cursor-pointer">
                            <span>📞</span>
                            <span>+1 (555) 123-4567</span>
                        </div>
                        <div className="flex items-center gap-2 hover:text-indigo-600 transition-colors cursor-pointer">
                            <span>✉️</span>
                            <span>info@greenwood.edu</span>
                        </div>

                        {isLoggedIn ? (
                            <button
                                onClick={handleLogout}
                                className="bg-red-50 text-red-600 border border-red-100 px-4 py-2 rounded-xl font-bold hover:bg-red-100 transition-all shadow-sm hover:shadow-md"
                            >
                                Logout
                            </button>
                        ) : (
                            <a
                                href="/register"
                                className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-5 py-2 rounded-xl font-bold hover:shadow-lg hover:shadow-indigo-500/30 hover:-translate-y-0.5 transition-all duration-200"
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
