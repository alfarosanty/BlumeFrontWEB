const Nosotros = () => {
  return (
    <main className="max-w-7xl mx-auto px-4 md:px-12 py-20 md:py-32 text-stone-900">
      {/* Header Minimalista */}
      <section className="mb-20 md:mb-32">
        <span className="block text-center text-[10px] tracking-[0.5em] uppercase text-stone-400 mb-4">
          Trayectoria & Diseño
        </span>
        <h1 className="text-3xl md:text-5xl font-serif text-center uppercase tracking-[0.2em] text-stone-900">
          Nuestra Historia
        </h1>
        <div className="h-px w-16 bg-stone-200 mx-auto mt-8"></div>
      </section>

      {/* Contenido Editorial */}
      <div className="grid md:grid-cols-12 gap-12 md:gap-20 items-start">
        
        {/* Columna de Texto - Ocupa 5 columnas de 12 */}
        <div className="md:col-span-5 space-y-10 order-2 md:order-1">
          <div className="space-y-6">
            <h2 className="text-xl md:text-2xl font-serif italic text-stone-700 leading-snug">
              "Blume nació en el corazón de la industria textil, con la visión de transformar espacios cotidianos en refugios de calidez."
            </h2>
          </div>

          <div className="space-y-8 text-[13px] md:text-[14px] leading-loose tracking-wide text-stone-500 font-light">
            <p>
              Somos una empresa familiar con años de trayectoria en el sector. Nos dedicamos al desarrollo de textiles orientados a las distintas áreas del hogar. 
              Nuestros productos son pensados y elaborados de manera artesanal, poniendo especial atención en la confección y elección de nuestras materias primas 
              logrando objetos únicos, cálidos y urbanos.
            </p>
            <p>
              Creemos que la calidad no es un lujo, sino un estándar. Por eso, trabajamos día a día para que 
              <span className="text-stone-900 font-medium mx-1 italic">Blume</span> 
              sea sinónimo de confianza para nuestros clientes y socios estratégicos.
            </p>
          </div>

          {/* Un detalle sutil para cerrar la sección */}
          <div className="pt-10">
             <div className="h-px w-full bg-stone-100 mb-4"></div>
             <p className="text-[10px] tracking-[0.3em] uppercase text-stone-400">
               Estándar de calidad — 2026
             </p>
          </div>
        </div>

        {/* Columna de Imagen - Ocupa 7 columnas de 12 */}
        <div className="md:col-span-7 order-1 md:order-2">
          <div className="relative aspect-3/4 md:aspect-auto md:h-175 overflow-hidden bg-stone-100 group">
            <img 
              src="https://res.cloudinary.com/dlrtf1lty/image/upload/v1778073243/SabriSanti_bl0k8g.jpg" 
              alt="Blume Concept" 
              className="w-full h-full object-cover transition-transform duration-3000 ease-out group-hover:scale-110" 
            />
            {/* Overlay sutil para que no brille tanto el blanco de la foto si es necesario */}
            <div className="absolute inset-0 bg-stone-900/5 pointer-events-none"></div>
          </div>
          <p className="mt-4 text-right text-[9px] tracking-widest text-stone-400 uppercase">
            Fotografía de archivo / Blume
          </p>
        </div>

      </div>
    </main>
  );
};

export default Nosotros;