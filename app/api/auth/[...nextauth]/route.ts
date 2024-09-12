import { authOptions } from "@/app/auth/authOptions";
import NextAuth from "next-auth";

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

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
