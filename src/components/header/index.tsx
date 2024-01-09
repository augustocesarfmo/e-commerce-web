"use client";
import { usePathname } from "next/navigation";
import {
  Navbar,
  NavbarContent,
  NavbarItem,
  Link,
  Badge,
  Button,
} from "@nextui-org/react";
import { BsCart3 } from "react-icons/bs";
import { useShoppingCart } from "@/contexts/ShoppingCartContext";

const links = [
  { name: "Início", href: "/" },
  { name: "Produtos", href: "/produtos" },
];

export function Header() {
  const pathname = usePathname();
  const products = useShoppingCart();

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

      <Button
        href="/produtos"
        isIconOnly
        className="bg-transparent"
        radius="none"
        as={Link}
      >
        <Badge color="primary" content={products.length} shape="circle">
          <BsCart3 size={30} />
        </Badge>
      </Button>
    </Navbar>
  );
}
