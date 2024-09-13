"use client";

import { MagnifyingGlassIcon } from "@radix-ui/react-icons";
import { Box, TextField } from "@radix-ui/themes";
import { useRouter, useSearchParams } from "next/navigation";
import { useDebouncedCallback } from "use-debounce";

const RestrictionsSearchBar = () => {
  const searchParams = useSearchParams();

  const router = useRouter();

  const handleSearch = useDebouncedCallback((searchTerm: string) => {
    const params = new URLSearchParams();
    if (searchTerm) params.append("query", searchTerm);
    if (searchParams.get("orderBy"))
      params.append("orderBy", searchParams.get("orderBy")!);
    if (searchParams.get("role"))
      params.append("role", searchParams.get("role")!);

    const query = params.size ? "?" + params.toString() : "";
    router.push("/restrictions" + query);
  }, 200);
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

export default RestrictionsSearchBar;
