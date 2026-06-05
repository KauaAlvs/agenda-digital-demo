'use client';

import { useState } from 'react';
import { 
  Calendar as CalendarIcon, 
  ChevronLeft, 
  ChevronRight, 
  Clock, 
  Plus, 
  Search,
  User,
  MoreHorizontal
} from 'lucide-react';

// --- Mock Data ---
const diasSemana = [
  { dia: 'Seg', data: '01', ativo: false },
  { dia: 'Ter', data: '02', ativo: false },
  { dia: 'Qua', data: '03', ativo: false },
  { dia: 'Qui', data: '04', ativo: false },
  { dia: 'Sex', data: '05', ativo: true }, // Hoje
  { dia: 'Sáb', data: '06', ativo: false },
  { dia: 'Dom', data: '07', ativo: false },
];

type TipoAgendamento = 'Corte' | 'Coloração' | 'Barba' | 'Estética';

interface Agendamento {
  id: string;
  cliente: string;
  servico: string;
  duracao: string;
  tipo: TipoAgendamento;
  status: 'Confirmado' | 'Pendente';
  profissional: string;
}

interface Horario {
  hora: string;
  agendamento: Agendamento | null;
}

const agendaDoDia: Horario[] = [
  { hora: '08:00', agendamento: null },
  { 
    hora: '09:00', 
    agendamento: { id: '1', cliente: 'Roberto Alves', servico: 'Corte Masculino', duracao: '45 min', tipo: 'Corte', status: 'Confirmado', profissional: 'Carlos' } 
  },
  { hora: '10:00', agendamento: null },
  { 
    hora: '11:00', 
    agendamento: { id: '2', cliente: 'Mariana Silva', servico: 'Coloração Completa', duracao: '1h 30min', tipo: 'Coloração', status: 'Confirmado', profissional: 'Ana' } 
  },
  { hora: '12:00', agendamento: null },
  { 
    hora: '13:00', 
    agendamento: { id: '3', cliente: 'João Pedro', servico: 'Barba Terapia', duracao: '45 min', tipo: 'Barba', status: 'Pendente', profissional: 'Carlos' } 
  },
  { 
    hora: '14:00', 
    agendamento: { id: '4', cliente: 'Cláudia Ramos', servico: 'Limpeza de Pele', duracao: '1h', tipo: 'Estética', status: 'Confirmado', profissional: 'Bia' } 
  },
  { hora: '15:00', agendamento: null },
  { hora: '16:00', agendamento: null },
  { 
    hora: '17:00', 
    agendamento: { id: '5', cliente: 'Felipe Santos', servico: 'Corte + Barba', duracao: '1h', tipo: 'Corte', status: 'Confirmado', profissional: 'Carlos' } 
  },
  { hora: '18:00', agendamento: null },
];

// Cores baseadas no tipo de serviço para facilitar a visualização rápida
const getCorServico = (tipo: TipoAgendamento) => {
  switch (tipo) {
    case 'Corte': return 'bg-blue-50 border-blue-200 text-blue-700';
    case 'Coloração': return 'bg-indigo-50 border-indigo-200 text-indigo-700';
    case 'Barba': return 'bg-slate-100 border-slate-300 text-slate-700';
    case 'Estética': return 'bg-emerald-50 border-emerald-200 text-emerald-700';
    default: return 'bg-gray-50 border-gray-200 text-gray-700';
  }
};

const getBadgeStatus = (status: string) => {
  if (status === 'Pendente') return 'bg-amber-100 text-amber-700';
  return 'bg-emerald-100 text-emerald-700';
};

