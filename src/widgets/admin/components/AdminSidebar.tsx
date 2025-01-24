"use client";
import Link from "next/link";
import React from "react";
import { MdSpaceDashboard } from "react-icons/md";
import { IoMdListBox } from "react-icons/io";
import { usePathname, useRouter } from "next/navigation";
import { HiUserAdd } from "react-icons/hi";
import { FiLogOut } from "react-icons/fi";
import { signOut } from "next-auth/react";
import customToast from "@components/CustomToast";

export default function AdminSidebar() {
  const location = usePathname();
  const router = useRouter();
  const menuItems = [
    {
      title: "Dashboard",
      link: "/admin",
      icon: <MdSpaceDashboard className="" />,
    },
    {
      title: "View Questions",
      link: "/admin/view-questions",
      icon: <IoMdListBox className="" />,
    },
    {
      title: "Add Users",
      link: "/admin/add-users",
      icon: <HiUserAdd className="" />,
    },
  ];
  return (
    <div className="w-[18vw] h-screen pt-[2rem] fixed bg-white">
      <div className="flex flex-col justify-center items-center px-[2vw] text-gray-700">
        <span className="text-base font-semibold">A Glimpse To KEAM</span>
        <span className="text-xs font-normal">
          Mock test for KEAM Aspirants
        </span>
      </div>
      <div className="mt-[8vh] w-full flex flex-col gap-1">
        {menuItems?.map((menuItem, index) => (
          <Link
            className={`flex text-gray-700 flex-row items-center gap-2 text-2xl py-2 relative w-full px-[2vw] ${
              location === menuItem?.link && "text-red-600 bg-red-50"
            }`}
            key={index}
            href={menuItem?.link}
          >
            {location === menuItem?.link && (
              <div className="h-full w-2 rounded-r-[20px] absolute left-0 top-0 bg-red-600"></div>
            )}
            {menuItem?.icon}
            <span className="text-[1.1rem]">{menuItem?.title}</span>
          </Link>
        ))}
      </div>
      <div className="absolute bottom-2 w-full px-[2vw]">
        <button
          onClick={() => {
            signOut();
            customToast({
              message: "Logout Successful",
              type: "success",
              desc: "Redirecting to login page",
              showIcon: true,
            });
            setTimeout(() => {
              router.push("/admin/login");
            }, 400);
          }}
          className="bg-red-100 flex items-center justify-center gap-2 py-2 font-semibold text-red-600 rounded-lg outline-none border-none w-full"
        >
          <FiLogOut className="text-xl" />
          Logout
        </button>
        <span className=""></span>
      </div>
    </div>
  );
}
