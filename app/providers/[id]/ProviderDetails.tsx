import { Provider } from "@prisma/client";
import { Heading, Flex, Card, Text, Box } from "@radix-ui/themes";
import React from "react";
import ProviderLink from "../_components/ProviderLink";
import ProviderRoleBadge from "../list/ProviderRoleBadge";

const ProviderDetails = ({ provider }: { provider: Provider }) => {
  return (
    <Flex direction="column" gap="3">
      <Heading>
        {provider.title} {provider?.firstName} {provider.lastName}
      </Heading>
      <Flex gap="9">
        <ProviderRoleBadge role={provider.role} />
      </Flex>
      <Flex gap="9">
        <Text>Evaluation: {provider.evaluation}</Text>
        <Text>Follow up: {provider.followUp}</Text>
      </Flex>
      <Card className="max-w-md">
        <Text as="p">Gender: {provider.gender}</Text>
        <Text as="p">Languages: {provider.languages}</Text>
        <Text as="p">Age range: {provider.ageRange}</Text>
        <Text as="p">Working hours: {provider.workingHours}</Text>
        <Text as="p">
          {provider.suboxoneAddiction ? "Suboxone (Addiction)" : ""}
        </Text>
        <Text as="p">{provider.adhd ? "ADHD" : ""}</Text>
        <Text as="p">
          {provider.schizophreniaBipolar ? "Schizophrenia & Bipolar" : ""}
        </Text>
        <Text as="p"> {provider.clozapine ? "Clozapine" : ""}</Text>
        <Text as="p"> {provider.autism ? "Autism" : ""}</Text>
        <Text as="p">
          {provider.acceptPainManagementPts
            ? `Accept Pts on a pain management already (They will not Prescribe
          It)`
            : ""}
        </Text>
        <Text as="p">
          {provider.traumaticBrainInjury ? "Traumatic Brain Injury" : ""}
        </Text>
        <Text as="p">
          {provider.neurodegenerativeDisease
            ? "Neurode Generative Disease"
            : ""}
        </Text>
        <Text as="p">
          {provider.minorsAfterSchool ? "Minors after school" : ""}
        </Text>
      </Card>
      <ProviderLink doxyLink={provider.link} size="3" />
    </Flex>
  );
};

export default ProviderDetails;
