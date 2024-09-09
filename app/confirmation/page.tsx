import prisma from "@/prisma/client";
import { Card, Flex, Select, Text } from "@radix-ui/themes";
import { Metadata } from "next";
import React from "react";

const ConfirmationMessage = async () => {
  const providers = await prisma.provider.findMany();

  return (
    <Flex justify="between">
      <Select.Root>
        <Select.Trigger placeholder="Choose provider" />
        <Select.Content>
          {providers.map((provider) => (
            <Select.Item key={provider.id} value={provider.firstName}>
              {provider.firstName}
            </Select.Item>
          ))}
        </Select.Content>
      </Select.Root>
      <Card className="max-w-md">
        <Text as="p">Hi</Text>
      </Card>
    </Flex>
  );
};

export const metadata: Metadata = {
  title: "Brain Health - Confirmation",
};

export default ConfirmationMessage;
