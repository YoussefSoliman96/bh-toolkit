import { providerSchema } from "@/app/validationSchemas";
import prisma from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

export async function POST(request: NextRequest) {
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
    },
  });

  return NextResponse.json(newProvider, { status: 201 });
}
