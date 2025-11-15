// dashboard/layout.tsx
import Sidebar from './components/Sidebar'; // Importa a sidebar que criamos

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    // Usamos Flexbox para colocar a sidebar e o conteúdo lado a lado
    <div className="flex">
      {/* 1. A Sidebar Fixa */}
      <Sidebar />

      {/* 2. O Conteúdo da Página (que é flexível) */}
      <main className="flex-1 p-6">
        {/* 'children' representa o arquivo 'page.tsx' que for carregado */}
        {children}
      </main>
    </div>
  );
}