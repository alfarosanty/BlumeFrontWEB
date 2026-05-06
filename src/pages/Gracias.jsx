import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import { ArrowLeft, ArrowRight } from 'lucide-react';

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
          El presupuesto ha sido enviado a nuestra administración para su validación.
        </p>

        <div className="flex flex-col items-center gap-2 mt-12">
          {/* Botón Principal */}
          <Link 
            to="/mis-presupuestos" 
            className="w-full max-w-xs bg-stone-900 text-white py-5 text-[11px] uppercase tracking-[0.3em] font-bold hover:bg-stone-800 transition-all duration-500 text-center"
          >
            Ver mis presupuestos
          </Link>
          
          {/* Link Secundario - Siempre debajo y centrado */}
          <Link 
            to="/" 
            className="group flex items-center justify-center gap-2 text-stone-400 hover:text-stone-900 transition-colors text-[9px] md:text-[10px] uppercase tracking-[0.2em] font-medium py-2"
          >
          <ArrowLeft size={12} className="group-hover:translate-x-1 transition-transform" />
            Volver al catálogo 
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Gracias;