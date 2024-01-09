"use client";
import { useShoppingCart } from "@/contexts/ShoppingCartContext";

export default function ProductsPage() {
  const products = useShoppingCart();

  return (
    <div className="px-10 py-4">
      <ul>
        {products.map((item) => (
          <li key={item.id}>{item.title}</li>
        ))}
      </ul>
    </div>
  );
}
