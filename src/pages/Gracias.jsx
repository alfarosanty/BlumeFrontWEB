import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import { CheckCircle, ArrowRight, FileText } from 'lucide-react';

const Gracias = () => {
  const location = useLocation();
  const presupuestoId = location.state?.id || "N/A";

  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center px-4">
      <div className="bg-white p-10 rounded-3xl shadow-sm border border-stone-100 text-center max-w-md">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-green-50 rounded-full mb-6">
          <CheckCircle className="text-green-500" size={32} />
        </div>
        
        <h1 className="text-2xl font-bold text-stone-800 mb-2">¡Presupuesto Enviado!</h1>
        <p className="text-stone-500 mb-8">
          El presupuesto <span className="font-mono font-bold text-stone-700">#{presupuestoId}</span> ha sido registrado con éxito en el sistema.
        </p>

        <div className="space-y-3">
          <Link 
            to="/mis-presupuestos" 
            className="flex items-center justify-center w-full bg-stone-900 text-white py-4 rounded-2xl hover:bg-stone-800 transition-all font-medium"
          >
            <FileText size={18} className="mr-2" /> Ver mis presupuestos
          </Link>
          
          <Link 
            to="/" 
            className="flex items-center justify-center w-full text-stone-500 py-4 hover:text-stone-800 transition-all text-sm"
          >
            Volver al inicio <ArrowRight size={16} className="ml-1" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Gracias;