import React, { useState, useEffect } from 'react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { useNavigate, Link, useParams } from 'react-router-dom';
import { ArrowLeft, Trash2, ChevronRight, Plus, Minus } from 'lucide-react';
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
  const [numero_presupuesto_cliente, setNumero_presupuesto_cliente] = useState(null);

  useEffect(() => {
    if (isReadOnly) {
      const cargarPresupuestoGuardado = async () => {
        try {
          const data = await presupuestoService.getById(id);
          setNumero_presupuesto_cliente(data.numero_presupuesto_cliente);
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
          setDatosVista({
            articulos: articulosNormalizados,
            total: data.total,
            id_presupuesto: data.id
          });
        } catch (err) {
          navigate('/mis-presupuestos');
        } finally {
          setLoading(false);
        }
      };
      cargarPresupuestoGuardado();
    } else {
      setDatosVista({ articulos: cart, total: totalPrecio });
      setLoading(false);
    }
  }, [id, cart, totalPrecio, isReadOnly, navigate]);

  const groupedCart = (isReadOnly ? datosVista.articulos : cart).reduce((acc, item) => {
    const key = item.codigo || item.id_articulo;
    if (!acc[key]) {
      acc[key] = {
        nombre: item.codigo,
        descripcion: item.descripcion,
        foto: item.url_foto || item.foto,
        variantes: [],
        totalModelo: 0,
        id_articulo_precio: item.id_articulo_precio
      };
    }
    acc[key].variantes.push(item);
    acc[key].totalModelo += (item.cantidad * item.precio_unitario);
    return acc;
  }, {});

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
      const resultado = await presupuestoService.crear(payload);
      clearCart();
      navigate('/gracias', { state: { id: resultado.id } });
    } catch (err) {
      navigate('/login');
    } finally {
      setIsSending(false);
    }
  };

  if (loading) return (
    <div className="h-screen w-full bg-white flex flex-col justify-center items-center">
      <div className="w-10 h-px bg-stone-300 animate-pulse mb-4"></div>
      <p className="text-stone-400 text-[9px] uppercase tracking-[0.3em]">Cargando</p>
    </div>
  );

  return (
    <div className="min-h-screen bg-white pt-24 md:pt-32 pb-20 px-4 md:px-12 animate-in fade-in duration-700">
      <div className="max-w-400 mx-auto">
        
        {/* Header */}
        <header className="mb-12 md:mb-16">
          <nav className="flex items-center gap-2 text-[10px] uppercase tracking-[0.2em] text-stone-400 mb-6">
            <Link to="/" className="hover:text-black transition-colors">Catálogo</Link>
            <ChevronRight size={8} />
            <span className="text-black">{isReadOnly ? 'Detalle' : 'Tu Cesta'}</span>
          </nav>
          <h1 className="text-4xl md:text-5xl font-light tracking-tighter text-stone-900 uppercase italic">
            {isReadOnly ? `Pedido N° ${String(numero_presupuesto_cliente).padStart(5, '0')}` : 'Selección de Artículos'}
          </h1>
        </header>

        <div className="flex flex-col lg:flex-row gap-16 md:gap-20">
          
          {/* Listado de Productos */}
          <div className="grow">
            <div className="border-t border-stone-200">
              {Object.values(groupedCart).map((grupo) => (
                <div key={grupo.nombre} className="flex flex-col md:flex-row py-10 border-b border-stone-100 group">
                  
                  {/* Imagen */}
                  <div className="w-full md:w-56 lg:w-64 mb-6 md:mb-0">
                    <Link to={`/articulo/${grupo.id_articulo_precio}`}>
                      <div className="aspect-3/4 overflow-hidden bg-stone-100">
                        <img 
                          src={grupo.foto} 
                          className="w-full h-full object-cover grayscale-10 hover:grayscale-0 transition-all duration-1000 ease-out" 
                          alt={grupo.nombre} 
                        />
                      </div>
                    </Link>
                  </div>

                  {/* Info */}
                  <div className="md:pl-12 grow flex flex-col">
                    <div className="flex justify-between items-start mb-1">
                      <h3 className="text-sm font-bold tracking-widest uppercase text-stone-900">{grupo.nombre}</h3>
                      <p className="text-sm font-medium text-stone-900">${grupo.totalModelo.toLocaleString('es-AR')}</p>
                    </div>
                    <p className="text-[11px] text-stone-400 uppercase tracking-wider mb-10">{grupo.descripcion}</p>
                    
                    <div className="space-y-8">
                      {grupo.variantes.map((v) => (
                        <div key={v.id_articulo} className="flex items-center justify-between group/item">
                          <div className="flex items-center gap-4">
                            <div 
                              className="w-1 h-4 transition-transform duration-300" 
                              style={{ backgroundColor: v.color_hexa || '#d6d3d1' }} 
                            />
                            <span className="text-[10px] md:text-[11px] uppercase tracking-[0.15em] text-stone-600">
                              {v.color_nombre} <span className="text-stone-200 mx-2">/</span> {v.medida_nombre}
                            </span>
                          </div>

                          <div className="flex items-center gap-8 md:gap-14">
                            {!isReadOnly ? (
                              <div className="flex items-center gap-5">
                                <button 
                                  onClick={() => v.cantidad > 1 && updateQuantity(v.id_articulo, v.cantidad - 1)} 
                                  disabled={v.cantidad <= 1}
                                  className={`transition-colors ${v.cantidad <= 1 ? 'text-stone-200 cursor-not-allowed' : 'text-stone-400 hover:text-black cursor-pointer'}`}
                                >
                                  <Minus size={14} strokeWidth={1} />
                                </button>
                                <span className="text-[11px] font-bold w-4 text-center">{v.cantidad}</span>
                                <button 
                                  onClick={() => updateQuantity(v.id_articulo, v.cantidad + 1)} 
                                  className="text-stone-400 hover:text-black cursor-pointer transition-colors"
                                >
                                  <Plus size={14} strokeWidth={1}/>
                                </button>
                              </div>
                            ) : (
                              <span className="text-[10px] font-bold text-stone-400 uppercase tracking-widest">
                                Unidades: {v.cantidad}
                              </span>
                            )}
                            
                            <span className="text-[11px] font-semibold w-24 text-right text-stone-900 font-mono">
                              ${v.subtotal.toLocaleString('es-AR')}
                            </span>

                            {!isReadOnly && (
                              <button 
                                onClick={() => removeFromCart(v.id_articulo)} 
                                className="text-stone-400 hover:text-red-900 transition-all duration-300 transform hover:scale-110"
                                title="Eliminar variante"
                              >
                                <Trash2 size={15} strokeWidth={1.2} />
                              </button>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <button 
              onClick={() => navigate('/')} 
              className="mt-12 group flex items-center gap-3 text-stone-400 hover:text-black text-[10px] uppercase tracking-[0.3em] transition-all"
            >
              <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" /> 
              Seguir comprando
            </button>
          </div>

          {/* Resumen Sticky */}
          <div className="lg:w-100">
            <div className="lg:sticky lg:top-32 bg-[#fcfcfc] border border-stone-100 p-10">
              <h3 className="text-[10px] font-bold uppercase tracking-[0.4em] mb-12 text-stone-400">Detalle de Importes</h3>
              
              <div className="space-y-6 mb-12">
                <div className="flex justify-between text-[10px] uppercase tracking-[0.2em]">
                  <span className="text-stone-500">Valor Neto</span>
                  <span className="font-medium text-stone-900">${datosVista.total.toLocaleString('es-AR')}</span>
                </div>
                <div className="flex justify-between text-[10px] uppercase tracking-[0.2em]">
                  <span className="text-stone-500">Logística</span>
                  <span className="text-stone-400 italic">A convenir</span>
                </div>
                <div className="pt-6 border-t border-stone-200 flex justify-between items-baseline">
                  <span className="text-[12px] font-bold uppercase tracking-[0.2em] text-stone-900">Total</span>
                  <span className="text-3xl font-light text-stone-900 tracking-tighter">${datosVista.total.toLocaleString('es-AR')}</span>
                </div>
              </div>

              {!isReadOnly ? (
                <button
                  disabled={isSending || cart.length === 0}
                  onClick={handleEnviarPresupuesto}
                  className={`w-full py-5 text-[10px] uppercase tracking-[0.4em] font-bold transition-all duration-500
                    ${isSending 
                      ? 'bg-stone-100 text-stone-300 cursor-wait' 
                      : 'bg-black text-white hover:bg-stone-800 active:scale-[0.99] cursor-pointer'}`}
                >
                  {isSending ? 'Enviando...' : 'Confirmar Selección'}
                </button>
              ) : (
                <button 
                  onClick={() => navigate('/mis-presupuestos')} 
                  className="w-full py-5 text-[10px] uppercase tracking-[0.4em] font-bold border border-black hover:bg-black hover:text-white transition-all duration-300 cursor-pointer"
                >
                  Regresar al listado
                </button>
              )}
              
              <div className="mt-8 pt-8 border-t border-stone-100">
                <p className="text-[9px] text-stone-400 uppercase tracking-widest leading-loose">
                  Este documento es una solicitud de presupuesto. Los precios y el stock están sujetos a confirmación por parte del equipo comercial.
                </p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Presupuesto;