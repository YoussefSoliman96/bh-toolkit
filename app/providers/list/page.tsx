import prisma from "@/prisma/client";
import { Provider, Role } from "@prisma/client";
import ProviderActions from "./ProviderActions";
import ProviderTable, { columnNames, ProviderQuery } from "./ProviderTable";
import { Box, Flex, Slot, TextField } from "@radix-ui/themes";
import { Metadata } from "next";
import { MagnifyingGlassIcon } from "@radix-ui/react-icons";
import { Root } from "postcss";

interface Props {
  searchParams: ProviderQuery;
}

const ProvidersPage = async ({ searchParams }: Props) => {
  const roles = Object.values(Role);
  const role = roles.includes(searchParams.role)
    ? searchParams.role
    : undefined;

  const orderBy = columnNames.includes(searchParams.orderBy)
    ? { [searchParams.orderBy]: "asc" }
    : undefined;
  const providers = await prisma.provider.findMany({
    where: { role },
    orderBy,
  });

  return (
    <Flex direction="column" gap="3">
      <ProviderActions />
      <Box>
        <TextField.Root placeholder="Search the docs…">
          <TextField.Slot>
            <MagnifyingGlassIcon height="16" width="16" />
          </TextField.Slot>
        </TextField.Root>
      </Box>
      <ProviderTable providers={providers} searchParams={searchParams} />
    </Flex>
  );
};

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Brain Health - Providers",
};
export default ProvidersPage;
