"use client";

import { useEffect, useState } from "react";

// Define the interface for a student
interface Student {
  _id: string;
  firstName: string;
  lastName: string;
  score: number;
}

const ViewScoreContent = () => {
  const [students, setStudents] = useState<Student[]>([]); // Array of Student objects
  const [loading, setLoading] = useState<boolean>(true); // Boolean to track loading state

  // Fetch scores from the backend API
  useEffect(() => {
    const fetchScores = async () => {
      try {
        const response = await fetch("/api/admin/view-score", {
          method: "POST",
        });
        if (response.ok) {
          const data: { data: Student[] } = await response.json(); // Type the API response
          setStudents(data.data); // Update state with student data
        } else {
          console.error("Failed to fetch scores.");
        }
      } catch (err) {
        console.error("Error fetching scores:", err);
      } finally {
        setLoading(false); // Hide loader
      }
    };

    fetchScores();
  }, []);

  return (
    <div className="h-full bg-white flex items-center justify-center py-8">
      <div className="bg-white shadow-sm rounded-lg w-full max-w-4xl p-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-6 text-center">
          Student Rankings
        </h1>
        {loading ? (
          <p className="text-center text-gray-600">Loading...</p>
        ) : students.length > 0 ? (
          <div className="space-y-4">
            {students.map((student, index) => (
              <div
                key={student._id || index.toString()}
                className="p-4 border border-gray-200 rounded-lg hover:shadow-md transition"
              >
                <p className="text-lg font-medium text-gray-700">
                  <strong>Rank {index + 1}:</strong> {student.firstName}{" "}
                  {student.lastName}
                </p>
                <p className="text-gray-600">Score: {student.score}</p>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-600">No students found.</p>
        )}
      </div>
    </div>
  );
};

export default ViewScoreContent;
