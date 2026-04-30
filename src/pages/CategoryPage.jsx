import { useParams, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { ArticuloService } from '../services/articuloService'; 
import { SectorService } from '../services/SectorService';
import { FamiliaService } from '../services/FamiliaService';
import ArticuloCard from '../components/ArticuloCard';
import PantallaCarga from '../components/PantallaCarga';

const CategoryPage = () => {
  const { categoryName } = useParams();
  const navigate = useNavigate();
  
  const [sectorActual, setSectorActual] = useState(null);
  const [filtroActivo, setFiltroActivo] = useState({ id: null, tipo: 'Todos' });
  const [productos, setProductos] = useState([]);
  const [familias, setFamilias] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [cargandoGrilla, setCargandoGrilla] = useState(false);
  const [errorUrl, setErrorUrl] = useState(false);

  useEffect(() => {
    const inicializarPagina = async () => {
      setCargando(true);
      setErrorUrl(false);
      try {
        const sectoresValidos = await SectorService.getVisiblesWeb();
        const sector = sectoresValidos.find(
          s => s.descripcion.toLowerCase() === categoryName.toLowerCase()
        );

        if (!sector) {
          setErrorUrl(true);
          return;
        }

        setSectorActual(sector);
        
        const familiasData = await FamiliaService.getPorSector(sector.id);
        setFamilias(familiasData);

        const prods = await ArticuloService.getArticulosPrecios(1, 40, { sector_id: sector.id }); 
        setProductos(prods);

        window.scrollTo({ top: 0, behavior: 'smooth' });
      } catch (error) {
        console.error("Error inicializando categoría:", error);
      } finally {
        setCargando(false);
      }
    };

    inicializarPagina();
  }, [categoryName]);

  const manejarFiltro = async (item) => {
    if (item === "Todos") {
      setFiltroActivo({ id: null, tipo: 'Todos' });
      await cargarProductosFiltrados({ sector_id: sectorActual.id });
      return;
    }

    // Guardamos qué filtro está activo
    setFiltroActivo({ id: item.id, tipo: item.tipo, descripcion: item.descripcion });

    // Preparamos el objeto de filtros para el service
    const params = { sector_id: sectorActual.id };
    if (item.tipo === 'familia') params.familia_id = item.id;
    if (item.tipo === 'subfamilia') params.subfamilia_id = item.id;

    await cargarProductosFiltrados(params);
  };

  const cargarProductosFiltrados = async (params) => {
    setCargandoGrilla(true);
    try {
      const data = await ArticuloService.getArticulosPrecios(1, 40, params);
      setProductos(data);
    } catch (e) {
      console.error(e);
    } finally {
      setCargandoGrilla(false);
    }
  };

  if (cargando) return <PantallaCarga />;

  if (errorUrl) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
        <h2 className="text-4xl font-serif mb-4 italic">404</h2>
        <p className="text-stone-500 mb-8 uppercase tracking-[0.3em] text-[10px] font-bold">
          La colección "{categoryName}" no está disponible
        </p>
        <button onClick={() => navigate('/')} className="text-stone-800 border-b border-stone-800 text-[10px] font-bold pb-1 tracking-widest hover:text-blume-gold hover:border-blume-gold transition-colors">
          VOLVER AL INICIO
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 md:px-12 py-8 md:py-12 min-h-screen">
      <header className="mb-8 md:mb-16 text-center">
        <h1 className="text-2xl md:text-4xl font-serif uppercase tracking-[0.4em] text-stone-900 mb-4">
          {categoryName}
        </h1>
        <div className="h-px w-12 bg-stone-200 mx-auto"></div>
      </header>

      {/* FILTROS: En mobile son scroll lateral, en PC están centrados */}
      <div className="sticky top-16 md:top-20 z-40 bg-white/80 backdrop-blur-md -mx-4 px-4 md:mx-0 md:px-0 py-4 mb-8">
        <div className="flex md:justify-center space-x-2 md:space-x-4 overflow-x-auto no-scrollbar scroll-smooth">
          <button
            onClick={() => manejarFiltro("Todos")}
            className={`whitespace-nowrap px-6 py-2 rounded-full border text-[9px] md:text-[10px] font-bold tracking-widest uppercase transition-all ${
              filtroActivo.tipo === "Todos" ? 'bg-stone-900 text-white border-stone-900' : 'bg-white text-stone-400 border-stone-100'
            }`}
          >
            Todos
          </button>
          {familias.map((fam) => (
            <button
              key={fam.id}
              onClick={() => manejarFiltro(fam)}
              className={`whitespace-nowrap px-6 py-2 rounded-full border text-[9px] md:text-[10px] font-bold tracking-widest uppercase transition-all ${
                filtroActivo.id === fam.id ? 'bg-stone-900 text-white border-stone-900' : 'bg-white text-stone-400 border-stone-100'
              }`}
            >
              {fam.descripcion}
            </button>
          ))}
        </div>
      </div>

      {/* GRID: 2 columnas en móvil, 3 en tablet, 4 en PC */}
      <div className={`grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-3 gap-y-8 md:gap-x-6 md:gap-y-12 transition-opacity duration-300 ${
        cargandoGrilla ? 'opacity-40' : 'opacity-100'
      }`}>
        {productos.map((item) => (
          <ArticuloCard key={item.id} articulo={item} />
        ))}
      </div>

      {/* Empty State */}
      {!cargandoGrilla && productos.length === 0 && (
        <p className="text-center text-stone-400 uppercase tracking-[0.3em] text-[10px] mt-20 font-medium">
          No hay artículos disponibles
        </p>
      )}
    </div>
  );
};

export default CategoryPage;