'use client'; 

import { useAnotacoes } from '@/app/context/AnotacoesContext';
import Botao from '../components/botao';
import Nota from '../components/nota';
import { Plus } from 'lucide-react';

export default function AnotacoesPage() {
  
  const { anotacoes, adicionarNovaAnotacao, excluirAnotacao } = useAnotacoes();

  return (
    <main className="flex-1 bg-gray-100 p-6 md:p-10 min-h-screen">
      <div className="max-w-7xl mx-auto">
        
        <header className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">
            Minhas Anotações
          </h1>
          
          <Botao onClick={adicionarNovaAnotacao} variante="primario">
            <Plus className="w-5 h-5 mr-2" />
            Adicionar Nota
          </Botao>
        </header>

        {anotacoes.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {anotacoes.map((nota) => (
              <Nota
                key={nota.id}
                id={nota.id}
                titulo={nota.titulo}
                conteudo={nota.conteudo}
                aoExcluir={excluirAnotacao}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-20 bg-white rounded-lg shadow-sm">
            <h2 className="text-xl font-semibold text-gray-700">Nenhuma anotação encontrada</h2>
            <p className="text-gray-500 mt-2">Clique em "Adicionar Nota" para criar sua primeira anotação.</p>
          </div>
        )}
      </div>
    </main>
  );
}