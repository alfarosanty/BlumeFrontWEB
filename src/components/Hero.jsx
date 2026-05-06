import { useState } from "react";

const Hero = ({ config }) => {
  const [loaded, setLoaded] = useState(false);

  if (!config) {
    return <section className="h-screen w-full bg-stone-100 animate-pulse" />;
  }

  // Ahora la URL viene completa desde el backend
    const mainImage = config.hero_url || 'https://placehold.co/1920x1080?text=Blume+Textil';
  return (
    <section className="relative h-screen w-full overflow-hidden bg-stone-900">
      <img 
        src={mainImage} 
        alt="Hero Blume" 
        onLoad={() => setLoaded(true)}
        className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ease-in-out ${
          loaded ? "opacity-90" : "opacity-0"
        }`}
      />
      
      <div className="absolute inset-0 bg-black/20" />
      
      <div className="absolute inset-0 flex flex-col items-center justify-end pb-32 text-white">
        <h1 className="text-4xl md:text-7xl font-serif tracking-widest mb-4 text-center px-4 uppercase">
          {config.hero_titulo || "Esencia Textil"}
        </h1>
        
        <p className="text-[10px] md:text-[12px] tracking-[0.6em] uppercase font-light opacity-80 mb-12">
           {config.hero_subtitulo || "Nueva Temporada"}
        </p>
      </div>
    </section>
  );
};

export default Hero;