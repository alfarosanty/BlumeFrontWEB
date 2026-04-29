import React, { useState, useEffect } from 'react';
import UserMenu from './UserMenu';
import Buscador from './Buscador';
import { Link } from 'react-router-dom';
import { ShoppingCart, User, Menu, X } from 'lucide-react'; 
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  const { user, isAuthenticated } = useAuth();
  const { totalItems, openCart } = useCart();
  const [animate, setAnimate] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false); // Estado para el menú mobile

  const categorias = ['Dormitorio', 'Living', 'Mesa', 'Baño'];

  useEffect(() => {
    if (totalItems === 0) return;
    setAnimate(true);
    const timer = setTimeout(() => setAnimate(false), 300);
    return () => clearTimeout(timer);
  }, [totalItems]);

  // Bloquear scroll cuando el menú está abierto
  useEffect(() => {
    if (isMenuOpen) document.body.style.overflow = 'hidden';
    else document.body.style.overflow = 'unset';
  }, [isMenuOpen]);

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

            {/* CATEGORÍAS (Desktop) */}
            <div className="hidden md:flex items-center space-x-10">
              {categorias.map((cat) => (
                <Link 
                  key={cat}
                  to={`/categoria/${cat.toLowerCase()}`} 
                  className="text-stone-500 hover:text-black text-[10px] font-bold tracking-[0.25em] uppercase transition-colors relative group"
                >
                  {cat}
                  <span className="absolute -bottom-1 left-0 w-0 h-px bg-black transition-all duration-300 group-hover:w-full"></span>
                </Link>
              ))}
            </div>

            {/* ACCIONES */}
            <div className="flex items-center gap-1 sm:gap-4">
              <Buscador onToggle={(state) => setIsSearchOpen(state)} /> 
              
              <div className={`${isSearchOpen ? 'hidden md:block' : 'block'}`}>
                {isAuthenticated ? (
                  <UserMenu /> 
                ) : (
                  <Link to="/login" className="p-2 text-stone-400 hover:text-black transition-all">
                    <User size={20} strokeWidth={1.2} />
                  </Link>
                )}
              </div>

              <button onClick={openCart} className="p-2 text-stone-400 hover:text-black relative shrink-0">
                <ShoppingCart size={20} strokeWidth={1.2} />
                {totalItems > 0 && (
                  <span className={`absolute top-0 right-0 bg-black text-white text-[8px] font-bold rounded-full h-4 w-4 flex items-center justify-center border border-white transition-transform ${animate ? 'scale-125' : 'scale-100'}`}>
                    {totalItems}
                  </span>
                )}
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* OVERLAY MENÚ MOBILE */}
      <div 
        className={`fixed inset-0 z-60 bg-black/20 backdrop-blur-sm transition-opacity duration-500 ${isMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible'}`}
        onClick={() => setIsMenuOpen(false)}
      />
      
      <aside className={`fixed top-0 left-0 z-70 h-full w-[80%] max-w-[320px] bg-white shadow-2xl transition-transform duration-500 ease-out transform ${isMenuOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="p-6 flex flex-col h-full">
          <button 
            onClick={() => setIsMenuOpen(false)}
            className="self-end p-2 text-stone-400 hover:text-black transition-colors"
          >
            <X size={24} strokeWidth={1} />
          </button>

          <div className="mt-12 space-y-8">
            <p className="text-[10px] uppercase tracking-[0.4em] text-stone-400 font-bold mb-10 border-b border-stone-100 pb-4">Categorías</p>
            {categorias.map((cat) => (
              <Link 
                key={cat}
                to={`/categoria/${cat.toLowerCase()}`}
                onClick={() => setIsMenuOpen(false)}
                className="block text-2xl font-serif text-stone-900 hover:italic transition-all"
              >
                {cat}
              </Link>
            ))}
          </div>

          <div className="mt-auto pb-8 border-t border-stone-100 pt-8">
            <Link 
              to={isAuthenticated ? "/mi-cuenta" : "/login"}
              onClick={() => setIsMenuOpen(false)}
              className="flex items-center gap-3 text-[10px] uppercase tracking-[0.2em] font-bold text-stone-900"
            >
              <User size={16} strokeWidth={1.5}/>
              {/* Si está autenticado y existe user.nombre, mostramos "HOLA, [NOMBRE]", sino "INICIAR SESIÓN" */}
              {isAuthenticated ? (
                <span>Hola, {user?.username || 'Mi Perfil'}</span>
              ) : (
                'Iniciar Sesión'
              )}
            </Link>
          </div>
        </div>
      </aside>
    </>
  );
};

export default Navbar;