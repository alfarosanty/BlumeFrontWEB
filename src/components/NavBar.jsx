import React, { useState, useEffect } from 'react';
import UserMenu from './UserMenu';
import Buscador from './Buscador';
import { Link } from 'react-router-dom';
import { ShoppingCart, User, Menu, X, ChevronDown } from 'lucide-react'; 
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { SectorService } from '../services/SectorService';
import { FamiliaService } from '../services/FamiliaService';


const Navbar = () => {
  const { user, isAuthenticated } = useAuth();
  const { totalItems, openCart } = useCart();
  const [animate, setAnimate] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [openCatId, setOpenCatId] = useState(null);
  const [categorias, setCategorias] = useState([]);
  const [familiasPorSector, setFamiliasPorSector] = useState({});
  const [loadingFamilias, setLoadingFamilias] = useState(false);


  // Lógica de inicialización unificada
  useEffect(() => {
    const fetchSectores = async () => {
      const data = await SectorService.getVisiblesWeb();
      setCategorias(data);
    };
    fetchSectores();

    if (totalItems > 0) {
      setAnimate(true);
      const timer = setTimeout(() => setAnimate(false), 300);
      return () => clearTimeout(timer);
    }
  }, [totalItems, categorias.length]);

  const handleToggleSector = async (sectorId) => {
    if (openCatId === sectorId) {
      setOpenCatId(null);
      return;
    }

    setOpenCatId(sectorId);

    if (!familiasPorSector[sectorId]) {
      setLoadingFamilias(true);
      try {
        const data = await FamiliaService.getPorSector(sectorId);
        setFamiliasPorSector(prev => ({ ...prev, [sectorId]: data }));
      } catch (error) {
        // error handled silently; loading state cleared in finally
      } finally {
        setLoadingFamilias(false);
      }
    }
  };

  if (location.pathname === '/espera-confirmacion') return null;
  
  return (
      <>
        <nav className="bg-white border-b border-stone-100 sticky top-0 z-50">
          <div className="max-w-7xl mx-auto px-4 md:px-12">
            <div className="flex justify-between items-center h-16 md:h-20">
              
              {/* BOTÓN MENÚ MOBILE */}
              <button 
                onClick={() => setIsMenuOpen(true)}
                className="md:hidden p-2 text-stone-900 transition-transform active:scale-90"
              >
                <Menu size={22} strokeWidth={1.5} />
              </button>

              {/* LOGO */}
              <div className={`shrink-0 transition-all duration-500 ${isSearchOpen ? 'opacity-0 invisible w-0 md:visible md:opacity-100 md:w-auto' : 'opacity-100 visible'}`}>
                <Link to="/" className="cursor-pointer">
                  <h1 className="text-xl md:text-2xl font-serif font-bold text-[#2d241e] tracking-widest">
                    BLUME
                  </h1>
                </Link>
              </div>

              {/* CATEGORÍAS (Desktop) - SOLO SI ESTÁ AUTENTICADO */}
              <div className="hidden md:flex items-center space-x-10">
                {isAuthenticated && categorias.map((cat) => (
                  <Link 
                    key={cat.id}
                    to={`/categoria/${cat.descripcion.toLowerCase()}`} 
                    className="text-stone-500 hover:text-black text-[10px] font-bold tracking-[0.25em] uppercase transition-colors relative group"
                  >
                    {cat.descripcion}
                    <span className="absolute -bottom-1 left-0 w-0 h-px bg-black transition-all duration-300 group-hover:w-full"></span>
                  </Link>
                ))}
              </div>

              {/* ACCIONES */}
              <div className="flex items-center gap-1 sm:gap-4">
                {/* LUPA (Buscador) - SOLO SI ESTÁ AUTENTICADO */}
                {isAuthenticated && (
                  <Buscador onToggle={(state) => setIsSearchOpen(state)} /> 
                )}
                
                <div className={`${isSearchOpen ? 'hidden md:block' : 'block'}`}>
                  {isAuthenticated ? (
                    <UserMenu /> 
                  ) : (
                    <Link to="/login" className="p-2 text-stone-400 hover:text-black transition-all">
                      <User size={20} strokeWidth={1.2} />
                    </Link>
                  )}
                </div>

                {/* CARRITO - SOLO SI ESTÁ AUTENTICADO (Opcional, según tu lógica de negocio) */}
                {isAuthenticated && (
                  <button onClick={openCart} className="p-2 text-stone-400 hover:text-black relative shrink-0">
                    <ShoppingCart size={20} strokeWidth={1.2} />
                    {totalItems > 0 && (
                      <span className={`absolute top-0 right-0 bg-black text-white text-[8px] font-bold rounded-full h-4 w-4 flex items-center justify-center border border-white transition-transform ${animate ? 'scale-125' : 'scale-100'}`}>
                        {totalItems}
                      </span>
                    )}
                  </button>
                )}
              </div>
            </div>
          </div>
        </nav>

        {/* OVERLAY MENÚ MOBILE */}
        <div 
          className={`fixed inset-0 z-60 bg-black/20 backdrop-blur-sm transition-opacity duration-500 ${isMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible'}`}
          onClick={() => setIsMenuOpen(false)}
        />
        
        <aside className={`fixed top-0 left-0 z-70 h-full w-[85%] max-w-85 bg-white transition-transform duration-500 ease-[cubic-bezier(0.32,0,0.07,1)] transform ${isMenuOpen ? 'translate-x-0' : '-translate-x-full'}`}>
          <div className="p-6 flex flex-col h-full">
            <button onClick={() => setIsMenuOpen(false)} className="self-end p-2 text-stone-400"><X size={24} strokeWidth={1} /></button>

            <div className="mt-10 space-y-2">
              {/* TÍTULO Y CATEGORÍAS MOBILE - SOLO SI ESTÁ AUTENTICADO */}
              {isAuthenticated && (
                <>
                  <p className="text-[10px] uppercase tracking-[0.4em] text-stone-400 font-bold mb-8 border-b border-stone-50 pb-4">Colecciones</p>
                  {categorias.map((cat) => (
                    <div key={cat.id} className="py-2">
                      <div className="flex items-center justify-between">
                        <Link
                          to={`/categoria/${cat.descripcion.toLowerCase()}`}
                          onClick={() => setIsMenuOpen(false)}
                          className="text-2xl font-serif text-stone-900 tracking-tight"
                        >
                          {cat.descripcion}
                        </Link>
                        <button
                          onClick={() => handleToggleSector(cat.id)}
                          className="p-1 text-stone-400 hover:text-stone-700 transition-colors"
                          aria-label={`Expandir ${cat.descripcion}`}
                        >
                          <ChevronDown
                            size={18}
                            strokeWidth={1.5}
                            className={`transition-transform duration-200 ${openCatId === cat.id ? 'rotate-180' : ''}`}
                          />
                        </button>
                      </div>
                      {openCatId === cat.id && (
                        <div className="mt-2 ml-2">
                          {loadingFamilias ? (
                            <span className="inline-block h-4 w-4 animate-spin rounded-full border-2 border-stone-300 border-t-stone-700" aria-label="Cargando familias" />
                          ) : (
                            familiasPorSector[cat.id] && familiasPorSector[cat.id].length > 0 && (
                              <ul className="space-y-1">
                                {familiasPorSector[cat.id].map((familia) => (
                                  <li key={familia.id}>
                                    <Link
                                      to={`/categoria/${cat.descripcion.toLowerCase()}/${familia.descripcion.toLowerCase()}`}
                                      onClick={() => setIsMenuOpen(false)}
                                      className="text-sm text-stone-600 hover:text-stone-900 tracking-wide transition-colors"
                                    >
                                      {familia.descripcion}
                                    </Link>
                                  </li>
                                ))}
                              </ul>
                            )
                          )}
                        </div>
                      )}
                    </div>
                  ))}
                </>
              )}
            </div>

            <div className="mt-auto pt-8 border-t border-stone-100">
              <Link to="/login" onClick={() => setIsMenuOpen(false)} className="flex items-center gap-3 text-[10px] uppercase tracking-widest font-bold text-stone-900">
                  <User size={16} strokeWidth={1.5}/>
                  {isAuthenticated ? `HOLA, ${user?.username?.toUpperCase()}` : 'INICIAR SESIÓN'}
              </Link>
            </div>
          </div>
        </aside>
      </>
  );
};

export default Navbar;