'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X, Calendar, History, User } from 'lucide-react';

export default function NavegacaoCliente() {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Evita o bug de rolagem de fundo no mobile
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [isMobileMenuOpen]);

  const navLinks = [
    { name: 'Agendar Horário', href: '/agendar', icon: Calendar },
    { name: 'Minhas Visitas', href: '/agendar/visitas', icon: History },
    { name: 'Meu Perfil', href: '/agendar/perfil', icon: User },
  ];

  return (
    <>
      {/* ========================================= */}
      {/* DESKTOP: HEADER TOP NAVIGATION            */}
      {/* ========================================= */}
      <header className="hidden md:flex w-full bg-white border-b border-slate-200">
        <div className="w-full max-w-5xl mx-auto px-6 h-20 flex items-center justify-between">
          
          {/* Logo / Identidade Profissional */}
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-full bg-gradient-to-br from-blue-600 to-indigo-700 flex items-center justify-center text-white font-black shadow-md">
              S.E.
            </div>
            <span className="font-black text-slate-900 text-xl tracking-tight">SUA EMPRESA</span>
          </div>

          {/* Menu Desktop (Pills/Links) */}
          <nav className="flex items-center gap-2 bg-slate-50 p-1.5 rounded-full border border-slate-100">
            {navLinks.map(link => {
              const isActive = pathname === link.href;
              const Icon = link.icon;
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-bold transition-all ${
                    isActive 
                      ? 'bg-blue-600 text-white shadow-md shadow-blue-500/20' 
                      : 'text-slate-500 hover:text-slate-900 hover:bg-slate-200/50'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  {link.name}
                </Link>
              );
            })}
          </nav>
        </div>
      </header>

      {/* ========================================= */}
      {/* MOBILE: BOTÃO FLUTUANTE (HAMBÚRGUER)      */}
      {/* ========================================= */}
      <button
        onClick={() => setIsMobileMenuOpen(true)}
        className="md:hidden fixed bottom-6 right-6 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-slate-900 text-white shadow-xl shadow-slate-900/30 active:scale-95 transition-all"
      >
        <Menu className="w-6 h-6" />
      </button>

      {/* ========================================= */}
      {/* MOBILE: SIDEBAR LATERAL (DRAWER)          */}
      {/* ========================================= */}
      {isMobileMenuOpen && (
        <div className="md:hidden">
          {/* Fundo Escuro com Blur */}
          <div
            className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-sm animate-in fade-in duration-300"
            onClick={() => setIsMobileMenuOpen(false)}
          />

          {/* Menu Deslizando da Direita */}
          <aside className="fixed top-0 right-0 bottom-0 z-50 w-72 bg-white shadow-2xl flex flex-col animate-in slide-in-from-right duration-300">
            <div className="flex items-center justify-between p-6 border-b border-slate-100 bg-slate-50/50">
              <span className="font-black text-slate-900 text-lg">Menu</span>
              <button
                onClick={() => setIsMobileMenuOpen(false)}
                className="p-2 bg-white border border-slate-200 rounded-full text-slate-500 hover:bg-slate-50 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <nav className="flex flex-col gap-2 p-4 flex-1">
              {navLinks.map(link => {
                const isActive = pathname === link.href;
                const Icon = link.icon;
                return (
                  <Link
                    key={link.name}
                    href={link.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={`flex items-center gap-3 px-4 py-4 rounded-2xl font-bold transition-all ${
                      isActive 
                        ? 'bg-blue-50 text-blue-700 border border-blue-100' 
                        : 'text-slate-600 border border-transparent hover:bg-slate-50'
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                    {link.name}
                  </Link>
                );
              })}
            </nav>

            <div className="p-6 border-t border-slate-100 text-center">
              <p className="text-xs font-medium text-slate-400">Powered by PASM</p>
            </div>
          </aside>
        </div>
      )}
    </>
  );
}