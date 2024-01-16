"use client";
import {
  useShoppingCart,
  useShoppingCartDispatch,
} from "@/contexts/ShoppingCartContext";
import { Card, CardBody, CardFooter, Image } from "@nextui-org/react";
import { BsTrash3 } from "react-icons/bs";
import { Button } from "@nextui-org/react";
import { v4 as uuidv4 } from "uuid";

export default function ProductsPage() {
  const products = useShoppingCart();
  const dispatch = useShoppingCartDispatch();

  return (
    <div>
      <h2 className="text-2xl pb-4">Meu carrinho</h2>
      <ul className="grid grid-cols-[repeat(auto-fill,min(200px))] justify-between gap-5">
        {products.map((item) => (
          <li key={uuidv4()}>
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
                  <p className="text-default-500">R$ {item.price}</p>
                </div>

                <Button
                  startContent={<BsTrash3 size={16} />}
                  className="flex self-end"
                  variant="bordered"
                  color="danger"
                  size="sm"
                  onClick={() => {
                    dispatch({
                      type: "deleted",
                      ...item,
                    });
                  }}
                >
                  Remover
                </Button>
              </CardFooter>
            </Card>
          </li>
        ))}
      </ul>
    </div>
  );
}
