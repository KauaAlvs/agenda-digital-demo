'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Loader2, Mail, Lock, LogIn, CheckCircle2 } from 'lucide-react';

export default function LoginPage() {
  const router = useRouter();
  const [isAuthenticating, setIsAuthenticating] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsAuthenticating(true);

    setTimeout(() => {
      setIsAuthenticating(false);
      setIsSuccess(true); 

      setTimeout(() => {
        router.push('/dashboard');
      }, 2500);
    }, 1500);
  };

  return (
    <main className="flex min-h-screen bg-slate-50">
      
      {/* LADO ESQUERDO: Branding PASM (Apenas Desktop) */}
      <div className="relative hidden lg:flex lg:w-1/2 flex-col items-center justify-center overflow-hidden bg-slate-900 p-12">
        {/* Efeitos de fundo premium */}
        <div className="absolute top-[-10%] left-[-10%] h-[50vh] w-[50vw] rounded-full bg-blue-600/20 blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-10%] h-[50vh] w-[50vw] rounded-full bg-indigo-600/20 blur-[120px]" />
        
        <div className="relative z-10 flex max-w-lg flex-col items-center text-center">
          <img 
            src="https://ik.imagekit.io/38cojzdyt/PASM/LOGO_COMPLETA-removebg-preview.png?updatedAt=1778244281010" 
            alt="Logo PASM" 
            className="mb-12 h-20 w-auto object-contain drop-shadow-2xl"
          />
          <h1 className="mb-6 text-4xl font-bold text-white tracking-tight leading-tight">
            A Gestão do Futuro para o seu Negócio
          </h1>
          <p className="text-lg text-slate-300 font-light leading-relaxed">
            Acesse nossa plataforma e descubra a experiência definitiva em controle administrativo e agendamento digital.
          </p>
        </div>
      </div>

      {/* LADO DIREITO: Login Form (Mobile e Desktop) */}
      <div className="relative flex w-full items-center justify-center p-6 sm:p-12 lg:w-1/2 overflow-hidden">
        
        {/* Background Animado para Mobile (oculto no desktop para manter o visual limpo) */}
        <div className="absolute inset-0 z-0 lg:hidden pointer-events-none">
          <div className="absolute top-[-5%] left-[-10%] h-[40vh] w-[60vw] rounded-full bg-blue-400/20 blur-[80px]" />
          <div className="absolute bottom-[-5%] right-[-10%] h-[40vh] w-[60vw] rounded-full bg-indigo-500/20 blur-[90px]" />
        </div>

        <div className={`relative z-10 w-full max-w-md transition-all duration-700 ${isSuccess ? 'scale-95 opacity-0' : 'scale-100 opacity-100'}`}>
          
          {/* Card Glassmorphism (com bordas brancas mais fortes para contraste) */}
          <div className="overflow-hidden rounded-[2rem] border border-white bg-white/80 shadow-2xl shadow-slate-200/50 backdrop-blur-2xl">
            
            <div className="px-8 pt-12 pb-8 text-center flex flex-col items-center">
              {/* Logo visível apenas no Mobile */}
              <img 
                src="https://ik.imagekit.io/38cojzdyt/PASM/LOGO_SIMBOLO-removebg-preview.png?updatedAt=1778244280822" 
                alt="Logo PASM" 
                className="mb-8 h-30 w-auto object-contain drop-shadow-sm lg:hidden"
              />
              <h2 className="text-2xl font-bold text-slate-800 tracking-tight">Acesse sua Agenda</h2>
              <p className="mt-2 text-sm text-slate-500 font-medium">Insira seus dados para continuar</p>
            </div>

            <div className="px-8 pb-12">
              <form onSubmit={handleLogin} className="space-y-6">
                
                <div className="space-y-2">
                  <div className="relative group">
                    <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4">
                      {/* Ícone com cor mais forte (slate-600) para melhor visibilidade */}
                      <Mail className="h-5 w-5 text-slate-600 group-focus-within:text-blue-600 transition-colors" />
                    </div>
                    <input
                      id="email"
                      type="email"
                      defaultValue="demo@pasm.com.br"
                      required
                      className="block w-full rounded-2xl border-0 bg-white py-4 pl-12 pr-4 text-sm text-slate-900 shadow-sm ring-1 ring-inset ring-slate-200 transition-all focus:ring-2 focus:ring-inset focus:ring-blue-600 outline-none"
                      placeholder="Seu e-mail de acesso"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="relative group">
                    <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4">
                      {/* Ícone com cor mais forte (slate-600) */}
                      <Lock className="h-5 w-5 text-slate-600 group-focus-within:text-blue-600 transition-colors" />
                    </div>
                    <input
                      id="password"
                      type="password"
                      defaultValue="123456"
                      required
                      className="block w-full rounded-2xl border-0 bg-white py-4 pl-12 pr-4 text-sm text-slate-900 shadow-sm ring-1 ring-inset ring-slate-200 transition-all focus:ring-2 focus:ring-inset focus:ring-blue-600 outline-none"
                      placeholder="••••••••"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isAuthenticating}
                  className="group relative flex w-full items-center justify-center gap-2 overflow-hidden rounded-2xl bg-blue-600 py-4 text-sm font-bold text-white shadow-lg shadow-blue-500/30 transition-all hover:bg-blue-700 hover:shadow-blue-500/40 focus:outline-none disabled:cursor-not-allowed disabled:opacity-80"
                >
                  {isAuthenticating ? (
                    <>
                      <Loader2 className="h-5 w-5 animate-spin" />
                      <span>Verificando credenciais...</span>
                    </>
                  ) : (
                    <>
                      <LogIn className="h-5 w-5 transition-transform group-hover:translate-x-1" />
                      <span>Entrar no Sistema</span>
                    </>
                  )}
                </button>

              </form>
            </div>
          </div>
        </div>
      </div>

      {/* Splash de Entrada no Sistema (Pós-Login) */}
      <div 
        className={`fixed inset-0 z-[200] flex flex-col items-center justify-center bg-blue-600 text-white transition-all duration-700 ease-in-out ${
          isSuccess ? 'opacity-100 visible' : 'opacity-0 invisible pointer-events-none'
        }`}
      >
        <div className="flex flex-col items-center space-y-6 transform transition-transform duration-700 delay-150">
          <div className="flex h-20 w-20 items-center justify-center rounded-full bg-white/20 backdrop-blur-md shadow-2xl animate-bounce">
            <CheckCircle2 className="h-10 w-10 text-white" />
          </div>
          <div className="flex flex-col items-center space-y-2 text-center px-4">
            <h2 className="text-3xl font-bold tracking-tight">Acesso Liberado</h2>
            <p className="text-blue-100 font-medium">Preparando seu ambiente exclusivo...</p>
          </div>
          <Loader2 className="h-8 w-8 animate-spin text-blue-200 mt-4" />
        </div>
      </div>

    </main>
  );
}