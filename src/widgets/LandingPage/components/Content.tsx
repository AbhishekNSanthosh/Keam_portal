"use client"
import customToast from "@components/CustomToast";
import { useRouter } from "next/navigation";
import React from "react";

export default function Content() {
  const router = useRouter();
  return (
    <div className="min-h-[100vh] pt-[100px] px-4 md:px-8 bg-gray-100 flex items-center justify-center">
      <div className="max-w-3xl mx-auto bg-white shadow-md rounded-lg p-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-4">Exam Instructions</h1>
        <ul className="list-disc list-inside space-y-2 text-gray-700">
          <li>Read all the questions carefully before attempting the exam.</li>
          <li>The time limit for this exam is <strong>60 minutes</strong>.</li>
          <li>The total number of questions is <strong>50</strong>.</li>
          <li>Malpractice is strictly prohibited and may lead to disqualification.</li>
          <li>Do not refresh the page or hit the back button during the exam.</li>
          <li>Ensure a stable internet connection throughout the exam duration.</li>
          <li>Turning off the device or switching tabs will be considered malpractice.</li>
        </ul>

        <div className="mt-6">
          <p className="text-sm text-gray-500">
            By clicking the button below, you acknowledge that you have read and understood the rules and regulations of the exam.
          </p>
        </div>

        <div className="mt-6 flex justify-center">
          <button
            className="bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-6 rounded-lg transition duration-200"
            onClick={()=>{
              router.replace('/exam');
              setTimeout(() => {
                customToast({
                  message:"Exam started",
                  // desc:"",
                  type:"success"
                })
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
