"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { fetchWithAuth } from "@/utils/api";
import { ArrowLeft, Bell, Send } from "lucide-react";

export default function CreateNoticePage() {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        title: "",
        content: "",
        targetAudience: "ALL", // STUDENT, TEACHER, PARENT, ALL
        priority: "NORMAL", // NORMAL, URGENT
        remarks: "",
        archiveDate: ""
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            await fetchWithAuth("/communication/notices", {
                method: "POST",
                body: JSON.stringify({
                    ...formData,
                    active: true,
                    postedDate: new Date().toISOString().split('T')[0]
                })
            });
            alert("Notice created successfully!");
            router.push("/dashboard/admin_assistant");
        } catch (error) {
            console.error("Failed to create notice", error);
            alert("Failed to create notice");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 p-6">
            <div className="max-w-3xl mx-auto space-y-8">
                <div className="flex items-center gap-4">
                    <button onClick={() => router.back()} className="p-2 hover:bg-gray-200 rounded-full">
                        <ArrowLeft className="w-6 h-6 text-gray-600" />
                    </button>
                    <h1 className="text-3xl font-bold text-gray-800">Create New Notice</h1>
                </div>

                <div className="card bg-white shadow-lg rounded-xl p-6">
                    <div className="mb-6 p-4 bg-blue-50 border-l-4 border-blue-500 rounded-r-lg">
                        <h3 className="font-bold text-blue-800">Headmaster's Desk</h3>
                        <p className="text-sm text-blue-600">Notices published here will be visible to the selected audience immediately.</p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
                            <input
                                type="text"
                                required
                                className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                                value={formData.title}
                                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                placeholder="e.g., Annual Sports Day"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Content</label>
                            <textarea
                                required
                                rows={6}
                                className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                                value={formData.content}
                                onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                                placeholder="Write the notice content here..."
                            />
                        </div>

                        <div className="grid md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Target Audience</label>
                                <select
                                    className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                                    value={formData.targetAudience}
                                    onChange={(e) => setFormData({ ...formData, targetAudience: e.target.value })}
                                >
                                    <option value="ALL">All Users</option>
                                    <option value="STUDENT">Students Only</option>
                                    <option value="TEACHER">Teachers Only</option>
                                    <option value="PARENT">Parents Only</option>
                                    <option value="PARENTS_AND_TEACHERS">Parents & Teachers</option>
                                </select>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Priority</label>
                                <select
                                    className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                                    value={formData.priority}
                                    onChange={(e) => setFormData({ ...formData, priority: e.target.value })}
                                >
                                    <option value="NORMAL">Normal</option>
                                    <option value="URGENT">Urgent</option>
                                </select>
                            </div>
                        </div>

                        <div className="grid md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Archive Date</label>
                                <input
                                    type="date"
                                    className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                                    value={formData.archiveDate}
                                    onChange={(e) => setFormData({ ...formData, archiveDate: e.target.value })}
                                />
                                <p className="text-xs text-gray-500 mt-1">Notice will be moved to archive after this date.</p>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Remarks (Internal)</label>
                                <input
                                    type="text"
                                    className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                                    value={formData.remarks}
                                    onChange={(e) => setFormData({ ...formData, remarks: e.target.value })}
                                    placeholder="Optional internal notes"
                                />
                            </div>
                        </div>

                        <div className="pt-4">
                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 rounded-lg font-bold hover:shadow-lg transition-all flex items-center justify-center gap-2"
                            >
                                {loading ? (
                                    <span>Publishing...</span>
                                ) : (
                                    <>
                                        <Send className="w-5 h-5" />
                                        Publish Notice
                                    </>
                                )}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}
