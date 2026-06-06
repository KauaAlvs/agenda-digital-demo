'use client';

import { useState } from 'react';
import { 
  User, 
  Phone, 
  Mail, 
  Gift, 
  Save, 
  CheckCircle2, 
  ShieldCheck,
  LogOut,
  AlertCircle
} from 'lucide-react';

export default function PaginaPerfilCliente() {
  // Simulação: Cliente logado via E-mail
  const [isLogged] = useState(true); 
  const [isSalvando, setIsSalvando] = useState(false);
  const [salvoSucesso, setSalvoSucesso] = useState(false);

  // Dados do Cliente Final
  const [cliente, setCliente] = useState({
    nome: 'Kauã Alves',
    email: 'kaua@cliente.com', // Agora este é o campo verificado
    telefone: '(11) 99999-9999', 
    dataNascimento: '1998-06-15'
  });

  const salvarDados = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSalvando(true);
    
    setTimeout(() => {
      setIsSalvando(false);
      setSalvoSucesso(true);
      setTimeout(() => setSalvoSucesso(false), 3000);
    }, 1200);
  };

  return (
    <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-300 w-full">
      
      {/* Header */}
      <div className="bg-slate-50/50 border-b border-slate-100 p-5 md:p-6 flex items-center justify-between">
        <div>
          <h2 className="text-lg font-black text-slate-900 flex items-center gap-2">
            <User className="w-5 h-5 text-blue-600" />
            Seus Dados
          </h2>
          <p className="text-[10px] font-bold text-slate-500 uppercase tracking-wider mt-1">Gerencie seu cadastro</p>
        </div>

        {/* Badge de Conta Verificada */}
        <div className="hidden sm:flex items-center gap-1.5 px-3 py-1 bg-emerald-50 text-emerald-600 border border-emerald-100 rounded-full text-xs font-bold shadow-sm">
          <ShieldCheck className="w-3.5 h-3.5" />
          Conta Verificada
        </div>
      </div>

      <div className="p-5 md:p-8">
        
        {/* Aviso de Preenchimento */}
        <div className="flex items-start gap-3 p-4 bg-blue-50 border border-blue-100 rounded-2xl mb-6">
          <AlertCircle className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
          <div>
            <p className="font-bold text-blue-900 text-sm">Mantenha seus dados atualizados</p>
            <p className="text-xs text-blue-700/80 mt-1 leading-relaxed">
              Com seu cadastro completo, seus próximos agendamentos são feitos em 1 clique. Adicione seu celular para o estabelecimento poder confirmar horários com você.
            </p>
          </div>
        </div>

        <form onSubmit={salvarDados} className="space-y-5">
          
          {/* Email Trancado e Nome */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="space-y-1.5 relative">
              <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">E-mail (Acesso)</label>
              <div className="relative opacity-60 cursor-not-allowed">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-500" />
                <input 
                  disabled
                  type="email" 
                  value={cliente.email}
                  className="w-full rounded-2xl bg-slate-100 border border-slate-200 py-3.5 pl-11 pr-4 text-sm font-bold text-slate-600 outline-none shadow-inner cursor-not-allowed"
                />
                <ShieldCheck className="absolute right-4 top-1/2 -translate-y-1/2 h-4 w-4 text-emerald-500" />
              </div>
              <p className="text-[10px] font-bold text-emerald-600 mt-1 ml-1 flex items-center gap-1">
                E-mail verificado.
              </p>
            </div>

            <div className="space-y-1.5 relative">
              <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">Nome Completo</label>
              <div className="relative">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                <input 
                  required
                  type="text" 
                  value={cliente.nome}
                  onChange={e => setCliente({...cliente, nome: e.target.value})}
                  className="w-full rounded-2xl bg-slate-50 border border-slate-200 py-3.5 pl-11 pr-4 text-sm font-medium text-slate-900 focus:bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none transition-all shadow-sm"
                />
              </div>
            </div>
          </div>

          {/* Celular e Data de Nascimento */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 pt-2">
            <div className="space-y-1.5 relative">
              <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">WhatsApp de Contato</label>
              <div className="relative">
                <Phone className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                <input 
                  required
                  type="tel" 
                  placeholder="(00) 00000-0000"
                  value={cliente.telefone}
                  onChange={e => setCliente({...cliente, telefone: e.target.value})}
                  className="w-full rounded-2xl bg-slate-50 border border-slate-200 py-3.5 pl-11 pr-4 text-sm font-medium text-slate-900 focus:bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none transition-all shadow-sm"
                />
              </div>
            </div>

            <div className="space-y-1.5 relative">
              <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">Data de Nascimento</label>
              <div className="relative">
                <Gift className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                <input 
                  type="date" 
                  value={cliente.dataNascimento}
                  onChange={e => setCliente({...cliente, dataNascimento: e.target.value})}
                  className="w-full rounded-2xl bg-slate-50 border border-slate-200 py-3.5 pl-11 pr-4 text-sm font-medium text-slate-900 focus:bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none transition-all shadow-sm"
                />
              </div>
              <p className="text-[10px] text-slate-400 mt-1 ml-1">Para receber mimos no seu dia especial 🎉</p>
            </div>
          </div>

          <div className="pt-6 mt-6 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4">
            
            <button
              type="button"
              className="flex items-center justify-center gap-2 px-5 py-3.5 rounded-2xl text-rose-500 font-bold text-sm bg-rose-50 border border-rose-100 hover:bg-rose-100 transition-colors w-full sm:w-auto active:scale-95 order-2 sm:order-1"
            >
              <LogOut className="w-4 h-4" />
              Sair da Conta
            </button>

            <button
              type="submit"
              disabled={isSalvando || salvoSucesso}
              className={`flex w-full sm:w-auto items-center justify-center gap-2 rounded-2xl px-8 py-3.5 text-sm font-bold text-white shadow-xl transition-all active:scale-95 order-1 sm:order-2 ${
                salvoSucesso 
                  ? 'bg-emerald-500 shadow-emerald-500/30' 
                  : 'bg-blue-600 hover:bg-blue-700 shadow-blue-500/30'
              }`}
            >
              {isSalvando ? (
                <div className="h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent" />
              ) : salvoSucesso ? (
                <><CheckCircle2 className="h-5 w-5" /> Salvo com Sucesso</>
              ) : (
                <><Save className="h-5 w-5" /> Salvar Dados</>
              )}
            </button>

          </div>
        </form>

      </div>
    </div>
  );
}