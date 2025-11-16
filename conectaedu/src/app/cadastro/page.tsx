// app/signup/page.tsx

// 1. Importe o componente que você acabou de salvar
import  SignupFormDemo from "@/components/signup-form-demo";

export default function SignupPage() {
  return (
    // Opcional: Adicionei classes para centralizar o formulário na página
    <div className="flex min-h-screen items-center justify-center bg-gray-100 dark:bg-gray-900">
      
      {/* 2. Use o componente como uma tag HTML */}
      <SignupFormDemo />

    </div>
  );
}