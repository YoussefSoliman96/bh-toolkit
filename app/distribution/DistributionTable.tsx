import { Role, Provider } from "@prisma/client";
import { Link, Table } from "@radix-ui/themes";
import React from "react";
import NextLink from "next/link";
import { ArrowUpIcon } from "@radix-ui/react-icons";
import ProviderLink from "../providers/_components/ProviderLink";
import ProviderRoleBadge from "../providers/list/ProviderRoleBadge";
import { capitalizeFirstLetter } from "../providers/list/ProviderTable";
import prisma from "@/prisma/client";

export interface ProviderQuery {
  role: Role;
  orderBy: keyof Provider;
  query: string;
}

interface Props {
  searchParams: ProviderQuery;
  providers: Provider[];
}

const DistributionTable = async ({ searchParams, providers }: Props) => {
  const providersWithHandlers = await prisma.provider.findMany({
    include: {
      handler: true, // Include the related handler data
    },
  });
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
          {providersWithHandlers.map((provider) => (
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
