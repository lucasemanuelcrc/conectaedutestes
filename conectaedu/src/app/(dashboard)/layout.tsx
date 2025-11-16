// 1. Corrigi o caminho do import (removi o '/app')
import { AnotacoesProvider } from '@/app/context/AnotacoesContext'; 
import Sidebar from './components/Sidebar'; // Importa a sidebar que criamos
import { ReactNode } from 'react';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    // 2. Adicionei o "abraço" do Provedor por fora da sua div
    <AnotacoesProvider>
      <div className="flex">

        <Sidebar />

        <main className="flex-1 p-6">
          {children}
        </main>
        
      </div>
    </AnotacoesProvider>
  );
}