import customToast from "@components/CustomToast";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
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
  data: {
    newQuestions: Question[];
    remainingTime: number;
    attemptedAnswers: { _id: string; selectedValue: string }[];
  };
}

interface ExamContentProps {
  handleLoading: (data: boolean) => void;
}

export default function ExamContent({ handleLoading }: ExamContentProps) {
  const [timer, setTimer] = useState(7200); // Initial timer set to 2 hours
  const [questions, setQuestions] = useState<Question[]>([]);
  const [selectedAnswers, setSelectedAnswers] = useState<
    { _id: string; selectedValue: string }[]
  >([]);
  const [loading, setLoading] = useState(true);
  const [finished, setFinished] = useState(false);
  const { data: session } = useSession();
  const router = useRouter();

  // Handle option selection
  const handleOptionChange = (_id: string, selectedValue: string) => {
    setSelectedAnswers((prev) => {
      const updatedAnswers = prev.filter((answer) => answer._id !== _id);
      return [...updatedAnswers, { _id, selectedValue }];
    });
  };

  // Clear selection for a specific question
  const clearSelection = (_id: string) => {
    setSelectedAnswers((prev) => prev.filter((answer) => answer._id !== _id));
  };

  // Submit answers to API
  const handleSubmit = async () => {
    try {
      const res = await fetch("/api/exam/submit-answers", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: session?.user?.id,
          answers: selectedAnswers,
        }),
      });

      if (!res.ok) throw new Error("Failed to submit answers");

      const result = await res.json();
      customToast({ message: "Exam Finished!", type: "success", showIcon: true });
      setFinished(true);
      router.push("/success");
    } catch (error) {
      customToast({ message: "Failed to submit answers", type: "error", showIcon: true });
    }
  };

  // Fetch questions from API
  const getQuestions = async () => {
    handleLoading(true);
    try {
      const res = await fetch("/api/question/fetch", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId: session?.user?.id }),
      });

      if (!res.ok) throw new Error("Failed to fetch questions");

      const data: ApiResponse = await res.json();
      const { remainingTime, attemptedAnswers, newQuestions } = data.data;
      setQuestions(newQuestions);
      setTimer(remainingTime);
      setSelectedAnswers(attemptedAnswers);
    } catch (error) {
      console.error("Error fetching questions:", error);
    } finally {
      setLoading(false);
      handleLoading(false);
    }
  };

  // Timer countdown
  useEffect(() => {
    if (timer > 0 && !finished) {
      const interval = setInterval(() => setTimer((prev) => prev - 1), 1000);
      return () => clearInterval(interval);
    } else if (timer === 0 && !finished) {
      handleSubmit();
    }
  }, [timer, finished]);

  // Fetch questions on session load
  useEffect(() => {
    if (session) getQuestions();
  }, [session]);

  // Warn user about unsaved changes on page unload
  useEffect(() => {
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      if (!finished) {
        e.preventDefault();
        e.returnValue = "Your progress will be lost!";
      }
    };

    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => window.removeEventListener("beforeunload", handleBeforeUnload);
  }, [finished]);

  return (
    <main>
      {/* Header Section */}
      <div className="bg-gray-100 fixed w-full z-10">
        <div className="bg-white flex flex-row px-[3vw] py-[1vw] rounded-lg">
          <div className="flex-1 flex items-center">
            <div className="text-center">
              <span className="text-xl font-semibold text-gray-700">A Glimpse To KEAM</span>
              <br />
              <span className="text-xs font-normal">Mock test for KEAM Aspirants</span>
            </div>
            {selectedAnswers?.length !== 0 && <span className="ml-10 font-semibold text-gray-700">Attempted: {selectedAnswers?.length}/100</span>}
          </div>
          <div className="flex-1 flex justify-end items-center gap-3">
            <span className="capitalize text-xl font-semibold text-red-600">
              Hey, {session?.user?.firstName} {session?.user?.lastName} 👋
            </span>
            <button
              onClick={handleSubmit}
              className="bg-red-600 px-3 py-2 rounded-md text-white font-semibold"
            >
              Finish Exam
            </button>
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="min-h-[100vh] pt-[100px] px-4 bg-gray-100">
        <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg p-6">
          <h1 className="text-xl font-bold text-gray-800 mb-6">KEAM MOCK TEST</h1>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSubmit();
            }}
          >
            {questions.map((q, index) => (
              <div key={q._id} className="mb-6">
                <h2
                  className="font-semibold text-gray-800 mb-2"
                  dangerouslySetInnerHTML={{ __html: `${index + 1}) ${q.question}` }}
                ></h2>
                <div className="space-y-2">
                  {["a", "b", "c", "d", "e"].map((optionKey) => {
                    const optionValue = q[optionKey as keyof Question];
                    const isSelected =
                      selectedAnswers.find((answer) => answer._id === q._id)?.selectedValue ===
                      optionValue;
                    return (
                      optionValue && (
                        <div key={optionKey} className="flex items-center">
                          <input
                            type="radio"
                            id={`q${index}_o${optionKey}`}
                            name={`q${index}`}
                            value={optionValue}
                            className="mr-2 w-5 h-5 text-red-600 border-2 border-gray-300 cursor-pointer"
                            onChange={(e) => handleOptionChange(q._id, e.target.value)}
                            checked={isSelected}
                          />
                          <label
                            htmlFor={`q${index}_o${optionKey}`}
                            className="text-gray-700"
                            dangerouslySetInnerHTML={{ __html: optionValue }}
                          ></label>
                        </div>
                      )
                    );
                  })}
                </div>
                <button
                  type="button"
                  onClick={() => clearSelection(q._id)}
                  className="text-sm text-red-500 mt-5"
                >
                  Clear Selection
                </button>
              </div>
            ))}
          </form>
        </div>
        <div className="fixed bottom-5 right-5 bg-red-600 text-white font-bold text-lg px-4 py-2 rounded-lg shadow-lg">
          Time Remaining: {Math.floor(timer / 60)}:{timer % 60 < 10 ? `0${timer % 60}` : timer % 60}
        </div>
      </div>
    </main>
  );
}
