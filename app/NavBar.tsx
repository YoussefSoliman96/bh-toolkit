"use client";

import {
  Avatar,
  Box,
  DropdownMenu,
  Flex,
  Text,
  Badge,
  Button,
  IconButton,
} from "@radix-ui/themes";
import classnames from "classnames";
import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

const NavBar = () => {
  const currentPath = usePathname();
  const { status, data: session } = useSession();
  const links = [
    { label: "Dashboard", href: "/" },
    { label: "Providers", href: "/providers/list" },
  ];
  console.log(session?.user);

  return (
    <>
      <nav className="border-b px-1 h-14 items-center">
        <Flex justify="between">
          <Link href="/">
            <Image src="/logo.png" alt="Logo" width="200" height="60"></Image>
          </Link>
          <Box className=" px-5 py-4">
            {status === "authenticated" && (
              <DropdownMenu.Root>
                <DropdownMenu.Trigger
                  aria-expanded="false"
                  aria-controls="dropdown-content"
                >
                  <IconButton radius="full">
                    {session.user.firstName.slice(0, 1)}
                  </IconButton>
                </DropdownMenu.Trigger>
                <DropdownMenu.Content>
                  <DropdownMenu.Label>{session.user.email}</DropdownMenu.Label>
                  <DropdownMenu.Item>
                    <Link href="/api/auth/signout">Log out</Link>
                  </DropdownMenu.Item>
                </DropdownMenu.Content>
              </DropdownMenu.Root>
            )}
            {status === "unauthenticated" && (
              <Link href="/api/auth/signin">Login</Link>
            )}
          </Box>
        </Flex>
      </nav>
      <nav className="border-b mb-5">
        <Flex>
          <ul className="flex space-x-6  px-5 py-3">
            {links.map((link) => (
              <li key={link.label}>
                <Link
                  className={classnames({
                    "text-zinc-900": link.href === currentPath,
                    "text-zinc-500": link.href !== currentPath,
                    "hover:text-zinc-800 transition-colors": true,
                  })}
                  href={link.href}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </Flex>
      </nav>
    </>
  );
};

export default NavBar;
