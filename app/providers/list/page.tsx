import prisma from "@/prisma/client";
import { Provider, Role } from "@prisma/client";
import ProviderActions from "./ProviderActions";
import ProviderTable, { columnNames, ProviderQuery } from "./ProviderTable";
import { Box, Flex, Slot, TextField } from "@radix-ui/themes";
import { Metadata } from "next";
import { MagnifyingGlassIcon } from "@radix-ui/react-icons";
import { Root } from "postcss";
import SearchBar from "../_components/SearchBar";

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

  const filteredProviders = searchParams.query
    ? providers.filter((provider) => {
        return provider.firstName
          .toLowerCase()
          .includes(searchParams.query.toLowerCase())
          ? provider.firstName
              .toLowerCase()
              .includes(searchParams.query.toLowerCase())
          : provider.lastName
              .toLowerCase()
              .includes(searchParams.query.toLowerCase());
      })
    : providers;

  return (
    <Flex direction="column" gap="3">
      <ProviderActions />
      <SearchBar />
      <ProviderTable
        providers={filteredProviders}
        searchParams={searchParams}
      />
    </Flex>
  );
};

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Brain Health - Providers",
};
export default ProvidersPage;
