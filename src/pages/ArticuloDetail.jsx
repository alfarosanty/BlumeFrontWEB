import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getProductById } from '../services/productService';

const ArticuloDetail = () => {
  const { id } = useParams(); // Atrapa el "1" de la URL /producto/1
  const [product, setProduct] = useState(null);

  useEffect(() => {
    getProductById(id).then(data => setProduct(data));
  }, [id]);

  if (!product) return <p>Cargando detalle...</p>;

  return (
    <div className="max-w-4xl mx-auto p-8 flex gap-8">
      <img src={product.imagen} className="w-1/2 rounded-xl" />
      <div>
        <h1 className="text-3xl font-bold">{product.nombre}</h1>
        <p className="text-2xl text-orange-600">${product.precio}</p>
        <p className="mt-4">{product.descripcion || "Sin descripción disponible."}</p>
        <button className="mt-8 bg-black text-white px-6 py-3 rounded-lg">
          Añadir al carrito
        </button>
      </div>
    </div>
  );
};

export default ArticuloDetail;