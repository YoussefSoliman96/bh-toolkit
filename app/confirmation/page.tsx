import prisma from "@/prisma/client";
import { Metadata } from "next";
import ProviderSelector from "./ProviderSelector";

const ConfirmationMessage = async () => {
  const providers = await prisma.provider.findMany();

  return <ProviderSelector providers={providers} />;
};

export const metadata: Metadata = {
  title: "Brain Health - Confirmation",
};

export default ConfirmationMessage;
