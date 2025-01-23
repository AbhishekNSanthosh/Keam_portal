"use client"
import React, { useState, useEffect } from "react";

export default function ExamContent() {
  const [timer, setTimer] = useState(60); // Timer starts at 60 seconds

  const questions = [
    {
      question: "What is the value of acceleration due to gravity on Earth?",
      options: ["9.8 m/s²", "10 m/s²", "8 m/s²", "11 m/s²", "12 m/s²"],
    },
    {
      question: "Which of the following is a prime number?",
      options: ["10", "15", "19", "21", "22"],
    },
    {
      question: "What is the chemical formula of water?",
      options: ["H2O", "CO2", "O2", "H2", "CH4"],
    },
    {
      question: "What is the SI unit of force?",
      options: ["Newton", "Joule", "Watt", "Pascal", "Ampere"],
    },
    {
      question: "What is the capital of India?",
      options: ["Delhi", "Mumbai", "Kolkata", "Chennai", "Bangalore"],
    },
    {
      question: "Which planet is known as the Red Planet?",
      options: ["Mars", "Venus", "Earth", "Jupiter", "Saturn"],
    },
    {
      question: "What is the speed of light?",
      options: [
        "300,000 km/s",
        "150,000 km/s",
        "450,000 km/s",
        "600,000 km/s",
        "100,000 km/s",
      ],
    },
    {
      question: "Who discovered penicillin?",
      options: [
        "Alexander Fleming",
        "Marie Curie",
        "Albert Einstein",
        "Isaac Newton",
        "Thomas Edison",
      ],
    },
    {
      question: "What is the square root of 144?",
      options: ["12", "14", "16", "18", "10"],
    },
    {
      question: "Which gas is most abundant in the Earth's atmosphere?",
      options: ["Nitrogen", "Oxygen", "Carbon Dioxide", "Helium", "Argon"],
    },
  ];

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

  return (
    <div className="min-h-[100vh] pt-[100px] px-4 bg-gray-100">
      <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-xl font-bold text-gray-800">JEE Model Questions</h1>
          <div className="text-red-600 font-bold text-lg">
            Time Remaining: {timer}s
          </div>
        </div>
        <form onSubmit={handleSubmit}>
          {questions.map((q, index) => (
            <div key={index} className="mb-6">
              <h2 className="font-semibold text-gray-800 mb-2">
                {index + 1}. {q.question}
              </h2>
              <div className="space-y-2">
                {q.options.map((option, i) => (
                  <div key={i} className="flex items-center">
                    <input
                      type="radio"
                      id={`q${index}_o${i}`}
                      name={`q${index}`}
                      value={option}
                      className="mr-2"
                      required
                    />
                    <label htmlFor={`q${index}_o${i}`} className="text-gray-700">
                      {option}
                    </label>
                  </div>
                ))}
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
    </div>
  );
}
