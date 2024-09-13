import { authOptions } from "@/app/auth/authOptions";
import { reminderSchema } from "@/app/validationSchemas";
import prisma from "@/prisma/client";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const session = getServerSession(authOptions);
  if (!session) return NextResponse.json({}, { status: 401 });
  const reminders = await prisma.reminder.findMany();
  return NextResponse.json(reminders, { status: 200 });
}

export async function POST(request: NextRequest) {
  const body = await request.json();
  const validation = reminderSchema.safeParse(body);
  if (!validation.success)
    return NextResponse.json(
      { error: validation.error.errors },
      { status: 400 }
    );
  const newReminder = await prisma.reminder.create({
    data: {
      description: body.description,
      creator: body.creator,
    },
  });
  return NextResponse.json(newReminder, { status: 201 });
}
