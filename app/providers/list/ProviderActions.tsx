import { Button, Flex } from "@radix-ui/themes";
import Link from "next/link";
import React from "react";
import ProviderFilter from "./ProviderFilter";

const ProviderActions = () => {
  return (
    <Flex justify="between">
      <ProviderFilter />
      <Button>
        <Link href="/providers/new">New provider</Link>
      </Button>
    </Flex>
  );
};

export default ProviderActions;
