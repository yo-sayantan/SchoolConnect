"use client";

import { useState, useEffect } from "react";
import { scoreboardService } from "@/services/api";

interface SubjectHighScore {
    id: number;
    subjectId: number;
    studentId: number;
    studentName: string;
    highestMarks: number;
    totalMarks: number;
    percentage: number;
    examType: string;
    term: string;
    examName: string;
    achievedDate: string;
}

interface PerfectScore {
    studentId: number;
    examType: string;
    term: string;
    examName: string;
    examDate: string;
    marksObtained: number;
    totalMarks: number;
}

export default function Scoreboard() {
    const [loading, setLoading] = useState(true);
    const [highScores, setHighScores] = useState<SubjectHighScore[]>([]);
    const [perfectScores, setPerfectScores] = useState<Record<number, PerfectScore[]>>({});
    const [selectedTab, setSelectedTab] = useState<"high-scores" | "perfect-scores">("high-scores");

    // Mock subject names - in production, fetch from API
    const subjectNames: Record<number, string> = {
        1: "Mathematics",
        2: "Science",
        3: "English",
        4: "History",
        5: "Geography"
    };

    useEffect(() => {
        loadScoreboardData();
    }, []);

    const loadScoreboardData = async () => {
        setLoading(true);
        try {
            const [highScoresData, perfectScoresData] = await Promise.all([
                scoreboardService.getAllHighScores(),
                scoreboardService.getPerfectScores()
            ]);

            setHighScores(Array.isArray(highScoresData) ? highScoresData : []);
            setPerfectScores(perfectScoresData || {});
        } catch (error) {
            console.error("Failed to load scoreboard data:", error);
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-yellow-50 to-orange-100">
                <div className="text-center">
                    <div className="inline-block animate-spin rounded-full h-16 w-16 border-b-4 border-yellow-600 mb-4"></div>
                    <p className="text-xl text-gray-700">Loading Scoreboard...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-yellow-50 to-orange-100 py-8 px-4">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="text-center mb-8">
                    <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full mb-4 shadow-lg">
                        <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                        </svg>
                    </div>
                    <h1 className="text-4xl font-bold text-gray-800 mb-2">🏆 School Scoreboard 🏆</h1>
                    <p className="text-gray-600 text-lg">Celebrating Excellence and Achievement</p>
                </div>

                {/* Tabs */}
                <div className="flex justify-center gap-4 mb-8">
                    <button
                        onClick={() => setSelectedTab("high-scores")}
                        className={`px-8 py-3 rounded-lg font-semibold transition-all transform hover:scale-105 ${selectedTab === "high-scores"
                                ? "bg-gradient-to-r from-yellow-400 to-orange-500 text-white shadow-lg"
                                : "bg-white text-gray-700 hover:bg-gray-50"
                            }`}
                    >
                        🥇 All-Time High Scores
                    </button>
                    <button
                        onClick={() => setSelectedTab("perfect-scores")}
                        className={`px-8 py-3 rounded-lg font-semibold transition-all transform hover:scale-105 ${selectedTab === "perfect-scores"
                                ? "bg-gradient-to-r from-yellow-400 to-orange-500 text-white shadow-lg"
                                : "bg-white text-gray-700 hover:bg-gray-50"
                            }`}
                    >
                        ⭐ Perfect Scores (100%)
                    </button>
                </div>

                {/* Content */}
                {selectedTab === "high-scores" ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {highScores.length === 0 ? (
                            <div className="col-span-full text-center py-12">
                                <p className="text-gray-500 text-lg">No high scores recorded yet</p>
                            </div>
                        ) : (
                            highScores.map((score, index) => (
                                <div
                                    key={score.id}
                                    className="bg-white rounded-2xl shadow-xl p-6 transform hover:scale-105 transition-all border-4 border-yellow-400"
                                >
                                    <div className="flex items-start justify-between mb-4">
                                        <div>
                                            <h3 className="text-2xl font-bold text-gray-800">
                                                {subjectNames[score.subjectId] || `Subject ${score.subjectId}`}
                                            </h3>
                                            <p className="text-sm text-gray-500">{score.examName || score.examType}</p>
                                        </div>
                                        <div className="text-4xl">
                                            {index === 0 ? "🥇" : index === 1 ? "🥈" : index === 2 ? "🥉" : "🏆"}
                                        </div>
                                    </div>

                                    <div className="bg-gradient-to-r from-yellow-100 to-orange-100 rounded-lg p-4 mb-4">
                                        <div className="text-center">
                                            <p className="text-5xl font-bold text-orange-600">{score.percentage.toFixed(2)}%</p>
                                            <p className="text-sm text-gray-600 mt-1">
                                                {score.highestMarks} / {score.totalMarks} marks
                                            </p>
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        <div className="flex items-center gap-2">
                                            <span className="text-2xl">👤</span>
                                            <div>
                                                <p className="text-sm text-gray-500">Record Holder</p>
                                                <p className="font-semibold text-gray-800">
                                                    {score.studentName || `Student #${score.studentId}`}
                                                </p>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <span className="text-2xl">📅</span>
                                            <div>
                                                <p className="text-sm text-gray-500">Achieved On</p>
                                                <p className="font-semibold text-gray-800">
                                                    {score.achievedDate ? new Date(score.achievedDate).toLocaleDateString() : "N/A"}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                ) : (
                    <div className="space-y-8">
                        {Object.keys(perfectScores).length === 0 ? (
                            <div className="text-center py-12 bg-white rounded-2xl shadow-lg">
                                <p className="text-gray-500 text-lg">No perfect scores recorded yet</p>
                            </div>
                        ) : (
                            Object.entries(perfectScores).map(([subjectId, scores]) => (
                                <div key={subjectId} className="bg-white rounded-2xl shadow-xl p-6">
                                    <h3 className="text-2xl font-bold text-gray-800 mb-4 flex items-center gap-3">
                                        <span className="text-3xl">⭐</span>
                                        {subjectNames[parseInt(subjectId)] || `Subject ${subjectId}`}
                                        <span className="ml-auto bg-yellow-400 text-yellow-900 px-3 py-1 rounded-full text-sm font-semibold">
                                            {scores.length} Perfect Score{scores.length !== 1 ? "s" : ""}
                                        </span>
                                    </h3>

                                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                        {scores.map((score, index) => (
                                            <div
                                                key={index}
                                                className="bg-gradient-to-br from-yellow-50 to-orange-50 rounded-lg p-4 border-2 border-yellow-300"
                                            >
                                                <div className="flex items-center justify-between mb-2">
                                                    <p className="font-bold text-gray-800">Student #{score.studentId}</p>
                                                    <span className="text-2xl">💯</span>
                                                </div>
                                                <div className="space-y-1 text-sm">
                                                    <p className="text-gray-600">
                                                        <span className="font-semibold">Exam:</span> {score.examName || score.examType}
                                                    </p>
                                                    <p className="text-gray-600">
                                                        <span className="font-semibold">Term:</span> {score.term}
                                                    </p>
                                                    <p className="text-gray-600">
                                                        <span className="font-semibold">Date:</span>{" "}
                                                        {score.examDate ? new Date(score.examDate).toLocaleDateString() : "N/A"}
                                                    </p>
                                                    <p className="text-orange-600 font-bold">
                                                        {score.marksObtained} / {score.totalMarks} marks
                                                    </p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                )}

                {/* Motivational Footer */}
                <div className="mt-12 text-center bg-white rounded-2xl shadow-lg p-8">
                    <p className="text-2xl font-bold text-gray-800 mb-2">
                        "Excellence is not a destination; it is a continuous journey that never ends."
                    </p>
                    <p className="text-gray-600">Keep striving for greatness! 🌟</p>
                </div>
            </div>
        </div>
    );
}
