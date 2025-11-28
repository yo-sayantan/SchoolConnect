"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { fetchWithAuth } from "@/utils/api";
import { Save, ArrowLeft } from "lucide-react";

export default function MarksEntryPage() {
    const router = useRouter();
    const [classes, setClasses] = useState<any[]>([]);
    const [subjects, setSubjects] = useState<any[]>([]);
    const [students, setStudents] = useState<any[]>([]);
    const [selectedClass, setSelectedClass] = useState("");
    const [selectedSubject, setSelectedSubject] = useState("");
    const [examType, setExamType] = useState("TEST");
    const [term, setTerm] = useState("TERM_1");
    const [examName, setExamName] = useState("");
    const [examDate, setExamDate] = useState(new Date().toISOString().split('T')[0]);
    const [totalMarks, setTotalMarks] = useState(100);
    const [marksData, setMarksData] = useState<Record<string, { obtained: number, remarks: string }>>({});
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        // Fetch Classes
        // Mocking for now
        setClasses([
            { id: 1, name: "Class 10-A" },
            { id: 2, name: "Class 10-B" }
        ]);

        // Fetch Subjects
        setSubjects([
            { id: 1, name: "Mathematics" },
            { id: 2, name: "Science" },
            { id: 3, name: "English" }
        ]);
    }, []);

    useEffect(() => {
        if (selectedClass) {
            // Fetch Students for selected class
            // Mocking for now
            setStudents([
                { id: 101, name: "John Doe" },
                { id: 102, name: "Jane Smith" },
                { id: 103, name: "Bob Johnson" }
            ]);
        }
    }, [selectedClass]);

    const handleMarkChange = (studentId: string, field: 'obtained' | 'remarks', value: any) => {
        setMarksData(prev => ({
            ...prev,
            [studentId]: {
                ...prev[studentId],
                [field]: value
            }
        }));
    };

    const handleSubmit = async () => {
        setLoading(true);
        try {
            const payload = {
                classId: parseInt(selectedClass),
                subjectId: parseInt(selectedSubject),
                examType,
                term,
                examName,
                examDate,
                totalMarks,
                studentMarks: students.map(s => ({
                    studentId: s.id,
                    marksObtained: marksData[s.id]?.obtained || 0,
                    remarks: marksData[s.id]?.remarks || ""
                }))
            };

            await fetchWithAuth("/academic/marks/bulk", {
                method: "POST",
                body: JSON.stringify(payload)
            });

            alert("Marks saved successfully!");
            router.push("/dashboard/teacher");
        } catch (error) {
            console.error("Failed to save marks", error);
            alert("Failed to save marks");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-6">
            <div className="max-w-5xl mx-auto space-y-6">
                <div className="flex items-center justify-between">
                    <button onClick={() => router.back()} className="flex items-center gap-2 text-gray-600 hover:text-gray-900">
                        <ArrowLeft className="w-5 h-5" /> Back
                    </button>
                    <h1 className="text-2xl font-bold text-gray-800 dark:text-white">Enter Marks</h1>
                </div>

                <div className="card space-y-6">
                    <div className="grid md:grid-cols-3 gap-4">
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
                            <label className="block text-sm font-medium mb-1">Subject</label>
                            <select
                                className="input-field"
                                value={selectedSubject}
                                onChange={(e) => setSelectedSubject(e.target.value)}
                            >
                                <option value="">Select Subject</option>
                                {subjects.map(s => <option key={s.id} value={s.id}>{s.name}</option>)}
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-1">Exam Type</label>
                            <select
                                className="input-field"
                                value={examType}
                                onChange={(e) => setExamType(e.target.value)}
                            >
                                <option value="TEST">Test</option>
                                <option value="HALF_TERM">Half Term</option>
                                <option value="FULL_TERM">Full Term</option>
                            </select>
                        </div>
                    </div>

                    <div className="grid md:grid-cols-3 gap-4">
                        <div>
                            <label className="block text-sm font-medium mb-1">Term</label>
                            <select
                                className="input-field"
                                value={term}
                                onChange={(e) => setTerm(e.target.value)}
                            >
                                <option value="TERM_1">Term 1</option>
                                <option value="TERM_2">Term 2</option>
                                <option value="TERM_3">Term 3</option>
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-1">Exam Name</label>
                            <input
                                type="text"
                                className="input-field"
                                placeholder="e.g. Unit Test 1"
                                value={examName}
                                onChange={(e) => setExamName(e.target.value)}
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-1">Total Marks</label>
                            <input
                                type="number"
                                className="input-field"
                                value={totalMarks}
                                onChange={(e) => setTotalMarks(parseInt(e.target.value))}
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
                                    <th className="p-3 text-left">Marks Obtained</th>
                                    <th className="p-3 text-left">Remarks</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                                {students.map(student => (
                                    <tr key={student.id}>
                                        <td className="p-3 font-medium">{student.name}</td>
                                        <td className="p-3">
                                            <input
                                                type="number"
                                                className="input-field w-24"
                                                max={totalMarks}
                                                onChange={(e) => handleMarkChange(student.id, 'obtained', parseFloat(e.target.value))}
                                            />
                                        </td>
                                        <td className="p-3">
                                            <input
                                                type="text"
                                                className="input-field"
                                                placeholder="Good, Excellent..."
                                                onChange={(e) => handleMarkChange(student.id, 'remarks', e.target.value)}
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
                        {loading ? "Saving..." : "Save Marks"}
                    </button>
                </div>
            </div>
        </div>
    );
}
