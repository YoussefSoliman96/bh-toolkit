"use client";
import { Box, Button } from "@radix-ui/themes";
import { useSession } from "next-auth/react";
import Link from "next/link";

const AdminPanelButton = () => {
  const { data: session, status } = useSession();
  return (
    <Box className="items-center py-3">
      {session && session.user.role === "ADMIN" && (
        <Button variant="soft">
          <Link href="/admin">Admin Panel</Link>
        </Button>
      )}
    </Box>
  );
};

export default AdminPanelButton;
