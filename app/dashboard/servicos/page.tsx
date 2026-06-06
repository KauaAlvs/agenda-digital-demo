'use client';

import { useState } from 'react';
import { 
  Plus, 
  Search, 
  Edit2, 
  Clock, 
  DollarSign, 
  Tag, 
  X, 
  Save,
  Sparkles,
  Check
} from 'lucide-react';

// --- Tipagens e Mock Data ---
type CategoriaServico = 'Tipo A' | 'Tipo B' | 'Tipo C' | 'Tipo D';

interface Servico {
  id: string;
  nome: string;
  descricao: string;
  duracao: string;
  valor: number;
  categoria: CategoriaServico;
  ativo: boolean;
}

const mockServicos: Servico[] = [
  { id: '1', nome: 'Serviço Premium', descricao: 'Atendimento completo com todos os adicionais inclusos.', duracao: '1h 30min', valor: 150.00, categoria: 'Tipo A', ativo: true },
  { id: '2', nome: 'Serviço Básico', descricao: 'Atendimento rápido e eficiente para o dia a dia.', duracao: '45 min', valor: 65.00, categoria: 'Tipo B', ativo: true },
  { id: '3', nome: 'Avaliação Inicial', descricao: 'Primeira consulta para análise e orçamento.', duracao: '30 min', valor: 0.00, categoria: 'Tipo C', ativo: true },
  { id: '4', nome: 'Pacote Mensal', descricao: 'Manutenção recorrente com desconto especial aplicado.', duracao: '1h', valor: 250.00, categoria: 'Tipo D', ativo: false },
];

// --- Helpers Visuais ---
const getCategoriaEstilo = (categoria: CategoriaServico) => {
  switch (categoria) {
    case 'Tipo A': return { bg: 'bg-blue-100', text: 'text-blue-700', border: 'border-blue-200', dot: 'bg-blue-500' };
    case 'Tipo B': return { bg: 'bg-indigo-100', text: 'text-indigo-700', border: 'border-indigo-200', dot: 'bg-indigo-500' };
    case 'Tipo C': return { bg: 'bg-slate-100', text: 'text-slate-700', border: 'border-slate-200', dot: 'bg-slate-500' };
    case 'Tipo D': return { bg: 'bg-emerald-100', text: 'text-emerald-700', border: 'border-emerald-200', dot: 'bg-emerald-500' };
    default: return { bg: 'bg-gray-100', text: 'text-gray-700', border: 'border-gray-200', dot: 'bg-gray-500' };
  }
};

