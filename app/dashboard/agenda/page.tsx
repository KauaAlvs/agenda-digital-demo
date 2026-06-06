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
  MoreHorizontal,
  MapPin, 
  Phone, 
  Mail, 
  X, 
  CheckCircle, 
  XCircle,
  MessageCircle,
  ExternalLink,
  Save,
  ChevronDown,
  Tag,
  Briefcase,
  Sparkles
} from 'lucide-react';

// --- Mock Data Neutro (White Label) ---
const diasSemana = [
  { dia: 'Seg', data: '01', ativo: false },
  { dia: 'Ter', data: '02', ativo: false },
  { dia: 'Qua', data: '03', ativo: false },
  { dia: 'Qui', data: '04', ativo: false },
  { dia: 'Sex', data: '05', ativo: true }, // Hoje
  { dia: 'Sáb', data: '06', ativo: false },
  { dia: 'Dom', data: '07', ativo: false },
];

type TipoAgendamento = 'Tipo A' | 'Tipo B' | 'Tipo C' | 'Tipo D';
type StatusAgendamento = 'Reservado' | 'Concluído' | 'Cancelado';

interface Agendamento {
  id: string;
  cliente: string;
  servico: string;
  duracao: string;
  tipo: TipoAgendamento;
  status: StatusAgendamento;
  profissional: string;
  endereco: string;
  telefone: string;
  email: string;
}

interface Horario {
  hora: string;
  agendamento: Agendamento | null;
}

const agendaMockNeutra: Horario[] = [
  { hora: '08:00', agendamento: null },
  { 
    hora: '09:00', 
    agendamento: { 
      id: '1', cliente: 'Cliente Alpha', servico: 'Serviço 1', duracao: '45 min', tipo: 'Tipo A', status: 'Reservado', profissional: 'Profissional 1',
      endereco: 'Rua das Demonstrações, 100 - Centro', telefone: '5511985394101', email: 'alpha@mock.com'
    } 
  },
  { hora: '10:00', agendamento: null },
  { 
    hora: '11:00', 
    agendamento: { 
      id: '2', cliente: 'Cliente Beta', servico: 'Serviço 2', duracao: '1h 30min', tipo: 'Tipo B', status: 'Concluído', profissional: 'Profissional 2',
      endereco: 'Av. Genérica, 200 - Bairro Mock', telefone: '5511999999999', email: 'beta@mock.com'
    } 
  },
  { hora: '12:00', agendamento: null },
  { 
    hora: '13:00', 
    agendamento: { 
      id: '3', cliente: 'Cliente Gama', servico: 'Serviço 3', duracao: '45 min', tipo: 'Tipo C', status: 'Reservado', profissional: 'Profissional 1',
      endereco: 'Travessa Teste, 300 - Zona Sul', telefone: '5511988888888', email: 'gama@mock.com'
    } 
  },
  { 
    hora: '14:00', 
    agendamento: { 
      id: '4', cliente: 'Cliente Delta', servico: 'Serviço 4', duracao: '1h', tipo: 'Tipo D', status: 'Cancelado', profissional: 'Profissional 3',
      endereco: 'Alameda Virtual, 400 - Bairro Novo', telefone: '5511977777777', email: 'delta@mock.com'
    } 
  },
  { hora: '15:00', agendamento: null },
  { hora: '16:00', agendamento: null },
  { 
    hora: '17:00', 
    agendamento: { 
      id: '5', cliente: 'Cliente Ômega', servico: 'Serviço 1 + Serviço 3', duracao: '1h', tipo: 'Tipo A', status: 'Reservado', profissional: 'Profissional 1',
      endereco: 'Praça Exemplo, 500 - Zona Norte', telefone: '5511966666666', email: 'omega@mock.com'
    } 
  },
  { hora: '18:00', agendamento: null },
];

// --- Helpers de Cores ---
const getCorServico = (tipo: TipoAgendamento) => {
  switch (tipo) {
    case 'Tipo A': return 'bg-blue-50 border-blue-200 text-blue-700';
    case 'Tipo B': return 'bg-indigo-50 border-indigo-200 text-indigo-700';
    case 'Tipo C': return 'bg-slate-100 border-slate-300 text-slate-700';
    case 'Tipo D': return 'bg-emerald-50 border-emerald-200 text-emerald-700';
    default: return 'bg-gray-50 border-gray-200 text-gray-700';
  }
};

