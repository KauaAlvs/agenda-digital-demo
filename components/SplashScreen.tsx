'use client';

import { useEffect, useState } from 'react';
import { Loader2 } from 'lucide-react';

export default function SplashScreen({ children }: { children: React.ReactNode }) {
  const [isLoading, setIsLoading] = useState(true);
  const [isFading, setIsFading] = useState(false);

  useEffect(() => {
    // Verifica se o usuário já viu a splash screen nesta sessão
    const hasSeenSplash = sessionStorage.getItem('pasm_splash_seen');

    if (hasSeenSplash) {
      setIsLoading(false);
      return;
    }

    const timer = setTimeout(() => {
      setIsFading(true);
      setTimeout(() => {
        setIsLoading(false);
        sessionStorage.setItem('pasm_splash_seen', 'true');
      }, 700); 
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  if (!isLoading) return <>{children}</>;

  return (
    <>
      <div className="hidden">{children}</div>
      
      <div 
        className={`fixed inset-0 z-[100] flex flex-col items-center justify-center bg-gradient-to-br from-slate-900 via-slate-800 to-black text-white transition-opacity duration-700 ease-in-out ${
          isFading ? 'opacity-0' : 'opacity-100'
        }`}
      >
        <div className="flex flex-col items-center space-y-8">
          <div className="relative flex items-center justify-center">
            <div className="absolute h-32 w-32 rounded-full bg-blue-500/20 blur-2xl"></div>
            <img 
              src="https://ik.imagekit.io/38cojzdyt/PASM/PASM%20SOMENTE%20SIMBOLO.png?updatedAt=1778244864032" 
              alt="Símbolo PASM" 
              className="relative z-10 h-28 w-28 object-contain animate-pulse drop-shadow-2xl"
            />
          </div>
          
          <div className="flex flex-col items-center space-y-3">
            <h1 className="text-xl font-medium tracking-widest text-slate-200">PASM</h1>
            <p className="text-xs font-light text-slate-400 uppercase tracking-widest">Carregando Experiência...</p>
          </div>

          <Loader2 className="h-6 w-6 animate-spin text-blue-500/70" />
        </div>
      </div>
    </>
  );
}