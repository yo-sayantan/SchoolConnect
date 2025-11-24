"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { registrationService } from "@/services/api";

export default function ParentRegistration() {
    const router = useRouter();
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phoneNumber: "",
        password: "",
        confirmPassword: "",
        address: "",
        emergencyContact: "",
        linkedStudentIds: ""
    });
    const [idCardFront, setIdCardFront] = useState<File | null>(null);
    const [idCardBack, setIdCardBack] = useState<File | null>(null);
    const [uploading, setUploading] = useState(false);
    const [submitting, setSubmitting] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, type: "front" | "back") => {
        const file = e.target.files?.[0];
        if (file) {
            if (type === "front") setIdCardFront(file);
            else setIdCardBack(file);
        }
    };

    const uploadFile = async (file: File) => {
        const result = await registrationService.uploadIdCard(file);
        if (result.error) throw new Error(result.error);
        return result.fileUrl;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");

        // Validation
        if (formData.password !== formData.confirmPassword) {
            setError("Passwords do not match");
            return;
        }

        if (!idCardFront || !idCardBack) {
            setError("Please upload both front and back of your ID card");
            return;
        }

        if (!formData.linkedStudentIds.trim()) {
            setError("Please enter at least one student ID");
            return;
        }

        try {
            setUploading(true);

            // Upload ID cards
            const frontUrl = await uploadFile(idCardFront);
            const backUrl = await uploadFile(idCardBack);

            setUploading(false);
            setSubmitting(true);

            // Submit registration
            const registrationData = {
                ...formData,
                role: "PARENT",
                idCardFrontUrl: frontUrl,
                idCardBackUrl: backUrl
            };

            const result = await registrationService.submitRegistration(registrationData);

            if (result.error) {
                setError(result.error);
            } else {
                setSuccess(true);
                setTimeout(() => router.push("/login"), 3000);
            }
        } catch (err: any) {
            setError(err.message || "Failed to submit registration");
        } finally {
            setUploading(false);
            setSubmitting(false);
        }
    };

    if (success) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-50 to-pink-100 p-4">
                <div className="bg-white rounded-2xl shadow-xl p-8 max-w-md w-full text-center">
                    <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                    </div>
                    <h2 className="text-2xl font-bold text-gray-800 mb-2">Registration Submitted!</h2>
                    <p className="text-gray-600 mb-4">
                        Your registration request has been submitted successfully.
                        You will receive an email once your account is approved by the administration.
                    </p>
                    <p className="text-sm text-gray-500">Redirecting to login...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-100 py-12 px-4">
            <div className="max-w-2xl mx-auto">
                <div className="bg-white rounded-2xl shadow-xl p-8">
                    <h1 className="text-3xl font-bold text-gray-800 mb-2">Parent Registration</h1>
                    <p className="text-gray-600 mb-6">
                        Register as a parent by linking your child's student ID. Your application will be reviewed by the administration.
                    </p>

                    {error && (
                        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6">
                            {error}
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-6">
                        {/* Personal Information */}
                        <div>
                            <h3 className="text-lg font-semibold text-gray-700 mb-4">Personal Information</h3>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Full Name *</label>
                                <input
                                    type="text"
                                    name="name"
                                    required
                                    value={formData.name}
                                    onChange={handleChange}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                                />
                            </div>
                        </div>

                        {/* Contact Information */}
                        <div>
                            <h3 className="text-lg font-semibold text-gray-700 mb-4">Contact Information</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Email *</label>
                                    <input
                                        type="email"
                                        name="email"
                                        required
                                        value={formData.email}
                                        onChange={handleChange}
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number *</label>
                                    <input
                                        type="tel"
                                        name="phoneNumber"
                                        required
                                        value={formData.phoneNumber}
                                        onChange={handleChange}
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                                    />
                                </div>
                            </div>
                            <div className="mt-4">
                                <label className="block text-sm font-medium text-gray-700 mb-2">Address *</label>
                                <textarea
                                    name="address"
                                    required
                                    value={formData.address}
                                    onChange={handleChange}
                                    rows={3}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                                />
                            </div>
                            <div className="mt-4">
                                <label className="block text-sm font-medium text-gray-700 mb-2">Emergency Contact *</label>
                                <input
                                    type="tel"
                                    name="emergencyContact"
                                    required
                                    value={formData.emergencyContact}
                                    onChange={handleChange}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                                />
                            </div>
                        </div>

                        {/* Student Linking */}
                        <div>
                            <h3 className="text-lg font-semibold text-gray-700 mb-4">Student Information</h3>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Student ID(s) *
                                    <span className="text-gray-500 text-xs ml-2">(Comma-separated for multiple students)</span>
                                </label>
                                <input
                                    type="text"
                                    name="linkedStudentIds"
                                    required
                                    placeholder="e.g., 9, 10"
                                    value={formData.linkedStudentIds}
                                    onChange={handleChange}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                                />
                                <p className="text-sm text-gray-500 mt-1">
                                    Enter the student ID(s) of your child/children. You can find this from the school administration.
                                </p>
                            </div>
                        </div>

                        {/* ID Card Upload */}
                        <div>
                            <h3 className="text-lg font-semibold text-gray-700 mb-4">ID Card Upload *</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">ID Card Front</label>
                                    <input
                                        type="file"
                                        accept="image/*"
                                        required
                                        onChange={(e) => handleFileChange(e, "front")}
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                                    />
                                    {idCardFront && (
                                        <p className="text-sm text-green-600 mt-1">✓ {idCardFront.name}</p>
                                    )}
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">ID Card Back</label>
                                    <input
                                        type="file"
                                        accept="image/*"
                                        required
                                        onChange={(e) => handleFileChange(e, "back")}
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                                    />
                                    {idCardBack && (
                                        <p className="text-sm text-green-600 mt-1">✓ {idCardBack.name}</p>
                                    )}
                                </div>
                            </div>
                        </div>

                        {/* Password */}
                        <div>
                            <h3 className="text-lg font-semibold text-gray-700 mb-4">Account Security</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Password *</label>
                                    <input
                                        type="password"
                                        name="password"
                                        required
                                        minLength={6}
                                        value={formData.password}
                                        onChange={handleChange}
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Confirm Password *</label>
                                    <input
                                        type="password"
                                        name="confirmPassword"
                                        required
                                        minLength={6}
                                        value={formData.confirmPassword}
                                        onChange={handleChange}
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="flex gap-4">
                            <button
                                type="submit"
                                disabled={uploading || submitting}
                                className="flex-1 bg-purple-600 text-white py-3 rounded-lg font-semibold hover:bg-purple-700 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
                            >
                                {uploading ? "Uploading..." : submitting ? "Submitting..." : "Submit Registration"}
                            </button>
                            <button
                                type="button"
                                onClick={() => router.push("/login")}
                                className="px-6 py-3 border border-gray-300 rounded-lg font-semibold hover:bg-gray-50 transition-colors"
                            >
                                Cancel
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}
