import React, { useEffect, useState } from 'react';
import { presupuestoService } from '../services/presupuestoService';
import { Plus, ArrowRight, ShoppingBag } from 'lucide-react';
import { Link } from 'react-router-dom';

const MisPresupuestos = () => {
  const [presupuestos, setPresupuestos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        const data = await presupuestoService.getMisPresupuestos();
        // Aseguramos que data sea un array por si el service devuelve null o algo raro
        setPresupuestos(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error("Error al cargar pedidos:", error);
        setPresupuestos([]); // Evita que .map falle
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, []);

  if (loading) return (
    <div className="h-screen w-full bg-[#faf9f6] flex flex-col justify-center items-center space-y-4">
          <div className="w-8 h-8 border-4 border-stone-200 border-t-orange-500 rounded-full animate-spin"></div>
          <p className="text-stone-400 text-[10px] uppercase tracking-[0.2em] font-bold">
            Explorando Blume...
          </p>
        </div>
  );

  return (
    <div className="bg-white min-h-screen">
      <div className="max-w-7xl mx-auto px-6 py-16">
        
        {/* Header Estilo Editorial */}
        <header className="flex flex-col md:flex-row md:items-end justify-between mb-16 border-b border-stone-100 pb-10">
          <div>
            <h1 className="text-5xl font-serif text-stone-900 tracking-tighter mb-4 italic">Mis Pedidos</h1>
            <p className="text-[10px] uppercase tracking-[0.3em] text-stone-400 font-bold">Registro histórico de actividad</p>
          </div>
          <div className="mt-8 md:mt-0 flex flex-col items-end">
            <span className="text-[10px] font-bold text-stone-300 uppercase tracking-widest mb-1 italic">Resumen</span>
            <span className="text-xs font-mono text-stone-900 font-bold">{presupuestos.length} ARCHIVOS REGISTRADOS</span>
          </div>
        </header>

        {/* Caso: No hay presupuestos */}
        {presupuestos.length === 0 ? (
          <div className="py-20 text-center border border-dashed border-stone-200">
            <p className="text-[11px] uppercase tracking-widest text-stone-400 mb-6">No se han encontrado registros</p>
            <Link to="/" className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest border-b border-stone-900 pb-1 hover:text-stone-500 hover:border-stone-500 transition-all">
              Explorar colección <ArrowRight size={14} />
            </Link>
          </div>
        ) : (
          <div className="w-full overflow-x-auto">
            {/* Header de Tabla */}
            <div className="hidden md:grid grid-cols-5 border-b border-stone-900 pb-6 mb-2">
              <span className="text-[10px] font-bold tracking-[0.3em] text-stone-900 uppercase">Referencia</span>
              <span className="text-[10px] font-bold tracking-[0.3em] text-stone-900 uppercase">Fecha Registro</span>
              <span className="text-[10px] font-bold tracking-[0.3em] text-stone-900 uppercase text-center">Estado</span>
              <span className="text-[10px] font-bold tracking-[0.3em] text-stone-900 uppercase text-right">Monto Total</span>
              <span className="text-[10px] font-bold tracking-[0.3em] text-stone-900 uppercase text-right">Acción</span>
            </div>

            {/* Lista */}
            <div className="divide-y divide-stone-100">
              {presupuestos.map((p) => (
                <div 
                  key={p.id} 
                  className="grid grid-cols-2 md:grid-cols-5 py-10 items-center hover:bg-[#fafafa] transition-all duration-500 px-2 group"
                >
                  {/* Referencia */}
                  <div className="flex flex-col">
                    <span className="text-xl font-serif text-stone-900 group-hover:italic transition-all cursor-default">
                      #{String(p.id).padStart(5, '0')}
                    </span>
                    <span className="text-[9px] text-stone-400 uppercase tracking-widest mt-1 cursor-default">
                      Ref. Interna
                    </span>
                  </div>

                  {/* Fecha */}
                  <span className="hidden md:block text-[11px] text-stone-500 font-mono tracking-tighter cursor-default">
                    {p.fecha_creacion ? new Date(p.fecha_creacion).toLocaleDateString('es-AR', {
                      day: '2-digit',
                      month: '2-digit',
                      year: 'numeric'
                    }).replace(/\//g, ' . ') : '—'}
                  </span>

                  {/* Estado */}
                  <div className="flex justify-end md:justify-center">
                    <span className="text-[9px] tracking-[0.2em] font-bold border border-stone-200 px-4 py-1.5 uppercase bg-white group-hover:border-stone-900 transition-colors cursor-default">
                      {p.estado}
                    </span>
                  </div>

                  {/* Total */}
                  <span className="hidden md:block text-right text-[13px] font-bold text-stone-900 font-mono cursor-default">
                    ${(p.total || 0).toLocaleString('es-AR', { minimumFractionDigits: 2 })}
                  </span>

                  {/* Acción */}
                  <div className="flex justify-end col-span-2 md:col-span-1 mt-6 md:mt-0">
                    <Link 
                      to={`/presupuesto/${p.id}`}
                      className="flex items-center gap-2 group/btn"
                    >
                      <span className="text-[10px] font-bold uppercase tracking-[0.2em] border-b border-transparent group-hover/btn:border-stone-900 transition-all">
                        Expediente
                      </span>
                      <ArrowRight size={12} className="text-stone-300 group-hover/btn:text-stone-900 group-hover/btn:translate-x-1 transition-all" />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
      
      {/* Footer MAF sutil */}
      <footer className="py-20 text-center opacity-20">
         <span className="text-[9px] uppercase tracking-[0.5em] font-bold">MAF — {new Date().getFullYear()}</span>
      </footer>
    </div>
  );
};

export default MisPresupuestos;