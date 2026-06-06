'use client';

import { useState } from 'react';
import { 
  Users, 
  Search, 
  Plus, 
  Phone, 
  Mail, 
  MapPin, 
  Star, 
  History, 
  TrendingUp, 
  Calendar, 
  X, 
  Save, 
  MessageCircle,
  MoreVertical,
  UserPlus
} from 'lucide-react';

// --- Tipagens e Mock Data ---
type CategoriaCliente = 'VIP' | 'Recorrente' | 'Novo' | 'Inativo';

interface HistoricoAgendamento {
  id: string;
  data: string;
  servico: string;
  valor: number;
  status: 'Concluído' | 'Cancelado';
}

interface Cliente {
  id: string;
  nome: string;
  telefone: string;
  email: string;
  endereco: string;
  categoria: CategoriaCliente;
  totalAgendamentos: number;
  totalGasto: number;
  ultimaVisita: string;
  historico: HistoricoAgendamento[];
}

const mockClientes: Cliente[] = [
  { 
    id: '1', nome: 'Amanda Silva', telefone: '5511999991111', email: 'amanda@exemplo.com', endereco: 'Rua das Flores, 123', categoria: 'VIP', totalAgendamentos: 24, totalGasto: 3500.00, ultimaVisita: '02 Jun 2026',
    historico: [
      { id: 'h1', data: '02 Jun 2026', servico: 'Serviço Premium', valor: 150, status: 'Concluído' },
      { id: 'h2', data: '15 Mai 2026', servico: 'Manutenção', valor: 80, status: 'Concluído' }
    ]
  },
  { 
    id: '2', nome: 'Roberto Alves', telefone: '5511988882222', email: 'roberto@exemplo.com', endereco: 'Av. Paulista, 1000', categoria: 'Recorrente', totalAgendamentos: 8, totalGasto: 950.00, ultimaVisita: '28 Mai 2026',
    historico: [
      { id: 'h3', data: '28 Mai 2026', servico: 'Serviço Básico', valor: 65, status: 'Concluído' }
    ]
  },
  { 
    id: '3', nome: 'Carla Dias', telefone: '5511977773333', email: 'carla@exemplo.com', endereco: 'Rua Augusta, 500', categoria: 'Novo', totalAgendamentos: 1, totalGasto: 120.00, ultimaVisita: '04 Jun 2026',
    historico: [
      { id: 'h4', data: '04 Jun 2026', servico: 'Avaliação + Serviço', valor: 120, status: 'Concluído' }
    ]
  },
  { 
    id: '4', nome: 'Marcos Paulo', telefone: '5511966664444', email: 'marcos@exemplo.com', endereco: 'Rua Direita, 20', categoria: 'Inativo', totalAgendamentos: 3, totalGasto: 210.00, ultimaVisita: '10 Jan 2026',
    historico: [
      { id: 'h5', data: '10 Jan 2026', servico: 'Serviço Rápido', valor: 45, status: 'Cancelado' }
    ]
  },
];

// --- Helpers Visuais ---
const getCategoriaEstilo = (categoria: CategoriaCliente) => {
  switch (categoria) {
    case 'VIP': return 'bg-purple-100 text-purple-700 border-purple-200';
    case 'Recorrente': return 'bg-blue-100 text-blue-700 border-blue-200';
    case 'Novo': return 'bg-emerald-100 text-emerald-700 border-emerald-200';
    case 'Inativo': return 'bg-slate-100 text-slate-600 border-slate-200';
    default: return 'bg-slate-100 text-slate-700 border-slate-200';
  }
};

const getIniciais = (nome: string) => {
  const pedacos = nome.split(' ');
  if (pedacos.length >= 2) return (pedacos[0][0] + pedacos[1][0]).toUpperCase();
  return nome.substring(0, 2).toUpperCase();
};

