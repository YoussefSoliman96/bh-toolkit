import { Button } from "@radix-ui/themes";
import Link from "next/link";
import React from "react";

const ProviderActions = () => {
  return (
    <div className="mb-5">
      <Button>
        <Link href="/providers/new">New provider</Link>
      </Button>
    </div>
  );
};

export default ProviderActions;
