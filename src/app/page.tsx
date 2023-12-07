"use client";
import {useEffect, useState} from "react"

import { api } from "../../services/api";
import { Console } from "console";

interface Product {
  id: number,
  nome: string;
}
const initialItens: Product[] = [];

export default function Home() {
  const [textInput, setTextInput] = useState("");
  const [itens, setItens] = useState <Product[]>([]);


  //quando a tela for carregada execute 
  useEffect(() => {
    loadProducts();
  }, [])

  useEffect(() => {
    console.log("Mudança",textInput);
  }, [textInput]);
  async function loadProducts() { //o axios quem criou
    const response = await api.get("/produtos");
    console.log("Sucess:", response);
    setItens(response.data);

    // const response = await fetch("http://192.168.68.154:3000/produtos");
    // const produtos = await response.json(); esse código faz a mesma coisa do de cima que é um a biblioteca axios
    // console.log(produtos);
  }

  async function handleAddItem() {
    const data = { nome: textInput };


    try {
      const response = await api.post("/produtos", data);
      loadProducts();
      console.log("Sucess:", response);
      
    } catch (error) {
      console.log("Error:", error);
      alert("ocorreu um erro ao tentar se conectar com o servidor")
    }
      
    

    /**try {
      const response = await fetch("http://192.168.68.154:3000/produtos", {
        method: "POST", // or 'PUT'
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();
      console.log("Success:", result);
    } catch (error) {
      console.error("Error:", error);
      alert("Ocorreu um erro");
    }**/
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
