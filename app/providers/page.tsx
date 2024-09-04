import prisma from "@/prisma/client";
import { Table } from "@radix-ui/themes";
import Link from "../components/Link";
import ProviderActions from "./ProviderActions";
const ProvidersPage = async () => {
  const providers = await prisma.provider.findMany();

  return (
    <div>
      <ProviderActions />
      <Table.Root variant="surface">
        <Table.Header>
          <Table.Row>
            <Table.ColumnHeaderCell>Name</Table.ColumnHeaderCell>
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
                {provider.gender}
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
            </Table.Row>
          ))}
        </Table.Body>
      </Table.Root>
    </div>
  );
};

export const dynamic = "force-dynamic";

export default ProvidersPage;
