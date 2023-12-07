"use client";
import { useEffect, useState } from "react";
import { api } from "../../services/api";

interface Product {
  id: number;
  nome: string;
}

export default function Home() {
  const [textInput, setTextInput] = useState("");
  const [itens, setItens] = useState<Product[]>([]);

  // Quando a tela for carregada, execute.
  useEffect(() => {
    loadProducts();
  }, []);

  async function loadProducts() {
    const response = await api.get("/produtos");
    console.log("Success:", response);
    setItens(response.data);
  }

  async function handleAddItem() {
    const data = { nome: textInput };

    try {
      const response = await api.post("/produtos", data);
      loadProducts();
      console.log("Success:", response);
    } catch (error) {
      console.log("Error:", error);
      alert("Ocorreu um erro ao tentar se conectar com o servidor.");
    }
  }

  return (
    <main>
      <div style={{ marginBottom: 10 }}>
        <input
          onChange={(e) => setTextInput(e.target.value)}
          placeholder="Digite o seu texto aqui..."
        />
        <button onClick={handleAddItem}>Enviar</button>
      </div>

      <ul>
        {itens.map((item) => (
          <li key={item.id}>{item.nome}</li>
        ))}
      </ul>
    </main>
  );
}
