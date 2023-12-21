"use client";
import { ProductContext } from "@/contexts/ProductContext";
import { useContext } from "react";

export default function ProductsPage() {
  const numProducts = useContext(ProductContext);

  return <p className="text-2xl">Página de produtos: {numProducts}</p>;
}
