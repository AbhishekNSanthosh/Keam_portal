"use client";
import Image from "next/image";
import React, { useState } from "react";

export default function RegisterContent() {
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [dob, setDob] = useState("");
  const [mobile, setMobile] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); // Prevents the default form submission behavior

    try {
      const response = await fetch("/api/admin/sign-up", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, firstName, lastName, dob, mobile }),
      });

      if (response.ok) {
        const data = await response.json();
        console.log("Success:", data);
        alert("Registration successful!");
      } else {
        const error = await response.json();
        console.error("Error:", error);
        alert("Registration failed. Please try again.");
      }
    } catch (err) {
      console.error("Unexpected error:", err);
      alert("An unexpected error occurred. Please try again later.");
    }
  };

  return (
    <div className="p-6 md:px-[5vw] w-full min-h-screen flex flex-col items-center justify-center bg-gray-50">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-blue-700 uppercase">
          A Glimpse to <span className="text-red-600">KEAM</span>
        </h1>
        <p className="text-gray-600 text-sm">Mock Test for KEAM Aspirants</p>
      </div>
      <div className="flex flex-col md:flex-row w-full max-w-6xl bg-white overflow-hidden p-2">
        {/* Left Section - Register Form */}
        <div className="flex-[0.9] p-8 md:p-12 shadow-sm rounded-lg">
          <h2 className="text-4xl font-bold text-gray-800 mb-6">Register</h2>
          <p className="text-gray-600 mb-8">
            Please register to continue. Enter your details to create your
            account.
          </p>
          <form onSubmit={handleSubmit}>
            {/* First Name Field */}
            <div className="mb-6">
              <label
                className="block text-gray-700 text-sm font-medium mb-2"
                htmlFor="firstName"
              >
                First Name
              </label>
              <input
                type="text"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                id="firstName"
                name="firstName"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                placeholder="Enter your first name"
                required
              />
            </div>

            {/* Last Name Field */}
            <div className="mb-6">
              <label
                className="block text-gray-700 text-sm font-medium mb-2"
                htmlFor="lastName"
              >
                Last Name
              </label>
              <input
                type="text"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                id="lastName"
                name="lastName"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                placeholder="Enter your last name"
                required
              />
            </div>

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
                value={email}
                onChange={(e) => setEmail(e.target.value)}
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
                value={dob}
                onChange={(e) => setDob(e.target.value)}
                id="dob"
                name="dob"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                required
              />
            </div>

            {/* Mobile Field (Optional) */}
            <div className="mb-6">
              <label
                className="block text-gray-700 text-sm font-medium mb-2"
                htmlFor="mobile"
              >
                Mobile Number (Optional)
              </label>
              <input
                type="tel"
                value={mobile}
                onChange={(e) => setMobile(e.target.value)}
                id="mobile"
                name="mobile"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                placeholder="Enter your mobile number (optional)"
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
              width={800}
              height={800}
              className="w-full h-auto object-contain"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
