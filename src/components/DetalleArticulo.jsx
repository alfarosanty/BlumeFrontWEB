import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { ArticuloService } from '../services/ArticuloService';
import { useCart } from '../context/CartContext';
import { Check, Plus, Minus } from 'lucide-react';
import { useAuth } from '../context/AuthContext'

const DetalleArticulo = ({ variantes }) => {
  const { addToCart } = useCart();
  const [seleccionado, setSeleccionado] = useState(variantes[0]);
  const [cantidad, setCantidad] = useState(1);
  const [agregado, setAgregado] = useState(false);
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (variantes && variantes.length > 0) {
      setSeleccionado(variantes[0]);
      setCantidad(1);
      window.scrollTo(0, 0);
    }
  }, [variantes]);

  const infoGeneral = seleccionado.articulo_precio;

  const handleAgregarAlCarrito = () => {

    if (!isAuthenticated) {
      navigate('/login', { state: { from: location.pathname } });
      return;
    }

    const productoParaCarrito = {
      id_articulo: seleccionado.id,
      codigo: seleccionado.codigo,
      
      descripcion: infoGeneral.descripcion,
      color_nombre: seleccionado.color.descripcion,
      color_hexa: seleccionado.color.color_hexa,
      medida_nombre: seleccionado.medida.descripcion,
      url_foto: infoGeneral.url_foto || 'https://placehold.co/200',
      
      id_articulo_precio: infoGeneral.id,
      precio_unitario: parseFloat(infoGeneral.precio1),
      cantidad: cantidad, 
      subtotal: parseFloat(infoGeneral.precio1) * cantidad,

    };

    addToCart(productoParaCarrito, cantidad);
    
    setAgregado(true);
  
    setTimeout(() => {
      setAgregado(false);
    }, 1000);
    
  };

  return (
    <main className="max-w-6xl mx-auto p-0 md:p-10 font-sans text-stone-800 bg-white">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-0 md:gap-12 items-start">
        
        {/* --- SECCIÓN IZQUIERDA: IMAGEN --- */}
        <div className="md:sticky md:top-24 w-full">
          <div className="aspect-3/4 md:aspect-4/5 bg-stone-100 overflow-hidden shadow-sm md:rounded-2xl">
            <img
              src={infoGeneral.url_foto || "https://placehold.co/600x800?text=Sin+Imagen"}
              alt={infoGeneral.descripcion}
              className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
            />
          </div>
        </div>

        {/* --- SECCIÓN DERECHA: INFO Y SELECCIÓN --- */}
        <div className="flex flex-col gap-6 p-6 md:p-0">
          <div className="space-y-1">
            <span className="text-[10px] md:text-xs uppercase tracking-[0.25em] text-[#8d6e63] font-bold">
              {seleccionado.subfamilia?.familia?.descripcion} / {seleccionado.subfamilia?.descripcion}
            </span>
            <h1 className="text-2xl md:text-4xl font-serif mt-2 mb-1 uppercase tracking-tight text-[#2d241e] leading-tight">
              {infoGeneral.descripcion}
            </h1>
            <p className="text-[10px] text-stone-400 font-mono tracking-widest">CÓD: {seleccionado.codigo}</p>
          </div>

          <div className="flex items-baseline gap-4 border-b border-stone-50 pb-6">
            <span className="text-2xl md:text-3xl font-light text-stone-900">
              ${parseFloat(infoGeneral.precio1).toLocaleString('es-AR')}
            </span>
            <span className="text-xs md:text-sm text-stone-400 line-through opacity-60">
              ${(parseFloat(infoGeneral.precio1) * 1.2).toLocaleString('es-AR')}
            </span>
          </div>

          {/* Selector de Colores */}
          <div className="py-2">
            <label className="text-[11px] uppercase tracking-widest mb-4 block text-stone-500 italic">
              Color: <span className="text-stone-900 not-italic font-bold ml-2">{seleccionado.color.descripcion}</span>
            </label>
            <div className="flex flex-wrap gap-4">
              {variantes.map((v) => (
                <button
                  key={v.id}
                  onClick={() => setSeleccionado(v)}
                  className={`relative w-8 h-8 md:w-10 md:h-10 rounded-full border transition-all duration-300 cursor-pointer ${
                    seleccionado.id === v.id ? "border-[#4a3728] scale-110 ring-4 ring-[#be9e70]/10" : "border-transparent hover:border-stone-300"
                  }`}
                >
                  <span
                    className="absolute inset-1 rounded-full shadow-inner"
                    style={{ backgroundColor: v.color.color_hexa || '#ccc' }}
                  ></span>
                </button>
              ))}
            </div>
          </div>

          {/* Medida: Look más limpio */}
          <div className="bg-stone-50/50 border-y border-stone-100 py-4 px-1 flex justify-between items-center group cursor-default">
            <span className="text-[9px] md:text-[10px] uppercase tracking-[0.3em] text-stone-400 font-bold">Medida</span>
            <span className="text-xs md:text-sm font-medium uppercase text-[#2d241e] tracking-widest">{seleccionado.medida.descripcion}</span>
          </div>

          {/* --- CANTIDAD Y CARRITO: Adaptación Mobile First --- */}
          <div className="flex flex-col sm:flex-row gap-3 mt-4">
  
          {/* Selector de cantidad: Ocupa todo el ancho en móvil, ancho fijo en PC */}
          <div className="flex items-center justify-between border border-stone-200 h-14 px-6 w-full sm:w-40 bg-white">
            <button 
              onClick={() => setCantidad(Math.max(1, cantidad - 1))}
              className="hover:text-[#4a3728] active:scale-125 transition-all cursor-pointer text-stone-400 p-2"
            >
              <Minus size={18} />
            </button>
            <span className="text-sm font-bold text-[#2d241e]">{cantidad}</span>
            <button 
              onClick={() => setCantidad(cantidad + 1)}
              className="hover:text-[#4a3728] active:scale-125 transition-all cursor-pointer text-stone-400 p-2"
            >
              <Plus size={18} />
            </button>
          </div>

          {/* Botón Principal: El cambio clave es el w-full (celu) y sm:flex-1 (PC) */}
          <button
            onClick={handleAgregarAlCarrito}
            disabled={agregado}
            className={`w-full sm:flex-1 h-14 text-[11px] font-bold uppercase tracking-[0.25em] transition-all duration-500 active:scale-[0.97] cursor-pointer shadow-lg
              ${agregado 
                ? 'bg-stone-100 text-stone-400 shadow-none' 
                : 'bg-[#1a1a1a] text-white hover:bg-black shadow-black/10'}`}
          >
            <span className="flex items-center justify-center gap-3">
              {agregado ? (
                <>
                  <Check size={18} strokeWidth={2} />
                  Añadido
                </>
              ) : (
                'Añadir al presupuesto'
              )}
            </span>
          </button>
        </div>

          {/* --- INFO ADICIONAL --- */}
          <div className="pt-10 space-y-6 text-[10px] md:text-[11px] uppercase tracking-[0.18em] text-stone-500 leading-relaxed border-t border-stone-100 mt-6">
            <div className="flex items-center gap-4 group">
              <div className="w-1.5 h-1.5 rounded-full bg-[#be9e70] transition-transform group-hover:scale-150" />
              <p>Entrega inmediata en locales seleccionados.</p>
            </div>
            <div className="flex items-center gap-4 group">
              <div className="w-1.5 h-1.5 rounded-full bg-[#be9e70] transition-transform group-hover:scale-150" />
              <p>Composición: Tusor 100% algodón prelavado.</p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default DetalleArticulo;