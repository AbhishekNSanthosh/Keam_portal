"use client";
import customToast from "@components/CustomToast";
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
        customToast({
          message: "New user created",
          type: "success",
          showIcon: true,
        });
        setFirstName("")
        setLastName("")
        setMobile("")
        setDob("")
        setEmail("")
      } else {
        const error = await response.json();
        console.error("Error:", error);
        customToast({
          message: "Failed to create",
          type: "error",
          showIcon: true,
        });
      }
    } catch (err) {
      console.error("Unexpected error:", err);
      customToast({
        message: "Failed to create",
        type: "error",
        showIcon: true,
      });
    }
  };

  return (
    <div className="w-full flex flex-col items-center justify-center bg-gray-50">
      <div className="flex flex-col md:flex-row w-full bg-white overflow-hidden p-2">
        {/* Left Section - Register Form */}
        <div className="flex-[0.9] p-8 md:p-12 shadow-sm rounded-lg">
          <h3 className="text-xl font-bold text-red-600 mb-6">
            Create New User
          </h3>
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
      </div>
    </div>
  );
}
