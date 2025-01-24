"use client";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const SessionWrapper = ({
  admin,
  children,
}: {
  admin?: boolean;
  children: React.ReactNode;
}) => {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    const checkSession = async () => {
      if (status === "unauthenticated") {
        await new Promise((resolve) => setTimeout(resolve, 1000)); // 1-second delay;
        if (admin) {
          router.push("/admin/login");
        } else {
          router.push("/login");
        }
      } else if (session?.user.isAdmin) {
        router.push("/admin");
      } else {
        router.push("/");
      }
    };

    checkSession();
  }, [status, session, admin, router]);

  if (status === "loading" || status == "unauthenticated") {
    return <div>Loading...</div>;
  }

  return <>{children}</>;
};

export default SessionWrapper;
