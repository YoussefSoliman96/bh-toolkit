import { Button, Flex } from "@radix-ui/themes";
import Link from "next/link";
import React from "react";
import ProviderFilter from "./ProviderFilter";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/auth/authOptions";

const ProviderActions = async () => {
  const session = await getServerSession(authOptions);
  return (
    <Flex justify="between">
      <ProviderFilter />
      {session && (
        <Button>
          <Link href="/providers/new">New provider</Link>
        </Button>
      )}
    </Flex>
  );
};

export default ProviderActions;
