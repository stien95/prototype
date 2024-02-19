import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { AuthOptions } from "next-auth";
import prisma from "@/libs/db";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcrypt";
import NextAuth from "next-auth/next";

export const authOptions: AuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        userOrEmail: {
          label: "Email or username",
          type: "text",
          placeholder: "user | user@email.com",
        },
        password: {
          label: "Password",
          type: "password",
          placeholder: "*******",
        },
      },
      async authorize(credentials) {
        if (!credentials?.userOrEmail || !credentials?.password) {
          throw new Error("Invalid credentials");
        }
        const user = await prisma.user.findFirst({
          where: {
            OR: [
              {
                email: {
                  equals: credentials.userOrEmail,
                  mode: "insensitive",
                },
              },
              {
                username: {
                  equals: credentials.userOrEmail,
                  mode: "insensitive",
                },
              },
            ],
          },
        });
        if (!user) {
          throw new Error("Invalid credentials");
        }
        const isValidPassword = await bcrypt.compare(
          credentials.password,
          user.password
        );
        if (!isValidPassword) {
          throw new Error("Invalid credentials");
        }
        return user;
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        return {
          ...token,
          id: user.id,
          username: user.username,
        };
      }
      return token;
    },
    async session({ session, token }) {
      return {
        ...session,
        user: {
          ...session.user,
          id: token.id,
          username: token.username,
        },
      };
    },
  },
};
const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
