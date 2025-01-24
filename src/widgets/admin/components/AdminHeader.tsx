import Image from "next/image";
import React from "react";

export default function AdminHeader() {
  return (
    <div className="flex w-[82vw] px-[2vw] py-[1rem] h-[13vh] fixed bg-white ml-[18vw] z-10">
      <div className="flex-1 items-center flex">Welcome, Abhishek Santhosh</div>
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
  );
}
