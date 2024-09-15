"use client";

import {
  Box,
  Button,
  DropdownMenu,
  Flex,
  IconButton,
  useThemeContext,
} from "@radix-ui/themes";
import classnames from "classnames";
import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Skeleton } from "@/app/components";
import AdminPanelButton from "./components/AdminPanelButton";
import ThemeSwitch from "./components/ThemeSwitch";

const NavBar = () => {
  return (
    <>
      <nav className="border-b px-1 h-14 items-center">
        <Flex justify="between">
          <Link href="/">
            <Image src="/logo.png" alt="Logo" width="200" height="60"></Image>
          </Link>
          <AdminPanelButton />
          <Flex>
            <Box className="py-5">
              <ThemeSwitch />
            </Box>
            <AuthStatus />
          </Flex>
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
  const { appearance } = useThemeContext();

  const leftLinks = [
    { label: "Dashboard", href: "/" },
    { label: "Providers", href: "/providers/list" },
    { label: "Handlers", href: "/distribution" },
    { label: "Restrictions", href: "/restrictions" },
    { label: "Confirmation", href: "/confirmation" },
  ];
  const rightLinks = [
    { label: "Scripts", href: "/scripts" },
    { label: "About", href: "/about" },
  ];
  return (
    <ul className="flex items-center px-5 py-3 w-full">
      <div className="flex space-x-6">
        {leftLinks.map((link) => (
          <li key={link.label}>
            <Link
              className={classnames({
                "nav-link":
                  true && (appearance === "light" || appearance === "inherit"),
                "dark-nav-link": true && appearance === "dark",
                "!text-zinc-900":
                  link.href === currentPath &&
                  (appearance === "light" || appearance === "inherit"),
                "!text-zinc-200":
                  link.href === currentPath && appearance === "dark",
              })}
              href={link.href}
            >
              {link.label}
            </Link>
          </li>
        ))}
      </div>
      <div className="ml-auto flex space-x-6">
        {rightLinks.map((link) => (
          <li key={link.label}>
            <Link
              className={classnames({
                "nav-link":
                  true && (appearance === "light" || appearance === "inherit"),
                "dark-nav-link": true && appearance === "dark",
                "!text-zinc-900":
                  link.href === currentPath &&
                  (appearance === "light" || appearance === "inherit"),
                "!text-zinc-200":
                  link.href === currentPath && appearance === "dark",
              })}
              href={link.href}
            >
              {link.label}
            </Link>
          </li>
        ))}
      </div>
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

  if (status === "loading") return <Skeleton width="3rem" className="mt-5" />;
  if (status === "unauthenticated")
    return (
      <Link className="nav-link px-5 py-4" href="/api/auth/signin">
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
