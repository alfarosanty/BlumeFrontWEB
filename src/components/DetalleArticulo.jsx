import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { getDetalleArticulo } from '../services/ArticuloService';
import { useCart } from '../context/CartContext';
import { Check, Plus, Minus } from 'lucide-react';

const DetalleArticulo = ({ variantes }) => {
  const { addToCart } = useCart();
  const [seleccionado, setSeleccionado] = useState(variantes[0]);
  const [cantidad, setCantidad] = useState(1);
  const [agregado, setAgregado] = useState(false);

  const infoGeneral = seleccionado.articulo_precio;

  const handleAgregarAlCarrito = () => {

    const productoParaCarrito = {
      id_articulo: seleccionado.id, 
      codigo: seleccionado.codigo,
      
      descripcion: infoGeneral.descripcion,
      color_nombre: seleccionado.color.descripcion,
      color_hexa: seleccionado.color.color_hexa,
      medida_nombre: seleccionado.medida.descripcion,
      url_foto: infoGeneral.url_foto || 'https://placehold.co/200',
      
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
    <main className="max-w-6xl mx-auto p-4 md:p-10 font-sans text-stone-800">
      <div className="grid md:grid-cols-2 gap-12 items-start">
        
        {/* --- SECCIÓN IZQUIERDA: IMAGEN --- */}
        <div className="sticky top-10">
          <div className="aspect-4/5 bg-stone-100 rounded-2xl overflow-hidden shadow-sm border border-stone-200">
            <img
              src={infoGeneral.url_foto || "https://placehold.co/600x400?text=Sin+Imagen"}
              alt={infoGeneral.descripcion}
              className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
            />
          </div>
        </div>

        {/* --- SECCIÓN DERECHA: INFO Y SELECCIÓN --- */}
        <div className="flex flex-col gap-6">
          {/* Cabecera */}
          <div>
            <span className="text-xs uppercase tracking-widest text-orange-600 font-bold">
              {seleccionado.subfamilia?.familia?.descripcion} / {seleccionado.subfamilia?.descripcion}
            </span>
            <h1 className="text-4xl font-serif mt-2 mb-1">{infoGeneral.descripcion}</h1>
            <p className="text-sm text-stone-400 font-mono">CÓD: {seleccionado.codigo}</p>
          </div>

          {/* Precio */}
          <div className="flex items-baseline gap-4">
            <span className="text-3xl font-light text-stone-900">
              ${parseFloat(infoGeneral.precio1).toLocaleString('es-AR')}
            </span>
            <span className="text-sm text-stone-400 line-through">
              ${(parseFloat(infoGeneral.precio1) * 1.2).toLocaleString('es-AR')}
            </span>
          </div>

          <hr className="border-stone-200" />

          {/* Selector de Colores */}
          <div>
            <label className="text-sm font-medium mb-3 block text-stone-500 italic">
              Color: <span className="text-stone-900 not-italic font-bold">{seleccionado.color.descripcion}</span>
            </label>
            <div className="flex flex-wrap gap-3">
              {variantes.map((v) => (
                <button
                  key={v.id}
                  onClick={() => setSeleccionado(v)}
                  title={v.color.descripcion}
                  className={`group relative w-10 h-10 rounded-full border-2 transition-all duration-200 ${
                    seleccionado.id === v.id ? "border-stone-800 scale-110 shadow-md" : "border-transparent hover:border-stone-300"
                  }`}
                >
                  <span 
                    className="absolute inset-1 rounded-full border border-black/10"
                    style={{ backgroundColor: v.color.color_hexa || '#ccc' }}
                  ></span>
                </button>
              ))}
            </div>
          </div>

          {/* Medida */}
          <div className="bg-stone-50 p-4 rounded-lg border border-stone-100">
            <p className="text-sm text-stone-600">
              <span className="font-bold">Medida:</span> {seleccionado.medida.descripcion}
            </p>
          </div>

          {/* Cantidad y Carrito */}
          <div className="flex gap-4 mt-4">
            <div className="flex items-center border border-stone-300 rounded-full px-4 py-2">
              <button 
                onClick={() => setCantidad(Math.max(1, cantidad - 1))}
                className="w-8 h-8 text-xl hover:text-orange-600 transition-colors"
              >
                −
              </button>
              <input 
                type="number" 
                value={cantidad} 
                readOnly
                className="w-12 text-center bg-transparent focus:outline-none font-medium"
              />
              <button 
                onClick={() => setCantidad(cantidad + 1)}
                className="w-8 h-8 text-xl hover:text-orange-600 transition-colors"
              >
                +
              </button>
            </div>

            <button
                onClick={handleAgregarAlCarrito}
                disabled={agregado} // Evitamos múltiples clics mientras dice "Agregado"
                className={`flex-1 rounded-full py-4 font-bold uppercase tracking-widest text-sm transition-all duration-500 shadow-lg active:scale-95 ${
                  agregado 
                    ? 'bg-orange-600 text-white scale-105' 
                    : 'bg-stone-900 text-white hover:bg-stone-800'
                }`}
              >
                <span className="flex items-center justify-center gap-2">
                  {agregado ? (
                    <>
                      <Check size={18} strokeWidth={3} />
                      ¡Añadido!
                    </>
                  ) : (
                    'Añadir al Carrito'
                  )}
                </span>
              </button>
          </div>

          {/* Detalles adicionales */}
          <div className="mt-6 text-sm text-stone-500 leading-relaxed border-t border-stone-100 pt-6">
            <p className="flex items-center gap-2 mb-2">
              <span className="w-1.5 h-1.5 bg-orange-400 rounded-full"></span>
              Entrega inmediata en locales seleccionados.
            </p>
            <p className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 bg-orange-400 rounded-full"></span>
              Composición: Tusor 100% algodón prelavado.
            </p>
          </div>
        </div>
      </div>
    </main>
  );
};

export default DetalleArticulo;