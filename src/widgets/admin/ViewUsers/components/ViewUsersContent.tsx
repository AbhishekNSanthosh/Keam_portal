"use client";

import { useState, useEffect } from "react";

const ViewStudentsPage = () => {
  const [students, setStudents] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch students from the API
  const fetchStudents = async () => {
    try {
      const response = await fetch("/api/admin/students", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await response.json();
      if (data.success) {
        setStudents(data.students);
      } else {
        throw new Error(data.message || "Failed to fetch students");
      }
    } catch (err: any) {
      setError(err.message || "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  return (
    <div className="h-full bg-white flex items-center justify-center py-8">
      <div className="bg-white shadow-sm rounded-lg w-full max-w-4xl p-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-6 text-center">
          Student List
        </h1>
        {loading ? (
          <p className="text-gray-600 text-center">Loading...</p>
        ) : error ? (
          <p className="text-red-600 text-center">{error}</p>
        ) : students.length > 0 ? (
          <div className="space-y-4">
            {students.map((student) => (
              <div
                key={student._id}
                className="p-4 border border-gray-200 rounded-lg hover:shadow-md transition"
              >
                <p className="text-lg font-medium text-gray-700">
                  <strong>Name:</strong> {student.firstName} {student.lastName}
                </p>
                <p className="text-gray-600">
                  <strong>Email:</strong> {student.email}
                </p>
                <p className="text-gray-600">
                  <strong>Phone:</strong> {student.phone || "N/A"}
                </p>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-600 text-center">No students found.</p>
        )}
      </div>
    </div>
  );
};

export default ViewStudentsPage;
