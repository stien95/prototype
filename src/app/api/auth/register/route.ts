import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import prisma from "@/libs/db";
import { signUpSchema } from "@/schemas/authSchemas";
import { ZodError } from "zod";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { username, email, password, name } = signUpSchema.parse(body);
    if (!username || !email || !password) {
      return new NextResponse("Missing information", {
        status: 400,
      });
    }
    const hashedPassword = await bcrypt.hash(password, 12);
    const user = await prisma.user.create({
      data: {
        name,
        username,
        email,
        password: hashedPassword,
      },
    });
    return NextResponse.json(user);
  } catch (error) {
    console.error("[POSTING_SIGNUP]", error);
    if (error instanceof ZodError) {
      return new NextResponse("Invalid Data", {
        status: 400,
      });
    }
    return new NextResponse("Internal Error", {
      status: 500,
    });
  }
}
