import { Provider } from "@prisma/client";
import { Heading, Flex, Card, Text, Box } from "@radix-ui/themes";
import React from "react";
import ProviderLink from "../_components/ProviderLink";

const ProviderDetails = ({ provider }: { provider: Provider }) => {
  return (
    <Flex direction="column" gap="3">
      <Heading>
        {provider.title} {provider?.firstName} {provider.lastName}
      </Heading>
      <Flex gap="9">
        <Text>Evaluation: {provider.evaluation}</Text>
        <Text>Follow up: {provider.followUp}</Text>
      </Flex>
      <Card className="max-w-md">
        <Text as="p">Languages: {provider.languages}</Text>
        <Text as="p">Age range: {provider.ageRange}</Text>
        <Text as="p">Working hours: {provider.workingHours}</Text>
      </Card>
      <ProviderLink doxyLink={provider.link} size="3" />
    </Flex>
  );
};

export default ProviderDetails;
