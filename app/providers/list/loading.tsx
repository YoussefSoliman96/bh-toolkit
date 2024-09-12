import { Table } from "@radix-ui/themes";
import { Skeleton } from "../../components";

const LoadingProvidersPage = () => {
  const providers = [1, 2, 3, 4, 5];
  return (
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
            Evaluation
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
            Link
          </Table.ColumnHeaderCell>
        </Table.Row>
      </Table.Header>

      <Table.Body>
        {providers.map((provider) => (
          <Table.Row key={provider}>
            <Table.Cell>
              <Skeleton />
            </Table.Cell>
            <Table.Cell className="hidden md:table-cell">
              <Skeleton />
            </Table.Cell>
            <Table.Cell className="hidden md:table-cell">
              <Skeleton />
            </Table.Cell>
            <Table.Cell className="hidden md:table-cell">
              <Skeleton />
            </Table.Cell>
            <Table.Cell className="hidden md:table-cell">
              <Skeleton />
            </Table.Cell>
            <Table.Cell className="hidden md:table-cell">
              <Skeleton />
            </Table.Cell>
            <Table.Cell className="hidden md:table-cell">
              <Skeleton />
            </Table.Cell>
            <Table.Cell className="hidden md:table-cell">
              <Skeleton />
            </Table.Cell>
            <Table.Cell className="hidden md:table-cell">
              <Skeleton />
            </Table.Cell>
          </Table.Row>
        ))}
      </Table.Body>
    </Table.Root>
  );
};

export default LoadingProvidersPage;
