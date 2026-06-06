'use client';

import { useState } from 'react';
import { 
  Settings, 
  Palette, 
  CreditCard, 
  Bell, 
  Upload, 
  Check, 
  AlertCircle, 
  Smartphone, 
  Save, 
  CheckCircle2,
  Lock,
  Wallet,
  Sparkles
} from 'lucide-react';

// --- Tipagens ---
type AbaAtiva = 'aparencia' | 'pagamentos' | 'notificacoes';

export default function ConfiguracoesPage() {
  const [abaAtiva, setAbaAtiva] = useState<AbaAtiva>('aparencia');
  
  // Estados de Configuração
  const [corPrimaria, setCorPrimaria] = useState('blue');
  const [cobrarSinal, setCobrarSinal] = useState(false);
  const [gatewayConectado, setGatewayConectado] = useState(true);
  
  const [notificacoes, setNotificacoes] = useState({
    novoAgendamento: true,
    cancelamentos: true,
    resumoDiario: false,
  });

  // Estado do Botão Salvar
  const [isSalvando, setIsSalvando] = useState(false);
  const [salvoSucesso, setSalvoSucesso] = useState(false);

  // Paleta de Cores Premium para a Página do Cliente
  const coresTema = [
    { id: 'blue', nome: 'Azul Moderno', hex: 'bg-blue-600', ring: 'ring-blue-500' },
    { id: 'indigo', nome: 'Índigo Premium', hex: 'bg-indigo-600', ring: 'ring-indigo-500' },
    { id: 'purple', nome: 'Roxo Elegante', hex: 'bg-purple-600', ring: 'ring-purple-500' },
    { id: 'rose', nome: 'Rosa Suave', hex: 'bg-rose-500', ring: 'ring-rose-400' },
    { id: 'emerald', nome: 'Verde Natural', hex: 'bg-emerald-500', ring: 'ring-emerald-400' },
    { id: 'slate', nome: 'Cinza Minimalista', hex: 'bg-slate-800', ring: 'ring-slate-700' },
  ];

  const salvarConfiguracoes = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setIsSalvando(true);
    
    setTimeout(() => {
      setIsSalvando(false);
      setSalvoSucesso(true);
      setTimeout(() => setSalvoSucesso(false), 3000);
    }, 1200);
  };

  return (
    <div className="space-y-6 pb-24 lg:pb-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      
      {/* HEADER DA PÁGINA */}
      <header className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between px-4 sm:px-0">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900 lg:text-3xl flex items-center gap-2">
            <Settings className="h-6 w-6 text-slate-700" />
            Configurações
          </h1>
          <p className="mt-1 text-sm text-slate-500">Personalize sua página, pagamentos e alertas.</p>
        </div>
        
        {/* Botão de Salvar Global (Desktop) */}
        <button 
          onClick={salvarConfiguracoes}
          disabled={isSalvando || salvoSucesso}
          className={`hidden sm:flex w-full items-center justify-center gap-2 rounded-xl px-6 py-2.5 text-sm font-bold text-white shadow-lg transition-all active:scale-95 sm:w-auto ${
            salvoSucesso 
              ? 'bg-emerald-500 shadow-emerald-500/30' 
              : 'bg-blue-600 hover:bg-blue-700 shadow-blue-500/30'
          }`}
        >
          {isSalvando ? (
            <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
          ) : salvoSucesso ? (
            <><CheckCircle2 className="h-4 w-4" /> Salvo com Sucesso</>
          ) : (
            <><Save className="h-4 w-4" /> Salvar Configurações</>
          )}
        </button>
      </header>

      <div className="mx-4 sm:mx-0 flex flex-col lg:flex-row gap-6 lg:items-start">
        
        {/* SIDEBAR DE NAVEGAÇÃO DAS CONFIGURAÇÕES */}
        <div className="w-full lg:w-64 shrink-0 flex flex-row lg:flex-col gap-2 overflow-x-auto scrollbar-hide pb-2 lg:pb-0">
          <button
            onClick={() => setAbaAtiva('aparencia')}
            className={`flex items-center gap-3 px-4 py-3 rounded-xl font-bold text-sm transition-all whitespace-nowrap lg:whitespace-normal ${
              abaAtiva === 'aparencia' 
                ? 'bg-white text-blue-600 shadow-sm border border-slate-200' 
                : 'text-slate-500 hover:bg-slate-100 border border-transparent'
            }`}
          >
            <Palette className="w-4 h-4" /> Aparência e Marca
          </button>
          
          <button
            onClick={() => setAbaAtiva('pagamentos')}
            className={`flex items-center gap-3 px-4 py-3 rounded-xl font-bold text-sm transition-all whitespace-nowrap lg:whitespace-normal ${
              abaAtiva === 'pagamentos' 
                ? 'bg-white text-blue-600 shadow-sm border border-slate-200' 
                : 'text-slate-500 hover:bg-slate-100 border border-transparent'
            }`}
          >
            <CreditCard className="w-4 h-4" /> Pagamentos e PIX
          </button>
          
          <button
            onClick={() => setAbaAtiva('notificacoes')}
            className={`flex items-center gap-3 px-4 py-3 rounded-xl font-bold text-sm transition-all whitespace-nowrap lg:whitespace-normal ${
              abaAtiva === 'notificacoes' 
                ? 'bg-white text-blue-600 shadow-sm border border-slate-200' 
                : 'text-slate-500 hover:bg-slate-100 border border-transparent'
            }`}
          >
            <Bell className="w-4 h-4" /> Notificações (Admin)
          </button>
        </div>

        {/* ÁREA DE CONTEÚDO DAS ABAS */}
        <div className="flex-1 space-y-6">
          
          {/* ABA: APARÊNCIA */}
          {abaAtiva === 'aparencia' && (
            <div className="animate-in fade-in slide-in-from-right-4 duration-300 space-y-6">
              
              <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                <h3 className="text-lg font-bold text-slate-900 mb-1">Logotipo</h3>
                <p className="text-sm text-slate-500 mb-6">Esta imagem aparecerá no topo da sua página de agendamentos.</p>
                
                <div className="flex flex-col sm:flex-row items-center gap-6">
                  <div className="h-24 w-24 rounded-2xl border-2 border-dashed border-slate-300 bg-slate-50 flex items-center justify-center text-slate-400">
                    <Upload className="w-8 h-8 opacity-50" />
                  </div>
                  <div className="space-y-3 text-center sm:text-left">
                    <button className="px-4 py-2 bg-slate-900 text-white text-sm font-bold rounded-xl hover:bg-slate-800 transition-colors shadow-sm">
                      Fazer Upload
                    </button>
                    <p className="text-xs text-slate-400">Recomendado: PNG ou JPG, tamanho 500x500px</p>
                  </div>
                </div>
              </div>

              <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                <h3 className="text-lg font-bold text-slate-900 mb-1">Cor Principal (Tema)</h3>
                <p className="text-sm text-slate-500 mb-6">Escolha a cor que mais combina com a identidade do seu negócio.</p>
                
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                  {coresTema.map((cor) => {
                    const isSelected = corPrimaria === cor.id;
                    return (
                      <button
                        key={cor.id}
                        onClick={() => setCorPrimaria(cor.id)}
                        className={`flex items-center gap-3 p-3 rounded-xl border transition-all ${
                          isSelected 
                            ? `border-${cor.id}-500 bg-${cor.id}-50 ring-2 ring-${cor.id}-500/20 shadow-sm` 
                            : 'border-slate-200 hover:bg-slate-50'
                        }`}
                      >
                        <div className={`h-6 w-6 rounded-full shadow-inner ${cor.hex} flex items-center justify-center`}>
                          {isSelected && <Check className="w-3.5 h-3.5 text-white" />}
                        </div>
                        <span className={`text-sm font-bold ${isSelected ? 'text-slate-900' : 'text-slate-600'}`}>
                          {cor.nome}
                        </span>
                      </button>
                    );
                  })}
                </div>
                
                {/* Preview Mini */}
                <div className="mt-8 p-4 rounded-xl bg-slate-50 border border-slate-100">
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-3">Pré-visualização do Botão</p>
                  <button className={`px-6 py-2.5 rounded-xl text-white font-bold text-sm shadow-md transition-colors ${coresTema.find(c => c.id === corPrimaria)?.hex}`}>
                    Agendar Horário
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* ABA: PAGAMENTOS E PIX (O FATOR UAU) */}
          {abaAtiva === 'pagamentos' && (
            <div className="animate-in fade-in slide-in-from-right-4 duration-300 space-y-6">
              
              {/* Banner Proteção contra Faltas */}
              <div className="rounded-2xl border border-emerald-200 bg-gradient-to-br from-emerald-50 to-emerald-100 p-6 shadow-sm relative overflow-hidden">
                <div className="absolute top-0 right-0 p-4 opacity-10">
                  <Lock className="w-32 h-32" />
                </div>
                <div className="relative z-10">
                  <div className="flex items-center gap-2 mb-2">
                    <Sparkles className="w-5 h-5 text-emerald-600" />
                    <h3 className="text-lg font-black text-emerald-900">Proteção contra Faltas</h3>
                  </div>
                  <p className="text-sm font-medium text-emerald-800/80 mb-6 max-w-md leading-relaxed">
                    Exija o pagamento de um sinal via PIX no momento do agendamento. Se o cliente não pagar em 15 minutos, o horário é liberado automaticamente.
                  </p>
                  
                  <div className="flex items-center justify-between bg-white/60 backdrop-blur-sm p-4 rounded-xl border border-emerald-200/50">
                    <div>
                      <p className="font-bold text-emerald-900">Cobrar 30% de Sinal</p>
                      <p className="text-xs text-emerald-700">Apenas para serviços acima de R$ 50,00</p>
                    </div>
                    <button
                      onClick={() => setCobrarSinal(!cobrarSinal)}
                      className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${cobrarSinal ? 'bg-emerald-500' : 'bg-slate-300'}`}
                    >
                      <span className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${cobrarSinal ? 'translate-x-5' : 'translate-x-0'}`} />
                    </button>
                  </div>
                </div>
              </div>

              {/* Conexão com Gateway */}
              <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                <h3 className="text-lg font-bold text-slate-900 mb-1">Conta de Recebimento</h3>
                <p className="text-sm text-slate-500 mb-6">Conecte sua conta para receber os pagamentos diretamente via PIX ou Cartão.</p>
                
                {gatewayConectado ? (
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between p-4 border border-blue-200 bg-blue-50 rounded-xl gap-4">
                    <div className="flex items-center gap-4">
                      <div className="h-12 w-12 rounded-full bg-blue-600 flex items-center justify-center text-white shadow-sm">
                        <Wallet className="w-5 h-5" />
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <h4 className="font-bold text-slate-900">Mercado Pago</h4>
                          <span className="flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider text-emerald-600 bg-emerald-100 px-2 py-0.5 rounded-full">
                            <div className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                            Conectado
                          </span>
                        </div>
                        <p className="text-xs text-slate-500 mt-0.5">Taxa atual: 0.99% no PIX</p>
                      </div>
                    </div>
                    <button 
                      onClick={() => setGatewayConectado(false)}
                      className="px-4 py-2 text-sm font-bold text-slate-500 hover:bg-white hover:text-rose-600 rounded-lg transition-colors border border-transparent hover:border-rose-200 w-full sm:w-auto"
                    >
                      Desconectar
                    </button>
                  </div>
                ) : (
                  <button 
                    onClick={() => setGatewayConectado(true)}
                    className="w-full flex items-center justify-center gap-2 p-4 border-2 border-dashed border-blue-300 bg-blue-50/50 hover:bg-blue-50 text-blue-600 rounded-xl font-bold transition-colors"
                  >
                    <Wallet className="w-5 h-5" />
                    Conectar Mercado Pago
                  </button>
                )}
              </div>
            </div>
          )}

          {/* ABA: NOTIFICAÇÕES (ADMIN) */}
          {abaAtiva === 'notificacoes' && (
            <div className="animate-in fade-in slide-in-from-right-4 duration-300 space-y-6">
              
              <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                <div className="flex items-center gap-3 mb-6">
                  <div className="h-10 w-10 rounded-xl bg-slate-100 flex items-center justify-center text-slate-600">
                    <Smartphone className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-slate-900 leading-tight">Avisos no seu WhatsApp</h3>
                    <p className="text-sm text-slate-500">Escolha o que você quer saber em tempo real.</p>
                  </div>
                </div>

                <div className="space-y-2">
                  
                  {/* Novo Agendamento */}
                  <div className="flex items-center justify-between p-4 rounded-xl border border-slate-100 bg-slate-50 hover:bg-slate-100/50 transition-colors">
                    <div>
                      <p className="font-bold text-slate-900 text-sm">Novo Agendamento Realizado</p>
                      <p className="text-xs text-slate-500 mt-0.5">Receber aviso quando um cliente marcar horário na sua página.</p>
                    </div>
                    <button
                      onClick={() => setNotificacoes({...notificacoes, novoAgendamento: !notificacoes.novoAgendamento})}
                      className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${notificacoes.novoAgendamento ? 'bg-blue-600' : 'bg-slate-300'}`}
                    >
                      <span className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${notificacoes.novoAgendamento ? 'translate-x-5' : 'translate-x-0'}`} />
                    </button>
                  </div>

                  {/* Cancelamentos */}
                  <div className="flex items-center justify-between p-4 rounded-xl border border-slate-100 bg-slate-50 hover:bg-slate-100/50 transition-colors">
                    <div>
                      <p className="font-bold text-slate-900 text-sm">Cancelamento / Desistência</p>
                      <p className="text-xs text-slate-500 mt-0.5">Aviso imediato se um cliente desmarcar ou o pagamento falhar.</p>
                    </div>
                    <button
                      onClick={() => setNotificacoes({...notificacoes, cancelamentos: !notificacoes.cancelamentos})}
                      className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${notificacoes.cancelamentos ? 'bg-blue-600' : 'bg-slate-300'}`}
                    >
                      <span className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${notificacoes.cancelamentos ? 'translate-x-5' : 'translate-x-0'}`} />
                    </button>
                  </div>

                  {/* Resumo Diário */}
                  <div className="flex items-center justify-between p-4 rounded-xl border border-slate-100 bg-slate-50 hover:bg-slate-100/50 transition-colors">
                    <div>
                      <p className="font-bold text-slate-900 text-sm">Resumo da Agenda Diária</p>
                      <p className="text-xs text-slate-500 mt-0.5">Receber a lista de horários do dia todos os dias às 07:00 da manhã.</p>
                    </div>
                    <button
                      onClick={() => setNotificacoes({...notificacoes, resumoDiario: !notificacoes.resumoDiario})}
                      className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${notificacoes.resumoDiario ? 'bg-blue-600' : 'bg-slate-300'}`}
                    >
                      <span className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${notificacoes.resumoDiario ? 'translate-x-5' : 'translate-x-0'}`} />
                    </button>
                  </div>

                </div>
              </div>

              {/* Banner Aviso Whatsapp Meta */}
              <div className="flex items-start gap-3 p-4 bg-amber-50 border border-amber-200 rounded-xl text-amber-800">
                <AlertCircle className="w-5 h-5 shrink-0 mt-0.5 text-amber-600" />
                <div className="space-y-1">
                  <p className="text-sm font-bold">Importante sobre envios</p>
                  <p className="text-xs leading-relaxed opacity-90">
                    O número conectado para receber os avisos é o seu de cadastro. Certifique-se de salvar nosso número nos seus contatos para os avisos não irem para o SPAM.
                  </p>
                </div>
              </div>

            </div>
          )}

        </div>
      </div>

      {/* Botão de Salvar Mobile Sticky (Bottom) */}
      <div className="fixed bottom-20 left-4 right-4 sm:hidden z-40 animate-in slide-in-from-bottom-10">
        <button 
          onClick={salvarConfiguracoes}
          disabled={isSalvando || salvoSucesso}
          className={`flex w-full items-center justify-center gap-2 rounded-2xl px-6 py-4 text-sm font-bold text-white shadow-xl transition-all active:scale-95 ${
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
            <><Save className="h-5 w-5" /> Salvar Configurações</>
          )}
        </button>
      </div>

    </div>
  );
}