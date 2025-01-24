"use client";
import Header from "@widgets/Header";
import React, { useEffect, useState } from "react";
import Content from "./components/Content";
import PreLoader from "@components/PreLoader";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

export default function LandingPageView() {
  const [isLoaded, setIsLoaded] = useState(false);
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "unauthenticated") {
      // Redirect to home page
      router.push("/login");
    }
  }, [status, session, router]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 800);

    return () => clearTimeout(timer);
  }, []);
  
  return (
    <main className="bg-gray-100">
      {!isLoaded && <PreLoader />}
      <Header />
      <Content />
    </main>
  );
}
