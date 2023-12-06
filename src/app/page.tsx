"use client";
import { useState } from "react";

const initialItens = [
  { id: 1, nome: "Banana" },
  { id: 2, nome: "Uva" },
];

export default function Home() {
  const [textInput, setTextInput] = useState("");
  const [itens, setItens] = useState(initialItens);

  async function handleClick() {
    const response = await fetch("http://192.168.68.154:3000/produtos");
    const produtos = await response.json();
    setItens(produtos);
    console.log(produtos);
  }

  function handleAddItem() {
    console.log(textInput);
    console.log("Adicionando um novo item");
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

      <button onClick={handleClick}>Buscar informação no servidor</button>

      <ul>
        {itens.map((item) => (
          <li key={item.id}>{item.nome}</li>
        ))}
      </ul>
    </main>
  );
}
