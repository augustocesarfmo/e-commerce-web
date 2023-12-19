"use client";
import { usePathname } from "next/navigation";
import { Navbar, NavbarContent, NavbarItem, Link } from "@nextui-org/react";

const links = [
  { name: "Início", href: "/" },
  { name: "Produtos", href: "/produtos" },
  { name: "Sobre", href: "/sobre" },
];

export function Header() {
  const pathname = usePathname();

  return (
    <Navbar position="static" isBordered>
      <NavbarContent className="flex gap-4 w-full" justify="center">
        {links.map((item, index) => (
          <NavbarItem key={index} isActive={item.href === pathname}>
            <Link color="foreground" href={item.href}>
              {item.name}
            </Link>
          </NavbarItem>
        ))}
      </NavbarContent>
    </Navbar>
  );
}
