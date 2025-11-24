"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Navigation from "@/components/Navigation";
import { Clock, MapPin, Video } from "lucide-react";

export default function TimetablePage() {
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

    const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];

    const schedule = {
        Monday: [
            { time: "9:00 AM", subject: "Mathematics", teacher: "Mr. Smith", room: "Room 101", emoji: "🔢", color: "blue" },
            { time: "10:30 AM", subject: "Science", teacher: "Ms. Johnson", room: "Lab 1", emoji: "🔬", color: "green" },
            { time: "12:00 PM", subject: "Lunch Break", teacher: "", room: "Cafeteria", emoji: "🍽️", color: "yellow" },
            { time: "1:00 PM", subject: "English", teacher: "Mrs. Davis", room: "Room 203", emoji: "📖", color: "purple" },
            { time: "2:30 PM", subject: "Physical Education", teacher: "Coach Brown", room: "Gym", emoji: "⚽", color: "orange" }
        ],
        Tuesday: [
            { time: "9:00 AM", subject: "History", teacher: "Mr. Wilson", room: "Room 105", emoji: "📜", color: "brown" },
            { time: "10:30 AM", subject: "Mathematics", teacher: "Mr. Smith", room: "Room 101", emoji: "🔢", color: "blue" },
            { time: "12:00 PM", subject: "Lunch Break", teacher: "", room: "Cafeteria", emoji: "🍽️", color: "yellow" },
            { time: "1:00 PM", subject: "Art", teacher: "Ms. Garcia", room: "Art Room", emoji: "🎨", color: "pink" },
            { time: "2:30 PM", subject: "Music", teacher: "Mr. Lee", room: "Music Room", emoji: "🎵", color: "indigo" }
        ],
        Wednesday: [
            { time: "9:00 AM", subject: "Science", teacher: "Ms. Johnson", room: "Lab 1", emoji: "🔬", color: "green" },
            { time: "10:30 AM", subject: "English", teacher: "Mrs. Davis", room: "Room 203", emoji: "📖", color: "purple" },
            { time: "12:00 PM", subject: "Lunch Break", teacher: "", room: "Cafeteria", emoji: "🍽️", color: "yellow" },
            { time: "1:00 PM", subject: "Mathematics", teacher: "Mr. Smith", room: "Room 101", emoji: "🔢", color: "blue" },
            { time: "2:30 PM", subject: "Computer Science", teacher: "Ms. Taylor", room: "Computer Lab", emoji: "💻", color: "teal" }
        ],
        Thursday: [
            { time: "9:00 AM", subject: "Geography", teacher: "Mr. Anderson", room: "Room 107", emoji: "🌍", color: "cyan" },
            { time: "10:30 AM", subject: "Mathematics", teacher: "Mr. Smith", room: "Room 101", emoji: "🔢", color: "blue" },
            { time: "12:00 PM", subject: "Lunch Break", teacher: "", room: "Cafeteria", emoji: "🍽️", color: "yellow" },
            { time: "1:00 PM", subject: "Science", teacher: "Ms. Johnson", room: "Lab 1", emoji: "🔬", color: "green" },
            { time: "2:30 PM", subject: "Library Period", teacher: "", room: "Library", emoji: "📚", color: "gray" }
        ],
        Friday: [
            { time: "9:00 AM", subject: "English", teacher: "Mrs. Davis", room: "Room 203", emoji: "📖", color: "purple" },
            { time: "10:30 AM", subject: "Social Studies", teacher: "Mr. Martinez", room: "Room 109", emoji: "👥", color: "red" },
            { time: "12:00 PM", subject: "Lunch Break", teacher: "", room: "Cafeteria", emoji: "🍽️", color: "yellow" },
            { time: "1:00 PM", subject: "Science Lab", teacher: "Ms. Johnson", room: "Lab 1", emoji: "🧪", color: "green" },
            { time: "2:30 PM", subject: "Club Activities", teacher: "", room: "Various", emoji: "🎭", color: "pink" }
        ]
    };

    const [selectedDay, setSelectedDay] = useState("Monday");

    if (!role) return null;

    return (
        <div className="flex min-h-screen">
            <Navigation role={role} />

            <div className="flex-1 p-6 lg:p-8 bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
                <div className="max-w-6xl mx-auto space-y-6">
                    {/* Header */}
                    <div className="text-center mb-8">
                        <h1 className="text-4xl md:text-5xl font-bold text-gradient mb-2">
                            My Timetable 📅
                        </h1>
                        <p className="text-gray-600 dark:text-gray-400 text-lg">
                            Your weekly class schedule at a glance!
                        </p>
                    </div>

                    {/* Day Selector */}
                    <div className="flex gap-2 overflow-x-auto pb-2">
                        {days.map((day) => (
                            <button
                                key={day}
                                onClick={() => setSelectedDay(day)}
                                className={`px-6 py-3 rounded-xl font-bold whitespace-nowrap transition-all ${selectedDay === day
                                    ? "bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg scale-105"
                                    : "bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:shadow-md"
                                    }`}
                            >
                                {day}
                            </button>
                        ))}
                    </div>

                    {/* Schedule for Selected Day */}
                    <div className="space-y-4">
                        {schedule[selectedDay as keyof typeof schedule].map((period, index) => (
                            <div
                                key={index}
                                className={`card-hover ${period.subject === "Lunch Break" ? "bg-yellow-50 dark:bg-yellow-900/20" : ""
                                    }`}
                            >
                                <div className="flex items-center gap-4">
                                    {/* Time & Emoji */}
                                    <div className="text-center">
                                        <div className="text-4xl mb-2">{period.emoji}</div>
                                        <div className="flex items-center gap-1 text-sm font-semibold text-gray-600">
                                            <Clock className="w-4 h-4" />
                                            {period.time}
                                        </div>
                                    </div>

                                    {/* Divider */}
                                    <div className="w-1 h-16 bg-gradient-to-b from-blue-500 to-purple-600 rounded-full" />

                                    {/* Details */}
                                    <div className="flex-1">
                                        <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-1">
                                            {period.subject}
                                        </h3>
                                        {period.teacher && (
                                            <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                                                👨‍🏫 {period.teacher}
                                            </p>
                                        )}
                                        <div className="flex items-center gap-2 text-sm text-gray-600">
                                            <MapPin className="w-4 h-4" />
                                            <span>{period.room}</span>
                                        </div>
                                    </div>

                                    {/* Join Button for online classes */}
                                    {period.subject !== "Lunch Break" && period.subject !== "Club Activities" && (
                                        <button className="px-4 py-2 bg-gradient-to-r from-green-500 to-teal-600 text-white rounded-lg font-semibold hover:shadow-lg transition-all flex items-center gap-2">
                                            <Video className="w-4 h-4" />
                                            Join Online
                                        </button>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Quick Info */}
                    <div className="card bg-gradient-to-r from-blue-100 to-purple-100 dark:from-blue-900/20 dark:to-purple-900/20">
                        <div className="flex items-center gap-3">
                            <div className="text-3xl">💡</div>
                            <div>
                                <h3 className="font-bold text-gray-800 dark:text-white mb-1">Quick Tip!</h3>
                                <p className="text-sm text-gray-600 dark:text-gray-400">
                                    Click "Join Online" to attend virtual classes. Make sure you're ready 5 minutes before class starts!
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Floating decoration */}
                <div className="fixed bottom-10 right-10 text-6xl animate-bounce-slow opacity-20 pointer-events-none">
                    📅
                </div>
            </div>
        </div>
    );
}
