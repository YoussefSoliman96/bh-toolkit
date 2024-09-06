import React from "react";
import ProviderForm from "../../_components/ProviderForm";
import prisma from "@/prisma/client";
import { notFound } from "next/navigation";
import { Metadata } from "next";

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

export const metadata: Metadata = {
  title: "Brain Health - Edit Provider",
};
export default EditProviderPage;
