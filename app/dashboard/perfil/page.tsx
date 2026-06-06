'use client';

import { useState } from 'react';
import { 
  User, 
  Mail, 
  Phone, 
  Camera, 
  Link as LinkIcon, 
  Clock, 
  Save, 
  CheckCircle2, 
  Copy, 
  Check,
  AtSign, // Substituído aqui
  MapPin,
  Sparkles,
  ExternalLink
} from 'lucide-react';

// --- Tipagens e Mock Data ---
interface DiaTrabalho {
  id: string;
  nome: string;
  ativo: boolean;
  inicio: string;
  fim: string;
}

const mockDias: DiaTrabalho[] = [
  { id: 'seg', nome: 'Segunda-feira', ativo: true, inicio: '09:00', fim: '18:00' },
  { id: 'ter', nome: 'Terça-feira', ativo: true, inicio: '09:00', fim: '18:00' },
  { id: 'qua', nome: 'Quarta-feira', ativo: true, inicio: '09:00', fim: '18:00' },
  { id: 'qui', nome: 'Quinta-feira', ativo: true, inicio: '09:00', fim: '18:00' },
  { id: 'sex', nome: 'Sexta-feira', ativo: true, inicio: '09:00', fim: '17:00' },
  { id: 'sab', nome: 'Sábado', ativo: false, inicio: '09:00', fim: '13:00' },
  { id: 'dom', nome: 'Domingo', ativo: false, inicio: '00:00', fim: '00:00' },
];

