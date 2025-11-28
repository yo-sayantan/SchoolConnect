"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Navigation from "@/components/Navigation";
import { ArrowLeft, User, Bell, Lock, Globe, Moon, Save } from "lucide-react";

export default function SettingsPage() {
    const router = useRouter();
    const [notifications, setNotifications] = useState(true);
    const [darkMode, setDarkMode] = useState(false);
    const [language, setLanguage] = useState("English");

    return (
        <div className="flex min-h-screen bg-gray-50">
            <Navigation role="PRINCIPAL" />
            <div className="flex-1 p-8">
                <div className="max-w-4xl mx-auto">
                    <button
                        onClick={() => router.back()}
                        className="flex items-center text-gray-600 hover:text-gray-900 mb-6 transition-colors"
                    >
                        <ArrowLeft className="w-5 h-5 mr-2" />
                        Back to Dashboard
                    </button>

                    <div className="flex items-center justify-between mb-8">
                        <div>
                            <h1 className="text-3xl font-bold text-gray-800">Settings</h1>
                            <p className="text-gray-500">Manage your account and application preferences</p>
                        </div>
                        <button className="btn-primary flex items-center gap-2">
                            <Save className="w-5 h-5" />
                            Save Changes
                        </button>
                    </div>

                    <div className="space-y-6">
                        {/* Profile Settings */}
                        <div className="card">
                            <div className="flex items-center gap-3 mb-6">
                                <User className="w-6 h-6 text-blue-600" />
                                <h2 className="text-xl font-bold text-gray-800">Profile Settings</h2>
                            </div>
                            <div className="grid md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label className="text-sm font-semibold text-gray-700">Full Name</label>
                                    <input type="text" defaultValue="Principal Anderson" className="input-field" />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-semibold text-gray-700">Email Address</label>
                                    <input type="email" defaultValue="principal@school.edu" className="input-field" />
                                </div>
                            </div>
                        </div>

                        {/* App Preferences */}
                        <div className="card">
                            <div className="flex items-center gap-3 mb-6">
                                <Globe className="w-6 h-6 text-purple-600" />
                                <h2 className="text-xl font-bold text-gray-800">App Preferences</h2>
                            </div>
                            <div className="space-y-6">
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-3">
                                        <div className="p-2 bg-blue-100 rounded-lg text-blue-600">
                                            <Bell className="w-5 h-5" />
                                        </div>
                                        <div>
                                            <p className="font-bold text-gray-800">Push Notifications</p>
                                            <p className="text-sm text-gray-500">Receive alerts for important updates</p>
                                        </div>
                                    </div>
                                    <label className="relative inline-flex items-center cursor-pointer">
                                        <input
                                            type="checkbox"
                                            checked={notifications}
                                            onChange={(e) => setNotifications(e.target.checked)}
                                            className="sr-only peer"
                                        />
                                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                                    </label>
                                </div>

                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-3">
                                        <div className="p-2 bg-purple-100 rounded-lg text-purple-600">
                                            <Moon className="w-5 h-5" />
                                        </div>
                                        <div>
                                            <p className="font-bold text-gray-800">Dark Mode</p>
                                            <p className="text-sm text-gray-500">Switch to dark theme interface</p>
                                        </div>
                                    </div>
                                    <label className="relative inline-flex items-center cursor-pointer">
                                        <input
                                            type="checkbox"
                                            checked={darkMode}
                                            onChange={(e) => setDarkMode(e.target.checked)}
                                            className="sr-only peer"
                                        />
                                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-purple-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-600"></div>
                                    </label>
                                </div>
                            </div>
                        </div>

                        {/* Security */}
                        <div className="card">
                            <div className="flex items-center gap-3 mb-6">
                                <Lock className="w-6 h-6 text-red-600" />
                                <h2 className="text-xl font-bold text-gray-800">Security</h2>
                            </div>
                            <button className="w-full py-3 border-2 border-red-100 text-red-600 rounded-xl font-bold hover:bg-red-50 transition-colors">
                                Change Password
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
