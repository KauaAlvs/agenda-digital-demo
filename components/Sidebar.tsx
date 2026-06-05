'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  LayoutDashboard, 
  CalendarDays, 
  Users, 
  UserCircle, 
  Settings, 
  LogOut, 
  ChevronDown,
  ChevronRight,
  Menu,
  X
} from 'lucide-react';

const menuItems = [
  {
    title: 'Dashboard',
    icon: LayoutDashboard,
    subItems: [
      { name: 'Visão Geral', href: '/dashboard' },
      { name: 'Métricas e Frequência', href: '/dashboard/metricas' },
    ]
  },
  {
    title: 'Agenda',
    icon: CalendarDays,
    subItems: [
      { name: 'Calendário', href: '/dashboard/agenda' },
      { name: 'Lista de Agendamentos', href: '/dashboard/agendamentos' },
    ]
  },
  {
    title: 'Clientes',
    icon: Users,
    subItems: [
      { name: 'Meus Clientes', href: '/dashboard/clientes' },
      { name: 'Novo Cadastro', href: '/dashboard/clientes/novo' },
      { name: 'Gestão Avançada', href: '/dashboard/clientes/gestao' },
    ]
  }
];

export default function Sidebar() {
  const pathname = usePathname();
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [openDropdowns, setOpenDropdowns] = useState<Record<string, boolean>>({
    'Dashboard': true // Mantém o primeiro aberto por padrão
  });

  const toggleDropdown = (title: string) => {
    if (isCollapsed) setIsCollapsed(false);
    setOpenDropdowns(prev => ({ ...prev, [title]: !prev[title] }));
  };

  return (
    <>
      {/* Botão Mobile para abrir a Sidebar */}
      <button 
        onClick={() => setIsMobileOpen(true)}
        className="fixed top-4 left-4 z-40 rounded-xl bg-white p-2 shadow-md lg:hidden"
      >
        <Menu className="h-6 w-6 text-slate-700" />
      </button>

      {/* Overlay Mobile */}
      {isMobileOpen && (
        <div 
          className="fixed inset-0 z-40 bg-slate-900/50 backdrop-blur-sm lg:hidden"
          onClick={() => setIsMobileOpen(false)}
        />
      )}

      {/* Sidebar Principal */}
      <aside 
        className={`fixed inset-y-0 left-0 z-50 flex flex-col border-r border-slate-200 bg-white transition-all duration-300 ease-in-out lg:relative ${
          isCollapsed ? 'w-20' : 'w-72'
        } ${isMobileOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}`}
      >
        {/* Header da Sidebar */}
        <div className="flex h-20 items-center justify-between border-b border-slate-100 px-6">
          <div className={`flex items-center gap-3 overflow-hidden transition-all ${isCollapsed ? 'w-0 opacity-0' : 'w-auto opacity-100'}`}>
            <img 
              src="https://ik.imagekit.io/38cojzdyt/PASM/PASM%20SOMENTE%20SIMBOLO.png?updatedAt=1778244864032" 
              alt="PASM Logo" 
              className="h-8 w-8 object-contain"
            />
            <span className="text-xl font-bold tracking-tight text-slate-800">PASM</span>
          </div>
          
          <button 
            onClick={() => {
              setIsCollapsed(!isCollapsed);
              if (!isCollapsed) setOpenDropdowns({}); // Fecha dropdowns ao recolher
            }}
            className="hidden rounded-lg p-1.5 text-slate-400 hover:bg-slate-100 hover:text-slate-600 lg:block"
          >
            <Menu className="h-5 w-5" />
          </button>

          <button 
            onClick={() => setIsMobileOpen(false)}
            className="block rounded-lg p-1.5 text-slate-400 hover:bg-slate-100 hover:text-slate-600 lg:hidden"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Navegação */}
        <div className="flex-1 overflow-y-auto overflow-x-hidden py-6 custom-scrollbar">
          <nav className="flex flex-col gap-2 px-4">
            {menuItems.map((item) => {
              const Icon = item.icon;
              const isOpen = openDropdowns[item.title];
              
              return (
                <div key={item.title} className="flex flex-col">
                  <button
                    onClick={() => toggleDropdown(item.title)}
                    className={`flex items-center justify-between rounded-xl px-3 py-3 text-sm font-medium transition-colors ${
                      isOpen ? 'bg-blue-50 text-blue-700' : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <Icon className={`h-5 w-5 ${isOpen ? 'text-blue-600' : 'text-slate-400'}`} />
                      {!isCollapsed && <span>{item.title}</span>}
                    </div>
                    {!isCollapsed && (
                      <ChevronDown className={`h-4 w-4 transition-transform ${isOpen ? 'rotate-180 text-blue-600' : 'text-slate-400'}`} />
                    )}
                  </button>

                  {/* Dropdown Itens */}
                  {!isCollapsed && isOpen && (
                    <div className="mt-1 flex flex-col gap-1 pl-11 pr-3">
                      {item.subItems.map((sub) => {
                        const isActive = pathname === sub.href;
                        return (
                          <Link 
                            key={sub.name} 
                            href={sub.href}
                            className={`flex items-center gap-2 rounded-lg px-3 py-2 text-sm transition-colors ${
                              isActive 
                                ? 'bg-blue-600 text-white font-semibold shadow-md shadow-blue-500/20' 
                                : 'text-slate-500 hover:bg-slate-100 hover:text-slate-900'
                            }`}
                          >
                            {isActive && <div className="h-1.5 w-1.5 rounded-full bg-white" />}
                            {sub.name}
                          </Link>
                        );
                      })}
                    </div>
                  )}
                </div>
              );
            })}

            <div className="my-4 h-px w-full bg-slate-100" />

            {/* Links Diretos */}
            <Link href="/dashboard/perfil" className="flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-medium text-slate-600 transition-colors hover:bg-slate-50 hover:text-slate-900">
              <UserCircle className="h-5 w-5 text-slate-400" />
              {!isCollapsed && <span>Meu Perfil</span>}
            </Link>

            <Link href="/dashboard/configuracoes" className="flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-medium text-slate-600 transition-colors hover:bg-slate-50 hover:text-slate-900">
              <Settings className="h-5 w-5 text-slate-400" />
              {!isCollapsed && <span>Configurações</span>}
            </Link>
          </nav>
        </div>

        {/* Footer da Sidebar - Perfil Rápido e Logout */}
        <div className="border-t border-slate-100 p-4">
          <div className={`flex items-center gap-3 rounded-xl p-3 transition-colors ${isCollapsed ? 'justify-center' : 'hover:bg-slate-50'}`}>
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 text-white shadow-md">
              <span className="font-bold">KA</span>
            </div>
            
            {!isCollapsed && (
              <div className="flex flex-1 flex-col overflow-hidden">
                <span className="truncate text-sm font-bold text-slate-900">Kauã Alves</span>
                <span className="truncate text-xs text-slate-500">kaua@pasm.com.br</span>
              </div>
            )}
            
            {!isCollapsed && (
              <Link href="/" className="rounded-lg p-2 text-slate-400 hover:bg-red-50 hover:text-red-600 transition-colors">
                <LogOut className="h-5 w-5" />
              </Link>
            )}
          </div>
        </div>
      </aside>
    </>
  );
}