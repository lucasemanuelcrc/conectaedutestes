// dashboard/inicio/page.tsx
"use client"; // Necessário para o Accordion funcionar
import Link from 'next/link';
import { Button } from "@/components/ui/button";
import { 
  BookOpen,
  Calendar,
  Megaphone,
  BookMarked, 
  ClipboardList, 
} from "lucide-react";
// Importar os componentes do Accordion
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

// Componente para o anel de progresso (Placeholder)
function ProgressRing() {
  return (
    <div className="relative w-24 h-24">
      <svg className="w-full h-full" viewBox="0 0 100 100">
        {/* Círculo de fundo */}
        <circle
          className="text-gray-200 stroke-current"
          strokeWidth="10" cx="50" cy="50" r="40" fill="transparent"
        ></circle>
        {/* Círculo de progresso (para 20% = 4/20 aulas) */}
        <circle
          className="text-blue-600 stroke-current"
          strokeWidth="10" strokeDasharray="251.2"
          strokeDashoffset="200.96" // (1 - 0.20) * 251.2
          strokeLinecap="round" cx="50" cy="50" r="40" fill="transparent"
          transform="rotate(-90 50 50)"
        ></circle>
      </svg>
      {/* Texto "4%" da imagem (progresso total) */}
      <span className="absolute inset-0 flex items-center justify-center text-xl font-bold text-blue-600">
        4%
      </span>
    </div>
  );
}


export default function InicioPage() {
  return (
    // Container principal com espaçamento vertical entre as seções
    <div className="space-y-8">

      {/* SEÇÃO 1: CABEÇALHO DE BOAS-VINDAS */}
      <header>
        <h1 className="text-3xl font-bold text-gray-900">Início</h1>
        <p className="text-lg text-gray-600">Olá, Marcos!</p>
      </header>

      {/* SEÇÃO 2: LINHA SUPERIOR DE CARDS (Grid de 3 colunas) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Card 1: Continue Assistindo */}
        <article className="bg-gray-50 p-6 rounded-2xl border border-gray-200 shadow-sm flex flex-col gap-4">
          <div className="flex items-center gap-2">
            <BookOpen className="text-blue-600" size={20} />
            <h2 className="text-lg font-semibold">Continue Assistindo</h2>
          </div>
          <p className="text-gray-700">Inglês - Aula 4: Verbo to be</p>
          {/* Barra de Progresso */}
          <div className="w-full bg-gray-200 rounded-full h-2.5">
            <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: "45%" }}></div>
          </div>
          
          {/* Botão funcional */}
          <Button className="mt-auto" asChild>
            <Link href="/aulas/aula-4">Continue</Link>
          </Button>
        </article>

        {/* Card 2: Agenda */}
        <article className="bg-gray-50 p-6 rounded-2xl border border-gray-200 shadow-sm">
          <div className="flex items-center gap-2 mb-4">
            <Calendar className="text-green-600" size={20} />
            <h2 className="text-lg font-semibold">Agenda</h2>
          </div>
          <ul className="space-y-2 list-disc list-inside text-gray-700">
            <li>Hoje 30/10 - Sem eventos</li>
            <li>Simulado de Inglês - 12/11</li>
          </ul>
        </article>

        {/* Card 3: Avisos */}
        <article className="bg-gray-50 p-6 rounded-2xl border border-gray-200 shadow-sm">
          <div className="flex items-center gap-2 mb-4">
            <Megaphone className="text-yellow-500" size={20} />
            <h2 className="text-lg font-semibold">Avisos</h2>
          </div>
          <ul className="space-y-2 list-disc list-inside text-gray-700">
            <li>Novo material de inglês</li>
            <li>Novo material de redação</li>
          </ul>
        </article>
      </div>

      {/* SEÇÃO 3: LINHA DO MEIO (MEU PROGRESSO) */}
      <h2 className="text-3xl font-bold text-gray-900">Meu Progresso</h2>
      
      {/* Grid responsivo: Card largo (2 colunas) + Pilha de cards (1 coluna) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

        {/* Card 4: Progresso Total (Ocupa 2 colunas em telas grandes) */}
        <article className="bg-gray-50 p-6 rounded-2xl border border-gray-200 shadow-sm lg:col-span-2">
          <h2 className="text-lg font-semibold mb-4">Progresso total do curso: 4%</h2>
          <div className="flex flex-col sm:flex-row items-center gap-6">
            <ProgressRing />
            <div className="space-y-2">
              <p className="text-gray-700"><strong>Aulas concluídas:</strong> 04/20</p>
              <p className="text-gray-700"><strong>Ultima nota:</strong> --</p>
            </div>
          </div>
        </article>

        {/* Container para os 2 cards empilhados da direita */}
        <div className="space-y-6 lg:col-span-1">
          {/* Card 5: Minhas aulas */}
          <article className="bg-gray-50 p-6 rounded-2xl border border-gray-200 shadow-sm text-center">
            <h2 className="text-lg font-semibold">Minhas aulas</h2>
            <p className="text-gray-600 my-2">Acesse suas aulas e materias</p>
            
            {/* Botão funcional */}
            <Button asChild>
              <Link href="/dashboard/aulas">Acesse</Link>
            </Button>
          </article>

          {/* Card 6: Notas e simulados */}
          <article className="bg-gray-50 p-6 rounded-2xl border border-gray-200 shadow-sm">
            <h2 className="text-lg font-semibold">Notas e simulados</h2>
            <ul className="space-y-2 list-disc list-inside text-gray-700 mt-2">
              <li>Simulado de inglês 1 - x</li>
              <li>Simulado de inglês 2 - x</li>
            </ul>
          </article>
        </div>
      </div>

      {/* SEÇÃO 4: LINHA INFERIOR (FÓRUM RETRÁTIL) */}
      <div className="grid grid-cols-1 gap-6">
        
        {/* Componente Accordion com o estilo do card */}
        <Accordion 
          type="single" 
          collapsible 
          className="w-full bg-gray-50 p-6 rounded-4xl border border-gray-200 shadow-sm"
        >
          <AccordionItem value="item-1" className="border-b-0">
            
            {/* Título clicável */}
            <AccordionTrigger>
              
              <h2 className="text-2xl font-bold text-gray-900">
                Fórum e dúvidas frequentes
              </h2>
            </AccordionTrigger>
            
            {/* Conteúdo retrátil */}
            <AccordionContent>
              <div className="space-y-2 pt-4">
                <Link 
                  href="/ajuda/senha" 
                  className="block p-4 bg-white hover:bg-gray-100 rounded-md text-gray-800 font-medium transition-colors border border-gray-200 shadow-sm"
                >
                  Como recuperar senha de acesso
                </Link>
                <Link 
                  href="/ajuda/progresso" 
                  className="block p-4 bg-white hover:bg-gray-100 rounded-md text-gray-800 font-medium transition-colors border border-gray-200 shadow-sm"
                >
                  Como acompanhar meu progresso nos cursos
                </Link>
                <Link 
                  href="/dashboard/configuracoes" 
                  className="block p-4 bg-white hover:bg-gray-100 rounded-md text-gray-800 font-medium transition-colors border border-gray-200 shadow-sm"
                >
                  Como atualizar meus dados cadastrais
                </Link>
              </div>
            </AccordionContent>
            
          </AccordionItem>
        </Accordion>
      </div>

    </div>
  );
}