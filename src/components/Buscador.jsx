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
      <div className="flex items-center justify-end relative" ref={containerRef}>
        {/* Contenedor del Input */}
        <div className={`flex items-center transition-all duration-500 ease-in-out border-b ${
          isOpen 
            ? 'fixed inset-x-0 top-0 h-16 px-4 bg-white z-60 border-stone-200 sm:relative sm:inset-auto sm:h-9 sm:px-0 sm:w-64 md:w-80 sm:border-stone-300 sm:bg-transparent' 
            : 'w-10 border-transparent'
        }`}>
          <button 
            onClick={() => setIsOpen(true)}
            className={`p-2 transition-colors cursor-pointer shrink-0 ${isOpen ? 'text-stone-300' : 'text-stone-400 hover:text-stone-900'}`}
          >
            <Search size={18} strokeWidth={1.5} />
          </button>

          <input
            type="text"
            placeholder="BUSCAR..."
            value={query}
            autoFocus={isOpen}
            onChange={(e) => setQuery(e.target.value)}
            className={`bg-transparent outline-none text-[10px] tracking-[0.25em] uppercase font-light transition-all duration-500 ${
              isOpen ? 'opacity-100 w-full ml-2' : 'opacity-0 w-0'
            }`}
          />

          {isOpen && (
            <button 
              onClick={() => {setIsOpen(false); setQuery('');}}
              className="p-2 ml-auto hover:rotate-90 transition-transform duration-300 cursor-pointer"
            >
              <X size={16} strokeWidth={1} className="text-stone-400" />
            </button>
          )}
        </div>

        {/* RESULTADOS: Alineados justo debajo del input en PC */}
        {isOpen && query.length > 2 && (
          <div className="fixed inset-0 top-16 bg-white z-50 sm:absolute sm:top-full sm:right-0 sm:inset-auto sm:w-100 sm:mt-2 sm:shadow-2xl sm:border sm:border-stone-100 overflow-hidden animate-in fade-in slide-in-from-top-1">
            <div className="h-full sm:max-h-112.5 overflow-y-auto no-scrollbar">
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
                      className="flex items-center gap-4 p-4 hover:bg-stone-50 cursor-pointer transition-all border-b border-stone-50 last:border-0 group"
                    >
                      <div className="w-12 h-16 bg-stone-100 overflow-hidden shrink-0 shadow-sm">
                        <img 
                          src={art.url_foto || '/placeholder.png'} 
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" 
                          alt={art.descripcion}
                        />
                      </div>

                      <div className="flex flex-col flex-1 min-w-0">
                        <span className="text-[7px] font-bold text-stone-300 uppercase tracking-[0.15em]">
                          REF. {art.codigo}
                        </span>
                        <h4 className="text-[10px] font-medium text-stone-800 uppercase tracking-widest truncate">
                          {art.descripcion}
                        </h4>
                        <p className="text-[11px] font-light text-stone-900 mt-0.5">
                          ${art.precio?.toLocaleString('es-AR')}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="p-8 text-center text-stone-300 text-[9px] uppercase tracking-[0.3em] italic font-light">
                  Sin coincidencias
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    );
};

export default Buscador;