export default function AgendaPage() {
  const [diaSelecionado, setDiaSelecionado] = useState('05');

  return (
    <div className="space-y-6 pb-24 lg:pb-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      
      {/* Header e Controles */}
      <header className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900 lg:text-3xl">Agenda</h1>
          <p className="mt-1 text-sm text-slate-500">Gerencie seus compromissos e horários disponíveis.</p>
        </div>
        
        <div className="flex items-center gap-3">
          <div className="relative hidden sm:block">
            <input 
              type="text" 
              placeholder="Buscar cliente..." 
              className="w-64 rounded-xl border border-slate-200 bg-white py-2.5 pl-10 pr-4 text-sm outline-none transition-all focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
            />
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
          </div>
          
          <button className="flex w-full items-center justify-center gap-2 rounded-xl bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white shadow-lg shadow-blue-500/30 transition-all hover:bg-blue-700 sm:w-auto">
            <Plus className="h-4 w-4" />
            <span className="hidden sm:inline">Novo Agendamento</span>
            <span className="sm:hidden">Novo</span>
          </button>
        </div>
      </header>

      {/* Seletor de Data (Carrossel Horizontal) */}
      <div className="rounded-2xl border border-slate-200 bg-white p-2 shadow-sm">
        <div className="flex items-center justify-between px-4 py-2">
          <h2 className="text-base font-bold text-slate-800">Junho 2026</h2>
          <div className="flex gap-2">
            <button className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-100 hover:text-slate-700">
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-100 hover:text-slate-700">
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        </div>
        
        <div className="flex overflow-x-auto pb-2 pt-2 hide-scrollbar">
          <div className="flex w-full min-w-max gap-2 px-2">
            {diasSemana.map((d) => (
              <button
                key={d.data}
                onClick={() => setDiaSelecionado(d.data)}
                className={`flex w-[4.5rem] flex-col items-center justify-center gap-1 rounded-2xl py-3 transition-all ${
                  diaSelecionado === d.data
                    ? 'bg-blue-600 text-white shadow-md shadow-blue-500/30 scale-105'
                    : 'bg-transparent text-slate-500 hover:bg-slate-50 hover:text-slate-900'
                }`}
              >
                <span className={`text-xs font-medium ${diaSelecionado === d.data ? 'text-blue-100' : ''}`}>{d.dia}</span>
                <span className="text-xl font-bold">{d.data}</span>
                {d.ativo && diaSelecionado !== d.data && (
                  <div className="mt-1 h-1 w-1 rounded-full bg-blue-500" />
                )}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Linha do Tempo (Timeline Diária) */}
      <div className="rounded-2xl border border-slate-200 bg-white shadow-sm overflow-hidden">
        <div className="flex flex-col">
          {agendaDoDia.map((slot, index) => (
            <div 
              key={index} 
              className={`group flex min-h-[5rem] border-b border-slate-100 last:border-0 ${
                !slot.agendamento ? 'hover:bg-slate-50/50' : ''
              }`}
            >
              {/* Coluna da Hora */}
              <div className="flex w-20 shrink-0 flex-col items-center border-r border-slate-100 py-4 sm:w-24">
                <span className="text-sm font-bold text-slate-400 group-hover:text-blue-600 transition-colors">
                  {slot.hora}
                </span>
              </div>

              {/* Coluna do Conteúdo */}
              <div className="relative flex flex-1 p-3 sm:p-4">
                {slot.agendamento ? (
                  // Card de Agendamento
                  <div className={`w-full cursor-pointer rounded-xl border p-4 shadow-sm transition-all hover:shadow-md ${getCorServico(slot.agendamento.tipo)}`}>
                    <div className="flex items-start justify-between">
                      <div className="flex flex-col gap-1">
                        <h3 className="font-bold text-current">{slot.agendamento.cliente}</h3>
                        <p className="text-sm opacity-90">{slot.agendamento.servico}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className={`hidden px-2 py-0.5 text-xs font-bold rounded-full sm:block ${getBadgeStatus(slot.agendamento.status)}`}>
                          {slot.agendamento.status}
                        </span>
                        <button className="p-1 opacity-50 hover:opacity-100">
                          <MoreHorizontal className="h-5 w-5" />
                        </button>
                      </div>
                    </div>
                    
                    <div className="mt-4 flex flex-wrap items-center gap-4 text-xs font-medium opacity-80">
                      <div className="flex items-center gap-1.5">
                        <Clock className="h-4 w-4" />
                        {slot.agendamento.duracao}
                      </div>
                      <div className="flex items-center gap-1.5">
                        <User className="h-4 w-4" />
                        {slot.agendamento.profissional}
                      </div>
                      {/* Badge Mobile */}
                      <span className={`block px-2 py-0.5 text-[10px] font-bold rounded-full sm:hidden ${getBadgeStatus(slot.agendamento.status)}`}>
                        {slot.agendamento.status}
                      </span>
                    </div>
                  </div>
                ) : (
                  // Espaço Livre
                  <div className="flex w-full items-center justify-center rounded-xl border-2 border-dashed border-transparent transition-all group-hover:border-slate-200 group-hover:bg-white cursor-pointer">
                    <span className="text-sm font-medium text-slate-400 opacity-0 transition-opacity group-hover:opacity-100 flex items-center gap-2">
                      <Plus className="h-4 w-4" /> Agendar Horário
                    </span>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
      
    </div>
  );
}