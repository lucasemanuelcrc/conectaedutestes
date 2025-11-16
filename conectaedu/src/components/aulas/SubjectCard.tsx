// components/dashboard/SubjectCard.tsx
import Link from 'next/link';
import { ReactNode } from 'react';
import Image, { StaticImageData } from 'next/image';

// Tipo para um componente de barra de progresso personalizado
type ProgressComponentType = React.ComponentType<{ progress: number }>;

interface SubjectCardProps {
  title: string;
  imageUrl?: string | StaticImageData; // Aceita URL ou imagem importada
  progress: number;
  href: string;
  ProgressBarComponent?: ProgressComponentType; // Prop para barra customizada
}

export function SubjectCard({
  title,
  imageUrl,
  progress,
  href,
  ProgressBarComponent,
}: SubjectCardProps) {
  
  // Cores Padrão
  const accentColor = 'text-indigo-600';
  const buttonBgColor = 'bg-indigo-600';
  const buttonHoverColor = 'hover:bg-indigo-700';
  const progressBarColor = 'bg-indigo-500';

  return (
    <div className="bg-white rounded-xl shadow-md border border-gray-100 overflow-hidden flex flex-col transition-all hover:shadow-lg">
      
      {/* Área da Imagem (com next/image) */}
      <div className="relative w-full h-32 bg-gray-100 overflow-hidden">
        {imageUrl ? (
          <Image
            src={imageUrl}
            alt={`Imagem de ${title}`}
            fill // Preenche o container
            style={{ objectFit: 'cover' }} // Garante que a imagem cubra o espaço
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        ) : (
          // Placeholder se não houver imagem
          <div className="w-full h-full flex items-center justify-center text-gray-400 text-sm">
            Sem imagem
          </div>
        )}
      </div>

      {/* Conteúdo do Card */}
      <div className="p-4 flex-grow flex flex-col">
        {/* Título da Matéria */}
        <h3 className="text-lg font-semibold text-gray-800 mb-3 text-center">
          {title}
        </h3>

        {/* Barra de Progresso */}
        <div className="flex-grow mb-4 flex items-end">
          {ProgressBarComponent ? (
            // Renderiza a barra customizada se ela for fornecida
            <ProgressBarComponent progress={progress} />
          ) : (
            // Barra de progresso padrão
            <div className="w-full">
              <div className="w-full bg-gray-200 rounded-full h-2.5">
                <div
                  className={`${progressBarColor} h-2.5 rounded-full`}
                  style={{ width: `${progress}%` }}
                ></div>
              </div>
              <p className={`text-right text-xs font-medium ${accentColor} mt-1`}>
                {progress}%
              </p>
            </div>
          )}
        </div>

        {/* Botão de Ação */}
        <Link
          href={href}
          className={`w-full text-center ${buttonBgColor} text-white font-medium py-2 px-4 rounded-lg ${buttonHoverColor} transition-colors text-sm`}
        >
          Acessar
        </Link>
      </div>
    </div>
  );
}