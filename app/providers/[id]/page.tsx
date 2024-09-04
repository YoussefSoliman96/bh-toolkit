import prisma from "@/prisma/client";
import { Box, Grid } from "@radix-ui/themes";
import { notFound } from "next/navigation";
import EditProviderButton from "./EditProviderButton";
import ProviderDetails from "./ProviderDetails";

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
    <Grid columns={{ initial: "1", md: "2" }} gap="5">
      <Box>
        <ProviderDetails provider={provider} />
      </Box>
      <Box>
        <EditProviderButton providerId={provider.id} />
      </Box>
    </Grid>
  );
};

export default ProviderDetailPage;
