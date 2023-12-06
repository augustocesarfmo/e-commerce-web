"use client";
import { useState } from "react";

const initialItens = [
  { id: 1, nome: "Banana" },
  { id: 2, nome: "Uva" },
];

export default function Home() {
  const [itens, setItens] = useState(initialItens);

  async function handleClick() {
    const response = await fetch("http://192.168.68.154:3000/produtos");
    const produtos = await response.json();
    setItens(produtos);
    console.log(produtos);
  }

  return (
    <main>
      <button onClick={handleClick}>Buscar informação no servidor</button>

      <ul>
        {itens.map((item) => (
          <li key={item.id}>{item.nome}</li>
        ))}
      </ul>
    </main>
  );
}
