'use client';

import { useState } from 'react';
import { 
  History, 
  Calendar, 
  Mail, 
  ArrowRight, 
  Clock, 
  Scissors, 
  CheckCircle2, 
  XCircle,
  RefreshCw,
  Lock,
  ChevronLeft
} from 'lucide-react';

// --- MOCK DATA ---
const mockAgendamentos = {
  proximos: [
    { id: '1', servico: 'Serviço Premium', data: '10 Junho', horario: '14:00', valor: 150.00, status: 'Confirmado' }
  ],
  anteriores: [
    { id: '2', servico: 'Manutenção Básica', data: '15 Maio', horario: '09:00', valor: 65.00, status: 'Concluído' },
    { id: '3', servico: 'Avaliação e Consultoria', data: '02 Abril', horario: '16:30', valor: 0.00, status: 'Cancelado' }
  ]
};

export default function PaginaVisitasCliente() {
  // 0 = Pede Email | 1 = Pede Código (OTP) | 2 = Logado (Lista de Visitas)
  const [authStep, setAuthStep] = useState(0);
  const [email, setEmail] = useState('');
  const [codigo, setCodigo] = useState('');
  const [isCarregando, setIsCarregando] = useState(false);
  
  // Controle das abas na área logada
  const [abaAtiva, setAbaAtiva] = useState<'proximos' | 'anteriores'>('proximos');

  const simularEnvioCodigo = (e: React.FormEvent) => {
    e.preventDefault();
    setIsCarregando(true);
    setTimeout(() => {
      setIsCarregando(false);
      setAuthStep(1); // Vai para a tela de código
    }, 1000);
  };

  const simularValidacaoCodigo = (e: React.FormEvent) => {
    e.preventDefault();
    setIsCarregando(true);
    setTimeout(() => {
      setIsCarregando(false);
      setAuthStep(2); // Loga o cliente
    }, 1000);
  };

  // --- TELA 1: LOGIN (Pede E-mail) ---
  if (authStep === 0) {
    return (
      <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-300">
        <div className="bg-slate-50/50 border-b border-slate-100 p-5 md:p-6">
          <h2 className="text-lg font-black text-slate-900 flex items-center gap-2">
            <History className="w-5 h-5 text-blue-600" />
            Seus Agendamentos
          </h2>
          <p className="text-sm font-medium text-slate-500 mt-1">Acompanhe seus horários e histórico.</p>
        </div>

        <div className="p-6 md:p-10 flex flex-col items-center justify-center text-center">
          <div className="w-20 h-20 bg-blue-50 rounded-full flex items-center justify-center mb-6 shadow-inner border border-blue-100">
            <Calendar className="w-10 h-10 text-blue-500" />
          </div>
          <h3 className="text-xl font-black text-slate-900 mb-2">Acesse seu histórico</h3>
          <p className="text-sm font-medium text-slate-500 max-w-sm mb-8 leading-relaxed">
            Insira seu e-mail cadastrado para visualizar seus agendamentos, cancelar ou remarcar horários de forma segura.
          </p>
          
          <form onSubmit={simularEnvioCodigo} className="w-full max-w-sm space-y-4">
            <div className="relative">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
              <input 
                required
                type="email" 
                placeholder="seu@email.com"
                value={email}
                onChange={e => setEmail(e.target.value)}
                className="w-full rounded-2xl bg-slate-50 border border-slate-200 py-4 pl-12 pr-4 text-sm font-bold text-slate-900 focus:bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none transition-all shadow-sm text-center"
              />
            </div>
            <button 
              type="submit"
              disabled={isCarregando || !email.includes('@')}
              className="w-full px-6 py-4 bg-slate-900 disabled:bg-slate-300 text-white font-bold rounded-2xl hover:bg-slate-800 transition-all shadow-lg shadow-slate-900/20 active:scale-95 flex items-center justify-center gap-2"
            >
              {isCarregando ? (
                <div className="h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent" />
              ) : (
                <>Receber Código <ArrowRight className="w-4 h-4" /></>
              )}
            </button>
          </form>
        </div>
      </div>
    );
  }

  // --- TELA 2: CÓDIGO DE VERIFICAÇÃO (E-mail) ---
  if (authStep === 1) {
    return (
      <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden animate-in slide-in-from-right-8 duration-300">
        <div className="bg-slate-50/50 border-b border-slate-100 p-5 md:p-6 flex items-center gap-4">
          <button onClick={() => setAuthStep(0)} className="p-2 bg-white rounded-full border border-slate-200 shadow-sm hover:bg-slate-50 transition-colors active:scale-95">
            <ChevronLeft className="w-5 h-5 text-slate-600" />
          </button>
          <div>
            <h2 className="text-lg font-black text-slate-900">Confirmação de Segurança</h2>
          </div>
        </div>

        <div className="p-6 md:p-10 flex flex-col items-center justify-center text-center">
          <div className="w-20 h-20 bg-amber-50 rounded-full flex items-center justify-center mb-6 shadow-inner border border-amber-100">
            <Lock className="w-10 h-10 text-amber-500" />
          </div>
          <h3 className="text-xl font-black text-slate-900 mb-2">Digite o código de 6 dígitos</h3>
          <p className="text-sm font-medium text-slate-500 max-w-sm mb-8 leading-relaxed">
            Enviamos um e-mail para <strong>{email}</strong>. Insira o código abaixo para acessar seus dados.
          </p>
          
          <form onSubmit={simularValidacaoCodigo} className="w-full max-w-xs space-y-6">
            <div className="relative">
              <input 
                required
                type="text" 
                maxLength={6}
                placeholder="000000"
                value={codigo}
                onChange={e => setCodigo(e.target.value.replace(/\D/g, ''))} // Apenas números
                className="w-full rounded-2xl bg-slate-50 border border-slate-200 py-4 px-4 text-2xl tracking-[0.5em] font-black text-slate-900 focus:bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none transition-all shadow-sm text-center"
              />
            </div>
            <button 
              type="submit"
              disabled={isCarregando || codigo.length < 6}
              className="w-full px-6 py-4 bg-blue-600 disabled:bg-slate-300 text-white font-bold rounded-2xl hover:bg-blue-700 transition-all shadow-lg shadow-blue-600/30 active:scale-95 flex items-center justify-center gap-2"
            >
              {isCarregando ? (
                <div className="h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent" />
              ) : (
                'Acessar Meus Agendamentos'
              )}
            </button>
          </form>
        </div>
      </div>
    );
  }

  // --- TELA 3: ÁREA LOGADA (LISTA DE VISITAS) ---
  return (
    <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden animate-in fade-in duration-300 flex flex-col h-full min-h-[500px]">
      
      {/* Header Logado */}
      <div className="bg-slate-50/50 border-b border-slate-100 p-5 md:p-6">
        <h2 className="text-lg font-black text-slate-900 flex items-center gap-2">
          <History className="w-5 h-5 text-blue-600" />
          Suas Visitas
        </h2>
        <div className="mt-4 flex bg-slate-200/50 p-1 rounded-xl">
          <button 
            onClick={() => setAbaAtiva('proximos')}
            className={`flex-1 py-2 text-sm font-bold rounded-lg transition-all ${abaAtiva === 'proximos' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
          >
            Próximos Horários
          </button>
          <button 
            onClick={() => setAbaAtiva('anteriores')}
            className={`flex-1 py-2 text-sm font-bold rounded-lg transition-all ${abaAtiva === 'anteriores' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
          >
            Histórico Anterior
          </button>
        </div>
      </div>

      {/* Listagem de Agendamentos */}
      <div className="p-5 md:p-6 overflow-y-auto bg-slate-50 flex-1">
        
        {/* ABA: PRÓXIMOS */}
        {abaAtiva === 'proximos' && (
          <div className="space-y-4 animate-in slide-in-from-left-4 duration-300">
            {mockAgendamentos.proximos.length > 0 ? (
              mockAgendamentos.proximos.map(ag => (
                <div key={ag.id} className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm hover:border-blue-200 transition-colors">
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex items-center gap-3">
                      <div className="p-2.5 bg-blue-50 rounded-xl text-blue-600">
                        <Scissors className="w-5 h-5" />
                      </div>
                      <div>
                        <h3 className="font-bold text-slate-900">{ag.servico}</h3>
                        <p className="text-xs font-medium text-slate-500 mt-0.5">Com Kauã Alves</p>
                      </div>
                    </div>
                    <span className="px-2.5 py-1 bg-emerald-50 text-emerald-600 border border-emerald-100 rounded-full text-[10px] font-black uppercase tracking-wider flex items-center gap-1">
                      <CheckCircle2 className="w-3 h-3" /> Confirmado
                    </span>
                  </div>

                  <div className="flex items-center gap-4 py-4 border-y border-slate-100 mb-4 bg-slate-50/50 -mx-5 px-5">
                    <div className="flex items-center gap-2 text-sm font-bold text-slate-700">
                      <Calendar className="w-4 h-4 text-slate-400" />
                      {ag.data}
                    </div>
                    <div className="w-px h-4 bg-slate-200" />
                    <div className="flex items-center gap-2 text-sm font-black text-slate-900">
                      <Clock className="w-4 h-4 text-slate-400" />
                      {ag.horario}
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <button className="flex-1 py-2.5 bg-white border border-slate-200 text-slate-700 text-xs font-bold rounded-xl hover:bg-slate-50 transition-colors">
                      Reagendar
                    </button>
                    <button className="flex-1 py-2.5 bg-white border border-rose-200 text-rose-600 text-xs font-bold rounded-xl hover:bg-rose-50 transition-colors">
                      Cancelar Horário
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-10">
                <Calendar className="w-12 h-12 text-slate-300 mx-auto mb-3" />
                <p className="font-bold text-slate-900">Nenhum agendamento futuro</p>
                <p className="text-sm text-slate-500 mt-1">Você não possui horários marcados.</p>
              </div>
            )}
          </div>
        )}

        {/* ABA: ANTERIORES */}
        {abaAtiva === 'anteriores' && (
          <div className="space-y-4 animate-in slide-in-from-right-4 duration-300">
            {mockAgendamentos.anteriores.map(ag => (
              <div key={ag.id} className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm opacity-80 hover:opacity-100 transition-opacity">
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <h3 className="font-bold text-slate-900">{ag.servico}</h3>
                    <div className="flex items-center gap-2 mt-1 text-xs font-medium text-slate-500">
                      <span>{ag.data} às {ag.horario}</span>
                      <span>•</span>
                      <span>R$ {ag.valor.toFixed(2)}</span>
                    </div>
                  </div>
                  {ag.status === 'Concluído' ? (
                    <span className="px-2 py-0.5 bg-slate-100 text-slate-600 rounded text-[10px] font-bold uppercase tracking-wider">
                      Concluído
                    </span>
                  ) : (
                    <span className="px-2 py-0.5 bg-rose-50 text-rose-600 rounded text-[10px] font-bold uppercase tracking-wider">
                      Cancelado
                    </span>
                  )}
                </div>

                <button className="w-full py-2.5 mt-2 bg-blue-50 text-blue-600 text-xs font-bold rounded-xl hover:bg-blue-100 transition-colors flex items-center justify-center gap-2">
                  <RefreshCw className="w-3.5 h-3.5" />
                  Agendar Novamente
                </button>
              </div>
            ))}
          </div>
        )}

      </div>
    </div>
  );
}