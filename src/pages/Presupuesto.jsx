import React from 'react';
import { useCart } from '../context/CartContext';
import { useNavigate, Link } from 'react-router-dom';
import { ArrowLeft, Send, Trash2, ChevronRight, Plus, Minus, ArrowRight } from 'lucide-react';

const Presupuesto = () => {
  const { cart, totalPrecio, removeFromCart, clearCart, updateQuantity } = useCart();
  const navigate = useNavigate();

  // Agrupamos el carrito por modelo
  const groupedCart = cart.reduce((acc, item) => {
    // Usamos la descripción o un ID de modelo para agrupar
    if (!acc[item.codigo]) {
      acc[item.codigo] = {
        nombre: item.codigo,
        descripcion: item.descripcion,
        foto: item.url_foto,
        id_articulo_precio: item.id_articulo_precio,
        variantes: [],
        totalModelo: 0
      };
    }
    acc[item.codigo].variantes.push(item);
    acc[item.codigo].totalModelo += item.subtotal;
    return acc;
  }, {});

  // Si el carrito está vacío, lo mandamos de vuelta a comprar
  if (cart.length === 0) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-stone-100 p-6">
        <h2 className="text-2xl font-serif text-stone-800 mb-4 font-bold">Tu presupuesto está vacío</h2>
        <Link to="/" className="text-orange-600 font-bold uppercase tracking-widest text-sm flex items-center gap-2">
          <ArrowLeft size={16} /> Volver al catálogo
        </Link>
      </div>
    );
  }

  const handleEnviarPresupuesto = async () => {
    // Acá es donde mañana conectaremos con FastAPI
    console.log("Enviando a Python...", cart);
    alert("Presupuesto enviado con éxito (Simulado)");
    // clearCart();
    // navigate('/gracias');
  };

  return (
    <div className="min-h-screen bg-[#faf9f6] pt-24 pb-12 px-4 md:px-8">
      <div className="max-w-7xl mx-auto">
        
        {/* Header de la página */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <nav className="flex items-center gap-2 text-[10px] uppercase tracking-[0.2em] text-stone-400 mb-4">
              <Link to="/" className="hover:text-stone-800">Catálogo</Link>
              <ChevronRight size={10} />
              <span className="text-stone-800 font-bold">Revisión de Presupuesto</span>
            </nav>
            <h1 className="text-4xl md:text-5xl font-serif font-bold text-stone-900 leading-tight">
              Confirmar <br /> Pedido.
            </h1>
          </div>
          
          <div className="text-right">
            <p className="text-stone-400 text-[10px] uppercase tracking-[0.2em] font-bold mb-1">Total Estimado</p>
            <p className="text-4xl font-light text-stone-900">${totalPrecio.toLocaleString('es-AR')}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          
          {/* Columna Izquierda: La Tabla de Artículos */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white rounded-3xl shadow-lg border border-stone-200 overflow-hidden">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-stone-50/50 border-b border-stone-200">
                    <th className="p-6 text-[10px] uppercase tracking-widest text-stone-400 font-bold">Detalle</th>
                    <th className="p-6 text-[10px] uppercase tracking-widest text-stone-400 font-bold text-center">Cant.</th>
                    <th className="p-6 text-[10px] uppercase tracking-widest text-stone-400 font-bold text-right">Subtotal</th>
                    <th className="p-6"></th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-stone-100">
                  {Object.values(groupedCart).map((grupo) => (
                    <tr key={grupo.nombre} className="group">
                      {/* Columna de Imagen y Modelo (Se ve una sola vez) */}
                      <td className="p-6 align-top w-1/3">
                        <div 
                          className="flex gap-4 cursor-pointer group/item" 
                          onClick={() => navigate(`/articulo/${grupo.id_articulo_precio}`)} // Suponiendo que tenés el ID del modelo
                        >
                          {/* Imagen del modelo con un pequeño efecto de escala al pasar el mouse */}
                          <div className="overflow-hidden rounded-xl w-20 h-28 shadow-sm">
                            <img 
                              src={grupo.foto} 
                              className="w-full h-full object-cover group-hover/item:scale-105 transition-transform duration-500" 
                              alt="" 
                            />
                          </div>
                          
                          <div className="flex flex-col">
                            {/* Título con underline sutil al hacer hover */}
                            <h3 className="text-sm font-bold text-stone-900 uppercase leading-tight group-hover/item:text-orange-600 transition-colors">
                              {grupo.nombre}
                            </h3>
                            
                            <p className="text-[10px] text-stone-400 mt-1 font-mono tracking-wider">
                              REF: {grupo.descripcion}
                            </p>
                            
                            <span className="mt-auto text-[9px] text-stone-400 uppercase tracking-widest flex items-center gap-1">
                              Ver detalle <ArrowRight size={10} />
                            </span>
                          </div>
                        </div>
                      </td>

                      {/* Columna de Variantes (Aquí listamos los colores) */}
                      <td className="p-6" colSpan={3}>
                        <div className="space-y-4">
                          {grupo.variantes.map((v) => (
                            <div key={v.id_articulo} className="flex items-center justify-between bg-stone-50/50 p-3 rounded-xl hover:bg-stone-50 transition-colors">
                              <div className="flex items-center gap-3">
                                {/* Barrita de color sutil que hablamos ayer */}
                                <div className="w-1 h-4 rounded-full" style={{ backgroundColor: v.color_hexa || '#d6d3d1' }} />
                                <span className="text-[11px] font-medium text-stone-600 uppercase tracking-wider">
                                  {v.color_nombre} <span className="text-stone-200 mx-1">|</span> {v.medida_nombre}
                                </span>
                              </div>
                              
                              <div className="flex items-center gap-8">
                                <div className="flex items-center gap-3 bg-white border border-stone-200 rounded-lg p-1 shadow-lg">
                                  <button 
                                    onClick={() => v.cantidad > 1 && updateQuantity(v.id_articulo, v.cantidad - 1)}
                                    className={`w-5 h-5 flex items-center justify-center rounded-md transition-colors ${
                                      v.cantidad === 1 ? 'text-stone-200 cursor-not-allowed' : 'hover:bg-stone-50 text-stone-400 hover:text-orange-600'
                                    }`}
                                  >
                                    <Minus size={10} />
                                  </button>
                                  
                                  <span className="w-6 text-center font-mono text-xs font-bold text-stone-800">
                                    {v.cantidad}
                                  </span>
                                  
                                  <button 
                                    onClick={() => updateQuantity(v.id_articulo, v.cantidad + 1)}
                                    className="w-5 h-5 flex items-center justify-center rounded-md hover:bg-stone-50 text-stone-400 hover:text-orange-600 transition-colors"
                                  >
                                    <Plus size={10} />
                                  </button>
                                </div>
                                <span className="font-mono text-sm font-bold w-24 text-right">${v.subtotal.toLocaleString('es-AR')}</span>
                                <button 
                                  onClick={() => removeFromCart(v.id_articulo)}
                                  className="text-stone-300 hover:text-red-500 transition-colors"
                                >
                                  <Trash2 size={14} />
                                </button>
                              </div>
                            </div>
                          ))}
                          
                          {/* Subtotal del Modelo */}
                          <div className="flex justify-end pr-3 pt-2 text-[10px] uppercase tracking-[0.2em] font-bold text-stone-400 italic">
                            Subtotal {grupo.descripcion}: <span className="ml-4 text-stone-900 not-italic">${grupo.totalModelo.toLocaleString('es-AR')}</span>
                          </div>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <button 
              onClick={() => navigate('/')}
              className="flex items-center gap-2 text-stone-400 hover:text-stone-800 text-[11px] font-bold uppercase tracking-widest transition-colors"
            >
              <ArrowLeft size={14} /> Agregar más artículos
            </button>
          </div>

          {/* Columna Derecha: Resumen de Compra */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-3xl p-8 border border-stone-200 sticky top-24 shadow-lg">
              <h3 className="text-sm font-bold text-stone-900 uppercase tracking-[0.2em] mb-8 pb-4 border-b border-stone-50">
                Resumen del Pedido
              </h3>

              <div className="space-y-5 mb-8">
                {/* Detalle de Cantidad de Modelos */}
                <div className="flex justify-between items-center text-xs">
                  <span className="text-stone-400 uppercase tracking-widest font-medium">Modelos</span>
                  <span className="text-stone-900 font-bold font-mono">{Object.keys(groupedCart).length}</span>
                </div>

                {/* Detalle de Unidades Totales */}
                <div className="flex justify-between items-center text-xs">
                  <span className="text-stone-400 uppercase tracking-widest font-medium">Total Unidades</span>
                  <span className="text-stone-900 font-bold font-mono">
                    {cart.reduce((sum, item) => sum + item.cantidad, 0)}
                  </span>
                </div>

                {/* IVA o Impuestos (Opcional, pero le da aire pro) */}
                <div className="flex justify-between items-center text-xs">
                  <span className="text-stone-400 uppercase tracking-widest font-medium">Impuestos (IVA inc.)</span>
                  <span className="text-stone-500 font-medium">Incluido</span>
                </div>

                {/* El Total */}
                <div className="pt-6 border-t border-stone-50 mt-6">
                  <div className="flex justify-between items-end">
                    <div className="flex flex-col">
                      <span className="text-[10px] text-orange-600 font-bold uppercase tracking-[0.2em] mb-1">Total Final</span>
                      <span className="text-3xl font-light text-stone-900 leading-none">
                        ${totalPrecio.toLocaleString('es-AR')}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Botón de Confirmación */}
              <button 
                onClick={handleEnviarPresupuesto}
                className="w-full bg-stone-900 hover:bg-orange-600 text-white py-5 rounded-2xl font-bold uppercase tracking-[0.2em] text-[11px] transition-all duration-500 flex items-center justify-center gap-3 group"
              >
                Confirmar Presupuesto
                <Send size={14} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300" />
              </button>

              {/* Garantía de confianza sutil */}
              <p className="mt-6 text-[10px] text-center text-stone-400 leading-relaxed uppercase tracking-tighter">
                Al confirmar, se enviará el detalle a administración <br /> para procesar tu pedido.
              </p>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Presupuesto;