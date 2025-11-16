// app/(dashboard)/anotacoes/page.tsx
"use client";

import { useState } from "react";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { type Note } from "../components/anotacoes/types";
import { NoteCard } from "../components/anotacoes/NoteCard";
import { NoteModal } from "../components/anotacoes/NoteModal";
import { useLocalStorageState } from "@/lib/hooks/useLocalStorageState"; // O hook de persistência!

// --- DADOS DE EXEMPLO ---
// Usado apenas na primeira vez que o usuário carregar a página
const MOCK_NOTES: Note[] = [
  {
    id: "1",
    title: "Prova de Física",
    flashcards: [
      { id: "fc1", front: "O que é Termodinâmica?", back: "O estudo das relações entre calor, trabalho e energia." },
      { id: "fc2", front: "Primeira Lei da Termodinâmica", back: "ΔU = Q - W (A energia interna de um sistema aumenta quando calor é adicionado e diminui quando trabalho é realizado)." },
    ],
    content: "Não esquecer de verificar o capítulo 3 do livro e os exercícios da lista extra.",
  },
  {
    id: "2",
    title: "Conceitos de React",
    flashcards: [
      { id: "fc3", front: "O que é um Hook?", back: "Uma função especial que permite 'ligar-se' ao estado e ciclo de vida do React a partir de componentes de função." },
    ],
    content: "Revisar a palestra do Dan Abramov sobre 'useEffect'.",
  },
];
// --- FIM DOS DADOS DE EXEMPLO ---


export default function AnotacoesPage() {
  
  // --- GERENCIAMENTO DE ESTADO COM PERSISTÊNCIA ---
  
  // Substituímos 'useState' por nosso hook. 
  // Ele tentará carregar 'anotacoes-data'. Se falhar, usará MOCK_NOTES.
  // Qualquer mudança feita com 'setNotes' será salva automaticamente.
  const [notes, setNotes] = useLocalStorageState<Note[]>('anotacoes-data', MOCK_NOTES);
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingNote, setEditingNote] = useState<Note | null>(null);

  
  // --- FUNÇÕES DE CONTROLE (CRUD) ---

  const handleAddNewNote = () => {
    setEditingNote(null);
    setIsModalOpen(true);
  };

  const handleEditNote = (note: Note) => {
    setEditingNote(note);
    setIsModalOpen(true);
  };

  const handleDeleteNote = (id: string) => {
    // 'setNotes' vem do nosso hook, então esta mudança será persistida.
    setNotes(currentNotes => currentNotes.filter(note => note.id !== id));
  };

  // Esta função é chamada pelo Modal
  const handleSaveNote = (noteData: Omit<Note, 'id'>) => {
    
    if (editingNote) {
      // ATUALIZAR (O 'setNotes' salvará no localStorage)
      setNotes(currentNotes =>
        currentNotes.map(note =>
          note.id === editingNote.id ? { ...note, id: editingNote.id, ...noteData } : note
        )
      );
    } else {
      // CRIAR (O 'setNotes' salvará no localStorage)
      const newNote: Note = {
        id: Date.now().toString(), // ID único baseado no tempo
        ...noteData,
      };
      setNotes(currentNotes => [newNote, ...currentNotes]);
    }

    setIsModalOpen(false);
    setEditingNote(null);
  };

  // --- RENDERIZAÇÃO DA PÁGINA ---
  return (
    // O 'key' no 'div' principal é um truque opcional para forçar a
    // re-renderização da página se o número de notas mudar,
    // garantindo que animações ou estados sejam resetados.
    <div key={notes.length} className="p-6 md:p-8 space-y-6">
      
      {/* Cabeçalho */}
      <header className="flex items-center justify-between gap-4">
        <h1 className="text-3xl font-bold text-gray-900">Anotações</h1>
        
        <Button onClick={handleAddNewNote} className="flex-shrink-0">
          <Plus className="w-5 h-5 mr-2" />
          Adicionar Nota
        </Button>
      </header>

      {/* Grade Responsiva de Anotações */}
      {notes.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {notes.map(note => (
            <NoteCard
              key={note.id}
              note={note}
              onEdit={handleEditNote}
              onDelete={handleDeleteNote}
            />
          ))}
        </div>
      ) : (
        // Mensagem de fallback se não houver notas
        <div className="text-center py-20 border-2 border-dashed border-gray-200 rounded-lg">
          <h3 className="text-xl font-medium text-gray-500">Você ainda não tem anotações.</h3>
          <p className="text-gray-400 mt-2">Que tal criar a sua primeira?</p>
          <Button onClick={handleAddNewNote} className="mt-4">
            <Plus className="w-5 h-5 mr-2" />
            Criar minha primeira nota
          </Button>
        </div>
      )}

      {/* O Modal (Renderizado, mas invisível até ser aberto) */}
      <NoteModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSaveNote}
        noteToEdit={editingNote}
      />
    </div>
  );
}