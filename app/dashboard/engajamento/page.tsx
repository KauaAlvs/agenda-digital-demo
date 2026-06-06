'use client';

import { useState } from 'react';
import { 
  Gift, 
  UserMinus, 
  BellRing, 
  MessageCircle, 
  TrendingUp, 
  Target, 
  ExternalLink,
  X,
  Copy,
  CheckCircle2,
  Calendar,
  Sparkles,
  Clock,
  AlertTriangle,
  Scissors
} from 'lucide-react';

// --- Tipagens e Mock Data ---
type CategoriaOportunidade = 'Aniversarios' | 'Ausentes' | 'Lembretes';
type NivelUrgencia = 'Alta' | 'Média' | 'Normal';

interface Oportunidade {
  id: string;
  cliente: string;
  telefone: string;
  motivo: string;
  dataRef: string;
  categoria: CategoriaOportunidade;
  templateSugerido: string;
  urgencia: NivelUrgencia;
  // Campos extras para Lembretes
  servicoContexto?: string;
  horarioContexto?: string;
}

const mockOportunidades: Oportunidade[] = [
  // --- ANIVERSÁRIOS ---
  { id: '1', cliente: 'Fátima Bernardes', telefone: '5511999991111', motivo: 'Aniversário Hoje!', dataRef: '06 Jun', categoria: 'Aniversarios', urgencia: 'Alta', templateSugerido: 'Olá Fátima! 🎉 Hoje é o seu dia especial! Para celebrar, você ganhou um voucher de 20% OFF em qualquer serviço conosco válido por 7 dias. Vamos agendar seu momento de beleza?' },
  { id: '2', cliente: 'Amanda Silva', telefone: '5511988882222', motivo: 'Aniversário Amanhã', dataRef: '07 Jun', categoria: 'Aniversarios', urgencia: 'Média', templateSugerido: 'Oi Amanda! 🎂 Vimos que seu aniversário é amanhã! Que tal dar um trato no visual para comemorar? Temos um brinde especial esperando por você aqui!' },
  { id: '3', cliente: 'Carlos Mendes', telefone: '5511977773333', motivo: 'Aniversário na Sexta', dataRef: '09 Jun', categoria: 'Aniversarios', urgencia: 'Normal', templateSugerido: 'Olá Carlos, tudo bem? Seu aniversário está chegando esta semana! Para você comemorar em grande estilo, preparamos um desconto exclusivo. Tem algum horário bom para você?' },
  { id: '4', cliente: 'Lucas Souza', telefone: '5511966664444', motivo: 'Aniversário no Domingo', dataRef: '11 Jun', categoria: 'Aniversarios', urgencia: 'Normal', templateSugerido: 'Oi Lucas! Domingo é o seu dia! 🎈 Passe aqui antes do final de semana para renovar o visual. Responda essa mensagem para garantir seu desconto de aniversariante.' },
  
  // --- AUSENTES (RECUPERAÇÃO) ---
  { id: '5', cliente: 'Mariana Ruy', telefone: '5511955556666', motivo: 'Risco de Perda', dataRef: 'Última: 05 Fev (120 dias)', categoria: 'Ausentes', urgencia: 'Alta', templateSugerido: 'Oi Mariana, tudo bem? Sentimos muito a sua falta! Faz 4 meses que não nos vemos. Como você é uma cliente muito especial, liberamos um pacote com valor promocional para o seu retorno. Gostaria de ver os horários?' },
  { id: '6', cliente: 'Roberto Alves', telefone: '5511944447777', motivo: 'Sumido', dataRef: 'Última: 05 Mar (90 dias)', categoria: 'Ausentes', urgencia: 'Média', templateSugerido: 'Olá Roberto! Passando para saber se está tudo bem com você. Já está na hora de renovarmos aquele seu último serviço. Preparamos uma condição especial. Que tal agendarmos um horário?' },
  { id: '7', cliente: 'Juliana Costa', telefone: '5511933338888', motivo: 'Hora do Retorno', dataRef: 'Última: 05 Abr (60 dias)', categoria: 'Ausentes', urgencia: 'Média', templateSugerido: 'Oi Juliana! Tudo ótimo por aí? O prazo ideal para a manutenção do seu serviço já chegou. Tenho alguns horários vagos nesta quinta e sexta. Qual fica melhor para você?' },
  { id: '8', cliente: 'Pedro Paulo', telefone: '5511922229999', motivo: 'Pós-Química/Serviço', dataRef: 'Última: 20 Abr (45 dias)', categoria: 'Ausentes', urgencia: 'Normal', templateSugerido: 'Olá Pedro! Como tem sido o resultado do seu último procedimento? Para mantermos a qualidade em dia, sugerimos um retorno na próxima semana. Vamos deixar agendado?' },
  
  // --- LEMBRETES (EVITAR FALTAS) ---
  { id: '9', cliente: 'Fernanda Lima', telefone: '5511911110000', motivo: 'Agendamento Hoje', dataRef: 'Hoje', horarioContexto: '18:00', servicoContexto: 'Coloração Completa', categoria: 'Lembretes', urgencia: 'Alta', templateSugerido: 'Olá Fernanda! Passando para confirmar nosso agendamento HOJE às 18:00 para sua Coloração Completa. Pode nos confirmar enviando um "SIM" por favor? Aguardamos você!' },
  { id: '10', cliente: 'João Pedro', telefone: '5511900001111', motivo: 'Agendamento Amanhã', dataRef: 'Amanhã', horarioContexto: '09:00', servicoContexto: 'Corte e Barba Premium', categoria: 'Lembretes', urgencia: 'Alta', templateSugerido: 'Bom dia João! Tudo certo para o nosso horário de amanhã às 09:00? Passando só para confirmar. Responda SIM ou caso precise reagendar, nos avise!' },
  { id: '11', cliente: 'Ana Clara', telefone: '5511988887777', motivo: 'Agendamento Amanhã', dataRef: 'Amanhã', horarioContexto: '14:00', servicoContexto: 'Limpeza de Pele', categoria: 'Lembretes', urgencia: 'Média', templateSugerido: 'Oi Ana! Tudo bem? Lembrete rápido: amanhã às 14:00 temos seu horário reservado para a Limpeza de Pele. Estamos ansiosos para te receber. Confirma sua presença?' },
  { id: '12', cliente: 'Marcos Paulo', telefone: '5511977776666', motivo: 'Agendamento Amanhã', dataRef: 'Amanhã', horarioContexto: '16:30', servicoContexto: 'Avaliação Inicial', categoria: 'Lembretes', urgencia: 'Média', templateSugerido: 'Olá Marcos! Sua avaliação inicial está marcada para amanhã às 16:30. Pedimos que chegue com 5 minutos de antecedência. Podemos confirmar?' },
];

