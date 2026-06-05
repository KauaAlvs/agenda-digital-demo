'use client';

import { useState } from 'react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  AreaChart,
  Area
} from 'recharts';
import { 
  TrendingUp, 
  CalendarDays, 
  Filter, 
  Download,
  Scissors,
  Sparkles,
  Droplet
} from 'lucide-react';

// Dados Mockados para os Gráficos
const faturamentoData = [
  { name: 'Seg', valor: 450 },
  { name: 'Ter', valor: 680 },
  { name: 'Qua', valor: 520 },
  { name: 'Qui', valor: 890 },
  { name: 'Sex', valor: 1250 },
  { name: 'Sáb', valor: 1800 },
  { name: 'Dom', valor: 300 },
];

const fluxoHorariosData = [
  { horario: '08:00', clientes: 2 },
  { horario: '10:00', clientes: 5 },
  { horario: '12:00', clientes: 3 },
  { horario: '14:00', clientes: 8 },
  { horario: '16:00', clientes: 12 },
  { horario: '18:00', clientes: 15 },
  { horario: '20:00', clientes: 6 },
];

const servicosTop = [
  { nome: 'Serviço 1', icon: Scissors, percent: 85, color: 'bg-blue-500' },
  { nome: 'Serviço 2', icon: Sparkles, percent: 65, color: 'bg-indigo-500' },
  { nome: 'Serviço 3', icon: Droplet, percent: 45, color: 'bg-emerald-500' },
];

export default function MetricasPage() {
  const [periodo, setPeriodo] = useState('Esta Semana');

  return (
    <div className="space-y-8 pb-24 lg:pb-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      
      {/* Header com Filtros */}
      <header className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900 lg:text-3xl">Métricas e Frequência</h1>
          <p className="mt-1 text-sm text-slate-500">Analise o crescimento e o comportamento dos seus clientes.</p>
        </div>
        
        <div className="flex items-center gap-3">
          <div className="relative inline-block">
            <select 
              value={periodo}
              onChange={(e) => setPeriodo(e.target.value)}
              className="appearance-none rounded-xl border border-slate-200 bg-white py-2.5 pl-4 pr-10 text-sm font-medium text-slate-700 shadow-sm outline-none transition-all focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
            >
              <option>Esta Semana</option>
              <option>Últimos 15 dias</option>
              <option>Este Mês</option>
            </select>
            <Filter className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400 pointer-events-none" />
          </div>

          <button className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-600 shadow-sm transition-all hover:bg-slate-50 hover:text-blue-600">
            <Download className="h-5 w-5" />
          </button>
        </div>
      </header>

      {/* Destaque Principal */}
      <div className="flex flex-col overflow-hidden rounded-3xl bg-gradient-to-br from-blue-600 to-indigo-700 p-6 sm:p-8 lg:flex-row lg:items-center lg:justify-between shadow-xl shadow-blue-900/10">
        <div className="text-white">
          <p className="text-blue-200 text-sm font-medium uppercase tracking-wider mb-2">Total Arrecadado ({periodo})</p>
          <div className="flex items-baseline gap-3">
            <h2 className="text-4xl font-black tracking-tight sm:text-5xl">R$ 5.890,00</h2>
            <span className="flex items-center rounded-full bg-emerald-400/20 px-2.5 py-1 text-sm font-bold text-emerald-300 backdrop-blur-sm">
              <TrendingUp className="mr-1.5 h-4 w-4" /> +18.5%
            </span>
          </div>
        </div>
        <div className="mt-6 hidden lg:block">
          <CalendarDays className="h-24 w-24 text-white/10 opacity-80" />
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2 lg:gap-8">
        
        {/* Gráfico 1: Faturamento Diário */}
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="mb-6 flex items-center justify-between">
            <h3 className="text-lg font-bold text-slate-900">Faturamento Diário</h3>
            <span className="text-xs font-medium text-slate-500 bg-slate-100 px-2.5 py-1 rounded-full">Receita Bruta</span>
          </div>
          <div className="h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={faturamentoData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 12 }} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 12 }} />
                <Tooltip 
                  cursor={{ fill: '#f1f5f9' }}
                  contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                />
                <Bar dataKey="valor" fill="#3b82f6" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Gráfico 2: Fluxo de Horários */}
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="mb-6 flex items-center justify-between">
            <h3 className="text-lg font-bold text-slate-900">Horários de Pico</h3>
            <span className="text-xs font-medium text-slate-500 bg-slate-100 px-2.5 py-1 rounded-full">Agendamentos Totais</span>
          </div>
          <div className="h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={fluxoHorariosData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorClientes" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#6366f1" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#6366f1" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                <XAxis dataKey="horario" axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 12 }} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 12 }} />
                <Tooltip 
                  contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                />
                <Area type="monotone" dataKey="clientes" stroke="#6366f1" strokeWidth={3} fillOpacity={1} fill="url(#colorClientes)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Serviços Mais Buscados */}
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm lg:col-span-2">
          <div className="mb-6">
            <h3 className="text-lg font-bold text-slate-900">Serviços Mais Procurados</h3>
            <p className="text-sm text-slate-500">Desempenho do seu catálogo nesta semana.</p>
          </div>
          
          <div className="space-y-6">
            {servicosTop.map((servico, index) => {
              const Icon = servico.icon;
              return (
                <div key={index} className="flex flex-col gap-2">
                  <div className="flex items-center justify-between text-sm font-bold text-slate-900">
                    <div className="flex items-center gap-2">
                      <div className={`p-1.5 rounded-lg text-white ${servico.color}`}>
                        <Icon className="h-4 w-4" />
                      </div>
                      {servico.nome}
                    </div>
                    <span>{servico.percent}%</span>
                  </div>
                  {/* Barra de Progresso */}
                  <div className="h-2.5 w-full overflow-hidden rounded-full bg-slate-100">
                    <div 
                      className={`h-full rounded-full transition-all duration-1000 ease-out ${servico.color}`}
                      style={{ width: `${servico.percent}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </div>
  );
}