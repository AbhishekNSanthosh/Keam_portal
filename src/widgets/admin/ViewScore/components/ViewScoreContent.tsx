"use client";

import { useState, useEffect } from "react";

const ViewScoresPage = () => {
  const [students, setStudents] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch scores from the API
  const fetchScores = async () => {
    try {
      const response = await fetch("/api/admin/scores", { method: "POST" });

      if (!response.ok) {
        throw new Error("Failed to fetch scores.");
      }

      const data = await response.json();
      if (data.success) {
        setStudents(data.students);
      } else {
        throw new Error(data.message || "Failed to fetch data.");
      }
    } catch (err: any) {
      setError(err.message || "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
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
        ) : error ? (
          <p className="text-center text-red-600">{error}</p>
        ) : students.length > 0 ? (
          <div className="space-y-4">
            {students.map((student, index) => (
              <div
                key={student._id || index}
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

export default ViewScoresPage;
