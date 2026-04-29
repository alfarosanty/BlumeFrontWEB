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
          <div className="w-8 h-8 border-4 border-stone-200 border-t-[#be9e70] rounded-full animate-spin"></div>
          <p className="text-stone-400 text-[10px] uppercase tracking-[0.2em] font-bold">
            Explorando Blume...
          </p>
        </div>
  );

  return (
    <div className="bg-[#faf9f6] min-h-screen pt-24 md:pt-32 pb-12">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        
        {/* Header Estilo Editorial */}
        <header className="flex flex-col md:flex-row md:items-end justify-between mb-12 md:mb-20 border-b border-stone-200 pb-10">
          <div>
            <h1 className="text-4xl md:text-6xl font-serif text-stone-900 tracking-tighter mb-4 italic">Archivo de Pedidos</h1>
            <p className="text-[10px] md:text-[11px] uppercase tracking-[0.4em] text-stone-400 font-medium">Registro histórico / Cliente</p>
          </div>
          <div className="mt-8 md:mt-0 flex flex-col items-start md:items-end">
            <span className="text-[10px] font-bold text-stone-300 uppercase tracking-widest mb-1 italic">Resumen</span>
            <span className="text-xs font-mono text-stone-900 font-bold">{presupuestos.length} DOCUMENTOS</span>
          </div>
        </header>

        {presupuestos.length === 0 ? (
          <div className="py-24 text-center border border-dashed border-stone-200 bg-white/50">
            <p className="text-[11px] uppercase tracking-[0.3em] text-stone-400 mb-8">Sin registros activos</p>
            <Link to="/" className="inline-flex items-center gap-3 text-[10px] font-bold uppercase tracking-[0.3em] bg-black text-white px-8 py-4 hover:bg-stone-800 transition-all">
              Nueva Orden <Plus size={14} />
            </Link>
          </div>
        ) : (
          <div className="w-full">
            {/* Header de Tabla (Solo Desktop) */}
            <div className="hidden md:grid grid-cols-5 border-b border-stone-900 pb-6 mb-4 px-4">
              <span className="text-[10px] font-bold tracking-[0.3em] text-stone-900 uppercase">Referencia</span>
              <span className="text-[10px] font-bold tracking-[0.3em] text-stone-900 uppercase">Fecha</span>
              <span className="text-[10px] font-bold tracking-[0.3em] text-stone-900 uppercase text-center">Estado</span>
              <span className="text-[10px] font-bold tracking-[0.3em] text-stone-900 uppercase text-right">Total</span>
              <span className="text-[10px] font-bold tracking-[0.3em] text-stone-900 uppercase text-right">Detalle</span>
            </div>

            {/* Lista de Presupuestos */}
            <div className="space-y-0 md:divide-y md:divide-stone-100">
              {presupuestos.map((p) => (
                <div 
                  key={p.id} 
                  className="py-8 md:py-10 border-b border-stone-200 md:border-stone-100 md:grid md:grid-cols-5 items-center hover:bg-white transition-all duration-500 md:px-4 group"
                >
                  {/* HEADER MOBILE: ID y Estado en la misma línea */}
                  <div className="flex justify-between items-start mb-6 md:mb-0 md:contents">
                    
                    {/* Referencia - ID */}
                    <div className="flex flex-col">
                      <span className="text-[8px] md:hidden text-stone-400 uppercase tracking-[0.2em] mb-1">Referencia</span>
                      <span className="text-xl md:text-xl font-serif text-stone-900 group-hover:italic transition-all">
                        #{String(p.numero_presupuesto_cliente).padStart(5, '0')}
                      </span>
                    </div>

                    {/* Estado (Mobile queda a la derecha, Desktop en su columna) */}
                    <div className="md:hidden">
                      <span className="text-[9px] tracking-[0.2em] font-bold border border-stone-900 text-stone-900 px-3 py-1 uppercase">
                        {p.estado}
                      </span>
                    </div>
                  </div>

                  {/* Fecha (Oculta label en Desktop) */}
                  <div className="flex flex-col mb-4 md:mb-0">
                    <span className="text-[8px] md:hidden text-stone-400 uppercase tracking-[0.2em] mb-1">Fecha de Solicitud</span>
                    <span className="text-[11px] text-stone-600 font-mono tracking-tighter">
                      {p.fecha_creacion ? new Date(p.fecha_creacion).toLocaleDateString('es-AR', {
                        day: '2-digit', month: '2-digit', year: 'numeric'
                      }).replace(/\//g, ' . ') : '—'}
                    </span>
                  </div>

                  {/* Estado (Solo Desktop) */}
                  <div className="hidden md:flex md:justify-center">
                    <span className="text-[9px] tracking-[0.2em] font-bold border border-stone-900 text-stone-900 px-4 py-1.5 uppercase transition-all duration-300 md:group-hover:bg-stone-900 md:group-hover:text-white cursor-default">
                      {p.estado}
                    </span>
                  </div>

                  {/* Total */}
                  <div className="flex justify-between items-end mb-8 md:mb-0 md:block md:text-right">
                    <div className="flex flex-col md:block">
                      <span className="text-[8px] md:hidden text-stone-400 uppercase tracking-[0.2em] mb-1">Monto Neto</span>
                      <span className="text-lg md:text-[13px] font-bold text-stone-900 font-mono">
                        ${(p.total || 0).toLocaleString('es-AR', { minimumFractionDigits: 2 })}
                      </span>
                    </div>
                    
                    {/* Flecha indicadora solo mobile para invitar al click */}
                    <Link to={`/presupuesto/${p.id}`} className="md:hidden text-stone-900">
                      <ArrowRight size={20} strokeWidth={1} />
                    </Link>
                  </div>

                  {/* Acción (Desktop) */}
                  <div className="hidden md:flex justify-end">
                    <Link 
                      to={`/presupuesto/${p.id}`}
                      className="flex items-center gap-3 group/btn text-stone-900"
                    >
                      <span className="text-[10px] font-bold uppercase tracking-[0.3em] border-b border-transparent group-hover/btn:border-stone-900 transition-all">
                        Ver Expediente
                      </span>
                      <ArrowRight size={14} className="text-stone-300 group-hover/btn:text-stone-900 group-hover/btn:translate-x-1 transition-all" />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Footer Branding MAF */}
      <footer className="mt-32 py-10 border-t border-stone-100 mx-12 flex flex-col md:flex-row justify-between items-center gap-4">
        <span className="text-[8px] uppercase tracking-[0.6em] text-stone-400 font-bold">Francisco Mosquera Alfaro</span>
        <div className="flex gap-8">
           <span className="text-[8px] uppercase tracking-[0.3em] text-stone-300">MAF System v1.0</span>
           <span className="text-[8px] uppercase tracking-[0.3em] text-stone-300">©{new Date().getFullYear()}</span>
        </div>
      </footer>
    </div>
  );
};

export default MisPresupuestos;