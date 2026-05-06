import { useNavigate } from 'react-router-dom';
import React from 'react';

const ArticuloCard = ({ articulo }) => {
  const navigate = useNavigate();
  const { id, url_foto, descripcion, codigo, precio1, habilitado } = articulo;

  const irAlDetalle = () => {
    if (habilitado) navigate(`/articulo/${id}`);
  };

  return (
    <div 
      onClick={irAlDetalle}
      className="group relative flex flex-col bg-white cursor-pointer transition-all duration-300"
    >
      {/* Contenedor de Imagen - Estilo Editorial */}
      <div className="relative aspect-3/4 overflow-hidden bg-stone-100">
        <img 
          src={url_foto || 'https://placehold.co/600x800?text=NO+IMAGE'} 
          alt={descripcion}
          className={`w-full h-full object-cover transition-transform duration-500 group-hover:scale-105 ${
            !habilitado ? 'grayscale opacity-60' : ''
          }`}
        />

        {/* Badge de Sin Stock (Overlay) */}
        {!habilitado && (
          <div className="absolute inset-0 flex flex-col justify-end p-3 bg-white/20">
            {/* Una etiqueta pequeña, minimalista y pegada al borde inferior de la imagen */}
            <div className="bg-white/90 backdrop-blur-md self-start px-3 py-1 border border-stone-200">
              <span className="text-[9px] tracking-[0.25em] font-light text-stone-500 uppercase">
                Sin stock
              </span>
            </div>
          </div>
        )}
        
        {/* Quick Add / Hover Effect (Opcional, muy Zara) */}
        {habilitado && (
          <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300 bg-white/80 backdrop-blur-sm">
            <p className="text-[10px] text-center uppercase tracking-widest font-semibold">
              + Ver más opciones
            </p>
          </div>
        )}
      </div>

      {/* Información del Producto */}
      <div className="mt-4 space-y-1">
        <div className="flex justify-between items-start">
          <h3 className="text-[11px] lg:text-[12px] uppercase tracking-wider text-stone-800 font-light leading-tight max-w-[70%]">
            {descripcion}
          </h3>
          <span className="text-[12px] font-light text-stone-900">
            $ {Number(precio1).toLocaleString('es-AR', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}
          </span>
        </div>
        
        <p className="text-[9px] tracking-widest text-stone-400 uppercase">
          Ref. {codigo}
        </p>
      </div>

      {/* Tira visual para deshabilitados en el borde inferior si prefieres algo más sutil que el cartel central */}
      {!habilitado && (
        <div className="absolute top-2 left-2">
           <div className="h-1 w-8 bg-red-500"></div>
        </div>
      )}
    </div>
  );
};

export default ArticuloCard;