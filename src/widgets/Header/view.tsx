import React from "react";

export default function Header() {
  return (
    <div className="px-[5vw] h-[13vh] flex flex-row items-center text-gray-700 fixed top-0 w-full">
      <div className="flex-1 flex flex-row items-center justify-start">
        <div className="flex flex-col justify-center items-center">
          <span className="text-xl font-semibold">A Glimpse To KEAM</span>
          <span className="text-xs font-normal">
            Mock test for KEAM Aspirants
          </span>
        </div>
      </div>
      <div className="flex-1 flex flex-row items-center justify-end">
        h
      </div>
    </div>
  );
}
