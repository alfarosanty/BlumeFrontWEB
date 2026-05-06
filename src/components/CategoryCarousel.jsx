import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { SectorService } from "../services/SectorService";

const CategoryCarousel = () => {
    const [sectores, setSectores] = useState([]);
    const scrollRef = useRef(null);

    useEffect(() => {
        const fetchSectores = async () => {
            const data = await SectorService.getVisiblesWeb();
            setSectores(data);
        };
        fetchSectores();

        const el = scrollRef.current;
        if (!el) return;

        const onWheel = (e) => {
            if (Math.abs(e.deltaX) > Math.abs(e.deltaY)) return;
            e.preventDefault();
            el.scrollLeft += e.deltaY * 2;
        };

        el.addEventListener("wheel", onWheel, { passive: false });
        return () => el.removeEventListener("wheel", onWheel);
    }, []);

    return (
        <section className="py-24 bg-white overflow-hidden">
            <div className="px-4 md:px-12 mb-12">
                <span className="text-[10px] tracking-[0.5em] text-stone-400 font-bold uppercase">Categorías</span>
                <h2 className="text-3xl font-serif text-stone-900 mt-2 italic">Explorá nuestras líneas</h2>
            </div>

            <div 
                ref={scrollRef}
                className="flex overflow-x-auto gap-8 px-4 md:px-12 no-scrollbar select-none scroll-smooth"
                style={{ scrollBehavior: 'auto' }}
            >
                {sectores.map((sector) => (
                    <Link 
                        key={sector.id} 
                        to={`/categoria/${sector.descripcion.toLowerCase()}`} 
                        // 1. ANCHO: Mantenemos el ancho acotado
                        className="min-w-40 md:min-w-55 shrink-0 group"
                    >
                        {/* 2. ALTO: Al pasar a 4/3, el alto es un 75% del ancho. Mucho más bajo. */}
                        <div className="relative aspect-4/3 overflow-hidden bg-stone-50">
                            <img 
                                src={sector.imagen_url || 'https://placehold.co/600x450?text=Blume'} 
                                alt={sector.descripcion}
                                className="w-full h-full object-cover transition-transform duration-[1.5s] ease-out group-hover:scale-105"
                            />
                            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors duration-500" />
                        </div>
                        
                        <div className="mt-3">
                            <h3 className="text-[9px] uppercase tracking-[0.2em] font-bold text-stone-900">
                                {sector.descripcion}
                            </h3>
                            <div className="h-px w-0 group-hover:w-6 bg-stone-900 transition-all duration-500 mt-1" />
                        </div>
                    </Link>
                ))}
            </div>
        </section>
    );
};

export default CategoryCarousel;