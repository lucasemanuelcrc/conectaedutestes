'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useAnotacoes } from '@/app/context/AnotacoesContext';
import Botao from '@/app/(dashboard)/components/botao';

export default function EditarAnotacaoPage() {
  const params = useParams();
  const router = useRouter();
  const { obterAnotacaoPorId, atualizarAnotacao } = useAnotacoes();

  const id = params.id as string;

  const [titulo, setTitulo] = useState('');
  const [conteudo, setConteudo] = useState('');

  // Carrega os dados da nota
  useEffect(() => {
    if (id) {
      const nota = obterAnotacaoPorId(id);
      if (nota) {
        setTitulo(nota.titulo);
        setConteudo(nota.conteudo);
      } else {
        router.push('/dashboard/anotacoes');
      }
    }
  }, [id, obterAnotacaoPorId, router]);

  // Função para salvar
  const handleSalvar = (e: React.FormEvent) => {
    e.preventDefault(); 
    atualizarAnotacao(id, { titulo, conteudo });
    router.push('/dashboard/anotacoes');
  };

  return (
    // Fundo cinza para destaque
    <main className="flex-1 bg-gray-100 p-6 md:p-10 min-h-screen">
      <div className="max-w-3xl mx-auto">
        <header className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">
            Editar Anotação
          </h1>
        </header>

        {/* Formulário de Edição */}
        <form 
          onSubmit={handleSalvar} 
          className="bg-white p-8 rounded-lg shadow-lg space-y-6"
        >
          {/* Campo Título */}
          <div>
            <label htmlFor="titulo" className="block text-sm font-medium text-gray-700 mb-1">
              Título
            </label>
            <input
              type="text"
              id="titulo"
              value={titulo}
              onChange={(e) => setTitulo(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          {/* Campo Conteúdo */}
          <div>
            <label htmlFor="conteudo" className="block text-sm font-medium text-gray-700 mb-1">
              Conteúdo
            </label>
            <textarea
              id="conteudo"
              value={conteudo}
              onChange={(e) => setConteudo(e.target.value)}
              rows={10}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          {/* Botões de Ação */}
          <div className="flex justify-end gap-4">
            <Botao 
              href="/dashboard/anotacoes"
              variante="secundario"
            >
              Cancelar
            </Botao>
            <Botao 
              type="submit"
              variante="primario"
            >
              Salvar Alterações
            </Botao>
          </div>
        </form>
      </div>
    </main>
  );
}