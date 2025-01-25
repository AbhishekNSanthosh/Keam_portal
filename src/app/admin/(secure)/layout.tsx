"use client";
import Provider from "@components/Provider";
import SessionWrapper from "@components/SessionWrapper";
import "@styles/scss/main.scss";
import AdminHeader from "@widgets/admin/components/AdminHeader";
import AdminSidebar from "@widgets/admin/components/AdminSidebar";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "loading") return; // If still loading, do nothing
    if (!session?.user.isAdmin && status === "authenticated") {
      // Redirect non-admin users to the homepage or another page
      router.push("/");
    } else
      setTimeout(() => {
        if (!session && status === "unauthenticated") {
          // If not authenticated, redirect to login
          router.push("/admin/login");
        }
      }, 300);
  }, [session, status, router]);

  return (
    <div>
      <Provider>
        <SessionWrapper admin={true}>
          <div className="flex items-center flex-row w-screen">
            <AdminSidebar />
            <div className="flex flex-col w-full">
              <AdminHeader />
              <main className="min-h-[100vh] h-auto rounded-[5px] pt-[15vh] pl-[19vw] pr-[1vw] pb-[1vw] w-[99.5vw] flex  bg-red-50 bg-opacity-45">
                <div className="w-full h-[82vh] relative overflow-auto">
                  {children}
                </div>
              </main>
            </div>
          </div>
        </SessionWrapper>
      </Provider>
    </div>
  );
}
