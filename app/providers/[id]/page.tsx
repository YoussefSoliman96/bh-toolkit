import prisma from "@/prisma/client";
import { Card, Flex, Heading, Text } from "@radix-ui/themes";
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
    <div>
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
    </div>
  );
};

export default ProviderDetailPage;
