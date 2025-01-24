"use client";
import React, { useEffect, useState } from "react";

// Define the interfaces for the data
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

export default function ViewQuestionsContent() {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const getQuestions = async () => {
    try {
      setLoading(true); // Start loading
      const res = await fetch("/api/admin/question/fetch", {
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

  if (loading) return <div className="h-[82vh] w-full items-center justify-center flex bg-white">Loading questions...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="p-6 bg-white w-full">
      <h1 className="text-2xl font-bold mb-4">Questions</h1>
      {questions.length === 0 ? (
        <p>No questions found.</p>
      ) : (
        <ul className="pl-6 w-full">
          {questions.map((question, index) => (
            <li key={question._id} className="mb-4 w-full">
              <div className="flex flex-row items-start gap-2 w-full">
                <span className="">{index + 1}{") "}</span>
                <div className="w-full">
                  <div
                    className="mb-2"
                    dangerouslySetInnerHTML={{ __html: question.question }}
                  />
                  <div className="mb-4 grid grid-cols-1 sm:grid-cols-2 gap-2">
                    <div className="flex items-start">
                      <span className="mr-2">A)</span>
                      <span dangerouslySetInnerHTML={{ __html: question.a }} />
                    </div>
                    <div className="flex items-start">
                      <span className="mr-2">B)</span>
                      <span dangerouslySetInnerHTML={{ __html: question.b }} />
                    </div>
                    <div className="flex items-start">
                      <span className="mr-2">C)</span>
                      <span dangerouslySetInnerHTML={{ __html: question.c }} />
                    </div>
                    <div className="flex items-start">
                      <span className="mr-2">D)</span>
                      <span dangerouslySetInnerHTML={{ __html: question.d }} />
                    </div>
                    <div className="flex items-start">
                      <span className="mr-2">E)</span>
                      <span dangerouslySetInnerHTML={{ __html: question.e }} />
                    </div>
                  </div>

                  <div>
                    <span>Correct Answer: </span>
                    <span
                      dangerouslySetInnerHTML={{ __html: question.correct }}
                    />
                  </div>
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
