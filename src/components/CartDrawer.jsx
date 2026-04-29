import React, { useState } from 'react';
import { X, Trash2, Plus, Minus, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';

const CartDrawer = () => {
  const { cart, isCartOpen, closeCart, removeFromCart, updateQuantity, clearCart, totalPrecio } = useCart();
  const [confirmarVaciar, setConfirmarVaciar] = useState(false);
  const navigate = useNavigate();

  const groupedCart = cart.reduce((acc, item) => {
    const modelo = item.codigo;
    if (!acc[modelo]) {
      acc[modelo] = {
        nombre: modelo,
        descripcion: item.descripcion,
        url_foto: item.url_foto,
        id_articulo_precio: item.id_articulo_precio,
        variantes: []
      };
    }
    acc[modelo].variantes.push(item);
    return acc;
  }, {});

  const groupedItems = Object.values(groupedCart);

  return (
    <>
      <div 
        className={`fixed inset-0 bg-black/40 z-60 transition-opacity duration-500 ${isCartOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`} 
        onClick={closeCart} 
      />

      <aside className={`fixed right-0 top-0 h-full w-full sm:max-w-112.5 bg-white z-70 transition-transform duration-500 ease-[cubic-bezier(0.32,0,0.07,1)] transform ${isCartOpen ? 'translate-x-0' : 'translate-x-full'} flex flex-col shadow-2xl`}>
  
        {/* 1. Cabecera - Más compacta en móvil */}
        <div className="flex-none flex items-center justify-between p-6 md:p-8 border-b border-stone-50">
          <div className="flex flex-col">
            <h2 className="text-[10px] md:text-[11px] font-bold uppercase tracking-[0.3em] text-black">Tu Bolsa</h2>
            {cart.length > 0 && (
              <button 
                onClick={() => {
                  if (!confirmarVaciar) {
                    setConfirmarVaciar(true);
                    setTimeout(() => setConfirmarVaciar(false), 3000);
                  } else {
                    clearCart();
                    setConfirmarVaciar(false);
                  }
                }}
                className={`text-[9px] uppercase tracking-widest mt-1 transition-all cursor-pointer border px-2 py-0.5 w-fit ${
                  confirmarVaciar 
                  ? 'bg-red-600 text-white border-red-600' 
                  : 'text-stone-400 border-transparent hover:text-red-500'
                }`}
              >
                {confirmarVaciar ? 'Hacé click para confirmar' : 'Vaciar bolsa'}
              </button>
            )}
          </div>
          <button onClick={closeCart} className="p-2 -mr-2 text-black hover:opacity-50 transition-opacity cursor-pointer active:scale-90">
            <X size={24} strokeWidth={1} />
          </button>
        </div>

        {/* 2. Lista de Productos */}
        <div className="flex-1 overflow-y-auto px-6 md:px-8 py-6 space-y-8 scrollbar-hide">
          <style>{` .scrollbar-hide::-webkit-scrollbar { display: none; } `}</style>
          
          {groupedItems.length === 0 ? (
            <div className="py-20 text-center">
              <p className="text-[10px] uppercase tracking-widest text-stone-400 font-light italic">No hay artículos seleccionados</p>
            </div>
          ) : (
            groupedItems.map((grupo) => (
              <div key={grupo.nombre} className="flex gap-4 md:gap-6 group">
                {/* Foto: Un poco más chica en móvil para dar espacio al texto */}
                <div onClick={() => { closeCart(); navigate(`/articulo/${grupo.id_articulo_precio}`); }}
                    className="w-20 h-28 md:w-24 md:h-36 bg-stone-100 overflow-hidden shrink-0 cursor-pointer"
                >
                  <img src={grupo.url_foto} alt={grupo.nombre} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                </div>

                <div className="flex flex-col flex-1 min-w-0 justify-between py-0.5">
                  <h3 onClick={() => { closeCart(); navigate(`/articulo/${grupo.id_articulo_precio}`); }} 
                      className="text-[10px] md:text-[11px] font-bold uppercase tracking-wider text-black cursor-pointer truncate">
                    {grupo.nombre}
                  </h3>
                  
                  <div className="mt-2 space-y-4">
                    {grupo.variantes.map((v) => (
                      <div key={v.id_articulo} className="border-t border-stone-50 pt-3 first:border-0 first:pt-0">
                        <div className="flex justify-between items-start text-[9px] md:text-[10px] uppercase tracking-widest text-stone-500 mb-2">
                          <div className="flex flex-col gap-1">
                            <span className="text-black font-medium">{v.medida_nombre}</span>
                            <div className="flex items-center gap-2">
                               <div className="w-2 h-2 rounded-full shadow-inner" style={{ backgroundColor: v.color_hexa || '#ccc' }} />
                               <span className="opacity-70">{v.color_nombre}</span>
                            </div>
                          </div>
                          <button onClick={() => removeFromCart(v.id_articulo)} className="p-2 -mt-2 -mr-2 text-stone-300 hover:text-red-600 transition-colors cursor-pointer active:scale-110">
                            <Trash2 size={14} strokeWidth={1.5} />
                          </button>
                        </div>

                        <div className="flex justify-between items-center mt-3">
                          {/* Controles de cantidad más táctiles */}
                          <div className="flex items-center border border-stone-200 rounded-sm">
                            <button 
                              onClick={() => v.cantidad > 1 && updateQuantity(v.id_articulo, v.cantidad - 1)} 
                              className="w-8 h-8 flex items-center justify-center cursor-pointer active:bg-stone-50"
                            >
                              <Minus size={12} />
                            </button>
                            <span className="px-2 text-[10px] font-bold min-w-5 text-center">{v.cantidad}</span>
                            <button 
                              onClick={() => updateQuantity(v.id_articulo, v.cantidad + 1)} 
                              className="w-8 h-8 flex items-center justify-center cursor-pointer active:bg-stone-50"
                            >
                              <Plus size={12} />
                            </button>
                          </div>
                          <p className="text-[11px] font-medium text-black tracking-tight">
                            ${v.subtotal.toLocaleString('es-AR')}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))
          )}
          <div className="h-10"></div>
        </div>

        {/* 3. Footer: Sticky y con sombra inversa */}
        {cart.length > 0 && (
          <div className="flex-none p-6 md:p-8 bg-white border-t border-stone-100 shadow-[0_-10px_20px_rgba(0,0,0,0.02)]">
            <div className="flex justify-between items-baseline mb-4">
              <span className="text-[10px] uppercase tracking-[0.2em] font-bold text-stone-400">Subtotal</span>
              <span className="text-lg md:text-xl font-light text-black">${totalPrecio.toLocaleString('es-AR')}</span>
            </div>
            <button 
              onClick={() => { closeCart(); navigate('/presupuesto'); }} 
              className="w-full bg-[#1a1a1a] text-white py-4 md:py-5 text-[10px] font-bold uppercase tracking-[0.3em] hover:bg-black transition-all active:scale-[0.98] flex items-center justify-center gap-3 cursor-pointer"
            >
              Iniciar Presupuesto
              <ArrowRight size={16} strokeWidth={1.5} />
            </button>
            <p className="text-[8px] text-center text-stone-400 uppercase tracking-widest mt-4">
              Impuestos y envío calculados al finalizar
            </p>
          </div>
        )}
      </aside>
    </>
  );
};

export default CartDrawer;