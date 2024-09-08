"use client";

import { Box, Flex } from "@radix-ui/themes";
import classnames from "classnames";
import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

const NavBar = () => {
  const currentPath = usePathname();
  const { status, data: session } = useSession();
  const links = [
    { label: "Dashboard", href: "/" },
    { label: "Providers", href: "/providers/list" },
  ];

  return (
    <>
      <nav className="border-b px-1 h-14 items-center">
        <Flex justify="between">
          <Link href="/">
            <Image src="/logo.png" alt="Logo" width="200" height="60"></Image>
          </Link>
          <Box className=" px-5 py-4">
            {status === "authenticated" && (
              <Link href="/api/auth/signout">Log out</Link>
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
