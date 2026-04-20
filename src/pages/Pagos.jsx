const Pagos = () => {
  return (
    <main className="max-w-4xl mx-auto px-6 py-16 text-stone-800 animate-fadeIn">
      <header className="text-center mb-12">
        <h1 className="text-3xl font-serif text-stone-900 mb-2">Medios de Pago</h1>
        <p className="text-stone-500">Elegí la opción que más te convenga para concretar tu compra.</p>
      </header>

      <div className="grid gap-8">
        {/* Transferencia */}
        <div className="bg-stone-50 border border-stone-200 p-8 rounded-2xl flex flex-col md:flex-row items-center gap-6 shadow-sm">
          <div className="text-4xl">🏦</div>
          <div className="flex-1 text-center md:text-left">
            <h2 className="text-xl font-bold text-stone-900">Transferencia o Depósito Bancario</h2>
            <p className="text-stone-600 mt-2">
              Aprovechá un <span className="font-bold text-orange-600">10% de descuento</span> abonando por este medio. 
              Los datos de la cuenta se mostrarán al finalizar tu pedido.
            </p>
          </div>
        </div>

        {/* Mercado Pago */}
        <div className="bg-stone-50 border border-stone-200 p-8 rounded-2xl flex flex-col md:flex-row items-center gap-6 shadow-sm">
          <div className="text-4xl">💳</div>
          <div className="flex-1 text-center md:text-left">
            <h2 className="text-xl font-bold text-stone-900">Mercado Pago</h2>
            <p className="text-stone-600 mt-2">
              Aceptamos todas las tarjetas de crédito y débito. 
              Ofrecemos <span className="font-bold text-stone-900">3 cuotas sin interés</span> con tarjetas bancarias.
            </p>
          </div>
        </div>

        {/* Efectivo */}
        <div className="bg-stone-50 border border-stone-200 p-8 rounded-2xl flex flex-col md:flex-row items-center gap-6 shadow-sm">
          <div className="text-4xl">💵</div>
          <div className="flex-1 text-center md:text-left">
            <h2 className="text-xl font-bold text-stone-900">Efectivo en el Local</h2>
            <p className="text-stone-600 mt-2">
              Podés retirar tu pedido directamente en nuestra fábrica y abonar en el momento con un descuento especial.
            </p>
          </div>
        </div>
      </div>

      <div className="mt-12 p-6 bg-orange-50 rounded-xl border border-orange-100 text-center">
        <p className="text-sm text-orange-800 italic">
          * Recordá enviar el comprobante de transferencia vía WhatsApp para que podamos procesar tu envío lo antes posible.
        </p>
      </div>
    </main>
  );
};

export default Pagos;