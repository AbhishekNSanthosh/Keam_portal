"use client";

import { useEffect, useState } from "react";

// Define the Student interface
interface Student {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  mobile?: string;
}

// Define the structure of the API response
interface ApiResponse {
  data: Student[];
}

const ViewUserContent = () => {
  const [students, setStudents] = useState<Student[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch students from the backend API
  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const response = await fetch("/api/admin/view-users", {
          method: "POST",
        }); // New API endpoint
        if (response.ok) {
          const data: ApiResponse = await response.json();
          setStudents(data.data); // Update state with student data
        } else {
          setError("Failed to fetch students.");
        }
      } catch (err) {
        console.error("Error fetching students:", err);
        setError("An error occurred while fetching students.");
      } finally {
        setLoading(false); // Hide loader
      }
    };

    fetchStudents();
  }, []);

  return (
    <div className="h-full bg-white flex items-center justify-center py-8">
      <div className="bg-white shadow-lg rounded-lg w-full max-w-4xl p-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-6 text-center">
          Student List
        </h1>
        <div className="flex flex-col gap-4">
          {loading ? (
            <p className="text-gray-600 text-center">Loading...</p>
          ) : error ? (
            <p className="text-red-600 text-center">{error}</p>
          ) : students.length > 0 ? (
            students.map((student) => (
              <div
                key={student._id}
                className="p-4 border border-gray-200 rounded-lg hover:shadow-md transition ease-in-out duration-300"
              >
                <div className="space-y-2">
                  <p className="text-lg font-medium text-gray-700">
                    <strong>Name:</strong> {student.firstName}{" "}
                    {student.lastName}
                  </p>
                  <p className="text-gray-600">
                    <strong>Email:</strong> {student.email}
                  </p>
                  <p className="text-gray-600">
                    <strong>Phone:</strong> {student.mobile || "N/A"}
                  </p>
                </div>
              </div>
            ))
          ) : (
            <p className="text-gray-600 text-center">No students found.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ViewStudentsPage;
