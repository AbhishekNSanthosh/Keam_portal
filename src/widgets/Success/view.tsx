"use client";
import Header from "@widgets/Header";
import { stat } from "fs";
import { signOut, useSession } from "next-auth/react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";

export default function Success() {
  const router = useRouter();
  const { data: session, status } = useSession();
  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login");
    }
    setTimeout(() => {
      signOut();
      router.push('/login')
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
