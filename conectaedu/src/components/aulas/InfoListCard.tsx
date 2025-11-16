// components/dashboard/InfoListCard.tsx
import { ReactNode } from 'react';

interface InfoListCardProps {
  title: string;
  icon: ReactNode; // Aceita um ícone do lucide-react
  items: Array<{ text: string; detail?: string }>;
}

export function InfoListCard({ title, icon, items }: InfoListCardProps) {
  return (
    <div className="p-6 bg-white rounded-lg shadow-md border border-gray-100 h-full">
      <div className="flex items-center gap-3 mb-4">
        <div className="text-indigo-600">{icon}</div>
        <h3 className="text-lg font-semibold text-gray-800">{title}</h3>
      </div>
      <ul className="space-y-3">
        {items.map((item, index) => (
          <li key={index} className="text-gray-600 flex justify-between text-sm">
            <span>• {item.text}</span>
            {item.detail && <span className="text-gray-400">{item.detail}</span>}
          </li>
        ))}
      </ul>
    </div>
  );
}