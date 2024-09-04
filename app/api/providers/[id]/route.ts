import { providerSchema } from "@/app/validationSchemas";
import prisma from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";

interface Props {
  params: { id: string };
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const body = await request.json();
  const validation = providerSchema.safeParse(body);
  if (!validation.success)
    return NextResponse.json(validation.error.format(), { status: 400 });

  const provider = await prisma.provider.findUnique({
    where: { id: parseInt(params.id) },
  });
  if (!provider)
    NextResponse.json({ error: "Invalid provider" }, { status: 404 });
  const updatedProvider = await prisma.provider.update({
    where: {
      id: provider?.id,
    },
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
  return NextResponse.json(updatedProvider);
}
