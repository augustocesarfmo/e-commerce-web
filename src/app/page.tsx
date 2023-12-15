"use client";
import { useEffect, useState } from "react";
import { api } from "../../services/api";
import { Button, Skeleton } from "@nextui-org/react";
import { Input } from "@nextui-org/react";
import Image from "next/image";

interface Product {
  id: number;
  nome: string;
  isEditing: boolean;
}

export default function Home() {
  const [loading, setLoading] = useState(false);
  const [textInput, setTextInput] = useState("");
  const [items, setItems] = useState<Product[]>([]);

  async function loadItems() {
    setLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 1000));

    try {
      const response = await api.get("/produtos");
      setItems(response.data);
      console.log("Success:", response);
    } catch (error) {
      console.log("Error:", error);
      alert("Ocorreu um erro ao tentar se conectar com o servidor.");
    } finally {
      setLoading(false);
    }
  }

  // Quando a tela for carregada, execute.
  useEffect(() => {
    loadItems();
  }, []);

  async function handleAddItem() {
    const data: Omit<Product, "id"> = { nome: textInput, isEditing: false };

    try {
      const response = await api.post("/produtos", data);
      loadItems();
      console.log("Success:", response);
    } catch (error) {
      console.log("Error:", error);
    }
  }

  async function handleDeleteItem(itemId: number) {
    console.log(itemId);

    try {
      await api.delete(`/produtos/${itemId}`);

      const filteredItems = items.filter((item) => item.id !== itemId);
      setItems(filteredItems);
    } catch (error) {
      console.log("Error:", error);
    }
  }

  async function handleEditItem(itemId: number) {
    let tempItem: any;

    const result = items.map((item) => {
      if (item.id === itemId) {
        const updatedItem = { ...item, isEditing: !item.isEditing };
        tempItem = updatedItem;

        return updatedItem;
      }
      return item;
    });

    setItems(result);
    if (!tempItem.isEditing) await api.put(`/produtos/${itemId}`, tempItem);
  }

  function handleChangeItem(itemId: number, textValue: string) {
    const result = items.map((item) => {
      if (item.id === itemId) {
        return { ...item, nome: textValue };
      }
      return item;
    });

    setItems(result);
  }

  return (
    <div className="flex flex-col gap-5 mt-5">
      <Image
        alt="Img background"
        src="/images/img-background.jpg"
        width={150}
        height={0}
      />

      <div className="flex items-center">
        <Input
          onChange={(e) => setTextInput(e.target.value)}
          placeholder="Digite o seu texto aqui..."
        />
        <Button color="primary" onClick={handleAddItem}>
          Enviar
        </Button>
      </div>

      {/* {loading && <p>Carregando...</p>} */}

      {loading && (
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
      )}

      <ul>
        {items.map((item) => (
          <li key={item.id}>
            {item.isEditing ? (
              <Input
                value={item.nome}
                onChange={(e) => handleChangeItem(item.id, e.target.value)}
              />
            ) : (
              item.nome
            )}

            <button onClick={() => handleEditItem(item.id)}>
              {item.isEditing ? "Save" : "Edit"}
            </button>
            <button onClick={() => handleDeleteItem(item.id)}>Deletar</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
