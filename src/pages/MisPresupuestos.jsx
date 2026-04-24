import React, { useEffect, useState } from 'react';
import { presupuestoService } from '../services/presupuestoService';
import { Plus, ArrowRight } from 'lucide-react';

const MisPresupuestos = () => {
  const [presupuestos, setPresupuestos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        const data = await presupuestoService.getMisPresupuestos();
        setPresupuestos(data);
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, []);

  if (loading) return (
    <div className="flex h-screen items-center justify-center">
      <span className="text-[10px] uppercase tracking-[0.3em] text-stone-400 animate-pulse">Cargando archivo...</span>
    </div>
  );

  return (
    <div className="bg-white min-h-screen">
      <div className="max-w-7xl mx-auto px-6 py-16">
        {/* Header Estilo Editorial */}
        <header className="flex flex-col md:flex-row md:items-end justify-between mb-16 border-b border-stone-100 pb-8">
          <div>
            <h1 className="text-4xl font-serif text-stone-900 tracking-tighter mb-2">Mis Pedidos</h1>
            <p className="text-[11px] uppercase tracking-[0.2em] text-stone-400">Historial de consultas y presupuestos</p>
          </div>
          <div className="mt-8 md:mt-0">
            <span className="text-[10px] font-bold text-stone-800">{presupuestos.length} ARTÍCULOS EN TOTAL</span>
          </div>
        </header>

        {/* Tabla de Presupuestos (Minimalista) */}
        <div className="w-full">
          {/* Header de Tabla */}
          <div className="hidden md:grid grid-cols-5 border-b border-stone-200 pb-4 mb-4">
            <span className="text-[10px] font-bold tracking-widest text-stone-400 uppercase">Referencia</span>
            <span className="text-[10px] font-bold tracking-widest text-stone-400 uppercase">Fecha</span>
            <span className="text-[10px] font-bold tracking-widest text-stone-400 uppercase">Estado</span>
            <span className="text-[10px] font-bold tracking-widest text-stone-400 uppercase text-right">Total</span>
            <span className="text-[10px] font-bold tracking-widest text-stone-400 uppercase text-right">Detalle</span>
          </div>

          {/* Lista */}
          <div className="divide-y divide-stone-100">
            {presupuestos.map((p) => (
              <div 
                key={p.id} 
                className="grid grid-cols-2 md:grid-cols-5 py-8 items-center hover:bg-stone-50 transition-colors duration-300 px-2"
              >
                {/* Referencia */}
                <div className="flex flex-col">
                  <span className="text-lg font-serif text-stone-900 italic">#{p.id.toString().padStart(5, '0')}</span>
                  <span className="md:hidden text-[9px] text-stone-400 uppercase tracking-widest mt-1">
                    {new Date(p.fecha).toLocaleDateString('es-AR')}
                  </span>
                </div>

                {/* Fecha Desktop */}
                <span className="hidden md:block text-[12px] text-stone-600 font-light">
                  {new Date(p.fecha).toLocaleDateString('es-AR')}
                </span>

                {/* Estado */}
                <div className="flex justify-end md:justify-start">
                   <span className="text-[10px] tracking-[0.15em] font-medium border border-stone-800 px-3 py-1 uppercase">
                    {p.estado}
                  </span>
                </div>

                {/* Total */}
                <span className="hidden md:block text-right text-sm font-medium text-stone-900">
                  ${p.total.toLocaleString('es-AR', { minimumFractionDigits: 2 })}
                </span>

                {/* Acción */}
                <div className="flex justify-end col-span-2 md:col-span-1 mt-4 md:mt-0">
                  <button className="flex items-center gap-2 group">
                    <span className="text-[10px] font-bold uppercase tracking-widest border-b border-transparent group-hover:border-stone-800 transition-all">
                      Ver más
                    </span>
                    <ArrowRight size={14} className="text-stone-400 group-hover:text-stone-900 group-hover:translate-x-1 transition-all" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MisPresupuestos;