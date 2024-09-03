import prisma from "@/prisma/client";
import { Button, Table } from "@radix-ui/themes";
import {
  Header,
  Row,
  ColumnHeaderCell,
  RowHeaderCell,
  Cell,
} from "@radix-ui/themes/src/components/table.jsx";
import Link from "next/link";
import { Root } from "postcss";
import React from "react";

const ProvidersPage = async () => {
  const providers = await prisma.provider.findMany();
  return (
    <div>
      <div className="mb-5">
        <Button>
          <Link href="/providers/new">New provider</Link>
        </Button>
      </div>
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
                {`${provider.title} ${provider.firstName} ${provider.lastName}`}
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

export default ProvidersPage;
