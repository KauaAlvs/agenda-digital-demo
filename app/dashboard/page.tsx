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
  MoreVertical,
  Calendar
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

// Dados Mockados
const mockAgendamentos: Agendamento[] = [
  { id: '1', cliente: 'Maria Silva', telefone: '(11) 99999-1111', servico: '', data: '05 Jun', horario: '14:00', valor: 120, status: 'Confirmado', profissional: 'Ana' },
  { id: '2', cliente: 'João Pedro', telefone: '(11) 99999-2222', servico: '', data: '05 Jun', horario: '15:30', valor: 65, status: 'Pendente', profissional: 'Carlos' },
  { id: '3', cliente: 'Ana Clara', telefone: '(11) 99999-3333', servico: '', data: '05 Jun', horario: '16:00', valor: 250, status: 'Confirmado', profissional: 'Ana' },
  { id: '4', cliente: 'Marcos Paulo', telefone: '(11) 99999-4444', servico: '', data: '05 Jun', horario: '17:30', valor: 45, status: 'Cancelado', profissional: 'Carlos' },
  { id: '5', cliente: 'Juliana Costa', telefone: '(11) 99999-5555', servico: '', data: '05 Jun', horario: '18:00', valor: 70, status: 'Pendente', profissional: 'Bia' },
];

