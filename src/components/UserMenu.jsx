import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { User, ChevronDown, LogOut, FileText } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const UserMenu = () => {
  const { user, logout } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef();

  // Cerrar al clickear afuera
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
        className="flex items-center gap-2 p-1 lg:p-2 bg-stone-50 hover:bg-stone-100 rounded-full transition-all group"
      >
        <div className={`p-1.5 rounded-full transition-colors ${isOpen ? 'bg-orange-600 text-white' : 'bg-stone-200 text-stone-600 group-hover:bg-stone-300'}`}>
          <User size={16} />
        </div>
        <span className="hidden lg:inline text-[10px] font-bold uppercase tracking-widest text-stone-800">
          {user?.username}
        </span>
        <ChevronDown size={12} className={`text-stone-400 transition-transform hidden lg:block ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-white rounded-2xl shadow-xl border border-stone-100 py-2 z-50 animate-in fade-in zoom-in duration-200">
          <Link 
            to="/mis-presupuestos" 
            onClick={() => setIsOpen(false)}
            className="flex items-center gap-3 px-4 py-3 text-[11px] font-bold uppercase tracking-wider text-stone-600 hover:bg-stone-50 hover:text-orange-600 transition-colors"
          >
            <FileText size={14} />
            Mis Presupuestos
          </Link>

          <div className="border-t border-stone-50 mt-1">
            <button 
              onClick={logout}
              className="flex items-center gap-3 px-4 py-3 text-[11px] font-bold uppercase tracking-wider text-red-500 hover:bg-red-50 w-full text-left transition-colors"
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