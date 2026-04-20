import { useNavigate } from 'react-router-dom';
import React from 'react';

const ArticuloCard = ({ articulo: ArticuloPrecio }) => {

  const navigate = useNavigate();

  const irAlDetalle = () => {
    navigate(`/articulo/${ArticuloPrecio.id}`);
  }

  return (
    <div className="bg-white rounded-xl shadow-sm border border-stone-200 hover:shadow-md transition-shadow overflow-hidden">
      {/* Contenedor de imagen (con un placeholder por si no hay imagen real aún) */}
      <div className="aspect-square bg-stone-100 overflow-hidden">
        <img 
          src={ArticuloPrecio.url_foto || 'https://placehold.co/600x400?text=Sin+Imagen'} 
          alt={ArticuloPrecio.descripcion}
          className="w-full h-full object-cover"
        />
      </div>

      <div className="p-4">
        {/* Código del producto */}
        <span className="text-[10px] uppercase tracking-widest text-stone-400 font-bold">
          COD: {ArticuloPrecio.codigo}
        </span>
        
        {/* Descripción */}
        <h3 className="text-md font-medium text-stone-800 mt-1 mb-2">
          {ArticuloPrecio.descripcion}
        </h3>
        
        {/* Precio */}
        <div className="flex justify-between items-center mt-4 pt-4 border-t border-stone-100">
          <span className="text-lg font-bold text-stone-900">
            ${ArticuloPrecio.precio1.toLocaleString()}
          </span>
          <button 
            onClick={irAlDetalle}
            className="bg-stone-800 text-white px-3 py-1.5 rounded-lg text-xs hover:bg-orange-600 transition-colors">
            Ver detalle
          </button>
        </div>
      </div>
    </div>
  );
};

export default ArticuloCard;