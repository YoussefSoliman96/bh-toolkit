"use client";
import { Role } from "@prisma/client";
import { Select } from "@radix-ui/themes";

const roles: { label: string; value: Role }[] = [
  { label: "All", value: "PSYCHIATRIST" },
  { label: "Psychiatrist", value: "PSYCHIATRIST" },
  { label: "Therapist", value: "THERAPIST" },
  { label: "Residency", value: "RESIDENCY" },
];

const ProviderFilter = () => {
  return (
    <Select.Root>
      <Select.Trigger placeholder="Filter by role" />
      <Select.Content>
        {roles.map((role) => (
          <Select.Item key={role.label} value={role.value}>
            {role.label}
          </Select.Item>
        ))}
      </Select.Content>
    </Select.Root>
  );
};

export default ProviderFilter;
