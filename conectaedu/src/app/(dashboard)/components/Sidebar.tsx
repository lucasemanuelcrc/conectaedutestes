// dashboard/components/Sidebar.tsx
"use client";

import { useState } from 'react';
import Image from 'next/image'; // Importar o componente Image do Next
import {
  LayoutDashboard, // Ícone para "Inicio"
  BookOpen,       // Ícone para "Aulas"
  FileText,       // Ícone para "Anotações"
  Calendar,       // Ícone para "Calendário"
  Settings,       // Ícone para "Configurações"
  LogOut,         // Ícone para "Sair"
  ChevronLeft,
  ChevronRight,
  type LucideIcon
} from 'lucide-react';

// --- Define o tipo para um link de navegação ---
interface NavLink {
  icon: LucideIcon;
  label: string;
  href: string;
}

// --- Links de Navegação Superiores ---
const topNavLinks: NavLink[] = [
  { icon: LayoutDashboard, label: "Inicio", href: "/inicio" },
  { icon: BookOpen, label: "Aulas", href: "/inicio" }, // Atualize os hrefs
  { icon: FileText, label: "Anotações", href: "#" },
  { icon: Calendar, label: "Calendário", href: "#" },
];

// --- Links de Navegação Inferiores ---
const bottomNavLinks: NavLink[] = [
  { icon: Settings, label: "Configurações", href: "#" },
  { icon: LogOut, label: "Sair", href: "/" },
];

export default function Sidebar() {
  const [isExpanded, setIsExpanded] = useState(true);

  return (
    <aside
      className={`
        h-screen sticky top-0
        ${isExpanded ? 'w-64' : 'w-20'}
        bg-gradient-to-b from-[#11348d] to-[#0b0918] 
        transition-all duration-300 ease-in-out
        flex flex-col  /* layout vertical */
      `}
    >
      {/* 1. Cabeçalho da Sidebar (Logo + Botão) */}
      <div className="mb- flex items-center justify-between">
        {/* Logo: Anima junto com a sidebar */}
        <div
          className={`
            overflow-hidden transition-all duration-200
            ${isExpanded ? 'w-48' : 'w-0'} /* <-- ALTERAÇÃO FEITA AQUI */
          `}
        >
          <Image
            src="/logobranca.png"
            alt="Logo"
            width={150}
            height={150}
            className="h-50 w-auto" 
          />
        </div>

        {/* Botão de Toggle */}
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="p-2 rounded-lg hover:bg-slate-800 transition-colors text-white"
        >
          {isExpanded ? <ChevronLeft size={20} /> : <ChevronRight size={20} />}
        </button>
      </div>
      
      {/* 2. Links de Navegação Superiores */}
      <nav className="px-4"> {/* Padding lateral */}
        <ul className="space-y-2">
          {topNavLinks.map((link) => (
            <li key={link.label}>
              <SidebarLink {...link} isExpanded={isExpanded} />
            </li>
          ))}
        </ul>
      </nav>

      {/* 3. Links de Navegação Inferiores (Empurrados para baixo) */}
      <nav className="mt-auto p-4 border-t border-slate-700"> {/* mt-auto é a mágica */}
        <ul className="space-y-2">
          {bottomNavLinks.map((link) => (
            <li key={link.label}>
              <SidebarLink {...link} isExpanded={isExpanded} />
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
}

// --- Sub-componente SidebarLink (Não precisa mudar) ---
interface SidebarLinkProps extends NavLink {
  isExpanded: boolean;
}

function SidebarLink({ icon: Icon, label, href, isExpanded }: SidebarLinkProps) {
  return (
    <a
      href={href}
      className={`
        flex items-center p-3 rounded-lg
        text-gray-200 hover:bg-gray-100 hover:text-slate-900
        transition-colors duration-200
      `}
    >
      <Icon size={22} />
      <span
        className={`
          overflow-hidden transition-all duration-200 whitespace-nowrap
          font-bold
          ${isExpanded ? 'ml-4 w-full' : 'w-0'}
        `}
      >
        {label}
      </span>
    </a>
  );
}