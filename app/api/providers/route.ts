import prisma from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

const ProviderTitleEnum = z.enum(["NP", "MD", "DNP", "DO"]);
const GenderEnum = z.enum(["MALE", "FEMALE"]);

const createProviderSchema = z.object({
  firstName: z.string().min(1, { message: "First name is required" }),
  lastName: z.string().min(1, { message: "Last name is required" }),
  title: ProviderTitleEnum,
  gender: GenderEnum,
  evaluation: z.string().min(1).max(60),
  followUp: z.string().min(1).max(60),
  ageRange: z.string().min(1, { message: "Age range is required" }),
  workingHours: z.string().min(1, { message: "Working hours are required" }),
});

export async function POST(request: NextRequest) {
  const body = await request.json();
  const validation = createProviderSchema.safeParse(body);
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
    },
  });

  return NextResponse.json(newProvider, { status: 201 });
}
