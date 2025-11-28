"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { fetchWithAuth } from "@/utils/api";
import { Save, ArrowLeft, Check, X } from "lucide-react";

export default function AttendanceEntryPage() {
    const router = useRouter();
    const [classes, setClasses] = useState<any[]>([]);
    const [students, setStudents] = useState<any[]>([]);
    const [selectedClass, setSelectedClass] = useState("");
    const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
    const [attendanceData, setAttendanceData] = useState<Record<string, { status: 'PRESENT' | 'ABSENT' | 'LATE' | 'EXCUSED', remarks: string }>>({});
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        // Fetch Classes
        // Mocking for now
        setClasses([
            { id: 1, name: "Class 10-A" },
            { id: 2, name: "Class 10-B" }
        ]);
    }, []);

    useEffect(() => {
        if (selectedClass) {
            // Fetch Students for selected class
            // Mocking for now
            const mockStudents = [
                { id: 101, name: "John Doe" },
                { id: 102, name: "Jane Smith" },
                { id: 103, name: "Bob Johnson" }
            ];
            setStudents(mockStudents);

            // Initialize attendance as PRESENT for all
            const initialData: any = {};
            mockStudents.forEach(s => {
                initialData[s.id] = { status: 'PRESENT', remarks: '' };
            });
            setAttendanceData(initialData);
        }
    }, [selectedClass]);

    const handleStatusChange = (studentId: string, status: 'PRESENT' | 'ABSENT' | 'LATE' | 'EXCUSED') => {
        setAttendanceData(prev => ({
            ...prev,
            [studentId]: {
                ...prev[studentId],
                status
            }
        }));
    };

    const handleRemarksChange = (studentId: string, remarks: string) => {
        setAttendanceData(prev => ({
            ...prev,
            [studentId]: {
                ...prev[studentId],
                remarks
            }
        }));
    };

    const handleSubmit = async () => {
        setLoading(true);
        try {
            const payload = {
                classId: parseInt(selectedClass),
                date,
                studentAttendance: students.map(s => ({
                    studentId: s.id,
                    status: attendanceData[s.id]?.status || 'PRESENT',
                    remarks: attendanceData[s.id]?.remarks || ""
                }))
            };

            await fetchWithAuth("/academic/attendance/bulk", {
                method: "POST",
                body: JSON.stringify(payload)
            });

            alert("Attendance saved successfully!");
            router.push("/dashboard/teacher");
        } catch (error) {
            console.error("Failed to save attendance", error);
            alert("Failed to save attendance");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-6">
            <div className="max-w-4xl mx-auto space-y-6">
                <div className="flex items-center justify-between">
                    <button onClick={() => router.back()} className="flex items-center gap-2 text-gray-600 hover:text-gray-900">
                        <ArrowLeft className="w-5 h-5" /> Back
                    </button>
                    <h1 className="text-2xl font-bold text-gray-800 dark:text-white">Take Attendance</h1>
                </div>

                <div className="card space-y-6">
                    <div className="grid md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium mb-1">Class</label>
                            <select
                                className="input-field"
                                value={selectedClass}
                                onChange={(e) => setSelectedClass(e.target.value)}
                            >
                                <option value="">Select Class</option>
                                {classes.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-1">Date</label>
                            <input
                                type="date"
                                className="input-field"
                                value={date}
                                onChange={(e) => setDate(e.target.value)}
                            />
                        </div>
                    </div>
                </div>

                {students.length > 0 && (
                    <div className="card overflow-hidden">
                        <table className="w-full">
                            <thead className="bg-gray-100 dark:bg-gray-800">
                                <tr>
                                    <th className="p-3 text-left">Student Name</th>
                                    <th className="p-3 text-center">Status</th>
                                    <th className="p-3 text-left">Remarks</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                                {students.map(student => (
                                    <tr key={student.id}>
                                        <td className="p-3 font-medium">{student.name}</td>
                                        <td className="p-3">
                                            <div className="flex justify-center gap-2">
                                                <button
                                                    onClick={() => handleStatusChange(student.id, 'PRESENT')}
                                                    className={`p-2 rounded-lg transition-colors ${attendanceData[student.id]?.status === 'PRESENT' ? 'bg-green-100 text-green-700 border-2 border-green-500' : 'bg-gray-100 text-gray-400'}`}
                                                    title="Present"
                                                >
                                                    <Check className="w-5 h-5" />
                                                </button>
                                                <button
                                                    onClick={() => handleStatusChange(student.id, 'ABSENT')}
                                                    className={`p-2 rounded-lg transition-colors ${attendanceData[student.id]?.status === 'ABSENT' ? 'bg-red-100 text-red-700 border-2 border-red-500' : 'bg-gray-100 text-gray-400'}`}
                                                    title="Absent"
                                                >
                                                    <X className="w-5 h-5" />
                                                </button>
                                                <button
                                                    onClick={() => handleStatusChange(student.id, 'LATE')}
                                                    className={`p-2 rounded-lg transition-colors ${attendanceData[student.id]?.status === 'LATE' ? 'bg-yellow-100 text-yellow-700 border-2 border-yellow-500' : 'bg-gray-100 text-gray-400'}`}
                                                    title="Late"
                                                >
                                                    <span className="font-bold text-sm">L</span>
                                                </button>
                                            </div>
                                        </td>
                                        <td className="p-3">
                                            <input
                                                type="text"
                                                className="input-field"
                                                placeholder="Optional"
                                                value={attendanceData[student.id]?.remarks || ''}
                                                onChange={(e) => handleRemarksChange(student.id, e.target.value)}
                                            />
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}

                <div className="flex justify-end">
                    <button
                        onClick={handleSubmit}
                        disabled={loading || students.length === 0}
                        className="btn-primary flex items-center gap-2"
                    >
                        <Save className="w-5 h-5" />
                        {loading ? "Saving..." : "Save Attendance"}
                    </button>
                </div>
            </div>
        </div>
    );
}
