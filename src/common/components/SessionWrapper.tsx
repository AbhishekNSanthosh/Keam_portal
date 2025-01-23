"use client";

import { useSession } from "next-auth/react";

const SessionWrapper = ({ children }: { children: React.ReactNode }) => {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return <div>Loading...</div>;
  }
  // else if (status === "unauthenticated") {
  //   return <div>Unauthenticated</div>;
  // }

  return <>{children}</>;
};

export default SessionWrapper;
