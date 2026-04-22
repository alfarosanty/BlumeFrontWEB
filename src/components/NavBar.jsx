import React from 'react';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { ShoppingCart, Search, Menu, User } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {

  const { user, logout, isAuthenticated } = useAuth();
  const { totalItems, openCart } = useCart();
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    if (totalItems === 0) return;
    
    setAnimate(true);
    const timer = setTimeout(() => setAnimate(false), 300);
    
    return () => clearTimeout(timer);
  }, [totalItems]);

  return (
    <nav className="bg-white border-b border-stone-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          
          {/* Logo */}
          <div className="shrink-0">
            <Link to="/" className="cursor-pointer hover:opacity-80 transition-opacity">
              <h1 className="text-2xl font-serif font-bold text-stone-800 tracking-tighter">
                BLUME
              </h1>
            </Link>
          </div>

          {/* Menú Desktop */}
          <div className="hidden md:flex items-center space-x-8">
            {/* Links Principales */}
            <Link to="/categoria/dormitorio" className="text-stone-600 hover:text-stone-900 text-[11px] font-bold tracking-[0.2em] uppercase transition-colors after:content-[''] after:block after:h-px after:w-0 after:bg-orange-400 after:transition-all hover:after:w-full">
              Dormitorio
            </Link>
            
            <Link to="/categoria/living" className="text-stone-600 hover:text-stone-900 text-[11px] font-bold tracking-[0.2em] uppercase transition-colors after:content-[''] after:block after:h-px after:w-0 after:bg-orange-400 after:transition-all hover:after:w-full">
              Living
            </Link>
            
            <Link to="/categoria/mesa" className="text-stone-600 hover:text-stone-900 text-[11px] font-bold tracking-[0.2em] uppercase transition-colors after:content-[''] after:block after:h-px after:w-0 after:bg-orange-400 after:transition-all hover:after:w-full">
              Mesa
            </Link>
            
            <Link to="/categoria/bano" className="text-stone-600 hover:text-stone-900 text-[11px] font-bold tracking-[0.2em] uppercase transition-colors after:content-[''] after:block after:h-px after:w-0 after:bg-orange-400 after:transition-all hover:after:w-full">
              Baño
            </Link>

            {/* El Link Dinámico / "Cajón de Sastre" */}
            <Link to="/categoria/tendencias" className="text-orange-700 hover:text-orange-800 text-[11px] font-bold tracking-[0.2em] uppercase transition-colors flex items-center gap-1 after:content-[''] after:block after:h-px after:w-0 after:bg-orange-400 after:transition-all hover:after:w-full">
              <span className="relative">
                Tendencias
                {/* Puntito de notificación sutil para llamar la atención */}
                <span className="absolute -top-1 -right-2 h-1 w-1 bg-orange-500 rounded-full animate-ping"></span>
              </span>
            </Link>
          </div>

          {/* Iconos */}
          <div className="flex items-center space-x-2"> {/* Bajé un toque el space-x */}
  
          <button className="p-2 text-stone-500 hover:text-stone-900 transition-colors">
            <Search size={18} />
          </button>
      
          {/* BOTÓN DE USUARIO DINÁMICO */}
          {isAuthenticated ? (
            <div className="flex items-center gap-4">
              {/* Si está logueado, mostramos su nombre y opción de salir */}
              <div className="hidden lg:flex flex-col items-end">
                <span className="text-[10px] font-bold uppercase tracking-widest text-stone-900">
                  Hola, {user.username}
                </span>
                <button 
                  onClick={logout}
                  className="text-[9px] uppercase tracking-tighter text-orange-600 hover:underline"
                >
                  Cerrar Sesión
                </button>
              </div>
              <div className="p-2 bg-stone-100 rounded-full text-stone-600">
                <User size={18} />
              </div>
            </div>
          ) : (
            /* Si no está logueado, mostramos el link de siempre */
            <Link 
              to="/login" 
              className="p-2 text-stone-500 hover:text-stone-900 flex items-center gap-2 group transition-colors"
            >
              <User size={18} />
              <span className="hidden lg:inline text-[10px] font-bold uppercase tracking-widest text-stone-400 group-hover:text-stone-900">
                Ingresar
              </span>
            </Link>
          )}

          {/* CARRITO */}
          <button onClick={openCart} className="p-2 text-stone-500 hover:text-stone-900 relative transition-colors">
            <ShoppingCart size={18} />
            {totalItems > 0 && (
              <span className={`absolute top-1 right-1 bg-orange-600 text-white text-[9px] font-bold rounded-full h-4 w-4 flex items-center justify-center transition-transform ${
                animate ? 'scale-125' : 'scale-100'
              }`}>
                {totalItems}
              </span>
            )}
          </button>

        </div>
          
        </div>
      </div>
    </nav>
  );
};

export default Navbar;