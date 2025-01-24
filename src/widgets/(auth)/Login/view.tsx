"use client";
import React, { useEffect, useState } from "react";
import PreLoader from "@components/PreLoader";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import LoginContent from "./components/LoginContent";

export default function LoginUser() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { data: session, status } = useSession();
  const router = useRouter();

  const handleLoading = (data: boolean) => {
    setIsLoading(data);
  };

  useEffect(() => {
    if (status === "authenticated") {
      // Redirect to home page
      router.push("/");
    }
  }, [status, session, router]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 800);

    return () => clearTimeout(timer);
  }, []);

  return (
    <main className="">
      {isLoading || !isLoaded ? <PreLoader /> : null}
      <LoginContent/>
    </main>
  );
}
