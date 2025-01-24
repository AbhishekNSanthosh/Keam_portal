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
  data: Question[];
}

interface ExamContentProps {
  handleLoading: (data: boolean) => void;
}

export default function ExamContent({ handleLoading }: ExamContentProps) {
  const [timer, setTimer] = useState(7200); // Initial timer set to 60 seconds
  const [questions, setQuestions] = useState<Question[]>([]);
  const [selectedAnswers, setSelectedAnswers] = useState<
    { _id: string; selectedValue: string }[]
  >([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { data: session } = useSession();
  const [finished, setFinished] = useState(false);
  const router = useRouter();
  const [isUnsavedChanges, setIsUnsavedChanges] = useState(false);

  const handleOptionChange = (_id: string, selectedValue: string) => {
    setIsUnsavedChanges(true);
    setSelectedAnswers((prev) => {
      const updatedAnswers = [...prev];
      const index = updatedAnswers.findIndex((answer) => answer._id === _id);

      if (index !== -1) {
        updatedAnswers[index].selectedValue = selectedValue;
      } else {
        updatedAnswers.push({ _id, selectedValue });
      }

      return updatedAnswers;
    });
  };

  const handleSubmit = async () => {
    console.log("Submitting answers:", selectedAnswers);
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

      if (!res.ok) {
        throw new Error(`Failed to submit answers: ${res.status}`);
      }

      const result = await res.json();
      customToast({
        message: "Finished",
        type: "success",
        showIcon: true,
      });
      setFinished(true);
      setTimeout(() => {
        router.push("/success");
      }, 200);
      console.log("API response:", result);
      setIsUnsavedChanges(false);
    } catch (error: any) {
      console.error("Error submitting answers:", error);
      customToast({
        message: "Failed to submit answers",
        type: "error",
        showIcon: true,
      });
    }
  };

  const getQuestions = async () => {
    handleLoading(true);
    try {
      const res = await fetch("/api/question/fetch", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
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
      setLoading(false);
      handleLoading(false);
    }
  };

  useEffect(() => {
    getQuestions();
  }, []);

  useEffect(() => {
    if (timer > 0 && !finished) {
      const interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
      return () => clearInterval(interval);
    } else if (timer === 0 && !finished) {
      setFinished(true);
      handleSubmit(); // Automatically submit when timer reaches 0
    }
  }, [timer, finished]);

  if (typeof window !== "undefined") {
    const unloadHandler = function () {
      return "Your work will be lost.";
    };

    if (!finished) {
      window.onbeforeunload = unloadHandler;
    } else {
      window.onbeforeunload = null;
    }
  }

  return (
    <main>
      {/* Header Section */}
      <div className=" bg-gray-100 fixed w-full z-10">
        <div className="bg-white flex flex-row px-[3vw] py-[1vw] rounded-lg">
          <div className="flex-1 flex items-center">
            <div className="text-center">
              <span className="text-xl font-semibold text-gray-700">
                A Glimpse To KEAM
              </span>
              <br />
              <span className="text-xs font-normal">
                Mock test for KEAM Aspirants
              </span>
            </div>
          </div>
          <div className="flex-1 flex justify-end items-center gap-3">
            <span>Hey, {session?.user.firstName+" "+session?.user.lastName}</span>
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
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-xl font-bold text-gray-800">KEAM MOCK TEST</h1>
          </div>
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
                  dangerouslySetInnerHTML={{
                    __html: `${index + 1}) ${q.question}`,
                  }}
                ></h2>
                <div className="space-y-2">
                  {["a", "b", "c", "d", "e"].map((optionKey) => {
                    const optionValue = q[optionKey as keyof Question];
                    return (
                      optionValue && (
                        <div key={optionKey} className="flex items-center">
                          <input
                            type="radio"
                            id={`q${index}_o${optionKey}`}
                            name={`q${index}`}
                            value={optionValue}
                            className="mr-2 w-5 h-5 text-red-600 border-2 border-gray-300 cursor-pointer"
                            required
                            onChange={(e) =>
                              handleOptionChange(q._id, e.target.value)
                            }
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

        {/* Timer */}
        <div className="fixed bottom-5 right-5 bg-red-600 text-white font-bold text-lg px-4 py-2 rounded-lg shadow-lg">
          Time Remaining:{" "}
          {Math.floor(timer / 3600)
    .toString()
    .padStart(2, "0")}
  :
  {Math.floor((timer % 3600) / 60)
    .toString()
    .padStart(2, "0")}
  :
  {(timer % 60).toString().padStart(2, "0")}
        </div>
      </div>
    </main>
  );
}
