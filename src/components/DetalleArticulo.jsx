import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { getDetalleArticulo } from '../services/ArticuloService';

const DetalleArticulo = ({ variantes }) => {
  const [seleccionado, setSeleccionado] = useState(variantes[0]);
  const [cantidad, setCantidad] = useState(1);

  const infoGeneral = seleccionado.articulo_precio;

  return (
    <main className="max-w-6xl mx-auto p-4 md:p-10 font-sans text-stone-800">
      <div className="grid md:grid-cols-2 gap-12 items-start">
        
        {/* --- SECCIÓN IZQUIERDA: IMAGEN --- */}
        <div className="sticky top-10">
          <div className="aspect-[4/5] bg-stone-100 rounded-2xl overflow-hidden shadow-sm border border-stone-200">
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
              {seleccionado.subfamilia.familia.descripcion} / {seleccionado.subfamilia.descripcion}
            </span>
            <h1 className="text-4xl font-serif mt-2 mb-1">{infoGeneral.descripcion}</h1>
            <p className="text-sm text-stone-400 font-mono">SKU: {seleccionado.codigo}</p>
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

          {/* Selector de Colores (Usando el color_hexa de tu JSON) */}
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

          {/* Medida (Info fija segun variante) */}
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
                className="w-8 h-8 text-xl hover:text-orange-600"
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
                className="w-8 h-8 text-xl hover:text-orange-600"
              >
                +
              </button>
            </div>

            <button
              className="flex-1 bg-stone-900 text-white rounded-full py-4 font-bold uppercase tracking-widest text-sm hover:bg-stone-800 transition-colors shadow-lg active:scale-95"
              onClick={() => alert(`Añadido: ${infoGeneral.descripcion} - ${seleccionado.color.descripcion} (Cant: ${cantidad})`)}
            >
              Añadir al Carrito
            </button>
          </div>

          {/* Detalles adicionales */}
          <div className="mt-6 text-sm text-stone-500 leading-relaxed">
            <p>• Entrega inmediata en locales seleccionados.</p>
            <p>• Composición: Tusor 100% algodón prelavado.</p>
          </div>
        </div>
      </div>
    </main>
  );
};

export default DetalleArticulo;