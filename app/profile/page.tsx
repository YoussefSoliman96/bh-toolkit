"use client";

import { Flex, Heading, Card, Text } from "@radix-ui/themes";
import React from "react";
import ProviderLink from "../providers/_components/ProviderLink";
import { useSession } from "next-auth/react";

const Profile = () => {
  const { status, data: session } = useSession();
  const user = session?.user;
  return (
    <Flex direction="column" gap="3">
      <Heading>
        {user?.firstName} {user?.lastName}
      </Heading>
      <Card className="max-w-md">
        <Text as="p">Username: {user?.username}</Text>
        <Text as="p">Title: {user?.title}</Text>
        <Text as="p">Email: {user?.email}</Text>
      </Card>
    </Flex>
  );
};

export default Profile;
