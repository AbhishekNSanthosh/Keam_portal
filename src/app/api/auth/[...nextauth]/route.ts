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
        try {
          await connectToDB();

          if (!credentials || !credentials.email || !credentials.dob) {
            throw new Error(
              JSON.stringify({
                message: "Missing Credentials",
                description: "Please provide both email and date of birth.",
              })
            );
          }

          const userExist = await User.findOne({
            email: credentials.email,
            dob: credentials.dob,
          });

          if (!userExist) {
            throw new Error(
              JSON.stringify({
                message: "Invalid Credentials",
                description: "Email or date of birth is incorrect. Please try again.",
              })
            );
          }

          return {
            id: userExist._id.toString(),
            email: userExist.email,
            dob: userExist.dob,
            isAttempted: userExist.isAttempted || false,
            isAdmin: userExist.isAdmin || false,
            score: userExist.score || 0,
            isSubmitted: userExist.isSubmitted || false,
          };
        } catch (err: any) {
          const errorObj = JSON.parse(err.message || "{}");
          throw new Error(
            JSON.stringify({
              message: errorObj.message || "Internal Server Error",
              description: errorObj.description || "An unexpected error occurred. Please try again later.",
            })
          );
        }
      },
    }),
  ],
  callbacks: {
    async session({ session, token }) {
      try {
        if (token && token.sub) {
          await connectToDB();
          const sessionUser = await User.findById(token.sub);

          if (sessionUser) {
            session.user = {
              _id: sessionUser._id.toString(),
              email: sessionUser.email,
              dob: sessionUser.dob,
              isAttempted: sessionUser.isAttempted,
              isAdmin: sessionUser.isAdmin,
              score: sessionUser.score,
              isSubmitted: sessionUser.isSubmitted,
            };
          }
        }
      } catch (error: any) {
        console.error("Failed to retrieve session user:", error);
      }
      return session;
    },
    async jwt({ token, user }) {
      try {
        if (user) {
          token.sub = (user as any).id;
          token.isAdmin = (user as any).isAdmin;
        }
      } catch (error) {
        console.error("Failed to assign JWT token:", error);
        token.error = "JWT token assignment failed.";
      }
      return token;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
  debug: process.env.NODE_ENV === "development", // Enable debug mode in development
});

export { handler as GET, handler as POST };
