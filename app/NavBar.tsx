"use client";

import classnames from "classnames";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

const NavBar = () => {
  const currentPath = usePathname();
  const links = [
    { label: "Dashboard", href: "/" },
    { label: "Providers", href: "/providers/list" },
  ];

  return (
    <>
      <nav className="flex space-x-6 border-b px-1 h-14 items-center">
        <Link href="/">
          <Image src="/logo.png" alt="Logo" width="200" height="60"></Image>
        </Link>
      </nav>
      <nav className="flex space-x-6 border-b mb-5 px-5 h-14 items-center">
        <ul className="flex space-x-6">
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
      </nav>
    </>
  );
};

export default NavBar;
