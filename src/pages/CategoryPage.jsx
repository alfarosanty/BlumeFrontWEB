import { useParams, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { ArticuloService } from '../services/articuloService'; 
import { SectorService } from '../services/SectorService';
import { SubFamiliaService } from '../services/SubFamiliaService';
import { FamiliaService } from '../services/FamiliaService';
import ArticuloCard from '../components/ArticuloCard';
import PantallaCarga from '../components/PantallaCarga';

const CategoryPage = () => {
  const { categoryName } = useParams();
  const navigate = useNavigate();
  
  const [sectorActual, setSectorActual] = useState(null);
  const [productos, setProductos] = useState([]);
  const [familias, setFamilias] = useState([]);
  const [todasSubfamilias, setTodasSubfamilias] = useState([]); 
  const [subfamiliasFiltradas, setSubfamiliasFiltradas] = useState([]);

  const [filtroFamilia, setFiltroFamilia] = useState({ id: null, tipo: 'Todos' });
  const [subfamiliaActiva, setSubfamiliaActiva] = useState(null);

  const [cargando, setCargando] = useState(true);
  const [cargandoGrilla, setCargandoGrilla] = useState(false);
  const [errorUrl, setErrorUrl] = useState(false);
  const [pagina, setPagina] = useState(1);
  const [hayMas, setHayMas] = useState(true);
  const [cargandoMas, setCargandoMas] = useState(false);
  const LIMITE = 40;

  useEffect(() => {
    const inicializarPagina = async () => {
      setFiltroFamilia({ id: null, tipo: 'Todos' });
      setSubfamiliaActiva(null);
      setSubfamiliasFiltradas([]);
      
      setCargando(true);
      setErrorUrl(false);
      setPagina(1);
      
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
        
        const [familiasData, subfamiliasData] = await Promise.all([
          FamiliaService.getPorSector(sector.id),
          SubFamiliaService.getPorSector(sector.id)
        ]);
        
        setFamilias(familiasData);
        setTodasSubfamilias(subfamiliasData);

        const data = await ArticuloService.getArticulosPrecios(1, LIMITE, { sector_id: sector.id }); 
        setProductos(data);
        setHayMas(data.length === LIMITE);

        window.scrollTo({ top: 0, behavior: 'smooth' });
      } catch (error) {
        console.error("Error inicializando categoría:", error);
      } finally {
        setCargando(false);
      }
    };

    inicializarPagina();
  }, [categoryName]); // Cada vez que cambia la URL, se ejecuta el reseteo

  const cargarData = async (nroPagina, params, append = false) => {
    if (append) setCargandoMas(true);
    else setCargandoGrilla(true);

    try {
      const data = await ArticuloService.getArticulosPrecios(nroPagina, LIMITE, params);
      if (append) setProductos(prev => [...prev, ...data]);
      else setProductos(data);
      setHayMas(data.length === LIMITE);
    } catch (e) {
      console.error(e);
    } finally {
      setCargandoMas(false);
      setCargandoGrilla(false);
    }
  };

  const manejarFiltroFamilia = async (fam) => {
    setPagina(1);
    setSubfamiliaActiva(null);

    if (fam === "Todos") {
      setFiltroFamilia({ id: null, tipo: 'Todos' });
      setSubfamiliasFiltradas([]);
      await cargarData(1, { sector_id: sectorActual.id });
      return;
    }

    setFiltroFamilia({ id: fam.id, tipo: 'familia', descripcion: fam.descripcion });
    const relacionadas = todasSubfamilias.filter(sub => Number(sub.id_familia) === Number(fam.id));
    setSubfamiliasFiltradas(relacionadas);

    await cargarData(1, { sector_id: sectorActual.id, familia_id: fam.id });
  };

  const manejarFiltroSubfamilia = async (sub) => {
    setPagina(1);
    const nuevaSub = subfamiliaActiva === sub.id ? null : sub.id;
    setSubfamiliaActiva(nuevaSub);
    const params = { sector_id: sectorActual.id, familia_id: filtroFamilia.id };
    if (nuevaSub) params.subfamilia_id = nuevaSub;
    await cargarData(1, params);
  };

  const manejarCargarMas = async () => {
    const siguientePagina = pagina + 1;
    const params = { sector_id: sectorActual.id };
    if (filtroFamilia.id) params.familia_id = filtroFamilia.id;
    if (subfamiliaActiva) params.subfamilia_id = subfamiliaActiva;
    await cargarData(siguientePagina, params, true);
    setPagina(siguientePagina);
  };

  if (cargando) return <PantallaCarga />;

  return (
    <div className="max-w-350 mx-auto px-4 md:px-12 py-12 md:py-20 min-h-screen">
      
      {/* HEADER DINÁMICO: Cambia según el filtro */}
      <header className="mb-12 md:mb-20 text-center flex flex-col items-center">
        <h1 className="text-3xl md:text-5xl font-serif uppercase tracking-[0.3em] text-stone-900 transition-all duration-700">
          {filtroFamilia.id ? filtroFamilia.descripcion : categoryName}
        </h1>
        {filtroFamilia.id && (
          <button 
            onClick={() => manejarFiltroFamilia("Todos")}
            className="mt-4 text-[9px] tracking-[0.4em] text-stone-400 uppercase hover:text-stone-900 transition-colors"
          >
            ← Volver a {categoryName}
          </button>
        )}
      </header>

      {/* NAV UNIFICADA */}
        <div className="sticky top-16 md:top-20 z-40 bg-white border-b border-stone-100 -mx-4 px-4 md:mx-0 md:px-0 mb-16">
          {/* Agregamos min-h para que no colapse y quitamos el overflow-hidden del padre para que deje ver el scroll */}
          <div className="relative h-16 flex items-center">
            
            {/* Nivel 1: Familias */}
            <div className={`flex w-full items-center space-x-8 md:space-x-12 overflow-x-auto no-scrollbar transition-all duration-500 absolute left-0 px-4 md:px-0 md:justify-center ${
              filtroFamilia.id ? 'opacity-0 -translate-y-full pointer-events-none' : 'opacity-100 translate-y-0'
            }`}>
              <button
                onClick={() => manejarFiltroFamilia("Todos")}
                className="text-[10px] md:text-[11px] tracking-[0.3em] uppercase font-bold text-stone-900 whitespace-nowrap"
              >
                Todos
              </button>
              {familias.map((fam) => (
                <button
                  key={fam.id}
                  onClick={() => manejarFiltroFamilia(fam)}
                  className="text-[10px] md:text-[11px] tracking-[0.3em] uppercase text-stone-400 hover:text-stone-600 whitespace-nowrap"
                >
                  {fam.descripcion}
                </button>
              ))}
            </div>

            {/* Nivel 2: Subfamilias */}
            <div className={`flex w-full items-center space-x-6 md:space-x-10 overflow-x-auto no-scrollbar transition-all duration-700 absolute left-0 px-4 md:px-0 md:justify-center ${
              filtroFamilia.id ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-full pointer-events-none'
            }`}>
              {subfamiliasFiltradas.map((sub) => (
                <button
                  key={sub.id}
                  onClick={() => manejarFiltroSubfamilia(sub)}
                  className={`text-[10px] md:text-[11px] tracking-[0.3em] uppercase transition-all whitespace-nowrap ${
                    subfamiliaActiva === sub.id 
                      ? 'text-stone-900 font-bold border-b border-stone-900 pb-1' 
                      : 'text-stone-400 hover:text-stone-600'
                  }`}
                >
                  {sub.descripcion}
                </button>
              ))}
            </div>

            {/* Degradado sutil para indicar que hay más (Solo en Mobile) */}
            <div className="md:hidden absolute right-0 top-0 bottom-0 w-8 bg-linear-to-l from-white to-transparent pointer-events-none z-10" />
          </div>
        </div>

      {/* GRID DE PRODUCTOS */}
      <div className={`grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-4 md:gap-x-10 gap-y-12 md:gap-y-20 transition-all duration-500 ${
        cargandoGrilla ? 'opacity-30' : 'opacity-100'
      }`}>
        {productos.map((item) => (
          <ArticuloCard key={item.id} articulo={item} />
        ))}
      </div>

      {/* FOOTER / CARGAR MÁS */}
      {hayMas && productos.length > 0 && (
        <footer className="mt-32 mb-20 flex justify-center">
            <button 
                onClick={manejarCargarMas}
                disabled={cargandoMas}
                className="text-[11px] uppercase tracking-[0.5em] font-bold border-b border-stone-900 pb-2 hover:text-stone-400 transition-all duration-500"
            >
                {cargandoMas ? "Cargando..." : "Explorar más"}
            </button>
        </footer>
      )}
    </div>
  );
};

export default CategoryPage;