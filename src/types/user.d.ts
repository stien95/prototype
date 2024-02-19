import { Post, Rating, User as prismaUserModal, Role } from "@prisma/client";
import NextAuth from "next-auth";
declare module "next-auth" {
  interface User {
    id: string;
    username: string;
  }
  interface Session {
    user: User;
    token: User;
  }
}
