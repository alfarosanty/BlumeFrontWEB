import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { getArticulosPrecios } from '../services/articuloService'; 
import ArticuloCard from '../components/ArticuloCard';

const CategoryPage = () => {
  const { categoryName } = useParams();
  const [filtro, setFiltro] = useState("Todos");
  const [productos, setProductos] = useState([]);
  const [cargando, setCargando] = useState(false);

  // Diccionario de subcategorías
  const subCategorias = {
    dormitorio: ["Todos", "Acolchados", "Almohadones", "Sábanas", "Pillows"],
    living: ["Todos", "Cortinas", "Alfombras", "Fundas", "Mantas"],
    mesa: ["Todos", "Manteles", "Caminos", "Individuales", "Servilletas"],
    bano: ["Todos", "Toallas", "Alfombras", "Accesorios"],
    tendencias: ["Todos", "Novedades", "Temporada"]
  };

  const chipsActuales = subCategorias[categoryName?.toLowerCase()] || ["Todos"];

  useEffect(() => {
    const cargarData = async () => {
      setCargando(true);
      setFiltro("Todos"); // Reseteamos el chip visual al cambiar de categoría
      
      try {
        // Por ahora traemos 40 productos generalizados (hasta que tengas el filtro en API)
        const data = await getArticulosPrecios(1, 40); 
        setProductos(data);
        
        // Truco: Scroll arriba al cambiar de categoría
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } catch (error) {
        console.error("No se pudieron cargar los productos", error);
      } finally {
        setCargando(false);
      }
    };

    cargarData();
  }, [categoryName]); // Se dispara cada vez que la URL cambia

  return (
    <div className="max-w-7xl mx-auto px-6 py-12 min-h-screen">
      {/* Título de la página */}
      <header className="mb-12 text-center">
        <h1 className="text-3xl md:text-4xl font-serif uppercase tracking-[0.3em] text-stone-800 mb-4">
          {categoryName}
        </h1>
        <div className="h-0.5 w-16 bg-orange-400 mx-auto"></div>
      </header>

      {/* Chips de Subcategorías */}
      <div className="flex justify-center space-x-3 mb-16 overflow-x-auto no-scrollbar py-2">
        {chipsActuales.map((sub) => (
          <button
            key={sub}
            onClick={() => setFiltro(sub)}
            className={`px-6 py-2 rounded-full border text-[10px] font-bold tracking-[0.2em] uppercase transition-all whitespace-nowrap ${
              filtro === sub
                ? 'bg-stone-800 text-white border-stone-800 shadow-md transform -translate-y-0.5'
                : 'bg-white text-stone-400 border-stone-200 hover:border-stone-400 hover:text-stone-600'
            }`}
          >
            {sub}
          </button>
        ))}
      </div>

      {/* Grilla de Artículos */}
      {cargando ? (
        <div className="flex flex-col justify-center items-center h-64 space-y-4">
           <div className="w-8 h-8 border-4 border-stone-200 border-t-orange-500 rounded-full animate-spin"></div>
           <p className="text-stone-400 text-[10px] uppercase tracking-widest font-bold">Explorando Blume...</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-6 gap-y-10">
          {productos.map((item) => (
            <ArticuloCard key={item.id} articulo={item} />
          ))}
        </div>
      )}

      {/* Estado vacío */}
      {!cargando && productos.length === 0 && (
        <div className="text-center py-20">
          <p className="text-stone-400 font-serif italic">Próximamente más productos en esta sección.</p>
        </div>
      )}
    </div>
  );
};

export default CategoryPage;