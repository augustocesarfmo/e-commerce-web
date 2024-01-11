"use client";
import { Product } from "@/types";
import {
  Dispatch,
  createContext,
  useContext,
  useEffect,
  useReducer,
} from "react";

const ShoppingCartContext = createContext<Product[]>([]);
const ShoppingCartDispatchContext = createContext<Dispatch<Action>>(() => {});

interface ShoppingCartProviderProps {
  children: React.ReactNode;
}

export function ShoppingCartProvider({ children }: ShoppingCartProviderProps) {
  const [products, dispatch] = useReducer(shoppingCartReducer, initialData);

  useEffect(() => {
    localStorage.setItem("@localShoppingCart", JSON.stringify(products));
  }, [products]);

  return (
    <ShoppingCartContext.Provider value={products}>
      <ShoppingCartDispatchContext.Provider value={dispatch}>
        {children}
      </ShoppingCartDispatchContext.Provider>
    </ShoppingCartContext.Provider>
  );
}

export function useShoppingCart() {
  return useContext(ShoppingCartContext);
}

export function useShoppingCartDispatch() {
  return useContext(ShoppingCartDispatchContext);
}

interface Action extends Product {
  type: "added" | "deleted";
}

function shoppingCartReducer(products: Product[], action: Action): Product[] {
  switch (action.type) {
    case "added":
      return [
        ...products,
        { id: action.id, title: action.title, price: action.price },
      ];
    case "deleted": {
      return products.filter((p) => p.id !== action.id);
    }

    default:
      throw Error("Unknown action: " + action.type);
  }
}

const initialData: Product[] = JSON.parse(
  localStorage.getItem("@localShoppingCart") || "[]"
);
