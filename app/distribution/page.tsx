import { Role, Provider } from "@prisma/client";
import { Table } from "@radix-ui/themes";
import React from "react";
import NextLink from "next/link";
import { ArrowUpIcon } from "@radix-ui/react-icons";

export interface ProviderQuery {
  role: Role;
  orderBy: keyof Provider;
  query: string;
}

interface Props {
  searchParams: ProviderQuery;
  providers: Provider[];
}

const DistributionPage = ({ searchParams, providers }: Props) => {
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
      </Table.Root>
    </>
  );
};
export default DistributionPage;

const columns = [
  { label: "Name", value: "firstName" },
  { label: "Handler", value: "handler", className: "hidden md:table-cell" },
  { label: "Scheduler", value: "scheduler", className: "hidden md:table-cell" },
  {
    label: "Transcriber",
    value: "Transcriber",
    className: "hidden md:table-cell",
  },
];

export const columnNames = columns.map((column) => column.value);
