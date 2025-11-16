// dashboard/components/Sidebar.tsx
"use client";

import { useState } from 'react'; // O useState ainda é necessário
import Image from 'next/image';
import Link from 'next/link';
import {
  LayoutDashboard,
  BookOpen,
  FileText,
  Calendar,
  Settings,
  LogOut,
  ChevronRight, // Não precisamos mais do ChevronLeft
  type LucideIcon
} from 'lucide-react';

// --- (Arrays de links - sem alterações) ---
interface NavLink { icon: LucideIcon; label: string; href: string; }
const topNavLinks: NavLink[] = [
  { icon: LayoutDashboard, label: "Inicio", href: "/dashboard/inicio" },
  { icon: BookOpen, label: "Aulas", href: "/dashboard/aulas" },
  { icon: FileText, label: "Anotações", href: "/dashboard/anotacoes" },
  { icon: Calendar, label: "Calendário", href: "/dashboard/calendario" },
];
const bottomNavLinks: NavLink[] = [
  { icon: Settings, label: "Configurações", href: "/dashboard/configuracoes" },
  { icon: LogOut, label: "Sair", href: "/login" },
];
// --- (Fim dos arrays) ---

export default function Sidebar() {
  // 1. MUDANÇA: Começa FECHADO por padrão
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <aside
      className={`
        h-screen sticky top-0
        ${isExpanded ? 'w-56' : 'w-20'} /* Larguras (aberto/fechado) */
        
        bg-gradient-to-b from-[#11348d] to-[#0b0918]
        text-white
        transition-all duration-300 ease-in-out
        flex flex-col
        rounded-r-2xl
      `}
      // 2. MUDANÇA: Eventos de mouse para expandir/contrair
      onMouseEnter={() => setIsExpanded(true)}
      onMouseLeave={() => setIsExpanded(false)}
    >
      {/* 1. Cabeçalho da Sidebar */}
      <div className={`p-3 flex items-center ${isExpanded ? 'justify-start' : 'justify-center'}`}>
        
        {/* Bloco da Logo (funciona com o hover) */}
        <div>
          {/* Logo Grande (Visível quando expandido) */}
          <Image
            src="/logobranca.png"
            alt="Logo"
            width={200}
            height={300}
            className={`
              w-60 h-auto
              ${isExpanded ? 'block' : 'hidden'}
            `}
          />
          
          {/* Logo Pequena (Visível quando contraído) */}
        </div>

        {/* 3. MUDANÇA: Botão (agora sem onClick e invisível quando aberto) */}
        <button
          className={`
            p-2 rounded-lg text-white
            ${isExpanded ? 'hidden' : 'block'}
          `}
        >
          <ChevronRight size={20} />
        </button>
      </div>
      
      {/* 2. Links de Navegação Superiores (funciona com o hover) */}
      <nav className="px-4">
        <ul className="space-y-2">
          {topNavLinks.map((link) => (
            <li key={link.label}>
              <SidebarLink {...link} isExpanded={isExpanded} />
            </li>
          ))}
        </ul>
      </nav>

      {/* 3. Links de Navegação Inferiores (funciona com o hover) */}
      <nav className="mt-auto p-4 border-t border-white/10">
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

// --- Sub-componente SidebarLink (sem alterações) ---
interface SidebarLinkProps extends NavLink {
  isExpanded: boolean;
}

function SidebarLink({ icon: Icon, label, href, isExpanded }: SidebarLinkProps) {
  return (
    <Link
      href={href}
      className={`
        flex items-center p-3 rounded-lg
        text-gray-200 
        hover:bg-white/10
        transition-colors duration-200
      `}
    >
      <Icon size={22} />
      <span
        className={`
          overflow-hidden transition-all duration-200 whitespace-nowrap
          font-semibold
          ${isExpanded ? 'ml-4 w-full' : 'w-0'}
        `}
      >
        {label}
      </span>
    </Link>
  );
}