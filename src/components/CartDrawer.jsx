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
        className={`fixed inset-0 bg-black/20 z-60 transition-opacity duration-700 ${isCartOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`} 
        onClick={closeCart} 
      />

      <aside className={`fixed right-0 top-0 h-full w-full max-w-112.5 bg-white z-70 transition-transform duration-700 ease-[cubic-bezier(0.25,0.1,0.25,1)] transform ${isCartOpen ? 'translate-x-0' : 'translate-x-full'} flex flex-col`}>
  
        {/* 1. Cabecera (Alto fijo) */}
        <div className="flex-none flex items-center justify-between p-8">
          <div className="flex flex-col">
            <h2 className="text-[11px] font-light uppercase tracking-[0.3em] text-black">Carrito</h2>
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
                className={`text-[9px] uppercase tracking-widest mt-2 transition-all duration-300 transform cursor-pointer border px-2 py-0.5 w-fit ${
                  confirmarVaciar 
                  ? 'bg-red-600 text-white border-red-600 scale-105' 
                  : 'text-red-500 border-transparent hover:text-red-700'
                }`}
              >
                {confirmarVaciar ? 'Hacé click para confirmar' : 'Vaciar bolsa'}
              </button>
            )}
          </div>
          <button onClick={closeCart} className="text-black hover:opacity-50 transition-opacity cursor-pointer">
            <X size={20} strokeWidth={1} />
          </button>
        </div>

        {/* 2. Lista de Productos (Flexible y Scrollable) */}
        {/* Agregamos 'scrollbar-hide' o estilos CSS para ocultar la barra */}
        <div className="flex-1 overflow-y-auto px-8 space-y-10 scroll-smooth" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
          <style>{`
            div::-webkit-scrollbar {
              display: none;
            }
          `}</style>
          
          {groupedItems.length === 0 ? (
            <div className="py-20 text-left">
              <p className="text-[11px] uppercase tracking-widest text-stone-400 font-light">Tu bolsa está vacía.</p>
            </div>
          ) : (
            groupedItems.map((grupo) => (
              <div key={grupo.nombre} className="flex gap-6">
                {/* Foto */}
                <div onClick={() => { closeCart(); navigate(`/articulo/${grupo.id_articulo_precio}`); }}
                    className="w-24 h-36 bg-stone-100 overflow-hidden shrink-0 cursor-pointer group"
                >
                  <img src={grupo.url_foto} alt={grupo.nombre} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                </div>

                <div className="flex flex-col flex-1 justify-between py-1">
                  <h3 onClick={() => { closeCart(); navigate(`/articulo/${grupo.id_articulo_precio}`); }} 
                      className="text-[11px] font-medium uppercase tracking-wider text-black cursor-pointer">
                    {grupo.nombre}
                  </h3>
                  
                  <div className="mt-4 space-y-6">
                    {grupo.variantes.map((v) => (
                      <div key={v.id_articulo} className="border-t border-stone-100 pt-4 first:border-0 first:pt-0">
                        <div className="flex justify-between items-center text-[10px] uppercase tracking-[0.15em] text-stone-500 mb-3">
                          <div className="flex items-center gap-2">
                            <div className="w-2 h-2 border border-stone-200" style={{ backgroundColor: v.color_hexa || '#ccc' }} />
                            <span>{v.color_nombre} | {v.medida_nombre}</span>
                          </div>
                          <button onClick={() => removeFromCart(v.id_articulo)} className="text-black hover:text-red-600 transition-colors cursor-pointer">
                            <Trash2 size={13} strokeWidth={1.5} />
                          </button>
                        </div>

                        <div className="flex justify-between items-end">
                          <div className="flex items-center border border-black px-2 py-1">
                            <button 
                              onClick={() => v.cantidad > 1 && updateQuantity(v.id_articulo, v.cantidad - 1)} 
                              className={`w-5 h-5 flex items-center justify-center ${v.cantidad <= 1 ? 'cursor-not-allowed text-stone-300' : 'cursor-pointer hover:text-stone-500'}`}
                            >
                              <Minus size={10} />
                            </button>
                            <span className="px-3 text-[10px] font-bold">{v.cantidad}</span>
                            <button 
                              onClick={() => updateQuantity(v.id_articulo, v.cantidad + 1)} 
                              className="w-5 h-5 flex items-center justify-center cursor-pointer hover:text-stone-500"
                            >
                              <Plus size={10} />
                            </button>
                          </div>
                          <p className="text-[11px] font-light text-black tracking-tighter">
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
          {/* Espaciador invisible al final para que el último item no quede pegado al total */}
          <div className="h-32"></div>
        </div>

        {/* 3. Footer (Alto fijo y siempre al final) */}
        {cart.length > 0 && (
          <div className="flex-none p-8 bg-white border-t border-stone-100">
            <div className="flex justify-between items-baseline mb-6">
              <span className="text-[11px] uppercase tracking-[0.3em] font-light text-stone-400">Total</span>
              <span className="text-xl font-light text-black">${totalPrecio.toLocaleString('es-AR')}</span>
            </div>
            <button 
              onClick={() => { closeCart(); navigate('/presupuesto'); }} 
              className="w-full bg-black text-white py-4 text-[10px] uppercase tracking-[0.3em] hover:bg-stone-900 transition-colors flex items-center justify-center gap-3 cursor-pointer"
            >
              Comprar
              <ArrowRight size={14} strokeWidth={1} />
            </button>
          </div>
        )}
      </aside>
    </>
  );
};

export default CartDrawer;