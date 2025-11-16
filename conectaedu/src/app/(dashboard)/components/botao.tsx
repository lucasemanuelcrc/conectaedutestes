import Link from 'next/link';
import { ComponentProps } from 'react';

// Define os tipos de variantes de estilo
type BotaoVariante = 'primario' | 'secundario' | 'perigo';

// Define as propriedades (props) do componente
type BotaoProps = {
  variante?: BotaoVariante;
  href?: string;
} & (ComponentProps<'button'> | ComponentProps<'a'>);

// Objeto de estilos do Tailwind para cada variante
const variantes: Record<BotaoVariante, string> = {
  primario:
    'bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500',
  secundario:
    'bg-gray-200 text-gray-800 hover:bg-gray-300 focus:ring-gray-400',
  perigo:
    'bg-red-600 text-white hover:bg-red-700 focus:ring-red-500',
};

export default function Botao({
  variante = 'primario',
  href,
  children,
  className,
  ...props
}: BotaoProps) {
  
  const estiloBase =
    'inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-lg font-semibold text-sm shadow-sm transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2';

  const classNameCombinada = `${estiloBase} ${variantes[variante]} ${className || ''}`;

  if (href) {
    const { type, ...propsLink } = props as ComponentProps<'a'>;
    return (
      <Link href={href} className={classNameCombinada} {...propsLink}>
        {children}
      </Link>
    );
  }

  return (
    <button
      type="button"
      className={classNameCombinada}
      {...(props as ComponentProps<'button'>)}
    >
      {children}
    </button>
  );
}