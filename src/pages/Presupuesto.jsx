import React, { useState, useEffect } from 'react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { useNavigate, Link, useParams } from 'react-router-dom';
import { ArrowLeft, Send, Trash2, ChevronRight, Plus, Minus, ArrowRight } from 'lucide-react';
import { presupuestoService } from '../services/presupuestoService';

const Presupuesto = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const { cart, totalPrecio, removeFromCart, clearCart, updateQuantity } = useCart();
  
  const [datosVista, setDatosVista] = useState({ articulos: [], total: 0 });
  const [loading, setLoading] = useState(Boolean(id));
  const [isSending, setIsSending] = useState(false);
  const isReadOnly = Boolean(id);

  useEffect(() => {
    if (isReadOnly) {
      const cargarPresupuestoGuardado = async () => {
        try {
          const data = await presupuestoService.getById(id);
          const articulosNormalizados = data.articulos.map(item => {
            const artBase = item.articulo;
            return {
              id_articulo: item.id_articulo,
              cantidad: item.cantidad,
              precio_unitario: item.precio_unitario,
              subtotal: item.cantidad * item.precio_unitario,
              codigo: artBase?.codigo || item.codigo,
              descripcion: artBase?.descripcion || item.descripcion,
              url_foto: artBase?.articulo_precio?.url_foto || "/placeholder.png",
              color_nombre: artBase?.color?.descripcion || "S/C",
              color_hexa: artBase?.color?.color_hexa || "#d6d3d1",
              medida_nombre: artBase?.medida?.descripcion || "U",
              id_articulo_precio: artBase?.id_articulo_precio || artBase?.id
            };
          });
          console.log("Articulos normalizados: ", articulosNormalizados)

          setDatosVista({
            articulos: articulosNormalizados,
            total: data.total,
            id_presupuesto: data.id
          });
          console.log(data)
        } catch (err) {
          console.error("Error cargando presupuesto:", err);
          navigate('/mis-presupuestos');
        } finally {
          setLoading(false);
        }
      };
      cargarPresupuestoGuardado();
    } else {
      setDatosVista({
        articulos: cart,
        total: totalPrecio
      });
      setLoading(false);
    }
  }, [id, cart, totalPrecio, isReadOnly, navigate]);

  const groupedCart = datosVista.articulos.reduce((acc, item) => {
    const key = item.codigo || item.id_articulo;
    if (!acc[key]) {
      acc[key] = {
        nombre: item.codigo,
        descripcion: item.descripcion,
        foto: item.url_foto || item.foto,
        variantes: [],
        totalModelo: 0
      };
    }
    acc[key].variantes.push(item);
    acc[key].totalModelo += (item.cantidad * item.precio_unitario);
    return acc;
  }, {});

  if (loading) return (
        <div className="h-screen w-full bg-[#faf9f6] flex flex-col justify-center items-center space-y-4">
          <div className="w-8 h-8 border-4 border-stone-200 border-t-orange-500 rounded-full animate-spin"></div>
          <p className="text-stone-400 text-[10px] uppercase tracking-[0.2em] font-bold">
            Explorando Blume...
          </p>
        </div>
  );

  if (!isReadOnly && cart.length === 0) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-white p-6">
        <h2 className="text-xl font-serif text-stone-800 mb-6 italic">Tu presupuesto está vacío</h2>
        <Link to="/" className="text-stone-900 border-b border-stone-900 pb-1 font-bold uppercase tracking-widest text-[10px] flex items-center gap-2">
          <ArrowLeft size={14} /> Volver al catálogo
        </Link>
      </div>
    );
  }

  const handleEnviarPresupuesto = async () => {
    if (isReadOnly || isSending || cart.length === 0) return;
    setIsSending(true);
    try {
      const payload = {
        id_cliente: user.id_cliente,
        articulos: cart.map(item => ({
          codigo: item.codigo,
          descripcion: item.descripcion,
          id_articulo: item.id_articulo,
          cantidad: item.cantidad,
          precio_unitario: item.precio_unitario
        }))
      };
      console.log(payload)
      const resultado = await presupuestoService.crear(payload);
      clearCart();
      navigate('/gracias', { state: { id: resultado.id } });
    } catch (err) {
      console.error(err);
      navigate('/login')
    } finally {
      setIsSending(false);
    }
  };

  const itemsAMostrar = isReadOnly ? datosVista.articulos : cart;

  return (
  <div className="min-h-screen bg-[#faf9f6] pt-24 pb-12 px-4 md:px-8">
    <div className="max-w-7xl mx-auto">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
        <div>
          <nav className="flex items-center gap-2 text-[10px] uppercase tracking-[0.2em] text-stone-400 mb-4">
            <Link to="/" className="hover:text-stone-800">Catálogo</Link>
            <ChevronRight size={10} />
            <span className="text-stone-800 font-bold">{isReadOnly ? 'Archivo' : 'Cesta'}</span>
          </nav>
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-stone-900 leading-tight italic">
            {isReadOnly ? `PRESUPUESTO #${id.padStart(5, '0')}` : 'TU SELECCIÓN'}
          </h1>
        </div>
      </div>

      {/* Grid de 12 columnas para máxima precisión */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
        
        {/* Columna Izquierda: Tabla (Ocupa 8 de 12) */}
        <div className="lg:col-span-8 space-y-8">
          <div className="border-t border-stone-200">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-stone-100">
                  <th className="py-6 text-[10px] uppercase tracking-widest text-stone-400 font-bold">Producto</th>
                  <th className="py-6 text-[10px] uppercase tracking-widest text-stone-400 font-bold text-right">Detalle de Variantes</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-100">
                {Object.values(groupedCart).map((grupo) => (
                  <tr key={grupo.nombre} className="group">
                    <td className="py-8 align-top w-2/5">
                      <div className="flex gap-6 items-start">
                        <Link 
                          to={`/articulo/${grupo.id_articulo_precio}`}
                          className="flex gap-6 items-start group/link cursor-pointer"
                        >
                          <div className="overflow-hidden bg-stone-50 w-36 h-50 shrink-0 shadow-sm transition-shadow hover:shadow-md">
                            <img 
                              src={grupo.foto} 
                              className="w-full h-full object-cover grayscale-[0.2] group-hover/link:grayscale-0 group-hover/link:scale-105 transition-all duration-700" 
                              alt={grupo.nombre} 
                            />
                          </div>

                          <div className="flex flex-col gap-1 mt-1">
                            <h3 className="text-xs font-bold text-stone-900 uppercase tracking-wider leading-tight group-hover/link:text-stone-600 transition-colors">
                              {grupo.nombre}
                            </h3>
                            
                            <span className="text-[9px] uppercase tracking-widest text-stone-300 mt-4 opacity-0 group-hover/link:opacity-100 transition-opacity">
                              Ver producto +
                            </span>
                          </div>
                        </Link>
                      </div>
                      <p className="text-[10px] text-stone-400 font-mono tracking-tighter mt-4">
                        REF: {grupo.descripcion}
                        </p>
                    </td>

                    {/* Variantes compactas */}
                    <td className="py-8 pl-8 align-top">
                      <div className="space-y-2">
                        {grupo.variantes.map((v) => (
                          <div key={v.id_articulo} className="flex items-center justify-between py-2 border-b border-stone-50 last:border-0 hover:bg-[#fafafa]/50 px-2 -mx-2 transition-colors">
                            <div className="flex items-center gap-3">
                              {/* BARRITA lateral de color CORREGIDA */}
                              <div className="w-1 h-3.5" style={{ backgroundColor: v.color_hexa || '#d6d3d1' }} />
                              
                              <span className="text-[10px] text-stone-600 uppercase tracking-tight">
                                {v.color_nombre} <span className="text-stone-200 mx-1">/</span> {v.medida_nombre}
                              </span>
                            </div>
                            
                            <div className="flex items-center gap-6">
                              {/* Selectores cantidad: SOLO si no es lectura */}
                              {!isReadOnly ? (
                                <div className="flex items-center gap-3 border border-stone-100 bg-white px-2 py-0.5 shadow-inner">
                                  <button 
                                    disabled={v.cantidad <= 1} 
                                    onClick={() => v.cantidad > 1 && updateQuantity(v.id_articulo, v.cantidad - 1)} 
                                    className={`transition-colors ${ v.cantidad <= 1 ? 'text-stone-200 cursor-not-allowed' : 'text-stone-400 hover:text-black cursor-pointer'}`}
                                  > 
                                    <Minus size={11} /> 
                                  </button>
                                  <span className="text-[11px] font-bold w-4 text-center font-mono text-stone-900">{v.cantidad}</span>
                                  <button 
                                    onClick={() => updateQuantity(v.id_articulo, v.cantidad + 1)} 
                                    className="text-stone-400 hover:text-black cursor-pointer"
                                  >
                                    <Plus size={11} />
                                  </button>
                                </div>
                              ) : (
                                /* En modo lectura solo mostramos la cantidad con un estilo lindo */
                                <div className="text-[11px] font-mono text-stone-500 uppercase tracking-widest">
                                  Cant: <span className="text-stone-950 font-bold">{v.cantidad}</span>
                                </div>
                              )}

                              {/* Precio (se queda igual) */}
                              <span className="text-[11px] font-mono font-bold w-20 text-right text-stone-950">
                                ${v.subtotal.toLocaleString('es-AR')}
                              </span>

                              {/* TACHO DE BASURA: SOLO si no es lectura */}
                              {!isReadOnly && (
                                <button 
                                  onClick={() => removeFromCart(v.id_articulo)} 
                                  className="text-stone-900 hover:text-red-600 transition-colors cursor-pointer p-1"
                                >
                                  <Trash2 size={15} strokeWidth={1.5} />
                                </button>
                              )}
                            </div>
                          </div>
                        ))}
                        
                        {/* Subtotal Modelo */}
                        <div className="flex justify-end pt-5">
                          <p className="text-[10px] uppercase tracking-[0.2em] font-bold text-stone-400 italic">
                            Subtotal {grupo.nombre}: <span className="ml-4 text-stone-900 not-italic">${grupo.totalModelo.toLocaleString('es-AR')}</span>
                          </p>
                        </div>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Botón Volver */}
          <button 
            onClick={() => navigate('/')}
            className="flex items-center gap-2 text-stone-400 hover:text-stone-800 text-[10px] font-bold uppercase tracking-[0.2em] transition-colors cursor-pointer pt-4"
          >
            <ArrowLeft size={14} /> Continuar comprando
          </button>
        </div>

        {/* Columna Derecha: Resumen (Ocupa 4 de 12) */}
        <div className="lg:col-span-4">
          <div className="bg-[#fafafa] p-10 sticky top-32 border border-stone-100">
            <h3 className="text-[11px] font-bold text-stone-900 uppercase tracking-[0.3em] mb-10 italic">
              {isReadOnly ? "Datos del Archivo" : "Resumen de Selección"}
            </h3>
            
            <div className="space-y-6 border-b border-stone-200 pb-8 mb-8">
              <div className="flex justify-between text-[10px] uppercase tracking-widest">
                <span className="text-stone-400">Modelos</span>
                <span className="text-stone-900 font-bold">{Object.keys(groupedCart).length}</span>
              </div>
              <div className="flex justify-between text-[10px] uppercase tracking-widest">
                <span className="text-stone-400">Artículos</span>
                <span className="text-stone-900 font-bold">{itemsAMostrar.reduce((sum, item) => sum + item.cantidad, 0)}</span>
              </div>
              <div className="flex justify-between text-[10px] uppercase tracking-widest text-stone-400 italic">
                <span>Envío</span>
                <span>A convenir</span>
              </div>
            </div>

            <div className="flex justify-between items-baseline mb-12">
              <span className="text-[10px] uppercase tracking-[0.3em] font-bold text-stone-900">Total</span>
              <span className="text-4xl font-light italic text-stone-900">${datosVista.total.toLocaleString('es-AR')}</span>
            </div>

            {!isReadOnly ? (
              <>
                <button
                  disabled={isSending || cart.length === 0}
                  onClick={handleEnviarPresupuesto}
                  className={`w-full py-5 text-[11px] uppercase tracking-[0.3em] font-bold transition-all duration-500 cursor-pointer
                    ${isSending ? 'bg-stone-300 text-stone-500' : 'bg-stone-900 text-white hover:bg-stone-800'}`}
                >
                  {isSending ? 'Procesando...' : 'Finalizar Pedido'}
                </button>
                
                <p className="mt-6 text-[9px] text-center text-stone-400 leading-relaxed uppercase tracking-wider font-serif italic">
                  El pedido será procesado por nuestro equipo <br /> de administración.
                </p>
              </>
            ) : (
              <button
                onClick={() => navigate('/mis-presupuestos')}
                className="w-full py-5 text-[11px] uppercase tracking-[0.3em] font-bold border border-stone-900 text-stone-900 hover:bg-stone-900 hover:text-white transition-all duration-500 cursor-pointer"
              >
                Volver al historial
              </button>
            )}
          </div>
        </div>

      </div>
    </div>
  </div>
);
};

export default Presupuesto;