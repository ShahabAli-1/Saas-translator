"use client";

import { SessionProvider } from "next-auth/react";

// the layout .tsx is a server component so we cant do the authentication stuf
// on it. SO WE CREATE THIS CLIENT COMPONENT
// and wrap it around layout tsx then we have
// access to session, useSession etc
export default function ClientProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return <SessionProvider>{children}</SessionProvider>;
}
