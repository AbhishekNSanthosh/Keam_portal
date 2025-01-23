import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

import User from "@models/User";
import { connectToDB } from "@utils/database";

declare module "next-auth" {
  interface Session {
    user: {
      _id?: string;
      email?: string | null;
      dob?: string | null;
      isAttempted?: boolean | false;
      isAdmin?: boolean | false;
      score?: number | null;
      isSubmitted?: boolean | false;
    };
  }
}

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: "Email and DOB Login",
      credentials: {
        email: { label: "Email", type: "text" },
        dob: { label: "Date of Birth", type: "date" },
      },
      async authorize(credentials) {
        await connectToDB();

        if (!credentials || !credentials.email || !credentials.dob) {
          throw new Error(
            JSON.stringify({
              message: "Credentials not provided",
              desc: "Please provide both email and date of birth",
            })
          );
        }

        try {
          // Find the user with the provided email and dob
          const userExist = await User.findOne({
            email: credentials.email,
            dob: credentials.dob,
          });

          if (!userExist) {
            throw new Error(
              JSON.stringify({
                message: "Invalid Credentials",
                desc: "Email or date of birth is incorrect. Please try again.",
              })
            );
          }

          // Return the user object for session handling
          return {
            id: userExist._id.toString(),
            email: userExist.email,
            dob: userExist.dob,
            isAttempted: userExist.isAttempted || false,
            score: userExist.score || 0,
          };
        } catch (err: any) {
          throw new Error(
            JSON.stringify({
              message: "Internal Server Error",
              desc: "An unexpected error occurred. Please try again later.",
            })
          );
        }
      },
    }),
  ],
  callbacks: {
    async session({ session, token }) {
      if (token && token.sub) {
        await connectToDB();
        const sessionUser = await User.findById(token.sub);

        if (sessionUser) {
          session.user = {
            _id: sessionUser._id.toString(),
            email: sessionUser.email,
            dob: sessionUser.dob,
            isAttempted: sessionUser.isAttempted,
            score: sessionUser.score,
          };
        }
      }
      return session;
    },
    async jwt({ token, user }) {
      if (user) {
        token.sub = (user as any)._id;
      }
      return token;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
});

export { handler as GET, handler as POST };
