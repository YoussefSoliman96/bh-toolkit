"use client";
import { Role } from "@prisma/client";
import { Select } from "@radix-ui/themes";
import { useRouter, useSearchParams } from "next/navigation";

const roles: { label: string; value?: Role }[] = [
  { label: "All" },
  { label: "Psychiatrist", value: "PSYCHIATRIST" },
  { label: "Therapist", value: "THERAPIST" },
  { label: "Residency", value: "RESIDENCY" },
];

const DistributionFilter = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  return (
    <div>
      <Select.Root
        defaultValue={searchParams.get("role") || ""}
        onValueChange={(role) => {
          const params = new URLSearchParams();
          if (role) params.append("role", role);
          if (searchParams.get("orderBy"))
            params.append("orderBy", searchParams.get("orderBy")!);

          const query = params.size ? "?" + params.toString() : "";
          // role === "ALL" ? " " : `?role=${role}`;
          router.push("/distribution" + query);
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
    </div>
  );
};

export default DistributionFilter;
