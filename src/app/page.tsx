"use client";
import {useEffect, useState} from "react"

import { api } from "../../services/api";
import { Console, log } from "console";
import { resolve } from "path";

interface Product {
  id: number,
  nome: string;
}
const initialItens: Product[] = [];

export default function Home() {
const [loadind, setLoading] = useState(false)
  const [textInput, setTextInput] = useState("");
  const [items, setItems] = useState <Product[]>([]);


  //quando a tela for carregada execute 
  useEffect(() => {
    loadItems();
  }, [])

   useEffect(() => {
    console.log("Mudança",textInput);
  }, [textInput]); 

  async function loadItems() { //o axios quem criou
    if (loadind == true) return;
    setLoading(true)
    await new Promise(resolve => setTimeout(resolve, 1000))
    try {
      const response = await api.get("/produtos");
      console.log("Sucess:", response);
      setItems(response.data);
      
    } catch (error) {
      console.log("Error:", error);
      alert("ocorreu um erro ao tentar se conectar com o servidor")
      
    } finally{
      setLoading(false)
    }

  }

  async function handleAddItem() {
    const data = { nome: textInput };


    try {
      const response = await api.post("/produtos", data);
      loadItems();
      console.log("Sucess:", response);
      
    } catch (error) {
      console.log("Error:", error);
      alert("ocorreu um erro ao tentar se conectar com o servidor")
    }
  }
  async function handleDeleteItem(itemId: number){
    console.log(itemId);
    try {
      await api.delete(`/produtos/${itemId}`)
      const filteredItems = items.filter((item) => {
        item.id != itemId
      })
      setItems(filteredItems)
     
    } catch (error) {
      console.log("Error:", error);
      alert("ocorreu um erro ao tentar se conectar com o servidor")
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
      { loadind && <p>Carregando...</p>}

      <ul>
        {items.map((item) => (
          <li key={item.id}>
            {item.nome}
            <button onClick={() => handleDeleteItem(item.id)}>Deletar</button>
            </li>
        ))}
      </ul>
    </main>
  );
}
