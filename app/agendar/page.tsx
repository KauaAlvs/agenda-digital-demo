'use client';

import { useState } from 'react';
import { 
  Calendar, 
  MapPin, 
  Clock, 
  ChevronRight, 
  ChevronLeft,
  Scissors, 
  User, 
  CheckCircle2,
  Info
} from 'lucide-react';

// --- MOCK DATA ---
const servicos = [
  { id: '1', nome: 'Serviço Premium', duracao: '1h 30min', valor: 150.00, tag: 'Mais Pedido' },
  { id: '2', nome: 'Manutenção Básica', duracao: '45 min', valor: 65.00 },
  { id: '3', nome: 'Avaliação e Consultoria', duracao: '30 min', valor: 0.00 },
];

const diasDisponiveis = [
  { dia: 'Seg', data: '08', ativo: false },
  { dia: 'Ter', data: '09', ativo: false },
  { dia: 'Qua', data: '10', ativo: true }, 
  { dia: 'Qui', data: '11', ativo: true },
  { dia: 'Sex', data: '12', ativo: true },
  { dia: 'Sáb', data: '13', ativo: true },
];

const horariosDisponiveis = ['09:00', '09:45', '10:30', '14:00', '15:30', '17:00'];

export default function PaginaAgendarFlow() {
  const [step, setStep] = useState(1);
  const [servicoSelecionado, setServicoSelecionado] = useState<any>(null);
  const [diaSelecionado, setDiaSelecionado] = useState('10');
  const [horarioSelecionado, setHorarioSelecionado] = useState('');
  
  const [cliente, setCliente] = useState({ nome: '', telefone: '' });
  const [agendamentoConcluido, setAgendamentoConcluido] = useState(false);

  const handleAvancarStep = () => setStep(prev => prev + 1);
  const handleVoltarStep = () => setStep(prev => prev - 1);

  const finalizarAgendamento = (e: React.FormEvent) => {
    e.preventDefault();
    setAgendamentoConcluido(true);
  };

  // --- TELA DE SUCESSO ---
  if (agendamentoConcluido) {
    return (
      <div className="bg-white rounded-3xl border border-emerald-200 shadow-sm p-8 text-center flex flex-col items-center animate-in zoom-in-95 duration-500 w-full">
        <div className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center mb-6">
          <CheckCircle2 className="w-10 h-10 text-emerald-500" />
        </div>
        <h2 className="text-2xl font-black text-slate-900 mb-2">Tudo Certo, {cliente.nome.split(' ')[0]}!</h2>
        <p className="text-slate-500 mb-8 max-w-sm leading-relaxed">
          Seu horário para <strong>{servicoSelecionado?.nome}</strong> no dia <strong>{diaSelecionado} às {horarioSelecionado}</strong> foi confirmado com sucesso.
        </p>
        
        <div className="w-full p-5 bg-slate-50 rounded-2xl border border-slate-100 mb-8 flex items-start gap-4 text-left">
          <div className="p-2.5 bg-white rounded-xl shadow-sm border border-slate-200 shrink-0">
            <MapPin className="w-5 h-5 text-slate-600" />
          </div>
          <div>
            <p className="font-bold text-slate-900 text-sm">Local do Atendimento</p>
            <p className="text-xs text-slate-500 mt-1">Rua Seu espaço, 1000 - São Paulo, SP</p>
          </div>
        </div>

        <button 
          onClick={() => { setStep(1); setAgendamentoConcluido(false); setHorarioSelecionado(''); }}
          className="px-6 py-3 bg-slate-100 text-slate-700 font-bold rounded-xl hover:bg-slate-200 transition-colors"
        >
          Fazer outro agendamento
        </button>
      </div>
    );
  }

  // --- FLUXO EM 3 ETAPAS ---
  return (
    <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-300 w-full">
      
      {/* Header do Fluxo */}
      <div className="bg-slate-50/50 border-b border-slate-100 p-5 flex items-center gap-4">
        {step > 1 && (
          <button onClick={handleVoltarStep} className="p-2 bg-white rounded-full border border-slate-200 shadow-sm hover:bg-slate-50 transition-colors active:scale-95">
            <ChevronLeft className="w-5 h-5 text-slate-600" />
          </button>
        )}
        <div>
          <h2 className="text-lg font-black text-slate-900 leading-tight">
            {step === 1 && 'Escolha o Serviço'}
            {step === 2 && 'Data e Horário'}
            {step === 3 && 'Seus Dados'}
          </h2>
          <p className="text-[10px] font-bold text-blue-600 uppercase tracking-wider mt-1">Passo {step} de 3</p>
        </div>
      </div>

      {/* Barra de Progresso Animada */}
      <div className="w-full bg-slate-100 h-1">
        <div 
          className="bg-blue-600 h-1 transition-all duration-500 ease-out" 
          style={{ width: `${(step / 3) * 100}%` }} 
        />
      </div>

      <div className="p-5 md:p-8 overflow-hidden">
        
        {/* PASSO 1: SERVIÇOS */}
        {step === 1 && (
          <div className="space-y-4 animate-in slide-in-from-right-8 duration-300">
            {servicos.map(serv => (
              <div 
                key={serv.id}
                onClick={() => { setServicoSelecionado(serv); handleAvancarStep(); }}
                className="group flex flex-col sm:flex-row sm:items-center justify-between p-4 rounded-2xl border border-slate-200 hover:border-blue-500 hover:ring-2 hover:ring-blue-500/20 hover:shadow-md cursor-pointer transition-all gap-4 bg-white"
              >
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="font-bold text-slate-900 text-base">{serv.nome}</h3>
                    {serv.tag && (
                      <span className="px-2 py-0.5 bg-amber-100 text-amber-700 text-[9px] font-black uppercase tracking-wider rounded border border-amber-200">
                        {serv.tag}
                      </span>
                    )}
                  </div>
                  <div className="flex items-center gap-3 text-xs font-medium text-slate-500 mt-1.5">
                    <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" /> {serv.duracao}</span>
                    <span className="text-slate-300">•</span>
                    <span className="font-black text-slate-700">R$ {serv.valor.toFixed(2)}</span>
                  </div>
                </div>
                <div className="hidden sm:flex h-10 w-10 items-center justify-center rounded-xl bg-slate-50 text-slate-400 group-hover:bg-blue-600 group-hover:text-white transition-colors shadow-sm">
                  <ChevronRight className="w-5 h-5" />
                </div>
              </div>
            ))}
          </div>
        )}

        {/* PASSO 2: DATA E HORA */}
        {step === 2 && (
          <div className="space-y-8 animate-in slide-in-from-right-8 duration-300">
            
            <div className="flex items-center gap-4 p-4 rounded-2xl bg-blue-50 border border-blue-100 shadow-sm">
              <div className="p-3 bg-white rounded-xl text-blue-600 shadow-sm border border-blue-100">
                <Scissors className="w-5 h-5" />
              </div>
              <div>
                <p className="text-[10px] font-bold text-blue-500 uppercase tracking-wider">Serviço Selecionado</p>
                <p className="font-black text-blue-900 mt-0.5">{servicoSelecionado?.nome}</p>
              </div>
            </div>

            <div>
              <h3 className="text-sm font-bold text-slate-900 mb-4 flex items-center gap-2">
                <Calendar className="w-4 h-4 text-slate-400" />
                Junho 2026
              </h3>
              <div className="flex overflow-x-auto gap-3 pb-2 scrollbar-hide">
                {diasDisponiveis.map(d => (
                  <button
                    key={d.data}
                    disabled={!d.ativo}
                    onClick={() => setDiaSelecionado(d.data)}
                    className={`flex flex-col items-center justify-center min-w-[4.5rem] py-3 rounded-2xl border transition-all ${
                      !d.ativo ? 'bg-slate-50 border-slate-100 text-slate-300 cursor-not-allowed opacity-60' :
                      diaSelecionado === d.data ? 'bg-blue-600 border-blue-600 text-white shadow-lg shadow-blue-500/30 scale-105' :
                      'bg-white border-slate-200 text-slate-600 hover:border-blue-300 hover:bg-slate-50'
                    }`}
                  >
                    <span className="text-[10px] font-bold uppercase tracking-wider mb-1">{d.dia}</span>
                    <span className="text-xl font-black">{d.data}</span>
                  </button>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-sm font-bold text-slate-900 mb-4 flex items-center gap-2">
                <Clock className="w-4 h-4 text-slate-400" />
                Horários Disponíveis
              </h3>
              <div className="grid grid-cols-3 sm:grid-cols-4 gap-3">
                {horariosDisponiveis.map(h => (
                  <button
                    key={h}
                    onClick={() => setHorarioSelecionado(h)}
                    className={`py-3 rounded-xl text-sm font-bold transition-all border ${
                      horarioSelecionado === h 
                        ? 'bg-blue-600 border-blue-600 text-white shadow-lg shadow-blue-500/30 scale-[1.02]' 
                        : 'bg-white border-slate-200 text-slate-700 hover:border-blue-300 hover:bg-blue-50'
                    }`}
                  >
                    {h}
                  </button>
                ))}
              </div>
            </div>

            <button
              onClick={handleAvancarStep}
              disabled={!horarioSelecionado}
              className="w-full py-4 bg-slate-900 hover:bg-slate-800 disabled:bg-slate-200 disabled:text-slate-400 text-white font-bold rounded-2xl transition-all flex items-center justify-center gap-2 shadow-xl shadow-slate-900/10 active:scale-95"
            >
              Continuar para Pagamento/Dados <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        )}

        {/* PASSO 3: DADOS E CONFIRMAÇÃO */}
        {step === 3 && (
          <form onSubmit={finalizarAgendamento} className="space-y-6 animate-in slide-in-from-right-8 duration-300">
            
            <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-4">
              <h3 className="text-[10px] font-bold text-slate-400 uppercase tracking-wider border-b border-slate-200 pb-3">Resumo do Agendamento</h3>
              <div className="flex justify-between items-start pt-1">
                <div>
                  <p className="font-bold text-slate-900">{servicoSelecionado?.nome}</p>
                  <p className="text-sm font-medium text-slate-500 mt-0.5">{diaSelecionado} Junho • {horarioSelecionado}</p>
                </div>
                <p className="font-black text-emerald-600 text-lg bg-emerald-50 px-2 py-1 rounded-lg border border-emerald-100">
                  R$ {servicoSelecionado?.valor.toFixed(2)}
                </p>
              </div>
            </div>

            <div className="space-y-5">
              <div className="space-y-1.5 relative">
                <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">Seu Nome Completo</label>
                <div className="relative">
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
                  <input 
                    required
                    type="text" 
                    placeholder="Ex: João da Silva"
                    value={cliente.nome}
                    onChange={e => setCliente({...cliente, nome: e.target.value})}
                    className="w-full rounded-2xl bg-white border border-slate-200 py-3.5 pl-12 pr-4 text-sm font-medium text-slate-900 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none transition-all shadow-sm"
                  />
                </div>
              </div>

              <div className="space-y-1.5 relative">
                <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">Seu WhatsApp</label>
                <div className="relative">
                  <Info className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
                  <input 
                    required
                    type="tel" 
                    placeholder="(00) 00000-0000"
                    value={cliente.telefone}
                    onChange={e => setCliente({...cliente, telefone: e.target.value})}
                    className="w-full rounded-2xl bg-white border border-slate-200 py-3.5 pl-12 pr-4 text-sm font-medium text-slate-900 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none transition-all shadow-sm"
                  />
                </div>
                <p className="text-xs font-medium text-slate-400 mt-1 ml-1">Enviaremos os detalhes e lembretes por lá.</p>
              </div>
            </div>

            <button
              type="submit"
              disabled={!cliente.nome || !cliente.telefone}
              className="w-full mt-2 py-4 bg-blue-600 hover:bg-blue-700 disabled:bg-slate-200 disabled:text-slate-400 text-white font-bold rounded-2xl transition-all flex items-center justify-center gap-2 shadow-xl shadow-blue-600/30 active:scale-95 text-base"
            >
              Confirmar Agendamento
            </button>
          </form>
        )}
      </div>
    </div>
  );
}