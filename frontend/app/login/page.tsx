"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { User, Phone, Mail, ArrowRight, Sparkles } from "lucide-react";

const roles = [
    {
        id: "STUDENT",
        name: "Student",
        icon: "🎓",
        color: "from-blue-400 to-blue-600",
        bgColor: "bg-blue-50 dark:bg-blue-900/20",
        description: "Access your classes and homework"
    },
    {
        id: "PARENT",
        name: "Parent",
        icon: "👨‍👩‍👧",
        color: "from-green-400 to-green-600",
        bgColor: "bg-green-50 dark:bg-green-900/20",
        description: "Track your child's progress"
    },
    {
        id: "TEACHER",
        name: "Teacher",
        icon: "👨‍🏫",
        color: "from-purple-400 to-purple-600",
        bgColor: "bg-purple-50 dark:bg-purple-900/20",
        description: "Manage your classes"
    },
    {
        id: "ADMIN_ASSISTANT",
        name: "Admin Assistant",
        icon: "📋",
        color: "from-orange-400 to-orange-600",
        bgColor: "bg-orange-50 dark:bg-orange-900/20",
        description: "Handle administrative tasks"
    },
    {
        id: "PRINCIPAL",
        name: "Principal",
        icon: "👔",
        color: "from-pink-400 to-pink-600",
        bgColor: "bg-pink-50 dark:bg-pink-900/20",
        description: "Oversee school operations"
    }
];

export default function LoginPage() {
    const router = useRouter();
    const [step, setStep] = useState<"role" | "credentials">("role");
    const [selectedRole, setSelectedRole] = useState("");
    const [identifier, setIdentifier] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const handleRoleSelect = (roleId: string) => {
        setSelectedRole(roleId);
        setStep("credentials");
    };

    const handleLogin = async () => {
        if (!identifier || !password) {
            setError("Please enter both email/phone and password");
            return;
        }

        setLoading(true);
        setError("");

        try {
            const response = await fetch("http://localhost:8080/api/auth/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ identifier, password })
            });

            const data = await response.json();

            if (response.ok) {
                // Store token and user info
                localStorage.setItem("token", data.token);
                localStorage.setItem("role", data.role);
                localStorage.setItem("name", data.name);
                localStorage.setItem("email", data.email);

                // Redirect to dashboard
                router.push(`/dashboard/${data.role.toLowerCase()}`);
            } else {
                setError(data.error || "Login failed");
            }
        } catch (err) {
            setError("Network error. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center p-4">
            <div className="max-w-4xl w-full">
                {/* Header */}
                <div className="text-center mb-8 animate-float">
                    <div className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white px-6 py-2 rounded-full text-sm font-semibold shadow-lg mb-4">
                        <Sparkles className="w-4 h-4" />
                        SchoolConnect Login
                    </div>
                    <h1 className="text-4xl md:text-5xl font-bold text-gradient mb-2">
                        Welcome Back! 👋
                    </h1>
                    <p className="text-gray-600 dark:text-gray-400 text-lg">
                        {step === "role" ? "Choose your role to continue" : "Enter your credentials"}
                    </p>
                </div>

                {/* Role Selection */}
                {step === "role" && (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {roles.map((role, index) => (
                            <button
                                key={role.id}
                                onClick={() => handleRoleSelect(role.id)}
                                className={`card-hover text-left p-6 ${role.bgColor}`}
                                style={{ animationDelay: `${index * 100}ms` }}
                            >
                                <div className="text-5xl mb-3">{role.icon}</div>
                                <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-1">
                                    {role.name}
                                </h3>
                                <p className="text-sm text-gray-600 dark:text-gray-400">
                                    {role.description}
                                </p>
                            </button>
                        ))}
                    </div>
                )}

                {/* Credentials Input */}
                {step === "credentials" && (
                    <div className="card max-w-md mx-auto space-y-6">
                        <button
                            onClick={() => setStep("role")}
                            className="text-blue-600 hover:text-blue-700 font-medium flex items-center gap-1"
                        >
                            ← Back to roles
                        </button>

                        <div>
                            <h3 className="text-2xl font-bold mb-2">
                                Login as {roles.find(r => r.id === selectedRole)?.name}
                            </h3>
                            <p className="text-gray-600 dark:text-gray-400">
                                Enter your email/phone and password
                            </p>
                        </div>

                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                    Email or Phone Number
                                </label>
                                <div className="relative">
                                    <input
                                        type="text"
                                        value={identifier}
                                        onChange={(e) => setIdentifier(e.target.value)}
                                        placeholder="student@school.com or +1234567890"
                                        className="input-field pl-12"
                                    />
                                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                    Password
                                </label>
                                <div className="relative">
                                    <input
                                        type="password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        placeholder="Enter your password"
                                        className="input-field pl-12"
                                    />
                                    <div className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400">🔒</div>
                                </div>
                            </div>

                            {error && (
                                <div className="bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 p-3 rounded-lg text-sm">
                                    {error}
                                </div>
                            )}

                            <button
                                onClick={handleLogin}
                                disabled={loading}
                                className="btn-primary w-full flex items-center justify-center gap-2"
                            >
                                {loading ? "Logging in..." : "Login"}
                                <ArrowRight className="w-5 h-5" />
                            </button>
                        </div>
                    </div>
                )}

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
