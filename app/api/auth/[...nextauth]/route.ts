import prisma from "@/prisma/client";
import { compare } from "bcrypt";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { title } from "process";

declare module "next-auth" {
  interface User {
    id: number;
    username: string;
    firstName: string;
    lastName: string;
    gender: string;
    title: string;
  }

  interface Session {
    user: User;
  }
}
const handler = NextAuth({
  session: {
    strategy: "jwt",
  },
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" },
      },
      authorize: async (credentials, req) => {
        // Check if credentials are available
        if (!credentials) return null;

        // Find user in the database by username
        const user = await prisma.user.findUnique({
          where: {
            username: credentials.username,
          },
        });

        // Check if the user exists and the password is valid
        if (user && (await compare(credentials.password, user.password))) {
          // Return the user object (without the password field)
          return {
            id: user.id,
            username: user.username,
            firstName: user.firstName,
            lastName: user.lastName,
            gender: user.gender,
            title: user.title,
            // You can return any other fields required by your app
          };
        } else {
          // If login fails, return null
          return null;
        }
      },
    }),
  ],
});

export { handler as GET, handler as POST };
