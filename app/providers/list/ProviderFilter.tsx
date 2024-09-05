"use client";
import { Role } from "@prisma/client";
import { Select } from "@radix-ui/themes";
import { useRouter } from "next/navigation";

const roles: { label: string; value?: Role }[] = [
  { label: "All" },
  { label: "Psychiatrist", value: "PSYCHIATRIST" },
  { label: "Therapist", value: "THERAPIST" },
  { label: "Residency", value: "RESIDENCY" },
];

const ProviderFilter = () => {
  const router = useRouter();
  return (
    <Select.Root
      onValueChange={(role) => {
        const query = role === "ALL" ? " " : `?role=${role}`;
        router.push("/providers/list" + query);
      }}
    >
      <Select.Trigger placeholder="Filter by role" />
      <Select.Content>
        {roles.map((role) => (
          <Select.Item key={role.label} value={role.value ?? "ALL"}>
            {role.label}
          </Select.Item>
        ))}
      </Select.Content>
    </Select.Root>
  );
};

export default ProviderFilter;
