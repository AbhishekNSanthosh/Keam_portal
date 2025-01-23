import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

import User from "@models/User";
import { connectToDB } from "@utils/database";

// Extend the NextAuth session interface
declare module "next-auth" {
  interface Session {
    user: {
      id?: string;
      email?: string | null;
      dob?: string | null;
      firstName?: string;
      lastName?: string;
      phone?: string;
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

        if (!credentials?.email || !credentials.dob) {
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
            firstName: userExist.firstName,
            lastName: userExist.lastName,
            phone: userExist.phone,
            isAttempted: userExist.isAttempted || false,
            isAdmin: userExist.isAdmin || false,
            score: userExist.score || 0,
            isSubmitted: userExist.isSubmitted || false,
          };
        } catch (err: any) {
          const errorMessages = JSON.parse(err.message);

          // Ensure the error message is passed correctly
          throw new Error(
            JSON.stringify({
              message: errorMessages.message || "Internal Server Error",
              desc: errorMessages.desc || "An unexpected error occurred. Please try again later.",
            })
          );
        }
      },
    }),
  ],
  callbacks: {
    async session({ session, token }) {
      // Ensure the token has the user ID
      if (token && token.sub) {
        await connectToDB();
        const sessionUser = await User.findById(token.sub);
        if (sessionUser) {
          // Populate the session user object with all properties
          session.user = {
            id: sessionUser._id.toString(),
            email: sessionUser.email,
            dob: sessionUser.dob,
            firstName: sessionUser.firstName,
            lastName: sessionUser.lastName,
            phone: sessionUser.phone,
            isAttempted: sessionUser.isAttempted || false,
            isAdmin: sessionUser.isAdmin || false,
            score: sessionUser.score || 0,
            isSubmitted: sessionUser.isSubmitted || false,
          };
        }
      }
      return session; // Return the updated session
    },
    async jwt({ token, user }) {
      if (user) {
        // Store user ID and other properties in the token
        token.sub = user.id; // Use the id from the user object
        token.isAdmin = (user as any).isAdmin;
        token.firstName = (user as any).firstName;
        token.lastName = (user as any).lastName;
        token.phone = (user as any).phone;
      }
      return token; // Return the updated token
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
});

export { handler as GET, handler as POST };