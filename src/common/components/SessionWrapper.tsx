"use client";
import { useSession } from "next-auth/react";
import { useRouter, usePathname } from "next/navigation";
import { useEffect } from "react";

const SessionWrapper = ({
  admin,
  children,
}: {
  admin?: boolean;
  children: React.ReactNode;
}) => {
  const pathname = usePathname();
  const { data: session, status } = useSession() as {
    data: { user: { isAdmin: boolean } } | null;
    status: string;
  };
  const router = useRouter();

  useEffect(() => {
    const handleRedirect = async () => {
      if (status === "loading") {
        return;
      }
      if (session) {
        // User is authenticated
        if (admin && !session.user.isAdmin) {
          // If admin access is required but user is not an admin
          router.push("/login");
        } else if (session.user.isAdmin && pathname === "/admin/login") {
          router.push("/admin"); // Redirect to admin dashboard or another appropriate page
        }
      } else if (status === "unauthenticated" && !session) {
        // router.push("/login");
      }
    };

    handleRedirect();
  }, [status, session, admin, router, pathname]);

  if (status === "loading" || status === "unauthenticated") {
    return <div>Loading...</div>; // Show loading state
  }

  // If authenticated and no redirects are needed, render children
  return <>{children}</>;
};

export default SessionWrapper;