export default function MeusServicosPage() {
  const [servicos, setServicos] = useState<Servico[]>(mockServicos);
  const [busca, setBusca] = useState('');
  
  // Modal State
  const [isModalAberto, setIsModalAberto] = useState(false);
  const [servicoEmEdicao, setServicoEmEdicao] = useState<Servico | null>(null);

  // Form State
  const [form, setForm] = useState<Omit<Servico, 'id'>>({
    nome: '',
    descricao: '',
    duracao: '1h',
    valor: 0,
    categoria: 'Tipo A',
    ativo: true
  });

  // Filtro
  const servicosFiltrados = servicos.filter(s => s.nome.toLowerCase().includes(busca.toLowerCase()));

  // Ações
  const handleToggleAtivo = (id: string) => {
    setServicos(prev => prev.map(s => s.id === id ? { ...s, ativo: !s.ativo } : s));
  };

  const abrirModalNovo = () => {
    setForm({ nome: '', descricao: '', duracao: '1h', valor: 0, categoria: 'Tipo A', ativo: true });
    setServicoEmEdicao(null);
    setIsModalAberto(true);
  };

  const abrirModalEditar = (servico: Servico) => {
    setForm({
      nome: servico.nome,
      descricao: servico.descricao,
      duracao: servico.duracao,
      valor: servico.valor,
      categoria: servico.categoria,
      ativo: servico.ativo
    });
    setServicoEmEdicao(servico);
    setIsModalAberto(true);
  };

  const handleSalvar = (e: React.FormEvent) => {
    e.preventDefault();
    if (servicoEmEdicao) {
      setServicos(prev => prev.map(s => s.id === servicoEmEdicao.id ? { ...form, id: s.id } : s));
    } else {
      const novoServico = { ...form, id: Math.random().toString(36).substring(7) };
      setServicos([novoServico, ...servicos]);
    }
    setIsModalAberto(false);
  };

  return (
    <div className="space-y-8 pb-24 lg:pb-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      
      {/* HEADER */}
      <header className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between px-4 sm:px-0">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900 lg:text-3xl">Catálogo de Serviços</h1>
          <p className="mt-1 text-sm text-slate-500">Gerencie os valores, durações e disponibilidade do que você oferece.</p>
        </div>
        
        <div className="flex items-center gap-3">
          <div className="relative hidden sm:block">
            <input 
              type="text" 
              placeholder="Buscar serviço..." 
              value={busca}
              onChange={(e) => setBusca(e.target.value)}
              className="w-64 rounded-xl border border-slate-200 bg-white py-2.5 pl-10 pr-4 text-sm outline-none transition-all focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 text-slate-900 placeholder:text-slate-400"
            />
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
          </div>
          
          <button 
            onClick={abrirModalNovo}
            className="flex w-full items-center justify-center gap-2 rounded-xl bg-blue-600 px-4 py-2.5 text-sm font-bold text-white shadow-lg shadow-blue-500/30 transition-all hover:bg-blue-700 active:scale-95 sm:w-auto"
          >
            <Plus className="h-4 w-4" />
            <span>Novo Serviço</span>
          </button>
        </div>
      </header>

      {/* INPUT MOBILE */}
      <div className="px-4 sm:hidden">
        <div className="relative w-full">
          <input 
            type="text" 
            placeholder="Buscar serviço..." 
            value={busca}
            onChange={(e) => setBusca(e.target.value)}
            className="w-full rounded-xl border border-slate-200 bg-white py-3 pl-10 pr-4 text-sm outline-none transition-all focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 text-slate-900"
          />
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
        </div>
      </div>

      {/* GRID DE SERVIÇOS */}
      <div className="mx-4 sm:mx-0 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 lg:gap-6">
        {servicosFiltrados.map((servico) => {
          const estiloCat = getCategoriaEstilo(servico.categoria);
          
          return (
            <div 
              key={servico.id}
              className={`group flex flex-col rounded-2xl border bg-white p-5 shadow-sm transition-all hover:shadow-md ${servico.ativo ? 'border-slate-200' : 'border-slate-200 opacity-60 grayscale-[0.3]'}`}
            >
              {/* Card Header (Categoria e Toggle) */}
              <div className="flex items-center justify-between mb-4">
                <span className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider ${estiloCat.bg} ${estiloCat.text} ${estiloCat.border}`}>
                  <div className={`h-1.5 w-1.5 rounded-full ${estiloCat.dot}`} />
                  {servico.categoria}
                </span>

                {/* Custom Toggle Switch */}
                <button
                  type="button"
                  onClick={() => handleToggleAtivo(servico.id)}
                  className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 ${servico.ativo ? 'bg-emerald-500' : 'bg-slate-300'}`}
                >
                  <span className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${servico.ativo ? 'translate-x-5' : 'translate-x-0'}`} />
                </button>
              </div>

              {/* Informações do Serviço */}
              <div className="flex-1 space-y-2 mb-6">
                <h3 className="text-lg font-bold text-slate-900 leading-tight">{servico.nome}</h3>
                <p className="text-sm text-slate-500 line-clamp-2 leading-relaxed">{servico.descricao}</p>
              </div>

              {/* Footer do Card (Preço, Duração e Editar) */}
              <div className="flex items-end justify-between border-t border-slate-100 pt-4 mt-auto">
                <div className="space-y-1.5">
                  <div className="flex items-center gap-1.5 text-xs font-medium text-slate-500">
                    <Clock className="w-3.5 h-3.5" />
                    {servico.duracao}
                  </div>
                  <div className="flex items-center gap-1.5 text-lg font-black text-slate-900">
                    <DollarSign className="w-4 h-4 text-emerald-500" />
                    {servico.valor > 0 ? servico.valor.toFixed(2) : 'Grátis'}
                  </div>
                </div>
                
                <button 
                  onClick={() => abrirModalEditar(servico)}
                  className="rounded-xl bg-slate-50 p-2.5 text-slate-500 transition-colors hover:bg-blue-50 hover:text-blue-600 active:scale-95"
                >
                  <Edit2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {servicosFiltrados.length === 0 && (
        <div className="flex flex-col items-center justify-center py-12 text-center">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-slate-100 mb-4">
            <Search className="h-8 w-8 text-slate-400" />
          </div>
          <h3 className="text-lg font-bold text-slate-900">Nenhum serviço encontrado</h3>
          <p className="text-slate-500 mt-1">Tente buscar com outro termo ou adicione um novo serviço.</p>
        </div>
      )}

      {/* --- MODAL NOVO/EDITAR SERVIÇO --- */}
      {isModalAberto && (
        <div className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center p-0 sm:p-4 animate-in fade-in duration-300">
          <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm" onClick={() => setIsModalAberto(false)} />
          
          <div className="relative w-full max-w-lg bg-white rounded-t-[32px] sm:rounded-3xl shadow-2xl overflow-hidden animate-in slide-in-from-bottom-10 sm:zoom-in-95 duration-300 flex flex-col max-h-[90vh]">
            
            {/* Header Modal */}
            <div className="flex items-center justify-between border-b border-slate-100 px-6 py-5 shrink-0 bg-white z-10">
              <h2 className="text-xl font-bold text-slate-800 flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-blue-600" />
                {servicoEmEdicao ? 'Editar Serviço' : 'Novo Serviço'}
              </h2>
              <button onClick={() => setIsModalAberto(false)} className="rounded-full bg-slate-100 p-2 text-slate-500 transition-colors hover:bg-slate-200">
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Corpo do Formulário */}
            <div className="p-6 overflow-y-auto custom-scrollbar">
              <form id="form-servico" onSubmit={handleSalvar} className="space-y-5">
                
                {/* Nome do Serviço */}
                <div className="space-y-1.5 relative">
                  <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">Nome do Serviço</label>
                  <div className="relative">
                    <Tag className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                    <input 
                      required
                      type="text" 
                      placeholder="Ex: Corte de Cabelo"
                      value={form.nome}
                      onChange={e => setForm({...form, nome: e.target.value})}
                      className="w-full rounded-xl bg-slate-50 border border-slate-200 py-2.5 pl-10 pr-3 text-sm font-medium text-slate-900 focus:bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none transition-all shadow-sm"
                    />
                  </div>
                </div>

                {/* Descrição */}
                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">Descrição Detalhada</label>
                  <textarea 
                    rows={3}
                    placeholder="Descreva o que está incluso neste serviço..."
                    value={form.descricao}
                    onChange={e => setForm({...form, descricao: e.target.value})}
                    className="w-full rounded-xl bg-slate-50 border border-slate-200 p-3 text-sm font-medium text-slate-900 focus:bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none transition-all shadow-sm resize-none"
                  />
                </div>

                {/* Duração e Preço */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1.5 relative">
                    <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">Duração</label>
                    <div className="relative">
                      <Clock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                      <input 
                        required
                        type="text" 
                        placeholder="Ex: 1h 30min"
                        value={form.duracao}
                        onChange={e => setForm({...form, duracao: e.target.value})}
                        className="w-full rounded-xl bg-slate-50 border border-slate-200 py-2.5 pl-10 pr-3 text-sm font-medium text-slate-900 focus:bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none transition-all shadow-sm"
                      />
                    </div>
                  </div>
                  <div className="space-y-1.5 relative">
                    <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">Valor (R$)</label>
                    <div className="relative">
                      <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-emerald-500" />
                      <input 
                        required
                        type="number" 
                        step="0.01"
                        min="0"
                        placeholder="0.00"
                        value={form.valor || ''}
                        onChange={e => setForm({...form, valor: Number(e.target.value)})}
                        className="w-full rounded-xl bg-slate-50 border border-slate-200 py-2.5 pl-10 pr-3 text-sm font-black text-slate-900 focus:bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none transition-all shadow-sm"
                      />
                    </div>
                  </div>
                </div>

                {/* Categoria / Cor na Agenda (Custom Color Picker) */}
                <div className="space-y-2 pt-2 border-t border-slate-100">
                  <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">Cor na Agenda (Categoria)</label>
                  <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
                    {(['Tipo A', 'Tipo B', 'Tipo C', 'Tipo D'] as CategoriaServico[]).map((cat) => {
                      const est = getCategoriaEstilo(cat);
                      const isSelected = form.categoria === cat;
                      return (
                        <button
                          key={cat}
                          type="button"
                          onClick={() => setForm({...form, categoria: cat})}
                          className={`flex flex-col items-center justify-center gap-2 rounded-xl border p-3 transition-all ${
                            isSelected 
                              ? `bg-white border-blue-500 ring-2 ring-blue-500/20 shadow-sm` 
                              : `bg-slate-50 border-slate-200 hover:bg-slate-100`
                          }`}
                        >
                          <div className={`h-6 w-6 rounded-full ${est.dot} flex items-center justify-center shadow-inner`}>
                            {isSelected && <Check className="w-3.5 h-3.5 text-white" />}
                          </div>
                          <span className={`text-[10px] font-bold ${isSelected ? 'text-slate-900' : 'text-slate-500'}`}>{cat}</span>
                        </button>
                      )
                    })}
                  </div>
                </div>

                {/* Status Ativo Toggle */}
                <div className="flex items-center justify-between rounded-xl bg-slate-50 p-4 border border-slate-100">
                  <div>
                    <p className="text-sm font-bold text-slate-900">Serviço Ativo</p>
                    <p className="text-xs text-slate-500">Disponível para novos agendamentos</p>
                  </div>
                  <button
                    type="button"
                    onClick={() => setForm({...form, ativo: !form.ativo})}
                    className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${form.ativo ? 'bg-emerald-500' : 'bg-slate-300'}`}
                  >
                    <span className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow transition duration-200 ease-in-out ${form.ativo ? 'translate-x-5' : 'translate-x-0'}`} />
                  </button>
                </div>

              </form>
            </div>

            {/* Modal Actions */}
            <div className="p-6 bg-slate-50 border-t border-slate-100 flex gap-3 pb-8 sm:pb-6 shrink-0">
              <button
                type="button"
                onClick={() => setIsModalAberto(false)}
                className="flex-1 py-3.5 px-4 bg-white border border-slate-200 text-slate-700 hover:bg-slate-100 rounded-xl font-bold transition-colors shadow-sm"
              >
                Cancelar
              </button>
              <button
                type="submit"
                form="form-servico"
                disabled={!form.nome || form.valor < 0}
                className="flex-1 flex items-center justify-center gap-2 py-3.5 px-4 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white rounded-xl font-bold transition-all shadow-md shadow-blue-500/20 active:scale-95"
              >
                <Save className="w-5 h-5" /> Salvar Serviço
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}