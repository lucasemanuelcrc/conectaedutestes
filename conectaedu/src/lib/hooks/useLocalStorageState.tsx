// lib/hooks/useLocalStorageState.tsx
"use client";

import { useState, useEffect } from "react";

/**
 * Um hook customizado que gerencia um estado e o persiste no localStorage.
 * @param key A chave para salvar no localStorage.
 * @param initialValue O valor padrão para usar se nada for encontrado.
 */
export function useLocalStorageState<T>(key: string, initialValue: T): [T, React.Dispatch<React.SetStateAction<T>>] {
  
  // 1. O estado é inicializado com o 'initialValue'.
  // Usamos uma função no useState para que a leitura do localStorage 
  // aconteça apenas uma vez no cliente, evitando problemas com o servidor.
  const [value, setValue] = useState<T>(() => {
    // Evita rodar no servidor
    if (typeof window === "undefined") {
      return initialValue;
    }
    try {
      // Tenta pegar o valor salvo no localStorage
      const item = window.localStorage.getItem(key);
      return item ? (JSON.parse(item) as T) : initialValue;
    } catch (error) {
      // Em caso de erro (ex: JSON inválido), usa o valor inicial
      console.warn(`Erro ao ler o localStorage (chave: "${key}"):`, error);
      return initialValue;
    }
  });

  // 2. Efeito colateral (useEffect) para SALVAR no localStorage
  // Roda sempre que a 'key' ou o 'value' mudar.
  useEffect(() => {
    try {
      // Evita rodar no servidor
      if (typeof window !== "undefined") {
        window.localStorage.setItem(key, JSON.stringify(value));
      }
    } catch (error) {
      console.warn(`Erro ao salvar no localStorage (chave: "${key}"):`, error);
    }
  }, [key, value]);

  // Retorna a API idêntica ao 'useState'
  return [value, setValue];
}