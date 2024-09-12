import prisma from "@/prisma/client";
import { Box, Flex, Grid } from "@radix-ui/themes";
import { notFound } from "next/navigation";
import { cache } from "react";
import DeleteProviderButton from "./DeleteProviderButton";
import EditProviderButton from "./EditProviderButton";
import ProviderDetails from "./ProviderDetails";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/auth/authOptions";

interface Props {
  params: { id: string };
}

const fetchProvider = cache((providerId: number) =>
  prisma.provider.findUnique({ where: { id: providerId } })
);

const ProviderDetailPage = async ({ params }: Props) => {
  const session = await getServerSession(authOptions);
  const provider = await fetchProvider(parseInt(params.id));

  if (!provider) notFound();
  return (
    <Grid columns={{ initial: "1", sm: "5" }} gap="5">
      <Box className="md:col-span-4">
        <ProviderDetails provider={provider} />
      </Box>
      {session && (
        <Box>
          <Flex direction="column" gap="4">
            <EditProviderButton providerId={provider.id} />
            <DeleteProviderButton providerId={provider.id} />
          </Flex>
        </Box>
      )}
    </Grid>
  );
};

export async function generateMetadata({ params }: Props) {
  const provider = await fetchProvider(parseInt(params.id));
  return {
    title: `${provider?.title} ${provider?.firstName} ${provider?.lastName}`,
  };
}

export default ProviderDetailPage;
