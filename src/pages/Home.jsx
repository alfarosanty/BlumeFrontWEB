import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import ArticuloCard from "../components/ArticuloCard";
import Hero from "../components/Hero";
import Footer from "../components/Footer";
import PantallaCarga from "../components/PantallaCarga";
import { ArticuloService } from "../services/ArticuloService";
import { HomeService } from "../services/HomeService";
import CategoryCarousel from "../components/CategoryCarousel";

const Home = () => {
    const [config, setConfig] = useState(null);
    const [articulosPrecios, setArticulosPrecios] = useState([]);
    
    const [pagina, setPagina] = useState(1);
    const [cargando, setCargando] = useState(false);
    const [hayMas, setHayMas] = useState(true);
    const SIZE = 12;

    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const sectorId = queryParams.get("sector_id");

    useEffect(() => {
        const fetchConfig = async () => {
            const data = await HomeService.getHomeConfig();
            setConfig(data);
        };
        fetchConfig();
    }, []);

    const cargarData = async (nroPagina, restart = false) => {
        if (cargando) return;
        setCargando(true);

        try {
            const filtros = sectorId ? { sector_id: sectorId } : {};
            const nuevosArticulos = await ArticuloService.getArticulosPrecios(nroPagina, SIZE, filtros);
            
            if (nuevosArticulos.length < SIZE) {
                setHayMas(false);
            } else {
                setHayMas(true);
            }

            setArticulosPrecios(prev => {
                if (restart) return nuevosArticulos;
                const filtrados = nuevosArticulos.filter(
                    nuevo => !prev.some(existente => existente.id === nuevo.id)
                );
                return [...prev, ...filtrados];
            });
        } catch (error) {
            console.error("Error al cargar catálogo:", error);
        } finally {
            setCargando(false);
        }
    };

    useEffect(() => {
        setPagina(1);
        cargarData(1, true);
    }, [sectorId]);

    const manejarCargarMas = () => {
        const siguientePagina = pagina + 1;
        setPagina(siguientePagina);
        cargarData(siguientePagina);
    };

    if (cargando && pagina === 1 && articulosPrecios.length === 0) {
        return <PantallaCarga />;
    }

    return (
        <div className="bg-white min-h-screen">
            {!sectorId && (
                <>
                    <Hero config={config} />
                    <CategoryCarousel />
                </>
            )}

            <main className={`max-w-400 mx-auto px-4 md:px-12 ${sectorId ? 'pt-32 pb-20' : 'py-20'}`}>
                <header className="mb-20 text-center">
                    <span className="text-[10px] tracking-[0.6em] uppercase text-stone-400 font-bold block mb-4">
                        {sectorId ? "Colección Seleccionada" : "New In"}
                    </span>
                    <h2 className="text-3xl md:text-5xl font-serif text-stone-900 tracking-tighter">
                        {sectorId ? `Línea ${queryParams.get("sector") || ""}` : "Selección Blume"}
                    </h2>
                    <div className="h-px w-20 bg-stone-200 mx-auto mt-8" />
                </header>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-y-16 gap-x-6">
                    {articulosPrecios.map((art) => (
                        <ArticuloCard key={art.id} articulo={art} />
                    ))}
                </div>

                {articulosPrecios.length === 0 && !cargando && (
                    <div className="text-center py-20">
                        <p className="font-serif italic text-stone-400">No se encontraron productos en esta categoría.</p>
                    </div>
                )}

                {hayMas && (
                    <div className="mt-24 flex justify-center">
                        <button 
                            onClick={manejarCargarMas}
                            disabled={cargando}
                            className="text-[11px] uppercase tracking-[0.4em] font-bold border-b border-stone-900 pb-2 hover:text-stone-500 hover:border-stone-300 transition-all duration-500"
                        >
                            {cargando ? "Cargando..." : "Explorar más"}
                        </button>
                    </div>
                )}
            </main>
        </div>
    );
};

export default Home;