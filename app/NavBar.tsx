import Image from "next/image";
import Link from "next/link";
import React from "react";

const NavBar = () => {
  const links = [
    { label: "Dashboard", href: "/" },
    { label: "Providers", href: "/providers" },
  ];

  return (
    <>
      <nav className="flex space-x-6 border-b px-5 h-14 items-center">
        <Link href="/">
          <Image src="/logo.png" alt="Logo" width="200" height="60"></Image>
        </Link>
      </nav>
      <nav className="flex space-x-6 border-b mb-5 px-5 h-14 items-center">
        <ul className="flex space-x-6">
          {links.map((link) => (
            <li key={link.label}>
              <Link href={link.href}>{link.label}</Link>
            </li>
          ))}
        </ul>
      </nav>
    </>
  );
};

export default NavBar;
