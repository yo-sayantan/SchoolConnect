"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { registrationService, userManagementService, authService } from "@/services/api";

interface RegistrationRequest {
    id: number;
    name: string;
    email: string;
    phoneNumber: string;
    role: string;
    idCardFrontUrl: string;
    idCardBackUrl: string;
    linkedStudentIds?: string;
    address?: string;
    dateOfBirth?: string;
    guardianName?: string;
    emergencyContact?: string;
    status: string;
    createdAt: string;
}

interface User {
    id: number;
    name: string;
    email: string;
    role: string;
    active: boolean;
}

export default function AdminPanel() {
    const router = useRouter();
    const [activeTab, setActiveTab] = useState<"pending" | "users">("pending");
    const [pendingRequests, setPendingRequests] = useState<RegistrationRequest[]>([]);
    const [users, setUsers] = useState<User[]>([]);
    const [selectedRequest, setSelectedRequest] = useState<RegistrationRequest | null>(null);
    const [editData, setEditData] = useState<any>({});
    const [loading, setLoading] = useState(true);
    const [processing, setProcessing] = useState(false);

    useEffect(() => {
        const role = authService.getRole();
        if (role !== "PRINCIPAL" && role !== "ADMIN_ASSISTANT") {
            router.push("/dashboard");
            return;
        }
        loadData();
    }, [activeTab]);

    const loadData = async () => {
        setLoading(true);
        try {
            if (activeTab === "pending") {
                const data = await registrationService.getPendingRequests();
                setPendingRequests(Array.isArray(data) ? data : []);
            } else {
                const studentsData = await userManagementService.getUsersByRole("STUDENT");
                const parentsData = await userManagementService.getUsersByRole("PARENT");
                setUsers([
                    ...(Array.isArray(studentsData) ? studentsData : []),
                    ...(Array.isArray(parentsData) ? parentsData : [])
                ]);
            }
        } catch (error) {
            console.error("Failed to load data:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleSelectRequest = (request: RegistrationRequest) => {
        setSelectedRequest(request);
        setEditData({
            name: request.name,
            email: request.email,
            phoneNumber: request.phoneNumber,
            address: request.address || "",
            dateOfBirth: request.dateOfBirth || "",
            guardianName: request.guardianName || "",
            emergencyContact: request.emergencyContact || "",
            linkedStudentIds: request.linkedStudentIds || ""
        });
    };

    const handleApprove = async () => {
        if (!selectedRequest) return;

        setProcessing(true);
        try {
            await registrationService.approveRegistration({
                requestId: selectedRequest.id,
                approved: true,
                reviewNotes: "Approved",
                ...editData
            });
            alert("Registration approved successfully!");
            setSelectedRequest(null);
            loadData();
        } catch (error) {
            alert("Failed to approve registration");
        } finally {
            setProcessing(false);
        }
    };

    const handleReject = async () => {
        if (!selectedRequest) return;

        const notes = prompt("Enter rejection reason:");
        if (!notes) return;

        setProcessing(true);
        try {
            await registrationService.approveRegistration({
                requestId: selectedRequest.id,
                approved: false,
                reviewNotes: notes
            });
            alert("Registration rejected");
            setSelectedRequest(null);
            loadData();
        } catch (error) {
            alert("Failed to reject registration");
        } finally {
            setProcessing(false);
        }
    };

    const handleToggleUserStatus = async (userId: number, currentStatus: boolean) => {
        setProcessing(true);
        try {
            if (currentStatus) {
                await userManagementService.disableUser(userId);
                alert("User account disabled");
            } else {
                await userManagementService.enableUser(userId);
                alert("User account enabled");
            }
            loadData();
        } catch (error) {
            alert("Failed to update user status");
        } finally {
            setProcessing(false);
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 p-6">
            <div className="max-w-7xl mx-auto">
                <h1 className="text-3xl font-bold text-gray-800 mb-6">Administration Panel</h1>

                {/* Tabs */}
                <div className="flex gap-4 mb-6">
                    <button
                        onClick={() => setActiveTab("pending")}
                        className={`px-6 py-3 rounded-lg font-semibold transition-colors ${activeTab === "pending"
                                ? "bg-blue-600 text-white"
                                : "bg-white text-gray-700 hover:bg-gray-100"
                            }`}
                    >
                        Pending Registrations ({pendingRequests.length})
                    </button>
                    <button
                        onClick={() => setActiveTab("users")}
                        className={`px-6 py-3 rounded-lg font-semibold transition-colors ${activeTab === "users"
                                ? "bg-blue-600 text-white"
                                : "bg-white text-gray-700 hover:bg-gray-100"
                            }`}
                    >
                        Manage Users ({users.length})
                    </button>
                </div>

                {loading ? (
                    <div className="text-center py-12">
                        <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
                        <p className="mt-4 text-gray-600">Loading...</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                        {/* List */}
                        <div className="lg:col-span-1 bg-white rounded-lg shadow-md p-6 max-h-[calc(100vh-250px)] overflow-y-auto">
                            <h2 className="text-xl font-semibold mb-4">
                                {activeTab === "pending" ? "Pending Requests" : "Users"}
                            </h2>

                            {activeTab === "pending" ? (
                                pendingRequests.length === 0 ? (
                                    <p className="text-gray-500 text-center py-8">No pending requests</p>
                                ) : (
                                    <div className="space-y-3">
                                        {pendingRequests.map((request) => (
                                            <div
                                                key={request.id}
                                                onClick={() => handleSelectRequest(request)}
                                                className={`p-4 rounded-lg border-2 cursor-pointer transition-all ${selectedRequest?.id === request.id
                                                        ? "border-blue-500 bg-blue-50"
                                                        : "border-gray-200 hover:border-gray-300"
                                                    }`}
                                            >
                                                <h3 className="font-semibold text-gray-800">{request.name}</h3>
                                                <p className="text-sm text-gray-600">{request.email}</p>
                                                <span className={`inline-block mt-2 px-2 py-1 text-xs rounded ${request.role === "STUDENT" ? "bg-blue-100 text-blue-700" : "bg-purple-100 text-purple-700"
                                                    }`}>
                                                    {request.role}
                                                </span>
                                            </div>
                                        ))}
                                    </div>
                                )
                            ) : (
                                users.length === 0 ? (
                                    <p className="text-gray-500 text-center py-8">No users found</p>
                                ) : (
                                    <div className="space-y-3">
                                        {users.map((user) => (
                                            <div
                                                key={user.id}
                                                className="p-4 rounded-lg border-2 border-gray-200"
                                            >
                                                <div className="flex justify-between items-start">
                                                    <div>
                                                        <h3 className="font-semibold text-gray-800">{user.name}</h3>
                                                        <p className="text-sm text-gray-600">{user.email}</p>
                                                        <span className={`inline-block mt-2 px-2 py-1 text-xs rounded ${user.role === "STUDENT" ? "bg-blue-100 text-blue-700" : "bg-purple-100 text-purple-700"
                                                            }`}>
                                                            {user.role}
                                                        </span>
                                                    </div>
                                                    <button
                                                        onClick={() => handleToggleUserStatus(user.id, user.active)}
                                                        disabled={processing}
                                                        className={`px-3 py-1 rounded text-sm font-medium ${user.active
                                                                ? "bg-red-100 text-red-700 hover:bg-red-200"
                                                                : "bg-green-100 text-green-700 hover:bg-green-200"
                                                            }`}
                                                    >
                                                        {user.active ? "Disable" : "Enable"}
                                                    </button>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                )
                            )}
                        </div>

                        {/* Details */}
                        <div className="lg:col-span-2 bg-white rounded-lg shadow-md p-6">
                            {selectedRequest ? (
                                <div>
                                    <h2 className="text-2xl font-bold text-gray-800 mb-6">Review Registration</h2>

                                    {/* ID Cards */}
                                    <div className="mb-6">
                                        <h3 className="text-lg font-semibold mb-3">ID Card Images</h3>
                                        <div className="grid grid-cols-2 gap-4">
                                            <div>
                                                <p className="text-sm text-gray-600 mb-2">Front</p>
                                                <img
                                                    src={selectedRequest.idCardFrontUrl}
                                                    alt="ID Card Front"
                                                    className="w-full h-48 object-cover rounded-lg border"
                                                />
                                            </div>
                                            <div>
                                                <p className="text-sm text-gray-600 mb-2">Back</p>
                                                <img
                                                    src={selectedRequest.idCardBackUrl}
                                                    alt="ID Card Back"
                                                    className="w-full h-48 object-cover rounded-lg border"
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    {/* Editable Fields */}
                                    <div className="space-y-4 mb-6">
                                        <div className="grid grid-cols-2 gap-4">
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                                                <input
                                                    type="text"
                                                    value={editData.name || ""}
                                                    onChange={(e) => setEditData({ ...editData, name: e.target.value })}
                                                    className="w-full px-3 py-2 border rounded-lg"
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                                                <input
                                                    type="email"
                                                    value={editData.email || ""}
                                                    onChange={(e) => setEditData({ ...editData, email: e.target.value })}
                                                    className="w-full px-3 py-2 border rounded-lg"
                                                />
                                            </div>
                                        </div>

                                        <div className="grid grid-cols-2 gap-4">
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                                                <input
                                                    type="tel"
                                                    value={editData.phoneNumber || ""}
                                                    onChange={(e) => setEditData({ ...editData, phoneNumber: e.target.value })}
                                                    className="w-full px-3 py-2 border rounded-lg"
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-1">Date of Birth</label>
                                                <input
                                                    type="date"
                                                    value={editData.dateOfBirth || ""}
                                                    onChange={(e) => setEditData({ ...editData, dateOfBirth: e.target.value })}
                                                    className="w-full px-3 py-2 border rounded-lg"
                                                />
                                            </div>
                                        </div>

                                        {selectedRequest.role === "PARENT" && (
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-1">Linked Student IDs</label>
                                                <input
                                                    type="text"
                                                    value={editData.linkedStudentIds || ""}
                                                    onChange={(e) => setEditData({ ...editData, linkedStudentIds: e.target.value })}
                                                    className="w-full px-3 py-2 border rounded-lg"
                                                />
                                            </div>
                                        )}

                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
                                            <textarea
                                                value={editData.address || ""}
                                                onChange={(e) => setEditData({ ...editData, address: e.target.value })}
                                                rows={2}
                                                className="w-full px-3 py-2 border rounded-lg"
                                            />
                                        </div>
                                    </div>

                                    {/* Actions */}
                                    <div className="flex gap-4">
                                        <button
                                            onClick={handleApprove}
                                            disabled={processing}
                                            className="flex-1 bg-green-600 text-white py-3 rounded-lg font-semibold hover:bg-green-700 disabled:bg-gray-400"
                                        >
                                            {processing ? "Processing..." : "Approve"}
                                        </button>
                                        <button
                                            onClick={handleReject}
                                            disabled={processing}
                                            className="flex-1 bg-red-600 text-white py-3 rounded-lg font-semibold hover:bg-red-700 disabled:bg-gray-400"
                                        >
                                            Reject
                                        </button>
                                        <button
                                            onClick={() => setSelectedRequest(null)}
                                            className="px-6 py-3 border border-gray-300 rounded-lg font-semibold hover:bg-gray-50"
                                        >
                                            Cancel
                                        </button>
                                    </div>
                                </div>
                            ) : (
                                <div className="text-center py-12 text-gray-500">
                                    {activeTab === "pending"
                                        ? "Select a registration request to review"
                                        : "User management view"}
                                </div>
                            )}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
