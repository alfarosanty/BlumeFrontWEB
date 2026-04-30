import React from 'react';

const PantallaCarga = () => {
  return (
    <div className="fixed inset-0 z-100 bg-white flex flex-col justify-center items-center">
      <div className="relative flex flex-col items-center">
        <h2 className="text-2xl md:text-3xl font-serif font-bold text-[#2d241e] tracking-[0.5em] animate-pulse">
          BLUME
        </h2>
        
        <div className="mt-4 w-24 h-px bg-stone-100 overflow-hidden relative">
          <div className="absolute inset-0 bg-blume-gold animate-loading-bar"></div>
        </div>
        
        <p className="mt-8 text-stone-400 text-[9px] uppercase tracking-[0.3em] font-medium">
          Explorando el universo Blume
        </p>
      </div>
    </div>
  );
};

export default PantallaCarga;