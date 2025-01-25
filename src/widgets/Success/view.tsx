"use client";
import PreLoader from "@components/PreLoader";
import Header from "@widgets/Header";
import { stat } from "fs";
import { signOut, useSession } from "next-auth/react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

export default function Success() {
  const router = useRouter();
  const { data: session, status } = useSession();
  const [showLoader, setShowLoader] = useState(true);

  useEffect(() => {
    if (status !== "loading") {
      setShowLoader(false);
    }
    // Redirect to login if session doesn't exist
    if (!session?.user) {
      router.push("/login");
      return; // Stop execution if the user isn't logged in
    }

    // Sign out and redirect to login after 1 second if session exists
    const timer = setTimeout(() => {
      signOut();
      router.push("/login");
    }, 1000);

    // Cleanup the timeout when the component is unmounted or session changes
    return () => clearTimeout(timer);
  }, [session, router]);
  return (
    <main>
      {showLoader && <PreLoader/>}
      <Header />
      <div className="pt-[100px] h-[100vh] w-full flex items-center justify-center">
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
