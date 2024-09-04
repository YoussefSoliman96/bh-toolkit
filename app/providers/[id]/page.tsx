import prisma from "@/prisma/client";
import { Box, Flex, Grid } from "@radix-ui/themes";
import { notFound } from "next/navigation";
import EditProviderButton from "./EditProviderButton";
import ProviderDetails from "./ProviderDetails";
import DeleteProviderButton from "./DeleteProviderButton";

interface Props {
  params: { id: string };
}

const ProviderDetailPage = async ({ params }: Props) => {
  const provider = await prisma.provider.findUnique({
    where: {
      id: parseInt(params.id),
    },
  });

  if (!provider) notFound();
  return (
    <Grid columns={{ initial: "1", sm: "5" }} gap="5">
      <Box className="md:col-span-4">
        <ProviderDetails provider={provider} />
      </Box>
      <Box>
        <Flex direction="column" gap="4">
          <EditProviderButton providerId={provider.id} />
          <DeleteProviderButton providerId={provider.id} />
        </Flex>
      </Box>
    </Grid>
  );
};

export default ProviderDetailPage;
