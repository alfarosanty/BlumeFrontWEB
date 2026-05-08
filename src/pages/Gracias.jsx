import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

const Gracias = () => {
  const location = useLocation();
  const presupuestoId = location.state?.id || "---";

  return (
    <div className="min-h-screen bg-[#faf9f6] flex flex-col items-center justify-center px-4 pt-20">
      <div className="max-w-lg w-full text-center">
        
        {/* Detalle visual superior */}
        <span className="text-[10px] uppercase tracking-[0.4em] text-stone-400 mb-8 block font-bold">
          Confirmación de registro
        </span>
        
        <h1 className="text-5xl md:text-6xl font-serif font-bold text-stone-900 mb-6 italic leading-tight">
          Gracias <br /> por tu pedido.
        </h1>
        
        <div className="h-px w-12 bg-stone-300 mx-auto mb-8" />

        <div className="max-w-xs mx-auto mb-12">
          <p className="text-xs text-stone-500 uppercase tracking-widest leading-relaxed mb-4">
            El presupuesto ha sido enviado a nuestra administración para su validación.
          </p>
          
          {/* Mensaje de Spam con estética minimalista */}
          <p className="text-[9px] text-stone-400 uppercase tracking-[0.2em] leading-relaxed italic">
            Te enviamos un correo con el detalle. <br /> 
            Si no lo ves, por favor <span className="font-bold">revisá tu carpeta de spam</span>.
          </p>
        </div>

        <div className="flex flex-col items-center gap-2">
          {/* Botón Principal */}
          <Link 
            to="/mis-presupuestos" 
            className="w-full max-w-xs bg-stone-900 text-white py-5 text-[11px] uppercase tracking-[0.3em] font-bold hover:bg-stone-800 transition-all duration-500 text-center"
          >
            Ver mis presupuestos
          </Link>
          
          {/* Link Secundario */}
          <Link 
            to="/" 
            className="group flex items-center justify-center gap-2 text-stone-400 hover:text-stone-900 transition-colors text-[9px] md:text-[10px] uppercase tracking-[0.2em] font-medium py-4"
          >
            <ArrowLeft size={12} className="group-hover:-translate-x-1 transition-transform" />
            Volver al catálogo 
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Gracias;