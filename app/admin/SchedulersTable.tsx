import prisma from "@/prisma/client";
import { Table } from "@radix-ui/themes";

const SchedulersTable = async () => {
  const schedulers = await prisma.scheduler.findMany({
    include: { provider: true },
  });
  return (
    <Table.Root variant="surface">
      <Table.Header>
        <Table.Row>
          <Table.ColumnHeaderCell>Scheduler</Table.ColumnHeaderCell>
          <Table.ColumnHeaderCell>Provider</Table.ColumnHeaderCell>
        </Table.Row>
      </Table.Header>
      <Table.Body>
        {schedulers.map((scheduler) => (
          <Table.Row key={scheduler.id}>
            <Table.Cell>{scheduler.name}</Table.Cell>
            <Table.Cell>
              {scheduler.provider.map((provider) => (
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

export default SchedulersTable;
