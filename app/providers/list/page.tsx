import prisma from "@/prisma/client";
import { Provider, Role } from "@prisma/client";
import { Badge, Flex, Table } from "@radix-ui/themes";
import Link from "../../components/Link";
import NextLink from "next/link";
import CopyButton from "./CopyButton";
import ProviderActions from "./ProviderActions";
import ProviderRoleBadge from "./ProviderRoleBadge";
import { ArrowUpIcon } from "@radix-ui/react-icons";

interface Props {
  searchParams: { role: Role; orderBy: keyof Provider };
}

const ProvidersPage = async ({ searchParams }: Props) => {
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

  const roles = Object.values(Role);
  const role = roles.includes(searchParams.role)
    ? searchParams.role
    : undefined;

  const orderBy = columns
    .map((column) => column.value)
    .includes(searchParams.orderBy)
    ? { [searchParams.orderBy]: "asc" }
    : undefined;
  const providers = await prisma.provider.findMany({
    where: { role },
    orderBy,
  });

  return (
    <div>
      <ProviderActions />
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
                <Flex gap="3" className="items-center">
                  <Badge color="violet" size="2">
                    {provider.link}
                  </Badge>
                  <CopyButton doxyLink={provider.link} />
                </Flex>
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table.Root>
    </div>
  );
};

export const dynamic = "force-dynamic";

export default ProvidersPage;

function capitalizeFirstLetter(string: string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}
