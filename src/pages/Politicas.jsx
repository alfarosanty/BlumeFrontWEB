const Politicas = () => {
  const secciones = [
    {
      titulo: "1. Proceso de Compra",
      contenido: "Todos los pedidos están sujetos a disponibilidad de stock. Una vez realizada la compra, recibirás un mail de confirmación con el detalle de tu pedido."
    },
    {
      titulo: "2. Tiempos de Entrega",
      contenido: "El tiempo de despacho habitual es de 48 a 72 horas hábiles una vez acreditado el pago. Los envíos se realizan a través de transporte logístico a todo el país."
    },
    {
      titulo: "3. Cambios y Devoluciones",
      contenido: "Los productos pueden cambiarse dentro de los 30 días de recibida la compra, siempre que se encuentren en su estado original y sin uso. Los costos de envío por cambios corren por cuenta del cliente, a menos que el producto presente una falla de fabricación."
    },
    {
      titulo: "4. Precios y Facturación",
      contenido: "Los precios expresados en la web incluyen IVA. Emitimos facturas tipo A y B según la condición fiscal que indiques en tu registro."
    }
  ];

  return (
    <main className="max-w-3xl mx-auto px-6 py-16 text-stone-800">
      <h1 className="text-3xl font-serif text-stone-900 mb-12 text-center underline decoration-orange-500 underline-offset-8">
        Políticas de Compra
      </h1>

      <div className="space-y-12">
        {secciones.map((sec, index) => (
          <section key={index} className="border-l-4 border-stone-200 pl-6">
            <h2 className="text-lg font-bold text-stone-900 mb-3 uppercase tracking-wider">
              {sec.titulo}
            </h2>
            <p className="text-stone-600 leading-relaxed text-sm">
              {sec.contenido}
            </p>
          </section>
        ))}
      </div>

      <footer className="mt-16 pt-8 border-t border-stone-100 text-center">
        <p className="text-stone-400 text-xs">
          Última actualización: Abril 2026. Blume se reserva el derecho de modificar estos términos.
        </p>
      </footer>
    </main>
  );
};

export default Politicas;