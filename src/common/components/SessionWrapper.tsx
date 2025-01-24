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
    const handleRedirect = () => {
      if (status === "loading") {
        return; // Do nothing while loading
      }

      if (status === "unauthenticated") {
        return null;
      } else if (session) {
        // User is authenticated
        if (admin && !session.user.isAdmin) {
          // If admin access is required but user is not an admin
          router.push("/login");
        } else if (admin && session.user.isAdmin) {
          // Admin user can access /admin paths
          if (!pathname.startsWith("/admin")) {
            router.push("/admin"); // Redirect to admin dashboard if trying to access non-admin path
          }
        } else if (!admin && pathname.startsWith("/admin")) {
          // Non-admin user trying to access /admin path
          router.push("/"); // Redirect to home or another appropriate page
        }
      }
    };

    handleRedirect();
  }, [status, session, admin, router, pathname]);

  if (status === "loading") {
    return <div>Loading...</div>; // Show loading state
  }

  // If authenticated and no redirects are needed, render children
  return <>{children}</>;
};

export default SessionWrapper;
