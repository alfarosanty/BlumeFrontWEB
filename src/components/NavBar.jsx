import React from 'react';
import { ShoppingCart, Search, Menu } from 'lucide-react';

const Navbar = () => {
  return (
    <nav className="bg-white border-b border-stone-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          
          {/* Logo */}
          <div className="flex-shrink-0">
            <h1 className="text-2xl font-serif font-bold text-stone-800 tracking-tighter">
              BLUME
            </h1>
          </div>

          {/* Menú Desktop */}
          <div className="hidden md:flex space-x-8">
            <a href="#" className="text-stone-600 hover:text-orange-600 transition-colors text-sm font-medium">Manteles</a>
            <a href="#" className="text-stone-600 hover:text-orange-600 transition-colors text-sm font-medium">Cortinas</a>
            <a href="#" className="text-stone-600 hover:text-orange-600 transition-colors text-sm font-medium">Almohadones</a>
          </div>

          {/* Iconos */}
          <div className="flex items-center space-x-4">
            <button className="p-2 text-stone-500 hover:text-stone-900">
              <Search size={20} />
            </button>
            <button className="p-2 text-stone-500 hover:text-stone-900 relative">
              <ShoppingCart size={20} />
              <span className="absolute top-1 right-1 bg-orange-600 text-white text-[10px] rounded-full h-4 w-4 flex items-center justify-center">
                0
              </span>
            </button>
            <button className="md:hidden p-2 text-stone-500">
              <Menu size={20} />
            </button>
          </div>
          
        </div>
      </div>
    </nav>
  );
};

export default Navbar;