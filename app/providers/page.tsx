import { Button } from "@radix-ui/themes";
import Link from "next/link";
import React from "react";

const ProvidersPage = () => {
  return (
    <div>
      <Button>
        <Link href="/providers/new">New provider</Link>
      </Button>
    </div>
  );
};

export default ProvidersPage;
