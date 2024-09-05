import prisma from "@/prisma/client";
import { Table, Flex, Button } from "@radix-ui/themes";
import Link from "../../components/Link";
import ProviderActions from "./ProviderActions";
import { Role } from "@prisma/client";
import ProviderRoleBadge from "./ProviderRoleBadge";
import { CopyIcon } from "@radix-ui/react-icons";
import CopyButton from "./CopyButton";

interface Props {
  searchParams: { role: Role };
}

const ProvidersPage = async ({ searchParams }: Props) => {
  const roles = Object.values(Role);
  const role = roles.includes(searchParams.role)
    ? searchParams.role
    : undefined;
  const providers = await prisma.provider.findMany({
    where: { role },
  });

  return (
    <div>
      <ProviderActions />
      <Table.Root variant="surface">
        <Table.Header>
          <Table.Row>
            <Table.ColumnHeaderCell>Name</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell className="hidden md:table-cell">
              Role
            </Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell className="hidden md:table-cell">
              Gender
            </Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell className="hidden md:table-cell">
              Initial
            </Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell className="hidden md:table-cell">
              Follow Up
            </Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell className="hidden md:table-cell">
              Languages
            </Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell className="hidden md:table-cell">
              Age Range
            </Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell className="hidden md:table-cell">
              Working Hours
            </Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell className="hidden md:table-cell">
              Link
            </Table.ColumnHeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          {providers.map((provider) => (
            <Table.Row key={provider.id}>
              <Table.Cell>
                <Link href={`/providers/${provider.id}`}>
                  {`${provider.title} ${provider.firstName} ${provider.lastName}`}
                </Link>
              </Table.Cell>
              <Table.Cell className="hidden md:table-cell">
                <ProviderRoleBadge role={provider.role} />
              </Table.Cell>
              <Table.Cell className="hidden md:table-cell">
                {capitalizeFirstLetter(provider.gender.toLocaleLowerCase())}
              </Table.Cell>
              <Table.Cell className="hidden md:table-cell">
                {provider.evaluation}
              </Table.Cell>
              <Table.Cell className="hidden md:table-cell">
                {provider.followUp}
              </Table.Cell>
              <Table.Cell className="hidden md:table-cell">
                {provider.languages}
              </Table.Cell>
              <Table.Cell className="hidden md:table-cell">
                {provider.ageRange}
              </Table.Cell>
              <Table.Cell className="hidden md:table-cell">
                {provider.workingHours}
              </Table.Cell>
              <Table.Cell className="hidden md:table-cell">
                <Flex gap="2">
                  {provider.link}
                  <CopyButton doxyLink={provider.link} />
                </Flex>
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table.Root>
    </div>
  );
};

export const dynamic = "force-dynamic";

export default ProvidersPage;

function capitalizeFirstLetter(string: string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}
