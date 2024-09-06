"use client";

import prisma from "@/prisma/client";
import { Provider } from "@prisma/client";
import { MagnifyingGlassIcon } from "@radix-ui/react-icons";
import { Box, TextField } from "@radix-ui/themes";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useState } from "react";

const SearchBar = () => {
  const searchParams = useSearchParams();

  const router = useRouter();

  const handleSearch = (searchTerm: string) => {
    const params = new URLSearchParams();
    if (searchTerm) params.append("query", searchTerm);
    if (searchParams.get("orderBy"))
      params.append("orderBy", searchParams.get("orderBy")!);
    if (searchParams.get("role"))
      params.append("role", searchParams.get("role")!);

    const query = params.size ? "?" + params.toString() : "";
    router.push("/providers/list" + query);
  };
  return (
    <Box>
      <TextField.Root
        placeholder="Search providers"
        onChange={(e) => handleSearch(e.target.value)}
      >
        <TextField.Slot>
          <MagnifyingGlassIcon height="16" width="16" />
        </TextField.Slot>
      </TextField.Root>
    </Box>
  );
};

export default SearchBar;
