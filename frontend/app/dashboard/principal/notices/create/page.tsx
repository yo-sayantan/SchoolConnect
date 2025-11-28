"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Navigation from "@/components/Navigation";
import { ArrowLeft, Send, Paperclip, Bell } from "lucide-react";

export default function CreateNoticePage() {
    const router = useRouter();
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [audience, setAudience] = useState("ALL");
    const [priority, setPriority] = useState("NORMAL");
    const [archiveDate, setArchiveDate] = useState("");
    const [remarks, setRemarks] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000));

        // TODO: Integrate with backend
        console.log({ title, content, audience, priority });

        setIsSubmitting(false);
        router.push("/dashboard/principal");
    };

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

                    <div className="card">
                        <div className="flex items-center gap-4 mb-8 border-b border-gray-100 pb-6">
                            <div className="p-3 bg-blue-100 rounded-xl text-blue-600">
                                <Bell className="w-8 h-8" />
                            </div>
                            <div>
                                <h1 className="text-2xl font-bold text-gray-800">Create New Notice</h1>
                                <p className="text-gray-500">Post announcements for students, teachers, and parents</p>
                            </div>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="grid md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label className="text-sm font-semibold text-gray-700">Target Audience</label>
                                    <select
                                        value={audience}
                                        onChange={(e) => setAudience(e.target.value)}
                                        className="input-field"
                                    >
                                        <option value="ALL">All School</option>
                                        <option value="TEACHERS">Teachers Only</option>
                                        <option value="STUDENTS">Students Only</option>
                                        <option value="PARENTS">Parents Only</option>
                                    </select>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-sm font-semibold text-gray-700">Priority Level</label>
                                    <select
                                        value={priority}
                                        onChange={(e) => setPriority(e.target.value)}
                                        className="input-field"
                                    >
                                        <option value="NORMAL">Normal</option>
                                        <option value="HIGH">High Priority</option>
                                        <option value="URGENT">Urgent</option>
                                    </select>
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-semibold text-gray-700">Notice Title</label>
                                <input
                                    type="text"
                                    value={title}
                                    onChange={(e) => setTitle(e.target.value)}
                                    placeholder="e.g., Annual Sports Day Announcement"
                                    className="input-field"
                                    required
                                />
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-semibold text-gray-700">Content</label>
                                <textarea
                                    value={content}
                                    onChange={(e) => setContent(e.target.value)}
                                    placeholder="Write your notice content here..."
                                    className="input-field min-h-[200px] resize-y"
                                    required
                                />
                            </div>

                            <div className="grid md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label className="text-sm font-semibold text-gray-700">Archive Date (Optional)</label>
                                    <input
                                        type="date"
                                        value={archiveDate}
                                        onChange={(e) => setArchiveDate(e.target.value)}
                                        className="input-field"
                                    />
                                    <p className="text-xs text-gray-500">Notice will be automatically archived after this date</p>
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-semibold text-gray-700">Internal Remarks (Optional)</label>
                                    <input
                                        type="text"
                                        value={remarks}
                                        onChange={(e) => setRemarks(e.target.value)}
                                        placeholder="Notes for admin staff..."
                                        className="input-field"
                                    />
                                </div>
                            </div>

                            <div className="flex items-center justify-between pt-4">
                                <button type="button" className="flex items-center gap-2 text-gray-500 hover:text-gray-700 transition-colors">
                                    <Paperclip className="w-5 h-5" />
                                    <span className="text-sm font-medium">Attach File</span>
                                </button>

                                <button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className="btn-primary flex items-center gap-2"
                                >
                                    {isSubmitting ? 'Publishing...' : 'Publish Notice'}
                                    <Send className="w-5 h-5" />
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}
