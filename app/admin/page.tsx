import prisma from "@/prisma/client";
import { Flex, Table } from "@radix-ui/themes";
import React from "react";
import HandlersTable from "./HandlersTable";
import SchedulersTable from "./SchedulersTable";
import TranscribersTable from "./TranscribersTable";

const AdminPanel = async () => {
  return (
    <Flex gap="9">
      <HandlersTable />
      <SchedulersTable />
      <TranscribersTable />
    </Flex>
  );
};

export default AdminPanel;
