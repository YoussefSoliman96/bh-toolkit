import prisma from "@/prisma/client";
import { Role } from "@prisma/client";
import { Flex } from "@radix-ui/themes";
import { Metadata } from "next";

import DistributionFilter from "./DistributionFilter";
import DistributionSearchBar from "./DistributionSearchBar";
import DistributionTable, {
  columnNames,
  ProviderQuery,
} from "./DistributionTable";

interface Props {
  searchParams: ProviderQuery;
}

const DistributionPage = async ({ searchParams }: Props) => {
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
    include: {
      handler: true, // Include the related handler data
    },
  });

  const filteredProviders = searchParams.query
    ? providers.filter((provider) => {
        const query = searchParams.query.toLowerCase();
        const firstName = provider.firstName.toLowerCase();
        const lastName = provider.lastName.toLowerCase();
        const fullName = `${firstName} ${lastName}`;

        return (
          firstName.includes(query) ||
          lastName.includes(query) ||
          fullName.includes(query)
        );
      })
    : providers;

  return (
    <Flex direction="column" gap="3">
      <DistributionFilter />
      <DistributionSearchBar />
      <DistributionTable
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
export default DistributionPage;
