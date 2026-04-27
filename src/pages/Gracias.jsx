import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

const Gracias = () => {
  const location = useLocation();
  const presupuestoId = location.state?.id || "---";

  return (
    <div className="min-h-screen bg-[#faf9f6] flex flex-col items-center justify-center px-4 pt-20">
      <div className="max-w-lg w-full text-center">
        
        {/* Un detalle visual mínimo en lugar del icono verde */}
        <span className="text-[10px] uppercase tracking-[0.4em] text-stone-400 mb-8 block font-bold">
          Confirmación de registro
        </span>
        
        <h1 className="text-5xl md:text-6xl font-serif font-bold text-stone-900 mb-6 italic leading-tight">
          Gracias <br /> por tu pedido.
        </h1>
        
        <div className="h-px w-12 bg-stone-300 mx-auto mb-8" />

        <p className="text-xs text-stone-500 uppercase tracking-widest leading-relaxed mb-12 max-w-xs mx-auto">
          El presupuesto <span className="text-stone-950 font-bold">#{presupuestoId}</span> ha sido enviado a nuestra administración para su validación.
        </p>

        <div className="flex flex-col gap-4 items-center">
          <Link 
            to="/mis-presupuestos" 
            className="w-full max-w-xs bg-stone-900 text-white py-5 text-[11px] uppercase tracking-[0.3em] font-bold hover:bg-stone-800 transition-all duration-500"
          >
            Ver mis presupuestos
          </Link>
          
          <Link 
            to="/" 
            className="group flex items-center justify-center gap-2 text-stone-400 hover:text-stone-900 transition-colors text-[10px] uppercase tracking-[0.2em] font-bold py-4"
          >
            Volver al catálogo 
            <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>

      {/* Footer minimalista de la página de confirmación */}
      <div className="absolute bottom-12 text-[9px] text-stone-300 uppercase tracking-[0.3em]">
        Blume Web — {new Date().getFullYear()}
      </div>
    </div>
  );
};

export default Gracias;