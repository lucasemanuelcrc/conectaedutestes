// components/anotacoes/NoteModal.tsx
"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { X, Plus } from "lucide-react";
import { type Note, type Flashcard } from "./types"; // Importando os tipos

interface NoteModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (noteData: Omit<Note, 'id'>) => void;
  noteToEdit: Note | null;
}

export function NoteModal({ isOpen, onClose, onSave, noteToEdit }: NoteModalProps) {
  const [title, setTitle] = useState("");
  const [flashcards, setFlashcards] = useState<Flashcard[]>([]);
  const [content, setContent] = useState("");

  // Efeito para popular o formulário quando 'noteToEdit' mudar
  useEffect(() => {
    if (noteToEdit) {
      setTitle(noteToEdit.title);
      setFlashcards([...noteToEdit.flashcards]); 
      setContent(noteToEdit.content);
    } else {
      setTitle("");
      setFlashcards([]); // Começa sem flashcards
      setContent("");
    }
  }, [noteToEdit, isOpen]);

  // --- Funções do Formulário de Flashcards ---
  const handleAddFlashcard = () => {
    setFlashcards([...flashcards, { id: `new-${Date.now()}`, front: "", back: "" }]);
  };

  const handleRemoveFlashcard = (id: string) => {
    setFlashcards(flashcards.filter(fc => fc.id !== id));
  };

  const handleFlashcardChange = (id: string, side: 'front' | 'back', value: string) => {
    setFlashcards(currentFlashcards =>
      currentFlashcards.map(fc =>
        fc.id === id ? { ...fc, [side]: value } : fc
      )
    );
  };
  
  // Função principal de salvar
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const noteData = {
      title: title || "Anotação Sem Título",
      // Filtra flashcards que estejam completamente vazios
      flashcards: flashcards.filter(fc => fc.front.trim() !== "" || fc.back.trim() !== "")
                            // Atribui um ID permanente se for novo
                           .map(fc => ({ ...fc, id: fc.id.startsWith('new-') ? Date.now().toString() : fc.id })),
      content: content,
    };
    onSave(noteData);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px] bg-white max-h-[90vh] flex flex-col">
        <DialogHeader>
          <DialogTitle>
            {noteToEdit ? "Editar Anotação" : "Criar Nova Anotação"}
          </DialogTitle>
          <DialogDescription>
            {noteToEdit
              ? "Faça suas alterações. Clique em 'Salvar' quando terminar."
              : "Preencha os campos para criar sua nova nota e flashcards."}
          </DialogDescription>
        </DialogHeader>

        {/* Formulário com scroll interno */}
        <form id="note-form" onSubmit={handleSubmit} className="space-y-4 py-4 overflow-y-auto flex-1 pr-3">
          
          <div className="space-y-2">
            <label htmlFor="title" className="font-medium text-sm">Título</label>
            <Input
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Ex: Conceitos de Física Quântica"
            />
          </div>
          
          {/* --- Bloco do Formulário de Flashcards --- */}
          <div className="space-y-2">
            <label className="font-medium text-sm">Flashcards</label>
            <div className="space-y-4 max-h-[30vh] overflow-y-auto pr-2 rounded-md">
              {flashcards.map((flashcard) => (
                <div key={flashcard.id} className="p-4 border rounded-md space-y-3 bg-gray-50 relative">
                  <Button 
                    type="button" 
                    variant="ghost" 
                    size="icon" 
                    className="absolute -top-3 -right-3 h-7 w-7 text-gray-400 hover:text-red-600 hover:bg-red-100 rounded-full"
                    onClick={() => handleRemoveFlashcard(flashcard.id)}
                  >
                    <X className="w-4 h-4" />
                    <span className="sr-only">Remover flashcard</span>
                  </Button>
                  
                  <Input
                    value={flashcard.front}
                    onChange={(e) => handleFlashcardChange(flashcard.id, 'front', e.target.value)}
                    placeholder="Frente (Pergunta ou Termo)"
                    className="bg-white"
                  />
                  <Textarea
                    value={flashcard.back}
                    onChange={(e) => handleFlashcardChange(flashcard.id, 'back', e.target.value)}
                    placeholder="Verso (Resposta ou Definição)"
                    rows={2}
                    className="bg-white"
                  />
                </div>
              ))}
            </div>
            <Button type="button" variant="outline" size="sm" onClick={handleAddFlashcard} className="mt-2">
              <Plus className="w-4 h-4 mr-2" />
              Adicionar Flashcard
            </Button>
          </div>
          {/* --- Fim do Bloco de Flashcards --- */}

          <div className="space-y-2">
            <label htmlFor="content" className="font-medium text-sm">Conteúdo Principal</label>
            <Textarea
              id="content"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Escreva aqui anotações gerais, links ou qualquer outro texto..."
              rows={4}
            />
          </div>
        </form>

        <DialogFooter className="mt-auto pt-4 border-t">
          <Button type="button" variant="outline" onClick={onClose}>
            Cancelar
          </Button>
          <Button type="submit" form="note-form">
            Salvar Anotação
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}