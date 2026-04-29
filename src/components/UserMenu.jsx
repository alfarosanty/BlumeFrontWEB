import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { User, ChevronDown, LogOut, FileText } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const UserMenu = () => {
  const { user, logout } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef();

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={menuRef}>
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 p-1 md:p-2 bg-stone-50 hover:bg-stone-100 rounded-full transition-all group cursor-pointer active:scale-95"
      >
        <div className={`p-1.5 rounded-full transition-colors ${
          isOpen ? 'bg-[#be9e70] text-white' : 'bg-stone-200 text-stone-600 group-hover:bg-stone-300'
        }`}>
          <User size={16} strokeWidth={2.5} />
        </div>
        
        {/* En móvil ocultamos el nombre para que no ocupe espacio, solo dejamos el icono */}
        <span className="hidden md:inline text-[10px] font-bold uppercase tracking-widest text-stone-800">
          {user?.username}
        </span>
        
        <ChevronDown size={12} className={`text-stone-400 transition-transform hidden md:block ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        /* El w-[80vw] en móvil asegura que el menú no se corte, sm:w-48 lo vuelve normal en PC */
        <div className="absolute right-0 mt-2 w-[60vw] sm:w-48 bg-white rounded-2xl shadow-2xl border border-stone-100 py-2 z-50 animate-in fade-in zoom-in duration-200 origin-top-right">
          
          <div className="px-4 py-2 border-b border-stone-50 md:hidden">
             <p className="text-[9px] font-black uppercase text-stone-300 tracking-tighter">Usuario</p>
             <p className="text-[11px] font-bold text-stone-800 truncate">{user?.username}</p>
          </div>

          <Link 
            to="/mis-presupuestos" 
            onClick={() => setIsOpen(false)}
            className="flex items-center gap-3 px-4 py-4 md:py-3 text-[11px] font-bold uppercase tracking-wider text-stone-600 hover:bg-stone-50 hover:text-[#be9e70] transition-colors cursor-pointer"
          >
            <FileText size={14} />
            Mis Presupuestos
          </Link>

          <div className="border-t border-stone-50 mt-1">
            <button 
              onClick={logout}
              className="flex items-center gap-3 px-4 py-4 md:py-3 text-[11px] font-bold uppercase tracking-wider text-red-500 hover:bg-red-50 w-full text-left transition-colors cursor-pointer"
            >
              <LogOut size={14} />
              Cerrar Sesión
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserMenu;