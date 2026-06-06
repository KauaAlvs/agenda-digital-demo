'use client';

import { useState } from 'react';
import { 
  Users, 
  DollarSign, 
  CalendarCheck, 
  TrendingUp, 
  Clock,
  CheckCircle2,
  XCircle,
  AlertCircle,
  X,
  ChevronRight,
  Calendar,
  MessageCircle,
  User,
  Sparkles
} from 'lucide-react';

// Tipagem do nosso Mock
type StatusAgendamento = 'Confirmado' | 'Pendente' | 'Cancelado';

interface Agendamento {
  id: string;
  cliente: string;
  telefone: string;
  servico: string;
  data: string;
  horario: string;
  valor: number;
  status: StatusAgendamento;
  profissional: string;
}

// Dados Mockados (Preenchidos para melhor visualização)
const mockAgendamentosInicial: Agendamento[] = [
  { id: '1', cliente: 'Maria Silva', telefone: '5511999991111', servico: 'Serviço Premium', data: '05 Jun', horario: '14:00', valor: 120, status: 'Confirmado', profissional: 'Ana' },
  { id: '2', cliente: 'João Pedro', telefone: '5511999992222', servico: 'Serviço Básico', data: '05 Jun', horario: '15:30', valor: 65, status: 'Pendente', profissional: 'Carlos' },
  { id: '3', cliente: 'Ana Clara', telefone: '5511999993333', servico: 'Pacote Mensal', data: '05 Jun', horario: '16:00', valor: 250, status: 'Confirmado', profissional: 'Ana' },
  { id: '4', cliente: 'Marcos Paulo', telefone: '5511999994444', servico: 'Serviço Rápido', data: '05 Jun', horario: '17:30', valor: 45, status: 'Cancelado', profissional: 'Carlos' },
  { id: '5', cliente: 'Juliana Costa', telefone: '5511999995555', servico: 'Avaliação', data: '05 Jun', horario: '18:00', valor: 70, status: 'Pendente', profissional: 'Bia' },
];

export default function DashboardPage() {
  const [showAlert, setShowAlert] = useState(true);
  const [agendamentos, setAgendamentos] = useState<Agendamento[]>(mockAgendamentosInicial);
  const [selectedAgendamento, setSelectedAgendamento] = useState<Agendamento | null>(null);

  // Função auxiliar para cores de status padronizada
  const getStatusStyle = (status: StatusAgendamento) => {
    switch (status) {
      case 'Confirmado': return 'bg-emerald-100 text-emerald-700 border-emerald-200';
      case 'Pendente': return 'bg-amber-100 text-amber-700 border-amber-200';
      case 'Cancelado': return 'bg-rose-100 text-rose-700 border-rose-200';
      default: return 'bg-slate-100 text-slate-700 border-slate-200';
    }
  };

  // Função para simular a mudança de status em tempo real
  const handleMudarStatus = (id: string, novoStatus: StatusAgendamento) => {
    setAgendamentos(prev => prev.map(ag => 
      ag.id === id ? { ...ag, status: novoStatus } : ag
    ));
    if (selectedAgendamento?.id === id) {
      setSelectedAgendamento({ ...selectedAgendamento, status: novoStatus });
    }
  };

  return (
    <div className="space-y-8 pb-24 lg:pb-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      
      {/* HEADER */}
      <header className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between px-4 sm:px-0">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900 lg:text-3xl">Visão Geral</h1>
          <p className="mt-1 text-sm text-slate-500">Acompanhe o desempenho da sua agenda hoje.</p>
        </div>
        <button className="flex w-full items-center justify-center gap-2 rounded-xl bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white shadow-lg shadow-blue-500/30 transition-all hover:bg-blue-700 active:scale-95 sm:w-auto">
          <Calendar className="h-4 w-4" />
          Novo Agendamento
        </button>
      </header>

      {/* ALERTA INTELIGENTE */}
      {showAlert && (
        <div className="mx-4 sm:mx-0 relative flex items-start gap-4 rounded-2xl border border-amber-200 bg-amber-50 p-4 pr-12 shadow-sm animate-in fade-in slide-in-from-top-4 duration-500">
          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-amber-100">
            <AlertCircle className="h-5 w-5 text-amber-600 animate-pulse" />
          </div>
          <div className="pt-1">
            <h3 className="text-sm font-bold text-amber-800">Ação Necessária</h3>
            <p className="mt-0.5 text-sm font-medium text-amber-700/80">
              Você tem agendamentos pendentes aguardando confirmação para hoje. Verifique a lista abaixo.
            </p>
          </div>
          <button 
            onClick={() => setShowAlert(false)}
            className="absolute right-3 top-3 rounded-xl p-2 text-amber-500 hover:bg-amber-100 transition-colors"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      )}

      {/* GRID DE MÉTRICAS */}
      <div className="mx-4 sm:mx-0 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
        {/* Card 1 */}
        <div className="group flex flex-col rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition-all hover:-translate-y-1 hover:shadow-md hover:border-blue-200">
          <div className="flex items-center justify-between">
            <span className="text-sm font-bold text-slate-500">Agendamentos Hoje</span>
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-blue-600 transition-transform group-hover:scale-110">
              <CalendarCheck className="h-5 w-5" />
            </div>
          </div>
          <div className="mt-4 flex items-baseline gap-2">
            <span className="text-3xl font-black tracking-tight text-slate-900">12</span>
            <span className="flex items-center rounded-full bg-emerald-50 px-2 py-0.5 text-xs font-bold text-emerald-600">
              <TrendingUp className="mr-1 h-3 w-3" /> +20%
            </span>
          </div>
        </div>

        {/* Card 2 */}
        <div className="group flex flex-col rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition-all hover:-translate-y-1 hover:shadow-md hover:border-emerald-200">
          <div className="flex items-center justify-between">
            <span className="text-sm font-bold text-slate-500">Faturamento Previsto</span>
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600 transition-transform group-hover:scale-110">
              <DollarSign className="h-5 w-5" />
            </div>
          </div>
          <div className="mt-4 flex items-baseline gap-2">
            <span className="text-3xl font-black tracking-tight text-slate-900">R$ 840</span>
            <span className="flex items-center rounded-full bg-emerald-50 px-2 py-0.5 text-xs font-bold text-emerald-600">
              <TrendingUp className="mr-1 h-3 w-3" /> +12%
            </span>
          </div>
        </div>

        {/* Card 3 */}
        <div className="group flex flex-col rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition-all hover:-translate-y-1 hover:shadow-md hover:border-indigo-200">
          <div className="flex items-center justify-between">
            <span className="text-sm font-bold text-slate-500">Novos Clientes</span>
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600 transition-transform group-hover:scale-110">
              <Users className="h-5 w-5" />
            </div>
          </div>
          <div className="mt-4 flex items-baseline gap-2">
            <span className="text-3xl font-black tracking-tight text-slate-900">3</span>
            <span className="text-xs font-medium text-slate-400">Nesta semana</span>
          </div>
        </div>

        {/* Card 4 */}
        <div className="group flex flex-col rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition-all hover:-translate-y-1 hover:shadow-md hover:border-amber-200">
          <div className="flex items-center justify-between">
            <span className="text-sm font-bold text-slate-500">Taxa de Comparecimento</span>
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-50 text-amber-600 transition-transform group-hover:scale-110">
              <TrendingUp className="h-5 w-5" />
            </div>
          </div>
          <div className="mt-4 flex items-baseline gap-2">
            <span className="text-3xl font-black tracking-tight text-slate-900">92%</span>
            <span className="text-xs font-medium text-slate-400">Média mensal</span>
          </div>
        </div>
      </div>

      {/* ÚLTIMOS AGENDAMENTOS */}
      <div className="mx-4 sm:mx-0 rounded-2xl border border-slate-200 bg-white shadow-sm overflow-hidden">
        <div className="flex items-center justify-between border-b border-slate-100 bg-slate-50/50 p-5 lg:px-6">
          <h2 className="text-lg font-bold text-slate-900">Agendamentos de Hoje</h2>
          <button className="text-sm font-bold text-blue-600 hover:text-blue-700 transition-colors">Ver agenda completa</button>
        </div>
        
        <div className="flex flex-col">
          {agendamentos.map((agendamento, index) => (
            <div 
              key={agendamento.id}
              onClick={() => setSelectedAgendamento(agendamento)}
              className={`group flex cursor-pointer items-center justify-between p-4 transition-all hover:bg-slate-50 active:scale-[0.99] sm:px-6 sm:py-5 ${
                index !== agendamentos.length - 1 ? 'border-b border-slate-100' : ''
              }`}
            >
              <div className="flex items-center gap-4 sm:gap-5">
                {/* Data Badge */}
                <div className="hidden flex-col items-center justify-center rounded-xl border border-slate-200 bg-white shadow-sm px-3 py-2 sm:flex group-hover:border-blue-200 transition-colors">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500">{agendamento.data.split(' ')[1]}</span>
                  <span className="text-lg font-black text-slate-900">{agendamento.data.split(' ')[0]}</span>
                </div>
                
                <div className="flex flex-col">
                  <span className="font-bold text-slate-900">{agendamento.cliente}</span>
                  <div className="mt-1 flex items-center gap-2 text-xs font-medium text-slate-500">
                    <Clock className="h-3.5 w-3.5 text-slate-400" />
                    <span className="text-blue-600 font-bold">{agendamento.horario}</span>
                    <span className="text-slate-300">•</span>
                    <span className="truncate max-w-[120px] sm:max-w-none">{agendamento.servico}</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-3 sm:gap-6">
                <span className={`hidden rounded-full border px-2.5 py-1 text-[10px] uppercase tracking-wider font-bold sm:inline-block ${getStatusStyle(agendamento.status)}`}>
                  {agendamento.status}
                </span>
                
                {/* Status Dot para Mobile */}
                <div className={`h-3 w-3 rounded-full border-2 border-white shadow-sm sm:hidden ${
                  agendamento.status === 'Confirmado' ? 'bg-emerald-500' : 
                  agendamento.status === 'Pendente' ? 'bg-amber-500' : 'bg-rose-500'
                }`} />

                <div className="p-2 rounded-lg bg-slate-50 text-slate-400 group-hover:bg-blue-50 group-hover:text-blue-600 transition-colors">
                  <ChevronRight className="h-4 w-4" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* --- MODAL DE DETALHES (GLASSMORPHISM & BOTTOM SHEET MOBILE) --- */}
      {selectedAgendamento && (
        <div className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center p-0 sm:p-4 animate-in fade-in duration-300">
          {/* Backdrop Escuro com Blur */}
          <div 
            className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm"
            onClick={() => setSelectedAgendamento(null)}
          />
          
          {/* Card do Modal */}
          <div 
            className="relative w-full max-w-lg bg-white rounded-t-[32px] sm:rounded-3xl shadow-2xl overflow-hidden animate-in slide-in-from-bottom-10 sm:zoom-in-95 duration-300"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header Modal */}
            <div className="flex items-center justify-between border-b border-slate-100 bg-slate-50/50 px-6 py-5">
              <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                <Calendar className="w-5 h-5 text-blue-600" />
                Detalhes
              </h3>
              <button 
                onClick={() => setSelectedAgendamento(null)}
                className="rounded-full bg-slate-100 p-2 text-slate-500 transition-colors hover:bg-slate-200 hover:text-slate-900 active:scale-95"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Corpo do Modal */}
            <div className="p-6 space-y-6">
              
              {/* Cliente Header */}
              <div className="flex items-start justify-between">
                <div className="space-y-1">
                  <div className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] uppercase font-bold border mb-2 ${getStatusStyle(selectedAgendamento.status)}`}>
                    {selectedAgendamento.status}
                  </div>
                  <h2 className="text-2xl font-black text-slate-900 leading-none">{selectedAgendamento.cliente}</h2>
                </div>
              </div>

              {/* Ação Rápida WhatsApp */}
              <div className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl border border-slate-100 group">
                <div className="flex items-center gap-4">
                  <div className="bg-white p-2.5 rounded-xl shadow-sm border border-slate-200 text-slate-600">
                    <User className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Contato</p>
                    <p className="text-sm font-bold text-slate-700">
                      {selectedAgendamento.telefone.replace(/(\d{2})(\d{2})(\d{5})(\d{4})/, '+$1 ($2) $3-$4')}
                    </p>
                  </div>
                </div>
                <a 
                  href={`https://wa.me/${selectedAgendamento.telefone}`} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="p-3 bg-emerald-100 text-emerald-600 rounded-xl hover:bg-emerald-200 transition-all active:scale-90"
                >
                  <MessageCircle className="w-5 h-5" />
                </a>
              </div>

              {/* Informações do Agendamento */}
              <div className="grid grid-cols-2 gap-4 rounded-2xl bg-slate-50 p-5 border border-slate-100">
                <div className="space-y-1">
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1">
                    <Clock className="w-3 h-3" /> Horário
                  </p>
                  <p className="font-bold text-slate-900">{selectedAgendamento.data} às <span className="text-blue-600">{selectedAgendamento.horario}</span></p>
                </div>
                <div className="space-y-1">
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1">
                    <User className="w-3 h-3" /> Profissional
                  </p>
                  <p className="font-bold text-slate-900">{selectedAgendamento.profissional}</p>
                </div>
                
                <div className="col-span-2 mt-2 pt-4 border-t border-slate-200">
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2 flex items-center gap-1">
                    <Sparkles className="w-3 h-3" /> Serviço Solicitado
                  </p>
                  <div className="flex items-center justify-between bg-white px-4 py-3 rounded-xl border border-slate-100 shadow-sm">
                    <p className="font-bold text-slate-900">{selectedAgendamento.servico}</p>
                    <p className="font-black text-emerald-600 text-lg">R$ {selectedAgendamento.valor.toFixed(2)}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Modal Actions (Mobile-Friendly) */}
            <div className="p-6 bg-slate-50 border-t border-slate-100 grid grid-cols-1 sm:grid-cols-2 gap-3 pb-10 sm:pb-6">
              {selectedAgendamento.status === 'Pendente' ? (
                <>
                  <button 
                    onClick={() => handleMudarStatus(selectedAgendamento.id, 'Confirmado')}
                    className="order-1 sm:order-2 flex w-full items-center justify-center gap-2 rounded-xl bg-emerald-600 py-4 text-sm font-bold text-white shadow-lg shadow-emerald-500/20 transition-all hover:bg-emerald-700 active:scale-95"
                  >
                    <CheckCircle2 className="h-5 w-5" />
                    Confirmar Agendamento
                  </button>
                  <button 
                    onClick={() => handleMudarStatus(selectedAgendamento.id, 'Cancelado')}
                    className="order-2 sm:order-1 flex w-full items-center justify-center gap-2 rounded-xl border border-rose-200 bg-white py-4 text-sm font-bold text-rose-600 transition-all hover:bg-rose-50 active:scale-95"
                  >
                    <XCircle className="h-5 w-5" />
                    Recusar
                  </button>
                </>
              ) : selectedAgendamento.status === 'Confirmado' ? (
                <>
                  <button 
                    disabled
                    className="order-1 sm:order-2 flex w-full items-center justify-center gap-2 rounded-xl bg-slate-200 py-4 text-sm font-bold text-slate-400 cursor-not-allowed"
                  >
                    <CheckCircle2 className="h-5 w-5" />
                    Já Confirmado
                  </button>
                  <button 
                    onClick={() => handleMudarStatus(selectedAgendamento.id, 'Cancelado')}
                    className="order-2 sm:order-1 flex w-full items-center justify-center gap-2 rounded-xl border border-rose-200 bg-white py-4 text-sm font-bold text-rose-600 transition-all hover:bg-rose-50 active:scale-95"
                  >
                    <XCircle className="h-5 w-5" />
                    Cancelar Horário
                  </button>
                </>
              ) : (
                <button 
                  disabled
                  className="sm:col-span-2 flex w-full items-center justify-center gap-2 rounded-xl bg-rose-50 border border-rose-100 py-4 text-sm font-bold text-rose-400 cursor-not-allowed"
                >
                  <XCircle className="h-5 w-5" />
                  Agendamento Cancelado
                </button>
              )}
            </div>

          </div>
        </div>
      )}

    </div>
  );
}