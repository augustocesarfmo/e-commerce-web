"use client";
import { useEffect, useState } from "react";
import { api } from "../../services/api";
import { Button, Skeleton } from "@nextui-org/react";
import { Card, CardBody, CardFooter, Image } from "@nextui-org/react";
import { BsCart3 } from "react-icons/bs";
import { Product } from "@/types";
import { useShoppingCartDispatch } from "@/contexts/ShoppingCartContext";
import { formatCurrency } from "@/utils";

export default function Home() {
  const [loading, setLoading] = useState(false);
  const [items, setItems] = useState<Product[]>([]);
  const dispatch = useShoppingCartDispatch();

  async function loadItems() {
    setLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 500));

    try {
      const response = await api.get("/produtos");
      setItems(response.data);
      // console.log("Success:", response);
    } catch (error) {
      console.log("Error:", error);
      alert(
        "Ocorreu um erro ao tentar se conectar com o servidor.\nExecute o seguinte comando em seu terminal:\n\nnpm run server"
      );
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadItems();
  }, []);

  return (
    <div>
      <h2 className="text-2xl pb-4">Produtos</h2>
      {loading && (
        <div className="space-y-3">
          <Skeleton className="rounded-lg">
            <div className="h-24 rounded-lg bg-default-300"></div>
          </Skeleton>
          <div className="space-y-3">
            <Skeleton className="w-3/5 rounded-lg">
              <div className="h-3 w-3/5 rounded-lg bg-default-200"></div>
            </Skeleton>
            <Skeleton className="w-4/5 rounded-lg">
              <div className="h-3 w-4/5 rounded-lg bg-default-200"></div>
            </Skeleton>
            <Skeleton className="w-2/5 rounded-lg">
              <div className="h-3 w-2/5 rounded-lg bg-default-300"></div>
            </Skeleton>
          </div>
        </div>
      )}

      <ul className="grid grid-cols-[repeat(auto-fill,min(200px))] justify-between gap-5">
        {items.map((item) => (
          <li key={item.id}>
            <Card
              shadow="sm"
              isPressable
              onPress={() => console.log("item pressed")}
            >
              <CardBody className="overflow-visible p-0">
                <Image
                  shadow="sm"
                  radius="lg"
                  width="100%"
                  alt={item.title}
                  className="w-[200px] object-cover h-[140px]"
                  src={`https://picsum.photos/id/${item.id}/400/300`}
                />
              </CardBody>
              <CardFooter className="flex flex-col text-small gap-2">
                <div className="flex w-full justify-between">
                  <b>{item.title}</b>
                  <p className="text-default-500">
                    {formatCurrency(item.price)}
                  </p>
                </div>

                <Button
                  startContent={<BsCart3 size={16} />}
                  className="flex self-end"
                  variant="bordered"
                  color="primary"
                  size="sm"
                  onClick={() => {
                    dispatch({
                      type: "added",
                      ...item,
                    });
                  }}
                >
                  Comprar
                </Button>
              </CardFooter>
            </Card>
          </li>
        ))}
      </ul>
    </div>
  );
}
