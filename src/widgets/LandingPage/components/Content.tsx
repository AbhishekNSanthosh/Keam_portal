"use client";
import customToast from "@components/CustomToast";
import { useRouter } from "next/navigation";
import React from "react";

export default function Content() {
  const router = useRouter();
  return (
    <div className="min-h-[100vh] pt-[100px] px-4 md:px-8 bg-gray-100 flex items-center justify-center">
      <div className="max-w-3xl mx-auto bg-white shadow-md rounded-lg p-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-4">
          Exam Instructions
        </h1>
        <ul className="list-disc list-inside space-y-2 text-gray-700">
          <li className="text-gray-600 text-sm">
            Total number of questions: 100.
          </li>
          <li className="text-gray-600 text-sm">Total Marks: 400</li>
          <li className="text-gray-600 text-sm">
            Marks awarded for correct answer: 4.
          </li>
          <li className="text-gray-600 text-sm">
            Marks deducted for wrong answer: 1.
          </li>
          <li className="text-gray-600 text-sm">Exam duration: 120 mins.</li>
          <li className="text-gray-600 text-sm">
            Do not hit the back button while attending the exam.
          </li>
          <li className="text-gray-600 text-sm">
            If you hit the back button or reload the page, you will need to
            start the exam from the beginning.
          </li>
        </ul>

        <div className="mt-6">
          <p className="text-sm text-gray-500">
            By clicking the button below, you acknowledge that you have read and
            understood the rules and regulations of the exam.
          </p>
        </div>

        <div className="mt-6 flex justify-center">
          <button
            className="bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-6 rounded-lg transition duration-200"
            onClick={() => {
              router.replace("/exam");
              setTimeout(() => {
                customToast({
                  message: "Exam started",
                  // desc:"",
                  type: "success",
                });
              }, 800);
            }}
          >
            Start Exam
          </button>
        </div>
      </div>
    </div>
  );
}
