import prisma from "@/prisma/client";
import { compare } from "bcrypt";
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { NextAuthOptions } from "next-auth";

export const authOptions: NextAuthOptions = {
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
      authorize: async (credentials) => {
        if (!credentials) return null;

        // Find user in the database by username
        const user = await prisma.user.findUnique({
          where: {
            username: credentials.username,
          },
        });

        // Check if the user exists and the password is valid
        if (user && (await compare(credentials.password, user.password))) {
          return {
            id: user.id,
            username: user.username,
            firstName: user.firstName,
            lastName: user.lastName,
            gender: user.gender,
            title: user.title,
            email: user.email || undefined,
            nickname: user.nickname,
            role: user.role,
          };
        } else {
          return null;
        }
      },
    }),
  ],
  pages: {
    signIn: "/login", // Custom login page
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.username = user.username;
        token.firstName = user.firstName;
        token.lastName = user.lastName;
        token.gender = user.gender;
        token.title = user.title;
        token.email = user.email;
        (token.nickname = user.nickname), (token.role = user.role);
      }
      return token;
    },
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
          nickname: token.nickname as string,
          role: token.role as string,
        };
      }
      return session;
    },
  },
};