export default function DashboardPage() {
  const [showAlert, setShowAlert] = useState(true);
  const [selectedAgendamento, setSelectedAgendamento] = useState<Agendamento | null>(null);

  // Função auxiliar para cores de status
  const getStatusColor = (status: StatusAgendamento) => {
    switch (status) {
      case 'Confirmado': return 'bg-emerald-100 text-emerald-700 border-emerald-200';
      case 'Pendente': return 'bg-amber-100 text-amber-700 border-amber-200';
      case 'Cancelado': return 'bg-rose-100 text-rose-700 border-rose-200';
      default: return 'bg-slate-100 text-slate-700 border-slate-200';
    }
  };

  return (
    <div className="space-y-8 pb-24 lg:pb-8">
      
      {/* Header */}
      <header className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900 lg:text-3xl">Visão Geral</h1>
          <p className="mt-1 text-sm text-slate-500">Acompanhe o desempenho da sua agenda hoje.</p>
        </div>
        <button className="flex w-full items-center justify-center gap-2 rounded-xl bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white shadow-lg shadow-blue-500/30 transition-all hover:bg-blue-700 sm:w-auto">
          <Calendar className="h-4 w-4" />
          Novo Agendamento
        </button>
      </header>

      {/* Alerta Inteligente */}
      {showAlert && (
        <div className="relative flex items-start gap-4 rounded-2xl border border-amber-200 bg-amber-50 p-4 pr-12 shadow-sm animate-in fade-in slide-in-from-top-4">
          <AlertCircle className="mt-0.5 h-5 w-5 shrink-0 text-amber-600" />
          <div>
            <h3 className="text-sm font-bold text-amber-800">Ação Necessária</h3>
            <p className="mt-1 text-sm text-amber-700">Você tem 2 agendamentos pendentes aguardando confirmação. Verifique a lista abaixo.</p>
          </div>
          <button 
            onClick={() => setShowAlert(false)}
            className="absolute right-4 top-4 rounded-lg p-1 text-amber-500 hover:bg-amber-100 hover:text-amber-700 transition-colors"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      )}

      {/* Grid de Métricas */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
        {/* Card 1 */}
        <div className="flex flex-col rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition-all hover:shadow-md">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-slate-500">Agendamentos Hoje</span>
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
              <CalendarCheck className="h-5 w-5" />
            </div>
          </div>
          <div className="mt-4 flex items-baseline gap-2">
            <span className="text-3xl font-bold tracking-tight text-slate-900">12</span>
            <span className="flex items-center text-xs font-medium text-emerald-600">
              <TrendingUp className="mr-1 h-3 w-3" /> +20%
            </span>
          </div>
        </div>

        {/* Card 2 */}
        <div className="flex flex-col rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition-all hover:shadow-md">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-slate-500">Faturamento Previsto</span>
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600">
              <DollarSign className="h-5 w-5" />
            </div>
          </div>
          <div className="mt-4 flex items-baseline gap-2">
            <span className="text-3xl font-bold tracking-tight text-slate-900">R$ 840</span>
            <span className="flex items-center text-xs font-medium text-emerald-600">
              <TrendingUp className="mr-1 h-3 w-3" /> +12%
            </span>
          </div>
        </div>

        {/* Card 3 */}
        <div className="flex flex-col rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition-all hover:shadow-md">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-slate-500">Novos Clientes</span>
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600">
              <Users className="h-5 w-5" />
            </div>
          </div>
          <div className="mt-4 flex items-baseline gap-2">
            <span className="text-3xl font-bold tracking-tight text-slate-900">3</span>
            <span className="text-xs font-medium text-slate-400">Nesta semana</span>
          </div>
        </div>

        {/* Card 4 */}
        <div className="flex flex-col rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition-all hover:shadow-md">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-slate-500">Taxa de Comparecimento</span>
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-50 text-amber-600">
              <TrendingUp className="h-5 w-5" />
            </div>
          </div>
          <div className="mt-4 flex items-baseline gap-2">
            <span className="text-3xl font-bold tracking-tight text-slate-900">92%</span>
            <span className="text-xs font-medium text-slate-400">Média mensal</span>
          </div>
        </div>
      </div>

      {/* Últimos Agendamentos */}
      <div className="rounded-2xl border border-slate-200 bg-white shadow-sm">
        <div className="flex items-center justify-between border-b border-slate-100 p-5 lg:p-6">
          <h2 className="text-lg font-bold text-slate-900">Últimos Agendamentos</h2>
          <button className="text-sm font-semibold text-blue-600 hover:text-blue-700">Ver todos</button>
        </div>
        
        <div className="flex flex-col">
          {mockAgendamentos.map((agendamento, index) => (
            <div 
              key={agendamento.id}
              onClick={() => setSelectedAgendamento(agendamento)}
              className={`flex cursor-pointer items-center justify-between p-4 transition-colors hover:bg-slate-50 sm:p-5 ${
                index !== mockAgendamentos.length - 1 ? 'border-b border-slate-100' : ''
              }`}
            >
              <div className="flex items-center gap-4">
                <div className="hidden flex-col items-center justify-center rounded-xl bg-slate-50 px-3 py-2 sm:flex">
                  <span className="text-xs font-bold text-slate-500">{agendamento.data.split(' ')[1]}</span>
                  <span className="text-lg font-black text-slate-900">{agendamento.data.split(' ')[0]}</span>
                </div>
                
                <div className="flex flex-col">
                  <span className="font-bold text-slate-900">{agendamento.cliente}</span>
                  <div className="mt-0.5 flex items-center gap-2 text-sm text-slate-500">
                    <Clock className="h-3.5 w-3.5" />
                    {agendamento.horario} • {agendamento.servico}
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-3 sm:gap-6">
                <span className={`hidden rounded-full border px-2.5 py-1 text-xs font-bold sm:inline-block ${getStatusColor(agendamento.status)}`}>
                  {agendamento.status}
                </span>
                
                {/* Status Dot para Mobile */}
                <div className={`h-2.5 w-2.5 rounded-full sm:hidden ${
                  agendamento.status === 'Confirmado' ? 'bg-emerald-500' : 
                  agendamento.status === 'Pendente' ? 'bg-amber-500' : 'bg-rose-500'
                }`} />

                <ChevronRight className="h-5 w-5 text-slate-400" />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Modal de Detalhes do Agendamento (Glassmorphism) */}
      {selectedAgendamento && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-900/40 px-4 backdrop-blur-sm animate-in fade-in duration-200">
          <div 
            className="w-full max-w-md scale-100 overflow-hidden rounded-3xl bg-white shadow-2xl animate-in zoom-in-95 duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between border-b border-slate-100 bg-slate-50 px-6 py-4">
              <h3 className="text-lg font-bold text-slate-900">Detalhes do Agendamento</h3>
              <button 
                onClick={() => setSelectedAgendamento(null)}
                className="rounded-full p-2 text-slate-400 transition-colors hover:bg-slate-200 hover:text-slate-700"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-500">Cliente</p>
                  <p className="text-lg font-bold text-slate-900">{selectedAgendamento.cliente}</p>
                  <p className="text-sm text-slate-500">{selectedAgendamento.telefone}</p>
                </div>
                <span className={`rounded-full border px-3 py-1 text-xs font-bold ${getStatusColor(selectedAgendamento.status)}`}>
                  {selectedAgendamento.status}
                </span>
              </div>

              <div className="grid grid-cols-2 gap-4 rounded-2xl bg-slate-50 p-4 border border-slate-100">
                <div>
                  <p className="text-xs font-medium text-slate-500">Data e Hora</p>
                  <p className="font-bold text-slate-900">{selectedAgendamento.data} às {selectedAgendamento.horario}</p>
                </div>
                <div>
                  <p className="text-xs font-medium text-slate-500">Profissional</p>
                  <p className="font-bold text-slate-900">{selectedAgendamento.profissional}</p>
                </div>
                <div className="col-span-2 mt-2 pt-2 border-t border-slate-200">
                  <p className="text-xs font-medium text-slate-500">Serviço e Valor</p>
                  <div className="flex items-center justify-between">
                    <p className="font-bold text-slate-900">{selectedAgendamento.servico}</p>
                    <p className="font-black text-blue-600">R$ {selectedAgendamento.valor.toFixed(2)}</p>
                  </div>
                </div>
              </div>

              {/* Modal Actions */}
              <div className="flex flex-col gap-3 pt-2">
                {selectedAgendamento.status === 'Pendente' && (
                  <button 
                    onClick={() => setSelectedAgendamento(null)}
                    className="flex w-full items-center justify-center gap-2 rounded-xl bg-emerald-600 py-3.5 text-sm font-bold text-white shadow-lg shadow-emerald-500/30 transition-all hover:bg-emerald-700"
                  >
                    <CheckCircle2 className="h-5 w-5" />
                    Confirmar Agendamento
                  </button>
                )}
                
                {selectedAgendamento.status !== 'Cancelado' && (
                  <button 
                    onClick={() => setSelectedAgendamento(null)}
                    className="flex w-full items-center justify-center gap-2 rounded-xl border border-rose-200 bg-white py-3.5 text-sm font-bold text-rose-600 transition-all hover:bg-rose-50"
                  >
                    <XCircle className="h-5 w-5" />
                    Cancelar Horário
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}