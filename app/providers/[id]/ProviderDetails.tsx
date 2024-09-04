import { Provider } from "@prisma/client";
import { Heading, Flex, Card, Text } from "@radix-ui/themes";
import React from "react";

const ProviderDetails = ({ provider }: { provider: Provider }) => {
  return (
    <>
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
    </>
  );
};

export default ProviderDetails;
