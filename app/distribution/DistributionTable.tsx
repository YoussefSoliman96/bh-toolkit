import { Provider as PrismaProvider, Role } from "@prisma/client";
import { ArrowUpIcon } from "@radix-ui/react-icons";
import { Link, Table } from "@radix-ui/themes";
import NextLink from "next/link";
import ProviderRoleBadge from "../providers/list/ProviderRoleBadge";

interface ProviderWithHandler extends PrismaProvider {
  handler: {
    name: string;
  } | null;
}

export interface ProviderQuery {
  role: Role;
  orderBy: keyof ProviderWithHandler;
  query: string;
}

interface Props {
  searchParams: ProviderQuery;
  providers: ProviderWithHandler[];
}

const DistributionTable = async ({ searchParams, providers }: Props) => {
  return (
    <>
      <Table.Root>
        <Table.Header>
          <Table.Row>
            {columns.map((column) => (
              <Table.ColumnHeaderCell
                key={column.value}
                className={column.className}
              >
                <NextLink
                  href={{
                    query: { ...searchParams, orderBy: column.value },
                  }}
                >
                  {column.label}
                </NextLink>
                {column.value === searchParams.orderBy && (
                  <ArrowUpIcon className="inline" />
                )}
              </Table.ColumnHeaderCell>
            ))}
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
                {provider.handler?.name}
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table.Root>
    </>
  );
};
export default DistributionTable;

const columns = [
  { label: "Name", value: "firstName" },
  { label: "Role", value: "role", className: "hidden md:table-cell" },
  { label: "Handler", value: "handler", className: "hidden md:table-cell" },
  // { label: "Scheduler", value: "scheduler", className: "hidden md:table-cell" },
  // {
  //   label: "Transcriber",
  //   value: "Transcriber",
  //   className: "hidden md:table-cell",
  // },
];

export const columnNames = columns.map((column) => column.value);
