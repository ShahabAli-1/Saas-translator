"use client";
// higher order component to syncronize the state with
// the user, it keeps an eye on user and sessions
// and when user sign in it ads it to firebase through
// token sign in and then when user signs out
// it removes it
import { auth } from "@/firebase";
import { signInWithCustomToken } from "firebase/auth";
import { Session } from "next-auth";
import { useSession } from "next-auth/react";
import { useEffect } from "react";
async function syncFirebaseAuth(session: Session) {
  if (session && session.firebaseToken) {
    try {
      await signInWithCustomToken(auth, session.firebaseToken);
    } catch (error) {
      console.error("Error signing in with custom token", error);
    }
  } else {
    auth.signOut();
  }
}
const FirebaseAuthProvider = ({ children }: { children: React.ReactNode }) => {
  const { data: session } = useSession();

  useEffect(() => {
    if (!session) return;
    syncFirebaseAuth(session);
  }, [session]);

  return <>{children}</>;
};

export default FirebaseAuthProvider;