const getBadgeStatus = (status: StatusAgendamento) => {
  switch (status) {
    case 'Reservado': return 'bg-blue-100 text-blue-700 border border-blue-200';
    case 'Concluído': return 'bg-emerald-100 text-emerald-700 border border-emerald-200';
    case 'Cancelado': return 'bg-rose-100 text-rose-700 border border-rose-200';
    default: return 'bg-gray-100 text-gray-700 border border-gray-200';
  }
};

export default function AgendaPage() {
  const [diaSelecionado, setDiaSelecionado] = useState('05');
  const [horarios, setHorarios] = useState<Horario[]>(agendaMockNeutra);
  
  // Modais State
  const [agendamentoSelecionado, setAgendamentoSelecionado] = useState<Agendamento | null>(null);
  const [isModalNovoAberto, setIsModalNovoAberto] = useState(false);
  
  // Custom Dropdown State para o Modal Novo
  const [dropdownAberto, setDropdownAberto] = useState<'hora' | 'tipo' | null>(null);
  
  // Formulário State
  const [formNovo, setFormNovo] = useState({
    hora: '', cliente: '', servico: 'Serviço Premium', duracao: '1h', 
    tipo: 'Tipo A' as TipoAgendamento, profissional: 'Profissional 1', 
    endereco: '', telefone: '', email: ''
  });

  const horariosDisponiveis = horarios.filter(h => !h.agendamento).map(h => h.hora);
  const categoriasDisponiveis: TipoAgendamento[] = ['Tipo A', 'Tipo B', 'Tipo C', 'Tipo D'];

  const handleMudarStatus = (id: string, novoStatus: StatusAgendamento) => {
    setHorarios(prev => prev.map(slot => {
      if (slot.agendamento && slot.agendamento.id === id) {
        return { ...slot, agendamento: { ...slot.agendamento, status: novoStatus } };
      }
      return slot;
    }));
    if (agendamentoSelecionado && agendamentoSelecionado.id === id) {
      setAgendamentoSelecionado({ ...agendamentoSelecionado, status: novoStatus });
    }
  };

  const abrirModalNovo = (horaPreSelecionada?: string) => {
    setFormNovo({
      ...formNovo,
      hora: horaPreSelecionada || (horariosDisponiveis.length > 0 ? horariosDisponiveis[0] : ''),
      cliente: '', endereco: '', telefone: '', email: ''
    });
    setDropdownAberto(null);
    setIsModalNovoAberto(true);
  };

  const handleSalvarNovoAgendamento = (e: React.FormEvent) => {
    e.preventDefault();
    const novoID = Math.random().toString(36).substring(7);
    
    const novoAgendamento: Agendamento = {
      id: novoID,
      cliente: formNovo.cliente || 'Novo Cliente',
      servico: formNovo.servico,
      duracao: formNovo.duracao,
      tipo: formNovo.tipo,
      status: 'Reservado',
      profissional: formNovo.profissional,
      endereco: formNovo.endereco || 'Endereço não informado',
      telefone: formNovo.telefone || '-',
      email: formNovo.email || '-'
    };

    setHorarios(prev => prev.map(slot => {
      if (slot.hora === formNovo.hora) {
        return { ...slot, agendamento: novoAgendamento };
      }
      return slot;
    }));
    
    setIsModalNovoAberto(false);
  };

  return (
    <div className="space-y-6 pb-24 lg:pb-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      
      {/* HEADER SECTION */}
      <header className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between px-4 sm:px-0">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900 lg:text-3xl">Agenda</h1>
          <p className="mt-1 text-sm text-slate-500">Gerencie os serviços e horários disponíveis.</p>
        </div>
        
        <div className="flex items-center gap-3">
          <div className="relative hidden sm:block">
            <input 
              type="text" 
              placeholder="Buscar cliente..." 
              className="w-64 rounded-xl border border-slate-200 bg-white py-2.5 pl-10 pr-4 text-sm outline-none transition-all focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 text-slate-900 placeholder:text-slate-400"
            />
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
          </div>
          
          <button 
            onClick={() => abrirModalNovo()}
            className="flex w-full items-center justify-center gap-2 rounded-xl bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white shadow-lg shadow-blue-500/30 transition-all hover:bg-blue-700 active:scale-95 sm:w-auto"
          >
            <Plus className="h-4 w-4" />
            <span className="hidden sm:inline">Novo Agendamento</span>
            <span className="sm:hidden">Novo</span>
          </button>
        </div>
      </header>

      {/* DATE PICKER (CARROSSEL HORIZONTAL) */}
      <div className="mx-4 sm:mx-0 rounded-2xl border border-slate-200 bg-white p-2 shadow-sm">
        <div className="flex items-center justify-between px-4 py-2">
          <h2 className="text-base font-bold text-slate-800 flex items-center gap-2">
            <CalendarIcon className="w-4 h-4 text-blue-600" />
            Junho 2026
          </h2>
          <div className="flex gap-2">
            <button className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-100 hover:text-slate-700 transition-colors">
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-100 hover:text-slate-700 transition-colors">
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        </div>
        
        <div className="flex overflow-x-auto pb-2 pt-2 scrollbar-hide snap-x">
          <div className="flex w-full min-w-max gap-2 px-2">
            {diasSemana.map((d) => (
              <button
                key={d.data}
                onClick={() => setDiaSelecionado(d.data)}
                className={`snap-center flex w-[4.5rem] flex-col items-center justify-center gap-1 rounded-2xl py-3 transition-all ${
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

      {/* TIMELINE DIÁRIA */}
      <div className="mx-4 sm:mx-0 rounded-2xl border border-slate-200 bg-white shadow-sm overflow-hidden">
        <div className="flex flex-col">
          {horarios.map((slot, index) => (
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
                  <div 
                    onClick={() => setAgendamentoSelecionado(slot.agendamento)}
                    className={`w-full cursor-pointer rounded-xl border p-4 shadow-sm transition-all hover:shadow-md active:scale-[0.98] ${getCorServico(slot.agendamento.tipo)}`}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex flex-col gap-1">
                        <h3 className="font-bold text-current">{slot.agendamento.cliente}</h3>
                        <p className="text-sm opacity-90">{slot.agendamento.servico}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className={`hidden px-2.5 py-1 text-[10px] font-bold rounded-full sm:block ${getBadgeStatus(slot.agendamento.status)}`}>
                          {slot.agendamento.status.toUpperCase()}
                        </span>
                        <button className="p-1 opacity-50 hover:opacity-100 transition-opacity">
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
                        {slot.agendamento.status.toUpperCase()}
                      </span>
                    </div>
                  </div>
                ) : (
                  // Espaço Livre - Clicável
                  <div 
                    onClick={() => abrirModalNovo(slot.hora)}
                    className="flex w-full items-center justify-center rounded-xl border-2 border-dashed border-transparent transition-all group-hover:border-blue-200 group-hover:bg-blue-50/50 cursor-pointer"
                  >
                    <span className="text-sm font-medium text-blue-500 opacity-0 transition-opacity group-hover:opacity-100 flex items-center gap-2">
                      <Plus className="h-4 w-4" /> Agendar às {slot.hora}
                    </span>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* --- MODAL 1: DETALHES DO AGENDAMENTO --- */}
      {agendamentoSelecionado && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 animate-in fade-in duration-200">
          <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm" onClick={() => setAgendamentoSelecionado(null)} />
          
          <div className="relative w-full max-w-lg bg-white rounded-t-3xl sm:rounded-3xl shadow-2xl overflow-hidden animate-in slide-in-from-bottom-8 sm:zoom-in-95 duration-300">
            <div className="p-6 pb-4 flex justify-between items-start border-b border-slate-100">
              <div>
                <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-bold mb-3 ${getBadgeStatus(agendamentoSelecionado.status)}`}>
                  {agendamentoSelecionado.status.toUpperCase()}
                </span>
                <h2 className="text-2xl font-bold text-slate-800">{agendamentoSelecionado.cliente}</h2>
                <div className="flex items-center gap-2 text-slate-500 mt-1">
                  <Clock className="w-4 h-4 text-blue-600" />
                  <span className="text-sm font-semibold">
                    {horarios.find(h => h.agendamento?.id === agendamentoSelecionado.id)?.hora} • {agendamentoSelecionado.servico}
                  </span>
                </div>
              </div>
              <button 
                onClick={() => setAgendamentoSelecionado(null)}
                className="p-2 bg-slate-100 rounded-full text-slate-500 hover:bg-slate-200 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 space-y-3">
              <div className="flex items-center justify-between p-3 bg-slate-50 rounded-xl border border-slate-100">
                <div className="flex items-center gap-3 overflow-hidden">
                  <div className="bg-white p-2 rounded-lg shadow-sm border border-slate-100">
                    <Phone className="w-4 h-4 text-slate-600" />
                  </div>
                  <span className="text-sm font-medium text-slate-900 truncate">{agendamentoSelecionado.telefone}</span>
                </div>
                <a 
                  href={`https://wa.me/${agendamentoSelecionado.telefone}`} target="_blank" rel="noopener noreferrer"
                  className="p-2.5 bg-[#25D366]/10 text-[#25D366] rounded-xl hover:bg-[#25D366]/20 transition-colors flex-shrink-0"
                >
                  <MessageCircle className="w-5 h-5" />
                </a>
              </div>

              <div className="flex items-center justify-between p-3 bg-slate-50 rounded-xl border border-slate-100">
                <div className="flex items-center gap-3 overflow-hidden">
                  <div className="bg-white p-2 rounded-lg shadow-sm border border-slate-100">
                    <Mail className="w-4 h-4 text-slate-600" />
                  </div>
                  <span className="text-sm font-medium text-slate-900 truncate">{agendamentoSelecionado.email}</span>
                </div>
                <a 
                  href={`mailto:${agendamentoSelecionado.email}`} 
                  className="p-2.5 bg-blue-100 text-blue-700 rounded-xl hover:bg-blue-200 transition-colors flex-shrink-0"
                >
                  <ExternalLink className="w-5 h-5" />
                </a>
              </div>

              <div className="flex items-start gap-3 p-3 bg-slate-50 rounded-xl border border-slate-100">
                <div className="bg-white p-2 rounded-lg shadow-sm border border-slate-100 mt-0.5">
                  <MapPin className="w-4 h-4 text-slate-600" />
                </div>
                <span className="text-sm font-medium text-slate-900 leading-relaxed">{agendamentoSelecionado.endereco}</span>
              </div>
            </div>

            <div className="p-6 bg-slate-50 border-t border-slate-100 grid grid-cols-2 gap-3 pb-8 sm:pb-6">
              <button
                onClick={() => handleMudarStatus(agendamentoSelecionado.id, 'Concluído')}
                disabled={agendamentoSelecionado.status === 'Concluído'}
                className="flex items-center justify-center gap-2 py-3.5 px-4 bg-emerald-600 hover:bg-emerald-700 disabled:bg-slate-300 disabled:cursor-not-allowed text-white rounded-xl font-medium transition-colors shadow-sm active:scale-95"
              >
                <CheckCircle className="w-4 h-4" /> Concluir
              </button>
              <button
                onClick={() => handleMudarStatus(agendamentoSelecionado.id, 'Cancelado')}
                disabled={agendamentoSelecionado.status === 'Cancelado'}
                className="flex items-center justify-center gap-2 py-3.5 px-4 bg-white border border-rose-200 hover:bg-rose-50 text-rose-600 disabled:opacity-50 disabled:hover:bg-white disabled:cursor-not-allowed rounded-xl font-medium transition-colors shadow-sm active:scale-95"
              >
                <XCircle className="w-4 h-4" /> Cancelar
              </button>
            </div>
          </div>
        </div>
      )}

      {/* --- MODAL 2: NOVO AGENDAMENTO (Design Impecável) --- */}
      {isModalNovoAberto && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 animate-in fade-in duration-200">
          <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm" onClick={() => setIsModalNovoAberto(false)} />
          
          <div className="relative w-full max-w-lg bg-white rounded-t-3xl sm:rounded-3xl shadow-2xl overflow-visible animate-in slide-in-from-bottom-8 sm:zoom-in-95 duration-300 flex flex-col max-h-[90vh]">
            <div className="p-6 pb-4 flex justify-between items-center border-b border-slate-100 shrink-0">
              <h2 className="text-xl font-bold text-slate-800 flex items-center gap-2">
                <Plus className="w-5 h-5 text-blue-600" />
                Novo Agendamento
              </h2>
              <button onClick={() => setIsModalNovoAberto(false)} className="p-2 bg-slate-100 rounded-full text-slate-500 hover:bg-slate-200 transition-colors">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 overflow-y-auto overflow-x-hidden custom-scrollbar">
              <form id="form-novo" onSubmit={handleSalvarNovoAgendamento} className="space-y-5">
                
                {/* Linha 1: Custom Dropdowns (Horário e Tipo) */}
                <div className="grid grid-cols-2 gap-4">
                  {/* Select Horário Animado */}
                  <div className="space-y-1 relative">
                    <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1 block">Horário</label>
                    <div className="relative">
                      <button
                        type="button"
                        onClick={() => setDropdownAberto(dropdownAberto === 'hora' ? null : 'hora')}
                        className={`flex w-full items-center justify-between rounded-xl border py-2.5 pl-10 pr-3 text-sm transition-all outline-none shadow-sm ${
                          dropdownAberto === 'hora' 
                            ? 'border-blue-500 bg-white ring-2 ring-blue-500/20' 
                            : 'border-slate-200 bg-slate-50 hover:bg-slate-100/50'
                        }`}
                      >
                        <Clock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                        <span className={`font-medium ${formNovo.hora ? 'text-slate-900' : 'text-slate-400 font-normal'}`}>
                          {formNovo.hora || 'Selecione...'}
                        </span>
                        <ChevronDown className={`h-4 w-4 text-slate-400 transition-transform duration-300 ${dropdownAberto === 'hora' ? 'rotate-180' : ''}`} />
                      </button>

                      {dropdownAberto === 'hora' && (
                        <>
                          <div className="fixed inset-0 z-40" onClick={() => setDropdownAberto(null)} />
                          <div className="absolute top-full left-0 mt-2 w-full z-50 rounded-xl bg-white border border-slate-100 shadow-xl shadow-blue-900/5 py-1.5 max-h-48 overflow-y-auto custom-scrollbar animate-in fade-in slide-in-from-top-2 zoom-in-95 duration-200">
                            {horariosDisponiveis.length > 0 ? (
                              horariosDisponiveis.map(h => (
                                <button
                                  key={h}
                                  type="button"
                                  onClick={() => { setFormNovo({...formNovo, hora: h}); setDropdownAberto(null); }}
                                  className={`w-full text-left px-4 py-2.5 text-sm transition-colors ${
                                    formNovo.hora === h ? 'bg-blue-50 text-blue-700 font-bold' : 'text-slate-700 hover:bg-slate-50 font-medium'
                                  }`}
                                >
                                  {h}
                                </button>
                              ))
                            ) : (
                              <div className="px-4 py-3 text-sm text-slate-500 text-center">Lotação Máxima</div>
                            )}
                          </div>
                        </>
                      )}
                    </div>
                  </div>

                  {/* Select Categoria Animado */}
                  <div className="space-y-1 relative">
                    <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1 block">Categoria</label>
                    <div className="relative">
                      <button
                        type="button"
                        onClick={() => setDropdownAberto(dropdownAberto === 'tipo' ? null : 'tipo')}
                        className={`flex w-full items-center justify-between rounded-xl border py-2.5 pl-10 pr-3 text-sm transition-all outline-none shadow-sm ${
                          dropdownAberto === 'tipo' 
                            ? 'border-blue-500 bg-white ring-2 ring-blue-500/20' 
                            : 'border-slate-200 bg-slate-50 hover:bg-slate-100/50'
                        }`}
                      >
                        <Tag className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                        <span className="font-medium text-slate-900">
                          {formNovo.tipo}
                        </span>
                        <ChevronDown className={`h-4 w-4 text-slate-400 transition-transform duration-300 ${dropdownAberto === 'tipo' ? 'rotate-180' : ''}`} />
                      </button>

                      {dropdownAberto === 'tipo' && (
                        <>
                          <div className="fixed inset-0 z-40" onClick={() => setDropdownAberto(null)} />
                          <div className="absolute top-full left-0 mt-2 w-full z-50 rounded-xl bg-white border border-slate-100 shadow-xl shadow-blue-900/5 py-1.5 animate-in fade-in slide-in-from-top-2 zoom-in-95 duration-200">
                            {categoriasDisponiveis.map(t => (
                              <button
                                key={t}
                                type="button"
                                onClick={() => { setFormNovo({...formNovo, tipo: t}); setDropdownAberto(null); }}
                                className={`w-full text-left px-4 py-2.5 text-sm transition-colors ${
                                  formNovo.tipo === t ? 'bg-blue-50 text-blue-700 font-bold' : 'text-slate-700 hover:bg-slate-50 font-medium'
                                }`}
                              >
                                {t}
                              </button>
                            ))}
                          </div>
                        </>
                      )}
                    </div>
                  </div>
                </div>

                {/* Cliente */}
                <div className="space-y-1 relative">
                  <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1 block">Nome do Cliente</label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                    <input 
                      required
                      type="text" 
                      placeholder="Ex: João da Silva"
                      value={formNovo.cliente}
                      onChange={e => setFormNovo({...formNovo, cliente: e.target.value})}
                      className="w-full rounded-xl bg-slate-50 border border-slate-200 py-2.5 pl-10 pr-3 text-sm font-medium text-slate-900 placeholder:text-slate-400 placeholder:font-normal focus:bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none transition-all shadow-sm"
                    />
                  </div>
                </div>

                {/* Linha 2: Serviço e Profissional */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1 relative">
                    <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1 block">Serviço</label>
                    <div className="relative">
                      <Sparkles className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                      <input 
                        type="text" 
                        placeholder="Ex: Serviço Premium"
                        value={formNovo.servico}
                        onChange={e => setFormNovo({...formNovo, servico: e.target.value})}
                        className="w-full rounded-xl bg-slate-50 border border-slate-200 py-2.5 pl-10 pr-3 text-sm font-medium text-slate-900 placeholder:text-slate-400 placeholder:font-normal focus:bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none transition-all shadow-sm"
                      />
                    </div>
                  </div>
                  <div className="space-y-1 relative">
                    <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1 block">Profissional</label>
                    <div className="relative">
                      <Briefcase className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                      <input 
                        type="text" 
                        placeholder="Ex: Ana Silva"
                        value={formNovo.profissional}
                        onChange={e => setFormNovo({...formNovo, profissional: e.target.value})}
                        className="w-full rounded-xl bg-slate-50 border border-slate-200 py-2.5 pl-10 pr-3 text-sm font-medium text-slate-900 placeholder:text-slate-400 placeholder:font-normal focus:bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none transition-all shadow-sm"
                      />
                    </div>
                  </div>
                </div>

                {/* Contatos */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1 relative">
                    <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1 block">WhatsApp</label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                      <input 
                        type="tel" 
                        placeholder="(00) 00000-0000"
                        value={formNovo.telefone}
                        onChange={e => setFormNovo({...formNovo, telefone: e.target.value})}
                        className="w-full rounded-xl bg-slate-50 border border-slate-200 py-2.5 pl-10 pr-3 text-sm font-medium text-slate-900 placeholder:text-slate-400 placeholder:font-normal focus:bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none transition-all shadow-sm"
                      />
                    </div>
                  </div>
                  <div className="space-y-1 relative">
                    <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1 block">E-mail</label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                      <input 
                        type="email" 
                        placeholder="email@exemplo.com"
                        value={formNovo.email}
                        onChange={e => setFormNovo({...formNovo, email: e.target.value})}
                        className="w-full rounded-xl bg-slate-50 border border-slate-200 py-2.5 pl-10 pr-3 text-sm font-medium text-slate-900 placeholder:text-slate-400 placeholder:font-normal focus:bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none transition-all shadow-sm"
                      />
                    </div>
                  </div>
                </div>

              </form>
            </div>

            <div className="p-6 bg-slate-50 border-t border-slate-100 flex gap-3 pb-8 sm:pb-6 shrink-0">
              <button
                type="button"
                onClick={() => setIsModalNovoAberto(false)}
                className="flex-1 py-3 px-4 bg-white border border-slate-200 text-slate-700 hover:bg-slate-100 rounded-xl font-medium transition-colors shadow-sm"
              >
                Cancelar
              </button>
              <button
                type="submit"
                form="form-novo"
                disabled={!formNovo.hora || !formNovo.cliente}
                className="flex-1 flex items-center justify-center gap-2 py-3 px-4 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white rounded-xl font-medium transition-all shadow-md shadow-blue-500/20 active:scale-95"
              >
                <Save className="w-4 h-4" /> Agendar
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}