"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Navigation from "@/components/Navigation";
import { ArrowLeft, Save, User, Mail, Phone, MapPin, Calendar } from "lucide-react";

export default function EditStudentPage() {
    const router = useRouter();
    const [isSubmitting, setIsSubmitting] = useState(false);

    // Mock Student Data
    const [student, setStudent] = useState({
        firstName: "John",
        lastName: "Doe",
        email: "john.doe@student.school.edu",
        phone: "+1 234-567-8900",
        dob: "2008-05-15",
        address: "123 Main St, Springfield",
        grade: "10",
        section: "A",
        guardianName: "Robert Doe",
        guardianPhone: "+1 234-567-8999"
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000));
        console.log("Updated Student:", student);
        setIsSubmitting(false);
        router.back();
    };

    return (
        <div className="flex min-h-screen bg-gray-50">
            <Navigation role="ADMIN" />
            <div className="flex-1 p-8">
                <div className="max-w-4xl mx-auto">
                    <button
                        onClick={() => router.back()}
                        className="flex items-center text-gray-600 hover:text-gray-900 mb-6 transition-colors"
                    >
                        <ArrowLeft className="w-5 h-5 mr-2" />
                        Back to Student List
                    </button>

                    <div className="card">
                        <div className="flex items-center gap-4 mb-8 border-b border-gray-100 pb-6">
                            <div className="p-3 bg-blue-100 rounded-xl text-blue-600">
                                <User className="w-8 h-8" />
                            </div>
                            <div>
                                <h1 className="text-2xl font-bold text-gray-800">Edit Student Details</h1>
                                <p className="text-gray-500">Update personal and academic information</p>
                            </div>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-8">
                            {/* Personal Information */}
                            <div>
                                <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
                                    <User className="w-5 h-5 text-blue-500" />
                                    Personal Information
                                </h3>
                                <div className="grid md:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <label className="text-sm font-semibold text-gray-700">First Name</label>
                                        <input
                                            type="text"
                                            value={student.firstName}
                                            onChange={(e) => setStudent({ ...student, firstName: e.target.value })}
                                            className="input-field"
                                            required
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm font-semibold text-gray-700">Last Name</label>
                                        <input
                                            type="text"
                                            value={student.lastName}
                                            onChange={(e) => setStudent({ ...student, lastName: e.target.value })}
                                            className="input-field"
                                            required
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm font-semibold text-gray-700">Date of Birth</label>
                                        <div className="relative">
                                            <Calendar className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                                            <input
                                                type="date"
                                                value={student.dob}
                                                onChange={(e) => setStudent({ ...student, dob: e.target.value })}
                                                className="input-field pl-12"
                                                required
                                            />
                                        </div>
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm font-semibold text-gray-700">Gender</label>
                                        <select className="input-field">
                                            <option>Male</option>
                                            <option>Female</option>
                                            <option>Other</option>
                                        </select>
                                    </div>
                                </div>
                            </div>

                            {/* Contact Information */}
                            <div>
                                <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
                                    <Mail className="w-5 h-5 text-purple-500" />
                                    Contact Information
                                </h3>
                                <div className="grid md:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <label className="text-sm font-semibold text-gray-700">Email Address</label>
                                        <input
                                            type="email"
                                            value={student.email}
                                            onChange={(e) => setStudent({ ...student, email: e.target.value })}
                                            className="input-field"
                                            required
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm font-semibold text-gray-700">Phone Number</label>
                                        <input
                                            type="tel"
                                            value={student.phone}
                                            onChange={(e) => setStudent({ ...student, phone: e.target.value })}
                                            className="input-field"
                                            required
                                        />
                                    </div>
                                    <div className="md:col-span-2 space-y-2">
                                        <label className="text-sm font-semibold text-gray-700">Address</label>
                                        <div className="relative">
                                            <MapPin className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                                            <input
                                                type="text"
                                                value={student.address}
                                                onChange={(e) => setStudent({ ...student, address: e.target.value })}
                                                className="input-field pl-12"
                                                required
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Academic Details */}
                            <div>
                                <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
                                    <User className="w-5 h-5 text-green-500" />
                                    Academic Details
                                </h3>
                                <div className="grid md:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <label className="text-sm font-semibold text-gray-700">Grade</label>
                                        <select
                                            value={student.grade}
                                            onChange={(e) => setStudent({ ...student, grade: e.target.value })}
                                            className="input-field"
                                        >
                                            <option value="9">Grade 9</option>
                                            <option value="10">Grade 10</option>
                                            <option value="11">Grade 11</option>
                                            <option value="12">Grade 12</option>
                                        </select>
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm font-semibold text-gray-700">Section</label>
                                        <input
                                            type="text"
                                            value={student.section}
                                            onChange={(e) => setStudent({ ...student, section: e.target.value })}
                                            className="input-field"
                                            required
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="flex justify-end pt-6 border-t border-gray-100">
                                <button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className="btn-primary flex items-center gap-2"
                                >
                                    {isSubmitting ? 'Saving...' : 'Save Changes'}
                                    <Save className="w-5 h-5" />
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}
