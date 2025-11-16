'use client';

import { createContext, useContext, useState, ReactNode } from 'react';

// 1. Define a "forma" da anotação
interface Anotacao {
  id: string;
  titulo: string;
  conteudo: string;
}

// 2. Dados de exemplo
const anotacoesExemplo: Anotacao[] = [
  { id: '1', titulo: 'Ideias para o Projeto', conteudo: 'Integrar com API de pagamentos...' },
  { id: '2', titulo: 'Lembretes Reunião', conteudo: 'Discutir o cronograma do Sprint 3...' },
];

// 3. Define o que o Contexto vai fornecer
interface AnotacoesContextData {
  anotacoes: Anotacao[];
  adicionarNovaAnotacao: () => void;
  excluirAnotacao: (id: string) => void;
  obterAnotacaoPorId: (id: string) => Anotacao | undefined;
  atualizarAnotacao: (id: string, dados: { titulo: string, conteudo: string }) => void;
}

// 4. Cria o Contexto
const AnotacoesContext = createContext<AnotacoesContextData | undefined>(undefined);

// 5. Cria o "Provedor" (o componente que gerencia a lógica)
export function AnotacoesProvider({ children }: { children: ReactNode }) {
  const [anotacoes, setAnotacoes] = useState<Anotacao[]>(anotacoesExemplo);

  const adicionarNovaAnotacao = () => {
    const novoId = (anotacoes.length + 1).toString();
    const novaAnotacao: Anotacao = {
      id: novoId,
      titulo: `Nova Nota ${novoId}`,
      conteudo: 'Clique em "Editar" para começar...',
    };
    setAnotacoes([novaAnotacao, ...anotacoes]);
  };

  const excluirAnotacao = (idParaExcluir: string) => {
    setAnotacoes(anotacoes.filter((nota) => nota.id !== idParaExcluir));
  };

  const obterAnotacaoPorId = (id: string) => {
    return anotacoes.find((nota) => nota.id === id);
  };

  const atualizarAnotacao = (id: string, dados: { titulo: string, conteudo: string }) => {
    setAnotacoes(anotacoes.map(nota => 
      nota.id === id ? { ...nota, ...dados } : nota
    ));
  };

  return (
    <AnotacoesContext.Provider value={{ 
      anotacoes, 
      adicionarNovaAnotacao, 
      excluirAnotacao, 
      obterAnotacaoPorId,
      atualizarAnotacao 
    }}>
      {children}
    </AnotacoesContext.Provider>
  );
}

// 6. Cria o "Hook" (para facilitar o uso)
export function useAnotacoes() {
  const context = useContext(AnotacoesContext);
  if (!context) {
    throw new Error('useAnotacoes deve ser usado dentro de um AnotacoesProvider');
  }
  return context;
}