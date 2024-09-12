import { authOptions } from "@/app/auth/authOptions";
import prisma from "@/prisma/client";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const session = getServerSession(authOptions);
  if (!session) return NextResponse.json({}, { status: 401 });
  const schedulers = await prisma.scheduler.findMany({
    include: {
      provider: true,
    },
  });
  return NextResponse.json(schedulers, { status: 200 });
}
