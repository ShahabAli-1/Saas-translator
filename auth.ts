import { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { FirestoreAdapter } from "@auth/firebase-adapter";
import { adminDB } from "./firebase-admin";
import { adminAuth } from "./firebase-admin";
export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  // by default next auth returns name, email,image
  // on auth, we want to append id into it.
  callbacks: {
    session: async ({ session, token }) => {
      if (session?.user) {
        if (token.sub) {
          session.user.id = token.sub;
          // Now we want to create custom token to
          // for the user to use that token to authenticate
          // on firebase
          const firebaseToken = await adminAuth.createCustomToken(token.sub);
          session.firebaseToken = firebaseToken;
        }
      }
      return session;
    },
    jwt: async ({ user, token }) => {
      if (user) {
        token.sub = user.id;
      }
      return token;
    },
  },
  // this code below adds the account and user details
  // to firestore on sign in automatically
  session: {
    strategy: "jwt",
  },
  adapter: FirestoreAdapter(adminDB),
} satisfies NextAuthOptions;
