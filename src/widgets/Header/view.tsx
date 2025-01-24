import Image from "next/image";
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
      <div className="flex-1 flex flex-row items-center justify-end gap-3">
       <span className=""> Hey, Abhishek Santhosh</span>
       <div className="rounded-full">
        <Image src={'/profile.jpg'} width={200} height={200} className="h-[30px] w-[40px] rounded-full object-contain" alt=""/>
       </div>
      </div>
    </div>
  );
}
