import { Provider, Role } from "@prisma/client";
import { ArrowUpIcon } from "@radix-ui/react-icons";
import { Table } from "@radix-ui/themes";
import NextLink from "next/link";
import Link from "../../components/Link";
import ProviderLink from "../_components/ProviderLink";
import ProviderRoleBadge from "./ProviderRoleBadge";

export interface ProviderQuery {
  role: Role;
  orderBy: keyof Provider;
  query: string;
}

interface Props {
  searchParams: ProviderQuery;
  providers: Provider[];
}

const ProviderTable = ({ searchParams, providers }: Props) => {
  return (
    <Table.Root variant="surface">
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
              <Link target="_blank" href={`/providers/${provider.id}`}>
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
              <ProviderLink doxyLink={provider.link} size="2" />
            </Table.Cell>
          </Table.Row>
        ))}
      </Table.Body>
    </Table.Root>
  );
};

export default ProviderTable;

function capitalizeFirstLetter(string: string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

const columns = [
  { label: "Name", value: "firstName" },
  { label: "Role", value: "role", className: "hidden md:table-cell" },
  { label: "Gender", value: "gender", className: "hidden md:table-cell" },
  {
    label: "Evaluation",
    value: "evaluation",
    className: "hidden md:table-cell",
  },
  {
    label: "Follow Up",
    value: "followUp",
    className: "hidden md:table-cell",
  },
  {
    label: "Languages",
    value: "languages",
    className: "hidden md:table-cell",
  },
  {
    label: "Age Range",
    value: "ageRange",
    className: "hidden md:table-cell",
  },
  {
    label: "Working Hours",
    value: "workingHours",
    className: "hidden md:table-cell",
  },
  { label: "Link", value: "link", className: "hidden md:table-cell" },
];

export const columnNames = columns.map((column) => column.value);
