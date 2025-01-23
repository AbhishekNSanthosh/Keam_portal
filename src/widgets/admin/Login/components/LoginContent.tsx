"use client";
import { signIn } from "next-auth/react";
import Image from "next/image";
import React from "react";

type SignInResponse = {
  error: string | null; // Error message, if any
  ok: boolean; // Whether the sign-in was successful
  status: number; // HTTP status code
  url: string | null; // Redirect URL (if any)
};


export default function LoginContent() {
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  
    const email = e.currentTarget.email.value;
    const dob = e.currentTarget.dob.value;
  
    try {
      const response = await signIn("credentials", {
        email,
        dob,
      });
  
      console.log(response)
      // if (response.ok) {
      //   const data = await response.json();
      //   console.log("Success:", data);
      //   alert("Registration successful!");
      //   // Redirect to success page or perform other actions
      // } else {
      //   const error = await response.json();
      //   console.error("Error:", error);
      //   const errorMessage = getErrorMessage(error.code); // Map error code to specific message
      //   alert(errorMessage);
      // }
    } catch (err) {
      console.log("Unexpected error:", err);
      // alert("An unexpected error occurred. Please try again later.");
    }
  };

  return (
    <div className="px-6 md:px-[5vw] w-full min-h-screen flex flex-col items-center justify-center bg-gray-50">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-blue-700 uppercase">
          A Glimpse to <span className="text-red-600">KEAM</span>
        </h1>
        <p className="text-gray-600 text-sm">Mock Test for KEAM Aspirants</p>
      </div>
      <div className="flex flex-col md:flex-row w-full max-w-6xl bg-white overflow-hidden p-2">
        {/* Left Section - Register Form */}
        <div className="flex-[0.9] p-8 md:p-12 shadow-sm rounded-lg">
          <h2 className="text-4xl font-bold text-gray-800 mb-6"><span className="text-red-600">Admin</span> Login</h2>
          <p className="text-gray-600 mb-8">
            Please register to continue. Enter your details to create your
            account.
          </p>
          <form onSubmit={handleSubmit}>
            {/* Email Field */}
            <div className="mb-6">
              <label
                className="block text-gray-700 text-sm font-medium mb-2"
                htmlFor="email"
              >
                Email Address
              </label>
              <input
                type="email"
                id="email"
                name="email"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                placeholder="Enter your email"
                required
              />
            </div>

            {/* Date of Birth Field */}
            <div className="mb-6">
              <label
                className="block text-gray-700 text-sm font-medium mb-2"
                htmlFor="dob"
              >
                Date of Birth
              </label>
              <input
                type="date"
                id="dob"
                name="dob"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                required
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-red-600 text-white py-3 rounded-lg hover:bg-blue-700 transition duration-300"
            >
              Register
            </button>
          </form>
        </div>

        {/* Right Section - Illustration */}
        <div className="hidden md:flex flex-[1.3] bg-blue-50 items-center justify-center p-8">
          <div className="w-3/4">
            <Image
              src="/exam.svg"
              alt="Illustration"
              className="w-full h-auto object-contain"
              width={800}
              height={800}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
