"use client";

import customToast from "@components/CustomToast";
import { signOut, useSession } from "next-auth/react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

// Define the structure for user data
type UserData = {
  firstName?: string;
  lastName?: string;
  email?: string;
  dob?: string;
};

export default function Header() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [userData, setUserData] = useState<UserData>({});
  const { data: session, status } = useSession();
  const router = useRouter();
  // Close modal handler
  const closeModal = () => setIsModalOpen(false);

  // Fetch user profile from the API
  const getUserProfile = async () => {
    try {
      if (!session?.user?.id) {
        console.error("User ID is undefined");
        return;
      }

      const res = await fetch("/api/exam/get-profile", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId: session.user.id }),
      });

      if (!res.ok) {
        throw new Error(
          `Failed to fetch user profile: ${res.status} ${res.statusText}`
        );
      }

      const data = await res.json();
      console.log("User Profile:", data?.data);
      setUserData(data?.data || {}); // Ensure `userData` is an object
    } catch (error) {
      console.error("Error fetching user profile:", error);
    }
  };

  // Open modal handler
  const openModal = () => {
    getUserProfile();
    setIsModalOpen(true);
  };

  return (
    <>
      {/* Header */}
      <div className="px-[5vw] h-[13vh] flex flex-row items-center text-gray-700 fixed top-0 w-full bg-white shadow-md">
        <div className="flex-1 flex flex-row items-center justify-start">
          <div className="flex flex-col justify-center items-center">
            <span className="text-xl font-semibold">A Glimpse To KEAM</span>
            <span className="text-xs font-normal">
              Mock test for KEAM Aspirants
            </span>
          </div>
        </div>
        <div className="flex-1 flex flex-row items-center justify-end gap-3">
          <span className="capitalize">Hey, {session?.user?.firstName}{" "}{session?.user.lastName}</span>
          <div
            className="border-2 border-red-600 p-1 rounded-full cursor-pointer"
            onClick={openModal}
          >
            <div className="rounded-full overflow-hidden w-[40px] h-[40px]">
              <Image
                src="/profile.jpg"
                width={200}
                height={200}
                className="object-cover"
                alt="Profile picture"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-white bg-opacity-50 z-50 backdrop-blur-sm">
          <div className="bg-white rounded-lg p-6 shadow-lg w-[90%] max-w-md">
            <h2 className="text-xl font-bold mb-4 text-center">User Details</h2>
            <p className="text-center mb-2">
              <strong>Name:</strong> {userData?.firstName || ""}{" "}
              {userData?.lastName || ""}
            </p>
            <p className="text-center mb-2">
              <strong>Email:</strong> {userData?.email || "N/A"}
            </p>
            <p className="text-center mb-4">
              <strong>DOB:</strong> {userData?.dob || "N/A"}
            </p>
            <button
              onClick={() => {
                signOut();
                customToast({
                  message: "Logout Successful",
                  type: "success",
                  showIcon: true,
                  desc: "Redirecting to Login page",
                });
                setTimeout(() => {
                  router.push("/login");
                }, 200);
              }} // Call signOut from next-auth
              className="block w-full bg-red-600 text-white px-4 py-2 rounded-lg  mb-4"
            >
              Logout
            </button>
            <button
              onClick={closeModal}
              className="block mx-auto bg-white text-red-600 w-full border border-red-600 px-4 py-2 rounded-lg"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </>
  );
}
