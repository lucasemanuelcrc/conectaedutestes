// components/anotacoes/NoteCard.tsx
"use client";

import { Pencil, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { type Note } from "./types"; // Importando o tipo

// Props que o Card espera receber
interface NoteCardProps {
  note: Note;
  onEdit: (note: Note) => void;
  onDelete: (id: string) => void;
}

export function NoteCard({ note, onEdit, onDelete }: NoteCardProps) {
  return (
    <article className="bg-white rounded-lg shadow-md border border-gray-200 flex flex-col h-full overflow-hidden">
      
      {/* Corpo do Card (com scroll se o conteúdo for longo) */}
      <div className="p-5 space-y-4 flex-1 overflow-y-auto">
        <h2 className="text-xl font-semibold text-gray-800 break-words">
          {note.title}
        </h2>

        {/* --- Bloco "Flashcards" --- */}
        {note.flashcards.length > 0 && (
          <div className="space-y-2">
            <h3 className="font-semibold text-gray-700">Flashcards</h3>
            <Accordion type="multiple" className="w-full">
              {note.flashcards.map((flashcard) => (
                <AccordionItem value={flashcard.id} key={flashcard.id} className="border-b-0 mt-1">
                  <AccordionTrigger className="p-3 bg-gray-100 rounded-md hover:no-underline text-left font-medium text-gray-800 text-sm">
                    {flashcard.front || "(Sem frente)"}
                  </AccordionTrigger>
                  <AccordionContent className="p-3 bg-gray-50 rounded-b-md text-gray-700 text-sm">
                    <p className="whitespace-pre-wrap">{flashcard.back || "(Sem verso)"}</p>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        )}

        {/* --- Conteúdo Principal --- */}
        {note.content && (
           <div className="prose prose-sm text-gray-700 whitespace-pre-wrap pt-2 break-words">
            {note.content}
          </div>
        )}
      </div>

      {/* Rodapé do Card (com os botões de ação) */}
      <footer className="mt-auto p-3 bg-gray-50 border-t border-gray-100 flex justify-end gap-2">
        <Button
          variant="ghost"
          size="icon"
          className="text-gray-500 hover:text-blue-600 hover:bg-blue-100"
          onClick={() => onEdit(note)}
        >
          <Pencil className="w-5 h-5" />
          <span className="sr-only">Editar nota</span>
        </Button>
        <Button
          variant="ghost"
          size="icon"
          className="text-gray-500 hover:text-red-600 hover:bg-red-100"
          onClick={() => onDelete(note.id)}
        >
          <Trash2 className="w-5 h-5" />
          <span className="sr-only">Excluir nota</span>
        </Button>
      </footer>
    </article>
  );
}