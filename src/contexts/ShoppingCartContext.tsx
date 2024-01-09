"use client";
import { Product } from "@/types";
import { createContext, useContext } from "react";

const ShoppingCartContext = createContext<Product[]>([]);

interface ShoppingCartProviderProps {
  children: React.ReactNode;
}

export function ShoppingCartProvider({ children }: ShoppingCartProviderProps) {
  return (
    <ShoppingCartContext.Provider value={initialData}>
      {children}
    </ShoppingCartContext.Provider>
  );
}

export function useShoppingCart() {
  return useContext(ShoppingCartContext);
}

const initialData: Product[] = [
  { id: 0, title: "Banana", price: 5 },
  { id: 1, title: "Uva", price: 2 },
  { id: 2, title: "Melão", price: 10 },
  { id: 3, title: "Cuscuz", price: 7 },
];
