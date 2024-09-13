import { Provider, Role } from "@prisma/client";
import { ArrowUpIcon, ExternalLinkIcon } from "@radix-ui/react-icons";
import { Flex, Table } from "@radix-ui/themes";
import NextLink from "next/link";
import { Link } from "../components";
import ProviderRoleBadge from "../providers/list/ProviderRoleBadge";
import ProviderLink from "../providers/_components/ProviderLink";

export interface ProviderQuery {
  role: Role;
  orderBy: keyof Provider;
  query: string;
}

interface Props {
  searchParams: ProviderQuery;
  providers: Provider[];
}

const RestrictionsTable = ({ searchParams, providers }: Props) => {
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
              <Link href={`/providers/${provider.id}`}>
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
              {provider.suboxoneAddiction ? "Yes" : "No"}
            </Table.Cell>
            <Table.Cell className="hidden md:table-cell">
              {provider.adhd ? "Yes" : "No"}
            </Table.Cell>
            <Table.Cell className="hidden md:table-cell">
              {provider.schizophreniaBipolar ? "Yes" : "No"}
            </Table.Cell>
            <Table.Cell className="hidden md:table-cell">
              {provider.clozapine ? "Yes" : "No"}
            </Table.Cell>
            <Table.Cell className="hidden md:table-cell">
              {provider.autism ? "Yes" : "No"}
            </Table.Cell>
            <Table.Cell className="hidden md:table-cell">
              {provider.acceptPainManagementPts ? "Yes" : "No"}
            </Table.Cell>
            <Table.Cell className="hidden md:table-cell">
              {provider.traumaticBrainInjury ? "Yes" : "No"}
            </Table.Cell>
            <Table.Cell className="hidden md:table-cell">
              {provider.neurodegenerativeDisease ? "Yes" : "No"}
            </Table.Cell>
            <Table.Cell className="hidden md:table-cell">
              {provider.minorsAfterSchool ? "Yes" : "No"}
            </Table.Cell>
          </Table.Row>
        ))}
      </Table.Body>
    </Table.Root>
  );
};

export default RestrictionsTable;

export function capitalizeFirstLetter(string: string) {
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

  {
    label: "Suboxone Addiction",
    value: "suboxoneAddiction",
    className: "hidden md:table-cell",
  },

  { label: "ADHD", value: "adhd", className: "hidden md:table-cell" },

  {
    label: "schizophrenia & Bipolar",
    value: "schizophreniaBipolar",
    className: "hidden md:table-cell",
  },

  { label: "Clozapine", value: "clozapine", className: "hidden md:table-cell" },

  { label: "Autism", value: "autism", className: "hidden md:table-cell" },

  {
    label: "Accept Pts on a pain management",
    value: "acceptPainManagementPts",
    className: "hidden md:table-cell",
  },

  {
    label: "Traumatic Brain Injury",
    value: "traumaticBrainInjury",
    className: "hidden md:table-cell",
  },

  {
    label: "Neurode Generative Disease",
    value: "minorsAfterSchool",
    className: "hidden md:table-cell",
  },

  {
    label: "Minors after school",
    value: "workingHours",
    className: "hidden md:table-cell",
  },
];

export const columnNames = columns.map((column) => column.value);
