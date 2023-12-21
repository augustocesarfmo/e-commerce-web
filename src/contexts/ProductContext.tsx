"use client";
import { createContext } from "react";

export const ProductContext = createContext(0);

interface ProductProviderProps {
  children: React.ReactNode;
}

export function ProductProvider({ children }: ProductProviderProps) {
  return (
    <ProductContext.Provider value={7}>{children}</ProductContext.Provider>
  );
}
