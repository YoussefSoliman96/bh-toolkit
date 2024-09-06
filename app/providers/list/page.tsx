import prisma from "@/prisma/client";
import { Provider, Role } from "@prisma/client";
import ProviderActions from "./ProviderActions";
import ProviderTable, { columnNames, ProviderQuery } from "./ProviderTable";
import { Flex } from "@radix-ui/themes";

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
      <ProviderTable providers={providers} searchParams={searchParams} />
    </Flex>
  );
};

export const dynamic = "force-dynamic";

export default ProvidersPage;
