"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Navigation from "@/components/Navigation";
import { ArrowLeft, Users, Search, MoreVertical, Plus, Mail, Phone } from "lucide-react";

export default function ManageStaffPage() {
    const router = useRouter();
    const [searchTerm, setSearchTerm] = useState("");

    // Mock Staff Data
    const staff = [
        { id: 1, name: "Sarah Wilson", role: "Math Teacher", email: "sarah.w@school.edu", phone: "+1 234-567-8901", status: "Active" },
        { id: 2, name: "James Miller", role: "Science Teacher", email: "james.m@school.edu", phone: "+1 234-567-8902", status: "Active" },
        { id: 3, name: "Emily Davis", role: "English Teacher", email: "emily.d@school.edu", phone: "+1 234-567-8903", status: "On Leave" },
        { id: 4, name: "Michael Brown", role: "Sports Coach", email: "michael.b@school.edu", phone: "+1 234-567-8904", status: "Active" },
    ];

    return (
        <div className="flex min-h-screen bg-gray-50">
            <Navigation role="PRINCIPAL" />
            <div className="flex-1 p-8">
                <div className="max-w-6xl mx-auto">
                    <button
                        onClick={() => router.back()}
                        className="flex items-center text-gray-600 hover:text-gray-900 mb-6 transition-colors"
                    >
                        <ArrowLeft className="w-5 h-5 mr-2" />
                        Back to Dashboard
                    </button>

                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
                        <div>
                            <h1 className="text-3xl font-bold text-gray-800">Manage Staff</h1>
                            <p className="text-gray-500">View and manage teaching and non-teaching staff</p>
                        </div>
                        <button className="btn-primary flex items-center gap-2">
                            <Plus className="w-5 h-5" />
                            Add New Staff
                        </button>
                    </div>

                    <div className="card">
                        {/* Search and Filter */}
                        <div className="flex items-center gap-4 mb-6">
                            <div className="relative flex-1">
                                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                                <input
                                    type="text"
                                    placeholder="Search staff by name or role..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    className="input-field pl-12"
                                />
                            </div>
                            <select className="input-field w-48">
                                <option value="ALL">All Roles</option>
                                <option value="TEACHER">Teachers</option>
                                <option value="ADMIN">Admin Staff</option>
                                <option value="SUPPORT">Support Staff</option>
                            </select>
                        </div>

                        {/* Staff List */}
                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead>
                                    <tr className="border-b border-gray-100 text-left">
                                        <th className="pb-4 pl-4 font-semibold text-gray-600">Name</th>
                                        <th className="pb-4 font-semibold text-gray-600">Role</th>
                                        <th className="pb-4 font-semibold text-gray-600">Contact</th>
                                        <th className="pb-4 font-semibold text-gray-600">Status</th>
                                        <th className="pb-4 pr-4 font-semibold text-gray-600 text-right">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-50">
                                    {staff.map((member) => (
                                        <tr key={member.id} className="hover:bg-gray-50/50 transition-colors">
                                            <td className="py-4 pl-4">
                                                <div className="flex items-center gap-3">
                                                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center text-white font-bold">
                                                        {member.name.charAt(0)}
                                                    </div>
                                                    <span className="font-medium text-gray-800">{member.name}</span>
                                                </div>
                                            </td>
                                            <td className="py-4 text-gray-600">{member.role}</td>
                                            <td className="py-4">
                                                <div className="flex flex-col text-sm text-gray-500">
                                                    <div className="flex items-center gap-1">
                                                        <Mail className="w-3 h-3" />
                                                        {member.email}
                                                    </div>
                                                    <div className="flex items-center gap-1">
                                                        <Phone className="w-3 h-3" />
                                                        {member.phone}
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="py-4">
                                                <span className={`badge ${member.status === 'Active' ? 'badge-success' : 'badge-warning'}`}>
                                                    {member.status}
                                                </span>
                                            </td>
                                            <td className="py-4 pr-4 text-right">
                                                <button className="p-2 hover:bg-gray-100 rounded-full text-gray-400 hover:text-gray-600 transition-colors">
                                                    <MoreVertical className="w-5 h-5" />
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
