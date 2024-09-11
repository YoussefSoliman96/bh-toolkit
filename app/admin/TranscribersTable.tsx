import prisma from "@/prisma/client";
import { Table } from "@radix-ui/themes";

const TranscribersTable = async () => {
  const Transcribers = await prisma.transcriber.findMany({
    include: { provider: true },
  });
  return (
    <Table.Root variant="surface">
      <Table.Header>
        <Table.Row>
          <Table.ColumnHeaderCell>Transcriber</Table.ColumnHeaderCell>
          <Table.ColumnHeaderCell>Provider</Table.ColumnHeaderCell>
        </Table.Row>
      </Table.Header>
      <Table.Body>
        {Transcribers.map((transcriber) => (
          <Table.Row key={transcriber.id}>
            <Table.Cell>{transcriber.name}</Table.Cell>
            <Table.Cell>
              {transcriber.provider.map((provider) => (
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

export default TranscribersTable;