// --- Helpers Visuais ---
const getUrgenciaBadge = (urgencia: NivelUrgencia) => {
  switch (urgencia) {
    case 'Alta': return 'bg-rose-100 text-rose-700 border-rose-200';
    case 'Média': return 'bg-amber-100 text-amber-700 border-amber-200';
    case 'Normal': return 'bg-blue-100 text-blue-700 border-blue-200';
  }
};

export default function MarketingInteligentePage() {
  const [abaAtiva, setAbaAtiva] = useState<CategoriaOportunidade>('Lembretes'); // Iniciar na aba mais importante
  const [oportunidadeSelecionada, setOportunidadeSelecionada] = useState<Oportunidade | null>(null);
  
  // Estado do Modal de Envio
  const [textoMensagem, setTextoMensagem] = useState('');
  const [copiado, setCopiado] = useState(false);

  const dadosFiltrados = mockOportunidades.filter(op => op.categoria === abaAtiva);

  const abrirModalEnvio = (oportunidade: Oportunidade) => {
    setOportunidadeSelecionada(oportunidade);
    setTextoMensagem(oportunidade.templateSugerido);
    setCopiado(false);
  };

  const handleCopiarTexto = () => {
    navigator.clipboard.writeText(textoMensagem);
    setCopiado(true);
    setTimeout(() => setCopiado(false), 2000);
  };

  const linkWhatsApp = oportunidadeSelecionada 
    ? `https://wa.me/${oportunidadeSelecionada.telefone}?text=${encodeURIComponent(textoMensagem)}` 
    : '#';

  return (
    <div className="space-y-6 pb-24 lg:pb-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      
      {/* HEADER */}
      <header className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between px-4 sm:px-0">
        <div>
          <div className="flex items-center gap-2">
            <Target className="h-6 w-6 text-blue-600" />
            <h1 className="text-2xl font-bold tracking-tight text-slate-900 lg:text-3xl">Engaje seus clientes!</h1>
          </div>
          <p className="mt-1 text-sm text-slate-500">Aumente suas vendas com disparos manuais e sem custo de API.</p>
        </div>
        
        {/* Badge para destacar que é gratuito */}
        <div className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-emerald-100 text-emerald-700 border border-emerald-200 rounded-xl w-fit sm:w-auto shadow-sm">
          <Sparkles className="w-4 h-4" />
          <span className="text-xs font-bold uppercase tracking-wider">Envio Gratuito via Zap</span>
        </div>
      </header>

      {/* MÉTRICAS DE OPORTUNIDADE (Overview) */}
      <div className="mx-4 sm:mx-0 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm flex items-center gap-4 transition-all hover:shadow-md hover:border-blue-200">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
            <MessageCircle className="h-6 w-6" />
          </div>
          <div>
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-0.5">Fila de Disparos</p>
            <p className="text-2xl font-black text-slate-900">12 <span className="text-sm font-medium text-slate-500">oportunidades</span></p>
          </div>
        </div>
        <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm flex items-center gap-4 transition-all hover:shadow-md hover:border-emerald-200">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600">
            <TrendingUp className="h-6 w-6" />
          </div>
          <div>
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-0.5">Receita Potencial</p>
            <p className="text-2xl font-black text-slate-900">R$ 1.250<span className="text-sm font-medium text-slate-500">,00</span></p>
          </div>
        </div>
        <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm flex items-center gap-4 sm:col-span-2 lg:col-span-1 transition-all hover:shadow-md hover:border-amber-200">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-amber-50 text-amber-600">
            <AlertTriangle className="h-6 w-6" />
          </div>
          <div>
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-0.5">Atenção Máxima</p>
            <p className="text-sm font-bold text-slate-900 mt-1 leading-tight">Você tem <span className="text-amber-600">4 lembretes</span> pendentes para enviar hoje.</p>
          </div>
        </div>
      </div>

      {/* ABAS DE NAVEGAÇÃO (Tabs) */}
      <div className="mx-4 sm:mx-0 flex overflow-x-auto scrollbar-hide gap-3 pb-2">
        <button
          onClick={() => setAbaAtiva('Lembretes')}
          className={`flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-3 p-4 rounded-2xl border min-w-[160px] sm:min-w-0 flex-1 transition-all ${
            abaAtiva === 'Lembretes' 
              ? 'bg-white border-blue-500 ring-2 ring-blue-500/20 shadow-sm' 
              : 'bg-slate-50 border-slate-200 hover:bg-white hover:shadow-sm'
          }`}
        >
          <div className={`p-2.5 rounded-xl shrink-0 ${abaAtiva === 'Lembretes' ? 'bg-blue-100 text-blue-600' : 'bg-slate-200 text-slate-500'}`}>
            <BellRing className="w-5 h-5" />
          </div>
          <div className="text-left">
            <p className={`font-bold ${abaAtiva === 'Lembretes' ? 'text-slate-900' : 'text-slate-600'}`}>Confirmações</p>
            <p className="text-xs text-slate-500">4 agendamentos</p>
          </div>
        </button>

        <button
          onClick={() => setAbaAtiva('Ausentes')}
          className={`flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-3 p-4 rounded-2xl border min-w-[160px] sm:min-w-0 flex-1 transition-all ${
            abaAtiva === 'Ausentes' 
              ? 'bg-white border-rose-500 ring-2 ring-rose-500/20 shadow-sm' 
              : 'bg-slate-50 border-slate-200 hover:bg-white hover:shadow-sm'
          }`}
        >
          <div className={`p-2.5 rounded-xl shrink-0 ${abaAtiva === 'Ausentes' ? 'bg-rose-100 text-rose-600' : 'bg-slate-200 text-slate-500'}`}>
            <UserMinus className="w-5 h-5" />
          </div>
          <div className="text-left">
            <p className={`font-bold ${abaAtiva === 'Ausentes' ? 'text-slate-900' : 'text-slate-600'}`}>Recuperação</p>
            <p className="text-xs text-slate-500">4 inativos (+45d)</p>
          </div>
        </button>

        <button
          onClick={() => setAbaAtiva('Aniversarios')}
          className={`flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-3 p-4 rounded-2xl border min-w-[160px] sm:min-w-0 flex-1 transition-all ${
            abaAtiva === 'Aniversarios' 
              ? 'bg-white border-purple-500 ring-2 ring-purple-500/20 shadow-sm' 
              : 'bg-slate-50 border-slate-200 hover:bg-white hover:shadow-sm'
          }`}
        >
          <div className={`p-2.5 rounded-xl shrink-0 ${abaAtiva === 'Aniversarios' ? 'bg-purple-100 text-purple-600' : 'bg-slate-200 text-slate-500'}`}>
            <Gift className="w-5 h-5" />
          </div>
          <div className="text-left">
            <p className={`font-bold ${abaAtiva === 'Aniversarios' ? 'text-slate-900' : 'text-slate-600'}`}>Aniversariantes</p>
            <p className="text-xs text-slate-500">4 nesta semana</p>
          </div>
        </button>
      </div>

      {/* LISTAGEM INTELIGENTE */}
      <div className="mx-4 sm:mx-0 bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        
        {/* Header da Lista */}
        <div className="px-5 py-4 border-b border-slate-100 bg-slate-50/50 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <h2 className="font-bold text-slate-800">
            {abaAtiva === 'Lembretes' && 'Evite faltas confirmando estes horários agora'}
            {abaAtiva === 'Ausentes' && 'Traga esses clientes de volta e gere caixa'}
            {abaAtiva === 'Aniversarios' && 'Mime seus clientes e garanta uma nova visita'}
          </h2>
          <span className="text-xs font-medium text-slate-500 bg-white px-2.5 py-1 rounded-lg border border-slate-200 shadow-sm w-fit">
            Listando por Urgência
          </span>
        </div>
        
        {/* Renderização Condicional da Interface dos Cards */}
        <div className="flex flex-col">
          {dadosFiltrados.map((item, index) => {
            
            // Layout Específico para LEMBRETES (Visual de Ticket de Agendamento)
            if (abaAtiva === 'Lembretes') {
              return (
                <div key={item.id} className={`flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 transition-colors hover:bg-slate-50 ${index !== dadosFiltrados.length - 1 ? 'border-b border-slate-100' : ''}`}>
                  <div className="flex items-start sm:items-center gap-4 w-full">
                    
                    {/* Badge Dia/Hora (Ticket Visual) */}
                    <div className={`flex flex-col items-center justify-center min-w-[70px] rounded-xl border p-2 shadow-sm ${item.urgencia === 'Alta' ? 'bg-rose-50 border-rose-200 text-rose-700' : 'bg-white border-slate-200 text-slate-700'}`}>
                      <span className="text-[10px] font-bold uppercase tracking-wider">{item.dataRef}</span>
                      <span className="text-lg font-black">{item.horarioContexto}</span>
                    </div>

                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-bold text-slate-900 text-lg">{item.cliente}</h3>
                        <span className={`px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider rounded border ${getUrgenciaBadge(item.urgencia)}`}>
                          Pendente
                        </span>
                      </div>
                      <div className="flex flex-wrap items-center gap-2 text-xs font-medium text-slate-500">
                        <span className="flex items-center gap-1 bg-slate-100 px-2 py-1 rounded text-slate-600"><Scissors className="w-3 h-3" /> {item.servicoContexto}</span>
                        <span className="text-slate-300 hidden sm:inline">•</span>
                        <span className="flex items-center gap-1"><MessageCircle className="w-3 h-3 text-emerald-500" /> Enviar confirmação</span>
                      </div>
                    </div>
                  </div>

                  <button onClick={() => abrirModalEnvio(item)} className="flex items-center justify-center gap-2 w-full sm:w-auto px-5 py-2.5 bg-[#25D366]/10 hover:bg-[#25D366]/20 text-[#128C7E] font-bold rounded-xl transition-all active:scale-95 shrink-0">
                    <MessageCircle className="w-4 h-4" />
                    <span>Confirmar</span>
                  </button>
                </div>
              )
            }

            // Layout Padrão para AUSENTES e ANIVERSÁRIOS
            return (
              <div key={item.id} className={`flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 transition-colors hover:bg-slate-50 ${index !== dadosFiltrados.length - 1 ? 'border-b border-slate-100' : ''}`}>
                <div className="flex items-center gap-4">
                  <div className={`hidden sm:flex h-12 w-12 items-center justify-center rounded-full border shadow-inner ${
                    abaAtiva === 'Aniversarios' ? 'bg-purple-50 border-purple-100 text-purple-500' : 'bg-rose-50 border-rose-100 text-rose-500'
                  }`}>
                    {abaAtiva === 'Aniversarios' ? <Gift className="w-5 h-5" /> : <UserMinus className="w-5 h-5" />}
                  </div>
                  
                  <div>
                    <div className="flex items-center gap-2 mb-0.5">
                      <h3 className="font-bold text-slate-900">{item.cliente}</h3>
                      {item.urgencia === 'Alta' && (
                        <span className={`px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider rounded border ${getUrgenciaBadge(item.urgencia)}`}>
                          Prioridade
                        </span>
                      )}
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold text-slate-700">{item.motivo}</span>
                      <span className="text-slate-300">•</span>
                      <span className="text-xs text-slate-500 flex items-center gap-1">
                        {abaAtiva === 'Ausentes' ? <Clock className="w-3 h-3" /> : <Calendar className="w-3 h-3" />}
                        {item.dataRef}
                      </span>
                    </div>
                  </div>
                </div>

                <button onClick={() => abrirModalEnvio(item)} className="flex items-center justify-center gap-2 w-full sm:w-auto px-4 py-2.5 bg-[#25D366]/10 hover:bg-[#25D366]/20 text-[#128C7E] font-bold rounded-xl transition-all active:scale-95">
                  <MessageCircle className="w-4 h-4" />
                  <span>Enviar Mensagem</span>
                </button>
              </div>
            )
          })}
        </div>
      </div>

      {/* --- MODAL DE DISPARO MANUAL (Preview WhatsApp) --- */}
      {oportunidadeSelecionada && (
        <div className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center p-0 sm:p-4 animate-in fade-in duration-300">
          <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm" onClick={() => setOportunidadeSelecionada(null)} />
          
          <div className="relative w-full max-w-lg bg-white rounded-t-[32px] sm:rounded-3xl shadow-2xl overflow-hidden animate-in slide-in-from-bottom-10 sm:zoom-in-95 duration-300 flex flex-col">
            
            {/* Header Modal */}
            <div className="flex items-center justify-between border-b border-slate-100 px-6 py-5 shrink-0 bg-slate-50/50">
              <div>
                <h2 className="text-lg font-black text-slate-900 flex items-center gap-2">
                  <MessageCircle className="w-5 h-5 text-[#25D366]" />
                  WhatsApp Inteligente
                </h2>
                <p className="text-xs text-slate-500 mt-1">Contato: <strong className="text-slate-700">{oportunidadeSelecionada.cliente}</strong></p>
              </div>
              <button onClick={() => setOportunidadeSelecionada(null)} className="rounded-full bg-white shadow-sm border border-slate-200 p-2 text-slate-500 transition-colors hover:bg-slate-50 hover:text-slate-900">
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Corpo do Modal - Editor */}
            <div className="p-6 space-y-5 overflow-y-auto bg-white">
              
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">Texto Sugerido (Pode Editar)</label>
                  <button 
                    onClick={handleCopiarTexto}
                    className="flex items-center gap-1.5 text-[10px] uppercase tracking-wider font-bold text-blue-600 hover:text-blue-700 transition-colors bg-blue-50 px-2 py-1 rounded"
                  >
                    {copiado ? <CheckCircle2 className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                    {copiado ? 'Texto Copiado!' : 'Copiar Texto'}
                  </button>
                </div>
                
                {/* Editor Textarea */}
                <textarea 
                  rows={6}
                  value={textoMensagem}
                  onChange={(e) => setTextoMensagem(e.target.value)}
                  className="w-full rounded-2xl bg-slate-50 border border-slate-200 p-4 text-sm font-medium text-slate-700 focus:bg-white focus:border-[#25D366] focus:ring-2 focus:ring-[#25D366]/20 outline-none transition-all shadow-sm resize-none custom-scrollbar leading-relaxed"
                />
              </div>

              {/* Dica do Sistema Dinâmica baseada na Aba */}
              <div className="bg-amber-50 border border-amber-100 rounded-xl p-3.5 flex gap-3 shadow-sm">
                <div className="mt-0.5">
                  <Sparkles className="w-4 h-4 text-amber-500" />
                </div>
                <p className="text-xs text-amber-800 leading-relaxed">
                  <strong>Dica de Ouro: </strong> 
                  {abaAtiva === 'Lembretes' && 'Mensagens de lembrete com perguntas diretas ("Pode confirmar com SIM?") evitam esquecimentos e reduzem as faltas na agenda.'}
                  {abaAtiva === 'Ausentes' && 'Oferecer um gatilho de retorno (como uma avaliação grátis ou pequena vantagem) ajuda a quebrar o gelo de clientes sumidos.'}
                  {abaAtiva === 'Aniversarios' && 'Dê sempre um prazo de validade para o presente (Ex: "Válido por 7 dias"), isso cria senso de urgência e acelera a marcação.'}
                </p>
              </div>

            </div>

            {/* Modal Actions */}
            <div className="p-6 bg-slate-50 border-t border-slate-100 flex flex-col sm:flex-row gap-3 pb-8 sm:pb-6 shrink-0">
              <button
                type="button"
                onClick={() => setOportunidadeSelecionada(null)}
                className="flex-1 py-3.5 px-4 bg-white border border-slate-200 text-slate-700 hover:bg-slate-100 rounded-xl font-bold transition-colors shadow-sm order-2 sm:order-1"
              >
                Voltar
              </button>
              
              <a
                href={linkWhatsApp}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setOportunidadeSelecionada(null)}
                className="flex-[2] flex items-center justify-center gap-2 py-3.5 px-4 bg-[#25D366] hover:bg-[#128C7E] text-white rounded-xl font-bold transition-all shadow-lg shadow-[#25D366]/30 active:scale-95 order-1 sm:order-2"
              >
                <ExternalLink className="w-4 h-4" /> 
                Abrir WhatsApp e Enviar
              </a>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}