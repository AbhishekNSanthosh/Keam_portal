"use client";
import React, { useState, useEffect } from "react";

interface Question {
  _id: string;
  question: string;
  a: string;
  b: string;
  c: string;
  d: string;
  e: string;
  correct: string;
  mark: number;
  negativeMark: number;
  createdAt: string;
  updatedAt: string;
}

interface ApiResponse {
  message: string;
  data: Question[];
}

export default function ExamContent() {
  const [timer, setTimer] = useState(60); // Timer starts at 60 seconds
  const [questions, setQuestions] = useState<Question[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const countdown = setInterval(() => {
      setTimer((prev) => prev - 1);
    }, 1000);

    if (timer === 0) {
      clearInterval(countdown);
      handleSubmit();
    }

    return () => clearInterval(countdown);
  }, [timer]);

  const handleSubmit = () => {
    alert("Time's up! The form is automatically submitted.");
    // Add form submission logic here
  };

  const getQuestions = async () => {
    try {
      setLoading(true); // Start loading
      const res = await fetch("/api/question/fetch", {
        method: "POST", // Use GET for fetching data
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!res.ok) {
        throw new Error(`Error: ${res.status} ${res.statusText}`);
      }

      const data: ApiResponse = await res.json();
      if (data.message === "Data fetch successful") {
        setQuestions(data.data);
      }
    } catch (error: any) {
      console.error("Failed to fetch questions:", error);
      setError(error.message || "An unexpected error occurred.");
    } finally {
      setLoading(false); // Stop loading
    }
  };

  useEffect(() => {
    getQuestions();
  }, []);

  return (
    <div className="min-h-[100vh] pt-[130px] px-4 bg-gray-100">
      <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-xl font-bold text-gray-800">KEAM MOCK TEST</h1>
        </div>
        <form onSubmit={handleSubmit}>
          {questions.map((q, index) => (
            <div key={index} className="mb-6 flex flex-row gap-2">
              <span className="">
                {index + 1}
                {") "}
              </span>
              <div className="w-full">
                <h2
                  className="font-semibold text-gray-800 mb-2"
                  dangerouslySetInnerHTML={{ __html: q.question }}
                ></h2>
                <div className="space-y-2">
                  {["a", "b", "c", "d", "e"].map((optionKey, i) => (
                    <div key={i} className="flex items-center">
                      <input
                        type="radio"
                        id={`q${index}_o${i}`}
                        name={`q${index}`}
                        value={q[optionKey as keyof Question]}
                        className="mr-2 w-5 h-5 text-red-600 border-2 border-gray-300 cursor-pointer"
                        required
                      />
                      <label
                        htmlFor={`q${index}_o${i}`}
                        className="text-gray-700"
                        dangerouslySetInnerHTML={{
                          __html: q[optionKey as keyof Question] || "",
                        }}
                      ></label>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
          <div className="mt-6 flex justify-center">
            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
      <div className="fixed bottom-5 right-5 bg-red-600 text-white font-bold text-lg px-4 py-2 rounded-lg shadow-lg">
        Time Remaining: {timer}s
      </div>
    </div>
  );
}
