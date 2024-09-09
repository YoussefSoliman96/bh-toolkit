"use client";

import { Box, DropdownMenu, Flex, IconButton } from "@radix-ui/themes";
import classnames from "classnames";
import { link } from "fs";
import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

const NavBar = () => {
  return (
    <>
      <nav className="border-b px-1 h-14 items-center">
        <Flex justify="between">
          <Link href="/">
            <Image src="/logo.png" alt="Logo" width="200" height="60"></Image>
          </Link>
          <AuthStatus />
        </Flex>
      </nav>
      <nav className="border-b mb-5">
        <Flex>
          <NavLinks />
        </Flex>
      </nav>
    </>
  );
};

const NavLinks = () => {
  const currentPath = usePathname();

  const links = [
    { label: "Dashboard", href: "/" },
    { label: "Providers", href: "/providers/list" },
    { label: "Handlers", href: "/distribution" },
  ];
  return (
    <ul className="flex space-x-6  px-5 py-3">
      {links.map((link) => (
        <li key={link.label}>
          <Link
            className={classnames({
              "nav-link": true,
              "!text-zinc-900": link.href === currentPath,
            })}
            href={link.href}
          >
            {link.label}
          </Link>
        </li>
      ))}
    </ul>
  );
};

const AuthStatus = () => {
  const { status, data: session } = useSession();
  const router = useRouter();
  const handleLinkClick = (url: string) => {
    // window.open(url);
    router.push(url);
  };

  if (status === "loading") return null;
  if (status === "unauthenticated")
    return (
      <Link className="nav-link" href="/api/auth/signin">
        Login
      </Link>
    );

  return (
    <Box className="px-5 py-4">
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
            <DropdownMenu.Item onClick={() => handleLinkClick("/profile")}>
              <Link href="/profile">Profile</Link>
            </DropdownMenu.Item>
            <DropdownMenu.Item
              onClick={() => handleLinkClick("/api/auth/signout")}
            >
              <Link href="/api/auth/signout">Log out</Link>
            </DropdownMenu.Item>
          </DropdownMenu.Content>
        </DropdownMenu.Root>
      )}
    </Box>
  );
};

export default NavBar;
