import { authOptions } from "@/app/auth/authOptions";
import { providerSchema } from "@/app/validationSchemas";
import prisma from "@/prisma/client";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

export async function POST(request: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({}, { status: 401 });
  const body = await request.json();
  const validation = providerSchema.safeParse(body);
  if (!validation.success)
    return NextResponse.json(
      { error: validation.error.errors },
      { status: 400 }
    );
  const newProvider = await prisma.provider.create({
    data: {
      firstName: body.firstName,
      lastName: body.lastName,
      title: body.title,
      gender: body.gender,
      evaluation: body.evaluation,
      followUp: body.followUp,
      ageRange: body.ageRange,
      workingHours: body.workingHours,
      role: body.role,
      handlerId: body.handlerId,
      schedulerId: body.schedulerId,
      transcriberId: body.transcriberId,
    },
  });

  return NextResponse.json(newProvider, { status: 201 });
}
