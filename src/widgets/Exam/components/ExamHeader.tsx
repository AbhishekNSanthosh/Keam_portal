import React from "react";

export default function ExamHeader() {
  return (
    <div className="px-[3vw] py-[2vw] bg-gray-100 fixed w-full">
      <div className="bg-white flex flex-row p-3 rounded-lg">
        <div className="flex-1 flex flex-row items-center justify-start">
          <div className="flex flex-col justify-center items-center">
            <span className="text-xl font-semibold">A Glimpse To KEAM</span>
            <span className="text-xs font-normal">
              Mock test for KEAM Aspirants
            </span>
          </div>
        </div>
        <div className="flex-1 flex flex-row items-center justify-end gap-3">
          <span className=""> Hey, Abhishek Santhosh</span>
          <button className="bg-red-600 px-3 py-2 rounded-md text-white font-semibold">Finish Exam</button>
        </div>
      </div>
    </div>
  );
}
