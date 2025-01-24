"use client"
import Header from "@widgets/Header";
import { signOut } from "next-auth/react";
import Image from "next/image";
import React, { useEffect } from "react";

export default function Success() {
  useEffect(() => {
    setTimeout(() => {
      signOut();
    }, 1000);
  }, []);
  return (
    <main>
      <Header />
      <div className="pt-[100px] w-full flex items-center justify-center">
        <Image
          src={"/done.svg"}
          alt=""
          width={500}
          height={500}
          className="w-[30rem]"
        />
      </div>
    </main>
  );
}
