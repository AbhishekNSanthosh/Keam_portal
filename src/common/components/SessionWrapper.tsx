"use client";

import { useSession } from "next-auth/react";

const SessionWrapper = ({
  admin,
  children,
}: {
  admin?: boolean;
  children: React.ReactNode;
}) => {
  const { data: session, status } = useSession();
  console.log(session, status);

  if (status === "loading") {
    return <div>Loading...</div>;
  } else if (status === "unauthenticated") {
    return <div>Unauthenticated</div>;
  } else {
    if (admin! && !session?.user?.isAdmin) {
      return <div>No Admin Access</div>;
    }
  }

  return <>{children}</>;
};

export default SessionWrapper;
