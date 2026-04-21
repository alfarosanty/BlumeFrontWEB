import { useState, useEffect, useRef } from "react";
import ArticuloCard from "../components/ArticuloCard";
import { getArticulosPrecios } from "../services/ArticuloService";

const Home = () => {

    const [articulosPrecios, setArticulosPrecios] = useState([]);
    const inicializado = useRef(false);
    const [pagina, setPagina] = useState(1);
    const [cargando, setCargando] = useState(false);
    const [hayMas, setHayMas] = useState(true);
    const SIZE = 12;

    const cargarData = async (nroPagina) => {
        if (cargando) return;

        setCargando(true);
        try {
            const nuevosArticulos = await getArticulosPrecios(nroPagina, SIZE);
            
            if (nuevosArticulos.length < SIZE) {
                setHayMas(false);
            }

            setArticulosPrecios(prev => {
                const filtrados = nuevosArticulos.filter(
                    nuevo => !prev.some(existente => existente.id === nuevo.id)
                );
                return [...prev, ...filtrados];
            });
        } catch (error) {
            console.error("No se pudieron traer los productos", error);
        } finally {
            setCargando(false);
        }
    };

    useEffect(() => {
        if (inicializado.current) return;
        cargarData(1);

        inicializado.current = true;
    }, []);

    const manejarCargarMas = () => {
        const siguientePagina = pagina + 1;
        setPagina(siguientePagina);
        cargarData(siguientePagina); 
    };


    if (cargando) {
    return <div className="flex flex-col justify-center items-center h-64 space-y-4">
           <div className="w-8 h-8 border-4 border-stone-200 border-t-orange-500 rounded-full animate-spin"></div>
           <p className="text-stone-400 text-[10px] uppercase tracking-widest font-bold">Explorando Blume...</p>
        </div>;
  }

  {articulosPrecios.length === 0 && !cargando && (
    <div className="text-center text-stone-600">No se encontraron artículos en esta categoría.</div>
  )}


  return (
          <main className="max-w-7xl mx-auto px-4 py-12">
              <header className="mb-12 text-center">
                  <h2 className="text-4xl font-serif text-stone-800 mb-2">Colección Otoño</h2>
              </header>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                  {articulosPrecios.map((articuloPrecio) => (
                      <ArticuloCard key={articuloPrecio.id} articulo={articuloPrecio} />
                  ))}
              </div>

              {articulosPrecios.length === 0 && !cargando && (
                  <div className="text-center text-stone-600 py-10">
                      No se encontraron artículos en esta categoría.
                  </div>
              )}

              <div className="mt-12 flex justify-center pb-10"> {/* Agregué un padding abajo para dar aire */}
                {hayMas && (
                        <button 
                        onClick={manejarCargarMas}
                        disabled={cargando} 
                        className={`px-8 py-3 bg-stone-800 text-white rounded-md transition-all ${
                            cargando ? 'opacity-50 cursor-wait' : 'hover:bg-stone-700'
                        }`}
                        >
                        {cargando ? (
                            <span className="flex items-center gap-2">
                            <svg className="animate-spin h-5 w-5 text-white" /* un spinner opcional */ />
                            Cargando...
                            </span>
                        ) : (
                            "Ver más productos"
                        )}
                        </button>
                    )}
                </div>
          </main>
      );
};




export default Home;
