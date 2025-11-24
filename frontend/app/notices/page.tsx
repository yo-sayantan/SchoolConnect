"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Navigation from "@/components/Navigation";
import { Bell, Calendar, Users, AlertCircle } from "lucide-react";

export default function NoticesPage() {
    const router = useRouter();
    const [role, setRole] = useState("");

    useEffect(() => {
        const userRole = localStorage.getItem("role");
        if (!userRole) {
            router.push("/login");
            return;
        }
        setRole(userRole);
    }, [router]);

    const notices = [
        {
            title: "🏃 Sports Day Next Week!",
            content: "Get ready for our annual Sports Day on December 2nd! All students are encouraged to participate in various events. Registration forms available at the office.",
            date: "2 hours ago",
            category: "Event",
            priority: "high",
            color: "red",
            emoji: "🏃"
        },
        {
            title: "📚 Library Books Due",
            content: "Reminder: All library books borrowed last month are due by November 30th. Please return them to avoid late fees.",
            date: "5 hours ago",
            category: "Reminder",
            priority: "medium",
            color: "orange",
            emoji: "📚"
        },
        {
            title: "🎭 Drama Club Auditions",
            content: "Auditions for the winter play will be held next Monday after school. All interested students welcome!",
            date: "1 day ago",
            category: "Activity",
            priority: "medium",
            color: "purple",
            emoji: "🎭"
        },
        {
            title: "👨‍👩‍👧 Parent-Teacher Meeting",
            content: "The next parent-teacher meeting is scheduled for November 28th at 3:00 PM. Please mark your calendars!",
            date: "2 days ago",
            category: "Meeting",
            priority: "high",
            color: "blue",
            emoji: "👨‍👩‍👧"
        },
        {
            title: "🎨 Art Exhibition",
            content: "Student artwork will be displayed in the main hall from December 5-10. Come see the amazing creations!",
            date: "3 days ago",
            category: "Event",
            priority: "low",
            color: "pink",
            emoji: "🎨"
        },
        {
            title: "🍎 Healthy Lunch Week",
            content: "Next week is Healthy Lunch Week! The cafeteria will feature special nutritious meals. Try something new!",
            date: "4 days ago",
            category: "General",
            priority: "low",
            color: "green",
            emoji: "🍎"
        },
        {
            title: "💻 Computer Lab Maintenance",
            content: "The computer lab will be closed for maintenance on November 27th. Please plan your work accordingly.",
            date: "5 days ago",
            category: "Announcement",
            priority: "medium",
            color: "gray",
            emoji: "💻"
        }
    ];

    const categories = ["All", "Event", "Reminder", "Activity", "Meeting", "General", "Announcement"];
    const [selectedCategory, setSelectedCategory] = useState("All");

    const filteredNotices = selectedCategory === "All"
        ? notices
        : notices.filter(n => n.category === selectedCategory);

    if (!role) return null;

    return (
        <div className="flex min-h-screen">
            <Navigation role={role} />

            <div className="flex-1 p-6 lg:p-8 bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
                <div className="max-w-6xl mx-auto space-y-6">
                    {/* Header */}
                    <div className="text-center mb-8">
                        <h1 className="text-4xl md:text-5xl font-bold text-gradient mb-2">
                            Notice Board 📢
                        </h1>
                        <p className="text-gray-600 dark:text-gray-400 text-lg">
                            Stay updated with school announcements!
                        </p>
                    </div>

                    {/* Category Filter */}
                    <div className="flex gap-2 overflow-x-auto pb-2">
                        {categories.map((category) => (
                            <button
                                key={category}
                                onClick={() => setSelectedCategory(category)}
                                className={`px-4 py-2 rounded-full font-semibold whitespace-nowrap transition-all ${selectedCategory === category
                                    ? "bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg scale-105"
                                    : "bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:shadow-md"
                                    }`}
                            >
                                {category}
                            </button>
                        ))}
                    </div>

                    {/* Notices Grid */}
                    <div className="grid md:grid-cols-2 gap-4">
                        {filteredNotices.map((notice, index) => (
                            <div
                                key={index}
                                className={`card-hover bg-gradient-to-br from-${notice.color}-50 to-${notice.color}-100 dark:from-${notice.color}-900/20 dark:to-${notice.color}-800/20 border-2 border-${notice.color}-200 dark:border-${notice.color}-700`}
                            >
                                {/* Priority Badge */}
                                {notice.priority === "high" && (
                                    <div className="flex items-center gap-2 mb-3">
                                        <AlertCircle className="w-5 h-5 text-red-500" />
                                        <span className="text-xs font-bold text-red-600 uppercase">Important</span>
                                    </div>
                                )}

                                {/* Title */}
                                <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-2">
                                    {notice.title}
                                </h3>

                                {/* Content */}
                                <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                                    {notice.content}
                                </p>

                                {/* Footer */}
                                <div className="flex items-center justify-between text-xs text-gray-500">
                                    <div className="flex items-center gap-2">
                                        <Calendar className="w-4 h-4" />
                                        <span>{notice.date}</span>
                                    </div>
                                    <span className={`px-3 py-1 rounded-full bg-${notice.color}-200 dark:bg-${notice.color}-800 text-${notice.color}-800 dark:text-${notice.color}-200 font-semibold`}>
                                        {notice.category}
                                    </span>
                                </div>
                            </div>
                        ))}
                    </div>

                    {filteredNotices.length === 0 && (
                        <div className="card text-center py-12">
                            <div className="text-6xl mb-4">📭</div>
                            <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-2">
                                No notices in this category
                            </h3>
                            <p className="text-gray-600 dark:text-gray-400">
                                Check back later for updates!
                            </p>
                        </div>
                    )}
                </div>

                {/* Floating decoration */}
                <div className="fixed bottom-10 right-10 text-6xl animate-bounce-slow opacity-20 pointer-events-none">
                    📢
                </div>
            </div>
        </div>
    );
}
