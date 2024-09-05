"use client";

import { CopyIcon } from "@radix-ui/react-icons";
import { Button } from "@radix-ui/themes";
import React from "react";

interface Props {
  doxyLink: string;
}

const CopyButton = ({ doxyLink }: Props) => {
  return (
    <Button variant="ghost" onClick={() => copyText(doxyLink)}>
      <CopyIcon />
    </Button>
  );
};

export default CopyButton;

function copyText(entryText: string) {
  navigator.clipboard.writeText(entryText);
}
