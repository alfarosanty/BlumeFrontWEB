import React, { useState, useEffect, useRef } from 'react';
import { Search, X, Loader2 } from 'lucide-react';
import { ArticuloService } from '../services/ArticuloService';
import { useNavigate } from 'react-router-dom';

const Buscador = ({ onToggle }) => { // 1. Recibimos la prop onToggle
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [resultados, setResultados] = useState([]);
  const [loading, setLoading] = useState(false);
  const containerRef = useRef(null);
  const navigate = useNavigate();

  // Avisar al Navbar cuando cambia el estado
  useEffect(() => {
    if (onToggle) onToggle(isOpen);
  }, [isOpen, onToggle]);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        setIsOpen(false);
        setQuery('');
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    const timer = setTimeout(async () => {
      if (query.trim().length > 2) {
        setLoading(true);
        try {
          const data = await ArticuloService.getSugerencias(query);
          setResultados(data);
        } catch (err) {
          setResultados([]);
        } finally {
          setLoading(false);
        }
      } else {
        setResultados([]);
      }
    }, 300);
    return () => clearTimeout(timer);
  }, [query]);

  return (
    <div className="flex items-center relative" ref={containerRef}>
      {/* Contenedor del Input: Ajustamos anchos dinámicos */}
      <div className={`flex items-center transition-all duration-500 ease-in-out border-b ${
        isOpen 
          ? 'w-[70vw] sm:w-80 border-stone-300' // 70vw en móvil para que no choque con el carrito
          : 'w-10 border-transparent'
      }`}>
        <button 
          onClick={() => setIsOpen(true)}
          className={`p-2 transition-colors cursor-pointer shrink-0 ${isOpen ? 'text-stone-300' : 'text-stone-400 hover:text-[#4a3728]'}`}
        >
          <Search size={20} strokeWidth={1.5} />
        </button>

        <input
          type="text"
          placeholder="BUSCAR..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className={`bg-transparent outline-none text-[10px] tracking-[0.25em] uppercase font-light transition-all duration-500 ${
            isOpen ? 'opacity-100 w-full ml-2' : 'opacity-0 w-0'
          }`}
        />

        {isOpen && (
          <button 
            onClick={() => {setIsOpen(false); setQuery('');}}
            className="p-1 hover:rotate-90 transition-transform duration-300 cursor-pointer"
          >
            <X size={14} className="text-stone-300" />
          </button>
        )}
      </div>

      {/* RESULTADOS: El cambio clave está en el ancho (w-[90vw]) */}
      {isOpen && query.length > 2 && (
        <div className="absolute top-12 right-0 w-[90vw] sm:w-112.5 bg-white shadow-2xl border border-stone-100 z-50 overflow-hidden animate-in fade-in slide-in-from-top-2">
          <div className="max-h-[70vh] sm:max-h-112.5 overflow-y-auto">
            {loading ? (
              <div className="p-12 flex justify-center"><Loader2 className="animate-spin text-stone-200" strokeWidth={1} /></div>
            ) : resultados.length > 0 ? (
              <div className="flex flex-col">
                {resultados.map((art) => (
                  <div 
                    key={art.id}
                    onClick={() => { 
                      navigate(`/articulo/${art.id}`); 
                      setIsOpen(false); 
                      setQuery('');
                    }}
                    className="flex items-center gap-4 sm:gap-6 p-4 sm:p-5 hover:bg-stone-50 cursor-pointer transition-all border-b border-stone-50 last:border-0 group"
                  >
                    {/* Imagen Vertical: Un poco más chica en móvil */}
                    <div className="w-12 h-16 sm:w-16 sm:h-20 bg-stone-100 overflow-hidden shrink-0 shadow-sm transition-transform duration-500 group-hover:scale-105">
                      <img 
                        src={art.url_foto || '/placeholder.png'} 
                        className="w-full h-full object-cover" 
                        alt={art.descripcion}
                      />
                    </div>

                    {/* Información: Truncado prolijo */}
                    <div className="flex flex-col flex-1 min-w-0">
                      <span className="text-[7px] sm:text-[8px] font-bold text-stone-300 uppercase tracking-[0.2em] mb-1">
                        REF. {art.codigo}
                      </span>
                      
                      <h4 className="text-[10px] sm:text-[11px] font-medium text-stone-800 uppercase tracking-widest leading-tight sm:leading-relaxed truncate group-hover:text-[#4a3728]">
                        {art.descripcion}
                      </h4>
                      
                      <p className="text-[11px] sm:text-[12px] font-light text-stone-900 mt-1 sm:mt-2 tracking-tighter italic">
                        {art.precio ? (
                          <>
                            <span className="text-[8px] sm:text-[9px] mr-1 not-italic opacity-50">ARS</span>
                            {art.precio.toLocaleString('es-AR')}
                          </>
                        ) : (
                          <span className="text-[8px] sm:text-[9px] uppercase tracking-widest text-stone-400">Consultar</span>
                        )}
                      </p>
                    </div>

                    {/* Flecha: La sacamos en móviles para ganar espacio */}
                    <div className="hidden sm:block opacity-0 group-hover:opacity-100 transition-all duration-300 translate-x-2 group-hover:translate-x-0 pr-2">
                      <span className="text-stone-300 font-light text-xl">→</span>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="p-10 text-center text-stone-300 text-[10px] uppercase tracking-[0.3em] italic">
                Sin resultados
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Buscador;