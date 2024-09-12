import { userSchema } from "@/app/validationSchemas";
import prisma from "@/prisma/client";
import { hash } from "bcrypt";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const body = await request.json();
  const validation = userSchema.safeParse(body);
  if (!validation.success)
    return NextResponse.json(
      { error: validation.error.errors },
      { status: 400 }
    );
  const hashedPassword = await hash(body.password, 10);
  const newUser = await prisma.user.create({
    data: {
      firstName: body.firstName,
      lastName: body.lastName,
      username: body.username,
      nickname: body.nickname,
      password: hashedPassword,
      title: body.title,
      gender: body.gender,
      role: body.role,
      email: body.email,
    },
  });

  return NextResponse.json(newUser, { status: 201 });
}
