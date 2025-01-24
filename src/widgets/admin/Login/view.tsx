"use client"
import React, { useEffect } from "react";
import LoginContent from "./components/LoginContent";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function AdminLogin() {
   const { data: session, status } = useSession();
    const router = useRouter();
  
    useEffect(() => {
      if (status === "loading") return; // If still loading, do nothing
      if (session?.user.isAdmin && status === "authenticated") {
        // Redirect non-admin users to the homepage or another page
        router.push("/admin");
      }
    }, [session, status, router]);
  return (
    <main>
      <LoginContent />
    </main>
  );
}
