import prisma from "@/prisma/client";
import { compare } from "bcrypt";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaAdapter } from "@next-auth/prisma-adapter";

declare module "next-auth" {
  interface User {
    id: string;
    username: string;
    firstName: string;
    lastName: string;
    gender: string;
    title: string;
    email?: string;
  }

  interface Session {
    user: User;
  }
}

const handler = NextAuth({
  session: {
    strategy: "jwt",
  },
  adapter: PrismaAdapter(prisma),
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
            email: user.email || undefined,
          };
        } else {
          // If login fails, return null
          return null;
        }
      },
    }),
  ],
  pages: {
    signIn: "/login", // Custom login page
  },
  callbacks: {
    // Custom JWT callback to include user data in the token
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.username = user.username;
        token.firstName = user.firstName;
        token.lastName = user.lastName;
        token.gender = user.gender;
        token.title = user.title;
        token.email = user.email;
      }
      return token;
    },
    // Custom session callback to include user data in the session
    async session({ session, token }) {
      if (token) {
        session.user = {
          id: token.id as string,
          username: token.username as string,
          firstName: token.firstName as string,
          lastName: token.lastName as string,
          gender: token.gender as string,
          title: token.title as string,
          email: token.email as string,
        };
      }
      return session;
    },
  },
});

export { handler as GET, handler as POST };
