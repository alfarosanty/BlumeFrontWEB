import React, { useState } from 'react';
import { X, ShoppingBag, Trash2, Plus, Minus, Trash, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';

const CartDrawer = () => {
const { cart, isCartOpen, closeCart, removeFromCart, updateQuantity, clearCart, totalPrecio } = useCart();
const [confirmarVaciar, setConfirmarVaciar] = useState(false);
const navigate = useNavigate();
  // --- LÓGICA DE AGRUPACIÓN---
  // Agrupamos los items del carrito por "codigo" (el nombre del modelo)
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
      {/* Overlay */}
      <div 
        className={`fixed inset-0 bg-black/40 z-60 transition-opacity duration-500 ${isCartOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`} 
        onClick={closeCart} 
      />

      <aside className={`fixed right-0 top-0 h-full w-full max-w-md bg-white z-70 shadow-2xl transition-transform duration-500 ease-in-out transform ${isCartOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        
        {/* Cabecera: Título + Botón Vaciar */}
        <div className="flex items-center justify-between p-6 border-b border-stone-100">
          <div className="flex flex-col">
            <h2 className="text-lg font-serif font-bold uppercase tracking-tight text-stone-900">Tu Carrito</h2>
            {cart.length > 0 && (
                <button 
                    onClick={() => {
                    if (!confirmarVaciar) {
                        setConfirmarVaciar(true);
                        setTimeout(() => setConfirmarVaciar(false), 3000); // 3 seg para arrepentirse
                    } else {
                        clearCart();
                        setConfirmarVaciar(false);
                    }
                    }}
                    className={`flex items-center gap-1 text-[10px] uppercase tracking-tighter transition-all duration-300 mt-1 font-bold ${
                    confirmarVaciar ? 'text-white bg-red-500 px-2 py-0.5 rounded' : 'text-red-400 hover:text-red-600'
                    }`}
                >
                    <Trash size={10} /> 
                    {confirmarVaciar ? 'Hacé click para confirmar' : 'Vaciar bolsa'}
                </button>
                )}
          </div>
          <button onClick={closeCart} className="p-2 hover:bg-stone-100 rounded-full transition-colors text-stone-400 hover:text-stone-900">
            <X size={24} />
          </button>
        </div>

        {/* Lista de Productos Agrupados */}
        <div className="flex-1 overflow-y-auto p-6 space-y-8 h-[calc(100vh-200px)] custom-scrollbar">
          {groupedItems.length === 0 ? (
            <div className="text-center py-20 flex flex-col items-center gap-4">
              <div className="w-16 h-16 bg-stone-50 rounded-full flex items-center justify-center">
                <ShoppingBag size={30} className="text-stone-200" />
              </div>
              <p className="text-stone-400 italic font-serif">Tu bolsa de compras está vacía</p>
            </div>
          ) : (
            groupedItems.map((grupo) => (
              <div key={grupo.nombre} className="flex gap-4 border-b border-stone-50 pb-6 last:border-0">
                {/* Foto del Modelo */}
                <div onClick={() => {
                    closeCart();
                    navigate(`/articulo/${grupo.id_articulo_precio}`); 
                }}
                    className="w-20 h-28 bg-stone-100 rounded-lg overflow-hidden shrink-0 shadow-sm cursor-pointer group"
                >
                <img 
                    src={grupo.url_foto} 
                    alt={grupo.nombre} 
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" 
                />
                </div>

                <div className="flex-1">
                <h3 onClick={() => {
                        closeCart();
                        navigate(`/articulo/${grupo.id_articulo_precio}`);
                    }}
                    className="font-serif text-sm font-bold uppercase mb-4 text-stone-800 cursor-pointer hover:text-orange-600 transition-colors"
                >
                    {grupo.nombre}
                </h3>
                  
                  {/* Variantes del mismo modelo */}
                  <div className="space-y-5">
                    {grupo.variantes.map((v) => (
                      <div key={v.id_articulo} className="group">
                        <div className="flex justify-between items-center mb-2">
                          <div className="flex items-center gap-2 mb-1">
                            {/* El circulito de color */}
                            <div 
                                className="w-2.5 h-2.5 rounded-full border border-stone-200 shadow-sm" 
                                style={{ backgroundColor: v.color_hexa || '#ccc' }} // Usamos el HEX que venga de tu base de datos
                            />
                            
                            <span className="text-[11px] font-medium text-stone-500 uppercase tracking-wider">
                                {v.color_nombre} <span className="text-stone-200 mx-1">|</span> {v.medida_nombre}
                            </span>
                            </div>
                          {/* El tachito para borrar la variante de una */}
                          <button 
                            onClick={() => removeFromCart(v.id_articulo)} 
                            className="text-stone-300 hover:text-red-500 transition-colors"
                            title="Eliminar variante"
                          >
                            <Trash2 size={14} />
                          </button>
                        </div>

                        <div className="flex justify-between items-center">
                          <div className="flex items-center border border-stone-200 rounded-full px-2 py-1 bg-stone-50 shadow-inner">
                            <button 
                              onClick={() => {
                                if (v.cantidad > 1) updateQuantity(v.id_articulo, v.cantidad - 1);
                              }}
                              className={`w-6 h-6 flex items-center justify-center transition-colors ${
                                v.cantidad === 1 ? 'text-stone-300 cursor-not-allowed' : 'hover:text-orange-600'
                              }`}
                            >
                              <Minus size={12} />
                            </button>
                            
                            <span className="w-8 text-center text-xs font-bold text-stone-800">{v.cantidad}</span>
                            
                            <button 
                              onClick={() => updateQuantity(v.id_articulo, v.cantidad + 1)}
                              className="w-6 h-6 flex items-center justify-center hover:text-orange-600 transition-colors"
                            >
                              <Plus size={12} />
                            </button>
                          </div>
                          
                          <p className="font-bold text-sm text-stone-900 font-mono">
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
        </div>

        {/* Footer: Resumen y Acción */}
        {cart.length > 0 && (
          <div className="absolute bottom-0 left-0 w-full p-6 bg-white border-t border-stone-100 shadow-[0_-15px_30px_rgba(0,0,0,0.03)]">
            <div className="flex justify-between items-center mb-6">
              <span className="text-stone-400 text-[10px] uppercase tracking-[0.3em] font-bold">Subtotal</span>
              <span className="text-2xl font-light text-stone-900">${totalPrecio.toLocaleString('es-AR')}</span>
            </div>
            <button onClick={() => { closeCart(); navigate('/presupuesto'); }} className="group w-full bg-stone-900 text-white py-5 rounded-full font-bold uppercase tracking-[0.2em] text-[10px] hover:bg-orange-600 transition-all duration-500 shadow-xl active:scale-95 flex items-center justify-center gap-2">
                Continuar al presupuesto
                <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        )}
      </aside>
    </>
  );
};

export default CartDrawer;