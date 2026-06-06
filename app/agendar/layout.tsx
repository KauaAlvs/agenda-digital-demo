import NavegacaoCliente from '@/components/SidebarCliente';
import { MapPin, Star } from 'lucide-react';

export const metadata = {
  title: 'Agendar Horário | PASM',
  description: 'Agende seu horário online de forma rápida e fácil.',
};

// --- MOCK DATA DO PROFISSIONAL (Pode virar props ou puxar de API depois) ---
const profissional = {
  nome: 'Seu nome',
  especialidade: 'Sua empresa',
  bio: 'Transformando seu visual com técnicas avançadas e atendimento exclusivo.',
  endereco: 'Rua Seu espaço, 1000 - São Paulo, SP',
  nota: '4.9',
  avaliacoes: 128
};

export default function AgendarLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans pb-24 md:pb-0">
      
      {/* 1. NAVEGAÇÃO (Header Desktop e FAB Mobile) */}
      <NavegacaoCliente />

      {/* 2. CONTAINER PRINCIPAL */}
      <main className="flex-1 w-full max-w-5xl mx-auto px-4 sm:px-6 py-6 sm:py-8 flex flex-col md:flex-row gap-6 lg:gap-8">
        
        {/* --- COLUNA ESQUERDA: CARD DO PROFISSIONAL --- */}
        <div className="w-full md:w-80 shrink-0">
          <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-500">
            {/* Capa */}
            <div className="h-32 bg-gradient-to-br from-blue-600 to-indigo-700 relative">
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl -translate-y-1/2 translate-x-1/4" />
            </div>
            
            <div className="px-6 pb-6 pt-0 relative flex flex-col items-center md:items-start text-center md:text-left">
              {/* Avatar Flutuante */}
              <div className="h-24 w-24 rounded-full border-4 border-white bg-slate-100 flex items-center justify-center text-xl font-black text-slate-400 shadow-sm -mt-12 mb-4 overflow-hidden bg-[url('https://i.pravatar.cc/10')] bg-cover bg-center" />
              
              <h1 className="text-xl font-black text-slate-900 leading-tight">{profissional.nome}</h1>
              <p className="text-sm font-medium text-blue-600 mb-4">{profissional.especialidade}</p>
              
              <div className="flex items-center gap-1.5 text-sm font-bold text-slate-700 mb-5 bg-amber-50 px-3 py-1.5 rounded-xl border border-amber-100">
                <Star className="w-4 h-4 text-amber-500 fill-amber-500" />
                {profissional.nota} <span className="text-amber-700/60 font-medium text-xs">({profissional.avaliacoes} avaliações)</span>
              </div>
              
              <p className="text-sm text-slate-600 leading-relaxed mb-5">
                {profissional.bio}
              </p>
              
              <div className="flex items-start gap-2 text-xs font-medium text-slate-500 pt-5 border-t border-slate-100 w-full justify-center md:justify-start text-left">
                <MapPin className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
                <span>{profissional.endereco}</span>
              </div>
            </div>
          </div>
        </div>

        {/* --- COLUNA DIREITA: CONTEÚDO DINÂMICO (As Páginas) --- */}
        <div className="flex-1 w-full">
          {children}
        </div>

      </main>
    </div>
  );
}