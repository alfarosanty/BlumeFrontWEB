import React from 'react';
import { useAuth } from '../context/AuthContext';
import { Clock, LogOut } from 'lucide-react';

const EsperaConfirmacion = () => {
  const { logout, user } = useAuth();

  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center px-6">
      <div className="max-w-md w-full text-center space-y-8">
        
        {/* Icono sutil */}
        <div className="flex justify-center">
          <div className="p-4 bg-stone-50 rounded-full">
            <Clock size={40} strokeWidth={1} className="text-stone-400" />
          </div>
        </div>

        {/* Texto Principal */}
        <div className="space-y-4">
          <h1 className="text-2xl md:text-3xl font-serif font-light text-stone-900 tracking-tight">
            Hola, {user?.username}.
          </h1>
          <p className="text-stone-500 text-sm md:text-base leading-relaxed font-light italic">
            Tu cuenta ha sido creada con éxito. Para proteger la información de <span className="font-bold text-stone-800 tracking-widest">BLUME</span>, un administrador debe validar tu acceso manualmente.
          </p>
        </div>

        {/* Separador sutil estilo Zara */}
        <div className="w-12 h-px bg-stone-200 mx-auto"></div>

        {/* Estado */}
        <div className="space-y-2">
          <p className="text-[10px] uppercase tracking-[0.3em] text-stone-400 font-bold">
            Estado de solicitud
          </p>
          <span className="inline-block px-4 py-1 rounded-full border border-stone-200 text-stone-600 text-xs font-medium uppercase tracking-wider">
            Pendiente de revisión
          </span>
        </div>

        {/* Acción para salir */}
        <div className="pt-10">
          <button 
            onClick={logout}
            className="group flex items-center justify-center gap-2 mx-auto text-stone-400 hover:text-black transition-colors"
          >
            <LogOut size={16} strokeWidth={1.5} className="group-hover:-translate-x-1 transition-transform" />
            <span className="text-[10px] font-bold uppercase tracking-[0.2em] cursor-pointer">
              Cerrar Sesión
            </span>
          </button>
        </div>
      </div>

      {/* Footer minimalista */}
      <footer className="absolute bottom-10">
        <p className="text-[9px] text-stone-300 uppercase tracking-[0.5em]">
          MAF &copy; {new Date().getFullYear()}
        </p>
      </footer>
    </div>
  );
};

export default EsperaConfirmacion;