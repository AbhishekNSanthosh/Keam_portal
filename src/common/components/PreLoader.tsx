import Image from "next/image";
import React from "react";

export default function PreLoader() {
  return (
    <div className="fixed inset-0 z-[1000] bg-white flex items-center justify-center">
      <div className="">
        <div className="flex items-center justify-center flex-col gap-3 px-5vw">
          <div className="flex flex-col justify-center items-center">
            <span className="text-2xl font-semibold">
              A Glimpse To <span className="text-red-600">KEAM</span>
            </span>
            <span className="text-sm font-normal">
              Mock test for <span className="text-red-600">KEAM</span> Aspirants
            </span>
          </div>
          <span className="loader"></span>
        </div>
      </div>
    </div>
  );
}
