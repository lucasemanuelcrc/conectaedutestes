// 🛑 SEM 'use client;' AQUI (Este é um Server Component)

// Importa os dois "cérebros" (Provedores)
import { AnotacoesProvider } from '@/app/context/AnotacoesContext';

// Seus imports existentes
import Sidebar from './components/Sidebar';
import { ReactNode } from 'react';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
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