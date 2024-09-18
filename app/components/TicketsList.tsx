import { Select } from "@radix-ui/themes";
import Link from "next/link";
import React from "react";

const TicketsList = () => {
  return (
    <Select.Root>
      <Select.Trigger placeholder="Tickets" />
      <Select.Content>
        <Select.Item value="patient">
          <Link href="/">Patient</Link>
        </Select.Item>
        <Select.Item value="collection">
          <Link href="/">Collection</Link>
        </Select.Item>
        <Select.Item value="medicalRecords">
          <Link href="/">Medical Records</Link>
        </Select.Item>
        <Select.Item value="intake">
          <Link href="/">Intake</Link>
        </Select.Item>
      </Select.Content>
    </Select.Root>
  );
};

export default TicketsList;
