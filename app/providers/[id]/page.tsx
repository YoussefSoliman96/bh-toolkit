import prisma from "@/prisma/client";
import { Pencil2Icon } from "@radix-ui/react-icons";
import { Box, Button, Card, Flex, Grid, Heading, Text } from "@radix-ui/themes";
import Link from "next/link";
import { notFound } from "next/navigation";

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
        <Heading>
          {provider.title} {provider?.firstName} {provider.lastName}
        </Heading>
        <Flex gap="9" my="2">
          <Text>Evaluation: {provider.evaluation}</Text>
          <Text>Follow up: {provider.followUp}</Text>
        </Flex>
        <Card mt="4" className="max-w-md">
          <Text as="p">Languages: {provider.languages}</Text>
          <Text as="p">Age range: {provider.ageRange}</Text>
          <Text as="p">Working hours: {provider.workingHours}</Text>
        </Card>
      </Box>
      <Box>
        <Button>
          <Pencil2Icon />
          <Link href={`/providers/${provider.id}/edit`}>Edit Provider</Link>
        </Button>
      </Box>
    </Grid>
  );
};

export default ProviderDetailPage;
