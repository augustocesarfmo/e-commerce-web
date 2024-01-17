"use client";
import { usePathname } from "next/navigation";
import {
  Navbar,
  NavbarContent,
  NavbarItem,
  Link,
  Badge,
  Button,
  NavbarBrand,
  Input,
} from "@nextui-org/react";
import { BsCart3, BsSearch } from "react-icons/bs";
import { useShoppingCart } from "@/contexts/ShoppingCartContext";

const links = [
  { name: "Início", href: "/" },
  { name: "Meu carrinho", href: "/cart" },
];

export function Header() {
  const products = useShoppingCart();

  return (
    <Navbar position="static" isBordered>
      <Button
        href="/"
        className="bg-transparent h-full px-0 lg:px-unit-5"
        radius="none"
        as={Link}
      >
        <NavbarBrand>
          <p className="font-bold text-inherit">LOJA VIRTUAL</p>
        </NavbarBrand>
      </Button>

      <NavbarContent
        className="hidden lg:flex gap-4 w-full mx-12"
        justify="center"
      >
        <Input
          classNames={{
            mainWrapper: "h-full",
            input: "text-small",
            inputWrapper:
              "h-full font-normal text-default-500 bg-default-400/20 dark:bg-default-500/20",
          }}
          placeholder="Type to search..."
          size="sm"
          startContent={<BsSearch size={16} />}
          type="search"
        />
      </NavbarContent>

      <NavbarContent justify="end">
        <Button
          href="/cart"
          isIconOnly
          className="bg-transparent h-full w-unit-13"
          radius="none"
          as={Link}
        >
          <Badge color="primary" content={products.length} shape="circle">
            <BsCart3 size={26} />
          </Badge>
        </Button>
      </NavbarContent>
    </Navbar>
  );
}
