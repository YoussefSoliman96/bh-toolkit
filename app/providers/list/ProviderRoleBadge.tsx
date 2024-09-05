import { Role } from "@prisma/client";
import { Badge } from "@radix-ui/themes";
import React from "react";

interface Props {
  role: Role;
}

const roleMap: Record<
  Role,
  { label: string; color: "red" | "violet" | "green" }
> = {
  PSYCHIATRIST: { label: "Psychiatrist", color: "green" },
  THERAPIST: { label: "Therapist", color: "violet" },
  RESIDENCY: { label: "Residency", color: "red" },
};

const ProviderRoleBadge = ({ role }: Props) => {
  return <Badge color={roleMap[role].color}>{roleMap[role].label}</Badge>;
};

export default ProviderRoleBadge;