export default function ClientesPage() {
  const [clientes, setClientes] = useState<Cliente[]>(mockClientes);
  const [busca, setBusca] = useState('');
  const [filtroCategoria, setFiltroCategoria] = useState<CategoriaCliente | 'Todos'>('Todos');
  
  // Modais State
  const [clienteSelecionado, setClienteSelecionado] = useState<Cliente | null>(null);
  const [isModalNovoAberto, setIsModalNovoAberto] = useState(false);

  // Form State
  const [form, setForm] = useState({ nome: '', telefone: '', email: '', endereco: '' });

  // Filtros
  const clientesFiltrados = clientes.filter(c => {
    const matchBusca = c.nome.toLowerCase().includes(busca.toLowerCase()) || c.telefone.includes(busca);
    const matchCategoria = filtroCategoria === 'Todos' || c.categoria === filtroCategoria;
    return matchBusca && matchCategoria;
  });

  // Ações
  const handleSalvarNovo = (e: React.FormEvent) => {
    e.preventDefault();
    const novoCliente: Cliente = {
      id: Math.random().toString(36).substring(7),
      nome: form.nome,
      telefone: form.telefone,
      email: form.email,
      endereco: form.endereco,
      categoria: 'Novo',
      totalAgendamentos: 0,
      totalGasto: 0,
      ultimaVisita: 'Nunca',
      historico: []
    };
    setClientes([novoCliente, ...clientes]);
    setIsModalNovoAberto(false);
    setForm({ nome: '', telefone: '', email: '', endereco: '' });
  };

  return (
    <div className="space-y-6 pb-24 lg:pb-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      
      {/* HEADER */}
      <header className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between px-4 sm:px-0">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900 lg:text-3xl">Clientes</h1>
          <p className="mt-1 text-sm text-slate-500">Gerencie sua base, histórico e métricas de fidelização.</p>
        </div>
        
        <button 
          onClick={() => setIsModalNovoAberto(true)}
          className="flex w-full items-center justify-center gap-2 rounded-xl bg-blue-600 px-4 py-2.5 text-sm font-bold text-white shadow-lg shadow-blue-500/30 transition-all hover:bg-blue-700 active:scale-95 sm:w-auto"
        >
          <UserPlus className="h-4 w-4" />
          <span>Novo Cliente</span>
        </button>
      </header>

      {/* BARRA DE BUSCA E FILTROS */}
      <div className="mx-4 sm:mx-0 flex flex-col gap-3 sm:flex-row sm:items-center">
        <div className="relative w-full sm:max-w-md">
          <input 
            type="text" 
            placeholder="Buscar por nome ou telefone..." 
            value={busca}
            onChange={(e) => setBusca(e.target.value)}
            className="w-full rounded-xl border border-slate-200 bg-white py-2.5 pl-10 pr-4 text-sm font-medium text-slate-900 outline-none transition-all focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 placeholder:text-slate-400 placeholder:font-normal shadow-sm"
          />
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
        </div>

        {/* Chips de Filtro (Carrossel no Mobile) */}
        <div className="flex overflow-x-auto scrollbar-hide gap-2 pb-1 sm:pb-0">
          {(['Todos', 'VIP', 'Recorrente', 'Novo', 'Inativo'] as const).map(cat => (
            <button
              key={cat}
              onClick={() => setFiltroCategoria(cat)}
              className={`whitespace-nowrap rounded-lg px-3 py-1.5 text-xs font-bold transition-all border ${
                filtroCategoria === cat 
                  ? 'bg-slate-800 text-white border-slate-800 shadow-sm' 
                  : 'bg-white text-slate-500 border-slate-200 hover:bg-slate-50'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* LISTA DE CLIENTES (GRID) */}
      <div className="mx-4 sm:mx-0 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {clientesFiltrados.map(cliente => (
          <div 
            key={cliente.id}
            onClick={() => setClienteSelecionado(cliente)}
            className="group flex flex-col rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition-all hover:-translate-y-1 hover:shadow-md hover:border-blue-200 cursor-pointer"
          >
            {/* Header do Card */}
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-slate-100 to-slate-200 border border-slate-300 text-sm font-black text-slate-600 shadow-inner">
                  {getIniciais(cliente.nome)}
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 leading-tight group-hover:text-blue-600 transition-colors">{cliente.nome}</h3>
                  <div className="flex items-center gap-1.5 text-xs font-medium text-slate-500 mt-0.5">
                    <Phone className="w-3 h-3" />
                    {cliente.telefone.replace(/(\d{2})(\d{2})(\d{5})(\d{4})/, '($2) $3-$4')}
                  </div>
                </div>
              </div>
              <span className={`px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider rounded-full border ${getCategoriaEstilo(cliente.categoria)}`}>
                {cliente.categoria}
              </span>
            </div>

            {/* Resumo de Métricas */}
            <div className="mt-5 grid grid-cols-2 gap-3 border-t border-slate-100 pt-4">
              <div>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-0.5">Visitas</p>
                <p className="text-sm font-black text-slate-800 flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5 text-blue-500" />
                  {cliente.totalAgendamentos}
                </p>
              </div>
              <div>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-0.5">Total Gasto</p>
                <p className="text-sm font-black text-emerald-600 flex items-center gap-1.5">
                  R$ {cliente.totalGasto.toFixed(2)}
                </p>
              </div>
            </div>
          </div>
        ))}

        {clientesFiltrados.length === 0 && (
          <div className="col-span-full flex flex-col items-center justify-center py-12 text-center bg-white rounded-2xl border border-slate-200 border-dashed">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-slate-50 mb-4">
              <Users className="h-8 w-8 text-slate-400" />
            </div>
            <h3 className="text-lg font-bold text-slate-900">Nenhum cliente encontrado</h3>
            <p className="text-slate-500 mt-1 text-sm">Ajuste os filtros ou adicione um novo cadastro.</p>
          </div>
        )}
      </div>

      {/* --- MODAL 1: GESTÃO AVANÇADA DO CLIENTE --- */}
      {clienteSelecionado && (
        <div className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center p-0 sm:p-4 animate-in fade-in duration-300">
          <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm" onClick={() => setClienteSelecionado(null)} />
          
          <div className="relative w-full max-w-2xl bg-slate-50 rounded-t-[32px] sm:rounded-3xl shadow-2xl overflow-hidden animate-in slide-in-from-bottom-10 sm:zoom-in-95 duration-300 flex flex-col max-h-[90vh]">
            
            {/* Header / Perfil */}
            <div className="bg-white p-6 pb-8 border-b border-slate-200 relative shrink-0">
              <button onClick={() => setClienteSelecionado(null)} className="absolute top-6 right-6 p-2 bg-slate-100 rounded-full text-slate-500 hover:bg-slate-200 transition-colors">
                <X className="w-5 h-5" />
              </button>

              <div className="flex flex-col sm:flex-row items-center sm:items-start gap-5">
                <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-blue-600 to-indigo-700 text-2xl font-black text-white shadow-lg shadow-blue-500/30">
                  {getIniciais(clienteSelecionado.nome)}
                </div>
                <div className="text-center sm:text-left space-y-1.5 mt-2 sm:mt-0">
                  <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3">
                    <h2 className="text-2xl font-black text-slate-900 leading-none">{clienteSelecionado.nome}</h2>
                    <span className={`inline-flex items-center justify-center px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider rounded-full border w-fit mx-auto sm:mx-0 ${getCategoriaEstilo(clienteSelecionado.categoria)}`}>
                      {clienteSelecionado.categoria}
                    </span>
                  </div>
                  <div className="flex flex-wrap items-center justify-center sm:justify-start gap-3 text-sm font-medium text-slate-500">
                    <span className="flex items-center gap-1.5"><Phone className="w-3.5 h-3.5" /> {clienteSelecionado.telefone.replace(/(\d{2})(\d{2})(\d{5})(\d{4})/, '($2) $3-$4')}</span>
                    <span className="hidden sm:inline">•</span>
                    <span className="flex items-center gap-1.5"><Mail className="w-3.5 h-3.5" /> {clienteSelecionado.email}</span>
                  </div>
                </div>
              </div>

              {/* Ações Rápidas Absolutas (Desktop) / Relativas (Mobile) */}
              <div className="mt-6 flex items-center justify-center sm:justify-start gap-3">
                <a href={`https://wa.me/${clienteSelecionado.telefone}`} target="_blank" className="flex items-center gap-2 px-4 py-2 bg-[#25D366]/10 text-[#25D366] font-bold rounded-xl hover:bg-[#25D366]/20 transition-colors text-sm">
                  <MessageCircle className="w-4 h-4" /> WhatsApp
                </a>
                <button className="flex items-center gap-2 px-4 py-2 bg-slate-100 text-slate-700 font-bold rounded-xl hover:bg-slate-200 transition-colors text-sm">
                  <Calendar className="w-4 h-4" /> Novo Agendamento
                </button>
              </div>
            </div>

            {/* Conteúdo Scrollável (Métricas e Histórico) */}
            <div className="p-6 overflow-y-auto custom-scrollbar space-y-6">
              
              {/* Cards de LTV e Métricas */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm">
                  <div className="flex items-center gap-2 text-slate-500 mb-2">
                    <TrendingUp className="w-4 h-4 text-emerald-500" />
                    <span className="text-[10px] font-bold uppercase tracking-wider">Total Gasto (LTV)</span>
                  </div>
                  <p className="text-xl font-black text-slate-900">R$ {clienteSelecionado.totalGasto.toFixed(2)}</p>
                </div>
                <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm">
                  <div className="flex items-center gap-2 text-slate-500 mb-2">
                    <History className="w-4 h-4 text-blue-500" />
                    <span className="text-[10px] font-bold uppercase tracking-wider">Visitas</span>
                  </div>
                  <p className="text-xl font-black text-slate-900">{clienteSelecionado.totalAgendamentos}</p>
                </div>
                <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm col-span-2 sm:col-span-1">
                  <div className="flex items-center gap-2 text-slate-500 mb-2">
                    <Star className="w-4 h-4 text-amber-500" />
                    <span className="text-[10px] font-bold uppercase tracking-wider">Última Visita</span>
                  </div>
                  <p className="text-base font-bold text-slate-900 mt-1">{clienteSelecionado.ultimaVisita}</p>
                </div>
              </div>

              {/* Histórico de Agendamentos */}
              <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
                <div className="px-5 py-4 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
                  <h3 className="font-bold text-slate-900 flex items-center gap-2">
                    <History className="w-4 h-4 text-blue-600" />
                    Histórico de Serviços
                  </h3>
                </div>
                <div className="flex flex-col">
                  {clienteSelecionado.historico.length > 0 ? (
                    clienteSelecionado.historico.map((hist, idx) => (
                      <div key={hist.id} className={`p-4 flex items-center justify-between ${idx !== clienteSelecionado.historico.length - 1 ? 'border-b border-slate-100' : ''}`}>
                        <div>
                          <p className="font-bold text-slate-900 text-sm">{hist.servico}</p>
                          <p className="text-xs font-medium text-slate-500 mt-0.5">{hist.data}</p>
                        </div>
                        <div className="text-right">
                          <p className="font-black text-slate-900 text-sm">R$ {hist.valor.toFixed(2)}</p>
                          <p className={`text-[10px] font-bold uppercase tracking-wider mt-0.5 ${hist.status === 'Concluído' ? 'text-emerald-500' : 'text-rose-500'}`}>
                            {hist.status}
                          </p>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="p-6 text-center text-sm font-medium text-slate-500">
                      Nenhum histórico encontrado.
                    </div>
                  )}
                </div>
              </div>

            </div>
          </div>
        </div>
      )}

      {/* --- MODAL 2: NOVO CADASTRO --- */}
      {isModalNovoAberto && (
        <div className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center p-0 sm:p-4 animate-in fade-in duration-300">
          <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm" onClick={() => setIsModalNovoAberto(false)} />
          
          <div className="relative w-full max-w-lg bg-white rounded-t-[32px] sm:rounded-3xl shadow-2xl overflow-hidden animate-in slide-in-from-bottom-10 sm:zoom-in-95 duration-300 flex flex-col max-h-[90vh]">
            
            <div className="flex items-center justify-between border-b border-slate-100 px-6 py-5 shrink-0 bg-white">
              <h2 className="text-xl font-bold text-slate-800 flex items-center gap-2">
                <UserPlus className="w-5 h-5 text-blue-600" />
                Novo Cadastro
              </h2>
              <button onClick={() => setIsModalNovoAberto(false)} className="rounded-full bg-slate-100 p-2 text-slate-500 transition-colors hover:bg-slate-200">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 overflow-y-auto custom-scrollbar">
              <form id="form-cliente" onSubmit={handleSalvarNovo} className="space-y-5">
                
                <div className="space-y-1.5 relative">
                  <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">Nome Completo</label>
                  <div className="relative">
                    <Users className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                    <input 
                      required type="text" placeholder="Ex: João da Silva"
                      value={form.nome} onChange={e => setForm({...form, nome: e.target.value})}
                      className="w-full rounded-xl bg-slate-50 border border-slate-200 py-2.5 pl-10 pr-3 text-sm font-medium text-slate-900 focus:bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none transition-all shadow-sm"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5 relative">
                    <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">WhatsApp</label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                      <input 
                        required type="tel" placeholder="(00) 00000-0000"
                        value={form.telefone} onChange={e => setForm({...form, telefone: e.target.value})}
                        className="w-full rounded-xl bg-slate-50 border border-slate-200 py-2.5 pl-10 pr-3 text-sm font-medium text-slate-900 focus:bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none transition-all shadow-sm"
                      />
                    </div>
                  </div>
                  <div className="space-y-1.5 relative">
                    <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">E-mail</label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                      <input 
                        type="email" placeholder="email@exemplo.com"
                        value={form.email} onChange={e => setForm({...form, email: e.target.value})}
                        className="w-full rounded-xl bg-slate-50 border border-slate-200 py-2.5 pl-10 pr-3 text-sm font-medium text-slate-900 focus:bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none transition-all shadow-sm"
                      />
                    </div>
                  </div>
                </div>

                <div className="space-y-1.5 relative">
                  <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">Endereço (Opcional)</label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                    <input 
                      type="text" placeholder="Rua, Número, Bairro"
                      value={form.endereco} onChange={e => setForm({...form, endereco: e.target.value})}
                      className="w-full rounded-xl bg-slate-50 border border-slate-200 py-2.5 pl-10 pr-3 text-sm font-medium text-slate-900 focus:bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none transition-all shadow-sm"
                    />
                  </div>
                </div>

              </form>
            </div>

            <div className="p-6 bg-slate-50 border-t border-slate-100 flex gap-3 pb-8 sm:pb-6 shrink-0">
              <button
                type="button" onClick={() => setIsModalNovoAberto(false)}
                className="flex-1 py-3.5 px-4 bg-white border border-slate-200 text-slate-700 hover:bg-slate-100 rounded-xl font-bold transition-colors shadow-sm"
              >
                Cancelar
              </button>
              <button
                type="submit" form="form-cliente" disabled={!form.nome || !form.telefone}
                className="flex-1 flex items-center justify-center gap-2 py-3.5 px-4 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white rounded-xl font-bold transition-all shadow-md shadow-blue-500/20 active:scale-95"
              >
                <Save className="w-5 h-5" /> Cadastrar
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}