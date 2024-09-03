import prisma from "@/prisma/client";
import { notFound } from "next/navigation";
import React from "react";

interface Props {
  params: { id: string };
}

const ProviderDetailPage = async ({ params }: Props) => {
  if (typeof params.id !== "number") notFound();

  const provider = await prisma.provider.findUnique({
    where: {
      id: parseInt(params.id),
    },
  });

  if (!provider) notFound();
  return (
    <div>
      <p>
        {provider.title} {provider?.firstName} {provider.lastName}
      </p>
      <p>Evaluation: {provider.evaluation}</p>
      <p>Follow up: {provider.followUp}</p>
      <p>Languages: {provider.languages}</p>
      <p>Age range: {provider.ageRange}</p>
      <p>Working hours: {provider.workingHours}</p>
    </div>
  );
};

export default ProviderDetailPage;
