import prisma from "@/prisma/client";
import { Flex, Table } from "@radix-ui/themes";

const HandlersTable = async () => {
  const handlers = await prisma.handler.findMany({
    include: { provider: true },
  });
  return (
    <Table.Root variant="surface">
      <Table.Header>
        <Table.Row>
          <Table.ColumnHeaderCell>Handler</Table.ColumnHeaderCell>
          <Table.ColumnHeaderCell>Provider</Table.ColumnHeaderCell>
        </Table.Row>
      </Table.Header>
      <Table.Body>
        {handlers.map((handler) => (
          <Table.Row key={handler.id}>
            <Table.Cell>{handler.name}</Table.Cell>
            <Table.Cell>
              {handler.provider.map((provider) => (
                <Table.Row key={provider.id}>
                  {`${provider.title} ${provider.firstName} ${provider.lastName}`}{" "}
                </Table.Row>
              ))}
            </Table.Cell>
          </Table.Row>
        ))}
      </Table.Body>
    </Table.Root>
  );
};

export default HandlersTable;
