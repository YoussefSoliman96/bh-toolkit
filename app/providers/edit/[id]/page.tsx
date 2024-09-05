import React from "react";
import ProviderForm from "../../_components/ProviderForm";
import prisma from "@/prisma/client";
import { notFound } from "next/navigation";

interface Props {
  params: { id: string };
}

const EditProviderPage = async ({ params }: Props) => {
  const provider = await prisma.provider.findUnique({
    where: { id: parseInt(params.id) },
  });
  if (!provider) notFound();
  return <ProviderForm provider={provider} />;
};

export default EditProviderPage;