export default function MeuPerfilPage() {
  // Estados do Formulário Base
  const [perfil, setPerfil] = useState({
    nome: 'Kauã Desenvolvedor',
    email: 'kaua@pasm.com.br',
    telefone: '5511985394101',
    bio: 'Especialista em criar experiências premium e sistemas de alto impacto para negócios modernos.',
    endereco: 'Av. das Inovações, 1000 - SP',
    instagram: '@pasmtecnologia',
    linkPublico: 'agende.app/kaua-dev'
  });

  // Estado da Jornada de Trabalho
  const [jornada, setJornada] = useState<DiaTrabalho[]>(mockDias);

  // Estados de Interação UI
  const [linkCopiado, setLinkCopiado] = useState(false);
  const [isSalvando, setIsSalvando] = useState(false);
  const [salvoSucesso, setSalvoSucesso] = useState(false);

  // Ações
  const handleToggleDia = (id: string) => {
    setJornada(prev => prev.map(dia => dia.id === id ? { ...dia, ativo: !dia.ativo } : dia));
  };

  const handleMudarHorario = (id: string, campo: 'inicio' | 'fim', valor: string) => {
    setJornada(prev => prev.map(dia => dia.id === id ? { ...dia, [campo]: valor } : dia));
  };

  const copiarLink = () => {
    navigator.clipboard.writeText(`https://${perfil.linkPublico}`);
    setLinkCopiado(true);
    setTimeout(() => setLinkCopiado(false), 2000);
  };

  const salvarPerfil = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSalvando(true);
    
    // Simula uma requisição de API
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
            <User className="h-6 w-6 text-blue-600" />
            Meu Perfil
          </h1>
          <p className="mt-1 text-sm text-slate-500">Gerencie suas informações públicas e horários de atendimento.</p>
        </div>
        
        {/* Botão de Salvar Global (Aparece no Desktop também no topo para facilidade) */}
        <button 
          onClick={salvarPerfil}
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
            <><Save className="h-4 w-4" /> Salvar Alterações</>
          )}
        </button>
      </header>

      <form onSubmit={salvarPerfil} className="mx-4 sm:mx-0 space-y-6">
        
        {/* SESSÃO 1: CABEÇALHO DO PERFIL (COVER + AVATAR) */}
        <div className="rounded-2xl border border-slate-200 bg-white shadow-sm overflow-hidden">
          {/* Cover Photo / Gradient Banner */}
          <div className="h-32 w-full bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 relative overflow-hidden">
            {/* Efeito Blob sutil no fundo */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3" />
          </div>

          <div className="px-6 pb-6 pt-0 flex flex-col sm:flex-row gap-6 items-center sm:items-end -mt-12 relative z-10">
            {/* Avatar Interativo */}
            <div className="relative group cursor-pointer">
              <div className="h-28 w-28 rounded-full border-4 border-white bg-slate-100 flex items-center justify-center text-4xl font-black text-slate-400 shadow-sm overflow-hidden bg-[url('https://i.ibb.co/31z5j68/avatar-mock.jpg')] bg-cover bg-center">
                {/* Se não tiver imagem, renderiza iniciais */}
              </div>
              <div className="absolute inset-0 bg-slate-900/40 rounded-full opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <Camera className="w-6 h-6 text-white" />
              </div>
              <div className="absolute bottom-1 right-1 h-6 w-6 rounded-full bg-blue-600 border-2 border-white flex items-center justify-center text-white shadow-sm">
                <Camera className="w-3 h-3" />
              </div>
            </div>

            <div className="flex-1 text-center sm:text-left mb-2">
              <h2 className="text-2xl font-black text-slate-900 leading-tight">{perfil.nome}</h2>
              <p className="text-sm font-medium text-slate-500">Visualização de Administrador</p>
            </div>
            
            <div className="mb-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-emerald-100 text-emerald-700 border border-emerald-200 rounded-full text-xs font-bold uppercase tracking-wider">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                </span>
                Perfil Online
              </span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* COLUNA ESQUERDA: DADOS PESSOAIS */}
          <div className="lg:col-span-2 space-y-6">
            
            {/* Informações Básicas */}
            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm space-y-5">
              <div className="flex items-center gap-2 mb-2">
                <User className="h-5 w-5 text-blue-600" />
                <h3 className="text-lg font-bold text-slate-900">Informações Pessoais</h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {/* Nome */}
                <div className="space-y-1.5 relative">
                  <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">Nome de Exibição</label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                    <input 
                      type="text" 
                      value={perfil.nome}
                      onChange={e => setPerfil({...perfil, nome: e.target.value})}
                      className="w-full rounded-xl bg-slate-50 border border-slate-200 py-2.5 pl-10 pr-3 text-sm font-medium text-slate-900 focus:bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none transition-all shadow-sm"
                    />
                  </div>
                </div>

                {/* Telefone */}
                <div className="space-y-1.5 relative">
                  <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">WhatsApp de Contato</label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                    <input 
                      type="tel" 
                      value={perfil.telefone}
                      onChange={e => setPerfil({...perfil, telefone: e.target.value})}
                      className="w-full rounded-xl bg-slate-50 border border-slate-200 py-2.5 pl-10 pr-3 text-sm font-medium text-slate-900 focus:bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none transition-all shadow-sm"
                    />
                  </div>
                </div>

                {/* E-mail */}
                <div className="space-y-1.5 relative">
                  <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">E-mail</label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                    <input 
                      type="email" 
                      value={perfil.email}
                      onChange={e => setPerfil({...perfil, email: e.target.value})}
                      className="w-full rounded-xl bg-slate-50 border border-slate-200 py-2.5 pl-10 pr-3 text-sm font-medium text-slate-900 focus:bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none transition-all shadow-sm"
                    />
                  </div>
                </div>

                {/* Redes Sociais (@) */}
                <div className="space-y-1.5 relative">
                  <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">Redes Sociais (Instagram)</label>
                  <div className="relative">
                    <AtSign className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                    <input 
                      type="text" 
                      value={perfil.instagram}
                      onChange={e => setPerfil({...perfil, instagram: e.target.value})}
                      className="w-full rounded-xl bg-slate-50 border border-slate-200 py-2.5 pl-10 pr-3 text-sm font-medium text-slate-900 focus:bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none transition-all shadow-sm"
                    />
                  </div>
                </div>

                {/* Endereço */}
                <div className="space-y-1.5 relative md:col-span-2">
                  <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">Local de Atendimento</label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                    <input 
                      type="text" 
                      value={perfil.endereco}
                      onChange={e => setPerfil({...perfil, endereco: e.target.value})}
                      className="w-full rounded-xl bg-slate-50 border border-slate-200 py-2.5 pl-10 pr-3 text-sm font-medium text-slate-900 focus:bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none transition-all shadow-sm"
                    />
                  </div>
                </div>

                {/* Bio */}
                <div className="space-y-1.5 md:col-span-2">
                  <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block flex justify-between">
                    <span>Sobre Você (Aparece na página de agendamento)</span>
                    <span className="font-normal text-slate-400">{perfil.bio.length}/300</span>
                  </label>
                  <textarea 
                    rows={3}
                    maxLength={300}
                    value={perfil.bio}
                    onChange={e => setPerfil({...perfil, bio: e.target.value})}
                    className="w-full rounded-xl bg-slate-50 border border-slate-200 p-3 text-sm font-medium text-slate-700 focus:bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none transition-all shadow-sm resize-none"
                  />
                </div>
              </div>
            </div>

            {/* Jornada de Trabalho (Horários) */}
            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-6">
                <div className="flex items-center gap-2">
                  <Clock className="h-5 w-5 text-blue-600" />
                  <h3 className="text-lg font-bold text-slate-900">Jornada de Trabalho</h3>
                </div>
                <p className="text-xs font-medium text-slate-500 bg-slate-50 px-3 py-1.5 rounded-lg border border-slate-200">
                  Defina os horários em que aceita agendamentos
                </p>
              </div>

              <div className="flex flex-col gap-3">
                {jornada.map(dia => (
                  <div key={dia.id} className={`flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-4 rounded-xl border transition-all ${dia.ativo ? 'bg-white border-slate-200 shadow-sm' : 'bg-slate-50 border-slate-100 opacity-75'}`}>
                    
                    {/* Toggle e Dia */}
                    <div className="flex items-center gap-3 w-40">
                      <button
                        type="button"
                        onClick={() => handleToggleDia(dia.id)}
                        className={`relative inline-flex h-5 w-9 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${dia.ativo ? 'bg-emerald-500' : 'bg-slate-300'}`}
                      >
                        <span className={`pointer-events-none inline-block h-4 w-4 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${dia.ativo ? 'translate-x-4' : 'translate-x-0'}`} />
                      </button>
                      <span className={`text-sm font-bold ${dia.ativo ? 'text-slate-900' : 'text-slate-400'}`}>
                        {dia.nome}
                      </span>
                    </div>

                    {/* Inputs de Horário */}
                    {dia.ativo ? (
                      <div className="flex items-center gap-2">
                        <input 
                          type="time" 
                          value={dia.inicio}
                          onChange={(e) => handleMudarHorario(dia.id, 'inicio', e.target.value)}
                          className="w-24 rounded-lg bg-slate-50 border border-slate-200 py-1.5 px-2.5 text-sm font-bold text-slate-700 outline-none focus:ring-2 focus:ring-blue-500/20 text-center"
                        />
                        <span className="text-slate-400 text-sm font-medium">até</span>
                        <input 
                          type="time" 
                          value={dia.fim}
                          onChange={(e) => handleMudarHorario(dia.id, 'fim', e.target.value)}
                          className="w-24 rounded-lg bg-slate-50 border border-slate-200 py-1.5 px-2.5 text-sm font-bold text-slate-700 outline-none focus:ring-2 focus:ring-blue-500/20 text-center"
                        />
                      </div>
                    ) : (
                      <span className="text-sm font-medium text-slate-400 italic">Fechado</span>
                    )}
                  </div>
                ))}
              </div>
            </div>

          </div>

          {/* COLUNA DIREITA: AÇÕES E LINK PÚBLICO */}
          <div className="space-y-6">
            
            {/* Card: Compartilhar Agendamento */}
            <div className="rounded-2xl border border-blue-200 bg-gradient-to-b from-blue-50 to-white p-6 shadow-sm text-center relative overflow-hidden group">
              {/* Efeito Brilho */}
              <div className="absolute top-0 right-0 -mr-8 -mt-8 w-32 h-32 bg-blue-400/20 rounded-full blur-2xl group-hover:bg-blue-400/30 transition-all" />
              
              <div className="flex justify-center mb-4 relative z-10">
                <div className="h-14 w-14 rounded-2xl bg-blue-100 text-blue-600 flex items-center justify-center shadow-inner border border-blue-200">
                  <LinkIcon className="h-6 w-6" />
                </div>
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-1 relative z-10">Link de Agendamento</h3>
              <p className="text-sm text-slate-500 mb-5 relative z-10">Compartilhe este link na bio do seu Instagram para seus clientes agendarem sozinhos.</p>
              
              <div className="bg-white border border-slate-200 rounded-xl p-1 shadow-inner flex items-center mb-4 relative z-10">
                <div className="flex-1 overflow-hidden px-3 text-left">
                  <p className="text-sm font-medium text-slate-700 truncate">
                    {perfil.linkPublico}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={copiarLink}
                  className="bg-blue-600 hover:bg-blue-700 text-white p-2.5 rounded-lg transition-colors flex shrink-0 shadow-sm"
                >
                  {linkCopiado ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                </button>
              </div>

              <a href="#" className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-blue-600 hover:text-blue-800 transition-colors relative z-10">
                <ExternalLink className="w-3.5 h-3.5" />
                Acessar minha página
              </a>
            </div>

            {/* Card: Upgrade / Dica Premium */}
            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <div className="flex items-start gap-3">
                <div className="p-2 bg-amber-50 rounded-lg text-amber-500 shrink-0">
                  <Sparkles className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 text-sm">Personalize sua Marca</h4>
                  <p className="text-xs text-slate-500 mt-1 leading-relaxed mb-3">
                    Você pode alterar as cores da sua página de agendamento na aba de Configurações para ficar com a identidade do seu negócio.
                  </p>
                  <button type="button" className="text-xs font-bold text-amber-600 hover:text-amber-700">
                    Ir para Configurações →
                  </button>
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* Botão de Salvar Mobile Sticky (Bottom) */}
        <div className="fixed bottom-20 left-4 right-4 sm:hidden z-40 animate-in slide-in-from-bottom-10">
          <button 
            type="submit"
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
              <><Save className="h-5 w-5" /> Salvar Alterações</>
            )}
          </button>
        </div>

      </form>
    </div>
  );
}