"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

const SessionWrapper = ({
  admin,
  children,
}: {
  admin?: boolean;
  children: React.ReactNode;
}) => {
  const { data: session, status } = useSession();
  console.log(session, status);
  const router = useRouter();

  if (status === "loading") {
    return <div>Loading...</div>;
  } else if (status === "unauthenticated" && admin!) {
      router.push('/admin/login')
  } else {
    if (admin! && !session?.user?.isAdmin) {
      router.push('/admin/login')
      return <div>No Admin Access</div>;
    }
  }

  return <>{children}</>;
};

export default SessionWrapper;
