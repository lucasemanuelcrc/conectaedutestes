// components/anotacoes/types.ts

// O formato de um único Flashcard
export interface Flashcard {
  id: string;    // ID único (ex: 'fc1678886400000')
  front: string; // Pergunta ou Termo
  back: string;  // Resposta ou Definição
}

// O formato de uma Anotação (que contém vários flashcards)
export interface Note {
  id: string;
  title: string;
  flashcards: Flashcard[];
  content: string; // Conteúdo principal (texto livre)
}