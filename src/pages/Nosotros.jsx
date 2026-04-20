const Nosotros = () => {
  return (
    <main className="max-w-5xl mx-auto px-6 py-16 text-stone-800">
      <section className="text-center mb-16">
        <h1 className="text-4xl font-serif mb-4 text-stone-900">Nuestra Historia</h1>
        <div className="w-24 h-1 bg-orange-600 mx-auto"></div>
      </section>

      <div className="grid md:grid-cols-2 gap-12 items-center">
        <div className="space-y-6">
          <p className="text-lg leading-relaxed italic">
            "Blume nació en el corazón de la industria textil, con la visión de transformar espacios cotidianos en refugios de calidez y diseño."
          </p>
          <p className="text-stone-600 leading-relaxed">
            Somos una empresa familiar con años de trayectoria en el sector. Cada uno de nuestros productos, desde los almohadones hasta las telas por metro, pasa por un riguroso proceso de selección y confección en nuestra propia fábrica.
          </p>
          <p className="text-stone-600 leading-relaxed">
            Creemos que la calidad no es un lujo, sino un estándar. Por eso, trabajamos día a día para que <strong>Blume</strong> sea sinónimo de confianza para nuestros clientes y socios estratégicos.
          </p>
        </div>
        <div className="bg-stone-100 aspect-video rounded-2xl overflow-hidden shadow-inner flex items-center justify-center">
           {/* Acá iría una foto de la fábrica o el equipo de tu tío */}
           <img src="https://placehold.co/600x400?text=Fábrica+Blume" alt="Fábrica" className="w-full h-full object-cover opacity-80" />
        </div>
      </div>
    </main>
  );
};

export default Nosotros;