// components/dashboard/ContinueWatchingCard.tsx
import Link from 'next/link';
import { PlayCircle } from 'lucide-react';

export function ContinueWatchingCard() {
  const progress = 60; // Exemplo de progresso (60%)

  return (
    <div className="flex flex-col justify-between p-6 bg-white rounded-lg shadow-md border border-gray-100 h-full">
      <div>
        <div className="flex items-center gap-3 mb-4">
          <PlayCircle className="text-indigo-600" size={28} />
          <h3 className="text-lg font-semibold text-gray-800">Continue Assistindo</h3>
        </div>
        <p className="text-gray-600 mb-3">Inglês - Aula 4: Verbo to be</p>

        {/* Barra de Progresso */}
        <div className="w-full bg-gray-200 rounded-full h-2 mb-4">
          <div
            className="bg-indigo-600 h-2 rounded-full"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
      </div>
      <Link
        href="/aulas/ingles/aula-4" // Rota de exemplo
        className="w-full text-center bg-indigo-600 text-white font-medium py-2 px-4 rounded-lg hover:bg-indigo-700 transition-colors"
      >
        Continue
      </Link>
    </div>
  );
}