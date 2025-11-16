'use client'; 

import Botao from '../components/botao';
import { Trash2, Edit } from 'lucide-react'; 


type NotaProps = {
  id: string;
  titulo: string;
  conteudo: string;
  aoExcluir: (id: string) => void;
};

export default function Nota({ id, titulo, conteudo, aoExcluir }: NotaProps) {
  
  const urlEdicao = `/dashboard/anotacoes/editar/${id}`;

  return (
    <div className="flex flex-col bg-white rounded-lg shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl">
      <div className="p-6 flex-grow">
        <h3 className="text-xl font-semibold text-gray-900 mb-2">{titulo}</h3>
        <p className="text-gray-600 text-sm line-clamp-4">{conteudo}</p>
      </div>
      <div className="px-6 py-4 bg-gray-50 border-t border-gray-100 flex justify-end gap-3">
        <Botao
          href={urlEdicao}
          variante="secundario"
          className="text-sm"
          title="Editar Nota"
        >
          <Edit className="w-4 h-4 mr-2" />
          Editar
        </Botao>
        <Botao
          variante="perigo"
          className="text-sm"
          onClick={() => aoExcluir(id)}
          title="Excluir Nota"
        >
          <Trash2 className="w-4 h-4 mr-2" />
          Excluir
        </Botao>
      </div>
    </div>
  );
}